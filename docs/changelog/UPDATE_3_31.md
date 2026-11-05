# Version 3.31 — public sharing and UNESCO country names

## What changes

1. The news and event forms no longer show "Visibility on IHP-WINS". Every news item and every public event is treated as public for IHP-WINS. Internal meetings (leadership, Core Group, Broad Group) are still never shared.
2. The "IHP-WINS export" buttons are removed from the News page and the Calendar, together with the IHP-WINS labels on news cards and event pages.
3. The event overview is now required for every public event, as it is in the IHP-WINS form.
4. Countries use the names approved by UNESCO, as written in the Official Directory of Permanent Delegations to UNESCO (188 Permanent Delegations and the Holy See). They apply to the Member States of news and events and to the country of member profiles, including at registration.
5. In profiles, the country is chosen from this list. "Other country or territory" allows another name to be typed. Earlier spellings are converted when a profile is opened for editing (for example "Vietnam" becomes "Viet Nam"); names that cannot be matched are kept as typed.
6. Every UNESCO name is placed on the members globe. Tuvalu was added to the map data.

## Deployment

The database rules do not change. Pushing to `main` publishes the website.
