// Alignment of DACS Community news and events with the IHP-WINS "Share News" and
// "Share New Event" forms, so that entries can be synchronised automatically.
// Field names and option lists follow the IHP-WINS forms; see docs/WINS_SYNC.md.
import { localInput } from './calendar.ts';
import { unescoCountries, unescoCountry } from './countries.ts';

export const WINS_ORGANIZATION = 'Intergovernmental Hydrological Programme';
/** Initiative under which DACS content appears on IHP-WINS. To be confirmed with the IHP-WINS team. */
export const WINS_INITIATIVE = 'Decade of Action for Cryospheric Sciences';
export const DEFAULT_ORGANIZER = 'Decade of Action for Cryospheric Sciences 2025–2034';

export const SUMMARY_MAX = 300;
export const NEWS_BODY_MAX = 10000;
export const EVENT_OVERVIEW_MAX = 5000;
export const MAX_LINKS = 10;

/** Every news item and every public event is shared as public; internal meetings are never shared. */
export type WinsVisibility = 'public' | 'off';
export const winsEventTypes = ['Conference', 'Workshop', 'Seminar', 'Training', 'Webinar', 'Meeting', 'Prize Award Ceremony', 'Book Launch', 'Celebration'] as const;
export const eventFormats: [string, string][] = [['in-person', 'In-person'], ['online', 'Online'], ['hybrid', 'Hybrid']];

export const ALL_MEMBER_STATES = 'All member states';
/** Member States exactly as listed in the IHP-WINS forms (used to convert UNESCO names when exporting). */
export const winsMemberStates: string[] = ['Land Islands', 'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia Plurinational State of', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi', 'C Te D Ivoire', 'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Cook Islands', 'Costa Rica', 'Croatia', 'Cuba', 'Cura Ao', 'Cyprus', 'Czechia', 'Democratic People S Republic of Korea', 'Democratic Republic of the Congo', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'European Union', 'Faroes', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Holy See', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran Islamic Republic of', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Lao People S Democratic Republic', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macao China', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia Federated States of', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Republic of Korea', 'Republic of Moldova', 'Romania', 'Russian Federation', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Sint Maarten', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Sudan', 'Spain', 'Sri Lanka', 'State of Palestine', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syrian Arab Republic', 'T Rkiye', 'Tajikistan', 'Thailand', 'Timor Leste', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom of Great Britain and Northern Ireland', 'United Republic of Tanzania', 'United States of America', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela Bolivarian Republic of', 'Viet Nam', 'Yemen', 'Zambia', 'Zimbabwe'];

/** Member States offered in DACS Community: the country names approved by UNESCO (lib/countries.ts). */
export const memberStates: string[] = unescoCountries;

// IHP-WINS writes names without accents or punctuation (for example "C Te D Ivoire").
const winsKey = (s: string) => s.replace(/[^A-Za-z0-9]+/g, ' ').trim().toLowerCase();
const winsByKey = new Map(winsMemberStates.map(w => [winsKey(w), w]));
const winsOverrides: Record<string, string> = { 'Netherlands (Kingdom of the)': 'Netherlands' };
/** The IHP-WINS value for a UNESCO country name (the name itself when IHP-WINS has no match). */
export function winsState(name: string): string {
  if (name === ALL_MEMBER_STATES) return name;
  return winsOverrides[name] || winsByKey.get(winsKey(name)) || name;
}
/** UNESCO name for a stored value, including values saved in the IHP-WINS spelling. */
export const stateName = (value: string) => unescoCountry(value) || value;

export function slugify(text: string): string {
  return text.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 120);
}

const isLink = (v: string) => /^https?:\/\/[^\s]+$/.test(v) && v.length <= 1000;
/** One link per line; blank lines ignored. */
export const parseLinks = (text: string) => text.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
export function linksError(links: string[], label: string): string {
  if (links.length > MAX_LINKS) return `${label}: enter up to ${MAX_LINKS} links.`;
  if (!links.every(isLink)) return `${label}: each line must be one link starting with https:// or http://.`;
  return '';
}
export function memberStatesError(values: string[]): string {
  if (values.length > memberStates.length + 1 || new Set(values).size !== values.length) return 'Check the selected Member States.';
  if (values.includes(ALL_MEMBER_STATES) && values.length > 1) return 'Choose either all member states or individual Member States.';
  if (!values.every(v => v === ALL_MEMBER_STATES || memberStates.includes(v))) return 'Choose Member States from the list.';
  return '';
}
/** "Label: Value" lines of the IHP-WINS Event Details field. */
export function detailLines(text: string): { label: string; value: string }[] {
  return text.split(/\r?\n/).map(l => l.trim()).filter(Boolean).map(l => {
    const i = l.indexOf(':');
    return i > 0 ? { label: l.slice(0, i).trim(), value: l.slice(i + 1).trim() } : { label: '', value: l };
  });
}
/** Summary used when none was written: the first 300 characters of the main text. */
export function excerpt(summary: string | undefined, text: string): string {
  const own = (summary || '').trim();
  if (own) return own.slice(0, SUMMARY_MAX);
  const flat = (text || '').replace(/\s+/g, ' ').trim();
  return flat.length <= SUMMARY_MAX ? flat : flat.slice(0, SUMMARY_MAX - 1).replace(/\s+\S*$/, '') + '…';
}

type Attachment = { id: string; name: string; type: string; size: number };
const iso = (v: any) => (v?.toDate ? v.toDate().toISOString() : typeof v === 'string' ? v : '');
const firstPdf = (items?: Attachment[]) => {
  const a = (items || []).find(x => x.type === 'pdf') || (items || [])[0];
  return a ? { name: a.name, type: a.type, size: a.size, dacsFileId: a.id } : null;
};
/** Header image: a link, or an image uploaded to DACS Community (read from contentImages/{id} by the sync process). */
const headerImage = (d: any) => (d.headerImageUrl ? { url: d.headerImageUrl } : d.headerImageId ? { dacsImageId: d.headerImageId } : null);
const markdownImages = (urls?: string[]) => (urls || []).map(u => `![](${u})`).join('\n');


export type SyncContext = { appUrl: string; bodyName?: (id: string) => string };

/** IHP-WINS "Share News" record for a DACS news item. Every news item is shared as public. */
export function winsNews(p: any, ctx: SyncContext) {
  const vis: WinsVisibility = 'public';
  const title = (p.title || '').trim();
  return {
    kind: 'news' as const,
    sourceId: `dacs-news-${p.id}`,
    sourceUrl: ctx.appUrl,
    action: 'submit-for-validation',
    articleInformation: {
      articleTitle: title,
      articleUrl: slugify(title),
      publicationDate: p.publishedOn || iso(p.createdAt).slice(0, 10),
      authorSource: (p.source || '').trim() || p.author_name || '',
      visibility: vis,
      organization: WINS_ORGANIZATION,
    },
    articleContent: {
      articleSummary: excerpt(p.summary, p.body),
      fullArticleContent: p.body || '',
    },
    additionalInformation: {
      attachmentPdf: firstPdf(p.attachments),
      originalSourceUrl: p.url || '',
      relatedLinks: p.relatedLinks || [],
      additionalContent: p.additionalContent || '',
    },
    images: {
      headerImage: headerImage(p),
      externalImageUrls: markdownImages(p.imageUrls),
    },
    memberStatesAndInitiatives: {
      memberStates: (p.memberStates || []).map(stateName).map(winsState),
      associatedInitiatives: [WINS_INITIATIVE],
    },
    dacs: {
      sharedFor: p.bodyId ? (ctx.bodyName?.(p.bodyId) || p.bodyId) : 'Decade community',
      mainGoals: p.mgs || [],
      sharedBy: p.author_name || '',
      createdAt: iso(p.createdAt),
      updatedAt: iso(p.updatedAt),
    },
  };
}

/** IHP-WINS "Share New Event" record for a public DACS event, or null for internal meetings. */
export function winsEvent(e: any, ctx: SyncContext) {
  if (e.meetingType && e.meetingType !== 'public') return null;
  const vis: WinsVisibility = 'public';
  const zone = e.timeZone || 'UTC';
  const start = localInput(e.startAt, zone), end = localInput(new Date(Date.parse(e.endAt) - 1), zone);
  const endTime = localInput(e.endAt, zone).slice(11);
  const details = (e.details || '').trim();
  const time = `Time: ${start.slice(11)} – ${endTime} (${zone.replaceAll('_', ' ')})`;
  return {
    kind: 'event' as const,
    sourceId: `dacs-event-${e.id}`,
    sourceUrl: ctx.appUrl,
    action: 'submit-for-validation',
    eventInformation: {
      eventTitle: (e.title || '').trim(),
      eventUrl: slugify(e.title || ''),
      eventType: e.eventType || '',
      eventStartDate: start.slice(0, 10),
      eventEndDate: end.slice(0, 10) !== start.slice(0, 10) ? end.slice(0, 10) : '',
      visibility: vis,
      location: e.location || '',
      primaryOrganization: WINS_ORGANIZATION,
      displayedOrganizerName: (e.organizerName || '').trim() || DEFAULT_ORGANIZER,
      coOrganizers: e.coOrganizers || '',
      eventFormat: e.format || '',
    },
    eventDescription: { eventOverview: e.description || '' },
    eventDetails: /^time\s*:/im.test(details) ? details : [time, details].filter(Boolean).join('\n'),
    speakersAndOrganizers: e.speakers || '',
    registrationInformation: { registrationInformation: e.registrationInfo || '', registrationUrl: e.registrationUrl || '' },
    imageGallery: { externalImageUrls: markdownImages(e.imageUrls) },
    agendaAndAdditionalInformation: { agendaOrFlyer: firstPdf(e.attachments), additionalInformation: e.additionalInfo || '' },
    headerImage: headerImage(e),
    summaryExcerpt: excerpt(e.summary, e.description),
    memberStatesAndInitiatives: { memberStates: (e.memberStates || []).map(stateName).map(winsState), associatedInitiatives: [WINS_INITIATIVE] },
    dacs: {
      startAt: e.startAt, endAt: e.endAt, timeZone: zone,
      overarchingChallenges: e.ocs || [], mainGoals: e.mgs || [],
    },
  };
}
