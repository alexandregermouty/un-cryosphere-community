# Version 3.4 — calendar and public resources

- Interactive month calendar with live updates, day agenda, Today and month navigation.
- Local event times follow each visitor’s browser/device time zone.
- Members add events with registration and virtual meeting links, OC1–5 and MG1.1–5.3.
- Organisers edit/delete their own events; UNESCO Secretariat can manage every event. WG/body editorial roles do not grant that global access.
- Public Resources links open the official content-sharing and logo-application forms.
- Firestore rules validate ownership, fields, dates, challenge/goal pairs and link schemes. No sample events are inserted.
- Existing profile badges, WG5 Amplify, ESC/SMC seats and email-free registration are retained.

## Install

Extract this archive. Copy the contents of dacs-community-spark into your existing DACS_CryoHub folder. Replace the entire dist folder, source and Firestore rules. Keep your existing .env.local. The included production build targets cryohub-eb898.

```bash
cd /Users/alexandregermouty/Desktop/Websites/DACS_CryoHub
firebase deploy --project cryohub-eb898 --only hosting,firestore
```

Deploy Hosting and Firestore together; the events collection needs the new rules. Open https://cryohub-eb898.web.app and press Cmd+Shift+R. Select Calendar, add an event and test its links. Resources contains both public submission links. This package does not deploy to your project automatically.

## Validation

TypeScript and production build, 33 Firestore rules tests, 10 membership tests and 5 calendar tests. Browser checks cover event creation/edit/deletion, live updates between accounts, Paris/New York time conversion, filters, mobile layout and resource links. Test accounts and events exist only in local emulators and are excluded from this package.

## Pilot limits

Spark remains the no-cost plan. Quotas apply. Calendar events are community-visible after sign-in, last up to 31 days, and display up to 200 records per endpoint query for the visible period. A full-batch notice reports incomplete results. No email notification or external calendar synchronisation is included.
