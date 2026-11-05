import {overarchingChallenges,decadeGoals} from './decade-goals.ts';
import {winsEventTypes,eventFormats,linksError,memberStatesError,EVENT_OVERVIEW_MAX,SUMMARY_MAX} from './wins.ts';
export type CalendarEvent = {
  id: string; owner: string; title: string; description: string;
  startAt: string; endAt: string; timeZone: string; location: string;
  registrationUrl: string; joinUrl: string; ocs: number[]; mgs: string[];
  body?: string; meetingType?: string; pollId?: string;
  attachments?: { id: string; name: string; type: 'pdf' | 'doc' | 'docx' | 'ppt' | 'pptx'; size: number; body: string }[];
  // Fields shared with the IHP-WINS "Share New Event" form (all optional for older events).
  wins?: 'public' | 'private' | 'off'; eventType?: string; format?: string;
  organizerName?: string; coOrganizers?: string; details?: string; speakers?: string;
  registrationInfo?: string; additionalInfo?: string; summary?: string;
  headerImageUrl?: string; headerImageId?: string; imageUrls?: string[]; memberStates?: string[];
};
export const challenges = overarchingChallenges.map(c=>c.id);
export const mainGoals = decadeGoals.map(g=>g.id);
export const detectTimeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
export function validTimeZone(value:string) {
  try { new Intl.DateTimeFormat('en',{timeZone:value}); return !!value; } catch { return false; }
}
export function timeZoneOptions() {
  const common=['UTC','Europe/Paris','Europe/London','America/New_York','America/Los_Angeles','Asia/Tokyo','Asia/Kolkata','Asia/Ho_Chi_Minh','Asia/Shanghai','Africa/Nairobi','Australia/Sydney','Pacific/Auckland'];
  const intl=Intl as typeof Intl & {supportedValuesOf?:(key:string)=>string[]};
  return [...new Set([...common,...(intl.supportedValuesOf?.('timeZone')||[])])].filter(validTimeZone).sort();
}
const pad = (n: number) => String(n).padStart(2, '0');
export function localInput(instant: string | Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-GB', {timeZone, year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit', hourCycle:'h23'}).formatToParts(new Date(instant));
  const p = Object.fromEntries(parts.map(x => [x.type, x.value]));
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`;
}
// Match the entered wall time against possible offsets. A DST gap has no match;
// a repeated hour has two. No external location service or time-zone dependency.
export function timeCandidates(value: string, timeZone: string): string[] {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) return [];
  const naive = Date.parse(value + ':00Z');
  if (!Number.isFinite(naive)) return [];
  const offsets = new Set<number>();
  for (let hours = -36; hours <= 36; hours += 6) {
    const probe = naive + hours * 3600000;
    offsets.add(Date.parse(localInput(new Date(probe), timeZone) + ':00Z') - probe);
  }
  return [...offsets].map(offset => new Date(naive - offset).toISOString())
    .filter(instant => localInput(instant, timeZone) === value).sort();
}
export function eventError(e: Omit<CalendarEvent, 'id' | 'owner'>): string {
  if (!e.title.trim() || e.title.length > 160) return 'Enter an event title (up to 160 characters).';
  const start = Date.parse(e.startAt), end = Date.parse(e.endAt);
  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start || end - start > 31 * 86400000) return 'Choose an end after the start, within 31 days.';
  if (e.description.length > EVENT_OVERVIEW_MAX || e.location.length > 300) return 'Shorten the event overview or location.';
  const shared = (e.wins === 'public' || e.wins === 'private') && (!e.meetingType || e.meetingType === 'public');
  if (shared && !e.description.trim()) return 'Write the event overview: it is required to share the event on IHP-WINS.';
  if (e.eventType && !(winsEventTypes as readonly string[]).includes(e.eventType)) return 'Choose an event type from the list.';
  if (e.format && !eventFormats.some(([id]) => id === e.format)) return 'Choose an event format from the list.';
  if ((e.organizerName || '').length > 200 || (e.coOrganizers || '').length > 500) return 'Shorten the organizer names.';
  if ((e.details || '').length > 2000 || (e.registrationInfo || '').length > 2000) return 'Shorten the event details or registration information.';
  if ((e.speakers || '').length > 3000 || (e.additionalInfo || '').length > 3000) return 'Shorten the speakers or additional information.';
  if ((e.summary || '').length > SUMMARY_MAX) return `Shorten the summary to ${SUMMARY_MAX} characters.`;
  for (const [links, label] of [[e.imageUrls || [], 'External image URLs'], [e.headerImageUrl ? [e.headerImageUrl] : [], 'Header image URL']] as [string[], string][]) { const m = linksError(links, label); if (m) return m; }
  const states = memberStatesError(e.memberStates || []); if (states) return states;
  if (!e.ocs.length || e.ocs.length > 5 || new Set(e.ocs).size !== e.ocs.length || !e.ocs.every(n => challenges.includes(n))) return 'Select at least one overarching challenge.';
  if (!e.mgs.length || e.mgs.length > 15 || new Set(e.mgs).size !== e.mgs.length || !e.mgs.every(m => mainGoals.includes(m) && e.ocs.includes(Number(m[0])))) return 'Select main goals within the chosen challenges.';
  for (const url of [e.registrationUrl, e.joinUrl]) {
    if (url && (url.length > 1000 || !/^https?:\/\/[^\s]+$/.test(url))) return 'Links must start with https:// or http://.';
  }
  try { new Intl.DateTimeFormat('en', {timeZone:e.timeZone}); } catch { return 'The event time zone is invalid.'; }
  return '';
}
export function monthGrid(month: string) {
  const [year, m] = month.split('-').map(Number);
  const first = new Date(Date.UTC(year, m - 1, 1));
  const start = new Date(first);
  start.setUTCDate(1 - (first.getUTCDay() + 6) % 7);
  return Array.from({length:42}, (_, i) => {
    const d = new Date(start); d.setUTCDate(start.getUTCDate() + i);
    return `${d.getUTCFullYear()}-${pad(d.getUTCMonth()+1)}-${pad(d.getUTCDate())}`;
  });
}
export function shiftMonth(month: string, delta: number) {
  const [y,m] = month.split('-').map(Number);
  const d = new Date(Date.UTC(y, m - 1 + delta, 1));
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth()+1)}`;
}
// Generous UTC margins cover every IANA offset at the displayed grid edges.
export function gridRange(days: string[]) {
  return {start:new Date(Date.parse(days[0]+'T00:00:00Z')-2*86400000), end:new Date(Date.parse(days.at(-1)+'T00:00:00Z')+3*86400000)};
}
export function occursOn(e: CalendarEvent, day: string, timeZone: string) {
  return localInput(e.startAt, timeZone).slice(0,10) <= day && localInput(new Date(Date.parse(e.endAt)-1), timeZone).slice(0,10) >= day;
}
