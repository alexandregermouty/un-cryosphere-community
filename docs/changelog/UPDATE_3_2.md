# DACS Community 3.2

## Changes

- Registration and existing-account sign-in require no verification email. Accounts open the profile questionnaire directly.
- Firestore permits signed-in accounts with unverified emails to use normal member features. Anonymous visitors remain blocked.
- Role assignment, private answers and UNESCO-only full editing remain protected. Initial owner access uses Google sign-in as alexandregermouty@gmail.com without sending a Firebase confirmation email.
- Profile badges read Lead of WG1, Associate Lead of WG5, Secretariat of WG3 and Member of SMC. Protected assignments supply the labels. Scoped badges remove duplicate generic role labels; UNESCO and leadership badges appear first on compact cards.
- WG5 is named Amplify in the group catalog, onboarding choices and governance chart. Old default WG5 governance titles are renamed for display; custom titles and appointments are retained.
- Password reset and old email links remain supported. Registration no longer depends on spam or quarantine delivery.

## Deploy

Copy the contents of dacs-community-spark into your existing DACS_CryoHub folder, replacing app files, rules and the entire dist folder. Preserve .env.local. The included dist is built for cryohub-eb898.

```bash
cd /Users/alexandregermouty/Desktop/Websites/DACS_CryoHub
firebase deploy --project cryohub-eb898 --only hosting,firestore
```

Deploy both targets. Refresh the website after deployment. Existing Authentication accounts and Firestore data are retained.

## Validation

Production TypeScript/Vite build passed. All 26 Firestore emulator tests and 8 membership/badge tests passed. Production deployment and real mailbox delivery were not performed.
