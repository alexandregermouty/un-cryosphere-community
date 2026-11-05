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
