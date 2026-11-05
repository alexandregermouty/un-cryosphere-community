# Version 3.16 · Mailing lists and declared roles

This version changes the database rules, so deploy hosting and rules together:

```bash
firebase deploy --project cryohub-eb898 --only hosting,firestore
```

Before deploying, run the rules tests on your computer (they need the Firestore emulator):

```bash
npm run test:rules
```

## Mailing lists

A new "Mailing lists" item under Coordination. It is shown to the leadership (Lead, Associate Lead, Secretariat) and Core Group members of any group, and to the UNESCO Secretariat. Broad Group members do not see it.

- For each group they help coordinate, a member finds three lists:
  - **Leadership:** Leads, Associate Leads and Secretariat.
  - **Core Group:** leadership and Core Group.
  - **Broad Group:** leadership, Core Group and Broad Group.
- **Decade-wide:** every registered member. Only the UNESCO Secretariat sees this list.
- **Email in Bcc** opens a new message in the member's email program, addressed to themselves, with the list in Bcc and a subject prefix such as "[DACS · WG1 Core Group]". Email programs reject very long links, so a large list is split into "Part 1 of 3" and so on.
- **Copy** puts the addresses on the clipboard, separated by semicolons, for pasting into Outlook or Gmail.
- The arrow button shows the names on the list.

### How the lists are filled

Email addresses are not stored in member profiles, and the Spark plan has no server to read them from Firebase Authentication. Each member's browser therefore adds the member's own sign-in email to the lists of the groups they belong to, when they sign in.

- The database rules check that the address is the member's own sign-in email, and that the member really holds the level they are listed at (Leadership, Core Group or Broad Group).
- When the UNESCO Secretariat changes a member's roles or a body's appointments, the lists of the members concerned are updated at once.
- **Members who have not signed in since this version are not yet on the lists.** The Decade-wide card tells the UNESCO Secretariat how many of the loaded members are missing, and names them.
- The consent step of the profile now explains that the sign-in email is not shown to other members and is used for these lists.

## Declared roles

The profile has a new step, **Your role**, after "Your expertise", both at registration and later under My profile.

- For each Working Group and governing body, the member chooses one of: Lead (or Chairperson / Co-chairperson), Associate Lead (or Vice-chairperson), Secretariat, Core Group member (Committee member for the committees), Broad Group member, "Unsure of my role", "None yet · I wish to apply", or "Not part of this group".
- An optional note to the UNESCO Secretariat can say how the member was appointed.
- Until the Secretariat decides, the member takes part as a member of the community. Each declared role then shows "Awaiting confirmation", "Confirmed", "Confirmed as …" or "Declined".

Under **UNESCO Secretariat**, a new "Declared roles" section lists the declarations awaiting a decision. The menu shows how many are waiting.

- For each declared role the Secretariat chooses "Confirm", "Assign as …" (another role), "Decline", or "Decide later".
- It shows when the member already holds the role, their current role in that group, and when confirming would replace the current holder of a single seat (for example the Lead).
- A confirmed or assigned role is recorded exactly as with "Manage access & badges". The member therefore appears in the Governance appointments and gains the related access. "Manage access & badges" remains the place to adjust a role later.
- If a member later changes a role that was already decided, the declaration returns to the Secretariat for review.

## Other changes

- The step bar of the profile adapts to the number of steps.
- The number of the current step no longer disappears while the mouse is over it.

## Files

- New: `lib/mailing.ts`, `lib/mailing-store.ts`, `lib/role-claims.ts`, `lib/role-requests.ts`, `app/mailing-lists.tsx`, `app/role-requests.tsx`, `tests/mailing.test.mjs`.
- Changed: `firestore.rules` (collections `mailingLists/{list}/entries/{uid}` and `roleRequests/{uid}`), `tests/rules.test.mjs` (two new tests), `app/community.tsx`, `app/profile-editor.tsx`, `lib/store.ts`, `app/globals.css`.
- No new Firestore index is needed: the only filtered query (`roleRequests` where `status == "pending"`) uses a single equality filter.
