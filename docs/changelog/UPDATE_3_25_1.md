# Version 3.25.1 · Triennia, Working Group 5, default badge, Broad Group applications

This version changes the database rules. Deploy hosting and rules together:

```bash
firebase deploy --project cryohub-eb898 --only hosting,firestore
```

If version 3.25 was deployed with `--only hosting`, the rules for Broad Group applications were never published, and every application was refused. The command above publishes them.

Run `npm run test:rules` on your computer first. The Broad Group applications test now also checks that a member can look up their own application before sending it.

## Dates of the triennia

- The three triennia are now dated 2026–2028, 2029–2031 and 2032–2034.
- The current triennium is worked out from these dates, so the "Current focus" marker moves to the second triennium on 1 January 2029 and to the third on 1 January 2032.
- The dates appear on the page of each Working Group and in its Flagship projects tab.

## Working Group 5

- MG5.1, MG5.2 and MG5.3 are now all shown in focus in every triennium. MG5.1 is no longer singled out.
- On the page of Working Group 5, each main goal is a bar across the three triennia, and the current triennium (2026–2028) is highlighted on all three bars.
- The note below the bars reads: "The three main goals run concurrently: each of them is in focus in all three triennia of the Decade", followed by the quotation "All Main Goals of OC5 need to run in parallel" from the Terms of Reference of Working Group 5.
- In the Flagship projects tab, each main goal of Working Group 5 reads "Runs throughout the Decade · in focus in every triennium".

## Default badge "Interested member"

- A member who holds no badge from the UNESCO Secretariat, no appointment and no Broad Group badge now shows the badge "Interested member".
- It replaces the former default badge "Broad Group Member", which suggested a confirmed membership that the member did not have.
- The badge appears on member cards, profiles, in messages and under the member's name in the menu.

## Error when applying to a Broad Group

### Cause

Before sending an application, the platform checks whether the member has already applied to that group. The database rules refused this check while no application existed yet, so the first application of every member failed with the message "This change needs the relevant member or Working Group permission".

### Fix

- The rules now let a member look up their own application to a group before it exists. They still cannot see the applications of other members.
- If the check is refused for any other reason, the application is sent anyway.
- If the application itself is refused, the member now sees "Your application could not be sent", with the contact address of the UNESCO Secretariat.
