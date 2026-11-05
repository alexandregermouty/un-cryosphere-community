# Account access without verification emails

Version 3.3 creates an account and opens the profile questionnaire directly. It sends no registration verification email and shows no verification waiting screen. Existing unverified accounts can sign in with their current passwords. Deploy the updated Hosting files and Firestore rules together.

Firebase keeps the actual `emailVerified` state. The app does not forge verification or trust a profile's contact address to grant editing permissions. A member-provided address is not proof of mailbox ownership.

## UNESCO Secretariat owner access

For initial owner access, use **Sign in with Google** as **alexandregermouty@gmail.com**. Enable Google in Firebase Console → Authentication → Sign-in method if needed. This sign-in confirms the owner's identity without a Firebase verification message. Existing protected UNESCO Secretariat roles remain valid. Other members receive that role only from UNESCO Secretariat. A new unverified signup using the owner email cannot self-promote.

## Remaining email operations

The **Reset password** button still sends a Firebase password-reset email. The `/auth/action` page handles password reset and email recovery. It accepts old verification links for compatibility; following them is optional for community access. Recipient spam and quarantine policies can still affect password-reset mail.

No Gmail SMTP, UNESCO relay, sender-domain configuration or billing change is needed for registration in this version. Existing Firebase email settings are left in place. This update bypasses registration's dependence on email delivery; it does not fix recipient mail filtering.

## Deployment check

1. Register a test account in a private browser window. The questionnaire should open directly.
2. Confirm that account can save its profile, photo and custom choices.
3. Sign out and sign back in with an existing unverified account. It should reach the community.
4. Confirm ordinary members cannot edit governance, assign roles or read another member's private answers.

References:
- https://firebase.google.com/docs/auth/web/password-auth
- https://firebase.google.com/docs/auth/web/google-signin
- https://firebase.google.com/docs/firestore/security/rules-conditions
