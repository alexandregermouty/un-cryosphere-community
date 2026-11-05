# Version 3.21 · Messages, notifications, group badges and account tools

The database rules have not changed in this version. Deploy the website only:

```bash
firebase deploy --project cryohub-eb898 --only hosting
```

If version 3.19 has not been deployed yet, deploy hosting and rules together instead (`--only hosting,firestore`).

## "This change needs the relevant member or Working Group permission" in Messages

The message was sent, but the conversation then showed this error. When a member writes to someone for the first time, the new conversation appears on the page a moment before the database has saved it. The page started listening to its messages in that moment, the database refused because the conversation did not yet exist on the server, and the refusal was shown as a permission error. The listener now retries quietly for a few seconds, which covers this delay, and the error no longer appears. The same applied to new group conversations. It did not depend on being a Broad Group member.

## Notification centre

- A notification leaves the list as soon as it is opened.
- A message leaves the list once the conversation has been read, a mention once it has been read, a poll or consultation once it has been answered, and an action once it is completed.
- News, events and activities of the groups the member follows are shown once; after the list has been closed, they no longer appear.
- Messages that the member wrote themselves no longer appear.
- A "Clear all" button empties the list and marks the listed conversations and mentions as read. When nothing is waiting, the list says "You are all caught up".

Opened and cleared notifications are remembered in the member's browser. Read messages and mentions, answered polls and consultations and completed actions are recorded in the database, so they also disappear on other devices.

## Instant notifications

The small notices at the top right have a new design inspired by a melting glacier: an icicle edge along the top with drops of meltwater falling from it, an ice-blue background, a coloured icon in the colour of the notice (blue for information, green for success, amber for warnings, red for errors) and a flowing meltwater line at the bottom. A new message notice now shows the first words of the message. The animations stop for people who have asked their device to reduce motion.

## Badges in the Working Group colours

- Each Working Group a member has joined in their profile now shows a badge "Broad Group member of WG1", in the colour of that Working Group, unless the member holds a higher position in the same group.
- Core Group badges ("Core Group member of WG4") use a stronger version of the same colour, with a coloured frame.
- A member who has joined no Working Group still shows "Broad Group Member".
- The UNESCO Secretariat shows no Broad Group badges, since it works with every group.
- The badge that the UNESCO Secretariat can assign as "Member of WG1" is now named "Broad Group member of WG1". (Version 3.21.1 removes the badges created from profile choices; see UPDATE_3_21_1.md.)

## Removing a member

"Remove member data" is now "Remove member" and opens a confirmation window, in which "remove" must be typed.

- The profile, the private profile answers, the role and badges, the role declaration, the preferences, the member's news, events and contributions, and the mailing-list entries are deleted. Messages already sent remain in the other members' conversations.
- If the option "Also delete the sign-in account" is ticked, the sign-in account (email address and password) is also deleted from Firebase Authentication, so the person cannot sign in again. Without this option, the person can sign in again and create a new profile.

Deleting a sign-in account needs administrator rights that a web page does not have on the Spark plan (it would normally use a Cloud Function, which needs the Blaze plan). The page therefore asks Google, in a small window, for access to Firebase Authentication on behalf of the Google account at the keyboard. Google only grants it to an account with rights on the Firebase project, such as the project owner. The setup is described below. Until it is done, the sign-in account can be deleted by hand in the Firebase console, under Authentication → Users, from the member's row.

## Password reset link for a member

Each member in **UNESCO Secretariat → members** now has a "Reset password" button. It creates a link that lets the member choose a new password, without sending any email. The link opens the platform's own page (`/auth/action`) on the domain in use. The window then offers to copy the link, or to open a prepared email to the member in the Secretariat's own mailbox, so the message does not land in a spam folder. The link works once and expires after a short time.

The button uses the same Google access as the deletion of sign-in accounts. A section "Send the automatic reset email instead" remains available, for an email address typed by hand.

## One-time setup of the Google access

These steps are done once, with the Google account that owns the Firebase project (alexandregermouty@gmail.com).

1. Open the Google Cloud console at https://console.cloud.google.com and select the project **cryohub-eb898**.
2. Open **Google Auth Platform** (formerly "APIs & Services → OAuth consent screen"). If it has not been configured, select "Get started", name the app "DACS Community admin tools", choose the support email, select the audience **External**, and finish.
3. Under **Audience**, leave the publishing status on **Testing** and add alexandregermouty@gmail.com, and any other Secretariat Google account that should use the tools, as a test user. Each of these accounts also needs a role on the Firebase project (for example "Firebase Authentication Admin" in IAM).
4. Under **Data access**, select "Add or remove scopes", add `https://www.googleapis.com/auth/identitytoolkit` by hand, and save.
5. Under **Clients**, select "Create client", choose the type **Web application**, name it "DACS Community admin tools", and add these **Authorized JavaScript origins**: `https://un-cryosphere-decade-community.space`, `https://cryohub-eb898.web.app` and `https://cryohub-eb898.firebaseapp.com`. No redirect address is needed. Create the client and copy its **Client ID** (it ends with `.apps.googleusercontent.com`).
6. Either add the client ID to `.env.local` as `VITE_GOOGLE_ADMIN_CLIENT_ID=...` before building, or paste it once in the "Reset password" window, where it is kept in that browser. The client ID is not a secret.

The first time a button is used, Google opens a window to choose the account and allow access. Because the app stays in "Testing", Google may show the warning "Google hasn't verified this app"; select "Continue". Access lasts for about one hour and is then requested again.

These Google calls could not be tested from the development environment, which has no access to Google's services. Please try them once with a test account: create a reset link, open it in a private window, and delete the test account.

## Sign-in page

Under the sign-in form, a line now reads: "If you encounter any problem, please contact the UNESCO Secretariat by email at cryosphere@unesco.org", with a link that opens an email.

## Files

- New: `app/account-tools.tsx`, `lib/admin-accounts.ts`.
- Changed: `lib/chat-store.ts`, `app/messages.tsx`, `app/meeting-hub.tsx`, `app/community.tsx`, `app/main.tsx`, `app/member-badges.tsx`, `lib/member-roles.ts`, `lib/store.ts`, `app/governance.tsx`, `app/auth.tsx`, `app/globals.css`, `tests/member-roles.test.mjs`, `.env.example`, `package.json`, `package-lock.json`, `README.md`.
