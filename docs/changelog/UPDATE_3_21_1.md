# Version 3.21.1 · Badges come only from the UNESCO Secretariat

The database rules have not changed. Deploy the website only:

```bash
firebase deploy --project cryohub-eb898 --only hosting
```

## What was wrong

Version 3.21 showed a "Broad Group member of WG…" badge for every Working Group a member had ticked in their profile. Those ticks record the groups a member is interested in, not a confirmed membership, so some members showed badges that the UNESCO Secretariat had never given them. These badges could not be removed in "Manage access & badges", because they were not stored there.

## What changed

- Badges now come only from what the UNESCO Secretariat records: the badges ticked in "Manage access & badges", the role declarations it confirms, and the appointments in Governance.
- The Working Groups chosen in a profile no longer create any badge. The badges added by version 3.21 disappear as soon as the website is deployed; nothing needs to be cleaned in the database.
- To show that a member belongs to the Broad Group of a Working Group, tick "Broad Group member of WG…" in "Manage access & badges", or confirm the member's declaration under role requests. The badge then appears in the colour of that Working Group, and it can be removed the same way.
- A member without any assigned badge still shows "Broad Group Member".

## Files

- Changed: `lib/member-roles.ts`, `lib/store.ts`, `tests/member-roles.test.mjs`, `package.json`, `package-lock.json`, `README.md`.
