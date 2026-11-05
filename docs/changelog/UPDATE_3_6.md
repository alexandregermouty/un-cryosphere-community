# Version 3.6 — logo review, meetings and news

## Deploy

Extract this archive. Copy the contents of dacs-community-spark into your existing DACS_CryoHub folder, replacing the source, rules, indexes, configuration and entire dist folder. Keep your .env.local. The supplied production build targets cryohub-eb898.

```bash
cd /Users/alexandregermouty/Desktop/Websites/DACS_CryoHub
firebase deploy --project cryohub-eb898 --only hosting,firestore
```

Deploy rules, indexes and Hosting together. Wait for any new indexes to finish building in Firebase Console → Firestore Database → Indexes. Press Cmd+Shift+R in the Hub. No build command is needed for this release. Firebase Spark is retained.

## Logo review: first use

1. Sign in to the Hub as UNESCO Secretariat. The existing Google owner login remains alexandregermouty@gmail.com.
2. Open **Logo review → Add requests → Load a register file**.
3. Choose **data/logo-register.json** from the extracted package. It contains the 11 requests supplied in DACS Logo(1).zip, exported 28 September 2026. Existing matching request references are skipped.
4. Open a request and choose its **Assigned to** bodies. Their appointed leaderships receive dossiers in Logo review. A person with several appointments can switch reviewing body.
5. Use the original screening, weighted assessment, reviews, decisions, reporting, history, import and export workflows. Applicant contacts, reporting codes and applicant reports remain private to UNESCO Secretariat.
6. For an authorised activity, issue a reporting code and copy the applicant message. The new reporting address is https://cryohub-eb898.web.app/logo-desk/report.html. Applicants need their reference and code, without a Hub account.

The supplied register is a dated snapshot. Live edits, reviews or applicant reports stored only in the previous dacs-logo-application-review project are not copied automatically. Keep that project until any newer records have been reconciled. Old reporting links continue to target the previous project; issue new Hub reporting links for future reports.

The register file sits outside dist and is not published by Hosting. Keep it private. Logo review uses the Hub login and its protected roles; the standalone account/password management page is removed. Manage appointments in Hub Governance or UNESCO Secretariat access controls.

**Tab access:** Lead, Associate Lead, WG/body Secretariat, Chairperson, Vice-chairperson and Co-chairpersons through protected badges or governance appointments. Core Group membership alone does not grant access. A WG/body Secretariat has scoped review rights; only UNESCO Secretariat has full register editing. Ordinary reviewers see assigned requests and their decision history, and can write their own reviews. Role revocation takes effect through live permissions.

## Meeting polls and notifications

- **Meeting polls → Create scheduling poll**: select WG1–5, CFD, Alliance or another appointed body, choose Leadership / Core Group / Broad Group, enter up to 12 proposed times and a response deadline, and select the main goals.
- Leadership means appointed Leads, Associate Leads, Secretariats and chairpersons. Core Group adds appointed Core Group members. Broad Group adds affiliated members. WG interests qualify members for broad WG polls; CFD and Alliance membership follows protected appointments/badges.
- Invitations appear in the **notification bell** and Meeting polls for eligible members at sign-in and through live updates. They are Hub notifications; no email or Microsoft invitation is sent.
- Participants vote Available / If needed / Unavailable in their device time zone. The comparison view shows UTC, chosen zones and responding participants’ zones. Results rank availability and flag meetings extending outside 08:00–19:00 locally. Organisers should rotate inconvenient slots.
- Choose **Schedule this time** to publish the meeting in the Calendar. The poll and event are saved together. Proposed times and durations are fixed after publication so existing votes retain their meaning. Create a new poll for different options.
- Leadership may close a poll. UNESCO Secretariat may delete it. A scheduled poll remains linked to its calendar meeting; remove the meeting before deleting the poll. Responses close at the deadline or once the meeting is scheduled.
- The latest 40 polls per body are shown, with a notice at the limit. Up to 200 participant responses are counted in the displayed results; large meetings may need a separate process.

## Meeting rhythm and agendas

Leads, Associate Leads and Secretariats of WG1–5, CFD and Alliance receive reminders 21 days after the last completed meeting; the notice becomes urgent at 28 days. An upcoming meeting or an active scheduling poll suppresses the notice. For a body with no recorded meeting, the clock starts at first activation of the new tools. The check updates every minute in the browser. No server scheduler runs while everyone is disconnected.

Calendar meeting creation offers **Leadership Meeting**, **Core Group Meeting** and **Broad Group Meeting**. Only scoped leadership and UNESCO Secretariat can create or edit meetings on behalf of that body. Other members retain public-event creation.

- Click a date to see its events and open a meeting.
- Calendar titles, dates, descriptions, locations and OC/MG contributions remain visible to signed-in Hub members. Put confidential material in the agenda, not the public description.
- Joining/registration links and the agenda are restricted to the selected audience in Firestore.
- Agenda items have a position, title, duration, presenter and notes. Leadership can edit every agenda of their body. Appointed Core Group members can edit Core Group and Broad Group agendas, with no editing of Leadership agendas or another body’s agendas.
- Item edits use separate documents, preserving other people’s agenda items. The first 50 agenda items are displayed.
- UNESCO Secretariat can classify an existing public event as a body meeting through Edit → Meeting category. Select the correct body and main goals. Its joining link moves into the restricted meeting-details record.

## News

**News → Share news** publishes a title, update, body and optional source link. Every member can comment. Authors edit/delete their own posts and comments; UNESCO Secretariat can moderate all posts and comments. The latest 50 posts and 50 comments per post are shown. Legacy community updates appear in News.

## Validation

Production TypeScript build, 51 Firestore permission tests and 24 membership, calendar, OC/MG and meeting audience/reminder/ranking tests (75 automated checks). Browser checks cover shared Hub authentication, logo register import/reviews, applicant reporting, live role revocation, poll invitations, timezone voting, publication, private links, collaborative agendas, news/comments and mobile layout.

No Cloud Functions, paid email provider, Cloud Storage or billing upgrade is introduced. The platform uses bounded live queries; Firebase Spark quotas still apply.
