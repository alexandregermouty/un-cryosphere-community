# Version 3.30 — news and events aligned with IHP-WINS

## What changes

1. The "Share news" form is organised in the five sections of the IHP-WINS "Share News" form: article information, article content, additional information, images, and Member States and initiatives. A sixth section keeps the fields of the Decade (shared for, main goals).
2. The "Add event" form is organised in the ten sections of the IHP-WINS "Share New Event" form, followed by the Decade section (main goals). Internal meetings show only the sections that apply to them.
3. New fields: publication date, author or source, summary, related links, additional content, header image, external image links, Member States, visibility on IHP-WINS (news); event type, format, displayed organizer name, co-organizers, event details, speakers and organizers, registration information, additional information, excerpt, header image, image links, Member States, visibility on IHP-WINS (events).
4. The news page and the event page display the new information. Header images also appear on the news cards.
5. The UNESCO Secretariat can download shared news and events in the IHP-WINS structure ("IHP-WINS export").
6. Internal meetings (leadership, Core Group, Broad Group) are never shared on IHP-WINS.

The field-by-field correspondence and the remaining steps for automatic synchronisation are in `docs/WINS_SYNC.md`.

## Deployment order

The database rules change. Deploy the rules **before** the website, otherwise members cannot save news or events that contain the new fields.

1. Deploy the rules: `npx -y firebase-tools@14.22.0 deploy --only firestore --project cryohub-eb898`, or run the "Deploy Firestore rules" workflow in GitHub Actions.
2. Push the code to `main`. The "Deploy to GitHub Pages" workflow now also runs the Firestore rules tests and publishes only if they pass.

Existing news and events remain valid and are not shared on IHP-WINS until they are edited.

## Rules tests

The Firestore rules tests now run before every deployment. Running them showed that four tests written before versions 3.24 and 3.26 no longer matched the behaviour those versions introduced on purpose. The rules were not changed for them; the tests were brought up to date:

1. Logo review (three tests): since version 3.26, access is granted member by member by the UNESCO Secretariat, and appointments or badges alone give none. The tests now check exactly that, including that access ends when the Secretariat removes it.
2. Flagship projects (one test): since version 3.24, the member who proposed an activity may change its flagship project. The test now checks that the proposer can and that other members cannot.

Events already come close to the Firestore limit of 1,000 rule expressions evaluated per request. The rules therefore check only the privacy-relevant IHP-WINS fields on events (visibility, and that internal meetings are never shared); the app checks the content of the other fields and displays only web links (http and https).
