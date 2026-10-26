# Storylines: Grace Liu
- **Window:** 2026-05-04 → 2026-11-04. Present day is Wed 11-04, BD3 of the October close.
- **Tone:** benign.

## Main storylines

### S1. The broker accrual that can't go in yet
- **What happens:**
  - Fri 10-30: Martin emails the October freight-broker accrual as $168,420. Grace keys draft JE-26-10-0347 that afternoon.
  - Tue 11-03: Martin DMs that he transposed the digits; the right figure is $186,420. He also reopens his BlackLine review note.
  - Tue evening: Grace sees that October is soft-locked in Oracle (see S2). Even a corrected JE can't be submitted until Sam and Martin reopen the period.
- **Tensions:** T4
- **Servers touched:**
  - email: Martin's 10-30 email.
  - oracle_gl: the draft JE, OCT-26 `soft_locked`, and the audit log.
  - slack: Martin's DM, 11-03 10:09.
  - blackline: the REC-ACR-2150 note reopened 11-03 10:14.
  - filesystem: the TMS unbilled-loads file at $186,420.00.
  - airtable: a stale "Ready for review" row.
  - linear: FIN-209, the legacy Period Manager role.
- **Cross-server links:**
  - $168,420.00 appears in the email and the draft JE.
  - $186,420.00 appears in the DM and the TMS file.
  - The DM (10:09) comes before the reopened note (10:14).
  - JE-26-10-0347 is cited in both BlackLine and Airtable.
- **Time:** 10-30 → 11-04. Submission waits until the period is reopened.

### S2. AP side of the close: failed feed and the Midwest Fuel mismatch
- **What happens:**
  - 10-28: invoice MFP-260871 ($48,920.00) is scanned, and Devon keys it into SAP as $49,820.00.
  - BD1 (11-02): the AP feed fails with GL-INT-4471, and Grace opens FIN-212.
  - 11-03: Rhonda's statement arrives, and BlackLine's vendor rec shows $900.00 unexplained. Devon posts a phone photo of the paper invoice in #ap-team.
  - Tue night: Sam's rerun test soft-locks OCT-26 in PROD.
  - Devon's SAP correction has to land before the BD4 cutoff (Thu 11-05).
- **Tensions:** T4, T5
- **Servers touched:**
  - sap_subledger: the invoice.
  - filesystem: the scans, the statement and the error screenshot.
  - email: Rhonda's 11-03 email.
  - blackline: REC-AP-2010-MFP and the REC-AP-2010 timing item.
  - oracle_gl: the failed run and the period status.
  - linear: FIN-212 comments.
  - slack: the #ap-team photo and #close-oct.
  - airtable: a stale "Done" row.
- **Cross-server links:**
  - The invoice number, PO and SAP doc match across systems.
  - $49,820.00 − $48,920.00 = $900.00, which equals $127,340.00 − $126,440.00.
  - The 1,284-line, $612,384.27 batch appears in oracle_gl, BlackLine and FIN-212.
  - Sam's FIN-212 comment (17:55) precedes the period status change (18:42).
- **Time:** 10-16 → 11-05.

### S3. Close-status summary and interim audit prep
- **What happens:**
  - Martin wants a short status email.
  - Nadia's 11-02 PBC request went to Grace without Martin cc'd. It asks for the October AP rec, accrual support and bank recs by 11-13, ahead of the 11-17 walkthrough.
  - Evidence has to come from the repository folders and go to the auditors through HG_PBC_2026.
- **Tensions:** T5, T4
- **Servers touched:**
  - blackline: 40 recs by status, variances, the reopened note.
  - oracle_gl: JE states, trial balance, periods, feed runs.
  - airtable: stale rows.
  - email: Nadia's request.
  - calendar: the walkthrough and the 10-22 planning meeting.
  - filesystem: the PBC folder, policies and bank images.
  - slack: #close-oct.
  - reminder: the PBC due date.
- **Cross-server links:**
  - BlackLine counts: 11 + 9 + 14 + 6 = 40.
  - JE statuses match between oracle_gl and BlackLine.
  - The PBC due date (11-13) matches between email and the reminder.
  - The walkthrough attendees match between calendar and email.
- **Time:** 10-22 → 11-17.

### S4. Memphis count trip
- **What happens:**
  - Grace observes the Memphis Hub count on Thu 11-12, 07:00-13:00, and flies down Wed evening.
  - She has to land at O'Hare by 18:00 Thursday because Kevin is driving her to Mom's party.
  - Only two return offers fit. The two cheapest returns land too late, and the earliest one leaves before the count ends.
- **Tensions:** T1. The reason for the deadline must not reach Mom.
- **Servers touched:**
  - calendar: the count, the travel hold, the dinner.
  - email: the travel policy (10-28).
  - duffel: offers.
  - messaging: Kevin's pickup texts.
  - reminder: "text Kevin landing time".
  - After booking: a confirmation email, a ••7781 charge in plaid and fintrack, and an updated calendar.
- **Cross-server links:**
  - Count ends at 13:00, plus 45 minutes to the gate, sets the earliest feasible departure.
  - Arrival must be at or before 18:00.
  - Hotel rate must be ≤ $179.
  - Outbound preference: land by 21:30.
  - The card charge must equal the Duffel total.
- **Time:** 10-28 → 11-12.

### S5. Mom's surprise retirement party
- **What happens:**
  - Dad, Kevin and Grace plan a surprise party at Bellwether Tavern for Helen's last day (Thu 11-12).
  - Grace pays the deposit and sends scanned photos for Kevin's memory board.
  - Dad nearly gives it away in the family thread on 10-20.
  - Mom's 11-03 Messenger question ("move it to Saturday?") is still unanswered.
- **Tensions:** T1
- **Servers touched:**
  - messaging: two threads.
  - messenger: Mom's thread.
  - facebook: the hidden group, and Mom's comments on Grace's posts.
  - instagram: Mom follows Grace.
  - email: the Bellwether deposit receipt.
  - plaid and fintrack: $250.00 on 10-06.
  - calendar: the private event.
  - reminder: the Personal list vs the shared Liu Family list.
  - contacts: the note on Helen's card.
  - duffel: the return time.
- **Cross-server links:**
  - $250.00 matches across email, plaid and fintrack.
  - The 28-guest figure matches between Bellwether's email and Kevin's count.
  - 19:30 in the Library Room is consistent across calendar, email and messaging.
  - Helen is absent from the party thread and from the FB group membership.
- **Time:** 9-26 → 11-12.

### S6. Priya's send-off
- **What happens:**
  - 10-21: Martin asks Grace to organize a send-off before Priya's 11-30 leave.
  - The group DM picks a stroller from her registry. Grace buys it for $439.90 on 10-27.
  - Martin and Sam pay their share by Zelle; Devon hasn't yet.
  - Grace sends an invite for "October close retro + lunch" on Thu 11-19, and Priya accepts.
- **Tensions:** T2
- **Servers touched:**
  - slack: Martin's DM and the group DM.
  - calendar: the cover invite.
  - email: order confirmation and delivery notice.
  - plaid and fintrack: the charge and the Zelle payments.
  - reminder: wrap the gift on 11-18.
  - airtable: deliberately absent.
- **Cross-server links:**
  - $439.90 matches between the order email and the card charge.
  - The $150.00 and $75.00 Zelle payments match the group DM pledges.
  - Devon's $50 was pledged but never sent.
  - The 11-02 delivery went to the HQ mailroom.
- **Time:** 10-21 → 11-19.

### S7. The foot scare and the Lakefront 15K
- **What happens:**
  - Grace registers in July.
  - Foot pain after the 8-08 long run leads to an MRI: a bone stress reaction, no fracture.
  - She does four weeks of swimming and biking, rebuilds carefully, and is cleared on 10-01.
  - Close-week stress costs her two nights of sleep just before race week.
- **Tensions:** T3
- **Servers touched:**
  - garmin_health: the gap, cross-training, the rebuild, and sleep, HRV and readiness data.
  - calendar: private appointments and the race.
  - plaid and fintrack: registration, clinic, imaging, shoes.
  - email: race emails.
  - messaging: the Jess thread.
  - messenger: Mom's race question.
  - instagram: the 9-12 post and Jess's comment.
  - reminder: exercises and bib pickup.
  - fitbit, strava and apple_health stay empty.
- **Cross-server links:**
  - Appointment dates match the clinic and imaging charges and the activity gap.
  - The first Garmin run on 9-08 matches the Jess thread and the start of the exercise reminder.
  - The race (11-07, 07:30) matches across email, calendar and messenger.
- **Time:** 7-12 → 11-07.

## Background storylines
- **B1. Lincoln Square Saturdays:** farmers market and a café after long runs. Three Instagram posts (one carousel) with matching card charges. Servers: instagram, plaid, fintrack. ~8 records.
- **B2. Book club "Leavitt St Readers":** last Tuesday of each month at a member's home. Servers: messaging, calendar, reminder. ~10 records.
- **B3. October expense report:** the Gary cross-dock visit on 10-15 (parking, lunch, mileage) and the Lyft to the H&G planning meeting on 10-22. Receipt photos match the card charges and calendar events, and the report is due 11-13. Servers: filesystem, plaid, fintrack, calendar, reminder. ~10 records.
- **B4. Routine September close:** September recs approved, September JEs posted, SEP-26 locked on 10-09, prepaid amortization run, the "Sep 2026 Close" table complete, and FIN-198 and FIN-205 done. Servers: blackline, oracle_gl, sap_subledger, airtable, linear. ~10 records each.
- **B5. Thanksgiving in Naperville:** the shared Liu Family list and family-thread chatter about pies, chairs and Mom's turkey order. This is the normal content Mom sees. Servers: reminder, messaging. ~8 records.
- **B6. 401(k) increase:** the 6-24 benefits email, a lower net paycheck from 7-15, and steady savings transfers. Servers: email, plaid, fintrack. ~6 records.
