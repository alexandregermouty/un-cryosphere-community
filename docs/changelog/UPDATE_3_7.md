# Version 3.7 — compact logo layout, timezone menus and Decade-wide contributions

## Deploy this update

Extract the archive and copy the contents of dacs-community-spark into your existing DACS_CryoHub folder. Replace the entire dist folder, source, rules, indexes and configuration. Keep your .env.local. The included production build targets cryohub-eb898; no npm build is needed to publish it.

```bash
cd /Users/alexandregermouty/Desktop/Websites/DACS_CryoHub
firebase deploy --project cryohub-eb898 --only hosting,firestore
```

Deploy Hosting and Firestore together: news records now accept their main goals through the updated rules. Existing profiles, events, polls, news and logo records remain in your database. Wait for any indexes to finish building in Firebase Console → Firestore Database → Indexes, then press Cmd+Shift+R.

## Logo review in a smaller window

At compact widths, the full Logo sections menu appears at the top of the embedded page. Overview, Pipeline, All requests, Decision history, Activity reports, Add requests and Methodology stay available. The menu stays visible during request scrolling and becomes a section selector on a phone; request sections and forms use one column. Pending tasks and UNESCO's role preview stay available. Reviewer choice buttons and the submit control update during typing, preserving the draft text. The old bottom navigation is hidden in the Hub.

Hub access and editing permissions are retained: appointed leadership can review assigned requests; UNESCO Secretariat has full register editing. The same Hub account is used.

The supplied data/logo-register.json remains a private, unpublished snapshot of the 11 requests exported on 28 September 2026. If the Hub register has already been imported, no repeat import is needed. For a first import, open Logo review → Add requests → Load a register file and select that JSON. Reconcile any newer records from the previous logo project before retiring it.

## Calendar and poll timezones

Click Calendar time zone to search by city or region and choose a zone. The default follows the device clock. A manual viewing choice is saved for your account in this browser and shared with Meeting polls; month navigation, refreshes and tab changes retain it. Use device time zone restores automatic detection.

The event form has its own Event time zone control. Changing that zone converts valid entered start and end times from the same instant; it does not move the event. A repeated daylight-saving clock hour requires its occurrence to be selected first. Non-existent clock times remain invalid.

Scheduling polls have a Proposed times zone control. In poll results, Your viewing time zone controls the main time, and Compare another time zone adds a conversion for another city. Invalid timezone text cannot be stored from these menus. Proposed slots remain UTC instants. Participant-zone statistics count the people who have responded; comparison chips flag local hours outside 08:00–19:00 separately.

The Previous month and Next month buttons have 44-pixel click targets and handle sequential clicks. Today returns to the current date in the selected viewing zone. Clicking a date opens its planned events.

## Decade-wide

Events, meeting polls, news, community updates and activity proposals share a Decade-wide checkbox. It selects all 5 OCs and all 15 MGs. Uncheck it to clear the goals, or deselect individual goals for a narrower contribution. Main-goal selection retains the existing automatic parent OC / WG links.

Published Decade-wide events, news and activities appear under all five Working Groups. Activity proposals still have one reviewing WG. A poll's body and selected Leadership / Core Group / Broad Group audience still determine its invitations; goal coverage grants no additional access.

Old records remain readable without a data migration. Editing a record can add its goal coverage. News comments and existing role permissions are retained.

## Validation

26 pure checks and 52 Firestore permission checks (78 automated checks), plus the production TypeScript build. Browser checks cover timezone selection, preserved manual choices, month arrows, midnight date rollover, instant-preserving form conversions, Decade-wide poll/event/news/activity records, compact logo navigation, register import, reviewer decisions, applicant reports, role revocation and mobile layouts.

Firebase Spark is retained; meeting invitations and reminders appear through the Hub notification bell.
