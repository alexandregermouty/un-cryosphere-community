# Version 3.18 · Group conversations, notification centre, Home introduction and Terms of Reference

This version changes the database rules, so deploy hosting and rules together:

```bash
firebase deploy --project cryohub-eb898 --only hosting,firestore
```

Before deploying, run `npm run test:rules` on your computer (two new tests).

## Profiles: gender and feeling about the Decade

These two answers can now be seen by all signed-in members on a member's profile, in a box under the member's background.

- Members were told when they registered that these answers are visible only to them and the Secretariat. So they appear only for members who tick the new option in the last step of their profile: "Show my gender and how I feel about the Decade on my profile, to signed-in members".
- The texts beside the two questions have been updated accordingly.
- The answers stay excluded from member searches and matching.
- The UNESCO Secretariat continues to see the answers members keep private, and the "support that would help" feedback, in the box marked "Visible to the UNESCO Secretariat only".

## Messages

- **Role badges.** In a conversation, the other member's role in the Decade (their badges) appears under their name. In the list of conversations, their main role appears under the name.
- **New notice.** It now reads: "Conversations are private between Members. However, to keep the community safe, you may report a conversation to UNESCO Secretariat."
- **Reporting.** The report window explains that the report goes to the UNESCO Secretariat, which can then read the conversation, and that the other members are not notified.
- **Group conversations.** "New group" starts a conversation with a name and at least two other members, up to 30 people.
  - Messages show the name of their author.
  - The creator of a group can rename it, and add or remove members.
  - Any member can leave a group.
  - Groups can be reported and moderated like any conversation.

## Notification centre (bell)

The bell now also shows:

- **Messages:** recent conversations, with unread ones highlighted. Choosing one opens it.
- **In the groups you follow:**
  - news of the last three weeks;
  - events of the next three weeks;
  - activities opened in the last three weeks.

  These cover the Working Groups the member follows, or the Working Groups of their profile if they follow none. Decade-wide news and events are included. Items that are new since the bell was last opened are marked and counted.

## Home

A short introduction to the Decade and the platform now opens Home, drawn from the Coordination Hub on SharePoint and the official website. It has two cards linking to the reference documents:

- the Synthesis of the Decade, on UNESDOC;
- UN General Assembly resolution A/RES/78/321.

A member can hide the introduction; it then becomes a single line with the same links.

## Terms of Reference

The Terms of Reference of Working Groups 1 to 5, the Strategic Management Committee, the Executive Steering Committee and the Cryosphere Finance Dialogue appear on each page in two places:

- a "Terms of Reference" button in the header;
- a card at the top of the page.

They open in a reader inside the platform, with "Open in a new tab" and "Download". The PDFs are in `public/assets/tor/`. Like every file in that folder, they can be opened by anyone who has the exact link.

No Terms of Reference were provided for the Alliance for the Cryosphere or the Indigenous Advisory Committee. To add one later, put the PDF in `public/assets/tor/` (`alliance.pdf` or `iac.pdf`) and add a line to `app/terms-of-reference.tsx`.

## Footer

The footer text now reads: "DACS Community connects the people contributing to the United Nations Decade of Action for Cryospheric Sciences 2025-2034. The Decade Secretariat is hosted by UNESCO’s Intergovernmental Hydrological Programme."

## Files

- New:
  - `app/decade-intro.tsx`, `app/terms-of-reference.tsx`
  - `public/assets/tor/*.pdf`
  - `public/assets/synthesis-cover.webp`, cropped from the Coordination Hub screenshot
- Changed:
  - `firestore.rules`: group conversations, and the profile fields `showBackground`, `publicGender` and `publicSentiment`.
  - `app/messages.tsx`, `lib/chat-store.ts`, `app/meeting-hub.tsx`, `app/member-sheet.tsx`, `app/profile-editor.tsx`, `lib/store.ts`, `app/community.tsx`, `app/chat-monitor.tsx`, `app/globals.css`, `tests/rules.test.mjs`.

## 3.18.1

The resolution card on Home shows the United Nations emblem, on UN blue, in place of the building icon. It is also used beside "Resolution 78/321" when the introduction is hidden. File: `public/assets/un-emblem-white.png`.

Deploy hosting only: `firebase deploy --project cryohub-eb898 --only hosting` (or `--only hosting,firestore` if 3.18 is not yet deployed).
