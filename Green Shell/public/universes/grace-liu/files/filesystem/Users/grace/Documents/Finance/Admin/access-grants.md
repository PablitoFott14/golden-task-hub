# H&G read-only folder, and the extra access on my Oracle login

What the auditors can see, who approved it, and the access on my own login that goes beyond my job.

## Finance/Audit/HG_PBC_2026

| Who | Access |
|---|---|
| Hollins & Grant LLP engagement team: Nadia Okafor (Senior Manager) and team members she requests | Read-only |
| Martin Keane, Controller | Edit |
| Priya Raman, Assistant Controller | Edit |
| Grace Liu (me), Senior Accountant | Edit |

- Approved by Martin in Slack DM, Thu 10-22 16:08: "Approved. HG_PBC_2026 read-only for H&G, edit for you, me and Priya. Nothing else on the Finance drive."
- Granted by Sam Whitfield (Finance Systems), Fri 10-23 08:46.
- H&G access expires 2027-04-30 unless renewed.
- Nothing else is shared with H&G: not Finance/Close (Evidence folders included), Finance/Vendors, Finance/Policies, Finance/Admin where this note lives, or anything under Personal.
- Why one folder: Nadia asked for a single read-only folder instead of email attachments (her 10-22 follow-up, point 4) and confirmed on 10-23 that HG_PBC_2026 works for them.

## Rules for the folder

1. Only items already reviewed in BlackLine go in, copied from that month's Evidence folder under Finance/Close (October: Finance/Close/2026-10/Evidence).
2. Never from Users/Shared/attachments (saved email attachments and Slack photos), Downloads or my phone, even when it's the same document.
3. Final versions only. No drafts, open variance lists or anything still in review.
4. One subfolder per PBC request, named by request date.
5. Martin is cc'd on everything I send H&G, including replies to emails that came to me only.
6. New H&G team members: read-only, at Nadia's request, set up by Sam. Anything wider (another folder, edit for H&G, past 2027-04-30) needs Martin's OK first. Every change goes in the log.

## PBC requests

**2026-11-02**, from Nadia, sent to me only. For the Tue 11-17 walkthrough. Final versions in the folder by Fri 11-13, not by email. If an item will be later, she wants to know which one and the expected date.

1. October AP rec, GL 2010-000 to the SAP AP subledger, with reconciling items and evidence of review.
2. October freight-broker accrual support, GL 2150-000: the TMS unbilled-loads report and the JE that records it.
3. October bank recs for operating ••0917 and payroll ••0925, with the October statements.

Folder contents so far: the README only. The 2026-11-02 subfolder isn't created yet.

## My own Oracle access

- `Period Manager (legacy - GL Upgrade 2025)` is still assigned to `gliu` in Oracle PROD. Found in the Q3 user access review on 10-13. FIN-209 (Backlog, assigned to Sam) is to remove it, along with the two old consultant logins, `glupg_cons01` and `glupg_cons02`.
- The role can open, soft-lock and close GL periods. Under GL-09 that sits with the Controller and Systems Admin roles only. I haven't used it since the GL upgrade and won't. Period status changes go to Sam, with Martin's OK.
- Oracle also doesn't stop me approving or posting a JE I prepared. GL-07: I prepare, Martin approves, Priya is backup.
- Removal waits for October to close. Martin on FIN-209, 10-15: no role changes during close week, pick it up after BD7 (Tue 11-10).
- Sam's plan: one batch for every GL-upgrade user, not one-offs. On Wed 11-11 he reruns `GL_USER_ROLE_ASSIGNMENTS` in PROD to confirm the list, end-dates the role for all three logins, and attaches the before/after export to FIN-209 for the Q4 access review.
- Until then (Sam, 10-26): anything that comes up goes in a FIN ticket.

## Log

- Wed 10-14: Sam flagged the legacy role from the Q3 access review and logged FIN-209. Told him it's fine to remove.
- Thu 10-15: Martin put FIN-209 on hold until October is closed.
- Thu 10-22: H&G planning at their office, 14:00. Asked Martin for a read-only PBC folder at 15:54; approved 16:08. Asked Sam at 16:41 to set it up Friday morning.
- Fri 10-23: Sam confirmed at 08:46: folder created, H&G read-only, no other Finance folders shared. My edit access works; README added 09:00. Replied to Nadia with the folder name, Martin cc'd, and she confirmed it works for them. Martin's walkthrough invite says PBC items are due Fri 11-13 in HG_PBC_2026.
- Mon 10-26: Asked Sam whether FIN-209 is still planned. Still in backlog, one batch removal, the week after October hard close.
- Thu 10-29: Told Martin (1:1 agenda) the folder is set up and stays empty until each item is reviewed in BlackLine.
- Mon 11-02: Nadia's PBC request came in, to me only (items above). My reply adds Martin.

## Open

- [ ] Reply to Nadia's 11-02 request with Martin cc'd. Confirm timing, and name any item that will land after Fri 11-13 with its date. Slipped from Tue 11-03.
- [ ] Create HG_PBC_2026/2026-11-02 and copy each item in from Finance/Close/2026-10/Evidence once it's reviewed in BlackLine. Due Fri 11-13.
- [ ] FIN-209: check with Sam on Wed 11-18 that the role is off `gliu`.
