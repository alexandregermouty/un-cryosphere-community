# Version 3.8 — official United Nations design

Version 3.8 is a visual and usability release. Data, Firestore rules, indexes, permissions and workflows are unchanged from version 3.7. Existing profiles, events, polls, news and logo records are not affected.

## Deploy this update

Extract the archive and copy the contents of dacs-community-spark into your existing DACS_CryoHub folder. Replace the source, the entire dist folder and the configuration files. Keep your .env.local. The included production build targets cryohub-eb898; no npm build is needed to publish it.

```bash
cd /Users/alexandregermouty/Desktop/Websites/DACS_CryoHub
firebase deploy --project cryohub-eb898 --only hosting
```

Firestore rules and indexes did not change, so a Hosting deployment is sufficient. Deploying `hosting,firestore` as in previous releases is also safe. After deployment, press Cmd+Shift+R in the Hub.

To rebuild from source, run `npm ci` first: version 3.8 adds one dependency, `@fontsource-variable/roboto`, which serves the Roboto typeface from Firebase Hosting rather than from an external font service.

## What changed

### Look and feel

- Light theme by default, following the official United Nations web presence: white surfaces, UN blue actions, navy header and footer bands, Roboto typeface and restrained corner radii.
- The Decade logo palette (blue, cyan, green) is used as a thin signature stripe under the header, on page banners, dialogs and the footer.
- Dark mode is retained and redesigned. A saved choice is respected: members who selected dark mode keep it; everyone else now starts in light mode. The theme switch is in the top bar and in the account menu.
- Ice-cave photography and topographic lines remain, now used on the sign-in page and page banners rather than behind every screen.

### Navigation and page structure

- New official header: Decade logo, UNESCO logo and platform name, with a utility bar linking to the official website and the theme switch.
- The sidebar is grouped into Overview, Network, Coordination, The Decade and Administration. It scrolls independently, so every section remains reachable on smaller screens (in version 3.7, items below Logo review were cut off at a 900-pixel window height).
- Every page opens with a banner showing a breadcrumb, the page title, a one-line explanation and the main action (for example Share an update, Propose an activity, Follow group).
- Account controls are grouped in one menu: My profile, My contributions, theme, Sign out. Refresh is an icon button with a progress bar under the header.
- On phones and tablets, navigation opens as a side drawer from the menu button.
- A footer links to the platform sections, the official website forms and the UNESCO Intergovernmental Hydrological Programme.

### Ease of use

- Sign-in is on the landing page itself: email, password (with show/hide), password reset and Google sign-in, without opening a separate dialog.
- Home shows the next four calendar events, clickable statistics, and Working Groups with clear follow states.
- Member, activity, Working Group, poll and resource cards are fully clickable.
- The five-step profile questionnaire shows a labelled progress stepper.
- Poll time slots highlight the best match; your own availability choice is shown as a selected state distinct from the Schedule action.
- Loading shows skeleton placeholders instead of empty states.
- News dates use day, month and year; long news items are trimmed on cards and shown in full with the comments.

### Motion

Page transitions, staggered card entrances, card lift on hover, animated counters, menu and dialog transitions, and a back-to-top button. All motion is disabled automatically when the device requests reduced motion.

### Logo desk and applicant reporting page

The embedded logo review desk and the public reporting page (logo-desk/report.html) use the same light design, Roboto and Decade stripe. Both default to the theme chosen in the Hub. Their functions are unchanged.

## Validation

Production TypeScript build and the 26 pure checks (membership, calendar, goals, meetings) pass. Firestore rules were not modified, so the 52 permission checks from version 3.7 remain applicable. Visual checks were run on desktop (1440 px) and phone (390 px) widths, in light and dark modes, using a local preview with sample data: sign-in, home, members, activities, Working Groups and group spaces, calendar, meeting polls and poll detail, news, governance, contributions, profile questionnaire, official website, UNESCO Secretariat, Core Group workspace, logo review and the applicant reporting page.

Note: version 3.9 restores the original (3.7) design of the logo review desk and the applicant reporting page. See UPDATE_3_9.md.
