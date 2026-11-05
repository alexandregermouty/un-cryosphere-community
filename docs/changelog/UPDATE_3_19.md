# Version 3.19 · Chat for every member, and banning accounts

This version changes the database rules. Deploy hosting and rules together:

```bash
firebase deploy --project cryohub-eb898 --only hosting,firestore
```

Run `npm run test:rules` on your computer first (one new test).

## "This change needs the relevant member or Working Group permission"

This message appears whenever the database refuses a change. In chat, two causes are possible.

1. **The rules on Firebase are older than the website.** Group conversations (3.18) and the profile option to show gender and feeling (3.18) need the 3.18 rules. Deploying only hosting leaves the old rules in place, and those changes are then refused. Always deploy with `--only hosting,firestore` when the release notes say the rules changed.
2. **The name check when a conversation starts.** The rules compared the names written into a new conversation with the two members' profiles; any difference refused the first message. This check is removed. Every signed-in member with a profile can now write to any other member, in a direct or a group conversation.

When a message cannot be sent, the page now says so in plain words.

## Banning and unbanning accounts

Under **UNESCO Secretariat → members**, each member has a "Ban" button. A banned member shows "Unban" and a red "Banned" line, and a "Show banned accounts only" filter lists banned members.

A banned account:

- sees only a notice that its access is suspended, with a "Sign out" button;
- cannot send messages, publish, comment, propose activities, answer polls or open shared files. The database enforces this, not just the page;
- is hidden from other members (directory, messages, groups) and removed from the mailing lists. The UNESCO Secretariat still sees it.

Unbanning restores access at once; the member rejoins the mailing lists at their next sign-in.

A UNESCO Secretariat account cannot be banned until its UNESCO Secretariat access is removed, and nobody can ban their own account.

Bans are stored in `bans/{uid}` (who banned, and when). No reason is stored, because signed-in members can read this collection to hide banned profiles.

## Files

- Changed: `firestore.rules` (`member()` now excludes banned accounts; `bans`; conversation creation), `lib/store.ts`, `app/governance.tsx`, `app/community.tsx`, `app/messages.tsx`, `app/globals.css`, `tests/rules.test.mjs`.
