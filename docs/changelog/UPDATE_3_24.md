# Version 3.24 · Activities, authorship, Broad Group membership

This version changes the database rules. Deploy hosting and rules together:

```bash
firebase deploy --project cryohub-eb898 --only hosting,firestore
```

Run `npm run test:rules` on your computer first. Two tests are new (editing activities, and Broad Group mailing lists), in addition to those from versions 3.22 and 3.23.

## Activities

### New design

- Activity cards show the Working Group colour, the type of contribution, the flagship project the activity belongs to, the requested expertise and the person who proposed it.
- The activity window opens with a coloured header: Working Groups, status, title, and who proposed it and when.
- Time, region, language and deadline are shown as four facts.
- The window then shows what is asked, the expertise requested (shared expertise is ticked), the main goals and the flagship project, and the member's profile match as a ring.

### Editing and deleting

- The person who proposed an activity, and the UNESCO Secretariat, see **Edit** and **Delete** in the activity window.
- The person who proposed it can change its content: title, description, expertise, region, language, time, deadline, main goals of the same Working Group, files and flagship project. Its Working Group and its status (awaiting review, open, closed) remain decided by the Working Group managers. The database enforces this.
- The UNESCO Secretariat can change everything, including the reviewing Working Group.
- When the Secretariat deletes an activity, the expressions of interest in it are deleted with it. When the person who proposed it deletes it, the expressions of interest already recorded stay in the members' "My contributions".

## Who created what

A line with the person's photo and name now shows who created each item:

- activities (on the card and in the window);
- events (on the card and in the event window);
- scheduling polls (on the card and in the poll window);
- consultations, decisions of the register, and tasks;
- flagship projects ("Updated by", with the date of the last change, since earlier records did not keep their author).

News items and forum posts already showed their author.

## Task boards

The tabs and labels of the CFD, Alliance, SMC, ESC and IAC boards now use their full names: Cryosphere Finance Dialogue, Alliance for the Cryosphere, Strategic Management Committee, Executive Steering Committee and Indigenous Advisory Committee.

## Broad Group membership

### Working Group pages

The Members tab now separates three groups:

1. **Leadership and Core Group**: the members appointed in the group.
2. **Broad Group**: members confirmed by the UNESCO Secretariat, with the "Broad Group member of WG…" badge.
3. **Interested members**: members who selected the group in their profile but are not confirmed.

### Applying

- Next to "Follow group", each Working Group page now has **Apply to join the Broad Group**.
- The application is added to the member's role declaration ("None yet · I wish to apply") and appears in the UNESCO Secretariat's list of role requests, where it is confirmed or declined.
- While it is under review, the button reads "Application sent".
- Once confirmed, the member receives the badge and the button reads "Broad Group member".
- A member who was declined can apply again.

### Mailing lists

- The Broad Group list of a body now contains only members confirmed with its Broad Group badge, together with its leadership and Core Group.
- Members who only selected the group in their profile are no longer included.
- The database refuses a Broad Group entry from a member without the badge.
- The page also checks every entry against the members' current roles, so entries written before this version are left out at once, without waiting for those members to sign in again.

Access to Broad Group meetings, polls and consultations is unchanged: it still includes members who selected the group in their profile. This can be aligned with the Broad Group badge on request.

## Files

- New: `app/activity-detail.tsx`, `app/people-context.tsx`.
- Changed: `firestore.rules` (activity edits and deletion by the person who proposed it; Broad Group mailing entries), `lib/store.ts`, `lib/mailing.ts`, `app/mailing-lists.tsx`, `app/community.tsx`, `app/wg-page.tsx`, `app/task-board.tsx`, `app/workplan.tsx`, `app/meeting-hub.tsx`, `app/calendar.tsx`, `app/consultations.tsx`, `app/decisions.tsx`, `lib/coordination.ts`, `app/globals.css`, `tests/mailing.test.mjs`, `tests/rules.test.mjs`, `package.json`, `package-lock.json`, `README.md`.
