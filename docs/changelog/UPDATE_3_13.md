# Version 3.13 — interactive members map, harmonised names, identity patterns, custom domain sign-in

## Deploy this update

Extract the archive and copy the contents of dacs-community-spark into your existing DACS_CryoHub folder. Replace the source, the entire dist folder, firestore.rules and the configuration files. Keep your .env.local.

```bash
cd /Users/alexandregermouty/Desktop/Websites/DACS_CryoHub
firebase deploy --project cryohub-eb898 --only hosting,firestore
```

Deploy Hosting and Firestore together: the rules now allow minutes and actions on public events and the published membership totals. Run `npm run test:rules` on your computer first (61 tests; two are new).

## Sign-in on un-cryosphere-decade-community.space (action needed in Firebase)

The message "Sign-in is not available on this domain yet" is Firebase's `auth/unauthorized-domain` error: Firebase Authentication only accepts sign-in from web addresses on its list of authorised domains, and the new domain is not on it yet. This is a setting of the Firebase project, not of the website files:

1. Open the Firebase console, project **cryohub-eb898** → **Authentication** → **Settings** → **Authorized domains**.
2. Click **Add domain** and add `un-cryosphere-decade-community.space`. If the site is also reachable with `www.`, add `www.un-cryosphere-decade-community.space` as well.
3. If the browser API key has website restrictions (Google Cloud console → APIs & Services → Credentials → the key used by the Hub), add `https://un-cryosphere-decade-community.space/*` there too.

Google sign-in and email and password sign-in then work on the new address. Until the domain is added, the sign-in page now explains the problem and gives the cryohub-eb898.web.app address as an alternative.

## Members map

- **Interactive**: zoom with the + and − buttons, a double click, a pinch on phones, or the mouse wheel after clicking the map; drag to move; **Reset** returns to the world view. Clicking a country (on the map or in the list) zooms to it. Country names appear when zoomed in, and a finer coastline loads automatically.
- **Signals**: each country pulses with expanding rings. The animation stops when the device asks for reduced motion.
- **Gender representation**: a bar and percentages under the countries. Members see the totals for all registered members (published by the UNESCO Secretariat, totals only, refreshed when the Secretariat opens the Dashboard or the Members map). The UNESCO Secretariat sees the figures for the profiles shown and can also filter the map by gender.
- The map still shows land and coastlines without national borders, with the UNESCO disclaimer.

## Other changes

- **Photo credits** are smaller and lighter on every image; the credit remains on each photograph.
- **Appointments**: role icons are removed; every seat is presented in the same way.
- **Full names everywhere**: the Governance appointments list, headings and body titles use the full name of each body: Working Group 1 · Global Cryosphere Monitoring, Working Group 2 · Actionable Cryosphere Projections, Working Group 3 · Cryospheric Risk Management Solutions, Working Group 4 · Adaptation to Cryosphere Loss, Working Group 5 · Amplify the Impact of Cryospheric Science, Cryosphere Finance Dialogue, Strategic Management Committee, Executive Steering Committee, Alliance for the Cryosphere, Indigenous Advisory Committee. The title of Working Group 5 is now "Amplify the Impact of Cryospheric Science" throughout the Hub (the name of its SharePoint folder and of Overarching Challenge 5).
- **DACS identity patterns**: the topographic and melt-line patterns supplied appear, in light lines, in the empty areas: page background corners, the section menu, the sign-in page, empty states, toolbars and the footer. They follow light and dark mode. Files: public/assets/patterns.
- **Minutes and actions on every event**: past and future, meetings and public events. For public events, the organiser and the UNESCO Secretariat write the minutes and actions, and every member can read them. For meetings, nothing changes (the meeting's leadership and Core Group write; its audience reads). Open the event in the Calendar; under the agenda, **Write the minutes** and **Add an action** are available to those who can edit.
