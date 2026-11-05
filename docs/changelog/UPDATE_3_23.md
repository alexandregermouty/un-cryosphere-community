# Version 3.23 · Flagship projects, clearer Working Group pages and a lighter template

This version changes the database rules. Deploy hosting and rules together:

```bash
firebase deploy --project cryohub-eb898 --only hosting,firestore
```

Run `npm run test:rules` on your computer first: one test is new (flagship projects and activity links), in addition to the three from version 3.22.

## Three levels of work, each with its own place

| Level | What it is for | Who uses it | Where |
|---|---|---|---|
| Flagship projects | The strategic projects a Working Group leads to achieve each main goal, with dated milestones | Written by the leadership and Core Group, read by every member | **Flagship projects** in the menu, and the "Flagship projects" tab of each group |
| Activities | Concrete contributions open to every member: answer an open call, or propose an activity | Every member | **Activities** in the menu, and the "Activities" tab of each group |
| Task boards | Day-to-day coordination: who does what, and by when | Leadership and Core Group, and the people assigned | **Task boards** in the menu, and the "Task board" tab of each group |

An activity can now be part of a flagship project. A project can therefore gather several activities, and each activity shows the project it belongs to.

## Flagship projects (formerly "Work plans")

- Projects are grouped under the three main goals of the Working Group. Each main goal shows its triennium, as set out in the Terms of Reference: "The Decade is split into three triennia. Each MG is assigned a 3-year block, marked by a triennial summit." The first triennium is shown as 2026–2029, the period given in the Terms of Reference, and is marked as the current focus. The later triennia are not dated there, so no dates are shown for them.
- Each project card shows its status, target date, purpose, lead and progress. Progress is measured by its completed milestones.
- Opening a card lists its milestones on a timeline and the activities linked to it.
- The leadership and Core Group add projects and milestones. A milestone always belongs to a project.
- The page in the menu shows one Working Group at a time, with a selector for the five groups and a CSV export of all projects, milestones and linked activities.
- Existing work plan entries are kept. The former "deliverables" appear as flagship projects. The former milestones appear under their main goal as "Milestones not linked to a project", each with a "Link to a project" button.

### Linking activities

- When proposing an activity, a new optional field "Part of a flagship project" lists the projects of the reviewing Working Group.
- The managers of the Working Group can link or unlink a published activity from its detail window.

## Working Group pages

The pages are reorganised so that each kind of content has its own place.

1. **The mission comes first.** A banner shows the Overarching Challenge of the group and quotes its end-of-Decade ambition from the Terms of Reference. It then shows the three main goals as a path across the three triennia, with the number of flagship projects for each. Selecting a main goal opens the flagship projects.
2. **Tabs replace the long page.** The tabs are Overview, Flagship projects, Activities, Members, Discussion and, for the leadership and Core Group, Task board. The tab bar stays visible while scrolling.
3. **The Overview tab is short.** It shows three cards explaining the three levels of work, then the appointments, the Terms of Reference, the next four events as a compact list, and the latest three news items.
4. **The header no longer squeezes the title.** The buttons move below the title when space runs short.

A notification for a mention opens the Discussion tab directly.

## Task window

The window for creating or editing a task has been redesigned.

- The title and details are written directly at the top, like a note.
- Status, priority, deadline and assignees sit in one panel below.
- The deadline can be set in one click: today, tomorrow, in a week or in two weeks.
- People are added with "Assign people", which opens a search that suggests the leadership and Core Group first.
- A line reminds the author that the people assigned are notified.

## Templates

- The presentation template is replaced by the compressed version received (7 MB instead of 54 MB, same 22 slides).
- The note about saving a copy and the strip of slide previews are removed.
- Selecting the cover image downloads the template.
- Every file published on the platform is now under 10 MB. The largest files are the welcome video (8.1 MB in MP4 and 6.3 MB in WebM) and the template (7 MB). Files shared by members were already limited to 10 MB.

## SharePoint library (formerly "Core Group workspace")

- The tab is renamed **SharePoint library**.
- It opens with a short explanation: "All working documents are stored on SharePoint. The leadership and Core Group members of the Decade bodies have access to the Decade SharePoint site, where they collaborate on these documents. If you cannot access the platform, please contact the UNESCO Secretariat at cryosphere@unesco.org."
- The first folder is now named "General information from UNESCO IHP Secretariat", without the "0 -" prefix. Only the label on the platform changes; the folder link is the same.

The message received gave the address as "cryospher@unesco.org". The page uses cryosphere@unesco.org, the address already shown on the sign-in page.

## Files

- New: `app/wg-page.tsx`, `lib/flagship.ts`.
- Rewritten: `app/workplan.tsx` (flagship projects), the task window in `app/task-board.tsx`.
- Changed: `firestore.rules` (optional `parent` on work plan items, optional `project` on activities, which managers may change), `app/community.tsx`, `app/templates.tsx`, `app/resources.tsx`, `lib/workspace-links.ts`, `lib/coordination.ts`, `lib/coordination-store.ts`, `lib/store.ts`, `app/globals.css`, `tests/rules.test.mjs`, `tests/tasks.test.mjs`, `package.json`, `package-lock.json`, `README.md`.
- Replaced: `public/assets/templates/DACS_slide_template.pptx`; the slide previews other than the cover are removed.
