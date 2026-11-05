# Version 3.12 — minutes and actions, work plans, dashboard, decision register, consultations, calendar files, digest and members map

## Deploy this update

Extract the archive and copy the contents of dacs-community-spark into your existing DACS_CryoHub folder. Replace the source, the entire dist folder, firestore.rules and the configuration files. Keep your .env.local. The included production build targets cryohub-eb898.

```bash
cd /Users/alexandregermouty/Desktop/Websites/DACS_CryoHub
firebase deploy --project cryohub-eb898 --only hosting,firestore
```

**Deploy Hosting and Firestore together.** New Firestore rules protect minutes, actions, work plans, decisions and consultations; without them these features show a permission message. No new Firestore index is needed. Press Cmd+Shift+R in the Hub after deployment.

Before deploying, run the permission tests on your computer (Java 17 or later): `npm run test:rules`. Four new tests cover the new collections (59 in total).

To rebuild from source, run `npm ci` first: three packages are added for the members map (`d3-geo`, `topojson-client`, `world-atlas`).

## 1. Minutes and action items

Open a Leadership, Core Group or Broad Group meeting in the **Calendar**. Under the agenda, **Minutes and actions** shows:

- **Minutes**: a summary of the discussion and the decisions. Written by the people who edit the agenda (leadership, and Core Group members for Core and Broad Group meetings). Read by the meeting's audience.
- **Action items**: what needs to be done, who is responsible (any member in the directory) and the due date. Overdue actions are marked in amber, actions due within seven days in blue.
- The person responsible can tick their own action as done. Agenda editors can add, edit, reopen and delete actions.

Each member's open actions appear in **My actions** on the home page and in the bell (**Your actions**). Overdue actions and actions due within seven days count in the bell's number. **Meeting and minutes** opens the meeting.

## 2. Work plans

- Each Working Group page has a **Work plan**: deliverables and milestones grouped by the group's three main goals, each with a due date, a status (Planned, In progress, Delayed, Completed), a responsible person or team and notes. A bar shows progress.
- **Work plans** (Coordination menu) shows all five groups on one page, with a status filter and **Export CSV**.
- All members can read the work plans. The group's leadership and Core Group members add and edit items. Items can only be linked to the group's own main goals.

## 3. Secretariat dashboard

**Dashboard** (Administration menu, UNESCO Secretariat only):

- Registered members (including private profiles), new members in the last 30 days, activities awaiting review, and logo requests at 30–40 or beyond 40 working days.
- Members by Working Group interest, region, gender and professional experience. **Gender and professional experience are shown only as totals, never per person.** Each table downloads as CSV; **Summary report (CSV)** downloads all figures in one file for reports to the ESC or the IHP Council.
- **Meeting rhythm**: the last and next meeting of every body, days since the last meeting, and the number of meetings in the last 13 months (CSV available).
- **Activities awaiting review** and **logo requests** close to or past the 40 working-day target. Working days are counted exactly as in the logo desk: Level 1 requests, Monday to Friday, without the time spent awaiting the applicant.
- The **members map** and the **weekly digest** (see 7 and 8).

## 4. Decision register

- **Decision register** (Coordination menu) lists the decisions of the SMC and the ESC: date, reference, title, text and a link to the meeting and its minutes. Search, filter by body and export to CSV.
- The SMC and ESC pages under Governance show their latest decisions.
- The chair, vice-chair, co-chairs and Secretariat of each committee, and the UNESCO Secretariat, record and edit entries.
- Each entry is shared either with the members of the committee only or with all members of the Hub.

## 5. Calendar files

Every event and meeting in the Calendar has **Add to your calendar**: an .ics file for Outlook and Apple Calendar, or a pre-filled event in Google Calendar or Outlook on the web. Times are in UTC inside the file, so each calendar shows the member's local time.

## 6. Consultations

**Meeting polls** is renamed **Polls & consultations** and has two tabs: **Scheduling polls** (unchanged) and **Consultations**.

- Leadership of a body starts a consultation for its Leadership, Core Group or Broad Group, with up to ten questions: Yes / No / Abstain, one choice from a list (two to eight options), or a short written answer. They set the closing date.
- Members of the audience see open consultations in the bell, answer under their profile name and can change their answers until it closes.
- Organisers see live results (bars, percentages and written answers) and the list of respondents, export to CSV, close the consultation early and choose to **share the results** with participants.

## 7. Weekly digest

On the Dashboard, **Weekly digest** collects new members (only those visible in the directory), news, meetings and events in the next three weeks, and open calls, for the last 7 days, 14 days or month. **Copy for email** copies a formatted version to paste into a new Outlook message; **Copy as text** copies plain text.

## 8. Members map

- **Members → Map** shows members visible in the directory by the country in their profile, with a filter by professional experience.
- The Dashboard map covers every registered profile and also filters by gender.
- The map shows land and coastlines only, **without national borders**, and carries the standard UNESCO disclaimer on designations and boundaries.
- Countries the map cannot place (for example a misspelling) are listed under the map.
- Country positions come from Natural Earth data (`lib/country-centroids.ts`, generated by `scripts/gen-country-centroids.mjs`).

## Validation

Production TypeScript build and 44 pure checks pass, including six new checks for calendar files, CSV, working days and logo deadlines, action states, consultation results, the digest and country matching. Four new Firestore permission tests were added but could not run in the preparation environment (emulator download blocked); run `npm run test:rules` before deploying. Visual checks with sample data covered the home page and bell, a meeting with minutes and actions, work plans, the decision register, consultations and results, the dashboard on desktop and phone, and the members map in light and dark modes.
