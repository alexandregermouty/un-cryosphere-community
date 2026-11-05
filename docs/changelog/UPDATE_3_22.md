# Version 3.22 · Task boards, event sign-up, templates and an easier meeting planner

This version changes the database rules. Deploy hosting and rules together:

```bash
firebase deploy --project cryohub-eb898 --only hosting,firestore
```

Before deploying, run `npm run test:rules` on your computer. Three tests are new (task boards, event sign-ups and poll editing). They could not be run in the development environment, which cannot download the Firestore emulator.

## Task boards

Each Working Group and each body (CFD, Alliance, SMC, ESC and IAC) now has a task board, shown on its page under the work plan and in the new **Task boards** menu.

- The board is visible to the leadership and Core Group of the body, and to the UNESCO Secretariat, which sees every board.
- Tasks sit in three columns: To do, In progress and Done. A task moves by dragging it to another column, by the "Start" and "Done" buttons that appear on the card, or by ticking its circle.
- A task can be added in one line at the top of the To do column, or with "New task" to give details, a deadline, a priority and up to ten people.
- The people suggested first are the leadership and Core Group of the body. Any member can be assigned by searching their name, including a Broad Group member.
- A person assigned to a task receives a notice on the platform and an entry in the notification centre until they open the task. Assigning the same person again after removing them notifies them again.
- When a deadline is two days away or less, or has passed, the person receives a reminder at sign-in and an entry in the notification centre. The entry comes back when a close deadline becomes overdue.
- People assigned to a task see it under **Task boards → Assigned to me**, even without a Core Group role. They can move their own tasks between columns but cannot change the task itself.
- The filters show all tasks, the tasks assigned to you, or those due within a week.
- The leadership of the body and the UNESCO Secretariat can delete any task; a Core Group member can delete the tasks they created.

Notifications appear on the platform only. Notifications by email would need Cloud Functions, which need the Blaze plan.

## Signing up for events

The page of each event now has an **Attendance** section.

- Members choose "I will attend in person" or "I will attend online". The choice between the two appears when the event has a place, and only the online choice appears for events held online.
- Members can switch between in person and online, or cancel their sign-up, until the event ends.
- Everyone who can see the event sees who attends and how many people attend in person and online.
- The organisers of the event, the leadership and Core Group of the body, and the UNESCO Secretariat can download the attendance list as a CSV file.
- For leadership and Core Group meetings, only the people invited to the meeting can sign up and see the list.

## Templates

A new **Templates** page, under "The Decade" in the menu, is open to every member.

- It offers the Decade presentation template (PowerPoint, 22 slides, 54 MB) with a preview of its main slides. Each preview can be enlarged.
- It offers the logo of the Decade in English, French, Spanish, Arabic, Chinese and Russian, as white PNG files with a transparent background, and all six together in a ZIP file.
- A reminder links to the application to carry the logo of the Decade.

The logos are the six files received. The file named "UNESCO IHP + Decade Logo ESP.png" shows the English version of the Decade logo, so it is offered as the English logo.

## Meeting planner

### Several days at once

The single date field is replaced by a calendar of the month.

- Select as many days as needed in the calendar, then click a start time: it is proposed on every selected day. Clicking it again removes it from those days.
- A dashed time means it is proposed on some of the selected days only; clicking it adds it to the others.
- "Next 5 working days" and "Next week, Monday to Friday" select days in one click. Days that already have proposed times show a dot.
- "Another time" adds a time of your choice on each selected day.
- Each day in the list of proposed times can be removed at once with "Remove this day".

### Editing a published poll

The organisers of a poll (the leadership of the body and the UNESCO Secretariat) now see **Edit the poll** on the poll.

- They can change the title, add or change details (a new optional field, also available when creating a poll), and change the response deadline.
- While the poll is open, they can add times and withdraw times. Withdrawn times disappear from the poll but can be restored.
- Answers already given keep their meaning: new times are added after the existing ones, and nothing is replaced.
- Members who answered before new times were added see a message asking them to complete their availability. The poll also comes back in their notification centre.
- If a new time comes before the response deadline, the window says so and offers to close responses two hours before it.
- The duration and the audience stay as published, because changing them would change what people answered.

## Other points from the comment received

- The message "Sorry, you need OneDrive to share files. See your admin about getting a licence." does not come from DACS Community. It comes from Microsoft Teams or Outlook, where sharing a file needs a OneDrive licence. Within DACS Community, the leadership and the UNESCO Secretariat can attach PDF, Word and PowerPoint files to news, events, activities and forum posts.
- The comment also mentions an "algorithm" to test that "won't look like a poll". No details were given. Once its author describes it, it can be assessed.

## Files

- New: `app/task-board.tsx`, `app/event-attendance.tsx`, `app/slot-picker.tsx`, `app/templates.tsx`, `lib/tasks.ts`, `lib/task-store.ts`, `tests/tasks.test.mjs`, `public/assets/templates/` (template and slide previews), `public/assets/logos/` (six logos, previews and the ZIP file).
- Changed: `firestore.rules`, `app/community.tsx`, `app/meeting-hub.tsx`, `app/poll-invite.tsx`, `app/calendar.tsx`, `app/templates.tsx`, `lib/meetings.ts`, `lib/meeting-store.ts`, `app/globals.css`, `tests/rules.test.mjs`, `package.json`, `package-lock.json`, `README.md`.
