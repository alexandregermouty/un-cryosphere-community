# Version 3.26 · Logo review access, mailing lists, news

This version changes the database rules. Deploy hosting and rules together:

```bash
firebase deploy --project cryohub-eb898 --only hosting,firestore
```

Run `npm run test:rules` on your computer first. One test is new (logo review access) and the mailing lists test has changed.

## Logo review access

### What changes

- The setting "Working Group review access" in "Manage access & badges" is replaced by "Logo review access".
- The UNESCO Secretariat ticks, for each member, the bodies whose logo requests the member may review: Working Groups 1 to 5, the Strategic Management Committee (SMC) and the Executive Steering Committee (ESC).
- A member sees "Logo review" in the menu, and can open the logo review desk, only if at least one body is ticked for them. The UNESCO Secretariat always has access.
- Appointments no longer grant this access. Before this version, every lead, associate lead and secretariat of a body could review its logo requests automatically. They now need to be given access in "Manage access & badges".
- In the logo review desk, the bodies that can be assigned to a request are now WG1 to WG5, SMC and ESC. The CFD, the Alliance and the IAC are no longer offered.
- The database enforces this: a member can read a logo request, and give an opinion on it, only for a body ticked for them.

### Action needed after deployment

The members who reviewed logo requests until now (the leadership of the Working Groups, the SMC and the ESC) lose access when this version is deployed. Open "Manage access & badges" for each person who should keep reviewing, tick their bodies under "Logo review access", and save.

### The former "Working Group review access"

- The former setting is no longer offered. Appointments in Governance continue to give the leadership and Core Group of each Working Group the right to review and publish its activities.
- Members who had a Working Group ticked under the former setting keep it until it is removed. Their "Manage access & badges" window shows a note naming these groups, with the button "Remove the former access".

## Mailing lists

- The "Mailing lists" page is now shown only to the leadership of each body (lead, associate leads and secretariat) and to the UNESCO Secretariat.
- Core Group members no longer see it, and the database no longer lets them read the lists of their body.
- Core Group members remain on the lists, and their own email address is still kept up to date automatically.

## News

### News page

- Filters by body are shown as buttons (All news, WG1 to WG5, CFD, Alliance, SMC, ESC, IAC) instead of a drop-down list.
- Each news card carries the colour of its Working Group or body, a coloured label, the date, the title, the first lines of the text, the number of files, a link to the source and the number of main goals it contributes to.
- The latest news item is shown across the full width of the page.
- The person who shared the news is shown with their photo at the bottom of the card.
- News items without a title show the first sentence of their text as their title.

### Reading window

- The window opens with a coloured header: body, date, title, and the person who shared the news with their photo and the date.
- The person who shared the news and the UNESCO Secretariat can edit or delete it from the header.
- The text is shown in a larger font, followed by a button to open the source, the files and the main goals.

### Comments

- Comments are shown in the order they were written, as a conversation, each with the author's photo. The member's own comments are highlighted.
- Edited comments are marked "edited".
- The comment box shows the member's photo and posts with the Post button or Ctrl + Enter.

### Sharing news

- A title is now required.
- The field "Body" is renamed "Shared for", with "The whole Decade community" as the default.
- The number of characters used is shown under the text.
