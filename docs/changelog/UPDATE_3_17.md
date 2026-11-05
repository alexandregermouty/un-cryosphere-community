# Version 3.17 · Messages, moderation, shared files, member pages and welcome video

This version changes the database rules, so deploy hosting and rules together:

```bash
firebase deploy --project cryohub-eb898 --only hosting,firestore
```

Before deploying, run the rules tests on your computer (they need the Firestore emulator):

```bash
npm run test:rules
```

## Messages (private chat between members)

- A new "Messages" item under Network. A member finds someone by name, organisation or headline, or opens a profile and chooses "Send a message".
- Messages appear instantly for both people. Unread conversations are counted in the menu, and a short notice appears when a message arrives while the member is elsewhere on the platform.
- Enter sends a message; Shift + Enter starts a new line. Messages can be up to 4,000 characters.
- Members cannot edit or delete their messages, so a report always shows what was written.
- The Messages page tells members, in plain words, that moderators appointed by the UNESCO Secretariat can read conversations, in particular when one is reported.

## Moderation

- **Moderators.** The account alexandregermouty@gmail.com is always a moderator, as long as it signs in with a verified email. Under "Chat moderation → Moderators", only that account can appoint up to 20 other members as moderators, and remove them. Other UNESCO Secretariat accounts are not moderators unless appointed.
- **Reporting.** A member can report a whole conversation, or one message from the other person, with a reason. The other person is not notified.
- **Alerts.** Reports appear for every moderator under "Chat moderation", with a count in the menu and a notice on screen when a new report arrives.
- **Moderators can:**
  - read every conversation, with the reported message highlighted;
  - remove a message, after which both members see "This message was removed by a moderator";
  - mark a report as resolved, with a note on how it was handled.
- **Email alerts are not available on the current free plan.** As explained for version 3.16, sending email needs the Blaze plan and a server function.

## Shared files (PDF, Word, PowerPoint)

The leadership of a body (Lead, Associate Lead, Secretariat) and the UNESCO Secretariat can attach up to five files of 10 MB each:

- to news (News page and "Share an update" on Home);
- to calendar events and meetings;
- to activities;
- to topics and replies in the Working Group discussion forums.

PDF files open in a new tab; Word and PowerPoint files download. Files attached to a restricted meeting can only be opened by that meeting's audience. Other members do not see the attach button.

**Where the files are kept.** Cloud Storage for Firebase now requires the Blaze plan, for new and existing projects, so on the Spark plan each file is stored in Firestore in parts (`files/{id}` and `files/{id}/chunks/{n}`). The Spark plan includes 1 GiB of Firestore storage for the whole platform, and a stored file takes about a third more space than its size. For large or numerous documents, keep using SharePoint links. If the project moves to the Blaze plan later, the files can be moved to Cloud Storage.

## Member pages

A member's page now follows the design of the meeting pages:

- a header in the colour of their Working Group, with the DACS pattern, their photo, organisation, country and region;
- their badges, and buttons to send a message, write an email (when they share their address) or open their professional profile;
- summary cards for Working Group interests, availability, languages and career;
- sections for expertise, cryosphere focus, "About", "Why I joined" and "Potential contributions";
- for the UNESCO Secretariat, a marked box with the answers visible only to it;
- their participation record at the bottom.

## Welcome video

- A tour of about 80 seconds, with captions and no sound: Home, the menu, Members and profiles, Messages, Working Group spaces, Activities, the Calendar and event pages, Polls and consultations, the bell and the profile.
- It opens automatically once, the first time a member signs in with a completed profile (existing members also see it once). This is remembered in the member's preferences, so it does not reappear on another device.
- "Watch the welcome video" in the account menu plays it again.
- The video was recorded from the preview with sample data, which a label in the video says. Files: `public/assets/video/welcome.mp4` and `welcome.webm`, plus a poster image.

## Text changes

- **Mailing lists:** removed the paragraph that began "Lists are nested".
- **Core Group workspace:** removed "Folders open in SharePoint in a new tab. SharePoint permissions decide who can open each folder."
- **Governance:** the description now reads "Governance model of the Decade. Open the space of a body, or select it in the chart to view its appointments."
- **Logo review:** removed "Assigned requests · your reviews are recorded under your Hub profile."

## Files

- New:
  - `lib/chat-store.ts`, `lib/files-store.ts`
  - `app/messages.tsx`, `app/chat-monitor.tsx`, `app/attachments.tsx`, `app/member-sheet.tsx`, `app/welcome-video.tsx`
  - `public/assets/video/*`
- Changed:
  - `firestore.rules`: collections `chats`, `chats/{id}/messages`, `chatReports`, `config/chatMonitors` and `files`; an optional `attachments` field on posts, events, activities and discussion messages; an optional `welcomeSeen` field in preferences.
  - `tests/rules.test.mjs`: three new tests.
  - `app/community.tsx`, `app/calendar.tsx`, `app/news.tsx`, `app/discussion.tsx`, `lib/store.ts`, `lib/discussion-store.ts`, `app/globals.css`.
- No new Firestore index is needed.
