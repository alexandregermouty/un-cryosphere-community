# Version 3.25 · Broad Group applications, Working Group 5, Templates

This version changes the database rules. Deploy hosting and rules together:

```bash
firebase deploy --project cryohub-eb898 --only hosting,firestore
```

Run `npm run test:rules` on your computer first. One test is new (Broad Group applications), in addition to those from versions 3.22 to 3.24.

## Applying to join a Broad Group

### What was wrong

In version 3.24, the "Apply to join the Broad Group" button checked the member's profile the wrong way round, so nothing happened when a member with a complete profile clicked it.

### How it works now

- A member clicks **Apply to join the Broad Group** in the header of a Working Group page, or **Apply to join** in its Members tab.
- A notice confirms that the application has been sent and explains that the leadership of the group and the UNESCO Secretariat will review it.
- The button then reads **Application sent** until a decision is taken. If the application is declined, the button reads **Apply again to the Broad Group**.
- Each application is recorded in a new `groupApplications` collection, one record per member and group.

### Review by the UNESCO Secretariat

- The UNESCO Secretariat page now opens with **Applications to join a Broad Group**, above the roles declared at registration, under the heading "Declared roles and applications".
- Each application shows the member, the Working Group and the date, with **Approve** and **Decline**.
- The number shown next to "UNESCO Secretariat" in the menu now counts applications as well as declared roles.

### Review by the leadership of each Working Group

- The lead, associate leads and secretariat of a Working Group see a new **Membership requests** tab on its page. The number of applications awaiting a decision is shown on the tab in orange.
- Only the leadership of that group and the UNESCO Secretariat can see or decide these applications. Core Group members and the leadership of other groups cannot.
- Decisions already taken are kept below the list and can be opened.
- Leaders receive a notice when a new application arrives for a group they lead, with a button that opens the tab.

### What approval does

- Approval gives the member the Broad Group badge of the Working Group, exactly as "Manage access & badges" would.
- With this badge, the member is listed under "Broad Group" in the Members tab and receives the Broad Group emails of the group.
- The database allows the leadership of a group to add or remove only the Broad Group badge of their own group. All other roles and badges remain with the UNESCO Secretariat.

## Working Group 5: main goals run concurrently

- The Terms of Reference of Working Group 5 state: "All Main Goals of OC5 need to run in parallel, though the focus of the first three-years is on MG5.1 Policy Integration and Engagement, with a summary of this MG presented at the first Triennial Summit of the Decade of Action for Cryosphere Sciences."
- The page of Working Group 5 therefore no longer shows one main goal per triennium. It shows the three triennia as columns and each main goal as a bar running across all three.
- MG5.1 is highlighted as the focus of the first triennium (2026–2029), and the quotation from the Terms of Reference is shown below the bars.
- In the Flagship projects tab of Working Group 5, each main goal is labelled "Runs throughout the Decade", and MG5.1 also reads "focus of the first triennium (2026–2029)".
- The pages of Working Groups 1 to 4 are unchanged: one main goal per triennium.

## Templates

- The Templates page is now shown only to the Core Group and the leadership of the Working Groups, the Cryosphere Finance Dialogue, the Executive Steering Committee, the Alliance for the Cryosphere, the Strategic Management Committee and the Indigenous Advisory Committee, and to the UNESCO Secretariat.
- Other members no longer see it in the menu, and the page cannot be opened by them.
- The template and logo files are still served by the website. Anyone who has a direct link to a file can download it. Firebase Spark has no file storage with access control; if the files must be fully private, they should be kept in the SharePoint library instead.

## Files changed

- `lib/applications.ts` (new): applications to the Broad Groups and their decisions.
- `app/group-requests.tsx` (new): the "Membership requests" tab and the Secretariat list of applications.
- `app/community.tsx`: the Apply button, application status, notices for leaders, and Templates access.
- `app/wg-page.tsx`, `app/workplan.tsx`, `lib/flagship.ts`: main goals that run concurrently (Working Group 5) and the new tab.
- `app/role-requests.tsx`: applications shown with the declared roles.
- `firestore.rules`: `groupApplications`, and Broad Group badges set by the leadership of a group.
- `tests/rules.test.mjs`, `tests/decade-goals.test.mjs`: new tests.
