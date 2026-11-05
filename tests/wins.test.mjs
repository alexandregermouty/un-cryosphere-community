import test from 'node:test';
import assert from 'node:assert/strict';
import { winsNews, winsEvent, slugify, excerpt, memberStates, winsMemberStates, winsState, memberStatesError, linksError, detailLines, stateName, ALL_MEMBER_STATES, WINS_ORGANIZATION } from '../lib/wins.ts';
import { unescoCountries, unescoCountry } from '../lib/countries.ts';
import { eventError } from '../lib/calendar.ts';

const ctx = { appUrl: 'https://example.org/dacs/', bodyName: (id) => ({ wg3: 'Working Group 3' })[id] || id };

test('news shared on IHP-WINS map to every section of the Share News form', () => {
  const post = { id: 'n1', title: 'Glacier mass balance 2026', publishedOn: '2026-11-04', source: 'WGMS', wins: 'public', summary: 'Short summary.', body: 'Full text.',
    url: 'https://wgms.ch', relatedLinks: ['https://a.org'], additionalContent: 'Background.', headerImageUrl: 'https://img.org/h.jpg', imageUrls: ['https://img.org/1.jpg'],
    memberStates: ['Switzerland', "Côte d'Ivoire"], bodyId: 'wg3', mgs: ['3.1'], author_name: 'Alex', attachments: [{ id: 'f1', name: 'note.docx', type: 'docx', size: 10 }, { id: 'f2', name: 'report.pdf', type: 'pdf', size: 20 }] };
  const w = winsNews(post, ctx);
  assert.equal(w.sourceId, 'dacs-news-n1');
  assert.deepEqual(w.articleInformation, { articleTitle: 'Glacier mass balance 2026', articleUrl: 'glacier-mass-balance-2026', publicationDate: '2026-11-04', authorSource: 'WGMS', visibility: 'public', organization: WINS_ORGANIZATION });
  assert.deepEqual(w.articleContent, { articleSummary: 'Short summary.', fullArticleContent: 'Full text.' });
  assert.equal(w.additionalInformation.attachmentPdf.name, 'report.pdf');
  assert.deepEqual(w.additionalInformation.relatedLinks, ['https://a.org']);
  assert.equal(w.images.externalImageUrls, '![](https://img.org/1.jpg)');
  assert.deepEqual(w.images.headerImage, { url: 'https://img.org/h.jpg' });
  assert.deepEqual(w.memberStatesAndInitiatives.memberStates, ['Switzerland', 'C Te D Ivoire']);
  assert.equal(w.dacs.sharedFor, 'Working Group 3');
});

test('every news item is shared as public, including older ones', () => {
  assert.equal(winsNews({ id: 'old', title: 'Old', body: 'x' }, ctx).articleInformation.visibility, 'public');
  assert.equal(winsNews({ id: 'off', title: 'Off', body: 'x', wins: 'off' }, ctx).articleInformation.visibility, 'public');
});

test('a missing summary falls back to the first 300 characters', () => {
  const long = 'word '.repeat(100);
  const s = excerpt('', long);
  assert.ok(s.length <= 300 && s.endsWith('…'));
  assert.equal(excerpt('', 'Short text.'), 'Short text.');
  assert.equal(winsNews({ id: 'u', wins: 'private', title: 'T', body: 'Body text', createdAt: '2026-10-01T10:00:00Z', author_name: 'A' }, ctx).articleInformation.publicationDate, '2026-10-01');
});

test('public events map to the Share New Event form, with the time added to the details', () => {
  const e = { id: 'e1', title: 'Cryosphere webinar', wins: 'public', eventType: 'Webinar', format: 'online', startAt: '2026-12-01T08:00:00.000Z', endAt: '2026-12-01T10:00:00.000Z', timeZone: 'Europe/Paris',
    location: 'Online', description: 'Overview.', details: 'Language: English', registrationUrl: 'https://reg.org', registrationInfo: 'Free', ocs: [3], mgs: ['3.1'], memberStates: [ALL_MEMBER_STATES], headerImageId: 'img1' };
  const w = winsEvent(e, ctx);
  assert.equal(w.eventInformation.eventStartDate, '2026-12-01');
  assert.equal(w.eventInformation.eventEndDate, '');
  assert.equal(w.eventInformation.eventFormat, 'online');
  assert.equal(w.eventInformation.displayedOrganizerName, 'Decade of Action for Cryospheric Sciences 2025–2034');
  assert.equal(w.eventDetails, 'Time: 09:00 – 11:00 (Europe/Paris)\nLanguage: English');
  assert.deepEqual(w.registrationInformation, { registrationInformation: 'Free', registrationUrl: 'https://reg.org' });
  assert.deepEqual(w.headerImage, { dacsImageId: 'img1' });
  assert.equal(w.summaryExcerpt, 'Overview.');
});

test('multi-day events give an end date; internal meetings are never exported', () => {
  const base = { id: 'e2', title: 'Workshop', wins: 'public', startAt: '2026-12-01T08:00:00.000Z', endAt: '2026-12-03T16:00:00.000Z', timeZone: 'UTC', description: 'x' };
  assert.equal(winsEvent(base, ctx).eventInformation.eventEndDate, '2026-12-03');
  assert.equal(winsEvent({ ...base, meetingType: 'core', body: 'wg1' }, ctx), null);
  assert.equal(winsEvent({ ...base, wins: undefined }, ctx).eventInformation.visibility, 'public');
});

test('public events require an overview; internal meetings do not; shared fields are checked', () => {
  const e = { title: 'T', description: '', startAt: '2026-12-01T08:00:00.000Z', endAt: '2026-12-01T09:00:00.000Z', timeZone: 'UTC', location: '', registrationUrl: '', joinUrl: '', ocs: [1], mgs: ['1.1'] };
  assert.match(eventError(e), /overview/);
  assert.equal(eventError({ ...e, meetingType: 'core', body: 'wg1' }), '');
  assert.equal(eventError({ ...e, description: 'Overview' }), '');
  const d = { ...e, description: 'Overview' };
  assert.match(eventError({ ...d, eventType: 'Party' }), /event type/);
  assert.match(eventError({ ...d, format: 'remote' }), /format/);
  assert.match(eventError({ ...d, imageUrls: ['ftp://x'] }), /External image URLs/);
  assert.match(eventError({ ...d, memberStates: ['Atlantis'] }), /Member States/);
});

test('Member States use the UNESCO names and convert to the IHP-WINS values', () => {
  assert.equal(unescoCountries.length, 189);
  assert.equal(memberStates, unescoCountries);
  assert.equal(new Set(unescoCountries).size, 189);
  assert.equal(stateName('C Te D Ivoire'), "Côte d'Ivoire");
  assert.equal(stateName('Netherlands'), 'Netherlands (Kingdom of the)');
  assert.equal(unescoCountry('Vietnam'), 'Viet Nam');
  assert.equal(winsState("Côte d'Ivoire"), 'C Te D Ivoire');
  assert.equal(winsState('Türkiye'), 'T Rkiye');
  assert.equal(winsState('Netherlands (Kingdom of the)'), 'Netherlands');
  assert.deepEqual(unescoCountries.filter(c => !winsMemberStates.includes(winsState(c))), []);
  assert.equal(memberStatesError([ALL_MEMBER_STATES, 'France']), 'Choose either all member states or individual Member States.');
  assert.equal(memberStatesError(['France', 'Viet Nam']), '');
  assert.match(memberStatesError(['C Te D Ivoire']), /from the list/);
});

test('helpers: slugs, links and "Label: Value" details', () => {
  assert.equal(slugify('Côte d’Ivoire: glaciers & snow 2026'), 'cote-d-ivoire-glaciers-snow-2026');
  assert.equal(linksError(['https://a.org', 'http://b.org'], 'Links'), '');
  assert.match(linksError(['javascript:alert(1)'], 'Links'), /Links/);
  assert.deepEqual(detailLines('Time: 09:00 - 17:00 UTC\nFree entry'), [{ label: 'Time', value: '09:00 - 17:00 UTC' }, { label: '', value: 'Free entry' }]);
});
