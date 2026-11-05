# Version 3.27 · Member badge on a lanyard

This version does not change the database rules. It adds one package, `three` (three.js), used to draw the badge in 3D. Install it, then build and deploy the website only:

```bash
npm install
npm run build
firebase deploy --project cryohub-eb898 --only hosting
```

## What members see

- When a member opens a profile, on a screen at least 1,200 pixels wide, the person's badge drops in on the right of the profile window and hangs from a lanyard. The profile window moves to the left to make room.
- The front of the badge shows the logo of the Decade, the person's photo (or their initials when they have no photo), their name, their position, their role and their organisation and country.
- The role is the first badge shown on the profile, for example "Lead of WG1" or "Core Group member of WG2". A member without any assigned badge shows "Interested member".
- The badge takes the colour of the person's Working Group, as their profile does.
- The back of the badge shows the logo of the Decade, "Member of the DACS community" and the UNESCO logo.
- The lanyard carries the words "Decade of Action for Cryospheric Sciences · 2025–2034".
- The badge can be dragged and swings back; it moves gently in the air when left alone. A short "Drag the badge" hint appears when it is first shown.
- The badge closes with the profile.

## What does not change

- On smaller screens (laptops under 1,200 pixels wide, tablets and phones), the badge is not shown and the profile window is unchanged.
- No image is stored for any member: the badge is drawn in the browser from the profile each time it is opened.
- Members who ask their system to reduce motion see the badge appear without the drop animation.
- The 3D code (about 140 KB compressed) is downloaded only the first time a profile is opened on a wide screen, so the rest of the platform loads as before.

## Credit and licence

The lanyard is the "Lanyard" component of React Bits (https://reactbits.dev) by David Haz, used unchanged in `components/lanyard/`. Its licence (MIT with the Commons Clause, in `components/lanyard/LICENSE`) allows its use as part of an application such as this platform; the component itself may not be sold or redistributed on its own.

## Files

- `components/lanyard/` (new): the Lanyard component, its stylesheet and its licence.
- `app/member-badge-art.ts` (new): drawing of the front, back and strap of the badge.
- `app/member-lanyard.tsx` (new): the badge beside the profile, loaded only on wide screens.
- `app/community.tsx`, `app/member-sheet.tsx`, `app/globals.css`: placement of the badge and of the profile window.
