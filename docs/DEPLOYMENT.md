# Update CryosphereHub on Firebase Spark

For version 3.7, use the prebuilt dist folder and deploy Hosting plus Firestore rules/indexes. See **UPDATE_3_7.md**. Deploying Hosting alone leaves the old news schema rules in place.

This package targets your existing project **cryohub-eb898**. It does not deploy automatically. Keep the project on Spark; no billing account, Storage bucket or Functions setup is needed.

## 1. Replace the local source

Keep a backup of your current DACS_CryoHub folder. Extract the package, then copy the contents of dacs-community-spark into:

`/Users/alexandregermouty/Desktop/Websites/DACS_CryoHub`

Replace the app files, Firestore rules/indexes, package files, documentation and the supplied dist folder. Preserve your existing `.env.local`. Do not copy an old node_modules folder into the updated source. The supplied dist folder is already built for cryohub-eb898, so you can go directly to step 4 for this release; step 2 explains rebuilding from source. Deployment retains Firestore data and Authentication accounts; it replaces the application and access rules.

## 2. Configure and build

Run these commands one at a time:

```bash
cd /Users/alexandregermouty/Desktop/Websites/DACS_CryoHub
npm ci
npm run configure
npm run build
```

The configure command creates `.env.local` using the public Firebase settings you provided if it is missing. It preserves an existing file. Check its values:

```dotenv
VITE_FIREBASE_API_KEY=AIzaSyB3BGkU8hSyLpobkp0QTgs5VjiIYh1iUtQ
VITE_FIREBASE_AUTH_DOMAIN=cryohub-eb898.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=cryohub-eb898
VITE_FIREBASE_APP_ID=1:361051868769:web:2bbe56be6f3934ea92e420
VITE_USE_EMULATORS=false
```

These are browser-visible web settings. Never put service-account credentials in the app. The build must finish and create dist before deployment. If npm is missing, install Node.js 24 LTS from [nodejs.org](https://nodejs.org/), reopen Terminal and repeat this step.

## 3. Check Authentication

In Firebase Console → Authentication → Sign-in method, keep Email/Password enabled. Enable Google for the Google sign-in button.

Under Authentication → Settings → Authorized domains, include cryohub-eb898.web.app, cryohub-eb898.firebaseapp.com and any custom domain. Add localhost for local development. Domain names have no protocol or port.

Reuse the existing default Firestore database. Do not recreate it or reset its data. Deployment installs the revised rules and indexes.

## 4. Deploy Hosting and rules together

```bash
firebase deploy --project cryohub-eb898 --only hosting,firestore
```

Both parts must deploy. The new fields, photos, shared choices and governance documents need the revised rules. A Hosting-only update against old rules cannot save these features.

If Firebase asks you to sign in, use firebase login. If login fails from the project folder, use your earlier successful sequence:

```bash
cd /tmp
firebase login --reauth
cd /Users/alexandregermouty/Desktop/Websites/DACS_CryoHub
firebase deploy --project cryohub-eb898 --only hosting,firestore
```

Sign in with a Google account that can deploy this project. A project permission error cannot be fixed by website code.

After successful deployment, open [cryohub-eb898.web.app](https://cryohub-eb898.web.app) and refresh the page.

## 5. Activate your UNESCO Secretariat account

Sign in as **alexandregermouty@gmail.com**, with **Sign in with Google**. Do not create a second account if that email already exists. No verification email is required. For initial owner access, choose **Sign in with Google** as **alexandregermouty@gmail.com**; Google confirms that identity without a Firebase email. If that button reports the provider is disabled, enable **Google** under Firebase Console → Authentication → Sign-in method.

Complete the required profile popup. Existing records are retained; existing members receive the popup once to add the new answers. Your verified identity grants full UNESCO Secretariat access in the revised rules and writes your protected role document automatically. No manual Firestore bootstrap is needed.

**UNESCO Secretariat → members → Manage access & badges** edits participation roles and official badges. Choose **UNESCO Secretariat · full editing** only for UNESCO Secretariat members. No separate admin checkbox exists. WG/body Secretariat roles retain scoped permissions.

**Governance → Edit appointments** assigns official seats for all ten bodies. ESC has two Co-chairpersons and one Secretariat; SMC has one Chairperson, one Vice-chairperson and one Secretariat. Other bodies retain their WG/body leadership and Core Group seats. WG appointments grant scoped review access. Use Command-click on a Mac to select multiple members. Save, then have the appointed member refresh. Removing an appointment revokes its access; check for any separate direct WG grants if access remains.

## Website, workspace and official badges

- **Official Decade website** is visible to every member. **Core Group workspace** is visible only through protected leadership/Core/Secretariat roles, qualifying badges or appointments.
- Assign official badges through **UNESCO Secretariat → members → Manage access & badges**. A member's self-selected WG interests grant neither badges nor private workspace access.
- Governance appointments generate their badges automatically. Use the chart or body selector to view appointments. UNESCO Secretariat is shown separately; IAC placement remains subject to consultation.
- Logo review opens **https://dacs-logo-application-review.web.app/**. SharePoint and Teams retain their supplied URLs.
- Destination platforms manage their own accounts and access. This package does not change Microsoft membership. The integrated logo desk uses protected Hub appointments; read UPDATE_3_6.md.
- Fictional examples remain removed. Real member data is retained.

## 6. Check the deployed workflow

1. A private browser window should show only sign-in/account creation.
2. Register a test account and complete the popup directly; no verification email or waiting screen should appear. Add a custom skill/cryosphere type and upload a photo.
3. A subsequent registration should offer that choice. Esc/outside clicks must not dismiss the questionnaire.
4. A normal member should have no UNESCO Secretariat controls or access to another member's gender, sentiment or feedback. Set a test profile to private and check its photo disappears from other members' directories.
5. Assign the test member a WG appointment from your account. Have them refresh and review an activity in that WG. Other groups must stay outside their review scope.
6. Edit a record in UNESCO Secretariat, refresh and confirm it persists. Remove the appointment and check access is revoked unless another grant exists.
7. Confirm an ordinary member sees the public website but no private shortcuts. Assign a WG Core Group badge, refresh that account and confirm the shortcuts appear. Remove every qualifying assignment and refresh to confirm they disappear.
8. Check account controls are clear of the desktop sidebar and mobile pages have no horizontal scrolling.

Observe Firestore usage in Firebase Console. Photos and shared categories consume the existing Spark quota. This version uses limited record batches and does not promise unlimited capacity.

## Version 3.3 profiles and governance

Sign in with the verified **alexandregermouty@gmail.com** identity after deploying. The owner's role updates to explicit UNESCO Secretariat. Assign other UNESCO Secretariat members through **UNESCO Secretariat → members → Manage access & badges → Editorial access role → UNESCO Secretariat · full editing**. Ordinary WG/body Secretariats cannot edit globally. Old bare admin flags and standalone UNESCO badges are insufficient; reassign genuine UNESCO Secretariat accounts explicitly.

Check the separate Official Decade website and Core Group workspace tabs. Logo review must open **https://dacs-logo-application-review.web.app/**. Check Meet the community renders one badge set per profile and the governance chart opens the correct appointments.

Active pages refresh every minute, with polling suspended during profile editing, onboarding, dialogs, saves and hidden/offline browser tabs. Monitor Firestore reads under Spark quotas.

Registration sends no verification email. Existing unverified accounts can sign in with their existing passwords and complete onboarding. Deploy both Hosting and Firestore rules; old rules still reject unverified accounts. Firebase's `emailVerified` flag remains unchanged. Password-reset mail is still available and can be filtered by a recipient's mail service.

Profile badges show each protected assignment, such as **Lead of WG1**, **Associate Lead of WG5** or **Secretariat of WG3**. Use Governance appointments or Secretariat-assigned scoped badges; self-selected WG interests grant no official role. WG5 is named **Amplify** in group lists, the chart and default governance titles. Old default WG5 titles are renamed for display without modifying appointments or custom titles.

## Local verification

Run npm run build for production checks. With Java 17+, npm run test:rules checks permissions against the local Firestore emulator. Run npm run test:membership for badge and shortcut visibility checks. None of these commands deploys or changes production data.

## Confirm version 3.3 after deployment

Replace the entire supplied dist folder and deploy Hosting plus Firestore rules. Hard-refresh with Command+Shift+R. The governance chart must show WG5 **Amplify**. Unappointed profiles must show **Broad Group Member**; a WG1 Secretariat appointee must show **Secretariat of WG1**, with no generic WG/body badge. UNESCO Secretariat must have the blue/cyan/green badge. ESC and SMC appointment selectors must use their committee-specific seat titles.

Use **Editorial access role** only for platform permissions. Public badges come from official scoped badge assignments or Governance appointments. New members cannot change their own badges. If an older ESC/SMC record has several Secretariats or secondary chairs, choose one for the relevant seat before saving; the rules reject oversized assignments.

## Version 3.4 calendar and resources

Replace the full dist folder and deploy Hosting with Firestore. No new Firebase product, billing upgrade, API credential or composite index is needed. The events collection is created when a member saves the first event.

After deployment:
1. Hard refresh with Cmd+Shift+R, then open Calendar.
2. Check the displayed device time zone.
3. Add an event with at least one OC and MG, registration and meeting links.
4. Open the calendar in another signed-in account. The event appears through live updates; its times use that account’s device time zone.
5. Edit/delete your own event. UNESCO Secretariat can edit/delete every event; other members cannot.
6. Open Official Decade website and check the public content-sharing and logo-application links.

Calendar listeners run only on its active visible page. The other community pages retain their once-per-minute refresh. Device time zone is read from the browser; no IP location lookup is used. Check browser/OS time-zone settings if a time is unexpected.

Run npm run test:calendar for conversion and validation checks. Version 3.4 contained 37 rules tests and 10 membership tests. Source rebuilds use npm run build.

## Version 3.5 checks

This update retains Spark, the existing Firebase web settings and member data. Replace the entire dist folder, source and Firestore rules. Deploy Hosting and Firestore together. No extra composite index is needed.

1. Open Official Decade website. Check the website, content-sharing and logo-application links in that tab.
2. Add an event and select named MGs in two OCs. Their OCs are selected automatically; the event appears in both WG spaces.
3. Propose an activity with named MGs, choose its reviewing WG and add a custom contribution type. Check that another account can select the new type.
4. Broad-member proposals require approval from their reviewing WG. Published proposals appear in all linked WG activity sections.
5. Check Eastern Europe and Western Europe and North America in regional choices. Existing Europe and North America data displays with the revised Western label.
6. Check WG Lead, Associate Lead and Core Group badge frames, then the matching governance colours.

Hard refresh with Cmd+Shift+R after deployment. Version 3.5 contained 56 checks. npm run test:goals runs the four new goal/routing/region tests.

## Version 3.6: integrated logo review and meeting tools

Follow UPDATE_3_6.md. Deploy Hosting, Firestore rules and indexes together. New poll, response and body-calendar queries need the supplied composite indexes. Wait for index creation to finish before testing meeting tools. The prebuilt dist includes the Hub, restricted logo desk and code-protected applicant reporting page. Import data/logo-register.json once as UNESCO Secretariat.

Check Lead, WG Secretariat, Core Group and Broad Group accounts: logo-tab visibility, poll audiences, notification bell, private meeting links, agenda editing and news comments. Notifications are inside the Hub. No email automation or server reminder service is configured.
