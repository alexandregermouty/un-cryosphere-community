# Version 3.27.1 · Larger profile window, badge over the window

This version does not change the database rules. Build and deploy the website only:

```bash
npm install
npm run build
firebase deploy --project cryohub-eb898 --only hosting
```

## Changes

- On screens at least 1,200 pixels wide, the profile window is now wider (up to 1,000 pixels) and sits on the left of the screen, 32 pixels from the edge.
- The badge is a little smaller, and its strap hangs in the middle of the space to the right of the profile window.
- The badge is now drawn on a layer above the whole screen, so it can swing and be dragged over the profile window without disappearing behind it.
- The badge now swings in from the left, across the profile window, before it settles on the right.
- The layer takes the mouse only over the badge itself. Everywhere else, clicks, text selection and scrolling reach the profile window and the page as before.
- A short click on the badge turns it over to show its back; dragging it moves it.

## Files

- `components/lanyard/Lanyard.tsx`: two options added to the React Bits component, `anchorX` (horizontal position of the strap) and `passThrough` (the canvas takes the pointer only over the card), and the swing-in from the left when the strap is right of centre. The notice at the top of the file records these changes.
- `app/member-lanyard.tsx`: position of the strap, size of the badge, full-screen layer.
- `app/globals.css`: width and position of the profile window when the badge is shown.
