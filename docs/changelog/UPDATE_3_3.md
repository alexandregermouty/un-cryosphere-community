# DACS Community 3.3

## Changes

- WG5 is Amplify across group choices, group pages and the governance chart. The chart uses the shared WG5 name. Old default WG5 governance titles are renamed for display.
- Public badges use official scoped badge assignments and governance appointments. Generic editorial roles and review grants are hidden from public profiles.
- A WG1 Secretariat member displays Secretariat of WG1 without a duplicate WG/body Secretariat label. New and unappointed members display Broad Group Member until UNESCO Secretariat assigns an official role.
- UNESCO Secretariat has a multicolour blue/cyan/green badge based on the Decade logo palette.
- ESC has two distinct Co-chairperson seats and one Secretariat seat. SMC has one Chairperson, one Vice-chairperson and one Secretariat seat. Committee member lists remain separate.
- The appointment editor and Firestore rules enforce one person for each committee seat; Working Group Associate Leads and Secretariats can still have multiple members.
- Existing appointment fields and accounts are preserved. No verification email is required. Full editing remains exclusive to protected UNESCO Secretariat roles.

## Deploy this release

Extract the ZIP. Copy the contents of dacs-community-spark into your existing DACS_CryoHub folder. Replace the application files, rules and the entire dist folder. Preserve .env.local. The included dist is built for cryohub-eb898.

```bash
cd /Users/alexandregermouty/Desktop/Websites/DACS_CryoHub
firebase deploy --project cryohub-eb898 --only hosting,firestore
```

After successful deployment, open the website and hard-refresh with Command+Shift+R. Existing Authentication accounts and Firestore data are retained.

Use Editorial access role for platform permissions. Use Governance appointments or scoped official badges for the role displayed on a member's profile.

## Validation

- TypeScript and Vite production build passed.
- All 28 Firestore emulator permission tests and all 10 membership/badge tests passed.
- Browser rendering checks passed for default membership, deduplicated WG Secretariat badges, UNESCO badge styling, ESC/SMC seats and WG5 Amplify in dark and light themes.
- No live account, production database or deployment was changed during preparation.
