# Version 3.29 · Moments and animations

This version does not change the database rules. Build and deploy the website only:

```bash
npm install
npm run build
firebase deploy --project cryohub-eb898 --only hosting
```

Every animation below is skipped, or shown without movement, when the member's device asks to reduce motion.

## 1. Welcome to a Broad Group

- When an application to join a Broad Group has been approved, the member sees a welcome window at their next visit: "Welcome to the WG4 Broad Group", for example.
- The Broad Group badge is stamped onto the window and snow crystals fall in the colour of the Working Group.
- On screens at least 1,200 pixels wide, the member's own badge drops in on its lanyard beside the window.
- The window offers to open the page of the Working Group. It is shown once per device, for approvals of the last 60 days.

## 2. Members globe

- On the Members page, Map tab, each country now glows in the colour of the Working Group most represented among its members. A legend of the colours sits above the list of countries.
- Clicking a country on the globe or in the list shows its members, with their photos. Clicking a member opens their profile, and the globe turns to their country.

## 3. Profile crystal

- "My profile" shows a six-branched ice crystal. Each of the six parts of a profile (photo, expertise, languages, cryosphere focus, availability, biography) grows one branch.
- The parts still missing are listed beside the crystal. A complete profile makes the crystal shimmer and, the first time, sends a short fall of snow crystals.

## 4. Ice cores for flagship projects

- The progress bar of each flagship project is replaced by an ice core lying in its tray: one layer per milestone, in date order.
- Completed milestones are clear ice with small air bubbles; milestones in progress are striped; planned ones are still to be drilled. Hovering over a layer shows the milestone and its date.
- A completed project gets frosted ends.

## 5. Tasks

- A task marked as done frosts over for a moment, with a few snow crystals.
- When the last open task of a board is completed, an aurora sweeps across the header of the board, and the notice reads "The board is clear".

## 6. Meeting polls

- Snow settles at the bottom of each proposed time, in proportion to the members available, and keeps falling gently while answers come in.
- The time with the most availability rises slightly and glows, once at least two members have answered.

## 7. Decade timeline

- A new page, "Decade timeline", under "The Decade" in the menu, shows the Decade from 2025 to 2034 as a horizontal timeline.
- The start of the Decade (2025) and the three triennia (2026–2028, 2029–2031, 2032–2034) are drawn as layers of ice; the current period is outlined.
- A "Today" marker, with falling snow, shows where the Decade stands. The page opens on it, and the "Today" button returns to it.
- Events of the calendar sit above the line and decisions of the SMC and the ESC below it, at their dates. Items close in time are gathered in one marker showing their number, which opens the list.
- Clicking an event opens it in the calendar; clicking a decision opens the Decision register. Only events and decisions already recorded are shown.

## 8. Seal on logo decisions

- In the logo review platform, when the Secretariat records "Approved" or "Approved with conditions", a seal with the logo of the Decade is stamped at the top of the right-hand column, with the date of the decision.
- A refused request shows a grey "Refused" seal, and its header and pipeline card are greyed out.
- Authorised requests carry a small green mark on their pipeline card.

## 9. Aurora when switching theme

- Switching between the bright and dark themes sends a short aurora across the screen.

## Files

- `app/fx.ts` (new): snow crystals, aurora, and the record of moments already shown.
- `app/approval-celebration.tsx`, `app/profile-crystal.tsx`, `app/decade-timeline.tsx` (new).
- `app/members-map.tsx`, `app/workplan.tsx`, `app/task-board.tsx`, `app/poll-ui.tsx`, `app/member-lanyard.tsx`, `app/community.tsx`, `app/globals.css`.
- `logo-desk/app.js`, `logo-desk/styles.css`: the seal.
