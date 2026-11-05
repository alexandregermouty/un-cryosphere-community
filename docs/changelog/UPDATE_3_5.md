# Version 3.5 — named goals and WG publication

- Official Decade website contains the website, content-sharing and logo-application links. The separate Resources tab is removed.
- Calendar and activity forms display official OC/MG titles from the DACS Synthesis, pp. 8–12.
- Selecting MGs selects their parent OCs and WGs. Calendar events appear in their linked WG activity sections.
- Activity proposals support several MGs and appear in every linked WG after publication. One linked WG reviews the proposal; broad-member proposals remain pending until approved.
- Contribution types can be added to the shared category catalog from the activity form.
- Eastern Europe is added. Western Europe and North America replaces the previous combined label in the interface, with legacy-record compatibility.
- WG Lead, Associate Lead and Core Group badges have frames in their WG colours. Governance uses the matching colours. UNESCO Secretariat remains distinct.

## Deploy

Extract the package and copy the contents of dacs-community-spark into your existing DACS_CryoHub folder. Replace the entire dist folder, source, Firestore rules and package files. Keep your .env.local. The included production build targets cryohub-eb898.

```bash
cd /Users/alexandregermouty/Desktop/Websites/DACS_CryoHub
firebase deploy --project cryohub-eb898 --only hosting,firestore
```

Deploy both products, then press Cmd+Shift+R in your browser. No npm build is needed for the supplied release. Firebase Spark is retained. No production deployment or data migration is performed by this package.

## Validation and compatibility

TypeScript/production build, 37 Firestore rules tests, 10 membership tests, 5 calendar tests and 4 goal/routing/region tests. Browser checks cover named multi-goal selection, WG routing, custom type sharing between accounts, proposal approval, external links, regional choices, palette consistency and mobile layout.

Stored goal IDs and existing roles stay intact. Legacy activities without MGs retain their original WG; existing regional values display with the new label and remain valid in rules. No prerequisite MGs are marked as contributions automatically.

Community queries remain bounded. WG spaces display up to 100 recent/upcoming events and refresh every minute outside editing. Calendar live-query limits remain unchanged. Spark quotas apply.
