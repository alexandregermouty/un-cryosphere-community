# Version 3.9 — shareable meeting polls, photography and the original logo desk

## Deploy this update

Extract the archive and copy the contents of dacs-community-spark into your existing DACS_CryoHub folder. Replace the source, the entire dist folder, firestore.rules, firebase.json and the configuration files. Keep your .env.local. The included production build targets cryohub-eb898.

```bash
cd /Users/alexandregermouty/Desktop/Websites/DACS_CryoHub
firebase deploy --project cryohub-eb898 --only hosting,firestore
```

Deploy Hosting and Firestore together this time: the Firestore rules changed to allow shareable poll links. Without the new rules, invitees who open a link see "This poll cannot be opened". Press Cmd+Shift+R in the Hub after deployment.

Before deploying, you can run the permission tests on your computer (Java 17 or later): `npm run test:rules`. A new test covers poll links.

## Logo review desk restored

The logo review desk (Logo review tab) and the applicant reporting page (logo-desk/report.html) are back to their version 3.7 design and files, unchanged. Inside the Hub, the desk follows the Hub theme: it opens in its "Bright" variant when the Hub is in light mode.

## Photography

Seven photographs now appear in the page banners, the sign-in page, the five Working Group cards, the Official Decade website card, the poll invitation page and the email confirmation page. Each display carries the credit **@greenlandic_explorer / Ocean Image Bank**, linking to https://www.instagram.com/greenlandic_explorer/.

The photographs are stored in public/assets/photos in two sizes (1600 and 800 pixels wide, WebP); phones load the smaller version. Credits are set in one place, lib/imagery.ts. If a photograph is by another photographer, change the `credit` and `creditUrl` of that image there; every place that shows it updates.

## Meeting polls

### Creating a poll

Meeting polls → **Create a scheduling poll** now opens a guided form in three steps:

1. **Meeting**: title, organising body, who is notified in the Hub (Leadership, Core Group or Broad Group, each explained), duration as one click (30 min to 2 h, or another value), and optional main goals.
2. **Proposed times**: choose a day, then click start times (08:00 to 18:00) or add another time. Change the day to add times on other days. Proposed times are listed by day and can be removed with one click. Responses close automatically three days later, or two hours before the first time if that is sooner; you can choose 2 days, 3 days, 1 week or a specific date instead.
3. **Review and publish**: a summary, and the switch **Anyone with the link can vote** (on by default).

After publication, the poll's link is shown with **Copy link**, **Email the invitation** (opens your mail program with a prepared message), **Copy invitation text** and, on phones, **Share…**.

### The poll link

The link has the form `https://cryohub-eb898.web.app/poll/<poll id>`. Anyone who opens it:

- If not signed in: creates an account (or signs in, including with Google) on the same page, then votes. The member questionnaire is not required to vote. The person gives the name shown with their answers.
- If signed in: votes immediately. Members answer under their profile name.
- Chooses Available, If needed or Unavailable for each time, in their own time zone, with live counts and the most available time highlighted. Times left blank are recorded as unavailable. Answers can be changed until the deadline.
- After saving, sees a summary of their answers and can join the community, which opens the member profile questionnaire.

Organisers can copy the link from the poll card or the poll window at any time, and can turn link sharing off or on. Older polls start with link sharing off; their organisers can turn it on from the poll window. Polls answered through a link appear in the voter's Meeting polls list under "Shared with you".

### Voting in the Hub

The poll window uses the same voting cards, with **Available for all** and **Clear** shortcuts, the response count, the time left, and the share box for organisers. Time-zone comparison and **Schedule this time** are unchanged.

### Permissions (firestore.rules)

- A new optional poll field, `linkAccess`, is set by the organiser. Only the poll's leadership and UNESCO Secretariat can change it.
- When `linkAccess` is on, any signed-in person who has the link can open that poll by its id and answer it. Polls are never listable through the link: people outside the audience cannot browse or search polls.
- Members still answer under their profile name. A signed-in person without a profile can answer only polls whose link is open, and gives a name of 1 to 120 characters.
- People who answer through the link can see the poll's responses (names, time zones and answers), as invited participants already could.
- Turning the link off stops new link answers immediately. Answers already given are kept.

## Validation

Production TypeScript build and 27 pure checks pass (membership, calendar, goals and meetings, including a new check of poll link parsing and invitation text). The Firestore permission suite has a new test for link access; it could not run in the preparation environment because the emulator download was blocked, so run `npm run test:rules` before deploying. Visual checks covered the sign-in page, page banners, Working Group cards, the three composer steps and the share step, the poll window, and the invitation page signed out, signed in without a profile, and after saving, on desktop and phone, in light and dark modes.
