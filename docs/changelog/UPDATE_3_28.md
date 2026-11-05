# Version 3.28 · Faster decisions on declared roles, clearer logo review platform

This version does not change the database rules. Build and deploy the website only:

```bash
npm install
npm run build
firebase deploy --project cryohub-eb898 --only hosting
```

## Declared roles and applications (UNESCO Secretariat)

### Roles declared at registration

- Each declared role now has one-click buttons: **Confirm** (or **Accept as Broad Group member** / **Accept as member** when the person wrote "I wish to apply"), **Decline**, and a short list for **Other role…**.
- A member who declared two or more roles shows two buttons at the top of their card:
  - **Confirm all as declared** selects "Confirm" for every role that can be confirmed; the decisions are saved with **Save**.
  - **Decline all** declines every open role of that member at once, after one confirmation.
- Rows turn green when they will be confirmed and red when they will be declined, so the decisions can be checked before saving.
- Decisions can be saved for some roles and left for later for others; the card shows how many remain.
- When roles concern several bodies, buttons at the top filter the list by body (for example WG4 or SMC), with the number of open roles for each.

### Applications to join a Broad Group

- When two or more applications are waiting, **Approve all** and **Decline all** decide them in one step, after one confirmation. Each approved member receives the Broad Group badge of the group they applied to.

## Logo review platform

The structure (menu, pages and tabs) and the visual identity (colours, glass panels, logos) are unchanged. The text is shorter and the process is shown visually.

- **Six steps.** The process is shown as six steps with icons: received, screening, assessment, opinions, decision and notification. It appears on the Methodology page and, for the Working Groups, the SMC and the ESC, on "My dossiers", with their own step highlighted.
- **Each request** shows the same six steps at the top, with the steps already done ticked and the current step highlighted (in orange when the request waits for the applicant).
- **Tabs** have icons and status marks: a tick when the screening or the assessment is complete, "!" when a hard gate is to verify or triggered, the number of criteria scored (for example 3/6), and the number of opinions received.
- **Screening** opens with a clear verdict ("All gates cleared", "A gate is to verify" or "A gate is triggered"). Each hard gate is a numbered row that turns green, orange or red with the answer; its full wording opens from the information icon.
- **Assessment**:
  - the three levels are cards to click, each showing the logos used and the chain of bodies that decide (for example Secretariat → Working Group → SMC); the level requested by the applicant is marked;
  - the 15 main goals are grouped by Overarching Challenge, in the colours of the Hub, and the goals declared by the applicant are marked with a dot;
  - each criterion shows its weight as a bar, and its description opens from the information icon.
- **Weighted score**: the bands (refuse, revert, conditions, approve) are labelled under the gauge.
- **Methodology** shows the six steps, the three levels with their chain of decision, the four hard gates as tiles, the weights of the six criteria as a coloured bar, and the score bands as a scale.
- Page introductions and guidance texts are shortened throughout.

## Files

- `app/role-requests.tsx`, `app/group-requests.tsx`, `app/globals.css`: quick and grouped decisions.
- `logo-desk/app.js`, `logo-desk/styles.css`: visual changes to the logo review platform.
