# Version 3.20 · Email link page and narrated welcome video

The database rules have not changed in this version. Deploy the website only:

```bash
firebase deploy --project cryohub-eb898 --only hosting
```

If version 3.19 has not been deployed yet, deploy hosting and rules together instead (`--only hosting,firestore`).

## Page opened from password and verification emails

The page that opens from the links in password reset, email verification and email recovery messages (`/auth/action`) has been redesigned in the style of the platform.

- The page shows the Decade and UNESCO logos on a dark blue background, with a white card in the middle.
- When a member resets a password, the card shows the email address of the account, a field for the new password with a button to show or hide it, and a second field to confirm it.
- A short checklist turns green when the password has at least 8 characters and when both passwords match, and the button stays disabled until both conditions are met.
- After saving, the card confirms that the password has been updated and offers a button to sign in.
- When a link has expired or has already been used, the card explains this in plain words and links back to the sign-in page, where a new email can be requested.
- A line at the bottom tells members who did not ask for the email that they can ignore it and that their account has not changed.

The page only returns to the platform home page. It never follows a return address written into the link.

## Making the email links look trustworthy (Firebase console)

By default, Firebase sends these emails from `noreply@cryohub-eb898.firebaseapp.com`, and the link points to `cryohub-eb898.firebaseapp.com/__/auth/action?...`. Both look unfamiliar to members, which is why the email can look like spam. The following settings are made once in the Firebase console, under **Authentication → Templates**.

1. Open the **Password reset** template and select the pencil icon. Select **Customize action URL** and enter `https://un-cryosphere-decade-community.space/auth/action`. This setting applies to every email template, and links will then open the redesigned page on the platform's own domain.
2. In the same template, set the sender name to **DACS Community**, set a reply-to address that the Secretariat reads, and adjust the subject (for example, "Reset your DACS Community password").
3. Select **Customize domain** next to the sender address and enter `un-cryosphere-decade-community.space`. Firebase shows DNS records (TXT and CNAME) to add at the domain registrar. Verification can take up to 24 hours; then select **Apply custom domain**. Emails will then come from `noreply@un-cryosphere-decade-community.space`.
4. Under **Authentication → Settings → Authorized domains**, check that `un-cryosphere-decade-community.space` is listed.

The link will still end with a code (`?mode=resetPassword&oobCode=...&apiKey=...`). This code identifies the request and cannot be removed, but with the steps above, the address before it is the platform's own domain.

Source: Firebase documentation, "Customize the email action handler domain", https://firebase.google.com/docs/auth/email-custom-domain

## Narrated welcome video

The welcome tour has been recorded again to follow the narration.

- The video now carries the narration supplied by the Secretariat (83 seconds).
- Each scene is timed to the sentence that describes it: home, menu, Members and their filters, a profile and a private message, a Working Group space, Activities, the calendar and its colours, an event, Polls and consultations, the bell, and the profile with the role step.
- The subtitles are written into the picture and reproduce the narration sentence by sentence.
- The video tries to start with sound. Some browsers block sound until the member has interacted with the page; in that case the video plays without sound and a "Turn on the sound" button appears over it.
- The files have new names (`welcome-narrated.mp4`, `welcome-narrated.webm`, `welcome-narrated-poster.jpg`), so browsers that kept the previous video download the new one.

## Files

- Changed: `app/email-action.tsx`, `app/welcome-video.tsx`, `app/globals.css`, `package.json`, `package-lock.json`, `README.md`.
- Replaced: `public/assets/video/welcome.mp4`, `welcome.webm` and `welcome-poster.jpg` by `welcome-narrated.mp4`, `welcome-narrated.webm` and `welcome-narrated-poster.jpg`.
