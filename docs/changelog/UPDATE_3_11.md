# Version 3.11 — roles linked to appointments, Governance layout, Myriad, logo desk space and meeting reminders

## Deploy this update

Extract the archive and copy the contents of dacs-community-spark into your existing DACS_CryoHub folder. Replace the source, the entire dist folder and the configuration files. Keep your .env.local. The included production build targets cryohub-eb898.

```bash
cd /Users/alexandregermouty/Desktop/Websites/DACS_CryoHub
firebase deploy --project cryohub-eb898 --only hosting,firestore
```

Firestore rules did not change in 3.11. If version 3.10 (discussions and mentions) was already deployed with `hosting,firestore`, `--only hosting` is enough. Press Cmd+Shift+R in the Hub after deployment.

To rebuild from source, run `npm ci` first: the Roboto font package is replaced by `@fontsource-variable/source-sans-3` (see Typeface).

## Roles ticked in the Secretariat panel become appointments

UNESCO Secretariat → members → **Manage access & badges**:

- Every role can be ticked or unticked. Lead, Associate Lead, Secretariat and Core Group roles carry an **Appointment** tag. In the past, a role that came from Governance showed "Automatic" and could not be changed here.
- Saving a ticked appointment adds the person to the matching seat of that body under **Governance**, on the Working Group page and on the body's page. Unticking removes them. Role and appointment are saved together.
- Seats held by one person (every Lead, Chairperson, ESC co-chairperson seats, and the ESC and SMC Secretariat and Vice-chairperson) show who currently holds them. Ticking such a seat for someone else shows "Replaces …", and saving replaces the holder.
- Groups in which the member already holds a role open automatically when the dialog opens.
- Roles ticked in earlier versions also appear in the appointments now. They are moved into Governance the next time that member's access is saved.
- Membership badges ("Member of WG3", "Member of CFD") stay badges and do not create appointments.

The **Edit appointments** dialog under Governance still works, and its changes appear as ticked roles in the Secretariat panel.

## Appointments redesigned

Each seat is a card with an icon (Lead, Associate Leads, Secretariat, Core / committee members), the Working Group colour, and each person's photo or initials, name, role and organisation. **Click a name to open that member's profile.** Core Group members are shown on a full-width row. Seats without anyone show "Appointment pending" in a dashed card. Members of the UNESCO–IHP Secretariat space are also clickable.

## Governance page order

1. The governance diagram.
2. Appointments of the body selected in the diagram.
3. Spaces of the governing bodies.

## Typeface

The Hub now uses **Myriad**, the UNESCO typeface. Myriad Pro is a licensed font and cannot be published with the website. Computers with Myriad Pro installed (common on UNESCO computers and those with Adobe software) display it. Others display **Source Sans 3**, Adobe's open-source typeface from the same design family, which is included in the Hub. The logo review desk keeps its own design.

## Logo review

- The logo review page now uses the full width of the window: the section menu moves to the menu button (☰) at the top left, and the page banner is compact.
- The desk fills the height of the screen.
- **Full screen** (above the desk) shows only the desk. Press Esc or **Exit full screen** to return.
- The desk itself is unchanged.

## Three-week meeting reminder

When a Lead, Associate Lead or Secretariat member of a Working Group (and of the Cryosphere Finance Dialogue and the Alliance, as before) signs in, a pop-up appears if:

- 21 days or more have passed since the group's last meeting in the Hub calendar (or since meeting reminders started for that group), and
- no future meeting and no open scheduling poll exists for that group.

The pop-up names the group and the number of days. **Create a scheduling poll** opens Meeting polls with the poll form ready for that group. **Remind me at my next sign-in** closes it; it appears again at the next sign-in while the meeting is still due. Once a poll is open or a meeting is in the calendar, the reminder stops until three weeks after that meeting.

UNESCO Secretariat access alone does not trigger the pop-up; Secretariat members receive it only for groups in which they hold a leadership seat. The bell keeps listing due reminders.

## Light mode by default

Everyone now starts in light mode, including members who used dark mode in earlier versions. Dark mode remains available from the top bar and the account menu and is remembered from then on.

## Validation

Production TypeScript build and 38 pure checks pass, including four new checks for ticked roles and appointments (adding a member to a seat, replacing a single-seat holder, removal on untick, unchanged records left untouched, and the ESC and SMC seat rules). Visual checks with sample data: Governance page order, redesigned seats and profile opening, the access dialog, the reminder pop-up, and the logo desk in wide and full-screen modes.
