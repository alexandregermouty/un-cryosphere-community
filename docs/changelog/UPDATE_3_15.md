# Version 3.15 · Calendar and meeting pages

This version changes the design of the calendar and of the page of each event or meeting. No database rules or indexes change, so only hosting needs to be deployed:

```bash
firebase deploy --project cryohub-eb898 --only hosting
```

## Colours

Every event takes a colour from the visual identity of the platform:

- A meeting of a Working Group uses the colour of that Working Group (WG1 blue, WG2 lavender, WG3 apricot, WG4 green, WG5 pink).
- A meeting of another governing body (Strategic Management Committee, Executive Steering Committee, Cryosphere Finance Dialogue, Alliance for the Cryosphere, Indigenous Advisory Committee) uses the colour of its space under Governance.
- A public event linked to one Overarching Challenge uses the colour of the corresponding Working Group. An event linked to several challenges shows each of their colours side by side.

## Calendar

- Events in the month grid are coloured tags with their start time. Past events are lighter.
- A row of Working Group buttons above the grid filters the calendar by Working Group. It works together with the existing challenge and main goal filters.
- The month heading shows how many events the month contains. Weekends are shaded and today is highlighted.
- The panel on the right shows the selected day as a date tile, its events as cards (time, duration, organising body, meeting type), and the next events of the month under "Coming up".
- On phones, each day shows coloured dots, one per event (up to three).
- A short key under the grid explains the colours.

## Page of an event or meeting

- A header in the event's colour, with the DACS topographic pattern, a date tile, the organising body, the meeting type (with a lock for restricted meetings) and the status: "Today", "Tomorrow", "In n days", "Happening now" or "Past".
- Three summary cards: **When** (time range, duration, organiser time if different), **Where** (venue, or "To be confirmed") and **Who** (the audience of the meeting, and whether it is a public event or by invitation only).
- Sections with headings for the description ("About"), the Overarching Challenges (in their Working Group colours) and main goals ("Contributes to"), the agenda, and the minutes and action items.
- The notice shown to members who are not invited to a meeting now has a lock icon and the meeting's colour.
- Edit and Delete are grouped at the bottom of the page.

## Meeting polls

Each poll card under "Polls & consultations" has a top bar and a label in the colour of its organising body.

## Files

- New: `lib/event-style.ts` (colour, status and duration of an event).
- Changed: `app/calendar.tsx`, `app/meeting-agenda.tsx`, `app/meeting-hub.tsx`, `app/globals.css`.
