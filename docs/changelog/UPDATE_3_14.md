# Version 3.14 — menu fix and rotating globe

## Deploy this update

Replace the source and the entire dist folder in your DACS_CryoHub folder (keep .env.local), then:

```bash
cd /Users/alexandregermouty/Desktop/Websites/DACS_CryoHub
firebase deploy --project cryohub-eb898 --only hosting
```

Firestore rules did not change since 3.13. If 3.13 was not deployed with its rules, use `--only hosting,firestore`.

## Section menu (access was not lost)

In version 3.13, the decorative pattern added to the section menu made the menu card clip its content: on most screens the menu stopped after "Work plans", hiding Decision register, Logo review, Core Group workspace, Governance, Official website, Dashboard and UNESCO Secretariat. Permissions were unchanged. Version 3.14 removes the clipping: the full menu is visible again and scrolls on small screens, with the pattern kept inside the card.

## Members map: rotating globe

The map under Members and on the Dashboard is now a globe in the Decade's navy and ice-blue palette:

- It turns slowly on its own. **Pause** stops the rotation; drag to turn it by hand; it resumes a few seconds later.
- Zoom with the + and − buttons, a double click, a pinch on phones, or the mouse wheel after clicking the globe. A finer coastline loads when zooming in. **Reset** returns to the starting view.
- Each country is a glowing point that sends out signal rings. Hover a point to see the country and the number of members; click a point, or a country in the list, to turn the globe to it and highlight it in orange.
- **Gender representation** is shown on the globe (top left) and in the side panel, on both maps. Members see the totals for all registered members; the UNESCO Secretariat sees the totals for the profiles shown, can filter by gender, and sees the split per country when pointing at a country.
- Coastlines only, without national borders, and the UNESCO disclaimer on designations and boundaries.
- Motion stops automatically when the device asks for reduced motion.
