# Alignment of news and events with IHP-WINS

Version 3.30 aligns the news and event forms of DACS Community with the IHP-WINS forms "Share News" and "Share New Event". The fields shared by both sites use the IHP-WINS names, order, options and limits, so that each DACS entry can be converted into an IHP-WINS entry without manual re-entry. The fields specific to the Decade (Decade bodies, meeting categories, Core Group and leadership meetings, overarching challenges and main goals, comments, attendance, minutes) are kept and remain in DACS Community only.

The conversion is defined in `lib/wins.ts` (functions `winsNews` and `winsEvent`) and tested in `tests/wins.test.mjs`.

## Which entries are shared

1. Every news item and every public event is shared as public. The forms do not ask for a visibility.
2. Internal meetings (leadership, Core Group and Broad Group meetings of a Decade body) are never shared.
3. Shared entries are sent with the action "submit for validation", so the IHP-WINS team validates them before publication.
4. The organization is always "Intergovernmental Hydrological Programme". The associated initiative is "Decade of Action for Cryospheric Sciences"; its exact name in IHP-WINS is to be confirmed (constant `WINS_INITIATIVE` in `lib/wins.ts`).

## Share News

| IHP-WINS section | IHP-WINS field | DACS Community field (`posts` collection) | Notes |
| --- | --- | --- | --- |
| 1. Article Information | Article Title * | `title` (required) | Up to 160 characters. |
| | Article URL | generated from `title` | Lowercase, accents removed, words joined by hyphens. |
| | Publication Date * | `publishedOn` (required, YYYY-MM-DD) | Defaults to the day of writing. |
| | Author/Source | `source` | Defaults to the member who shares the news. |
| | Visibility | fixed | Always public. |
| | Organization | fixed | Intergovernmental Hydrological Programme. |
| 2. Article Content | Article Summary * | `summary` (required, 300 characters) | |
| | Full Article Content * | `body` (required) | Limit raised from 3,000 to 10,000 characters. |
| 3. Additional Information | Attachment (PDF) | first PDF in `attachments` | DACS files are limited to 10 MB; IHP-WINS accepts 20 MB. |
| | Original Source URL | `url` | |
| | Related Links | `relatedLinks` | Up to ten links. |
| | Additional Content | `additionalContent` | Up to 3,000 characters. |
| 4. Images | Header Image | `headerImageUrl` or `headerImageId` | Upload (cropped to 1200x600px, stored in `contentImages`) or link. |
| | Upload Additional Images | not available | Only external image links are offered, as the Spark plan has no file storage. |
| | External Image URLs | `imageUrls` | Exported in Markdown format, one image per line. |
| 5. Member States & Initiatives | Member States | `memberStates` | IHP-WINS values, including "All member states". |
| | Associated initiatives | fixed | Decade of Action for Cryospheric Sciences. |
| DACS only | Shared for, main goals | `bodyId`, `wg`, `mgs` | Exported under `dacs` for reference. |

## Share New Event

| IHP-WINS section | IHP-WINS field | DACS Community field (`events` collection) | Notes |
| --- | --- | --- | --- |
| 1. Event Information | Event Title * | `title` (required) | |
| | Event URL | generated from `title` | |
| | Event Type | `eventType` | Conference, Workshop, Seminar, Training, Webinar, Meeting, Prize Award Ceremony, Book Launch, Celebration. |
| | Event Start Date * | `startAt` | Date in the event time zone. |
| | Event End Date | `endAt` | Exported only when the event ends on another day. DACS keeps exact start and end times. |
| | Visibility | fixed | Always public; internal meetings are not shared. |
| | Location | `location` | |
| | Primary Organization | fixed | Intergovernmental Hydrological Programme. |
| | Displayed Organizer Name | `organizerName` | Defaults to "Decade of Action for Cryospheric Sciences 2025–2034". |
| | Co-organizers | `coOrganizers` | |
| | Event Format | `format` | `in-person`, `online` or `hybrid`. |
| 2. Event Description | Event Overview * | `description` | Required for public events. Limit raised to 5,000 characters. |
| 3. Event Details | Event Details | `details` | "Label: Value" lines. A "Time:" line is added from the start and end times when none is written. |
| 4. Speakers & Organizers | Speakers & Organizers | `speakers` | |
| 5. Registration Information | Registration Information | `registrationInfo` | |
| | Registration URL | `registrationUrl` | |
| 6. Image Gallery | External Image URLs | `imageUrls` | Upload of gallery images is not available (see news). |
| 7. Agenda & Additional Information | Agenda or Flyer | first PDF in `attachments` | |
| | Additional Information | `additionalInfo` | |
| 8. Header Image | Header Image, Header Image URL | `headerImageUrl` or `headerImageId` | Upload cropped to 1600x600px, or link. |
| 9. Summary/Excerpt | Excerpt | `summary` | When empty, the first 300 characters of the overview are used. |
| 10. Member States & Initiatives | Member States, Associated Initiatives | `memberStates`, fixed initiative | |
| DACS only | Time zone, meeting category, organising body, virtual meeting link, main goals, poll | `timeZone`, `meetingType`, `body`, `joinUrl`, `ocs`, `mgs`, `pollId` | Not sent to IHP-WINS. The virtual meeting link is not exported. |

## Member States and countries

DACS Community uses the country names approved by UNESCO, as written in the Official Directory of Permanent Delegations to UNESCO (https://pax.unesco.org/PermanentDelegations/PermanentDelegationsAll.html): the 188 Permanent Delegations and the Permanent Observer (Holy See). The list is in `lib/countries.ts`. It is used for the Member States of news and events and for the country in member profiles, including at registration.

IHP-WINS writes some names without accents or punctuation (for example "C Te D Ivoire" and "T Rkiye"). On export, each UNESCO name is converted to its IHP-WINS value (function `winsState` in `lib/wins.ts`); "Netherlands (Kingdom of the)" becomes "Netherlands". All 189 names have an IHP-WINS value.

## Automatic synchronisation: what is still needed

The Firebase Spark plan has no server functions, so DACS Community cannot push entries by itself. The intended set-up is a scheduled GitHub Actions workflow that reads new or changed shared entries from Firestore with a service account, converts them with `winsNews` and `winsEvent` (`lib/wins.ts`), sends them to IHP-WINS, and records the IHP-WINS identifier on the DACS entry. The following must be obtained from the IHP-WINS team before it can be built:

1. The API endpoints for creating and updating news and events, and the authentication method (API key or service account).
2. The identifiers expected for the organization, the initiative, the Member States and the event types, if they differ from the labels.
3. How header images and PDF attachments are uploaded through the API.
4. Whether updates and deletions made in DACS Community should be passed on to IHP-WINS, and whether entries created in IHP-WINS should flow back to DACS Community.
