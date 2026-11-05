# Version 3.10 — working documents, governing body spaces and Working Group discussions

## Deploy this update

Extract the archive and copy the contents of dacs-community-spark into your existing DACS_CryoHub folder. Replace the source, the entire dist folder, firestore.rules and the configuration files. Keep your .env.local. The included production build targets cryohub-eb898.

```bash
cd /Users/alexandregermouty/Desktop/Websites/DACS_CryoHub
firebase deploy --project cryohub-eb898 --only hosting,firestore
```

Deploy Hosting and Firestore together: the Firestore rules changed to allow discussions and mention notifications. Without the new rules, the discussion shows a permission message and nobody can post. Press Cmd+Shift+R in the Hub after deployment.

Before deploying, you can run the permission tests on your computer (Java 17 or later): `npm run test:rules`. Two new tests cover discussions and notifications. No new Firestore index is needed.

## Working documents on SharePoint

Each Working Group space now shows **Working documents on SharePoint** at the top right of its banner, next to All Working Groups and Follow group. The button opens that group's SharePoint folder in a new tab.

| Space | SharePoint folder |
| --- | --- |
| WG1 | WG1 - Global Cryosphere Monitoring |
| WG2 | WG2 - Actionable Cryosphere Projection |
| WG3 | WG3 - Cryospheric Risk Management Solutions |
| WG4 | WG4 - Adaptation to Cryosphere Loss |
| WG5 | WG5 - Amplify the Impact of Cryospheric Science |
| ESC | ESC - Executive Steering Committee |
| SMC | SMC - Strategic Management Committee |
| CFD | CFD - Cryosphere Finance Dialogue |
| Alliance for the Cryosphere | Alliance for the Cryosphere |
| UNESCO–IHP Secretariat | 0 - General information from UNESCO IHP Secretariat |

The links are stored in one file, lib/workspace-links.ts, and a check (`npm run test:links`) confirms each one matches the address supplied. The Indigenous Advisory Committee has no folder yet; to add one, add a line to that file.

**Who sees the links:** every member who holds a Lead, Associate Lead, Secretariat or Core Group role (or a chair or committee seat) in any Decade body, and the UNESCO Secretariat. They see the links of every group and body, including those they do not belong to. These are the same people who see the Core Group workspace. Other members do not see the buttons. The Hub only shows the links: who can open each folder is still decided by its SharePoint permissions.

The Core Group workspace now also lists all ten folders, with the General information folder first.

## Spaces of the governing bodies

Governance opens with **Spaces of the governing bodies**: cards for the UNESCO–IHP Secretariat, the Executive Steering Committee, the Strategic Management Committee, the Cryosphere Finance Dialogue, the Alliance for the Cryosphere and the Indigenous Advisory Committee. **Open space** is also available next to the appointments of the body selected in the chart (for a Working Group it opens the Working Group space).

Each space has a banner with a credited photograph, a breadcrumb (Home › Governance › body) and these elements:

- **Appointments**: the seats of the body (for the UNESCO–IHP Secretariat, its members).
- **Upcoming meetings**: meetings of that body in the calendar you can see.
- **News** published for that body, when there is any.
- In the banner: **All governing bodies**, **Working documents on SharePoint** (for the roles above), **Plan a meeting** for the body's leadership, and **Manage UNESCO access** for the UNESCO Secretariat.

The short description of each body follows the Decade governance model (DACS synthesis, pp. 14–15). If the UNESCO Secretariat enters a description in the body's appointments (Edit appointments), that text is shown instead.

## Working Group discussions

Each Working Group space now ends with a **Discussion**. A **Discussion** link in the Work area bar jumps to it.

- **Who takes part:** every member with a profile in the Hub can read, start a topic and reply. Messages are posted under the member's profile name.
- **Topics and replies:** the newest topic comes first, and replies follow in order under each topic. Long threads show the last three replies, with **Show earlier replies**.
- **Tagging:** type **@** followed by a few letters of a name, or click **Tag a member**. Choose a member with the mouse or with the arrow keys and Enter or Tab. Below the box, "Will notify …" lists the members who will be notified. Ctrl+Enter (Cmd+Enter on Mac) posts.
- **Notifications:** each tagged member receives a notification in the Hub. When they next open the Hub, a message says who mentioned them, with a **View** button. A mention that arrives while they are using the Hub appears at once. The bell at the top right now shows **Mentions** and **Meetings**, with an unread count and **Mark all as read**.
- **Answering:** opening a mention goes to the Working Group, scrolls to the message, highlights it and opens a reply addressed to its author with @Name already filled in.
- **Editing and removing:** authors can edit or remove their own messages. Tagging someone new while editing notifies only that person. The Working Group's leadership (Lead, Associate Leads, Secretariat) and the UNESCO Secretariat can remove any message. When a topic that has replies is removed, it shows "This message was removed" so the replies stay readable.
- **Limits:** messages are up to 3,000 characters, with up to 20 tagged members each. Each discussion shows its latest 150 messages.

Notifications exist only inside the Hub. The Firebase Spark plan has no server functions, so the Hub cannot send emails about mentions.

### Permissions (firestore.rules)

- `groupDiscussions/{wg1…wg5}/messages`: members with a profile read and post. The author and the author's name must match the signed-in member's profile. Replies are allowed only under an existing topic that has not been removed. Authors edit only the text and tags of their own messages. Authors, the group's leadership and the UNESCO Secretariat can remove messages.
- `inbox/{member}/items`: only the recipient can read, mark as read and delete their notifications. A member can create a notification for someone else only together with a message that they wrote and that tags that person. The rules check this, so notifications cannot be forged or sent to people who were not tagged.

## Validation

Production TypeScript build and 34 pure checks pass (membership, calendar, goals, meetings, the ten SharePoint links, and discussion helpers for tag suggestions, tag detection, threads and relative times). The Firestore permission suite has two new tests (55 in total). They could not run in the preparation environment because the emulator download was blocked, so run `npm run test:rules` before deploying. Visual checks covered the Working Group banner with the documents button, the discussion with tag suggestions, posting, replying, the bell with mentions, opening a mention, the governing body cards and the SMC and UNESCO–IHP spaces, on desktop and phone, in light and dark modes, using a local preview with sample data.
