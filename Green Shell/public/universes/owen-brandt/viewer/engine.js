
const SEED = {};
SEED["airtable"] = __UV.seed["airtable"];
SEED["calendar"] = __UV.seed["calendar"];
SEED["contacts"] = __UV.seed["contacts"];
SEED["duffel"] = __UV.seed["duffel"];
SEED["email"] = __UV.seed["email"];
SEED["facebook"] = __UV.seed["facebook"];
SEED["filesystem"] = __UV.seed["filesystem"];
SEED["fintrack"] = __UV.seed["fintrack"];
SEED["garmin_health"] = __UV.seed["garmin_health"];
SEED["instagram"] = __UV.seed["instagram"];
SEED["messaging"] = __UV.seed["messaging"];
SEED["messenger"] = __UV.seed["messenger"];
SEED["plaid"] = __UV.seed["plaid"];
SEED["reminder"] = __UV.seed["reminder"];
SEED["slack"] = __UV.seed["slack"];
var SKIN_HTML = {};
SKIN_HTML["reminder"] = "<style>\n.vsk-reminder {display:block; background:#F2F2F7; padding:18px; border-radius:12px; color:#000000; font-size:15px; font-family:-apple-system,'SF Pro Text','Helvetica Neue',Helvetica,Arial,sans-serif;}\n.vsk-reminder .vsk-rem-shell {max-width:760px; margin:0 auto;}\n.vsk-reminder .vsk-rem-head {padding:2px 4px 12px;}\n.vsk-reminder .vsk-rem-h1 {font-size:32px; font-weight:800; margin:0; letter-spacing:-.02em;}\n.vsk-reminder .vsk-rem-sub {font-size:13px; color:#8E8E93; margin-top:2px;}\n.vsk-reminder .vsk-rem-tiles {display:flex; flex-wrap:wrap; gap:10px; margin-bottom:18px;}\n.vsk-reminder .vsk-rem-tile {flex:1 1 120px; background:#FFFFFF; border-radius:12px; padding:10px 12px; display:flex; flex-direction:column; gap:2px;}\n.vsk-reminder .vsk-rem-tile-ic {width:26px; height:26px; border-radius:50%; color:#FFFFFF; font-size:13px; display:flex; align-items:center; justify-content:center; margin-bottom:4px;}\n.vsk-reminder .vsk-rem-tile-n {font-size:24px; font-weight:800; line-height:1;}\n.vsk-reminder .vsk-rem-tile-l {font-size:12px; color:#8E8E93;}\n.vsk-reminder .vsk-rem-scroll {max-height:60vh; overflow:auto; padding-right:2px;}\n.vsk-reminder .vsk-rem-secttl {font-size:12px; font-weight:700; color:#8E8E93; text-transform:uppercase; letter-spacing:.05em; padding:2px 6px 8px;}\n.vsk-reminder .vsk-rem-card, .vsk-reminder .vsk-rem-completed {background:#FFFFFF; border-radius:12px; margin-bottom:14px; overflow:hidden;}\n.vsk-reminder .vsk-rem-cardhead {display:flex; align-items:center; gap:8px; padding:11px 14px; border-bottom:1px solid #E5E5EA;}\n.vsk-reminder .vsk-rem-donehead {background:#FBFBFD;}\n.vsk-reminder .vsk-rem-listdot {width:12px; height:12px; border-radius:50%; flex:0 0 12px;}\n.vsk-reminder .vsk-rem-listname {font-weight:700; font-size:16px;}\n.vsk-reminder .vsk-rem-listcount {margin-left:auto; color:#8E8E93; font-size:14px;}\n.vsk-reminder .vsk-rem-list {list-style:none; margin:0; padding:0;}\n.vsk-reminder .vsk-rem-row {display:flex; gap:11px; align-items:flex-start; padding:10px 14px; border-bottom:1px solid #F0F0F3;}\n.vsk-reminder .vsk-rem-row:last-child {border-bottom:0;}\n.vsk-reminder .vsk-rem-check {flex:0 0 21px; width:21px; height:21px; border-radius:50%; border:1.6px solid #C7C7CC; margin-top:2px; color:#FFFFFF; font-size:12px; line-height:18px; text-align:center;}\n.vsk-reminder .vsk-rem-check-done {background:#8E8E93; border-color:#8E8E93;}\n.vsk-reminder .vsk-rem-content {flex:1 1 auto; min-width:0; display:flex; flex-direction:column; gap:2px;}\n.vsk-reminder .vsk-rem-title {font-size:15px; line-height:1.3;}\n.vsk-reminder .vsk-rem-row-done .vsk-rem-title {color:#8E8E93; text-decoration:line-through;}\n.vsk-reminder .vsk-rem-notes {font-size:13px; color:#8E8E93; line-height:1.35;}\n.vsk-reminder .vsk-rem-badges {display:flex; flex-wrap:wrap; gap:6px; margin-top:3px;}\n.vsk-reminder .vsk-rem-badge {font-size:11px; color:#007AFF; background:#EAF3FF; border-radius:8px; padding:1px 7px;}\n.vsk-reminder .vsk-rem-when {flex:0 0 110px; text-align:right; display:flex; flex-direction:column; gap:1px;}\n.vsk-reminder .vsk-rem-date {font-size:13px; color:#007AFF;}\n.vsk-reminder .vsk-rem-clock {font-size:11px; color:#8E8E93;}\n.vsk-reminder .vsk-rem-late .vsk-rem-date {color:#FF3B30; font-weight:700;}\n.vsk-reminder .vsk-rem-notified {font-size:10px; color:#8E8E93; text-transform:uppercase; letter-spacing:.04em;}\n.vsk-reminder .vsk-rem-inferred {font-size:12px; color:#8E8E93; padding:10px 14px; background:#FFFBEA; border-bottom:1px solid #F0F0F3;}\n.vsk-reminder .vsk-rem-quiet {padding:14px; color:#8E8E93; font-size:13px; font-style:italic;}\n.vsk-reminder .vsk-reminder-empty {padding:24px; background:#FFFFFF; border-radius:12px; color:#8E8E93;}\n<\/style>\n<div class=\"vsk vsk-reminder\" data-skin=\"reminder\" data-skin-product=\"Reminders\"><div class=\"vsk-rem-shell\"><div class=\"vsk-rem-head\"><h1 class=\"vsk-rem-h1\">Reminders<\/h1><div class=\"vsk-rem-sub\">126 reminders, 43 open, 83 completed<\/div><\/div><div class=\"vsk-rem-tiles\"><div class=\"vsk-rem-tile\"><span class=\"vsk-rem-tile-ic\" style=\"background:#FF3B30\">&#9888;<\/span><span class=\"vsk-rem-tile-n\">42<\/span><span class=\"vsk-rem-tile-l\">Overdue<\/span><\/div><div class=\"vsk-rem-tile\"><span class=\"vsk-rem-tile-ic\" style=\"background:#FF9500\">&#128197;<\/span><span class=\"vsk-rem-tile-n\">43<\/span><span class=\"vsk-rem-tile-l\">Scheduled<\/span><\/div><div class=\"vsk-rem-tile\"><span class=\"vsk-rem-tile-ic\" style=\"background:#8E8E93\">&#9776;<\/span><span class=\"vsk-rem-tile-n\">126<\/span><span class=\"vsk-rem-tile-l\">All<\/span><\/div><div class=\"vsk-rem-tile\"><span class=\"vsk-rem-tile-ic\" style=\"background:#FF9500\">&#9873;<\/span><span class=\"vsk-rem-tile-n\">0<\/span><span class=\"vsk-rem-tile-l\">Flagged<\/span><\/div><div class=\"vsk-rem-tile\"><span class=\"vsk-rem-tile-ic\" style=\"background:#8E8E93\">&#10003;<\/span><span class=\"vsk-rem-tile-n\">83<\/span><span class=\"vsk-rem-tile-l\">Completed<\/span><\/div><\/div><div class=\"vsk-rem-scroll\"><div class=\"vsk-rem-listsec\"><div class=\"vsk-rem-secttl\">Scheduled by month<\/div><section class=\"vsk-rem-card\" data-reminder-list=\"October 2026\"><div class=\"vsk-rem-cardhead\"><span class=\"vsk-rem-listdot\" style=\"background:#AF52DE\"><\/span><span class=\"vsk-rem-listname\">October 2026<\/span><span class=\"vsk-rem-listcount\">9<\/span><\/div><ul class=\"vsk-rem-list\"><li class=\"vsk-rem-row\" data-reminder-id=\"a6d1f8e3c05b47920e8b3d6c\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Shoulder: wall slides and band pull-aparts<\/span><span class=\"vsk-rem-notes\">Two sets of 15 of each, every morning. Lisa Moberg&#x27;s advice for the right shoulder after the St. Croix trip in June.<\/span><span class=\"vsk-rem-badges\"><span class=\"vsk-rem-badge\">repeats every 1 day<\/span><\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Oct 30, 2026<\/span><span class=\"vsk-rem-clock\">07:15<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"7a3d9e05c1b64f28e0d7a3b9\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Send Ingrid the Duluth flight times and hotel<\/span><span class=\"vsk-rem-notes\">She wants them in the family calendar entry in case she needs to reach me.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Oct 30, 2026<\/span><span class=\"vsk-rem-clock\">07:30<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"e0a95b3c7d28f41e6a0c95b7\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Return Riverside cooler<\/span><span class=\"vsk-rem-notes\">Loaner cooler and ice packs back to Riverside Analytical in Coon Rapids.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Oct 30, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"5e1a8d3f6b9c2e47a5d1f8b3\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Send Hana top 5<\/span><span class=\"vsk-rem-notes\">Re-rank the Claims table for the cleanup-cost angle, then send her the top five.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Oct 30, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"e4b2071f8c9d36a5f1c4e870\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Riverside QA close-out: WO-26-10418<\/span><span class=\"vsk-rem-notes\">Priya needs COC line 2 settled before QA closes October work orders on Friday, Oct. 30. (763) 555-0114.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Oct 30, 2026<\/span><span class=\"vsk-rem-clock\">09:30<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"9e4b2c07f3a1d68e5b0c9f24\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Get back to Dr. Marchand about her two requests<\/span><span class=\"vsk-rem-notes\">Her Oct. 26 email asks for the Oct. 10 field photos and copies of both labs&#x27; COC forms before the interview on Thursday, Nov. 5. She&#x27;d like them by the end of this week.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Oct 30, 2026<\/span><span class=\"vsk-rem-clock\">10:00<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"d27f5a0e8c3b16f49a2e7c05\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Halloween candy for Saturday<\/span><span class=\"vsk-rem-notes\">Lorraine says the block had over 200 trick-or-treaters last year. Porch light on Saturday evening.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Oct 30, 2026<\/span><span class=\"vsk-rem-clock\">16:00<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"0f6c93a2d58e1b47c3a9f0e6\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Send Ingrid October business expenses<\/span><span class=\"vsk-rem-notes\">Totals by category for the tax sheet, like the Q2 list in July. She wants October closed out by the weekend.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Oct 30, 2026<\/span><span class=\"vsk-rem-clock\">16:30<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"92e1d7b40a5c3f68d2e47b1a\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Answer Ingrid about dinner with Kari and Tom<\/span><span class=\"vsk-rem-notes\">Kari and Tom asked about Saturday, Nov. 21. She asked whether to say yes.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Oct 31, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><\/ul><\/section><section class=\"vsk-rem-card\" data-reminder-list=\"November 2026\"><div class=\"vsk-rem-cardhead\"><span class=\"vsk-rem-listdot\" style=\"background:#FF3B30\"><\/span><span class=\"vsk-rem-listname\">November 2026<\/span><span class=\"vsk-rem-listcount\">28<\/span><\/div><ul class=\"vsk-rem-list\"><li class=\"vsk-rem-row\" data-reminder-id=\"1c8e6b3f0a92d47c5e1b8f36\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Household transfer: $2,400 to the joint account<\/span><span class=\"vsk-rem-notes\">Recurring transfer from checking 5512 to the joint household account at Ingrid&#x27;s credit union, for the mortgage and bills. It goes out on the first business day of the month, so make sure checking can cover it.<\/span><span class=\"vsk-rem-badges\"><span class=\"vsk-rem-badge\">repeats every 1 month<\/span><\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Nov 02, 2026<\/span><span class=\"vsk-rem-clock\">08:30<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"c5a80e3f7d21b964a0f5c38d\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Tax reserve: 25% of the retainer to savings<\/span><span class=\"vsk-rem-notes\">$375.00 from checking 5512 to savings 5530 once the North Current retainer posts. Log it in the 2026 tax reserve sheet.<\/span><span class=\"vsk-rem-badges\"><span class=\"vsk-rem-badge\">repeats every 1 month<\/span><\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Nov 02, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"f9a3c58e2d06b17a4f9c3e85\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">MLWD 2027 budget: check the board&#x27;s November agenda<\/span><span class=\"vsk-rem-notes\">Public comment on the draft budget closed Friday, Oct. 30. The Board of Managers takes up the final budget at its November meeting. Agendas post at metrolakeswd.org/board.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Nov 02, 2026<\/span><span class=\"vsk-rem-clock\">09:30<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"4c8e2b17f9a03d6e5b1c7a24\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Print Marchand questions<\/span><span class=\"vsk-rem-notes\">Question list for Thursday in Duluth. Bring the Sept. 30 transcript and spare recorder batteries.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Nov 03, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"a71d5f3e0c9b28e4f6d1b83c\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Check in for DL 3614<\/span><span class=\"vsk-rem-notes\">Delta app, booking QK4T7B. Departs MSP 9:40 a.m. Wednesday.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Nov 03, 2026<\/span><span class=\"vsk-rem-clock\">09:45<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"b58e2d0f9c4a13e76f2b0d8c\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Print both lab reports for Duluth<\/span><span class=\"vsk-rem-notes\">Results pages from Riverside WO-26-10418 and Northstar NS-4471 for Thursday&#x27;s interview. Told Dr. Marchand on Oct. 19 that I&#x27;d bring the Oct. 10 results.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Nov 03, 2026<\/span><span class=\"vsk-rem-clock\">14:00<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"8d4f1b6e3a9c27d05e8b4f13\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Lakehead balance $325<\/span><span class=\"vsk-rem-notes\">Pickup 3 p.m. at Lakehead Books. $100 deposit paid Oct 9.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Nov 05, 2026<\/span><span class=\"vsk-rem-clock\">12:45<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"4d7f1b2e96c0a385e7b1d4f9\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Check in for DL 3627<\/span><span class=\"vsk-rem-notes\">Delta app, booking QK4T7B. Departs DLH 5:15 p.m. Friday. The Lakewalk desk will hold my bag after checkout.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Nov 05, 2026<\/span><span class=\"vsk-rem-clock\">17:20<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"1e5a9d3c7f0b2648a1e5d9c3\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Follow up: Prairie Wire INV-2026-045<\/span><span class=\"vsk-rem-notes\">Invoiced Oct. 5 for September short pieces, $1,050.00. They usually pay in five to six weeks. Email accounts@prairiewire.com if it hasn&#x27;t landed.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Nov 09, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"d2f6b09a8e4c17359c0a6e7f\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Bill North Current for Duluth travel<\/span><span class=\"vsk-rem-notes\">Flight $289.40 and Lakewalk Inn $371.88, both on the Visa. Add cab fares and meals from the trip.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Nov 09, 2026<\/span><span class=\"vsk-rem-clock\">10:00<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"c7b1e5f9a3d6082c7e1b5f9a\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Expense invoice to North Current: labs + Duluth<\/span><span class=\"vsk-rem-notes\">Riverside $384.00, Northstar $260.00, Delta $289.40, Lakewalk Inn $371.88. Lab invoices are in Labs, travel receipts in the Duffel emails.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Nov 09, 2026<\/span><span class=\"vsk-rem-clock\">10:30<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"f5a03d9c2e7b18640d3f6a8e\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Find the original source for the 40 percent applicator figure<\/span><span class=\"vsk-rem-notes\">Tracker claim C11. The Salt Watch blog puts applicators at about 40 percent of metro salt, from something heard at a winter maintenance expo. Look for the survey or agency estimate behind it.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Nov 09, 2026<\/span><span class=\"vsk-rem-clock\">11:00<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"f3c69a0d2e84b157c6f29e3a\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Book a dental cleaning<\/span><span class=\"vsk-rem-notes\">Nokomis Dental Care says I&#x27;m overdue for the six-month cleaning. They have November openings.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Nov 09, 2026<\/span><span class=\"vsk-rem-clock\">13:30<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"a9f61e3cd58b07a4c2e96b1f\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Hollis prep: 3 clips + budget answer<\/span><span class=\"vsk-rem-notes\">Reread the three clips. Short answer on the reporting budget: lab fees, travel, records.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Nov 10, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"18e5b7c3a0f94d62b8e1c7a5\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Hollis interview: on Zoom by 12:50<\/span><span class=\"vsk-rem-notes\">Sound check at 12:50, interview 1 to 2 p.m. Meeting ID 841 5062 7193; the link is in Celeste&#x27;s Oct. 22 email. Have the three clips and the reporting budget open.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Nov 12, 2026<\/span><span class=\"vsk-rem-clock\">12:40<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"6b04f9d2e3a1c87b5d0e2f46\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Tell Marcus how the Hollis interview went<\/span><span class=\"vsk-rem-notes\">Said I&#x27;d let him know how it goes.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Nov 12, 2026<\/span><span class=\"vsk-rem-clock\">15:00<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"a29d5e8c17f03b46e9a2d0c7\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Art list and photo selects to Lena<\/span><span class=\"vsk-rem-notes\">Salt package, per Lena&#x27;s November schedule. Chart sidebar, the district&#x27;s site map for the quarter-page map (lake names, site codes in a key) and the cost graphic.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Nov 13, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"0b5d8a2f7e4c1b69d0a5f8e2\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Answer Hana on the spring Pepin series<\/span><span class=\"vsk-rem-notes\">Feb to May, three or four parts.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Nov 13, 2026<\/span><span class=\"vsk-rem-clock\">10:00<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"2c7e5a9f1b3d08e64a7c2f95\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Tell Ingrid to pack<\/span><span class=\"vsk-rem-notes\">When she&#x27;s home from school. Warm layers, boots, the good wool socks. Leave by 4:30.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Nov 20, 2026<\/span><span class=\"vsk-rem-clock\">07:30<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"4c18b7e3a95d02f6c1b8e7a4\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Visa autopay on the 22nd<\/span><span class=\"vsk-rem-notes\">Nicollet FCU pays the full Visa 0047 statement balance from checking 5512 on the 22nd. Make sure checking covers it.<\/span><span class=\"vsk-rem-badges\"><span class=\"vsk-rem-badge\">repeats every 1 month<\/span><\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Nov 20, 2026<\/span><span class=\"vsk-rem-clock\">08:00<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"6b9d1e4a7f20c35e8b4d1a97\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">File Salt in the Lakes to Hana<\/span><span class=\"vsk-rem-notes\">About 3,000 words, per the Sept. 21 assignment letter. File it in the morning to keep the afternoon clear.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Nov 20, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"e7c1a4f90b6d2358f4c7e1b2\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Send Hana winter and spring bandwidth<\/span><span class=\"vsk-rem-notes\">January through May, plus anything I&#x27;d want to pitch. Told her after the Oct. 6 edit meeting that I&#x27;d come back to her once the salt story was filed.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Nov 23, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"e2a7c5091fd84b36c0a9e715\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Call Dana about the chart<\/span><span class=\"vsk-rem-notes\">Phone her, not Messenger. Talk it through before the story runs.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Nov 23, 2026<\/span><span class=\"vsk-rem-clock\">10:00<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"5d9a3e7c1f4b6082d5a9e3c7\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Invoice North Current: December retainer<\/span><span class=\"vsk-rem-notes\">$1,500.00 to ap@northcurrentmag.com, same as the November one sent Oct. 26.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Nov 24, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"3a8e6d0f5c92b17ad4e3f86c\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Invoice North Current: Salt in the Lakes balance<\/span><span class=\"vsk-rem-notes\">$2,250.00, the second half of the $4,500 fee, due on acceptance per the Sept. 21 assignment letter. To ap@northcurrentmag.com with Hana copied.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Nov 24, 2026<\/span><span class=\"vsk-rem-clock\">10:00<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"d06b2f7e9a4c158e3b6d0a29\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Cranberries for Thanksgiving<\/span><span class=\"vsk-rem-notes\">Fresh cranberries and an orange from the co-op. Real cream for Toby&#x27;s whipped cream.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Nov 24, 2026<\/span><span class=\"vsk-rem-clock\">15:00<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"5f9c3e1a7d0b8264e5f1c9a3\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Airport runs: Maren 2:05, Toby 4:40<\/span><span class=\"vsk-rem-notes\">Maren first, then the cell phone lot with her until Toby lands. Bring a book.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Nov 25, 2026<\/span><span class=\"vsk-rem-clock\">13:15<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"b4e07d2c6a95f13e8d4b2c70\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Fact read on salt first pages<\/span><span class=\"vsk-rem-notes\">Lena sends first pages for the fact read Monday, Nov. 30. Final proofs Thursday, Dec. 3; off to the printer Tuesday, Dec. 8.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Nov 30, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><\/ul><\/section><section class=\"vsk-rem-card\" data-reminder-list=\"December 2026\"><div class=\"vsk-rem-cardhead\"><span class=\"vsk-rem-listdot\" style=\"background:#FFCC00\"><\/span><span class=\"vsk-rem-listname\">December 2026<\/span><span class=\"vsk-rem-listcount\">1<\/span><\/div><ul class=\"vsk-rem-list\"><li class=\"vsk-rem-row\" data-reminder-id=\"81d3f6a9e2c05b74a1d8e3f6\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Send R. the link to the salt story<\/span><span class=\"vsk-rem-notes\">Promised on Messenger. The package goes to the printer today; send the link once it&#x27;s live.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Dec 08, 2026<\/span><span class=\"vsk-rem-clock\">10:00<\/span><\/span><\/li><\/ul><\/section><section class=\"vsk-rem-card\" data-reminder-list=\"January 2027\"><div class=\"vsk-rem-cardhead\"><span class=\"vsk-rem-listdot\" style=\"background:#FF2D55\"><\/span><span class=\"vsk-rem-listname\">January 2027<\/span><span class=\"vsk-rem-listcount\">2<\/span><\/div><ul class=\"vsk-rem-list\"><li class=\"vsk-rem-row\" data-reminder-id=\"2c6f8a1e4d93b07c5e2a6d18\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Book an oil change at Tires Plus<\/span><span class=\"vsk-rem-notes\">The sticker says the next one is due in January. Tires Plus on E Lake St; drop Ingrid at school on the way.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Jan 04, 2027<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"9f3e7b1d5a0c4826e9f3b7d1\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Estimated taxes (federal + MN)<\/span><span class=\"vsk-rem-notes\">Q4 2026 estimates from savings 5530, IRS Direct Pay and MN e-Services. Sept. 15 payments were $3,050.00 federal and $780.00 state. Check the year&#x27;s deposits before deciding whether to raise them.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Jan 15, 2027<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><\/ul><\/section><section class=\"vsk-rem-card\" data-reminder-list=\"February 2027\"><div class=\"vsk-rem-cardhead\"><span class=\"vsk-rem-listdot\" style=\"background:#30B0C7\"><\/span><span class=\"vsk-rem-listname\">February 2027<\/span><span class=\"vsk-rem-listcount\">1<\/span><\/div><ul class=\"vsk-rem-list\"><li class=\"vsk-rem-row\" data-reminder-id=\"6e3f0b9d2a7c48e1a29d5f73\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Gather the 2026 1099-NECs for the tax sheet<\/span><span class=\"vsk-rem-notes\">Field &amp; Flow mails theirs by Jan. 31. Look for the ones from North Current, the Dispatch and Prairie Wire too, then hand them to Ingrid for the tax sheet.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Feb 01, 2027<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><\/ul><\/section><section class=\"vsk-rem-card\" data-reminder-list=\"April 2027\"><div class=\"vsk-rem-cardhead\"><span class=\"vsk-rem-listdot\" style=\"background:#5856D6\"><\/span><span class=\"vsk-rem-listname\">April 2027<\/span><span class=\"vsk-rem-listcount\">1<\/span><\/div><ul class=\"vsk-rem-list\"><li class=\"vsk-rem-row\" data-reminder-id=\"8e57d0a2c6f39b14e5d7a0c2\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">New chain for the bike<\/span><span class=\"vsk-rem-notes\">At the August tune-up Angry Catfish said the chain read about 0.5 on the checker. Fine for this season, new one in the spring.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Apr 03, 2027<\/span><span class=\"vsk-rem-clock\">10:00<\/span><\/span><\/li><\/ul><\/section><section class=\"vsk-rem-card\" data-reminder-list=\"June 2027\"><div class=\"vsk-rem-cardhead\"><span class=\"vsk-rem-listdot\" style=\"background:#34C759\"><\/span><span class=\"vsk-rem-listname\">June 2027<\/span><span class=\"vsk-rem-listcount\">1<\/span><\/div><ul class=\"vsk-rem-list\"><li class=\"vsk-rem-row\" data-reminder-id=\"a3c8d1f6b4e902e75b0c4e19\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Renew SEJ membership<\/span><span class=\"vsk-rem-notes\">Freelance membership runs through June 7, 2027. Last year&#x27;s dues were $60.00 on the Visa.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Jun 01, 2027<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><\/ul><\/section><\/div><section class=\"vsk-rem-completed\" data-reminder-section=\"completed\"><div class=\"vsk-rem-cardhead vsk-rem-donehead\"><span class=\"vsk-rem-listname\">Completed<\/span><span class=\"vsk-rem-listcount\">83<\/span><\/div><div class=\"vsk-rem-inferred\" data-completion-source=\"notification\">Completion is inferred, not stated: this payload carries no completed field, so a reminder counts as completed when it has a notification time and its due date is before Tuesday 01 June 2027, the newest moment in the data.<\/div><ul class=\"vsk-rem-list\"><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"f2c6e9a4d1b7385cf2e6a9d4\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Get back to Hana on edit-meeting times, week of Nov 9<\/span><span class=\"vsk-rem-notes\">In person at the office, about 90 minutes.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Oct 29, 2026<\/span><span class=\"vsk-rem-clock\">16:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"2e0d6b4f91a7c35e8d0b6f4a\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Move the car: street sweeping Tuesday<\/span><span class=\"vsk-rem-notes\">Public Works email has 4127 34th Ave S down for Tuesday, Oct. 27, 7 a.m. to 4:30 p.m. The city&#x27;s text said the 21st, so the car stays off the street again.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Oct 26, 2026<\/span><span class=\"vsk-rem-clock\">20:30<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"d18b4f6e0a73c925b4e86f02\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Call Lakehead Books about the pickup<\/span><span class=\"vsk-rem-notes\">Arne Halvorsen, (218) 555-0190, in from 10 to 5. Set the pickup for Thursday, Nov. 5, at 3 p.m.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Oct 26, 2026<\/span><span class=\"vsk-rem-clock\">10:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"a5c92e07b4d18f63c5a2e9b1\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Invoice North Current: November retainer<\/span><span class=\"vsk-rem-notes\">INV-2026-046, $1,500.00 for the November fact-check column, to ap@northcurrentmag.com. Log it in the 2026 invoice sheet.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Oct 26, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"e0a6c3f8d2b5719e0c4a6d28\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Scan the basement album for Maren<\/span><span class=\"vsk-rem-notes\">2006 on. Second batch goes to her Sunday.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Oct 24, 2026<\/span><span class=\"vsk-rem-clock\">14:30<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"4f0c7e2a9b13d85e6c2f0a71\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Pick up the hold at East Lake Library<\/span><span class=\"vsk-rem-notes\">One item waiting on the hold shelf. The library&#x27;s text says the hold expires Tues., Oct. 27.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Oct 24, 2026<\/span><span class=\"vsk-rem-clock\">11:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"60a3f8d24c9e1b75a0f38d2c\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Text Neil back about a beer at Merlins<\/span><span class=\"vsk-rem-notes\">He&#x27;s in town Thanksgiving week to see his mom. Maren and Toby land Wednesday the 25th, so Monday or Tuesday night works better.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Oct 24, 2026<\/span><span class=\"vsk-rem-clock\">10:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"5c2e7a91f04db836a9e5170c\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Hollis: send interview slot choice<\/span><span class=\"vsk-rem-notes\">New message to Celeste Odum with my name and the slot number in the subject line. Due by Friday, Oct. 23; slots go in the order received.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Oct 22, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"d5b8e2c6f1a9037b84c1e6d0\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Send Lena the Odegaard north inlet table<\/span><span class=\"vsk-rem-notes\">For the small spike chart under the sidebar. It&#x27;s one winter of inlet data, so the caption has to say so, and it gets its own axis starting at zero. Told her the table would follow the monarch draft.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Oct 21, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"d8e15b92a0f63c47d8e1b5a9\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Move the car: street sweeping Wednesday<\/span><span class=\"vsk-rem-notes\">City text says our block of 34th Ave S gets its fall sweeping Wednesday, Oct. 21. Cars left on posted streets get ticketed and towed.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Oct 20, 2026<\/span><span class=\"vsk-rem-clock\">20:30<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"3f74c1a6e2d09b58f3c71a6e\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">October fact-check column to Hana<\/span><span class=\"vsk-rem-notes\">&#x27;Monarchs crashed 90% this year.&#x27; Lena needs final copy by Tuesday, Oct. 20 for layout. Draft to Hana Friday.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Oct 20, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"a6f08d3c52e19b74d0c38e61\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Scan the shoebox photos for Maren<\/span><span class=\"vsk-rem-notes\">Hall closet shoebox, the wedding through 2005. Best-guess dates in the file names. First batch goes to her email.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Oct 17, 2026<\/span><span class=\"vsk-rem-clock\">14:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"b29e05f3c8d74a16b2e95f0c\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Storm windows at Denise&#x27;s: bring the ladder<\/span><span class=\"vsk-rem-notes\">Saturday at 10, about an hour. Swap the storm windows in for winter; her knees are done with ladders.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Oct 17, 2026<\/span><span class=\"vsk-rem-clock\">09:45<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"7d6a28c5e0b1f493d7a62c8e\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Answer Hana&#x27;s two open questions in the tracker<\/span><span class=\"vsk-rem-notes\">She left three on Oct. 13 and the p. 14 one is answered. Still open: what the budget increase pays for, and whether Lena could chart the snowmelt numbers.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Oct 16, 2026<\/span><span class=\"vsk-rem-clock\">10:30<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"71f3d8b46e0c2a95f17d3b8e\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Call Priya at Riverside re COC line 2<\/span><span class=\"vsk-rem-notes\">WO-26-10418. (763) 555-0114.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Oct 16, 2026<\/span><span class=\"vsk-rem-clock\">10:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"e40b7d1f9a3c25e84b0d7f19\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Book Duluth: flights and the Lakewalk Inn<\/span><span class=\"vsk-rem-notes\">Up Wednesday, Nov. 4, home Friday, Nov. 6, for the Marchand interview Thursday morning. Hana approved travel up to $800. Put it on the Visa and keep the receipts for North Current.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Oct 14, 2026<\/span><span class=\"vsk-rem-clock\">19:30<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"9b5e2d7f0c83a46e1f0a8c37\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Call Toby about the anniversary<\/span><span class=\"vsk-rem-notes\">Grand Marais, Nov. 20 to 22. Maren wants him collecting notes from family and friends for the back of her book.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Oct 13, 2026<\/span><span class=\"vsk-rem-clock\">19:30<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"4c91f3e0b7a2d658e1f04c3b\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Go through MLWD v2 line by line<\/span><span class=\"vsk-rem-notes\">v1 vs v2: Table 3 and the p. 3 errata. Both PDFs are in Agency_Reports.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Oct 13, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"1a95e2c0d76f43b81a9e5c2d\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Ask both labs for their QC with the results<\/span><span class=\"vsk-rem-notes\">At drop-off: ask Riverside and Northstar to send their batch QC along with the chloride results.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Oct 12, 2026<\/span><span class=\"vsk-rem-clock\">08:30<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"e04a7c19b3f5d826e04a7c2b\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Ice samples; labs Monday<\/span><span class=\"vsk-rem-notes\">Fresh ice tonight and Sunday night. Monday: Riverside in Coon Rapids first, then Northstar in Bloomington. COC forms are in the cooler lid.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Oct 10, 2026<\/span><span class=\"vsk-rem-clock\">14:40<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"2d9f6b0e48c13a752d9f6b1c\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Cooler and ice for Saturday<\/span><span class=\"vsk-rem-notes\">Big cooler from the basement. Two bags of ice Saturday morning, plus labels and a marker.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Oct 09, 2026<\/span><span class=\"vsk-rem-clock\">17:30<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"c8d43b7e1f02a96d8c4b37e1\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Call Lakehead Books with the deposit<\/span><span class=\"vsk-rem-notes\">$100 by card over the phone holds the Olson through Friday, Nov. 6. Arne won&#x27;t take card numbers by email. In from 10 to 5, (218) 555-0190.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Oct 09, 2026<\/span><span class=\"vsk-rem-clock\">13:45<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"19d6a3f0e8c4b725e0a79c3f\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Brine truck at Longfellow Park, 3:30 to 5<\/span><span class=\"vsk-rem-notes\">Public Works is showing one of its brine trucks, per the Longfellow Neighbors post. Ask how far ahead of a storm they spray and how much rock salt it saves. Go straight there from Riverside.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Oct 07, 2026<\/span><span class=\"vsk-rem-clock\">15:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"5b1f0c48a3e6d927b5f10c4a\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Send Lena the district&#x27;s station map<\/span><span class=\"vsk-rem-notes\">For the quarter-page site map in the salt package. Lake names on the map, site codes in a small key.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Oct 07, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"f7e1b4c9d03a65823b9e0d6a\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Lab quotes and Duluth numbers for the edit meeting<\/span><span class=\"vsk-rem-notes\">Edit meeting at 10. Bring both lab quotes, Riverside $384.00 and Northstar $260.00, and a rough Duluth number: airfare plus two hotel nights.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Oct 06, 2026<\/span><span class=\"vsk-rem-clock\">08:30<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"e3a8d05f7c1b49e26a0d8f53\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Pick up Salt: A World History at Roosevelt Library<\/span><span class=\"vsk-rem-notes\">Kurlansky&#x27;s salt history, on the self-service hold shelf. The library&#x27;s email says to pick it up by Tues., Oct. 6. Bring the library card.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Oct 05, 2026<\/span><span class=\"vsk-rem-clock\">15:30<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"9e28d7f1c4b05a63e9d28f7c\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Look over the 2027 production calendar<\/span><span class=\"vsk-rem-notes\">Hana wants it read before Tuesday&#x27;s edit meeting, Oct. 6 at 10. Lena&#x27;s link is in #salt-story with the November layout schedule.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Oct 05, 2026<\/span><span class=\"vsk-rem-clock\">09:30<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"7b2f94c1e06d3a58f1c4e09b\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Check site access with the district before Saturday<\/span><span class=\"vsk-rem-notes\">Ask Luis Ferreira whether the Penner outlet and the Lake Odegaard north inlet can be reached from public land without a district escort, and whether either station has equipment we should stay clear of.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Oct 05, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"0c6e3a95b72d14f8c0e6a39b\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Library book due Friday<\/span><span class=\"vsk-rem-notes\">The library&#x27;s text says one item is due Friday, Oct. 2. Renew it in the HCL app if I&#x27;m not finished with it.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Oct 01, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"4a2c9e7f1d5b38e6f7c3b051\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Creek cleanup at the falls pavilion<\/span><span class=\"vsk-rem-notes\">Longfellow Neighbors, 9 to noon in Minnehaha Park. Work gloves, boots and water. Ingrid is coming too.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Sep 26, 2026<\/span><span class=\"vsk-rem-clock\">08:15<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"b0f3a8d6e2c715946e0a2c4b\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Invoice North Current: October retainer<\/span><span class=\"vsk-rem-notes\">INV-2026-044, $1,500.00 for the October fact-check column, to ap@northcurrentmag.com. Log it in the 2026 invoice sheet.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Sep 24, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"f1b85d27e9a04c63b1f58d2a\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Send R. the draft site list<\/span><span class=\"vsk-rem-notes\">Promised on Messenger this week. Corliss for its long record, at least one of the new inlet or outlet stations, and a backup in case a site is blocked.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Sep 23, 2026<\/span><span class=\"vsk-rem-clock\">19:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"4a7e1c83f05d92b6e4a71c38\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">September fact-check column to Hana<\/span><span class=\"vsk-rem-notes\">&#x27;Superior is warming faster than any lake on Earth.&#x27; Due Wednesday, Sept. 23. Spell out what each study measured, and keep the brewery out of it.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Sep 23, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"3e91c5a07f2d84b6c1e09a53\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Pick up reading glasses from Ben<\/span><span class=\"vsk-rem-notes\">Left them by the bread basket at Merlins on Thursday. Ben has them. Told Joel I&#x27;d get them this week.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Sep 21, 2026<\/span><span class=\"vsk-rem-clock\">16:30<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"bd2a94e06f1c38d7a5b29e40\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Invoice North Current: Salt in the Lakes advance<\/span><span class=\"vsk-rem-notes\">INV-2026-043, $2,250.00, half of the $4,500 fee per Hana&#x27;s assignment letter. To ap@northcurrentmag.com with Hana copied.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Sep 21, 2026<\/span><span class=\"vsk-rem-clock\">15:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"8d1e5b7c3a9f064271b5ce9a\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">New latch for the side gate<\/span><span class=\"vsk-rem-notes\">The catch let go and the gate banged half the night. A bungee is holding it for now. Told Bev I&#x27;d put a new one on this weekend.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Sep 19, 2026<\/span><span class=\"vsk-rem-clock\">10:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"36a7c0e4d8b2f915c8d0b7e4\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Oil change at Tires Plus, 8 a.m.<\/span><span class=\"vsk-rem-notes\">Leave at 7:25 and drop Ingrid at school on the way. Full synthetic, about 45 minutes.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Sep 18, 2026<\/span><span class=\"vsk-rem-clock\">07:10<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"e2d9f5a1b6c3087ea1f40c68\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Ledger dinner at Merlins, 6:30<\/span><span class=\"vsk-rem-notes\">Joel booked a table in the back under Ostrander. Early night: the car goes in at Tires Plus at 8 tomorrow.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Sep 17, 2026<\/span><span class=\"vsk-rem-clock\">18:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"c4b0a7e2f9d613850d7a3fc9\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Help Bev move her window AC<\/span><span class=\"vsk-rem-notes\">Down to her basement, Tuesday after five. Bring the dolly.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Sep 15, 2026<\/span><span class=\"vsk-rem-clock\">17:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"63e0b5a8d1c7f294e6b03a5c\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Q3 estimated taxes: IRS and Minnesota<\/span><span class=\"vsk-rem-notes\">From savings 5530: $3,050.00 federal through IRS Direct Pay and $780.00 through Minnesota e-Services, same as June.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Sep 15, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"6f1ea3d0c87b52f91e4a0d6b\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Submit Hollis application<\/span><span class=\"vsk-rem-notes\">Portal closes Tues., Sept. 15, at 11:59 p.m. CT. Proposal, three clips, budget.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Sep 14, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"71f8c3e6a0b9d425b96e2d03\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Denise&#x27;s 70th open house<\/span><span class=\"vsk-rem-notes\">Her daughter is hosting, 2 to 5. Both of us are going. She said no gifts.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Sep 13, 2026<\/span><span class=\"vsk-rem-clock\">13:30<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"a9e6d2b0c7f53e185c18f4a7\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Send Sharon the records-request letter<\/span><span class=\"vsk-rem-notes\">The Minnesota data practices template adapted from SEJ&#x27;s sample, for her reporting class at the U. Promised it this weekend. It&#x27;s in the Reference folder.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Sep 13, 2026<\/span><span class=\"vsk-rem-clock\">10:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"a9f17e2d40c63b58f1a9e2d7\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Send Hana the road-salt pitch<\/span><span class=\"vsk-rem-notes\">A few paragraphs in writing, per the Sept. 1 edit meeting. She&#x27;s holding the November feature slot for a couple of weeks. Read the district&#x27;s June report properly first.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Sep 08, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"0d4c7b9e2f61a8e3b05dc7f2\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Ask Marcus about a Hollis reference<\/span><span class=\"vsk-rem-notes\">Two references needed. Deadline Sept. 15.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Sep 02, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"0c7b5e3a9d4f28169a3d07be\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Invoice North Current: September retainer<\/span><span class=\"vsk-rem-notes\">INV-2026-041, $1,500.00 for the September fact-check column, to ap@northcurrentmag.com. Log it in the 2026 invoice sheet.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Aug 25, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"5e9a4c2f8b1d0736c7f2e05a\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Ben&#x27;s Ledger years show opening<\/span><span class=\"vsk-rem-notes\">Northrup King Building, 6 to 8. Told Ben that Ingrid and I would be there.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Aug 21, 2026<\/span><span class=\"vsk-rem-clock\">17:15<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"05d8f6b3c2e9147a0d5b8f6e\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">August fact-check column to Hana<\/span><span class=\"vsk-rem-notes\">&#x27;Downtown nights are 15\u00b0F hotter.&#x27; Copy by Wednesday, Aug. 19. Lena is holding a half page for the heat map.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Aug 19, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"e7c42a19b6d03f85e7a1d4c2\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Eye exam at Riverview, 3 p.m.<\/span><span class=\"vsk-rem-notes\">Walk over, not the bike: they dilate at a first exam. Bring the +1.25 readers so the doctor can compare. Self-pay exam is $95.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Aug 18, 2026<\/span><span class=\"vsk-rem-clock\">14:15<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"b7d3e05a8f2c61942f6c8b31\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Pick up Maren at MSP<\/span><span class=\"vsk-rem-notes\">Her flight lands at 6:10. Wait at arrivals; she&#x27;ll text when she has her bag.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Aug 14, 2026<\/span><span class=\"vsk-rem-clock\">17:15<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"8b03e7c5f1a92d64b8e0c7a5\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">National Night Out: grill, table and extension cord<\/span><span class=\"vsk-rem-notes\">Street closes at 5 on 34th Ave S. Bring the grill, the folding table and the long extension cord for the speaker.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Aug 04, 2026<\/span><span class=\"vsk-rem-clock\">16:30<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"28c1f6a9e3d70b5c4f2a8e16\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Invoice the Dispatch: Who pays for beach closures<\/span><span class=\"vsk-rem-notes\">INV-2026-040, $2,600.00, on acceptance like the ice-out piece. Marcus&#x27;s edits are in. To finance@greatlakesdispatch.org.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Aug 04, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"2f9d63b1a07e4c58d2f96b13\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Pick up two holds at Nokomis Library<\/span><span class=\"vsk-rem-notes\">Two items on the hold shelf. The library&#x27;s text says the holds expire Tuesday, Aug. 4.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Aug 03, 2026<\/span><span class=\"vsk-rem-clock\">16:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"c1a68e40d5f27b93a6e15d08\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">File Who pays for beach closures for the Dispatch<\/span><span class=\"vsk-rem-notes\">About 1,500 words to Marcus by Friday, July 31, moved from July 24 so it wouldn&#x27;t land on the Field &amp; Flow final. Page references for the money figures go in the margin comments.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Jul 31, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"f04e9c7b2d5a8136e8a17d52\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Invoice North Current: August retainer<\/span><span class=\"vsk-rem-notes\">INV-2026-038, $1,500.00 for the August fact-check column, to ap@northcurrentmag.com. Log it in the 2026 invoice sheet.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Jul 27, 2026<\/span><span class=\"vsk-rem-clock\">09:30<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"6b8f2d4e1a7c095bc0e4973a\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Send INV-2026-037 to Field &amp; Flow<\/span><span class=\"vsk-rem-notes\">Canoe Country&#x27;s Quiet Lakes, $6,500.00, dated July 24. Told the features desk it would go to accounts payable Monday. To ap@fieldandflowmag.com.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Jul 27, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"74f2a0c6e3b958d1f47a2c0e\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Haugens&#x27; mail and tomatoes<\/span><span class=\"vsk-rem-notes\">Tom and Kari are up north Friday to Sunday. Grab their mail and water the tomatoes. Key is under the frog.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Jul 24, 2026<\/span><span class=\"vsk-rem-clock\">17:30<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"d07b3e8a52c1f946b0d27e5a\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Final of Canoe Country&#x27;s Quiet Lakes to Field &amp; Flow<\/span><span class=\"vsk-rem-notes\">Clean final in the shared Google Doc with the second-round comments resolved, plus the source list for the fact-checker.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Jul 24, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"d3c5a0e7b9f146827e21c4fd\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Lunch with Joel at Longfellow Grill<\/span><span class=\"vsk-rem-notes\">Noon Thursday. Joel asked about lunch this week and I suggested the Grill.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Jul 23, 2026<\/span><span class=\"vsk-rem-clock\">11:45<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"1e5c9b02f8d64a37c1e09b5d\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">July fact-check column to Hana<\/span><span class=\"vsk-rem-notes\">&#x27;Minnesota lost half its wetlands since 2000.&#x27; Due Wednesday, July 22. Put the historic loss up top so it doesn&#x27;t read like the wetlands are fine.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Jul 22, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"1a6e3d8f5c02b947b38f0d25\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Lisa&#x27;s shoulder talk at club night<\/span><span class=\"vsk-rem-notes\">Minnesota Paddlers club night, Nokomis Community Center at 7. Told her I&#x27;d be there.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Jul 21, 2026<\/span><span class=\"vsk-rem-clock\">18:30<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"9f2b6e0d4a8c1375e4c61a08\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Electrician: Nate Okafor at 8<\/span><span class=\"vsk-rem-notes\">He&#x27;s looking at the office circuit, which trips every time the window AC kicks on. Figures about an hour.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Jul 16, 2026<\/span><span class=\"vsk-rem-clock\">07:45<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"9a4e17c3d82f05b6e9d41a7c\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Vehicle permit at Tettegouche<\/span><span class=\"vsk-rem-notes\">The DNR confirmation for reservation 1-28817406 says a vehicle permit isn&#x27;t included. Buy the annual one at the park office when we check in, $35.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Jul 10, 2026<\/span><span class=\"vsk-rem-clock\">08:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"f60d2a8c4b19e37d0a6c52e8\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Return or renew the two Great Lakes books<\/span><span class=\"vsk-rem-notes\">The Great Lakes Water Wars and The Living Great Lakes are due Thursday, July 9. Renew in the HCL app unless someone has a hold. We leave for Tettegouche Friday.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Jul 09, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"4d7c1e9a03b6f58270fa86e3\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Call Toby for his birthday<\/span><span class=\"vsk-rem-notes\">7:30 our time, once he&#x27;s home. He&#x27;s off at 6 Bozeman time. Ingrid has it on the fridge.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Jul 08, 2026<\/span><span class=\"vsk-rem-clock\">19:30<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"b7d42e9a10c6f3858e2a71d4\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Tag Q2 business charges for Ingrid<\/span><span class=\"vsk-rem-notes\">Go through the Visa for April to June and tag the business charges. She wants totals by category for the tax sheet, not every receipt.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Jul 07, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"3c81e5f7a06b92d4e1f85c3a\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">SEP-IRA contribution before the end of June<\/span><span class=\"vsk-rem-notes\">$3,000.00 into the Fidelity SEP-IRA ending 4419, tax year 2026.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Jun 30, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"e8a27f5b0c94d316b5d0193c\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Renew the car tabs<\/span><span class=\"vsk-rem-notes\">Driver and Vehicle Services renewal, $186.25 online. The current sticker runs out at the end of June.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Jun 28, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"b4e6a29d0f73c18e5a62d9f0\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Order Toby&#x27;s dry bag from REI<\/span><span class=\"vsk-rem-notes\">SealLine roll-top, 20 liters, orange. Ship it straight to Bozeman as a gift so it gets there before the 8th.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Jun 27, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"a15d8c3f7e2b0964f19b2e70\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Invoice North Current: July retainer<\/span><span class=\"vsk-rem-notes\">INV-2026-035, $1,500.00 for the July fact-check column, to ap@northcurrentmag.com. Log it in the 2026 invoice sheet.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Jun 25, 2026<\/span><span class=\"vsk-rem-clock\">10:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"57b0c3a9e1d48f26c05a9e7b\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Adapt SEJ&#x27;s state records letter for Minnesota<\/span><span class=\"vsk-rem-notes\">SEJ&#x27;s sample letters came after the webinar. Hana wants a Minnesota version in the freelancer folder so other writers aren&#x27;t starting from scratch.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Jun 25, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"e2d8b16f4a07c95e1b3d8a04\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Pick up The Great Lakes Water Wars at Roosevelt Library<\/span><span class=\"vsk-rem-notes\">Peter Annin&#x27;s book is on the self-service hold shelf. The library&#x27;s email says to pick it up by Tuesday, June 23. Bring the library card.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Jun 22, 2026<\/span><span class=\"vsk-rem-clock\">16:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"0f7a4c2e96d153b8a40e7d62\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">June fact-check column to Hana<\/span><span class=\"vsk-rem-notes\">&#x27;Ice-out came a month early on every Minnesota lake.&#x27; Copy by Wednesday, June 17. Cite the DNR ice-out page and the pull date.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Jun 17, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"c93b05e7a2f164d8e3c70b19\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Q2 estimated taxes: IRS and Minnesota<\/span><span class=\"vsk-rem-notes\">From savings 5530: $3,050.00 federal through IRS Direct Pay and $780.00 through Minnesota e-Services. Log both in the 2026 tax reserve sheet.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Jun 15, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"6d2f81b4e09a73c5b8e14f6a\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Pick up the kayak at Northwoods Paddle Repair<\/span><span class=\"vsk-rem-notes\">Ticket 2241: new stainless skeg cable, sleeve and set screw, $68.50 with tax. Told them around 4 p.m. I want it back for Saturday&#x27;s paddle.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Jun 12, 2026<\/span><span class=\"vsk-rem-clock\">15:30<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"7e04b9a1c58d23f6b0e9c7d2\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Invoice the Dispatch: Ice-out on the Big Lake<\/span><span class=\"vsk-rem-notes\">INV-2026-034, $3,400.00. Marcus said invoice on acceptance, and his edits are done. To finance@greatlakesdispatch.org.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Jun 09, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"a0e57d3c19b84f62d7a3c05e\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Pick up the hold at Nokomis Library<\/span><span class=\"vsk-rem-notes\">One item on the hold shelf. The library&#x27;s text says the hold expires Wednesday, June 3.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Jun 02, 2026<\/span><span class=\"vsk-rem-clock\">16:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"41c6f92b08e7d3a5f61b9e20\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Stain the back steps<\/span><span class=\"vsk-rem-notes\">Leif replaced two treads and a stringer on May 12 and said to give the new wood a couple of weeks to dry before staining.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">May 30, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"d5a1e870f3b26c49a8d07e13\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">File Ice-out on the Big Lake for the Dispatch<\/span><span class=\"vsk-rem-notes\">About 1,800 words to Marcus by Friday, May 29, in a Google Doc shared to his Dispatch address. Keep the GLERL ice-chart dates in the margin comments for the copy desk.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">May 29, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"c62f0a8d3e5b17947a2d6e0f\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Invoice North Current: June retainer<\/span><span class=\"vsk-rem-notes\">INV-2026-032, $1,500.00 for the June fact-check column, to ap@northcurrentmag.com. Log it in the 2026 invoice sheet.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">May 26, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"2b97e4d0c6a15f38e02d9c41\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">May fact-check column to Hana<\/span><span class=\"vsk-rem-notes\">&#x27;Mississippi is America&#x27;s dirtiest river.&#x27; Copy to Hana by Wednesday, May 20, with the sources listed at the bottom.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">May 20, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"8f3c0a61d94e27b5c1e06a7d\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Move the car: spring street sweeping<\/span><span class=\"vsk-rem-notes\">City text says our block of 34th Ave S, E 41st St to E 42nd St, gets swept Wednesday, May 6. Cars left on posted streets get ticketed and towed.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">May 05, 2026<\/span><span class=\"vsk-rem-clock\">20:30<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"3b9e71c4a0d258f6e1c7b04a\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Invoice North Current: May retainer<\/span><span class=\"vsk-rem-notes\">INV-2026-029, $1,500.00 for the May fact-check column, to ap@northcurrentmag.com. Log it in the 2026 invoice sheet.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Apr 29, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><\/ul><\/section><\/div><\/div><\/div>";
SKIN_HTML["slack"] = "<style>\n.vsk-slack {display:block; font-family:Lato,'Helvetica Neue',Helvetica,Arial,sans-serif; color:#1D1C1D; font-size:15px; line-height:1.46;}\n.vsk-slack .vsk-slack-shell {display:flex; align-items:stretch; border:1px solid #DDDDDD; border-radius:8px; overflow:hidden; background:#FFFFFF; min-height:520px;}\n.vsk-slack .vsk-slack-rail {flex:0 0 240px; width:240px; background:#3F0E40; color:#BCABBC; display:flex; flex-direction:column; max-height:76vh;}\n.vsk-slack .vsk-slack-ws {background:#4A154B; padding:12px 14px; border-bottom:1px solid rgba(255,255,255,0.12);}\n.vsk-slack .vsk-slack-wsname {color:#FFFFFF; font-weight:900; font-size:15px;}\n.vsk-slack .vsk-slack-wsmeta {color:#CFC3CF; font-size:11px; margin-top:2px;}\n.vsk-slack .vsk-slack-rail-scroll {overflow:auto; padding:8px 0 16px;}\n.vsk-slack .vsk-slack-railsec {color:#BCABBC; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.04em; padding:12px 16px 4px;}\n.vsk-slack .vsk-slack-channels, .vsk-slack .vsk-slack-members {list-style:none; margin:0; padding:0;}\n.vsk-slack .vsk-slack-chan-item > a {display:flex; align-items:center; gap:6px; padding:4px 16px; color:#CFC3CF; text-decoration:none; font-size:14px;}\n.vsk-slack .vsk-slack-chan-item > a:hover {background:#350D36; color:#FFFFFF;}\n.vsk-slack .vsk-slack-hash {opacity:.7; font-weight:700;}\n.vsk-slack .vsk-slack-chan-name {flex:1 1 auto; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;}\n.vsk-slack .vsk-slack-chan-count {font-size:11px; color:#9E8CA0; background:rgba(0,0,0,.18); border-radius:9px; padding:0 6px;}\n.vsk-slack .vsk-slack-chan-archived > a {opacity:.55; font-style:italic;}\n.vsk-slack .vsk-slack-member {display:flex; align-items:center; gap:8px; padding:3px 16px; font-size:13px; color:#CFC3CF;}\n.vsk-slack .vsk-slack-dot {width:10px; height:10px; border-radius:50%; flex:0 0 10px;}\n.vsk-slack .vsk-slack-member-name {flex:1 1 auto; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;}\n.vsk-slack .vsk-slack-member-count {font-size:11px; color:#9E8CA0;}\n.vsk-slack .vsk-slack-main {flex:1 1 auto; background:#FFFFFF; overflow:auto; max-height:76vh; min-width:0;}\n.vsk-slack .vsk-slack-channel {border-bottom:8px solid #F8F8F8;}\n.vsk-slack .vsk-slack-chan-head {position:sticky; top:0; z-index:2; background:#FFFFFF; border-bottom:1px solid #E8E8E8; padding:12px 20px 10px;}\n.vsk-slack .vsk-slack-channel:target .vsk-slack-chan-head {box-shadow:inset 3px 0 0 #4A154B; background:#FBF7FB;}\n.vsk-slack .vsk-slack-chan-title {font-size:17px; font-weight:900; color:#1D1C1D; display:flex; align-items:center; gap:4px;}\n.vsk-slack .vsk-slack-chan-meta {font-size:12px; color:#616061; margin-top:2px;}\n.vsk-slack .vsk-slack-topic {font-size:13px; color:#1D1C1D; margin-top:6px;}\n.vsk-slack .vsk-slack-purpose {font-size:12px; color:#616061; margin-top:2px;}\n.vsk-slack .vsk-slack-msgs {padding:8px 0 14px;}\n.vsk-slack .vsk-slack-msg {display:flex; gap:10px; padding:6px 20px; align-items:flex-start;}\n.vsk-slack .vsk-slack-msg:hover {background:#F8F8F8;}\n.vsk-slack .vsk-slack-avatar {flex:0 0 36px; width:36px; height:36px; border-radius:6px; color:#FFFFFF; font-weight:800; font-size:13px; display:flex; align-items:center; justify-content:center;}\n.vsk-slack .vsk-slack-body {flex:1 1 auto; min-width:0;}\n.vsk-slack .vsk-slack-head {display:flex; align-items:baseline; gap:8px; flex-wrap:wrap;}\n.vsk-slack .vsk-slack-name {font-weight:900; color:#1D1C1D; font-size:15px;}\n.vsk-slack .vsk-slack-ts {font-size:11px; color:#616061;}\n.vsk-slack .vsk-slack-tag {font-size:10px; text-transform:uppercase; letter-spacing:.03em; color:#616061; border:1px solid #E8E8E8; border-radius:3px; padding:0 4px;}\n.vsk-slack .vsk-slack-text {white-space:normal; word-wrap:break-word; margin:2px 0;}\n.vsk-slack .vsk-slack-text-empty {color:#868686; font-style:italic;}\n.vsk-slack .vsk-slack-mention {color:#1264A3; background:#E8F5FA; border-radius:3px; padding:0 2px;}\n.vsk-slack .vsk-slack-link {color:#1264A3; text-decoration:underline;}\n.vsk-slack .vsk-slack-reactions {display:flex; flex-wrap:wrap; gap:6px; margin-top:4px;}\n.vsk-slack .vsk-slack-reaction {font-size:12px; border:1px solid #DDDDDD; border-radius:12px; padding:1px 8px; color:#1D1C1D; background:#F8F8F8; display:inline-flex; align-items:center; cursor:default;}\n.vsk-slack .vsk-slack-reaction > b {margin-left:5px; color:#1264A3;}\n.vsk-slack .vsk-slack-emoji {font-family:'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif; font-size:1.2em; line-height:1; font-style:normal;}\n.vsk-slack .vsk-slack-reaction .vsk-slack-emoji {font-size:15px;}\n.vsk-slack .vsk-slack-files {margin-top:6px; display:flex; flex-direction:column; gap:4px;}\n.vsk-slack .vsk-slack-file {display:flex; gap:8px; align-items:center; font-size:13px; border:1px solid #E8E8E8; border-radius:6px; padding:6px 10px; max-width:520px;}\n.vsk-slack .vsk-slack-file-meta {color:#616061; font-size:11px;}\n.vsk-slack .vsk-slack-thread {margin:2px 0 10px 66px; border-left:2px solid #E3E3E3; padding-left:12px;}\n.vsk-slack .vsk-slack-thread-head {font-size:12px; color:#1264A3; font-weight:700; padding:4px 0 2px;}\n.vsk-slack .vsk-slack-thread-orphan .vsk-slack-thread-head {color:#8A5A00;}\n.vsk-slack .vsk-slack-reply {padding:4px 8px;}\n.vsk-slack .vsk-slack-quiet {padding:14px 20px; color:#868686; font-style:italic; font-size:13px;}\n.vsk-slack .vsk-slack-empty {padding:24px; color:#616061; background:#FFFFFF; border:1px dashed #DDDDDD; border-radius:8px;}\n<\/style>\n<div class=\"vsk vsk-slack\" data-skin=\"slack\" data-skin-product=\"Slack\"><div class=\"vsk-slack-shell\"><nav class=\"vsk-slack-rail\"><div class=\"vsk-slack-ws\"><div class=\"vsk-slack-wsname\">Slack workspace<\/div><div class=\"vsk-slack-wsmeta\">4 channels &#183; 3 members<\/div><\/div><div class=\"vsk-slack-rail-scroll\"><div class=\"vsk-slack-railsec\">Channels<\/div><ul class=\"vsk-slack-channels\"><li class=\"vsk-slack-chan-item\"><a href=\"#vsk-slack-ch-C_FACTCHECK\"><span class=\"vsk-slack-hash\">#<\/span><span class=\"vsk-slack-chan-name\">factcheck<\/span><span class=\"vsk-slack-chan-count\">53<\/span><\/a><\/li><li class=\"vsk-slack-chan-item\"><a href=\"#vsk-slack-ch-C_SALT_STORY\"><span class=\"vsk-slack-hash\">#<\/span><span class=\"vsk-slack-chan-name\">salt-story<\/span><span class=\"vsk-slack-chan-count\">55<\/span><\/a><\/li><\/ul><div class=\"vsk-slack-railsec\">Direct messages<\/div><ul class=\"vsk-slack-channels\"><li class=\"vsk-slack-chan-item\"><a href=\"#vsk-slack-ch-D_OBRANDT_HSATO\"><span class=\"vsk-slack-hash\">&#128274;<\/span><span class=\"vsk-slack-chan-name\">owen-brandt-hana-sato<\/span><span class=\"vsk-slack-chan-count\">57<\/span><\/a><\/li><li class=\"vsk-slack-chan-item\"><a href=\"#vsk-slack-ch-D_OBRANDT_LFISCHER\"><span class=\"vsk-slack-hash\">&#128274;<\/span><span class=\"vsk-slack-chan-name\">owen-brandt-lena-fischer<\/span><span class=\"vsk-slack-chan-count\">17<\/span><\/a><\/li><\/ul><div class=\"vsk-slack-railsec\">Members<\/div><ul class=\"vsk-slack-members\"><li class=\"vsk-slack-member\" data-uid=\"U_OBRANDT\"><span class=\"vsk-slack-dot\" data-user-color=\"#0369A1\" style=\"background:#0369A1\"><\/span><span class=\"vsk-slack-member-name\">Owen Brandt<\/span><span class=\"vsk-slack-member-count\">86<\/span><\/li><li class=\"vsk-slack-member\" data-uid=\"U_HSATO\"><span class=\"vsk-slack-dot\" data-user-color=\"#5B4CE0\" style=\"background:#5B4CE0\"><\/span><span class=\"vsk-slack-member-name\">Hana Sato<\/span><span class=\"vsk-slack-member-count\">72<\/span><\/li><li class=\"vsk-slack-member\" data-uid=\"U_LFISCHER\"><span class=\"vsk-slack-dot\" data-user-color=\"#065F46\" style=\"background:#065F46\"><\/span><span class=\"vsk-slack-member-name\">Lena Fischer<\/span><span class=\"vsk-slack-member-count\">24<\/span><\/li><\/ul><\/div><\/nav><main class=\"vsk-slack-main\"><section class=\"vsk-slack-channel\" id=\"vsk-slack-ch-C_FACTCHECK\" data-channel-id=\"C_FACTCHECK\"><header class=\"vsk-slack-chan-head\"><div class=\"vsk-slack-chan-title\"><span class=\"vsk-slack-hash\">#<\/span>factcheck<\/div><div class=\"vsk-slack-chan-meta\">3 members &#183; created Jan 13, 2026 &#183; 53 messages<\/div><div class=\"vsk-slack-topic\">Monthly fact-check column: claim picks, ratings, filing dates<\/div><div class=\"vsk-slack-purpose\">Picking and working the claim for each month&#x27;s fact-check column.<\/div><\/header><div class=\"vsk-slack-msgs\"><div class=\"vsk-slack-msg\" data-slack-ts=\"1778000832.150715\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">May 05, 2026 12:07<\/span><\/div><div class=\"vsk-slack-text\">From this morning&#x27;s edit meeting: May&#x27;s column will be one of the two river claims. I&#x27;ll post the pick here once I see which one is still spreading. Copy is due the 20th either way.<\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1778000832.150715\"><div class=\"vsk-slack-thread-head\">1 reply<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1778001567.556582\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">May 05, 2026 12:19<\/span><\/div><div class=\"vsk-slack-text\">works - I&#x27;ll open a file on both so I&#x27;m not starting cold.<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1778598989.568639\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">May 12, 2026 10:16<\/span><\/div><div class=\"vsk-slack-text\">May pick: the &quot;Mississippi is America&#x27;s dirtiest river&quot; graphic is making the rounds again, and a city council candidate shared it this week. Want it for the column? Copy to me by the 20th.<\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1778598989.568639\"><div class=\"vsk-slack-thread-head\">7 replies<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1778599345.971358\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">May 12, 2026 10:22<\/span><\/div><div class=\"vsk-slack-text\">yes, I&#x27;ll take it - reads like a toxic-release ranking with the context sanded off. will trace where it started before I call anyone.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":+1:\" data-emoji=\"+1\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1778599498.996700\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">May 12, 2026 10:24<\/span><\/div><div class=\"vsk-slack-text\">Perfect. Rating is your call, as always.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1778701216.879154\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">May 13, 2026 14:40<\/span><\/div><div class=\"vsk-slack-text\">traced it - a 2014 advocacy ranking built on EPA&#x27;s Toxics Release Inventory, sorted by total pounds discharged under permit. biggest river, most outfalls, top of the list.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1778702598.616068\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">May 13, 2026 15:03<\/span><\/div><div class=\"vsk-slack-text\">So it&#x27;s ranking size more than dirt. Leaning Misleading?<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1778703021.488621\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">May 13, 2026 15:10<\/span><\/div><div class=\"vsk-slack-text\">misleading. pounds discharged isn&#x27;t concentration - the state&#x27;s own assessments have the metro reach meeting most standards most of the time. the real trouble is sediment and nutrients. that&#x27;s the story under the meme.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1779307574.497050\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">May 20, 2026 15:06<\/span><\/div><div class=\"vsk-slack-text\">it&#x27;s in the CMS - rated misleading, sources listed at the bottom. sending you a short note by email too.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1779309117.274738\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">May 20, 2026 15:31<\/span><\/div><div class=\"vsk-slack-text\">Got it. Reading tonight, notes tomorrow.<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1781018415.945645\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Jun 09, 2026 10:20<\/span><\/div><div class=\"vsk-slack-text\">Your June pick: &#x27;Ice-out came a month early on every Minnesota lake.&#x27; The April thread it came from is past 9K shares. Can you get me a draft by Wed the 17th?<\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1781018415.945645\"><div class=\"vsk-slack-thread-head\">6 replies<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1781019227.146315\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Jun 09, 2026 10:33<\/span><\/div><div class=\"vsk-slack-text\">will do - by the 17th. &#x27;every&#x27; is doing a lot of work in that sentence. the DNR keeps ice-out dates and medians for hundreds of lakes, so this one&#x27;s checkable.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1781203972.648546\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Jun 11, 2026 13:52<\/span><\/div><div class=\"vsk-slack-text\">early read: metro lakes went out roughly two to three weeks ahead of their medians. up north, plenty were within a few days of normal. a month early holds for a handful of lakes, not every lake.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1781204767.324074\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Jun 11, 2026 14:06<\/span><\/div><div class=\"vsk-slack-text\">Partly true, then? Or does &#x27;every&#x27; tip it into Misleading?<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1781205174.134089\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Jun 11, 2026 14:12<\/span><\/div><div class=\"vsk-slack-text\">partly true. the warm spring was real and so were the early dates - it&#x27;s &#x27;every&#x27; and &#x27;a month&#x27; that don&#x27;t hold. I&#x27;ll spell out which kinds of lakes came close.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1781729075.634699\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Jun 17, 2026 15:44<\/span><\/div><div class=\"vsk-slack-text\">draft is up - partly true, with ice-out dates against the medians broken out by region.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":eyes:\" data-emoji=\"eyes\"><span class=\"vsk-slack-emoji\">&#x1F440;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1781730152.447876\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Jun 17, 2026 16:02<\/span><\/div><div class=\"vsk-slack-text\">Just read it. The regional breakdown is what makes it work. Running it as is.<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1782334294.220452\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Jun 24, 2026 15:51<\/span><\/div><div class=\"vsk-slack-text\">sat in on SEJ&#x27;s records-request webinar at noon. emailed you the three points that matter for the column, Hana. short version - when a viral claim cites an agency, ask for the data file behind it, not the press release.<\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1782334294.220452\"><div class=\"vsk-slack-thread-head\">2 replies<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1782338905.056129\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Jun 24, 2026 17:08<\/span><\/div><div class=\"vsk-slack-text\">Good notes - thanks. I replied to your fee question by email.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1782403589.224660\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Jun 25, 2026 11:06<\/span><\/div><div class=\"vsk-slack-text\">For everyone: Owen adapted SEJ&#x27;s sample records-request letter for the Minnesota Government Data Practices Act. It&#x27;s in the freelancer folder now, credited to SEJ. Start from it for any column that needs agency data.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":+1:\" data-emoji=\"+1\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1784041849.221906\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Jul 14, 2026 10:10<\/span><\/div><div class=\"vsk-slack-text\">July&#x27;s claim if you want it: &quot;Minnesota has lost half its wetlands since 2000.&quot; A few conservation groups we like have been sharing it, so expect some heat if it doesn&#x27;t hold up. Due Wed, July 22.<\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1784041849.221906\"><div class=\"vsk-slack-thread-head\">6 replies<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1784042304.401758\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Jul 14, 2026 10:18<\/span><\/div><div class=\"vsk-slack-text\">on it. hunch is someone grafted the historic loss figure onto a recent date. starting with the DNR&#x27;s wetland status and trends reports.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1784219304.954365\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Jul 16, 2026 11:28<\/span><\/div><div class=\"vsk-slack-text\">hunch holds. paid $19.90 for a month of newspapers.com - the &quot;half&quot; figure has been in print since the 1980s, and it&#x27;s the loss since settlement, mostly to farm drainage. DNR status and trends data since 2006 show net change of a fraction of a percent per three-year cycle. false as written.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":eyes:\" data-emoji=\"eyes\"><span class=\"vsk-slack-emoji\">&#x1F440;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1784220065.505298\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Jul 16, 2026 11:41<\/span><\/div><div class=\"vsk-slack-text\">That&#x27;ll sting for the groups sharing it. Can you lead with the real loss so it doesn&#x27;t read like we&#x27;re saying wetlands are fine?<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1784220598.976944\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Jul 16, 2026 11:49<\/span><\/div><div class=\"vsk-slack-text\">yes - that was the plan. the real number is bad enough on its own. the column is about the date, not the damage.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1784755887.899836\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Jul 22, 2026 16:31<\/span><\/div><div class=\"vsk-slack-text\">filed. rated false, with the historic loss up top as you asked. sources are in the email I just sent.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1784757345.232912\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Jul 22, 2026 16:55<\/span><\/div><div class=\"vsk-slack-text\">Got it, thanks. I&#x27;ll read it first thing tomorrow.<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1785863010.973646\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Aug 04, 2026 12:03<\/span><\/div><div class=\"vsk-slack-text\">From this morning&#x27;s edit meeting: August is a heat claim. I&#x27;ll post the pick here next week. Copy due Wed the 19th. Lena, plan on a map with this one.<\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1785863010.973646\"><div class=\"vsk-slack-thread-head\">2 replies<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1785863796.428360\" data-slack-user=\"U_LFISCHER\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#065F46\" data-uid=\"U_LFISCHER\" style=\"background:#065F46\" title=\"U_LFISCHER\">LF<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Lena Fischer<\/span><span class=\"vsk-slack-ts\">Aug 04, 2026 12:16<\/span><\/div><div class=\"vsk-slack-text\">ooh, a map \u2728 holding a half page for it. send the data whenever the claim&#x27;s set \ud83d\uddfa\ufe0f<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1785864326.332615\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Aug 04, 2026 12:25<\/span><\/div><div class=\"vsk-slack-text\">will do - as soon as the claim&#x27;s picked.<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1786462237.837667\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Aug 11, 2026 10:30<\/span><\/div><div class=\"vsk-slack-text\">Here&#x27;s the August pick, from a heat-wave explainer that&#x27;s been all over my feed this week: &quot;Downtown nights are 15\u00b0F hotter than the suburbs.&quot; Feels half right. Copy by the 19th still work?<\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1786462237.837667\"><div class=\"vsk-slack-thread-head\">5 replies<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1786462676.844836\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Aug 11, 2026 10:37<\/span><\/div><div class=\"vsk-slack-text\">half right is my guess too. the heat island is real - the question is 15 compared to what, and on which nights. the 19th is fine.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1786648557.406401\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Aug 13, 2026 14:15<\/span><\/div><div class=\"vsk-slack-text\">the university&#x27;s sensor network has downtown running 13 to 15 degrees warmer than farm fields on the hottest, calmest nights. a typical summer night is more like 5 to 7 - and less than that against the inner-ring suburbs.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1786649510.513026\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Aug 13, 2026 14:31<\/span><\/div><div class=\"vsk-slack-text\">So 15 is the worst night against open country, not a typical night against the suburbs. Partly true works for me.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1787172771.622371\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Aug 19, 2026 15:52<\/span><\/div><div class=\"vsk-slack-text\">column&#x27;s in - partly true. I kept the worst-night number in because those are the nights that put people in the hospital.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":+1:\" data-emoji=\"+1\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1787173669.400003\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Aug 19, 2026 16:07<\/span><\/div><div class=\"vsk-slack-text\">Good call keeping that. Copy desk has it Friday.<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1789484760.486596\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Sep 15, 2026 10:06<\/span><\/div><div class=\"vsk-slack-text\">September candidate: &quot;Superior is warming faster than any lake on Earth.&quot; It&#x27;s on a brewery&#x27;s coasters now, which is how you know it&#x27;s everywhere. I&#x27;d need it by Wed the 23rd.<\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1789484760.486596\"><div class=\"vsk-slack-thread-head\">6 replies<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1789485266.276645\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Sep 15, 2026 10:14<\/span><\/div><div class=\"vsk-slack-text\">ha. sure - there&#x27;s real research under this one, so my guess is it lands at needs context, not false. starting with the papers. the 23rd works.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1789670207.129992\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Sep 17, 2026 13:36<\/span><\/div><div class=\"vsk-slack-text\">early read: it traces to a 2007 paper finding Superior&#x27;s summer surface water was warming faster than the air over the region. global surveys since then put Superior among the fast warmers - not alone at the top. and summer surface water isn&#x27;t the whole lake.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1789671038.319779\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Sep 17, 2026 13:50<\/span><\/div><div class=\"vsk-slack-text\">Needs context it is. Let&#x27;s leave the brewery out, though. They didn&#x27;t start it, they just printed it.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1789671795.900852\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Sep 17, 2026 14:03<\/span><\/div><div class=\"vsk-slack-text\">agreed - the coasters are just how it got to your desk. the column&#x27;s about the claim, not who repeats it.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1790195389.448360\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Sep 23, 2026 15:29<\/span><\/div><div class=\"vsk-slack-text\">September&#x27;s filed - rated needs context, with what each study actually measured spelled out in plain terms.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1790196272.310935\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Sep 23, 2026 15:44<\/span><\/div><div class=\"vsk-slack-text\">Thanks, Owen. Into the copy queue it goes.<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1791310250.798126\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Oct 06, 2026 13:10<\/span><\/div><div class=\"vsk-slack-text\">Still no claim for the November column. If you see one making the rounds, drop the link here.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":eyes:\" data-emoji=\"eyes\"><span class=\"vsk-slack-emoji\">&#x1F440;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1791905141.194139\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Oct 13, 2026 10:25<\/span><\/div><div class=\"vsk-slack-text\">October claim: &quot;Monarchs crashed 90% this year.&quot; It&#x27;s making the rounds, and the comments are full of &quot;didn&#x27;t see a single one in my yard.&quot; Can you file it by the 20th?<\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1791905141.194139\"><div class=\"vsk-slack-thread-head\">5 replies<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1791905540.569894\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Oct 13, 2026 10:32<\/span><\/div><div class=\"vsk-slack-text\">yes - the 20th works. my hunch is the 90 is the long-term decline at the winter colonies in Mexico, not a one-year drop. and an empty yard isn&#x27;t a count.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1792008796.516768\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Oct 14, 2026 15:13<\/span><\/div><div class=\"vsk-slack-text\">confirmed. the 90% is roughly the long-term drop in forest area the colonies occupy in Mexico, measured from the mid-1990s peak. this winter&#x27;s count doesn&#x27;t exist yet - it comes out early next year. so &quot;this year&quot; is the misleading part.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1792009842.562138\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Oct 14, 2026 15:30<\/span><\/div><div class=\"vsk-slack-text\">Misleading, then. Lena wants to try a small chart of the winter counts alongside it.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1792532336.470598\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Oct 20, 2026 16:38<\/span><\/div><div class=\"vsk-slack-text\">monarchs are in the CMS, rated misleading. the winter-count series for Lena&#x27;s chart is in the source list - hectares by season. y-axis starts at zero, please.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1792591997.411244\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Oct 21, 2026 09:13<\/span><\/div><div class=\"vsk-slack-text\">Thanks - I&#x27;ll read it this morning and pass the series to Lena.<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1792163126.441666\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Oct 16, 2026 10:05<\/span><\/div><div class=\"vsk-slack-text\">Possible November pick: a Facebook chart going around since last night says &quot;Chloride in our lakes has DOUBLED since 2020&quot; and credits the district&#x27;s 2025 report. Shares are climbing fast. DMing you too. Should we reach out to whoever posted it?<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":eyes:\" data-emoji=\"eyes\"><span class=\"vsk-slack-emoji\">&#x1F440;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1792163126.441666\"><div class=\"vsk-slack-thread-head\">2 replies<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1792163852.871203\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Oct 16, 2026 10:17<\/span><\/div><div class=\"vsk-slack-text\">answered in DM - this one cites the same district report the salt feature runs on, so it goes in the feature, not the column. and let&#x27;s leave the poster alone for now. i&#x27;ll handle that part.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":+1:\" data-emoji=\"+1\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1792164017.795489\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_FACTCHECK\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Oct 16, 2026 10:20<\/span><\/div><div class=\"vsk-slack-text\">Agreed, feature not column, so no column art for this one. We still need a November claim. Drop candidates here.<\/div><\/div><\/div><\/div><\/div><\/section><section class=\"vsk-slack-channel\" id=\"vsk-slack-ch-C_SALT_STORY\" data-channel-id=\"C_SALT_STORY\"><header class=\"vsk-slack-chan-head\"><div class=\"vsk-slack-chan-title\"><span class=\"vsk-slack-hash\">#<\/span>salt-story<\/div><div class=\"vsk-slack-chan-meta\">3 members &#183; created Sep 21, 2026 &#183; 55 messages<\/div><div class=\"vsk-slack-topic\">Salt in the Lakes, due Fri Nov 20<\/div><div class=\"vsk-slack-purpose\">Owen&#x27;s road-salt feature: reporting, edits and art.<\/div><\/header><div class=\"vsk-slack-msgs\"><div class=\"vsk-slack-msg\" data-slack-ts=\"1790003674.833985\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Sep 21, 2026 10:14<\/span><\/div><div class=\"vsk-slack-text\">Salt in the Lakes is official. Owen, the assignment letter went to your email this morning: about 3,000 words on winter road-salt use and what it&#x27;s doing to metro lakes, due Fri Nov 20. Lena has art and layout. Let&#x27;s keep reporting, edits and art for it in this channel.<\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1790003674.833985\"><div class=\"vsk-slack-thread-head\">2 replies<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1790004754.059342\" data-slack-user=\"U_LFISCHER\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#065F46\" data-uid=\"U_LFISCHER\" style=\"background:#065F46\" title=\"U_LFISCHER\">LF<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Lena Fischer<\/span><span class=\"vsk-slack-ts\">Sep 21, 2026 10:32<\/span><\/div><div class=\"vsk-slack-text\">yay, official! \u2728 i&#x27;ve penciled in a chart sidebar and field photos so far. should i plan on district maps too? \ud83d\udcf8<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1790008060.576288\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Sep 21, 2026 11:27<\/span><\/div><div class=\"vsk-slack-text\">maps, yes - the district&#x27;s 2025 water-quality report has a sampling-site map, and it&#x27;s public. charts I&#x27;d rather build from numbers I&#x27;ve checked. field photos would come out of a weekend sampling day, probably in October. I&#x27;ll flag things here as they come in.<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1790093826.978606\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Sep 22, 2026 11:17<\/span><\/div><div class=\"vsk-slack-text\">interview request is out to Dr. Elise Marchand at the Lake Superior Freshwater Institute in Duluth, who studies chloride in Superior tributaries. asked for a background call in the next week or so, then a longer in-person interview in early November.<\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1790093826.978606\"><div class=\"vsk-slack-thread-head\">1 reply<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1790094933.505718\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Sep 22, 2026 11:35<\/span><\/div><div class=\"vsk-slack-text\">Good get if Marchand says yes. Send me a travel estimate before you book anything.<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1790106268.895169\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Sep 22, 2026 14:44<\/span><\/div><div class=\"vsk-slack-text\">claims tracker is up in Airtable - Salt in the Lakes base, with tables for claims, sources and sites. Hana, the invite&#x27;s in your email. Lena, I&#x27;ll pull numbers from it for the art once they&#x27;re solid.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":+1:\" data-emoji=\"+1\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1790260304.808673\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Sep 24, 2026 09:31<\/span><\/div><div class=\"vsk-slack-text\">Dr. Elise Marchand at the Lake Superior Freshwater Institute agreed to talk. Background call is Wed Sep 30 at 2, and she&#x27;s fine with me recording it. She&#x27;s open early November for a longer sit-down in Duluth. Hana - once we pin a date I&#x27;ll price the trip and send you the numbers before I book anything.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":+1:\" data-emoji=\"+1\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1790698890.364949\" data-slack-user=\"U_LFISCHER\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#065F46\" data-uid=\"U_LFISCHER\" style=\"background:#065F46\" title=\"U_LFISCHER\">LF<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Lena Fischer<\/span><span class=\"vsk-slack-ts\">Sep 29, 2026 11:21<\/span><\/div><div class=\"vsk-slack-text\">hiya! production schedule for the salt package \u2728<br>\u2022 Wed Oct 28: rough layout pdf to Hana and Owen<br>\u2022 Fri Nov 13: art list and photo selects<br>\u2022 Fri Nov 20: copy in<br>\u2022 Mon Nov 30: first pages out for the fact read<br>\u2022 Thu Dec 3: final proofs<br>\u2022 Tue Dec 8: off to the printer<br>also, the 2027 production calendar is live: <span class=\"vsk-slack-link\">2027 production calendar<\/span><br>two qs for Owen: does Nov 13 work for art? and is it still just the chart sidebar, or chart plus a site map?<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":eyes:\" data-emoji=\"eyes\"><span class=\"vsk-slack-emoji\">&#x1F440;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1790698890.364949\"><div class=\"vsk-slack-thread-head\">9 replies<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1790699657.441408\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Sep 29, 2026 11:34<\/span><\/div><div class=\"vsk-slack-text\">nov 13 works. still the chart sidebar - built straight from the district&#x27;s own tables, no eyeballing. and yes to a small site map. most readers couldn&#x27;t point to these lakes. the district publishes one, i&#x27;ll send it over.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1790700136.407966\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Sep 29, 2026 11:42<\/span><\/div><div class=\"vsk-slack-text\">Thanks, Lena - the schedule works for me. We&#x27;ll walk through the 2027 calendar at the edit meeting next Tue (Oct 6, 10 a.m.). Owen, look over the fact-check deadlines in it before then.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1790700223.816742\" data-slack-user=\"U_LFISCHER\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#065F46\" data-uid=\"U_LFISCHER\" style=\"background:#065F46\" title=\"U_LFISCHER\">LF<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Lena Fischer<\/span><span class=\"vsk-slack-ts\">Sep 29, 2026 11:43<\/span><\/div><div class=\"vsk-slack-text\">yay \ud83c\udf89 owen, for the map: quarter page or half? and lakes labeled by name or by the district&#x27;s site codes?<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1790700546.865341\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Sep 29, 2026 11:49<\/span><\/div><div class=\"vsk-slack-text\">quarter page is plenty. lake names on the map, site codes in a small key.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1790700673.162869\" data-slack-user=\"U_LFISCHER\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#065F46\" data-uid=\"U_LFISCHER\" style=\"background:#065F46\" title=\"U_LFISCHER\">LF<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Lena Fischer<\/span><span class=\"vsk-slack-ts\">Sep 29, 2026 11:51<\/span><\/div><div class=\"vsk-slack-text\">perfect, quarter page with a key \u2728 pinning the schedule to the channel now<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1790705184.477043\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Sep 29, 2026 13:06<\/span><\/div><div class=\"vsk-slack-text\">Lena, the 2027 calendar has the February issue closing Mon Jan 4 - our first day back from the holiday break. Can we push it to the end of that week?<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1790705286.154088\" data-slack-user=\"U_LFISCHER\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#065F46\" data-uid=\"U_LFISCHER\" style=\"background:#065F46\" title=\"U_LFISCHER\">LF<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Lena Fischer<\/span><span class=\"vsk-slack-ts\">Sep 29, 2026 13:08<\/span><\/div><div class=\"vsk-slack-text\">ooh good catch! checking with the printer today, will have it updated before tues \u2728<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1790868134.155350\" data-slack-user=\"U_LFISCHER\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#065F46\" data-uid=\"U_LFISCHER\" style=\"background:#065F46\" title=\"U_LFISCHER\">LF<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Lena Fischer<\/span><span class=\"vsk-slack-ts\">Oct 01, 2026 10:22<\/span><\/div><div class=\"vsk-slack-text\">update: February close is now Fri Jan 8 - printer&#x27;s fine with it \ud83c\udf89 same link as before<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":+1:\" data-emoji=\"+1\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1790869305.464914\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Oct 01, 2026 10:41<\/span><\/div><div class=\"vsk-slack-text\">thanks - jan 8 gives the february fact-check a real week after the holidays.<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1790799554.194578\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Sep 30, 2026 15:19<\/span><\/div><div class=\"vsk-slack-text\">good background call with marchand this afternoon. groundwater came up a lot, and it changes how i&#x27;ll frame part of the piece. she&#x27;ll sit for a longer interview in duluth, probably the first week of november.<\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1790799554.194578\"><div class=\"vsk-slack-thread-head\">2 replies<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1790800837.766356\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Sep 30, 2026 15:40<\/span><\/div><div class=\"vsk-slack-text\">Great. Will she be on the record in Duluth?<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1790801285.896733\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Sep 30, 2026 15:48<\/span><\/div><div class=\"vsk-slack-text\">yes - on the record and fine with being recorded. she&#x27;ll speak to the chloride science and her own tributary work, not to the district&#x27;s program.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":+1:\" data-emoji=\"+1\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1790876546.968381\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Oct 01, 2026 12:42<\/span><\/div><div class=\"vsk-slack-text\">dr. marchand penciled me in for thu nov 5 at 9:30 - in person, at the lake superior freshwater institute in duluth. plan is to fly up wed nov 4 and come home fri nov 6. hana, i&#x27;ll have travel numbers for tuesday&#x27;s edit meeting.<\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1790876546.968381\"><div class=\"vsk-slack-thread-head\">1 reply<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1790877485.938249\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Oct 01, 2026 12:58<\/span><\/div><div class=\"vsk-slack-text\">Works for me. Bring the lab quotes too and we&#x27;ll go through Duluth and the split samples together on Tuesday.<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1790964508.013976\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Oct 02, 2026 13:08<\/span><\/div><div class=\"vsk-slack-text\">both labs are lined up for the oct 10 split samples. riverside analytical (coon rapids) quoted $384.00 for the four; northstar environmental (bloomington) is $65 a sample, so $260.00 - $644 all in. picking up kits next week, dropping samples mon oct 12. both go on my visa and i&#x27;ll bill north current after.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":eyes:\" data-emoji=\"eyes\"><span class=\"vsk-slack-emoji\">&#x1F440;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1791305572.493809\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Oct 06, 2026 11:52<\/span><\/div><div class=\"vsk-slack-text\">Recap from this morning&#x27;s edit meeting, mostly for Lena:<br>\u2022 Salt in the Lakes is still due Fri Nov 20<br>\u2022 Your dates hold: rough layout Oct 28, art selects Nov 13<br>\u2022 Owen&#x27;s Duluth trip (Nov 4-6) for the Marchand interview is approved<\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1791305572.493809\"><div class=\"vsk-slack-thread-head\">1 reply<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1791306468.225527\" data-slack-user=\"U_LFISCHER\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#065F46\" data-uid=\"U_LFISCHER\" style=\"background:#065F46\" title=\"U_LFISCHER\">LF<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Lena Fischer<\/span><span class=\"vsk-slack-ts\">Oct 06, 2026 12:07<\/span><\/div><div class=\"vsk-slack-text\">noted \u2728 rough layout the 28th, selects the 13th, both on my calendar. holding room in the spread for a chart sidebar \ud83d\udcca<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1791478381.575290\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Oct 08, 2026 11:53<\/span><\/div><div class=\"vsk-slack-text\">both labs&#x27; bottle kits are in hand - riverside&#x27;s came yesterday, northstar&#x27;s this morning. sampling sat at four district sites, from shore and pier only. district says grab samples don&#x27;t need a permit. splits go to both labs mon morning.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":+1:\" data-emoji=\"+1\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1791491696.022644\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Oct 08, 2026 15:34<\/span><\/div><div class=\"vsk-slack-text\">heads-up - the district posted a revised 2025 water-quality report this afternoon, errata page and all. haven&#x27;t gone through it line by line yet. media call fri 10-11 on the revision and the 2027 draft budget. i&#x27;ll be on it.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":eyes:\" data-emoji=\"eyes\"><span class=\"vsk-slack-emoji\">&#x1F440;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1791492742.749957\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Oct 08, 2026 15:52<\/span><\/div><div class=\"vsk-slack-text\">Owen - the district posted its revised 2025 water-quality report today. Does it change any of the numbers we&#x27;re already using in the tracker?<\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1791492742.749957\"><div class=\"vsk-slack-thread-head\">1 reply<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1791493504.712130\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Oct 08, 2026 16:05<\/span><\/div><div class=\"vsk-slack-text\">don&#x27;t know yet. i&#x27;ve got both versions saved but haven&#x27;t been through the revision line by line. the side-by-side is on my list for next week.<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1791564086.136029\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Oct 09, 2026 11:41<\/span><\/div><div class=\"vsk-slack-text\">just off the district media call. the 2027 draft budget has a bigger chloride line, and they&#x27;ve put a per-lake figure on monitoring - $7,400 a lake. Luis is sending the draft budget and the smart-salting summary later today.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":eyes:\" data-emoji=\"eyes\"><span class=\"vsk-slack-emoji\">&#x1F440;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1791564086.136029\"><div class=\"vsk-slack-thread-head\">2 replies<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1791565138.489051\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Oct 09, 2026 11:58<\/span><\/div><div class=\"vsk-slack-text\">Good. Is that budget public yet, or still a draft?<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1791576577.945884\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Oct 09, 2026 15:09<\/span><\/div><div class=\"vsk-slack-text\">still a draft. Luis already sent it - the two tables i need are on scanned pages, 9 and 14. i&#x27;ve asked him two things: what each table covers, and whether the $7,400 includes equipment. numbers go in the tracker this afternoon.<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1791580756.371501\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Oct 09, 2026 16:19<\/span><\/div><div class=\"vsk-slack-text\">heard back from Luis on both. the p. 14 table is 2021-25 chloride spending; the proposed 2027 line is on p. 9. the $7,400 per lake is contract-lab fees only - no equipment. page refs are in the tracker. the budget stays a draft until the board adopts it in November, so it&#x27;s &quot;proposed&quot; in copy.<\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1791580756.371501\"><div class=\"vsk-slack-thread-head\">1 reply<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1791581482.154686\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Oct 09, 2026 16:31<\/span><\/div><div class=\"vsk-slack-text\">Great - that&#x27;s exactly the paper trail I want in the fact-check file.<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1791827582.412076\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Oct 12, 2026 12:53<\/span><\/div><div class=\"vsk-slack-text\">split samples from saturday&#x27;s four sites (COR-1, PEN-OUT, ODG-IN, SUM-1) went in at both labs this morning - Riverside in Coon Rapids, Northstar in Bloomington. results due next week. drop-off details are in your email.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":+1:\" data-emoji=\"+1\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1792005175.223942\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Oct 14, 2026 14:12<\/span><\/div><div class=\"vsk-slack-text\">lena - hana flagged a good one in the tracker. the district&#x27;s storm-sewer station at the odegaard north inlet hit 1,020 mg/L in march 2025, during snowmelt - more than three times any lake mean in the report. worth a small chart next to the sidebar? I can send the table.<\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1792005175.223942\"><div class=\"vsk-slack-thread-head\">2 replies<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1792006310.073140\" data-slack-user=\"U_LFISCHER\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#065F46\" data-uid=\"U_LFISCHER\" style=\"background:#065F46\" title=\"U_LFISCHER\">LF<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Lena Fischer<\/span><span class=\"vsk-slack-ts\">Oct 14, 2026 14:31<\/span><\/div><div class=\"vsk-slack-text\">ooh yes \u2728 a little spike chart would sit nicely under the sidebar. just that inlet or a few stations? and same colors as the sidebar?<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1792007062.813240\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Oct 14, 2026 14:44<\/span><\/div><div class=\"vsk-slack-text\">just that one. the district only added inlet and outlet stations last year, so the report has a single winter of data - caption should say so. sidebar colors are fine, but give it its own axis starting at zero; on a shared scale the inlet would flatten the lakes. table coming once the monarch draft goes to hana fri.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":+1:\" data-emoji=\"+1\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1792074034.395248\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Oct 15, 2026 09:20<\/span><\/div><div class=\"vsk-slack-text\">fyi for the schedule - i&#x27;m in duluth wed nov 4 through fri nov 6 for the marchand interview. flight and hotel are booked. lena, the art list still comes to you by fri nov 13.<\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1792074034.395248\"><div class=\"vsk-slack-thread-head\">1 reply<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1792075323.750472\" data-slack-user=\"U_LFISCHER\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#065F46\" data-uid=\"U_LFISCHER\" style=\"background:#065F46\" title=\"U_LFISCHER\">LF<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Lena Fischer<\/span><span class=\"vsk-slack-ts\">Oct 15, 2026 09:42<\/span><\/div><div class=\"vsk-slack-text\">noted \u2728 nov 13 stays circled for the art list. safe travels up north next month \ud83d\udcf8<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1792186801.549817\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Oct 16, 2026 16:40<\/span><\/div><div class=\"vsk-slack-text\">hana - claims in the tracker are ranked for the salt-use draft. worth a look before i start the outline, if you have time.<\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1792186801.549817\"><div class=\"vsk-slack-thread-head\">1 reply<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1792188148.471624\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Oct 16, 2026 17:02<\/span><\/div><div class=\"vsk-slack-text\">Thanks. I&#x27;ll go through them this weekend and flag anything that needs a second source.<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1792521171.378592\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Oct 20, 2026 13:32<\/span><\/div><div class=\"vsk-slack-text\">riverside&#x27;s results on the oct. 10 samples came in this morning - WO-26-10418. northstar&#x27;s are due later this week, so i&#x27;m keeping both out of the tracker until theirs are in.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":eyes:\" data-emoji=\"eyes\"><span class=\"vsk-slack-emoji\">&#x1F440;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1792592723.805310\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Oct 21, 2026 09:25<\/span><\/div><div class=\"vsk-slack-text\">fyi - strib has a salt-dome story up this morning: metro cities stocking up before winter, prices creeping up. it&#x27;s supply and city budgets - nothing on the lakes or chloride. no overlap with ours.<\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1792592723.805310\"><div class=\"vsk-slack-thread-head\">1 reply<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1792594084.559252\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Oct 21, 2026 09:48<\/span><\/div><div class=\"vsk-slack-text\">Thanks for reading it. Sounds like we still have the lakes to ourselves.<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1792704886.419954\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Oct 22, 2026 16:34<\/span><\/div><div class=\"vsk-slack-text\">northstar&#x27;s report (NS-4471) came in this morning, so both labs are back. both are in the tracker, with each lab&#x27;s method noted on its source entry. the numbers don&#x27;t match - northstar runs higher at all four sites. going through both method sheets before i decide which one we cite.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":+1:\" data-emoji=\"+1\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1793027600.928806\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Oct 26, 2026 10:13<\/span><\/div><div class=\"vsk-slack-text\">duluth interview is set - dr. marchand, thu nov 5, 9:30 to 11:30, room 214 at the lake superior freshwater institute. flying up wed the 4th, back fri the 6th.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":+1:\" data-emoji=\"+1\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1793115668.255971\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Oct 27, 2026 10:41<\/span><\/div><div class=\"vsk-slack-text\">Recapping this morning for the channel: new angle is cleanup cost for the watershed districts, with salt use as context. Owen, can you re-rank the tracker against that and send me your top 5 claims by Friday?<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":eyes:\" data-emoji=\"eyes\"><span class=\"vsk-slack-emoji\">&#x1F440;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1793115668.255971\"><div class=\"vsk-slack-thread-head\">6 replies<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1793116018.615534\" data-slack-user=\"U_LFISCHER\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#065F46\" data-uid=\"U_LFISCHER\" style=\"background:#065F46\" title=\"U_LFISCHER\">LF<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Lena Fischer<\/span><span class=\"vsk-slack-ts\">Oct 27, 2026 10:46<\/span><\/div><div class=\"vsk-slack-text\">two layout q&#x27;s: does the chart sidebar survive the new angle? and should i hold space for a cost graphic? \u2728<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1793116150.982556\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Oct 27, 2026 10:49<\/span><\/div><div class=\"vsk-slack-text\">Sidebar stays - the viral chart is still the hook. Yes to a cost graphic, once Owen&#x27;s top claims are set.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1793132267.783400\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Oct 27, 2026 15:17<\/span><\/div><div class=\"vsk-slack-text\">Trend, or one bad year?<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1793132670.135703\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Oct 27, 2026 15:24<\/span><\/div><div class=\"vsk-slack-text\">not solid yet. The v2 errata on p. 3 change which sites are over 230 mg/L. I still have to go through the Oct 8 v2 against the June v1 line by line. Until that&#x27;s done, the site claims stay as the tracker has them: C02 and C04 both show Verified.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1793132790.405431\" data-slack-user=\"U_HSATO\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Oct 27, 2026 15:26<\/span><\/div><div class=\"vsk-slack-text\"><span class=\"vsk-slack-emoji\" title=\":+1:\">&#x1F44D;<\/span> Fine for Fri. With the re-rank and the v2 check added, does Nov 20 still hold for filing?<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1793132805.298992\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Oct 27, 2026 15:26<\/span><\/div><div class=\"vsk-slack-text\">it holds. I&#x27;ll file the morning of Nov 20. Top 5 to you fri, and the v1-v2 notes land in the tracker as I go.<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1793200741.101851\" data-slack-user=\"U_LFISCHER\" data-slack-channel=\"C_SALT_STORY\"><div class=\"vsk-slack-avatar\" data-user-color=\"#065F46\" data-uid=\"U_LFISCHER\" style=\"background:#065F46\" title=\"U_LFISCHER\">LF<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Lena Fischer<\/span><span class=\"vsk-slack-ts\">Oct 28, 2026 10:19<\/span><\/div><div class=\"vsk-slack-text\">rough layout pdf for salt is up in the layout folder \u2728 chart sidebar, site map and the cost graphic are still gray boxes. notes whenever you&#x27;ve had a look?<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":eyes:\" data-emoji=\"eyes\"><span class=\"vsk-slack-emoji\">&#x1F440;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><\/div><\/section><section class=\"vsk-slack-channel\" id=\"vsk-slack-ch-D_OBRANDT_HSATO\" data-channel-id=\"D_OBRANDT_HSATO\"><header class=\"vsk-slack-chan-head\"><div class=\"vsk-slack-chan-title\"><span class=\"vsk-slack-hash\">&#128274;<\/span>owen-brandt-hana-sato<\/div><div class=\"vsk-slack-chan-meta\">2 members &#183; created Apr 29, 2026 &#183; 57 messages<\/div><\/header><div class=\"vsk-slack-msgs\"><div class=\"vsk-slack-msg\" data-slack-ts=\"1777988073.191256\" data-slack-user=\"U_HSATO\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">May 05, 2026 08:34<\/span><\/div><div class=\"vsk-slack-text\">Agenda for 10 today at the office:<br>\u2022 May column: two river claims in the running, we&#x27;ll pick one<br>\u2022 Summer: any weeks you&#x27;ll be away?<br>\u2022 Fall features: early thoughts welcome, rough is fine<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1777988860.568841\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">May 05, 2026 08:47<\/span><\/div><div class=\"vsk-slack-text\">see you at 10. nothing booked for summer yet - probably a long weekend up the shore in July. will bring a fall idea or two.<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1778856168.798879\" data-slack-user=\"U_HSATO\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">May 15, 2026 09:42<\/span><\/div><div class=\"vsk-slack-text\">&quot;The Buckthorn Line&quot; is accepted. No more edits from me, so go ahead and invoice the fee.<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1778859070.408838\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">May 15, 2026 10:31<\/span><\/div><div class=\"vsk-slack-text\">thanks - invoiced this morning. INV-2026-030, $3,200.00, sent to AP.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":+1:\" data-emoji=\"+1\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1779117173.899278\" data-slack-user=\"U_HSATO\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">May 18, 2026 10:12<\/span><\/div><div class=\"vsk-slack-text\">Copy desk is asking for the May column Wednesday instead of Friday. They want to clear the decks before Memorial Day weekend. Doable?<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1779118269.193751\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">May 18, 2026 10:31<\/span><\/div><div class=\"vsk-slack-text\">doable - draft&#x27;s mostly there, just waiting on one EPA table. you&#x27;ll have it wed.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":+1:\" data-emoji=\"+1\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1779374994.930866\" data-slack-user=\"U_HSATO\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">May 21, 2026 09:49<\/span><\/div><div class=\"vsk-slack-text\">Notes on the May column are in your email. Two small ones, both up top.<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1779380822.635097\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">May 21, 2026 11:27<\/span><\/div><div class=\"vsk-slack-text\">both done - group&#x27;s named in the second graf now, waterway count right after. revised copy is in the CMS.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":+1:\" data-emoji=\"+1\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1780407012.701311\" data-slack-user=\"U_HSATO\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Jun 02, 2026 08:30<\/span><\/div><div class=\"vsk-slack-text\">Morning. Agenda for 10:<br>\u2022 May column: copy desk was glad to get it early<br>\u2022 June column: leaning toward the viral ice-out thread, but open to others<br>\u2022 Art: Lena wants a map or chart with every column this summer, so bring ideas<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1780407676.242186\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Jun 02, 2026 08:41<\/span><\/div><div class=\"vsk-slack-text\">see you at 10. bringing two backups in case ice-out doesn&#x27;t pan out. maps i can do most months - charts only when the numbers earn one.<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1780420503.175303\" data-slack-user=\"U_HSATO\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Jun 02, 2026 12:15<\/span><\/div><div class=\"vsk-slack-text\">Thanks for coming in today. I&#x27;ll post the ice-out claim in #factcheck once I&#x27;ve rechecked the share count on the original thread.<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1780421539.640033\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Jun 02, 2026 12:32<\/span><\/div><div class=\"vsk-slack-text\">good. I&#x27;ll pull the DNR&#x27;s ice-out tables this week either way.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":+1:\" data-emoji=\"+1\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1780513502.268737\" data-slack-user=\"U_HSATO\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Jun 03, 2026 14:05<\/span><\/div><div class=\"vsk-slack-text\">For the ice-out column: is the DNR data free to use, or do we need to license it?<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1780514556.619545\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Jun 03, 2026 14:22<\/span><\/div><div class=\"vsk-slack-text\">free - the DNR posts ice-out dates lake by lake as public data. I&#x27;ll cite the page and the date I pulled it.<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1781381359.594609\" data-slack-user=\"U_HSATO\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Jun 13, 2026 15:09<\/span><\/div><div class=\"vsk-slack-text\">Weekend reading: the Metro Lakes Watershed District put out its 2025 water-quality report on Thursday. The release says four lakes are over the state chloride standard. Is there a fall feature in it for you? No rush - Monday&#x27;s fine.<\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1781381359.594609\"><div class=\"vsk-slack-thread-head\">1 reply<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1781381491.412827\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Jun 13, 2026 15:11<\/span><\/div><div class=\"vsk-slack-text\">could be. I already asked their press office for the site-level data - it goes through a request form, about 10 business days. also, Table 3 is a scanned image, so the numbers can&#x27;t be copied out of it.<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1783517902.738203\" data-slack-user=\"U_HSATO\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Jul 08, 2026 08:38<\/span><\/div><div class=\"vsk-slack-text\">Morning, Owen. Agenda for 10 at the office:<br>\u2022 July fact-check column<br>\u2022 Fall features - bring the road-salt idea<br>\u2022 Summer schedules<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1783518763.189746\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Jul 08, 2026 08:52<\/span><\/div><div class=\"vsk-slack-text\">see you at 10. heads-up - I&#x27;m offline fri through sun, camping up the shore. back on email and slack monday.<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1783530588.268603\" data-slack-user=\"U_HSATO\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Jul 08, 2026 12:09<\/span><\/div><div class=\"vsk-slack-text\">Thanks for coming in this morning. I&#x27;ll post July&#x27;s claim in #factcheck early next week, so nothing from me before Monday. Enjoy the North Shore.<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1783531414.327547\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Jul 08, 2026 12:23<\/span><\/div><div class=\"vsk-slack-text\">thanks. back at the desk monday - I&#x27;ll grab the claim once it&#x27;s up.<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1784652002.420762\" data-slack-user=\"U_HSATO\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Jul 21, 2026 11:40<\/span><\/div><div class=\"vsk-slack-text\">Two hed options for the wetlands column are at the top of the draft doc. Can you pick one by end of day?<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1784656946.041232\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Jul 21, 2026 13:02<\/span><\/div><div class=\"vsk-slack-text\">the second. the first puts &quot;half&quot; in the hed - anyone who stops reading there walks away with the claim we&#x27;re rating false.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":eyes:\" data-emoji=\"eyes\"><span class=\"vsk-slack-emoji\">&#x1F440;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1784814870.144299\" data-slack-user=\"U_HSATO\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Jul 23, 2026 08:54<\/span><\/div><div class=\"vsk-slack-text\">Morning. Read the wetlands column - it holds up. One small add, details in your email: a sentence near the end on what the state still loses every year to drainage and development.<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1784817504.435175\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Jul 23, 2026 09:38<\/span><\/div><div class=\"vsk-slack-text\">added a graf near the end - net flat isn&#x27;t the same as nothing happening. updated draft is in the CMS.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":+1:\" data-emoji=\"+1\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1785850299.739099\" data-slack-user=\"U_HSATO\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Aug 04, 2026 08:31<\/span><\/div><div class=\"vsk-slack-text\">Morning, Owen. Agenda for 10:<br>\u2022 August column - probably a heat claim<br>\u2022 fall features lineup<br>\u2022 art for the August column<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1785851121.421513\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Aug 04, 2026 08:45<\/span><\/div><div class=\"vsk-slack-text\">see you at 10 - I&#x27;ll bring a couple of heat claims to compare.<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1788269310.124816\" data-slack-user=\"U_HSATO\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Sep 01, 2026 08:28<\/span><\/div><div class=\"vsk-slack-text\">Morning, Owen. Agenda for 10:<br>\u2022 September column: which claim we take on<br>\u2022 Fall features: one slot still open, filing in November<br>\u2022 2027 planning: first pass, nothing final yet<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1788270026.681609\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Sep 01, 2026 08:40<\/span><\/div><div class=\"vsk-slack-text\">see you at 10. might have something for that november slot - i&#x27;ll bring it.<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1788282736.672044\" data-slack-user=\"U_HSATO\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Sep 01, 2026 12:12<\/span><\/div><div class=\"vsk-slack-text\">Good meeting. Send me the road-salt idea in writing when it&#x27;s ready. A few paragraphs is plenty. I&#x27;ll hold the November slot through mid-September. September&#x27;s claim goes up in #factcheck after Labor Day.<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1788283601.002693\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Sep 01, 2026 12:26<\/span><\/div><div class=\"vsk-slack-text\">on the salt idea - you&#x27;ll have a pitch next week. want to read the district&#x27;s june report properly first.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":+1:\" data-emoji=\"+1\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1788878041.648682\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Sep 08, 2026 09:34<\/span><\/div><div class=\"vsk-slack-text\">pitch is in your inbox - winter road salt and the metro lakes, the one I floated at the last edit meeting. no rush.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":eyes:\" data-emoji=\"eyes\"><span class=\"vsk-slack-emoji\">&#x1F440;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1789071619.870335\" data-slack-user=\"U_HSATO\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Sep 10, 2026 15:20<\/span><\/div><div class=\"vsk-slack-text\">Read the salt pitch - I&#x27;m in. I still have to clear the fee upstairs, so the assignment letter may take a week or two.<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1789072468.490745\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Sep 10, 2026 15:34<\/span><\/div><div class=\"vsk-slack-text\">great, thanks - I&#x27;ll pull the district&#x27;s older water-quality reports in the meantime.<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1790172621.104753\" data-slack-user=\"U_HSATO\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Sep 23, 2026 09:10<\/span><\/div><div class=\"vsk-slack-text\">Got the Airtable invite and I&#x27;m in. Having claims and sources split out like that is exactly what I need for the fact-check file.<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1790173524.613511\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Sep 23, 2026 09:25<\/span><\/div><div class=\"vsk-slack-text\">good. the claims table is rough for now - I&#x27;ll tidy it as the reporting comes in.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":+1:\" data-emoji=\"+1\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1790346822.214635\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Sep 25, 2026 09:33<\/span><\/div><div class=\"vsk-slack-text\">salt advance landed this morning - $2,250, the first half. thanks for getting it signed off so fast.<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1790347270.422832\" data-slack-user=\"U_HSATO\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Sep 25, 2026 09:41<\/span><\/div><div class=\"vsk-slack-text\">Good - glad it landed before the weekend. If anything on the remittance looks off, tell me and I&#x27;ll take it up with accounting.<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1791293580.902955\" data-slack-user=\"U_HSATO\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Oct 06, 2026 08:33<\/span><\/div><div class=\"vsk-slack-text\">Morning! Here&#x27;s what I have for 10:<br>\u2022 Salt in the Lakes check-in<br>\u2022 Duluth and lab expenses<br>\u2022 our 2027 features budget (still a draft)<br>\u2022 November fact-check topic<br>\u2022 winter and spring: what you can take on<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1791294363.265689\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Oct 06, 2026 08:46<\/span><\/div><div class=\"vsk-slack-text\">see you at 10. bringing both lab quotes and a rough duluth number - airfare plus two hotel nights.<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1791916958.078822\" data-slack-user=\"U_HSATO\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Oct 13, 2026 13:42<\/span><\/div><div class=\"vsk-slack-text\">Hey Owen - I left three questions for you in the tracker&#x27;s Claims table: two on the budget claims, one on the snowmelt numbers. Nothing urgent.<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1791918436.997657\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Oct 13, 2026 14:07<\/span><\/div><div class=\"vsk-slack-text\">thanks for the comments - answered the p. 14 one in the tracker. the other two need more digging, so I&#x27;ll come back to those.<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1791993042.517984\" data-slack-user=\"U_HSATO\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Oct 14, 2026 10:50<\/span><\/div><div class=\"vsk-slack-text\">Checking in on the monarch column - Lena needs final copy by Tue the 20th to get it into layout. Still on track?<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1791993936.779245\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Oct 14, 2026 11:05<\/span><\/div><div class=\"vsk-slack-text\">still on track - draft to you fri, so you&#x27;ll have monday for edits before lena&#x27;s tuesday deadline.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":+1:\" data-emoji=\"+1\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1792073214.267241\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Oct 15, 2026 09:06<\/span><\/div><div class=\"vsk-slack-text\">duluth&#x27;s booked - fly up wed nov 4, home fri nov 6. marchand is thu at 9:30. flight $289.40 + lakewalk inn $371.88 for the two nights = $661.28, under the $800 cap. both are on my visa; receipts go in with the invoice.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":+1:\" data-emoji=\"+1\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1792163161.188003\" data-slack-user=\"U_HSATO\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Oct 16, 2026 10:06<\/span><\/div><div class=\"vsk-slack-text\">Have you seen this chart? &quot;Chloride in our lakes has DOUBLED since 2020.&quot; It&#x27;s been picking up shares since last night, and the footer says &quot;Data: MLWD 2025 report.&quot; Could it be our November fact-check? And do we want to reach out to whoever made it?<\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1792163161.188003\"><div class=\"vsk-slack-thread-head\">3 replies<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1792163601.618388\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Oct 16, 2026 10:13<\/span><\/div><div class=\"vsk-slack-text\">saw it this morning. the jump looks too big to me, but i haven&#x27;t checked it against the report yet.<br>i&#x27;d keep it out of the column - it cites the district&#x27;s 2025 report, the same source the feature runs on, so it belongs in the feature.<br>and hold off on contacting the poster. i know her through salt watch and would rather talk to her myself once i&#x27;ve been through the numbers.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":+1:\" data-emoji=\"+1\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1792163693.535290\" data-slack-user=\"U_HSATO\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Oct 16, 2026 10:14<\/span><\/div><div class=\"vsk-slack-text\">Makes sense, it goes in the feature. I&#x27;ll find another item for November. The poster is yours to handle.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1792163766.597877\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Oct 16, 2026 10:16<\/span><\/div><div class=\"vsk-slack-text\">thanks. logging it in the claims table as unverified so nobody cites it by accident.<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1792705321.789356\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Oct 22, 2026 16:42<\/span><\/div><div class=\"vsk-slack-text\">lab fees for salt: riverside $384.00, northstar $260.00. $644.00 for the pair, under the $700 cap. both went on my visa - they&#x27;ll be on the expense invoice.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":+1:\" data-emoji=\"+1\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1792783249.783206\" data-slack-user=\"U_HSATO\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Oct 23, 2026 14:20<\/span><\/div><div class=\"vsk-slack-text\">Looking ahead to spring: would you take on a Lake Pepin sediment series? Three or four parts, running February through May.<\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1792783249.783206\"><div class=\"vsk-slack-thread-head\">1 reply<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1792783392.711673\" data-slack-user=\"U_HSATO\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Oct 23, 2026 14:23<\/span><\/div><div class=\"vsk-slack-text\">No rush on an answer. I&#x27;m roughing out the 2027 features list and wanted to offer it to you before I ask anyone else.<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1793116403.912426\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Oct 27, 2026 10:53<\/span><\/div><div class=\"vsk-slack-text\">on it - re-ranking the claims in the tracker for the cleanup-cost angle. top 5 to you by fri.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":+1:\" data-emoji=\"+1\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1793116403.912426\"><div class=\"vsk-slack-thread-head\">1 reply<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1793116491.133532\" data-slack-user=\"U_HSATO\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Oct 27, 2026 10:54<\/span><\/div><div class=\"vsk-slack-text\">Thanks. End of day Friday works.<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1793117173.277953\" data-slack-user=\"U_HSATO\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Oct 27, 2026 11:06<\/span><\/div><div class=\"vsk-slack-text\">One more thing for the salt fact-check file before your draft comes in. For the field tech who sampled with you on Oct 10, I need:<br>\u2022 name<br>\u2022 affiliation (employer or agency)<br>Can you put both here in writing so they&#x27;re on record? Neither will run in the piece.<\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1793117173.277953\"><div class=\"vsk-slack-thread-head\">1 reply<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1793117345.185974\" data-slack-user=\"U_HSATO\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Oct 27, 2026 11:09<\/span><\/div><div class=\"vsk-slack-text\">It&#x27;s the same standard we used on the monarch column this month: anyone who handled samples or data gets a name and affiliation in the file. The file stays internal.<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1793211365.644424\" data-slack-user=\"U_HSATO\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Oct 28, 2026 13:16<\/span><\/div><div class=\"vsk-slack-text\">Can we do the salt edit meeting the week of Nov 9? In person at the office, about 90 minutes. With the move to the cleanup-cost angle, I&#x27;d like to walk through the structure together. What days and times work for you?<\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1793211365.644424\"><div class=\"vsk-slack-thread-head\">1 reply<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1793211427.592596\" data-slack-user=\"U_HSATO\" data-slack-channel=\"D_OBRANDT_HSATO\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_HSATO\" style=\"background:#5B4CE0\" title=\"U_HSATO\">HS<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Hana Sato<\/span><span class=\"vsk-slack-ts\">Oct 28, 2026 13:17<\/span><\/div><div class=\"vsk-slack-text\">Mon through Thu is best for me. Mornings, or any time after 2.<\/div><\/div><\/div><\/div><\/div><\/section><section class=\"vsk-slack-channel\" id=\"vsk-slack-ch-D_OBRANDT_LFISCHER\" data-channel-id=\"D_OBRANDT_LFISCHER\"><header class=\"vsk-slack-chan-head\"><div class=\"vsk-slack-chan-title\"><span class=\"vsk-slack-hash\">&#128274;<\/span>owen-brandt-lena-fischer<\/div><div class=\"vsk-slack-chan-meta\">2 members &#183; created May 20, 2026 &#183; 17 messages<\/div><\/header><div class=\"vsk-slack-msgs\"><div class=\"vsk-slack-msg\" data-slack-ts=\"1781634641.414381\" data-slack-user=\"U_LFISCHER\" data-slack-channel=\"D_OBRANDT_LFISCHER\"><div class=\"vsk-slack-avatar\" data-user-color=\"#065F46\" data-uid=\"U_LFISCHER\" style=\"background:#065F46\" title=\"U_LFISCHER\">LF<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Lena Fischer<\/span><span class=\"vsk-slack-ts\">Jun 16, 2026 13:30<\/span><\/div><div class=\"vsk-slack-text\">hiya! for the ice-out column - do you have any shots of lake ice breaking up? \ud83d\udcf8 if not, ok if i pull one from the DNR archive?<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1781636569.953417\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"D_OBRANDT_LFISCHER\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Jun 16, 2026 14:02<\/span><\/div><div class=\"vsk-slack-text\">nothing usable from me this spring. DNR archive is fine - credit Minnesota DNR by name in the caption, not &#x27;file photo.&#x27;<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":+1:\" data-emoji=\"+1\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1781641304.665287\" data-slack-user=\"U_LFISCHER\" data-slack-channel=\"D_OBRANDT_LFISCHER\"><div class=\"vsk-slack-avatar\" data-user-color=\"#065F46\" data-uid=\"U_LFISCHER\" style=\"background:#065F46\" title=\"U_LFISCHER\">LF<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Lena Fischer<\/span><span class=\"vsk-slack-ts\">Jun 16, 2026 15:21<\/span><\/div><div class=\"vsk-slack-text\">got it - Minnesota DNR by name. map&#x27;s going with one dot per lake, and the lake table is final. updated mock goes in the art folder by tomorrow \u2728<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":+1:\" data-emoji=\"+1\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1786551351.435612\" data-slack-user=\"U_LFISCHER\" data-slack-channel=\"D_OBRANDT_LFISCHER\"><div class=\"vsk-slack-avatar\" data-user-color=\"#065F46\" data-uid=\"U_LFISCHER\" style=\"background:#065F46\" title=\"U_LFISCHER\">LF<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Lena Fischer<\/span><span class=\"vsk-slack-ts\">Aug 12, 2026 11:15<\/span><\/div><div class=\"vsk-slack-text\">hiya! heat map mock for the august column is in the layout folder \u2728 can you check the legend before it goes to Hana? and is &quot;downtown core&quot; ok as the map label?<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1786553308.603556\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"D_OBRANDT_LFISCHER\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Aug 12, 2026 11:48<\/span><\/div><div class=\"vsk-slack-text\">looked at it. the legend steps are uneven - 4 degrees, then 6, then 4 - and that makes it read hotter than the data. even them out, please. and just &quot;downtown&quot; on the label. the sensor sites don&#x27;t line up with any official core boundary.<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1786640656.525528\" data-slack-user=\"U_LFISCHER\" data-slack-channel=\"D_OBRANDT_LFISCHER\"><div class=\"vsk-slack-avatar\" data-user-color=\"#065F46\" data-uid=\"U_LFISCHER\" style=\"background:#065F46\" title=\"U_LFISCHER\">LF<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Lena Fischer<\/span><span class=\"vsk-slack-ts\">Aug 13, 2026 12:04<\/span><\/div><div class=\"vsk-slack-text\">thanks \u2728 steps are even now, whole degrees all the way up, and the label just says &quot;downtown.&quot; also switched the map to show difference from the airport station, with both summer averages spelled out in the legend. new mock goes to Hana monday.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":+1:\" data-emoji=\"+1\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1790862497.275649\" data-slack-user=\"U_LFISCHER\" data-slack-channel=\"D_OBRANDT_LFISCHER\"><div class=\"vsk-slack-avatar\" data-user-color=\"#065F46\" data-uid=\"U_LFISCHER\" style=\"background:#065F46\" title=\"U_LFISCHER\">LF<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Lena Fischer<\/span><span class=\"vsk-slack-ts\">Oct 01, 2026 08:48<\/span><\/div><div class=\"vsk-slack-text\">hiya! still on for 11? \u2728 i&#x27;ll have the salt spread grid up on the big screen. can you bring whatever the district has published - report tables, any charts, and the site map if it&#x27;s handy?<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1790863392.002491\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"D_OBRANDT_LFISCHER\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Oct 01, 2026 09:03<\/span><\/div><div class=\"vsk-slack-text\">still on. i&#x27;ll bring the district&#x27;s 2025 report so we can go through the tables together - haven&#x27;t pulled the site map file yet.<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1790874893.668273\" data-slack-user=\"U_LFISCHER\" data-slack-channel=\"D_OBRANDT_LFISCHER\"><div class=\"vsk-slack-avatar\" data-user-color=\"#065F46\" data-uid=\"U_LFISCHER\" style=\"background:#065F46\" title=\"U_LFISCHER\">LF<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Lena Fischer<\/span><span class=\"vsk-slack-ts\">Oct 01, 2026 12:14<\/span><\/div><div class=\"vsk-slack-text\">thanks for coming in!! \u2728 i&#x27;m roughing out the chart sidebar and the quarter-page map this week. can you send me the district&#x27;s site map once you track it down? \ud83d\uddfa\ufe0f<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1791382514.547082\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"D_OBRANDT_LFISCHER\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Oct 07, 2026 09:15<\/span><\/div><div class=\"vsk-slack-text\">station map for the salt spread - the district&#x27;s public one: <span class=\"vsk-slack-link\">MLWD monitoring stations<\/span>. lake names on the map, site codes in the key, like we talked about.<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1791383511.655409\" data-slack-user=\"U_LFISCHER\" data-slack-channel=\"D_OBRANDT_LFISCHER\"><div class=\"vsk-slack-avatar\" data-user-color=\"#065F46\" data-uid=\"U_LFISCHER\" style=\"background:#065F46\" title=\"U_LFISCHER\">LF<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Lena Fischer<\/span><span class=\"vsk-slack-ts\">Oct 07, 2026 09:31<\/span><\/div><div class=\"vsk-slack-text\">perfect, thank you!! \u2728 i&#x27;ll rough in the map this week and share a first pass here \ud83d\udcd0<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1791922246.888088\" data-slack-user=\"U_LFISCHER\" data-slack-channel=\"D_OBRANDT_LFISCHER\"><div class=\"vsk-slack-avatar\" data-user-color=\"#065F46\" data-uid=\"U_LFISCHER\" style=\"background:#065F46\" title=\"U_LFISCHER\">LF<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Lena Fischer<\/span><span class=\"vsk-slack-ts\">Oct 13, 2026 15:10<\/span><\/div><div class=\"vsk-slack-text\">hiya! roughing out the monarch column page. ok to run the USFWS tagging photo with a credit line? \ud83d\udcf8 and which way is the badge leaning - &quot;misleading&quot; or &quot;needs context&quot;?<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1791923200.467614\" data-slack-user=\"U_OBRANDT\" data-slack-channel=\"D_OBRANDT_LFISCHER\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0369A1\" data-uid=\"U_OBRANDT\" style=\"background:#0369A1\" title=\"U_OBRANDT\">OB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Owen Brandt<\/span><span class=\"vsk-slack-ts\">Oct 13, 2026 15:26<\/span><\/div><div class=\"vsk-slack-text\">re the monarch page - the USFWS photo is fine with a credit line. badge should be &quot;needs context.&quot; &quot;misleading&quot; would claim more than the column does. hana has the final say once she&#x27;s edited it.<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1793220073.019684\" data-slack-user=\"U_LFISCHER\" data-slack-channel=\"D_OBRANDT_LFISCHER\"><div class=\"vsk-slack-avatar\" data-user-color=\"#065F46\" data-uid=\"U_LFISCHER\" style=\"background:#065F46\" title=\"U_LFISCHER\">LF<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Lena Fischer<\/span><span class=\"vsk-slack-ts\">Oct 28, 2026 15:41<\/span><\/div><div class=\"vsk-slack-text\">hiya! for the viral chart sidebar, could you grab the original fb post? name, avatar and share count - it reads way more real than the chart on its own \u2728<\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1793220073.019684\"><div class=\"vsk-slack-thread-head\">1 reply<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1793220777.729520\" data-slack-user=\"U_LFISCHER\" data-slack-channel=\"D_OBRANDT_LFISCHER\"><div class=\"vsk-slack-avatar\" data-user-color=\"#065F46\" data-uid=\"U_LFISCHER\" style=\"background:#065F46\" title=\"U_LFISCHER\">LF<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Lena Fischer<\/span><span class=\"vsk-slack-ts\">Oct 28, 2026 15:52<\/span><\/div><div class=\"vsk-slack-text\">no rush - the sidebar&#x27;s still a gray box in the rough layout. it&#x27;s two columns wide, so a straight screenshot of the post would drop right in<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1793220143.733376\" data-slack-user=\"U_LFISCHER\" data-slack-channel=\"D_OBRANDT_LFISCHER\"><div class=\"vsk-slack-avatar\" data-user-color=\"#065F46\" data-uid=\"U_LFISCHER\" style=\"background:#065F46\" title=\"U_LFISCHER\">LF<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Lena Fischer<\/span><span class=\"vsk-slack-ts\">Oct 28, 2026 15:42<\/span><\/div><div class=\"vsk-slack-text\">also - any field pics from sampling day with people in them? \ud83d\udcf8<\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1793220143.733376\"><div class=\"vsk-slack-thread-head\">1 reply<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1793220251.686802\" data-slack-user=\"U_LFISCHER\" data-slack-channel=\"D_OBRANDT_LFISCHER\"><div class=\"vsk-slack-avatar\" data-user-color=\"#065F46\" data-uid=\"U_LFISCHER\" style=\"background:#065F46\" title=\"U_LFISCHER\">LF<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Lena Fischer<\/span><span class=\"vsk-slack-ts\">Oct 28, 2026 15:44<\/span><\/div><div class=\"vsk-slack-text\">even just hands holding a sample bottle or someone at the waterline would make the opener feel real. and what credit line do you want on the field shots?<\/div><\/div><\/div><\/div><\/div><\/section><\/main><\/div><\/div>";
(function () {
  var base = renderServer;
  renderServer = function (name) {
    var key = String(name).replace(/-/g, '_');
    var frag = SKIN_HTML[name];
    if (frag === undefined) frag = SKIN_HTML[key];
    if (frag === undefined) return base(name);
    var data = SEED[name];
    if (!data) return '<p class="empty-state">No data for ' + name + '</p>';
    return renderHeroStats(key, data) + frag;
  };
})();

const DATA_NAV  = __UV.c["DATA_NAV"];
const TENSIONS  = __UV.c["TENSIONS"];
const PERSONA   = __UV.c["PERSONA"];

function personaNowSeconds() {
  const raw = PERSONA && PERSONA.now;
  if (raw) {
    const day = String(raw).slice(0, 10);
    const parsed = Date.parse(day + 'T12:00:00Z');
    if (!Number.isNaN(parsed)) return parsed / 1000;
  }
  return Date.now() / 1000;
}
const COUNTS    = __UV.c["COUNTS"];
const MARKDOWN = __UV.markdown;
const GITHUB_VIEWER_HTML = "";
// Emoji shortcodes, {codes: {name: glyph}, tones: {"skin-tone-2": modifier}}. Injected by
// build_viewer from viewer_skins.EMOJI_SHORTCODES, the same table the Slack skin reads,
// so a reaction cannot render as a glyph in one pane and as ":eyes:" in another.
const VA_EMOJI = __UV.c["VA_EMOJI"];
// {path: 1} for every filesystem row whose bytes live in seed_data_files_rendered/ AND
// were on disk when the viewer was built. null means "not computed": trust the uri.
const VA_RENDERED = __UV.c["VA_RENDERED"];

'use strict';
// Persona timezone - substituted by build_viewer.py from persona_profile.json::persona.timezone.
// Renders every stored Unix timestamp in this zone. Stored timestamps must be REAL UTC
// (the actual physical UTC moment of the persona-local event). See universe-validate-fix
// SKILL.md for the timestamp architecture.
const TZ = "America/Chicago";

function tsToMs(ts) {
  if (!ts) return 0;
  if (typeof ts === 'number') return ts > 1e12 ? ts : ts * 1000;
  return new Date(ts).getTime() || 0;
}
function fmtDT(ts) {
  if (!ts) return '';
  return new Date(tsToMs(ts)).toLocaleString('en-US',{timeZone:TZ,month:'short',day:'numeric',year:'numeric',hour:'numeric',minute:'2-digit'});
}
function fmtDate(ts) {
  if (!ts) return '';
  return new Date(tsToMs(ts)).toLocaleString('en-US',{timeZone:TZ,month:'short',day:'numeric'});
}
function fmtTime(ts) {
  if (!ts) return '';
  return new Date(tsToMs(ts)).toLocaleTimeString('en-US',{timeZone:TZ,hour:'numeric',minute:'2-digit'});
}
function fmtDateKey(ts) {
  if (!ts) return '';
  return new Intl.DateTimeFormat('en-CA',{timeZone:TZ,year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(tsToMs(ts)));
}
function isLate(ts) {
  const h = parseInt(new Intl.DateTimeFormat('en-US',{timeZone:TZ,hour:'numeric',hour12:false}).format(new Date(tsToMs(ts))));
  return h >= 22 || h < 5;
}
function initials(name) {
  return (name||'?').split(/\s+/).slice(0,2).map(w=>w[0]||'').join('').toUpperCase();
}
function hslBg(s) {
  let h=0; for(let i=0;i<s.length;i++) h=(h*31+s.charCodeAt(i))&0xffffffff;
  return `hsl(${Math.abs(h)%360},40%,25%)`;
}
function hslFg(s) {
  let h=0; for(let i=0;i<s.length;i++) h=(h*31+s.charCodeAt(i))&0xffffffff;
  return `hsl(${Math.abs(h)%360},70%,75%)`;
}
function esc(s) {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function attrEsc(s) {
  return esc(s).replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
function cleanContent(s) {
  if (!s) return '';
  var t = String(s);
  // Strip markdown email headers
  t = t.replace(/\*\*Subject:\*\*[^\n]*\n?/g, '');
  t = t.replace(/\*\*From:\*\*[^\n]*\n?/g, '');
  t = t.replace(/\*\*To:\*\*[^\n]*\n?/g, '');
  t = t.replace(/\*\*Date:\*\*[^\n]*\n?/g, '');
  t = t.replace(/\*\*CC:\*\*[^\n]*\n?/g, '');
  // Strip bold markers
  t = t.replace(/\*\*/g, '');
  // Strip Subject: prefix
  t = t.replace(/^Subject:\s*/i, '');
  // Strip [User] placeholders
  t = t.replace(/\[User\]/g, '');
  t = t.trim();
  return esc(t);
}
function trunc(s,n) { return s&&s.length>n ? s.slice(0,n)+'…' : (s||''); }
function money(v) { return '$'+Math.abs(v||0).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}); }
// Coerce a value to an array. Some universes are dumped straight from a DB
// where list/JSON columns arrive as JSON-encoded STRINGS (e.g. airtable
// tables.fields = "[{...}]", messaging participant_ids = "[\"A\",\"B\"]").
// _arr parses those so renderers can rely on array methods.
function _arr(v){
  if (Array.isArray(v)) return v;
  if (typeof v === 'string') { try { const p = JSON.parse(v); return Array.isArray(p) ? p : []; } catch(e){ return []; } }
  return [];
}
function _obj(v){
  if (v && typeof v === 'object' && !Array.isArray(v)) return v;
  if (typeof v === 'string') { try { const p = JSON.parse(v); return (p && typeof p === 'object' && !Array.isArray(p)) ? p : {}; } catch(e){ return {}; } }
  return {};
}

// ── Navigation ───────────────────────────────────────────────────────────────
let _curServer = null;

function navTo(id, isServer) {
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.panel').forEach(el => el.classList.remove('active'));
  const navEl = document.querySelector(`[data-nav="${id}"]`);
  if (navEl) navEl.classList.add('active');
  if (isServer) {
    _curServer = id;
    document.getElementById('panel-server').classList.add('active');
    const m = DATA_NAV.find(d=>d.id===id)||{};
    document.getElementById('sv-title').textContent = `${m.emoji||''} ${m.label||id}`;
    document.getElementById('sv-sub').textContent = `${(m.count||0).toLocaleString()} ${m.unit||'records'}${m.sub ? ' · ' + m.sub : ''}`;
    document.getElementById('sv-content').innerHTML = renderServer(id);
  } else {
    const p = document.getElementById('panel-'+id);
    if (p) p.classList.add('active');
    if (id==='overview') renderOverview();
    if (id==='timeline') renderTimeline();
  }
  // Scroll panel to top
  const active = document.querySelector('.panel.active');
  if (active) active.scrollTop = 0;
}

function buildSidebar() {
  const c = document.getElementById('data-nav-items');
  for (const item of DATA_NAV) {
    const div = document.createElement('div');
    div.className = 'nav-item';
    div.dataset.nav = item.id;
    div.innerHTML = `<span class="nav-emoji">${item.emoji}</span> ${item.label} <span class="nav-count">${item.count}</span>`;
    div.onclick = () => navTo(item.id, true);
    c.appendChild(div);
  }
}

// ── Overview ─────────────────────────────────────────────────────────────────
// Collect every dated record across all servers into a unified timeline.
// Returns array of {ts, server, collection, idx, title, snippet, raw}.
function buildUnifiedTimeline() {
  const TS_FIELDS = ['timestamp','start_datetime','last_updated','ts','created_at','updated_at','start_date','date','start_unix','due_date'];
  const out = [];
  function parseTs(v) {
    if (v == null || v === '' || v === 0) return 0;
    if (typeof v === 'number') return v;
    if (typeof v === 'string') {
      if (/^\d{4}-\d{2}-\d{2}$/.test(v)) { const [y, mo, d] = v.split('-').map(Number); return new Date(y, mo - 1, d, 12).getTime() / 1000; }
      const n = parseFloat(v); if (!isNaN(n) && v.match(/^[0-9.]+$/)) return n;
      const s = v.endsWith('Z') ? v.slice(0,-1)+'+00:00' : v;
      const d = new Date(s);
      if (!isNaN(d.getTime())) return d.getTime()/1000;
    }
    return 0;
  }
  function pickTs(rec) {
    for (const f of TS_FIELDS) {
      if (f in rec) {
        const t = parseTs(rec[f]);
        if (t > 1000000000 && t < 4000000000) return t;
      }
    }
    return 0;
  }
  function recTitle(rec, server, collection) {
    if (server === 'email') return rec.subject || '(no subject)';
    if (server === 'calendar') return rec.title || '(untitled event)';
    if (server === 'messaging') {
      const map = buildMessagingNameMap();
      const names = (rec.participant_ids||[]).slice(0,2).map(id => resolveMsgParty(id, map));
      return rec.title || `Conversation with ${names.join(', ')}`;
    }
    if (server === 'fintrack') return `${rec.merchant || '(merchant)'} · ${rec.amount != null ? (rec.amount < 0 ? '-' : '+') + '$' + Math.abs(rec.amount).toFixed(2) : ''}`;
    if (server === 'slack') return rec.text ? rec.text.slice(0,80) : '(slack)';
    if (server === 'strava') return rec.name || rec.type || '(activity)';
    if (server === 'linear') return rec.title || '(issue)';
    if (server === 'notion') return rec.title || '(page)';
    if (server === 'reminder') return rec.title || '(reminder)';
    if (server === 'garmin_health') {
      if (collection === 'activities') return rec.activity_name || rec.activity_type || '(activity)';
      if (collection === 'daily_stats') return `Daily summary · ${(rec.steps||0).toLocaleString()} steps`;
      return `${collection.replace(/_/g, ' ')} · ${rec.date || ''}`;
    }
    if (server === 'ticketmaster') return rec.name || '(event)';
    return rec.title || rec.name || rec.subject || `${collection}[${rec.id != null ? String(rec.id).slice(0,8) : '?'}]`;
  }
  function recSnippet(rec, server) {
    if (server === 'email') return (rec.content || '').slice(0, 90);
    if (server === 'calendar') return (rec.location || rec.description || '').slice(0,90);
    if (server === 'fintrack') return rec.category || '';
    if (server === 'slack') return '';
    if (server === 'messaging') return rec.messages && rec.messages.length ? (rec.messages[rec.messages.length-1].content||'').slice(0,80) : '';
    return (rec.description || rec.content || '').slice(0,90);
  }
  for (const [server, data] of Object.entries(SEED || {})) {
    if (!data || typeof data !== 'object') continue;
    for (const [collection, items] of Object.entries(data)) {
      if (!Array.isArray(items)) continue;
      items.forEach((rec, idx) => {
        if (!rec || typeof rec !== 'object') return;
        const ts = pickTs(rec);
        if (!ts) return;
        out.push({
          ts, server, collection, idx,
          title: recTitle(rec, server, collection),
          snippet: recSnippet(rec, server),
        });
      });
    }
  }
  out.sort((a,b) => b.ts - a.ts);
  return out;
}

// Compute per-day record counts for the heatmap. Returns {dateKey: count}.
function buildHeatmap(timeline) {
  const byDay = {};
  for (const e of timeline) {
    const k = fmtDateKey(e.ts);
    if (!k) continue;
    byDay[k] = (byDay[k] || 0) + 1;
  }
  return byDay;
}

// The declared universe span controls activity views. Entity metadata such as
// an account creation date or a route's original publication date can predate
// the corpus without turning a two-year universe into a seven-year heatmap.
function getDateRange(timeline) {
  const declared = Array.isArray(PERSONA.date_range) ? PERSONA.date_range : [];
  if (declared.length >= 2) {
    const startKey = String(declared[0]).slice(0,10);
    const endKey = String(declared[1]).slice(0,10);
    const start = new Date(startKey + 'T12:00:00Z').getTime()/1000;
    const end = new Date(endKey + 'T12:00:00Z').getTime()/1000;
    if (Number.isFinite(start) && Number.isFinite(end) && end >= start) {
      return {start, end, startKey, endKey, declared:true};
    }
  }
  if (timeline.length) {
    const start = timeline[timeline.length-1].ts;
    const end = timeline[0].ts;
    return {start, end, startKey:fmtDateKey(start), endKey:fmtDateKey(end), declared:false};
  }
  const end = personaNowSeconds();
  const start = end - 180*86400;
  return {start, end, startKey:fmtDateKey(start), endKey:fmtDateKey(end), declared:false};
}

function timelineWithinRange(timeline, range) {
  return timeline.filter(e => {
    const key = fmtDateKey(e.ts);
    return key && key >= range.startKey && key <= range.endKey;
  });
}

function formatRangeDate(key) {
  return new Date(key + 'T12:00:00Z').toLocaleDateString(
    'en-US', {month:'short',day:'numeric',year:'numeric',timeZone:'UTC'}
  );
}

function renderActivityHeatmap(byDay, range) {
  const start = new Date(range.startKey + 'T00:00:00Z');
  const end = new Date(range.endKey + 'T00:00:00Z');
  // Snap start to the previous Sunday for proper column alignment
  const startDay = new Date(start);
  startDay.setDate(startDay.getDate() - startDay.getDay()); // back to Sunday
  startDay.setHours(0,0,0,0);
  const cells = [];
  const monthMarkers = [];
  const cursor = new Date(startDay);
  let lastMonth = -1;
  let colIdx = 0;
  while (cursor <= end) {
    const dow = cursor.getDay();
    if (dow === 0 && cursor.getMonth() !== lastMonth) {
      monthMarkers.push({ col: colIdx, label: cursor.toLocaleString('en-US',{month:'short'}) });
      lastMonth = cursor.getMonth();
    }
    const key = cursor.toISOString().slice(0,10);
    const count = byDay[key] || 0;
    cells.push({ key, count, dow, col: colIdx, date: new Date(cursor) });
    cursor.setDate(cursor.getDate() + 1);
    if (cursor.getDay() === 0) colIdx++;
  }
  // Compute intensity buckets
  const counts = cells.map(c => c.count).filter(c => c > 0).sort((a,b)=>a-b);
  const q = (p) => counts.length ? counts[Math.floor(counts.length * p)] : 0;
  const t1 = Math.max(1, q(0.25));
  const t2 = Math.max(t1+1, q(0.55));
  const t3 = Math.max(t2+1, q(0.85));
  function lvClass(c) {
    if (c <= 0) return '';
    if (c <= t1) return 'lv1';
    if (c <= t2) return 'lv2';
    if (c <= t3) return 'lv3';
    return 'lv4';
  }
  const maxCol = colIdx;
  let h = '<div class="heatmap-wrap">';
  if (monthMarkers.length) {
    h += '<div class="hm-month-labels" style="grid-template-columns:repeat(' + (maxCol+1) + ', 12px)">';
    // Each label starts at its own month's first column and runs to the next month. A one-column partial
    // month is left blank so its label cannot overprint the next one.
    if (monthMarkers[0].col > 0) h += `<div style="grid-column:span ${monthMarkers[0].col}"></div>`;
    monthMarkers.forEach((m, k) => {
      const next = k + 1 < monthMarkers.length ? monthMarkers[k + 1].col : maxCol + 1;
      const span = next - m.col;
      h += `<div style="grid-column:span ${span};text-align:left">${span >= 2 ? m.label : ''}</div>`;
    });
    h += '</div>';
  }
  h += '<div class="heatmap">';
  for (const cell of cells) {
    const cls = lvClass(cell.count);
    const dateLabel = cell.date.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric',year:'numeric'});
    const tip = cell.count ? `${cell.count} record${cell.count===1?'':'s'} on ${dateLabel}` : `No activity on ${dateLabel}`;
    h += `<div class="hm-cell ${cls}" title="${esc(tip)}" style="grid-row:${cell.dow+1};grid-column:${cell.col+1}"></div>`;
  }
  h += '</div>';
  h += '<div class="hm-legend">Less <div class="hm-cell"></div><div class="hm-cell lv1"></div><div class="hm-cell lv2"></div><div class="hm-cell lv3"></div><div class="hm-cell lv4"></div> More</div>';
  h += '</div>';
  return h;
}

function pulseParseParty(raw) {
  const s = String(raw == null ? '' : raw).trim();
  const m = s.match(/^(.*?)\s*<\s*([^<>\s]+@[^<>\s]+)\s*>$/);
  if (m) return {name: m[1].trim().replace(/^"(.*)"$/, '$1').trim(), email: m[2].toLowerCase()};
  if (/^[^\s<>@]+@[^\s<>@]+$/.test(s)) return {name: '', email: s.toLowerCase()};
  return {name: s, email: ''};
}

// Conversation partners, most interactions first. Email parties are tallied by address; 1:1 text conversations are
// added to the same person through the contact record (its email, else its id). The persona (contacts.is_user),
// its own address and automated senders are left out, and correspondents the persona has written to come first.
function pulsePartnerRanking() {
  const AUTOMATED = /no-?reply|no\.reply|notification|automated|donotreply/i;
  const contacts = (SEED.contacts && SEED.contacts.contacts) || [];
  const self = contacts.find(c => c.is_user) || {};
  const selfIds = new Set([self.contact_id, (SEED.messaging && SEED.messaging.current_user_id) || ''].filter(Boolean));
  const selfMail = new Set([self.email, self.work_email].filter(Boolean).map(x => String(x).toLowerCase()));
  const nameOf = c => [c.first_name, c.last_name].filter(x => x && x !== '-').join(' ');
  const byMail = {};
  for (const c of contacts) for (const e of [c.email, c.work_email]) if (e) byMail[String(e).toLowerCase()] = c;
  const tally = {}, order = [], wrote = {};
  function bump(key, n, source, name, email) {
    let t = tally[key];
    if (!t) { t = tally[key] = {key, email, count: 0, names: {}, sources: {}}; order.push(t); }
    t.count += n;
    t.sources[source] = (t.sources[source] || 0) + n;
    if (name) t.names[name] = (t.names[name] || 0) + n;
  }
  for (const e of (SEED.email && SEED.email.emails) || []) {
    const from = pulseParseParty(e.sender);
    const fromSelf = selfMail.has(from.email);
    for (const raw of (Array.isArray(e.recipients) ? e.recipients : []).concat(e.sender != null ? [e.sender] : [])) {
      if (typeof raw !== 'string') continue;
      const p = pulseParseParty(raw);
      if (!p.email || selfMail.has(p.email)) continue;
      bump('mail:' + p.email, 1, 'email', p.email === from.email ? p.name : '', p.email);
      if (fromSelf) wrote['mail:' + p.email] = 1;
    }
  }
  const byId = {};
  for (const c of contacts) byId[c.contact_id] = c;
  for (const cv of (SEED.messaging && SEED.messaging.conversations) || []) {
    const others = (cv.participant_ids || []).filter(p => !selfIds.has(p));
    if (others.length !== 1 || !byId[others[0]]) continue;
    const c = byId[others[0]];
    const mail = String(c.email || c.work_email || '').toLowerCase();
    const key = mail ? 'mail:' + mail : 'contact:' + c.contact_id;
    const msgs = cv.messages || [];
    bump(key, msgs.length, 'texts', nameOf(c), mail);
    if (msgs.some(m => selfIds.has(m.sender_id))) wrote[key] = 1;
  }
  const pretty = s => s.split(/[._]/).filter(Boolean).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const out = [];
  for (const t of order) {
    if (t.email && AUTOMATED.test(t.email)) continue;
    const c = t.email ? byMail[t.email] : null;
    const named = Object.entries(t.names).sort((a, b) => b[1] - a[1])[0];
    const name = ((c && nameOf(c)) || (named ? named[0] : '') || (t.email ? pretty(t.email.split('@')[0]) : '')).trim();
    if (!name || (c && c.is_user)) continue;
    out.push({name, email: t.email, count: t.count, sources: Object.keys(t.sources), twoWay: !!wrote[t.key]});
  }
  const pool = out.some(x => x.twoWay) ? out.filter(x => x.twoWay) : out;
  return pool.sort((a, b) => b.count - a.count);
}

function renderPulseCards(timeline, byDay) {
  // Card 1: Peak day
  let peakDay = '', peakCount = 0;
  for (const [k, c] of Object.entries(byDay)) {
    if (c > peakCount) { peakCount = c; peakDay = k; }
  }
  const peakDate = peakDay ? new Date(peakDay + 'T12:00:00Z').toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}) : '';
  // Sparkline: last 30 days
  const last30 = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today); d.setDate(d.getDate() - i);
    const k = new Intl.DateTimeFormat('en-CA',{year:'numeric',month:'2-digit',day:'2-digit'}).format(d);
    last30.push(byDay[k] || 0);
  }
  const maxL30 = Math.max(1, ...last30);
  let sparkH = '<div class="pulse-spark">';
  for (const v of last30) {
    const h = Math.max(2, Math.round((v / maxL30) * 24));
    sparkH += `<div class="pulse-spark-bar" style="height:${h}px"></div>`;
  }
  sparkH += '</div>';

  // Card 2: top conversation partner, from pulsePartnerRanking(): one tally per person across email and 1:1 texts,
  // the persona, its own address and automated senders left out.
  const ptn = pulsePartnerRanking()[0] || null;
  const topPartner = ptn ? ptn.name : '', topPartnerCount = ptn ? ptn.count : 0;

  // Card 3: largest single outflow in the ledger. Moves between the persona's own accounts (transfers, card payments,
  // retirement contributions) are not outflows and are left out.
  const INTERNAL = {transfer: 1, credit_card_payment: 1, payment: 1, investment: 1};
  let topCat = '', topCatAmt = 0, topTxn = null;
  for (const t of (SEED.fintrack && SEED.fintrack.transactions) || []) {
    const amt = parseFloat(t.amount);
    if (isNaN(amt) || amt >= 0 || INTERNAL[t.category]) continue;
    if (Math.abs(amt) > topCatAmt) { topCatAmt = Math.abs(amt); topCat = t.category || 'uncategorized'; topTxn = t; }
  }
  const catLabel = topCat.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  let h = '<div class="ov-grid">';
  // Peak day
  h += '<div class="pulse-card"><div class="pulse-label">Peak Activity</div>';
  h += `<div class="pulse-value">${peakCount}</div>`;
  h += `<div class="pulse-detail">records on ${esc(peakDate || 'no data')}</div>`;
  h += sparkH;
  h += '</div>';
  // Top partner
  h += '<div class="pulse-card"><div class="pulse-label">Closest Contact</div>';
  h += `<div class="pulse-value" style="font-size:24px">${esc(topPartner || '-')}</div>`;
  const ptnVia = ptn ? ptn.sources.join(' + ') : '';
  h += `<div class="pulse-detail">${topPartnerCount} interactions${ptnVia ? ' · ' + esc(ptnVia) : ''}</div>`;
  h += sparkH.replace(/var\(--accent-dim\)/g, 'var(--accent2)');
  h += '</div>';
  // Top spend category
  h += '<div class="pulse-card"><div class="pulse-label">Largest Outflow</div>';
  h += `<div class="pulse-value" style="font-family:var(--font-mono);font-size:26px">$${Math.round(topCatAmt).toLocaleString()}</div>`;
  h += `<div class="pulse-detail">${esc(topTxn ? (topTxn.merchant || '') + ' · ' + topTxn.date + ' · ' + catLabel : '-')}</div>`;
  h += sparkH;
  h += '</div>';
  h += '</div>';
  return h;
}

function renderActivityFeed(timeline) {
  if (!timeline.length) return '';
  let h = '<div class="ov-sec-hdr"><div class="ov-sec-title">Recent Activity</div><div class="ov-sec-note">Last 12 records, all servers</div></div>';
  h += '<div class="ov-card"><div class="ov-feed">';
  for (const ev of timeline.slice(0, 12)) {
    const meta = DATA_NAV.find(d => d.id === ev.server) || {};
    const emoji = meta.emoji || '📄';
    const label = meta.label || ev.server;
    const when = fmtDT(ev.ts);
    h += `<div class="feed-item" onclick="navTo('${ev.server}',true)">`;
    h += `<div class="feed-emoji">${emoji}</div>`;
    h += `<div class="feed-content"><div class="feed-title">${esc(ev.title)}</div>`;
    if (ev.snippet) h += `<div class="feed-snippet">${esc(ev.snippet)}</div>`;
    h += `</div>`;
    h += `<div class="feed-meta"><div class="feed-server">${esc(label)}</div><span class="ts">${esc(when)}</span></div>`;
    h += `</div>`;
  }
  h += '</div></div>';
  return h;
}

function renderOverview() {
  const contacts = (SEED.contacts||{}).contacts||[];
  const name = PERSONA.name||'Persona';
  const sub  = PERSONA.subtitle||'';
  const total = Object.values(COUNTS).reduce((a,b)=>a+b,0);
  const identity = PERSONA.identity || {};
  const fullTimeline = buildUnifiedTimeline();
  const range = getDateRange(fullTimeline);
  const timeline = timelineWithinRange(fullTimeline, range);
  const byDay = buildHeatmap(timeline);
  const startDate = formatRangeDate(range.startKey);
  const endDate = formatRangeDate(range.endKey);

  let h = '';
  // Cover
  h += '<div class="ov-cover">';
  h += '<div class="ov-cover-classification">Subject Dossier · Confidential</div>';
  h += '<div class="ov-persona-card">';
  h += `<div class="ov-avatar">${initials(name)}</div>`;
  h += `<div>`;
  h += `<div class="ov-name">${esc(name)}</div>`;
  if (sub) h += `<div class="ov-subtitle">${esc(sub)}</div>`;
  // Identity chips
  const SHOW = ['Age','Role','Location'];
  const chips = SHOW.filter(k => identity[k]);
  if (chips.length) {
    h += `<div class="ov-chips">`;
    for (const k of chips) h += `<span class="ov-chip">${esc(identity[k])}</span>`;
    h += `</div>`;
  }
  h += `</div>`;
  // Right meta
  h += `<div class="ov-meta">`;
  h += `<div><span class="ov-meta-label">Period</span><br><span class="ov-meta-val">${esc(startDate)}</span></div>`;
  h += `<div style="margin-top:4px"><span class="ov-meta-label">Through</span><br><span class="ov-meta-val">${esc(endDate)}</span></div>`;
  h += `<div style="margin-top:6px"><span class="ov-meta-label">Records</span><br><span class="ov-meta-val">${total.toLocaleString()}</span></div>`;
  h += `</div>`;
  h += '</div></div>';

  // Pulse cards
  h += renderPulseCards(timeline, byDay);

  // Heatmap
  h += '<div class="ov-sec-hdr"><div class="ov-sec-title">Activity Density</div>';
  h += `<div class="ov-sec-note">${timeline.length.toLocaleString()} dated records</div></div>`;
  h += renderActivityHeatmap(byDay, range);

  // Activity feed
  h += renderActivityFeed(timeline);

  // Tensions + people in 2-col
  h += '<div class="ov-sec-hdr"><div class="ov-sec-title">Tensions &amp; Relationships</div>';
  h += '<div class="ov-sec-note">Risk surface & close contacts</div></div>';
  h += '<div class="ov-grid" style="grid-template-columns:1fr 1fr">';
  // Tensions
  h += `<div class="ov-card" style="padding:14px">`;
  const TCOLORS=['var(--accent)','var(--accent2)','var(--orange)','var(--green)','var(--blue)','var(--yellow)','var(--red)'];
  for (const t of TENSIONS) {
    const c = TCOLORS[(t.n-1)%TCOLORS.length];
    h += `<div class="tension-row" style="border-left-color:${c}">`;
    h += `<div class="t-num">Tension T${t.n}</div><div class="t-title">${esc(t.title)}</div></div>`;
  }
  h += `</div>`;
  // People
  h += `<div class="ov-card" style="padding:14px">`;
  const people = contacts.filter(c=>!c.is_user && c.first_name && typeof c.first_name==='string');
  for (const p of people.slice(0,8)) {
    const fullName = `${p.first_name||''} ${p.last_name||''}`.trim();
    h += `<div class="person-row" onclick="showContact('${p.contact_id}')">`;
    h += `<div class="pa" style="background:${hslBg(fullName)};color:${hslFg(fullName)}">${initials(fullName)}</div>`;
    h += `<div style="min-width:0;flex:1"><div style="font-size:13px;font-weight:600;line-height:1.3">${esc(fullName)}</div>`;
    h += `<div style="font-size:11px;color:var(--muted);margin-top:1px">${esc(p.job||p.description||'')}</div></div></div>`;
  }
  h += `</div>`;
  h += `</div>`;

  // Server tiles
  h += '<div class="ov-sec-hdr"><div class="ov-sec-title">Source Servers</div>';
  h += `<div class="ov-sec-note">${Object.keys(COUNTS).length} services · click to inspect</div></div>`;
  h += `<div class="ov-scale"><div class="scale-grid">`;
  for (const [srv,cnt] of Object.entries(COUNTS)) {
    const m = DATA_NAV.find(d=>d.id===srv)||{};
    h += `<div class="scale-tile" onclick="navTo('${srv}',true)">`;
    h += `<div class="s-emoji">${m.emoji||'📦'}</div>`;
    h += `<div class="s-count">${cnt.toLocaleString()}</div>`;
    h += `<div class="s-label">${esc(m.label||srv)}</div></div>`;
  }
  h += `</div></div>`;

  document.getElementById('ov-content').innerHTML = h;
}

// ── Per-server hero stats ────────────────────────────────────────────────────
// Compute 3-4 high-signal stats per server. Returns HTML string for the strip
// (empty string when nothing relevant).
function renderHeroStats(server, data) {
  const stats = [];

  function add(label, value, detail, mono) {
    stats.push({label, value, detail, mono});
  }

  if (server === 'email' && data && data.emails) {
    const emails = data.emails;
    const unread = emails.filter(e => !e.is_read).length;
    const threads = new Set();
    for (const e of emails) {
      if (e.parent_id) {
        // walk up
        let cur = e; let depth = 0;
        while (cur && cur.parent_id && depth < 30) {
          const parent = emails.find(x => x.email_id === cur.parent_id);
          if (!parent) break;
          cur = parent; depth++;
        }
        threads.add(cur.email_id || e.email_id);
      } else {
        threads.add(e.email_id);
      }
    }
    const senders = {};
    for (const e of emails) {
      const s = e.sender || '';
      if (!s) continue;
      senders[s] = (senders[s]||0) + 1;
    }
    const topSender = Object.entries(senders).sort((a,b)=>b[1]-a[1])[0];
    add('Unread', unread.toString(), `${Math.round(100*unread/Math.max(1,emails.length))}% of inbox`);
    add('Threads', threads.size.toString(), `${emails.length} messages`, true);
    if (topSender) {
      const handle = topSender[0].includes('<') ? topSender[0].split('<')[0].trim() : topSender[0].split('@')[0];
      add('Top Sender', handle, `${topSender[1]} messages`);
    }
  }

  if (server === 'calendar' && data && data.events) {
    const events = data.events;
    const now = personaNowSeconds();
    const upcoming = events.filter(e => e.start_datetime > now).length;
    const past = events.filter(e => e.start_datetime <= now).length;
    const attendeeCount = {};
    for (const e of events) {
      for (const a of (e.attendees||[])) {
        const name = typeof a === 'string' ? a : (a.name || a.email || '');
        if (name) attendeeCount[name] = (attendeeCount[name]||0) + 1;
      }
    }
    const topAtt = Object.entries(attendeeCount).filter(([n])=>n!==PERSONA.name).sort((a,b)=>b[1]-a[1])[0];
    add('Events', events.length.toString(), `${past} past · ${upcoming} upcoming`, true);
    add('With Attendees', events.filter(e => (e.attendees||[]).length > 0).length.toString(),
        `${Math.round(100*events.filter(e=>(e.attendees||[]).length>0).length/Math.max(1,events.length))}% multi-person`);
    if (topAtt) add('Most Frequent', topAtt[0], `${topAtt[1]} shared events`);
  }

  if (server === 'fintrack' && data) {
    const txns = data.transactions || [];
    const inflow = txns.filter(t => parseFloat(t.amount) > 0).reduce((s,t)=>s+parseFloat(t.amount),0);
    const outflow = txns.filter(t => parseFloat(t.amount) < 0).reduce((s,t)=>s+Math.abs(parseFloat(t.amount)),0);
    const net = inflow - outflow;
    const catTotals = {};
    for (const t of txns) {
      const a = parseFloat(t.amount);
      if (!isNaN(a) && a < 0) {
        const c = t.category || 'uncategorized';
        catTotals[c] = (catTotals[c]||0) + Math.abs(a);
      }
    }
    const topCat = Object.entries(catTotals).sort((a,b)=>b[1]-a[1])[0];
    add('Net Cash Flow', (net >= 0 ? '+' : '-') + '$' + Math.abs(net).toLocaleString('en-US',{maximumFractionDigits:0}),
        `In $${Math.round(inflow).toLocaleString()} · Out $${Math.round(outflow).toLocaleString()}`, true);
    add('Transactions', txns.length.toString(), `${(data.accounts||[]).length} accounts`, true);
    if (topCat) {
      const label = topCat[0].replace(/_/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
      add('Top Category', label, `$${Math.round(topCat[1]).toLocaleString()}`);
    }
  }

  if (server === 'messaging' && data && data.conversations) {
    const convs = data.conversations;
    const totalMsgs = convs.reduce((s,c) => s + (c.messages||[]).length, 0);
    // Find busiest conversation
    let topConv = null, topCount = 0;
    for (const c of convs) {
      const n = (c.messages||[]).length;
      if (n > topCount) { topCount = n; topConv = c; }
    }
    add('Conversations', convs.length.toString(), `${totalMsgs} messages total`, true);
    add('Avg Length', Math.round(totalMsgs/Math.max(1,convs.length)).toString(),
        'messages per thread', true);
    if (topConv) {
      const map = buildMessagingNameMap();
      const names = (topConv.participant_ids||[]).slice(0,2).map(id => resolveMsgParty(id, map));
      const title = topConv.title || `with ${names.join(', ')}`;
      add('Most Active', title.slice(0,30), `${topCount} messages`);
    }
  }

  if (server === 'slack' && data) {
    const channels = (data.channels||[]).filter(c => !c.is_im);
    const dms = (data.channels||[]).filter(c => c.is_im);
    const msgs = data.messages || [];
    add('Channels', channels.length.toString(), `${dms.length} DM conversations`, true);
    add('Messages', msgs.length.toString(), `${(data.users||[]).length} users in workspace`, true);
    // Most active channel
    const byCh = {};
    for (const m of msgs) {
      const k = m.channel || '';
      byCh[k] = (byCh[k]||0) + 1;
    }
    const topChId = Object.entries(byCh).sort((a,b)=>b[1]-a[1])[0];
    if (topChId) {
      const ch = (data.channels||[]).find(c => c.id === topChId[0]);
      add('Most Active', ch ? '#' + ch.name : '(DM)', `${topChId[1]} messages`);
    }
  }

  if (server === 'strava' && data && data.activities) {
    const acts = data.activities;
    const totalDist = acts.reduce((s,a) => s + (parseFloat(a.distance)||0), 0);
    const totalTime = acts.reduce((s,a) => s + (parseFloat(a.moving_time)||0), 0);
    const types = {};
    for (const a of acts) { types[a.type] = (types[a.type]||0) + 1; }
    const topType = Object.entries(types).sort((a,b)=>b[1]-a[1])[0];
    add('Activities', acts.length.toString(), topType ? `${topType[1]} ${topType[0]}s` : '', true);
    add('Distance', (totalDist/1000).toFixed(0) + ' km', `${(totalDist/1609.34).toFixed(0)} mi total`, true);
    add('Active Time', Math.round(totalTime/3600) + 'h', `${Math.round(totalTime/60)} minutes`, true);
  }

  if (server === 'contacts' && data && data.contacts) {
    const ppl = data.contacts.filter(c => !c.is_user);
    add('Contacts', ppl.length.toString(), '1 user · ' + ppl.length + ' contacts', true);
    const withEmail = ppl.filter(c => c.email).length;
    const withPhone = ppl.filter(c => c.phone).length;
    add('With Email', withEmail.toString(), Math.round(100*withEmail/Math.max(1,ppl.length)) + '% coverage');
    add('With Phone', withPhone.toString(), Math.round(100*withPhone/Math.max(1,ppl.length)) + '% coverage');
  }

  if (server === 'linear' && data) {
    const issues = data.issues || [];
    const states = {};
    for (const i of issues) {
      const sName = ((data.workflow_states||data.states||[]).find(s => s.id === i.state_id) || {}).name || 'unknown';
      states[sName] = (states[sName]||0) + 1;
    }
    add('Issues', issues.length.toString(), `${(data.projects||[]).length} projects · ${(data.teams||[]).length} teams`, true);
    const done = (states['Done'] || 0) + (states['Completed'] || 0);
    add('Completion', Math.round(100*done/Math.max(1,issues.length)) + '%', `${done} done of ${issues.length}`, true);
    const topAss = {};
    for (const i of issues) {
      const u = (data.users||[]).find(u => u.id === i.assignee_id);
      if (u) topAss[u.name] = (topAss[u.name]||0) + 1;
    }
    const t = Object.entries(topAss).sort((a,b)=>b[1]-a[1])[0];
    if (t) add('Top Assignee', t[0], `${t[1]} issues`);
  }

  if (server === 'notion' && data) {
    const pages = data.pages || [];
    const dbs = data.databases || [];
    const blocks = data.blocks || [];
    add('Pages', pages.length.toString(), `${dbs.length} databases`, true);
    add('Blocks', blocks.length.toString(), `${Math.round(blocks.length/Math.max(1,pages.length))} avg per page`, true);
  }

  if (!stats.length) return '';
  let h = '<div class="hero-stats">';
  for (const s of stats) {
    h += '<div class="hero-stat">';
    h += `<div class="hero-stat-label">${esc(s.label)}</div>`;
    h += `<div class="hero-stat-value${s.mono?' mono':''}">${esc(s.value)}</div>`;
    if (s.detail) h += `<div class="hero-stat-detail">${esc(s.detail)}</div>`;
    h += '</div>';
  }
  h += '</div>';
  return h;
}

// ── Timeline (cross-server chronological feed) ───────────────────────────────
let _tlActiveServers = null;  // null = all on; otherwise a Set

function renderTimeline() {
  const fullTimeline = buildUnifiedTimeline();
  const range = getDateRange(fullTimeline);
  const timeline = timelineWithinRange(fullTimeline, range);
  // Determine the universe of servers represented
  const serverCounts = {};
  for (const e of timeline) {
    serverCounts[e.server] = (serverCounts[e.server]||0) + 1;
  }
  const servers = Object.keys(serverCounts).sort((a,b) => serverCounts[b] - serverCounts[a]);
  if (_tlActiveServers === null) _tlActiveServers = new Set(servers);

  // Render filter chips
  const filtersEl = document.getElementById('tl-filters');
  let fh = '<div class="tl-filters">';
  fh += `<button class="tl-filter ${_tlActiveServers.size === servers.length ? 'on' : ''}" data-tl-all>All</button>`;
  for (const s of servers) {
    const m = DATA_NAV.find(d => d.id === s) || {};
    const on = _tlActiveServers.has(s);
    fh += `<button class="tl-filter ${on?'on':''}" data-tl="${esc(s)}">`;
    fh += `<span class="tl-emoji">${m.emoji||'📄'}</span><span>${esc(m.label||s)}</span>`;
    fh += `<span class="tl-cnt">${serverCounts[s]}</span></button>`;
  }
  fh += '</div>';
  filtersEl.innerHTML = fh;
  filtersEl.querySelectorAll('[data-tl]').forEach(btn => {
    btn.addEventListener('click', () => {
      const s = btn.dataset.tl;
      if (_tlActiveServers.has(s)) _tlActiveServers.delete(s);
      else _tlActiveServers.add(s);
      if (_tlActiveServers.size === 0) _tlActiveServers = new Set(servers); // never empty
      renderTimeline();
    });
  });
  filtersEl.querySelector('[data-tl-all]')?.addEventListener('click', () => {
    _tlActiveServers = new Set(servers);
    renderTimeline();
  });

  // Group by day
  const filtered = timeline.filter(e => _tlActiveServers.has(e.server));
  const byDay = new Map();
  for (const e of filtered) {
    const k = fmtDateKey(e.ts);
    if (!byDay.has(k)) byDay.set(k, []);
    byDay.get(k).push(e);
  }

  document.getElementById('tl-sub').textContent =
    `${filtered.length.toLocaleString()} records across ${byDay.size} day${byDay.size===1?'':'s'} · ${_tlActiveServers.size} of ${servers.length} sources`;

  let h = '';
  const MAX_DAYS = 60;  // cap rendering to keep DOM lean
  let dayCount = 0;
  for (const [dayKey, items] of byDay) {
    if (dayCount++ >= MAX_DAYS) break;
    const dateObj = new Date(dayKey + 'T12:00:00Z');
    const dateLabel = dateObj.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'});
    h += '<div class="tl-day-group">';
    h += '<div class="tl-day-hdr">';
    h += `<div class="tl-day-date">${esc(dateLabel)}</div>`;
    h += `<div class="tl-day-meta">${items.length} record${items.length===1?'':'s'}</div>`;
    h += '</div>';
    for (const ev of items) {
      const m = DATA_NAV.find(d => d.id === ev.server) || {};
      const emoji = m.emoji || '📄';
      const label = m.label || ev.server;
      const time = fmtTime(ev.ts);
      h += `<div class="tl-item" onclick="navTo('${ev.server}',true)">`;
      h += `<div class="tl-item-emoji">${emoji}</div>`;
      h += `<div class="tl-item-body">`;
      h += `<div class="tl-item-title">${esc(ev.title)}</div>`;
      if (ev.snippet) h += `<div class="tl-item-snip">${esc(ev.snippet)}</div>`;
      h += `</div>`;
      h += `<div class="tl-item-meta"><div class="tl-item-server">${esc(label)}</div>${esc(time)}</div>`;
      h += `</div>`;
    }
    h += '</div>';
  }
  if (dayCount >= MAX_DAYS) {
    h += `<div style="text-align:center;color:var(--muted-2);font-family:var(--font-mono);font-size:11px;padding:20px;letter-spacing:0.06em">Showing the most recent ${MAX_DAYS} days · use filters to narrow the view</div>`;
  }
  if (!filtered.length) {
    h = '<div class="search-empty">No records match the current filter.</div>';
  }
  document.getElementById('tl-content').innerHTML = h;
}

// ── App panes: Plaid, Duffel, Facebook, Instagram, Messenger ─────────────────
// Each pane renders the product it imitates. Generic over the server schema:
// every field is optional, ids are never used as titles, and every value goes
// through vaE() before it reaches markup.
function vaE(s) {
  return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
function vaRows(v) { return _arr(v).filter(x => x && typeof x === 'object'); }
function vaSeed() { try { return (typeof SEED !== 'undefined' && SEED) ? SEED : (window.SEED || {}); } catch (e) { return {}; } }
// An id, a slug or a "table 3" label is not a title.
function vaRawId(s) {
  const t = String(s == null ? '' : s).trim();
  if (!t) return true;
  if (/\s/.test(t)) return /^[a-z_]+ \d+$/i.test(t);
  if (/^[0-9a-f]{12,}$/i.test(t)) return true;
  if (/^[A-Za-z]{2,12}_[A-Za-z0-9_]+$/.test(t)) return true;
  if (/^[A-Za-z0-9]{16,}$/.test(t) && /\d/.test(t)) return true;
  return false;
}
function vaPick() {
  for (let i = 0; i < arguments.length; i++) {
    const v = arguments[i];
    if (v == null || typeof v === 'object') continue;
    const s = String(v).trim();
    if (s && !vaRawId(s)) return s;
  }
  return '';
}
function vaHuman(s) {
  const t = String(s == null ? '' : s).replace(/[_]+/g, ' ').trim().toLowerCase();
  return t ? t.charAt(0).toUpperCase() + t.slice(1) : '';
}
function vaNum(v) { const n = Number(v); return (v === '' || v == null || !Number.isFinite(n)) ? null : n; }
function vaMoney(amount, currency) {
  const n = vaNum(amount);
  if (n == null) return '';
  const cur = /^[A-Z]{3}$/.test(String(currency || '')) ? String(currency) : 'USD';
  try { return new Intl.NumberFormat('en-US', {style: 'currency', currency: cur}).format(n); }
  catch (e) { return (n < 0 ? '-' : '') + '$' + Math.abs(n).toFixed(2); }
}
const VA_MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const VA_DOW = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
function vaYmd(s) { const m = String(s || '').match(/^(\d{4})-(\d{2})-(\d{2})/); return m ? [+m[1], +m[2], +m[3]] : null; }
// Calendar dates ('2026-10-16') are wall dates: never shift them through a zone.
function vaDay(s, withYear) {
  const p = vaYmd(s);
  if (!p) return String(s || '');
  const d = new Date(Date.UTC(p[0], p[1] - 1, p[2]));
  return VA_DOW[d.getUTCDay()] + ', ' + VA_MON[p[1] - 1] + ' ' + p[2] + (withYear === false ? '' : ', ' + p[0]);
}
function vaShortDay(s) { const p = vaYmd(s); return p ? VA_MON[p[1] - 1] + ' ' + p[2] + ', ' + p[0] : String(s || ''); }
function vaHasZone(s) { return /(Z|[+-]\d{2}:?\d{2})$/.test(String(s || '').trim()); }
function vaClock(s) {
  const m = String(s || '').match(/T(\d{2}):(\d{2})/);
  if (!m) return '';
  let h = +m[1]; const ap = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12;
  return h + ':' + m[2] + ' ' + ap;
}
// An instant (Z / offset / epoch) is shown in the persona zone; a zoneless
// timestamp is a local wall time and is shown exactly as written.
function vaWhen(s) {
  if (s == null || s === '') return '';
  if (typeof s === 'number') return fmtDT(s);
  if (vaHasZone(s)) return fmtDT(s);
  const p = vaYmd(s);
  if (!p) return String(s);
  return VA_MON[p[1] - 1] + ' ' + p[2] + ', ' + p[0] + (/T\d{2}:\d{2}/.test(String(s)) ? ', ' + vaClock(s) : '');
}
function vaMs(s) {
  if (s == null || s === '') return 0;
  if (typeof s === 'number') return s > 1e12 ? s : s * 1000;
  const t = Date.parse(vaHasZone(s) || !/T/.test(String(s)) ? s : String(s) + 'Z');
  return Number.isFinite(t) ? t : 0;
}
function vaAgo(s) {
  const ms = vaMs(s);
  if (!ms) return '';
  const now = personaNowSeconds() * 1000;
  const d = Math.round((now - ms) / 86400000);
  if (d >= 0 && d < 1) return fmtTime(ms);
  if (d >= 1 && d < 7) return d + 'd';
  return fmtDate(ms);
}
function vaDur(s) {
  const m = String(s || '').match(/^P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?/);
  if (!m || (!m[1] && !m[2] && !m[3])) return '';
  const h = (+m[1] || 0) * 24 + (+m[2] || 0);
  return (h ? h + 'h ' : '') + (+m[3] || 0) + 'm';
}
function vaAvatar(name, size, img) {
  const n = String(name || '?');
  const cls = 'va-av' + (size ? ' ' + size : '');
  if (img) return '<div class="' + cls + '" style="overflow:hidden;padding:0">' + img + '</div>';
  return '<div class="' + cls + '" style="background:' + hslBg(n) + ';color:' + hslFg(n) + '">' + vaE(initials(n) || '?') + '</div>';
}
function vaTabs(group, tabs) {
  // tabs: [{label, html, key?}] ; the first non-empty tab opens. `key` names a tab so
  // a link elsewhere in the pane can open it (vaTabTo(group, key)) even when an empty
  // tab before it was dropped and the positions moved.
  const live = tabs.filter(t => t && t.html);
  if (!live.length) return '';
  const id = (t, i) => vaE(t.key || String(i));
  let h = '<div class="va-tabs">';
  live.forEach((t, i) => {
    h += '<button class="va-tab' + (i === 0 ? ' on' : '') + '" data-va-group="' + group + '" data-va-tab="' + id(t, i) + '" onclick="vaTab(this)">' + vaE(t.label) + '</button>';
  });
  h += '</div>';
  live.forEach((t, i) => {
    h += '<div class="va-pane' + (i === 0 ? ' va-show' : '') + '" data-va-group="' + group + '" data-va-tab="' + id(t, i) + '">' + t.html + '</div>';
  });
  return h;
}
function vaTab(btn) {
  try {
    const group = btn.getAttribute('data-va-group');
    const tab = btn.getAttribute('data-va-tab');
    document.querySelectorAll('[data-va-group="' + group + '"]').forEach(el => {
      const on = el.getAttribute('data-va-tab') === tab;
      if (el.classList.contains('va-pane') || el.classList.contains('va-ms-pane')) el.classList.toggle('va-show', on);
      else el.classList.toggle('on', on);
    });
    vaHydrate();
  } catch (e) {}
}
function vaTabTo(group, tab) {
  try {
    const btn = document.querySelector('.va-tab[data-va-group="' + group + '"][data-va-tab="' + tab + '"]');
    if (btn) { vaTab(btn); btn.scrollIntoView({block: 'nearest', behavior: 'smooth'}); }
  } catch (e) {}
}

// Media. Big inline payloads are registered once and painted after insertion,
// so a 30 MB photo library never travels through one innerHTML string.
const VA_MEDIA = {};
function vaMediaKey(key, mime, b64, uri) {
  if (!VA_MEDIA[key]) VA_MEDIA[key] = {mime: mime || 'image/jpeg', b64: b64 || '', uri: uri || ''};
  return key;
}
function vaImgTag(key, cls, alt) {
  if (!key) return '';
  // PA-01: a video asset (an Instagram Reel) cannot decode inside an image element.
  const vm = VA_MEDIA[key];
  if (vm && /^video\//i.test(String(vm.mime || ''))) return '<video class="' + (cls || '') + '" aria-label="' + vaE(alt || '') + '" title="' + vaE(alt || '') + '" data-va-src="' + vaE(key) + '" muted playsinline loop preload="metadata"></video>';
  return '<img class="' + (cls || '') + '" alt="' + vaE(alt || '') + '" data-va-src="' + vaE(key) + '" loading="lazy">';
}
function vaB64Clean(b64) { return String(b64 == null ? '' : b64).replace(/^data:[^,]*,/, '').replace(/\s+/g, ''); }
// Inline bytes become ONE blob: URL per payload, shared by every <img> that shows it.
// A data: URI would copy the whole base64 string into each element's src, and the
// Instagram pane shows the same photo in the grid, the feed and the comment list.
function vaBlobUrl(b64, mime) {
  try {
    if (typeof Blob === 'undefined' || typeof URL === 'undefined' || !URL.createObjectURL) return '';
    const bin = atob(vaB64Clean(b64));
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return URL.createObjectURL(new Blob([bytes], {type: mime || 'application/octet-stream'}));
  } catch (e) { return ''; }
}
function vaMediaSrc(key) {
  const m = VA_MEDIA[key];
  if (!m) return '';
  if (m.uri) return m.uri;
  if (!m.url) m.url = vaBlobUrl(m.b64, m.mime) || ('data:' + m.mime + ';base64,' + vaB64Clean(m.b64));
  return m.url;
}
function vaHydrate() {
  try {
    const els = document.querySelectorAll('img[data-va-src], video[data-va-src]');
    for (let i = 0; i < els.length; i++) {
      const el = els[i];
      if (el.getAttribute('src')) continue;
      // Only what is on screen. A hidden tab is painted when it opens (vaTab calls
      // back here), so a photo library is not decoded before anyone looks at it.
      if (el.getClientRects && el.getClientRects().length === 0) continue;
      const src = vaMediaSrc(el.getAttribute('data-va-src'));
      if (src) { el.setAttribute('src', src); if (el.tagName === 'VIDEO' && el.closest && el.closest('.va-modal-img')) el.setAttribute('controls', ''); }
    }
  } catch (e) {}
}
function vaLater() { try { setTimeout(vaHydrate, 0); } catch (e) {} }
let _vaFsIndex = null;
function vaFsFind(path) {
  const p = String(path || '').replace(/\\/g, '/').replace(/^\/+/, '').toLowerCase();
  if (!p) return null;
  if (!_vaFsIndex) {
    _vaFsIndex = {};
    vaRows(((vaSeed().filesystem) || {}).files).forEach(f => {
      const fp = String(f.path || '').replace(/\\/g, '/').replace(/^\/+/, '').toLowerCase();
      if (!fp) return;
      _vaFsIndex[fp] = f;
      const base = fp.split('/').pop();
      if (base && !_vaFsIndex['//' + base]) _vaFsIndex['//' + base] = f;
    });
  }
  return _vaFsIndex[p] || _vaFsIndex['//' + p.split('/').pop()] || null;
}
function vaMimeFor(path, fallback) {
  const ext = String(path || '').split('.').pop().toLowerCase();
  return ({png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif', webp: 'image/webp', svg: 'image/svg+xml'})[ext] || fallback || 'image/jpeg';
}
function vaIsImageMime(m) { return /^image\//i.test(String(m || '')); }
// Resolve any image reference a server might carry: an inline base64 field, a
// data URI, a path into the filesystem server, or a rendered-tree file.
function vaMediaFrom(ref, keyHint) {
  if (!ref) return '';
  if (typeof ref === 'string') {
    const s = ref.trim();
    if (/^data:image\//i.test(s)) return vaMediaKey(keyHint || ('u:' + s.slice(0, 64) + s.length), '', '', s);
    if (/\.(png|jpe?g|gif|webp)$/i.test(s)) {
      const f = vaFsFind(s);
      if (f) {
        if (f.viewer_external && f.viewer_uri) return vaMediaKey('fs:' + f.path, '', '', f.viewer_uri);
        const b = f.content_base64 || f.content_inline_b64 || (String(f.encoding || '').toLowerCase() === 'base64' ? f.content : '');
        if (b) return vaMediaKey('fs:' + f.path, vaMimeFor(f.path), b, '');
      }
    }
    return '';
  }
  if (typeof ref === 'object') {
    const b64 = ref.content_base64 || ref.image_base64 || ref.base64 || ref.data_base64 || '';
    const mime = ref.mime_type || ref.mime || ref.content_type || '';
    if (b64 && typeof b64 === 'string' && b64.length > 20) return vaMediaKey(keyHint || ('o:' + (ref.id || b64.slice(0, 40))), mime || 'image/jpeg', b64, '');
    for (const k of ['url', 'uri', 'src', 'path', 'rel_path', 'file_path', 'image_path', 'photo_path']) {
      const got = vaMediaFrom(ref[k], keyHint);
      if (got) return got;
    }
  }
  return '';
}
function vaMediaList(row) {
  const out = [];
  if (!row || typeof row !== 'object') return out;
  for (const k of ['image', 'images', 'photo', 'photos', 'media', 'attachments', 'picture', 'image_url', 'image_path', 'photo_path', 'image_base64']) {
    const v = row[k];
    if (!v) continue;
    const list = Array.isArray(v) ? v : [k === 'image_base64' ? {content_base64: v, mime_type: row.image_mime || row.mime_type} : v];
    list.forEach(x => { const key = vaMediaFrom(x); if (key && out.indexOf(key) < 0) out.push(key); });
  }
  return out;
}

// ── Emoji ────────────────────────────────────────────────────────────────────
// Shortcode to glyph through VA_EMOJI (one table, shared with the Slack skin). An
// unknown name returns '' so the caller can keep the ":name:" the data carries.
function vaEmoji(name) {
  const T = (typeof VA_EMOJI !== 'undefined' && VA_EMOJI) || {};
  const codes = T.codes || {}, tones = T.tones || {};
  let raw = String(name == null ? '' : name).trim().toLowerCase();
  if (raw.length > 2 && raw.charAt(0) === ':' && raw.charAt(raw.length - 1) === ':') raw = raw.slice(1, -1);
  const parts = raw.split('::');
  let g = codes[parts[0].replace(/^:+|:+$/g, '')] || '';
  if (g && parts[1]) { const mod = tones[parts[1].replace(/:+$/g, '')]; if (mod) g = g.split(String.fromCharCode(0xFE0F)).join('') + mod; }
  return g;
}
// Known :shortcodes: inside ALREADY ESCAPED text become glyphs. The digit guards keep
// clock times out ("7:00-15:30" is a shift, not an emoji), unknown codes stay as typed.
function vaEmojiText(escaped) {
  return String(escaped == null ? '' : escaped).replace(/(?<![0-9]):([a-z0-9_+\-]{1,60}?)(?:::(skin-tone-[1-6]))?:(?![0-9])/g, (m, code, tone) => {
    const g = vaEmoji(code + (tone ? '::' + tone : ''));
    return g ? '<span class="va-emoji" title="' + vaE(m) + '">' + g + '</span>' : m;
  });
}
// A reaction as stored by any app: a glyph, a bare shortcode or a ":shortcode:".
function vaEmojiFace(v) {
  const s = String(v == null ? '' : v).trim();
  if (/^:?[a-z0-9_+\-]+(::skin-tone-[1-6])?:?$/i.test(s)) return vaEmoji(s) || s;
  return s;
}

// ── Attachments ──────────────────────────────────────────────────────────────
// Email, Messages and Messenger all name a file, and most of their rows carry no bytes,
// so ONE resolver turns a name into something paintable. The order is a contract shared
// with the data generators:
//   1. filesystem.json files[] whose basename is the name, Users/user/attachments/<name>
//      first;
//   2. an email attachment with that filename, the asking email's own copy first;
//   3. an Instagram media asset whose rel_path basename or id matches.
// A source that cannot paint is skipped (empty or placeholder bytes, a rendered file that
// was not on disk at build time), an image that still fails to load falls through to the
// next source, and a name that resolves to nothing is a plain file chip. Never a broken
// image, and never a second copy of the bytes: every source points into SEED or at the
// rendered tree.
const VA_ATT_MIME = {
  jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', gif: 'image/gif', webp: 'image/webp',
  svg: 'image/svg+xml', heic: 'image/heic', pdf: 'application/pdf', txt: 'text/plain',
  md: 'text/markdown', csv: 'text/csv', json: 'application/json', ics: 'text/calendar',
  doc: 'application/msword', xls: 'application/vnd.ms-excel', zip: 'application/zip',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  mp4: 'video/mp4', mov: 'video/quicktime', mp3: 'audio/mpeg', m4a: 'audio/mp4',
};
function vaExt(name) { const m = String(name || '').toLowerCase().match(/\.([a-z0-9]{1,5})$/); return m ? m[1] : ''; }
function vaMimeOf(name, fallback) { return VA_ATT_MIME[vaExt(name)] || fallback || 'application/octet-stream'; }
function vaAttKind(mime) {
  const m = String(mime || '').toLowerCase();
  if (/^image\/(jpeg|png|gif|webp|svg\+xml|bmp|avif)$/.test(m)) return 'image';
  if (m === 'application/pdf') return 'pdf';
  return 'file';
}
// What the bytes ARE, from their first characters, so a placeholder or a mislabelled
// payload never reaches an <img>.
function vaSniff(b64) {
  const s = vaB64Clean(b64).slice(0, 16);
  if (s.indexOf('/9j/') === 0) return 'image/jpeg';
  if (s.indexOf('iVBORw0KGgo') === 0) return 'image/png';
  if (s.indexOf('R0lGOD') === 0) return 'image/gif';
  if (s.indexOf('UklGR') === 0) return 'image/webp';
  if (s.indexOf('JVBER') === 0) return 'application/pdf';
  if (s.indexOf('UEsDB') === 0) return 'application/zip';
  return '';
}
function vaB64Ok(b64, mime) {
  const s = vaB64Clean(b64);
  if (s.length < 24 || !/^[A-Za-z0-9+\/]+={0,2}$/.test(s.length > 4096 ? s.slice(0, 4096) : s)) return false;
  const sniff = vaSniff(s), kind = vaAttKind(mime);
  if (kind === 'image') return /^image\//.test(sniff);
  if (kind === 'pdf') return sniff === 'application/pdf';
  if (/officedocument|zip|opendocument/.test(String(mime || ''))) return sniff === 'application/zip';
  return true;
}
function vaB64Size(b64) { const s = vaB64Clean(b64); return Math.max(0, Math.floor(s.length * 3 / 4) - (s.endsWith('==') ? 2 : (s.endsWith('=') ? 1 : 0))); }
function vaBytes(n) {
  n = vaNum(n) || 0;
  if (!n) return '';
  if (n < 1024) return n + ' B';
  if (n < 1048576) return (n / 1024).toFixed(n < 10240 ? 1 : 0) + ' KB';
  return (n / 1048576).toFixed(1) + ' MB';
}
// Normalise every shape an email row uses: {filename: base64}, [names], [{filename,...}].
function vaEmailAtts(e) {
  const out = [];
  let raw = e && e.attachments;
  if (typeof raw === 'string') { try { raw = JSON.parse(raw); } catch (err) { raw = raw ? [raw] : null; } }
  if (!raw || typeof raw !== 'object') return out;
  const push = (name, b64, mime, size) => {
    const nm = String(name || '').split(/[\\/]/).pop().trim();
    if (nm) out.push({name: nm, b64: typeof b64 === 'string' ? b64 : '', mime: mime || '', size: vaNum(size) || 0});
  };
  if (Array.isArray(raw)) {
    raw.forEach(a => {
      if (typeof a === 'string') push(a, '', '', 0);
      else if (a && typeof a === 'object') push(a.filename || a.name || a.title || a.path, a.content_base64 || a.data || a.base64 || a.content, a.mime_type || a.content_type || a.mime, a.size || a.size_bytes);
    });
  } else {
    Object.keys(raw).forEach(name => {
      const v = raw[name];
      if (v && typeof v === 'object') push(name, v.content_base64 || v.data || v.content, v.mime_type || v.content_type, v.size);
      else push(name, v, '', 0);
    });
  }
  return out;
}
let _vaAttIdx = null;
function vaAttIndex() {
  if (_vaAttIdx) return _vaAttIdx;
  const S = vaSeed();
  const fs = {}, mail = {}, ig = {};
  const norm = p => String(p || '').replace(/\\/g, '/').replace(/^\/+/, '');
  vaRows((S.filesystem || {}).files).forEach(f => {
    const base = (norm(f.path).split('/').pop() || String(f.name || f.filename || '')).toLowerCase();
    if (base) (fs[base] = fs[base] || []).push(f);
  });
  const rank = (f, base) => { const p = norm(f.path).toLowerCase(); return p === 'users/user/attachments/' + base ? 0 : (/(^|\/)attachments\//.test(p) ? 1 : 2); };
  Object.keys(fs).forEach(k => fs[k].sort((a, b) => rank(a, k) - rank(b, k)));
  vaRows((S.email || {}).emails).forEach(e => {
    vaEmailAtts(e).forEach(a => { if (a.b64) { const k = a.name.toLowerCase(); (mail[k] = mail[k] || []).push({b64: a.b64, mime: a.mime, ref: String(e.email_id || e.id || ''), size: a.size}); } });
  });
  vaRows((S.instagram || {}).media_assets).forEach(a => {
    [norm(a.rel_path).split('/').pop(), a.id].forEach(k => { k = String(k || '').toLowerCase(); if (k) (ig[k] = ig[k] || []).push(a); });
  });
  _vaAttIdx = {fs, mail, ig};
  return _vaAttIdx;
}
// own: {b64, mime, ref, size} for a record that carries its own copy (an email).
function vaAttResolve(name, own) {
  own = own || {};
  const nm = String(name || '').split(/[\\/]/).pop().trim();
  const key = nm.toLowerCase();
  const mime = VA_ATT_MIME[vaExt(nm)] || own.mime || 'application/octet-stream';
  const idx = vaAttIndex();
  const sources = [], seen = {};
  let unrendered = '';
  const add = s => { const k = s.type + '|' + (s.uri || s.ref); if (!seen[k]) { seen[k] = 1; sources.push(s); } };
  const typed = (b64, fallback) => { const t = vaSniff(b64); return (vaAttKind(fallback) === 'image' && /^image\//.test(t)) ? t : fallback; };
  // 1. the filesystem copy, Users/user/attachments first
  (idx.fs[key] || []).forEach(f => {
    const size = vaNum(f.size_bytes) || vaNum(f.size) || 0;
    if (f.viewer_external && f.viewer_uri) {
      if (VA_RENDERED && !VA_RENDERED[String(f.path || '')]) { unrendered = unrendered || String(f.path || ''); return; }
      add({type: 'uri', uri: String(f.viewer_uri), mime, origin: 'Files', ref: String(f.path || ''), size});
      return;
    }
    const b = f.content_base64 || f.content_inline_b64 || (String(f.encoding || '').toLowerCase() === 'base64' ? f.content : '');
    if (b && vaB64Ok(b, mime)) add({type: 'b64', b64: b, mime: typed(b, mime), origin: 'Files', ref: 'fs:' + (f.path || nm), size: size || vaB64Size(b)});
    else if (!b && typeof f.content === 'string' && f.content && /^text\//.test(mime)) add({type: 'text', text: f.content, mime, origin: 'Files', ref: 'fs:' + (f.path || nm), size: size || f.content.length});
  });
  // 2. an email that carries the same file, the asking email first
  const mails = (idx.mail[key] || []).slice();
  if (own.b64 && !mails.some(m => own.ref && m.ref === own.ref)) mails.unshift({b64: own.b64, mime: own.mime, ref: own.ref || 'own', size: own.size});
  if (own.ref) mails.sort((a, b) => (b.ref === own.ref) - (a.ref === own.ref));
  mails.forEach(m => { if (vaB64Ok(m.b64, mime)) add({type: 'b64', b64: m.b64, mime: typed(m.b64, mime), origin: 'Email', ref: 'em:' + m.ref + ':' + key, size: vaB64Size(m.b64) || m.size}); });
  // 3. an Instagram media asset
  const stem = key.replace(/\.[a-z0-9]{1,5}$/, '');
  (idx.ig[key] || idx.ig[stem] || []).forEach(a => {
    const b = a.content_base64 || '';
    if (b && vaB64Ok(b, a.mime_type || mime)) add({type: 'b64', b64: b, mime: typed(b, a.mime_type || mime), origin: 'Instagram', ref: 'ig:' + (a.id || key), size: vaNum(a.size) || vaB64Size(b)});
  });
  return {name: nm || 'Attachment', mime, kind: vaAttKind(mime), size: sources.length ? sources[0].size : (vaNum(own.size) || 0), sources, cur: 0, unrendered};
}
const VA_ATT = {};
const _vaAttIds = {};
let _vaAttSeq = 0;
// The id is the only thing an inline handler ever carries; names and bytes stay in the
// registry, so no data value is ever interpolated into an on* attribute.
function vaAttRegister(att, scope) {
  const k = String(scope || '') + '|' + att.name;
  if (!_vaAttIds[k]) _vaAttIds[k] = 'att' + (++_vaAttSeq);
  att.id = _vaAttIds[k];
  VA_ATT[att.id] = att;
  return att;
}
function vaAttSrc(s) {
  if (!s) return '';
  if (s.type === 'uri') return s.uri;
  const key = 'att:' + s.ref;
  if (s.type === 'text') {
    if (!VA_MEDIA[key]) {
      let url = '';
      try { if (typeof Blob !== 'undefined' && URL.createObjectURL) url = URL.createObjectURL(new Blob([s.text], {type: s.mime + ';charset=utf-8'})); } catch (e) {}
      VA_MEDIA[key] = {mime: s.mime, b64: '', uri: url || ('data:' + s.mime + ';charset=utf-8,' + encodeURIComponent(s.text))};
    }
    return VA_MEDIA[key].uri;
  }
  vaMediaKey(key, s.mime, s.b64, '');
  return vaMediaSrc(key);
}
function vaAttMediaKey(att, i) {
  const s = att.sources[i];
  if (!s) return '';
  return s.type === 'uri' ? vaMediaKey('att-uri:' + s.uri, s.mime, '', s.uri) : vaMediaKey('att:' + s.ref, s.mime, s.b64, '');
}
function vaAttLabel(att) {
  const ext = vaExt(att.name);
  if (att.kind === 'pdf') return ['PDF', 'pdf'];
  if (/^(docx?|rtf|odt|pages|txt|md)$/.test(ext)) return [ext.toUpperCase(), 'doc'];
  if (/^(xlsx?|csv|numbers|ods)$/.test(ext)) return [ext.toUpperCase(), 'sheet'];
  return [(ext || 'FILE').toUpperCase().slice(0, 4), ''];
}
function vaAttSub(att) {
  return [vaBytes(att.size), att.kind === 'pdf' ? 'PDF document' : (att.kind === 'file' ? vaAttLabel(att)[0] + ' file' : '')].filter(Boolean).join(' · ');
}
function vaAttTitle(att) {
  const s = att.sources[att.cur || 0];
  if (!s && att.unrendered) return att.name + ': the filesystem copy (' + att.unrendered + ') was not rendered into seed_data_files_rendered/ beside this viewer';
  if (!s) return att.name + ': no copy of this file is stored in this universe';
  return att.name + (s.origin ? ' (from ' + s.origin + (s.type === 'uri' && s.ref ? ': ' + s.ref : '') + ')' : '');
}
function vaAttDocHtml(att, compact) {
  const lab = vaAttLabel(att);
  const icon = '<span class="va-att-ic ' + lab[1] + '">' + vaE(lab[0]) + '</span>';
  if (!att.sources.length) {
    return '<span class="va-att-chip missing" title="' + vaE(vaAttTitle(att)) + '">' + (att.kind === 'image' ? '🖼️' : '📎') + ' <span>' + vaE(att.name) + '</span></span>';
  }
  const id = vaE(att.id);
  let acts = '';
  if (att.kind === 'pdf') {
    if (!compact) acts += '<button class="va-att-btn" data-va-att="' + id + '" onclick="vaAttPreview(this)">Preview</button>';
    acts += '<a class="va-att-btn" href="#" target="_blank" rel="noopener" data-va-att="' + id + '" onclick="return vaAttHref(this,0)">Open</a>';
  } else {
    acts += '<a class="va-att-btn" href="#" download="' + vaE(att.name) + '" data-va-att="' + id + '" onclick="return vaAttHref(this,1)">Download</a>';
  }
  return '<div class="va-att-doc" title="' + vaE(vaAttTitle(att)) + '">' + icon + '<div class="va-att-meta"><div class="va-att-name">' + vaE(att.name) + '</div><div class="va-att-sub">' + vaE(vaAttSub(att)) + '</div></div><div class="va-att-acts">' + acts + '</div></div>';
}
// atts: registered results of vaAttResolve. opts.compact draws the chat-bubble variant.
function vaAttStripHtml(atts, opts) {
  opts = opts || {};
  const list = (atts || []).filter(Boolean);
  if (!list.length) return '';
  const imgs = list.filter(a => a.kind === 'image' && a.sources.length);
  const docs = list.filter(a => imgs.indexOf(a) < 0);
  let h = '<div class="va-att-strip' + (opts.compact ? ' compact' : '') + '">';
  if (!opts.compact) {
    const total = list.reduce((s, a) => s + (vaNum(a.size) || 0), 0);
    h += '<div class="va-att-head">📎 ' + list.length + ' attachment' + (list.length === 1 ? '' : 's') + (total ? ' · ' + vaE(vaBytes(total)) : '') + '</div>';
  }
  if (imgs.length) {
    h += '<div class="va-att-thumbs">';
    imgs.forEach(a => {
      const id = vaE(a.id);
      h += '<figure class="va-att-fig" data-va-att="' + id + '" onclick="vaAttZoom(this)" title="' + vaE(vaAttTitle(a)) + '"><img alt="' + vaE(a.name) + '" data-va-src="' + vaE(vaAttMediaKey(a, 0)) + '" data-va-att="' + id + '" data-va-i="0" loading="lazy" onerror="vaAttFail(this)">' + (opts.compact ? '' : '<figcaption class="va-att-cap">' + vaE(a.name) + '<span>' + vaE(vaBytes(a.size) || 'Photo') + '</span></figcaption>') + '</figure>';
    });
    h += '</div>';
  }
  if (docs.length) {
    h += '<div class="va-att-files">';
    docs.forEach(a => { h += vaAttDocHtml(a, opts.compact); });
    h += '</div>';
  }
  return h + '</div>';
}
// An image source that fails to load hands over to the next one; when none is left the
// figure becomes a file chip instead of a broken-image icon.
function vaAttFail(img) {
  try {
    const att = VA_ATT[img.getAttribute('data-va-att')];
    if (!att) return;
    const i = Number(img.getAttribute('data-va-i') || 0) + 1;
    if (i < att.sources.length) {
      img.setAttribute('data-va-i', String(i));
      att.cur = i;
      img.setAttribute('src', vaAttSrc(att.sources[i]));
      return;
    }
    const fig = img.closest('.va-att-fig') || img;
    const chip = document.createElement('span');
    chip.className = 'va-att-chip missing';
    chip.title = att.name + ': the image could not be loaded';
    chip.innerHTML = '🖼️ <span>' + vaE(att.name) + '</span>';
    fig.replaceWith(chip);
  } catch (e) {}
}
function vaAttZoom(el) {
  try {
    const att = VA_ATT[el.getAttribute('data-va-att')];
    if (!att) return;
    const img = el.tagName === 'IMG' ? el : el.querySelector('img');
    const src = (img && img.getAttribute('src')) || vaAttSrc(att.sources[att.cur || 0]);
    if (src) vaLightbox(src, att.name + (att.size ? ' · ' + vaBytes(att.size) : ''), att.id);
  } catch (e) {}
}
// Fills the href at click time, so a blob: URL is only made for a file someone opens.
function vaAttHref(a, download) {
  try {
    const att = VA_ATT[a.getAttribute('data-va-att')];
    const url = att ? vaAttSrc(att.sources[att.cur || 0]) : '';
    if (!url) return false;
    a.setAttribute('href', url);
    if (download) a.setAttribute('download', att.name);
    return true;
  } catch (e) { return false; }
}
function vaAttPreview(btn) {
  try {
    const att = VA_ATT[btn.getAttribute('data-va-att')];
    const card = btn.closest('.va-att-doc');
    if (!att || !card) return;
    const next = card.nextElementSibling;
    if (next && next.classList.contains('va-att-frame')) { next.remove(); btn.textContent = 'Preview'; return; }
    const fr = document.createElement('iframe');
    fr.className = 'va-att-frame';
    fr.title = att.name;
    fr.setAttribute('src', vaAttSrc(att.sources[att.cur || 0]));
    card.parentNode.insertBefore(fr, card.nextSibling);
    btn.textContent = 'Hide preview';
  } catch (e) {}
}
function vaLightbox(src, caption, attId) {
  let lb = document.getElementById('va-lb');
  if (!lb) {
    lb = document.createElement('div');
    lb.id = 'va-lb';
    lb.className = 'va-lb';
    lb.onclick = ev => { if (ev.target === lb) vaLightboxClose(); };
    document.body.appendChild(lb);
    document.addEventListener('keydown', ev => { if (ev.key === 'Escape') vaLightboxClose(); });
  }
  const open = attId ? '<a class="va-att-btn" href="#" target="_blank" rel="noopener" data-va-att="' + vaE(attId) + '" onclick="return vaAttHref(this,0)">Open original</a>' : '';
  lb.innerHTML = '<button class="va-lb-x" onclick="vaLightboxClose()" title="Close">×</button><img alt="' + vaE(caption) + '"><div class="va-lb-bar"><span>' + vaE(caption) + '</span>' + open + '</div>';
  lb.querySelector('img').setAttribute('src', src);
  lb.classList.add('on');
}
function vaLightboxClose() { const lb = document.getElementById('va-lb'); if (lb) lb.classList.remove('on'); }
// Resolve and register a list of {name, b64?, mime?} for one record.
function vaAttList(items, scope, ref) {
  return (items || []).filter(a => a && a.name).map(a => vaAttRegister(vaAttResolve(a.name, {b64: a.b64 || '', mime: a.mime || '', ref: ref || '', size: a.size || 0}), scope));
}

// ── Plaid (bank app) ─────────────────────────────────────────────────────────
function renderPlaid(data) {
  const items = vaRows(data.items), accounts = vaRows(data.accounts), txns = vaRows(data.transactions);
  if (!accounts.length && !txns.length) return renderOpenedRecords(data);
  const credit = vaRows(data.credit_liabilities), mortgage = vaRows(data.mortgage_liabilities), student = vaRows(data.student_liabilities);
  const streams = vaRows(data.recurring_streams), holdings = vaRows(data.holdings), securities = vaRows(data.securities), invTx = vaRows(data.investment_transactions);
  const itemById = {}; items.forEach(i => { if (i.id) itemById[i.id] = i; });
  const acctById = {}; accounts.forEach(a => { if (a.id) acctById[a.id] = a; });
  const secById = {}; securities.forEach(s => { if (s.id) secById[s.id] = s; });
  const byAcct = {}; [['credit', credit], ['mortgage', mortgage], ['student', student]].forEach(([k, rows]) => rows.forEach(r => { (byAcct[r.account_id] = byAcct[r.account_id] || {})[k] = r; }));
  const acctName = a => a ? (vaPick(a.name, a.official_name) || vaHuman(a.subtype || a.type) || 'Account') : 'Account';
  const acctLabel = a => acctName(a) + (a && a.mask ? ' •••• ' + a.mask : '');
  const cur = a => ((a && a.balances) || {}).iso_currency_code || ((a && a.balances) || {}).unofficial_currency_code || 'USD';
  const owner = vaRows(data.users)[0] || {};
  const sum = type => accounts.filter(a => String(a.type || '').toLowerCase() === type).reduce((s, a) => s + (vaNum((a.balances || {}).current) || 0), 0);
  const has = type => accounts.some(a => String(a.type || '').toLowerCase() === type);
  let h = '<div class="va va-plaid">';
  h += '<div class="hero-stats" style="margin-bottom:6px">';
  if (has('depository')) h += '<div class="hero-stat"><div class="hero-stat-label">Cash</div><div class="hero-stat-value">' + vaE(vaMoney(sum('depository'))) + '</div><div class="hero-stat-detail">checking and savings, current</div></div>';
  if (has('credit')) h += '<div class="hero-stat"><div class="hero-stat-label">Card balances</div><div class="hero-stat-value">' + vaE(vaMoney(sum('credit'))) + '</div><div class="hero-stat-detail">owed on credit cards</div></div>';
  if (has('loan')) h += '<div class="hero-stat"><div class="hero-stat-label">Loans</div><div class="hero-stat-value">' + vaE(vaMoney(sum('loan'))) + '</div><div class="hero-stat-detail">outstanding principal</div></div>';
  if (has('investment') || has('brokerage')) h += '<div class="hero-stat"><div class="hero-stat-label">Investments</div><div class="hero-stat-value">' + vaE(vaMoney(sum('investment') + sum('brokerage'))) + '</div></div>';
  h += '<div class="hero-stat"><div class="hero-stat-label">Linked</div><div class="hero-stat-value mono">' + items.length + ' bank' + (items.length === 1 ? '' : 's') + '</div><div class="hero-stat-detail">' + accounts.length + ' accounts' + (owner.email ? ' · ' + vaE(owner.email) : '') + '</div></div>';
  h += '</div>';
  // accounts grouped by institution
  const groups = [];
  items.forEach(it => groups.push({item: it, accts: accounts.filter(a => a.item_id === it.id)}));
  const orphan = accounts.filter(a => !itemById[a.item_id]);
  if (orphan.length) groups.push({item: null, accts: orphan});
  const tabIndex = {}; let tabN = 1;
  accounts.forEach(a => { if (txns.some(t => t.account_id === a.id)) tabIndex[a.id] = tabN++; });
  groups.forEach(g => {
    if (!g.accts.length && g.item) return;
    const bank = g.item ? (vaPick(g.item.institution_name) || 'Linked institution') : 'Other accounts';
    h += '<div class="va-bank-hdr">' + vaAvatar(bank) + '<div><div class="va-bank-name">' + vaE(bank) + '</div>';
    const prods = g.item ? _arr(g.item.products) : [];
    if (prods.length) h += '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px">' + prods.map(p => '<span class="va-chip">' + vaE(vaHuman(p)) + '</span>').join('') + '</div>';
    h += '</div></div><div class="va-acct-grid">';
    g.accts.forEach(a => {
      const b = a.balances || {}, type = String(a.type || '').toLowerCase();
      const curr = vaNum(b.current), avail = vaNum(b.available), limit = vaNum(b.limit);
      const tab = tabIndex[a.id];
      h += '<div class="va-acct"' + (tab ? ' onclick="vaTabTo(\'plaid-tx\',\'' + tab + '\')" title="Show transactions"' : '') + '>';
      h += '<div class="va-acct-top"><div><div class="va-acct-name">' + vaE(acctName(a)) + '</div>';
      h += '<div class="va-acct-mask">' + (a.mask ? '•••• ' + vaE(a.mask) : '') + '</div></div>';
      h += '<div style="display:flex;gap:4px;flex-wrap:wrap;justify-content:flex-end"><span class="va-chip info">' + vaE(vaHuman(a.subtype || a.type) || 'Account') + '</span>';
      if (a.holder_category) h += '<span class="va-chip">' + vaE(vaHuman(a.holder_category)) + '</span>';
      h += '</div></div>';
      if (a.official_name && a.official_name !== a.name) h += '<div class="va-acct-sub">' + vaE(a.official_name) + '</div>';
      if (type === 'credit') {
        h += '<div class="va-acct-bal">' + vaE(vaMoney(curr, cur(a))) + '</div><div class="va-acct-sub">Current balance</div>';
        if (limit) {
          const pct = Math.max(0, Math.min(100, Math.round(100 * (curr || 0) / limit)));
          h += '<div class="va-bar"><i style="width:' + pct + '%"></i></div>';
          h += '<div class="va-acct-sub">' + vaE(vaMoney(avail, cur(a))) + ' available of ' + vaE(vaMoney(limit, cur(a))) + ' limit · ' + pct + '% used</div>';
        }
      } else if (type === 'loan') {
        h += '<div class="va-acct-bal">' + vaE(vaMoney(curr, cur(a))) + '</div><div class="va-acct-sub">Principal balance</div>';
      } else {
        h += '<div class="va-acct-bal">' + vaE(vaMoney(avail != null ? avail : curr, cur(a))) + '</div>';
        h += '<div class="va-acct-sub">' + (avail != null ? 'Available' : 'Current') + (avail != null && curr != null && curr !== avail ? ' · ' + vaE(vaMoney(curr, cur(a))) + ' current' : '') + '</div>';
      }
      const L = byAcct[a.id] || {};
      const kv = [];
      if (L.credit) {
        const c = L.credit;
        _arr(c.aprs).forEach(r => { if (r && r.apr_percentage != null) kv.push([vaHuman(r.apr_type || 'APR').replace(/ apr$/i, ' APR'), r.apr_percentage + '%']); });
        if (c.last_statement_balance != null) kv.push(['Statement balance', vaMoney(c.last_statement_balance, cur(a))]);
        if (c.minimum_payment_amount != null) kv.push(['Minimum due', vaMoney(c.minimum_payment_amount, cur(a))]);
        if (c.next_payment_due_date) kv.push(['Due', vaShortDay(c.next_payment_due_date)]);
        if (c.last_payment_amount != null) kv.push(['Last payment', vaMoney(c.last_payment_amount, cur(a)) + (c.last_payment_date ? ' on ' + vaShortDay(c.last_payment_date) : '')]);
        if (c.is_overdue) kv.push(['Status', 'Overdue']);
      }
      if (L.mortgage) {
        const m = L.mortgage, rate = m.interest_rate && typeof m.interest_rate === 'object' ? m.interest_rate.percentage : m.interest_rate;
        if (rate != null) kv.push(['Interest rate', rate + '%']);
        if (m.next_monthly_payment != null) kv.push(['Monthly payment', vaMoney(m.next_monthly_payment, cur(a))]);
        if (m.next_payment_due_date) kv.push(['Due', vaShortDay(m.next_payment_due_date)]);
        if (m.loan_term) kv.push(['Term', String(m.loan_term)]);
      }
      if (L.student) {
        const s = L.student;
        if (s.loan_name) kv.push(['Loan', s.loan_name]);
        if (s.interest_rate_percentage != null) kv.push(['Interest rate', s.interest_rate_percentage + '%']);
        if (s.minimum_payment_amount != null) kv.push(['Minimum due', vaMoney(s.minimum_payment_amount, cur(a))]);
        if (s.next_payment_due_date) kv.push(['Due', vaShortDay(s.next_payment_due_date)]);
      }
      if (kv.length) h += '<dl class="va-kv">' + kv.map(([k, v]) => '<dt>' + vaE(k) + '</dt><dd>' + vaE(v) + '</dd>').join('') + '</dl>';
      h += '</div>';
    });
    h += '</div>';
  });
  // transactions
  const txPane = (rows, showAcct) => {
    if (!rows.length) return '';
    const sorted = rows.slice().sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
    let p = '', day = null;
    sorted.slice(0, 500).forEach(t => {
      if (t.date !== day) { day = t.date; p += '<div class="va-txday">' + vaE(vaDay(t.date)) + '</div>'; }
      const n = vaNum(t.amount);
      const title = vaPick(t.merchant_name, t.name) || vaHuman((t.personal_finance_category || {}).primary) || 'Transaction';
      const cat = vaHuman((t.personal_finance_category || {}).primary || _arr(t.category).join(' / '));
      const chan = String(t.payment_channel || '') === 'other' ? '' : vaHuman(t.payment_channel);
      const sub = [cat, chan, showAcct ? acctLabel(acctById[t.account_id]) : ''].filter(Boolean).join(' · ');
      // Plaid sign convention: positive is money leaving the account, negative is money coming in.
      const out = n != null && n > 0;
      p += '<div class="va-tx">' + vaAvatar(title, 'sm') + '<div><div class="va-tx-name">' + vaE(title) + (t.pending ? ' <span class="va-chip warn">Pending</span>' : '') + '</div>';
      if (sub) p += '<div class="va-tx-sub">' + vaE(sub) + '</div>';
      if (t.name && t.merchant_name && t.name !== t.merchant_name) p += '<div class="va-tx-raw">' + vaE(t.name) + '</div>';
      p += '</div><div class="va-amt ' + (out ? 'out' : 'in') + '">' + (n == null ? '' : (out ? '-' : '+') + vaE(vaMoney(Math.abs(n), t.iso_currency_code || 'USD'))) + '</div></div>';
    });
    if (sorted.length > 500) p += '<div class="va-empty">Showing the latest 500 of ' + sorted.length + ' transactions.</div>';
    return p;
  };
  if (txns.length) {
    h += '<div class="va-sec">Transactions</div>';
    const tabs = [{label: 'All accounts (' + txns.length + ')', html: txPane(txns, true)}];
    accounts.forEach(a => { if (tabIndex[a.id]) tabs.push({label: acctLabel(a), html: txPane(txns.filter(t => t.account_id === a.id), false)}); });
    h += vaTabs('plaid-tx', tabs);
  }
  if (streams.length) {
    h += '<div class="va-sec">Recurring</div><div class="va-stream-grid">';
    streams.forEach(s => {
      const name = vaPick(s.merchant_name, s.description) || 'Recurring payment';
      const status = String(s.status || '').toUpperCase();
      const chip = status === 'TOMBSTONED' ? '<span class="va-chip">Ended</span>' : (s.is_active === false ? '<span class="va-chip">Inactive</span>' : (status === 'EARLY_DETECTION' ? '<span class="va-chip warn">New</span>' : '<span class="va-chip good">Active</span>'));
      const inflow = String(s.flow || '').toLowerCase() === 'inflow';
      h += '<div class="va-card"><div class="va-acct-top"><div style="display:flex;gap:10px;align-items:center">' + vaAvatar(name, 'sm') + '<div><div class="va-acct-name">' + vaE(name) + '</div><div class="va-acct-sub">' + vaE([vaHuman(s.frequency), inflow ? 'Incoming' : 'Outgoing'].filter(Boolean).join(' · ')) + '</div></div></div>' + chip + '</div>';
      h += '<div class="va-acct-bal" style="font-size:20px;color:' + (inflow ? 'var(--green)' : 'var(--text)') + '">' + (inflow ? '+' : '-') + vaE(vaMoney(Math.abs(vaNum(s.average_amount) || 0), s.iso_currency_code)) + '<span class="va-muted" style="font-size:12px;font-family:var(--font-body)"> average</span></div>';
      const kv = [];
      if (s.last_amount != null) kv.push(['Last amount', vaMoney(Math.abs(vaNum(s.last_amount) || 0), s.iso_currency_code)]);
      if (s.first_date) kv.push(['Since', vaShortDay(s.first_date)]);
      if (s.last_date) kv.push(['Last seen', vaShortDay(s.last_date)]);
      if (s.predicted_next_date) kv.push(['Next expected', vaShortDay(s.predicted_next_date)]);
      const occ = _arr(s.transaction_ids).length;
      if (occ) kv.push(['Payments', String(occ)]);
      if (acctById[s.account_id]) kv.push(['Account', acctLabel(acctById[s.account_id])]);
      h += '<dl class="va-kv">' + kv.map(([k, v]) => '<dt>' + vaE(k) + '</dt><dd>' + vaE(v) + '</dd>').join('') + '</dl></div>';
    });
    h += '</div>';
  }
  if (holdings.length) {
    h += '<div class="va-sec">Holdings</div><div class="va-card">';
    holdings.forEach(x => {
      const s = secById[x.security_id] || {};
      const nm = vaPick(s.name, s.ticker_symbol) || 'Security';
      h += '<div class="va-tx">' + vaAvatar(s.ticker_symbol || nm, 'sm') + '<div><div class="va-tx-name">' + vaE(nm) + (s.ticker_symbol ? ' <span class="va-chip">' + vaE(s.ticker_symbol) + '</span>' : '') + '</div><div class="va-tx-sub">' + vaE([x.quantity != null ? x.quantity + ' shares' : '', x.institution_price != null ? '@ ' + vaMoney(x.institution_price, x.iso_currency_code) : '', acctLabel(acctById[x.account_id])].filter(Boolean).join(' · ')) + '</div></div><div class="va-amt">' + vaE(vaMoney(x.institution_value, x.iso_currency_code)) + '</div></div>';
    });
    h += '</div>';
  }
  if (invTx.length) {
    h += '<div class="va-sec">Investment activity</div><div class="va-card">';
    invTx.slice().sort((a, b) => String(b.date || '').localeCompare(String(a.date || ''))).slice(0, 200).forEach(t => {
      const s = secById[t.security_id] || {};
      const n = vaNum(t.amount);
      h += '<div class="va-tx">' + vaAvatar(s.ticker_symbol || t.name || '?', 'sm') + '<div><div class="va-tx-name">' + vaE(vaPick(t.name, s.name) || vaHuman(t.type) || 'Investment transaction') + '</div><div class="va-tx-sub">' + vaE([vaShortDay(t.date), vaHuman(t.subtype || t.type), t.quantity != null ? t.quantity + ' @ ' + vaMoney(t.price, t.iso_currency_code) : ''].filter(Boolean).join(' · ')) + '</div></div><div class="va-amt ' + (n != null && n > 0 ? 'out' : 'in') + '">' + (n == null ? '' : (n > 0 ? '-' : '+') + vaE(vaMoney(Math.abs(n), t.iso_currency_code))) + '</div></div>';
    });
    h += '</div>';
  }
  return h + '</div>';
}

// ── Duffel (flights and stays) ────────────────────────────────────────────────
function vaAirportClock(s, tz) {
  if (!s) return '';
  if (vaHasZone(s) && tz) {
    try { return new Date(s).toLocaleTimeString('en-US', {timeZone: tz, hour: 'numeric', minute: '2-digit'}); } catch (e) {}
  }
  return vaClock(s);
}
function vaAirportDay(s, tz) {
  if (!s) return '';
  if (vaHasZone(s) && tz) {
    try { return new Date(s).toLocaleDateString('en-US', {timeZone: tz, weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'}); } catch (e) {}
  }
  return vaDay(s);
}
function vaPlace(p) { p = p || {}; return {code: vaPick(p.iata_code, p.iata_city_code) || '', city: vaPick(p.city_name, p.name) || '', name: vaPick(p.name) || '', tz: p.time_zone || ''}; }
function vaSliceHtml(sl) {
  const segs = vaRows(sl.segments);
  const first = segs[0] || {}, last = segs[segs.length - 1] || {};
  const o = vaPlace(sl.origin || first.origin), d = vaPlace(sl.destination || last.destination);
  const dep = first.departing_at, arr = last.arriving_at;
  const pd = vaYmd(dep), pa = vaYmd(arr);
  let plus = '';
  if (pd && pa) { const diff = Math.round((Date.UTC(pa[0], pa[1] - 1, pa[2]) - Date.UTC(pd[0], pd[1] - 1, pd[2])) / 86400000); if (diff > 0) plus = ' <sup class="va-muted">+' + diff + '</sup>'; }
  const stops = Math.max(0, segs.length - 1);
  let h = '<div class="va-fl">';
  h += '<div><div class="va-fl-time">' + vaE(vaAirportClock(dep, o.tz)) + '</div><div class="va-fl-code">' + vaE(o.code) + '</div><div class="va-fl-city">' + vaE(o.city) + '</div></div>';
  h += '<div class="va-fl-mid"><div>' + vaE(vaAirportDay(dep, o.tz)) + '</div><div class="va-fl-line"></div><div>' + vaE([vaDur(sl.duration || first.duration), stops ? stops + ' stop' + (stops > 1 ? 's' : '') + ' via ' + segs.slice(0, -1).map(s => vaPlace(s.destination).code).filter(Boolean).join(', ') : 'Nonstop'].filter(Boolean).join(' · ')) + '</div></div>';
  h += '<div style="text-align:right"><div class="va-fl-time">' + vaE(vaAirportClock(arr, d.tz)) + plus + '</div><div class="va-fl-code">' + vaE(d.code) + '</div><div class="va-fl-city">' + vaE(d.city) + '</div></div>';
  h += '</div>';
  const meta = [];
  segs.forEach(s => {
    const mk = s.marketing_carrier || {}, op = s.operating_carrier || {};
    const fn = (mk.iata_code || '') + ' ' + (s.marketing_carrier_flight_number || s.operating_carrier_flight_number || '');
    const pax = vaRows(s.passengers)[0] || {};
    const bags = vaRows(pax.baggages).filter(b => Number(b.quantity) > 0).map(b => b.quantity + ' ' + vaHuman(b.type).toLowerCase().replace('carry on', 'carry-on') + ' bag' + (Number(b.quantity) > 1 ? 's' : ''));
    meta.push([fn.trim(), op.name && op.name !== mk.name ? 'operated by ' + op.name : '', pax.cabin_class_marketing_name || vaHuman(pax.cabin_class), bags.join(', '), s.aircraft && s.aircraft.name].filter(Boolean).join(' · '));
  });
  if (sl.fare_brand_name) meta.push('Fare: ' + sl.fare_brand_name);
  h += '<div class="va-fl-meta">' + meta.map(vaE).join('<br>') + '</div>';
  return h;
}
function vaRouteTitle(slices) {
  const s = vaRows(slices);
  if (!s.length) return 'Trip';
  const a = vaPlace(s[0].origin).code, b = vaPlace(s[0].destination).code;
  if (s.length === 2 && vaPlace(s[1].destination).code === a) return a + ' ⇄ ' + b + ' · Round trip';
  return s.map(x => vaPlace(x.origin).code + ' → ' + vaPlace(x.destination).code).join(', ') + (s.length === 1 ? ' · One way' : ' · Multi-city');
}
function vaPaxLine(pax) {
  const rows = vaRows(pax);
  const c = {};
  rows.forEach(p => { const t = vaHuman(p.type || 'adult').toLowerCase(); c[t] = (c[t] || 0) + 1; });
  return Object.keys(c).map(k => c[k] + ' ' + k + (c[k] > 1 ? 's' : '')).join(', ');
}
function vaSeatGrid(els, selected) {
  const seats = els.filter(e => String(e.type || 'seat') === 'seat');
  if (!seats.length) return '';
  const letters = {}; let minR = Infinity, maxR = -Infinity;
  const at = {};
  seats.forEach(e => {
    const m = String(e.designator || '').match(/^(\d+)([A-Z])$/i);
    const row = vaNum(e.row) != null ? vaNum(e.row) : (m ? +m[1] : null);
    const col = m ? m[2].toUpperCase() : null;
    if (row == null || !col) return;
    letters[col] = 1; minR = Math.min(minR, row); maxR = Math.max(maxR, row);
    at[row + col] = e;
  });
  const L = Object.keys(letters).sort();
  if (!L.length) return '';
  const inSet = set => L.every(x => set.indexOf(x) >= 0);
  let layout;
  if (inSet('ACDF')) layout = [['A', 'C'], ['D', 'F']];
  else if (inSet('ABCDEF')) layout = [['A', 'B', 'C'], ['D', 'E', 'F']];
  else if (inSet('ABCDEFGHJK')) layout = [['A', 'B', 'C'], ['D', 'E', 'F', 'G'], ['H', 'J', 'K']];
  else { const half = Math.ceil(L.length / 2); layout = [L.slice(0, half), L.slice(half)]; }
  const cols = [].concat.apply([], layout);
  const pos = c => {
    if (c === cols[0] || c === cols[cols.length - 1]) return 'Window';
    for (const g of layout) { if (c === g[0] || c === g[g.length - 1]) return 'Aisle'; }
    return 'Middle';
  };
  if (maxR - minR > 60) maxR = minR + 60;
  let h = '<div class="va-seatmap"><div class="va-seatrow"><div class="va-rownum"></div>';
  layout.forEach((g, gi) => { if (gi) h += '<div class="va-aisle"></div>'; g.forEach(c => { h += '<div class="va-colhdr">' + c + '<small>' + pos(c).charAt(0) + '</small></div>'; }); });
  h += '<div class="va-rownum"></div></div>';
  for (let r = minR; r <= maxR; r++) {
    h += '<div class="va-seatrow"><div class="va-rownum">' + r + '</div>';
    layout.forEach((g, gi) => {
      if (gi) h += '<div class="va-aisle"></div>';
      g.forEach(c => {
        const e = at[r + c];
        const label = r + c;
        if (!e) { h += '<div class="va-seat blank" title="' + vaE(label + ' · ' + pos(c) + ' · not offered') + '"><span>' + label + '</span></div>'; return; }
        const price = vaNum(e.total_amount);
        const sel = selected[label] || e.selected === true || e.is_selected === true;
        const free = e.available === true || e.available === 'true';
        const cls = sel ? 'sel' : (!free ? 'taken' : (price ? 'paid' : 'avail'));
        const tip = [label, vaPick(e.name) || pos(c), vaHuman(e.cabin_class), sel ? 'Selected' : (free ? (price ? vaMoney(price, e.total_currency) : 'Free') : 'Occupied')].filter(Boolean).join(' · ');
        h += '<div class="va-seat ' + cls + '" title="' + vaE(tip) + '"><span>' + (free && price && !sel ? '$' + Math.round(price) : vaE(label)) + '</span></div>';
      });
    });
    h += '<div class="va-rownum">' + r + '</div></div>';
  }
  h += '</div>';
  h += '<div class="va-legend"><span class="va-seat avail"></span>Available, free <span class="va-seat paid"></span>Available, paid <span class="va-seat taken"></span>Occupied <span class="va-seat sel"></span>Selected <span class="va-seat blank"></span>Not offered <span>W window · A aisle · M middle</span></div>';
  return h;
}
function renderDuffel(data) {
  const offers = vaRows(data.offers), orders = vaRows(data.orders), seatEls = vaRows(data.seat_map_elements);
  const cancels = vaRows(data.order_cancellations), stays = vaRows(data.accommodations), rooms = vaRows(data.rooms);
  const rates = vaRows(data.rates), quotes = vaRows(data.quotes), bookings = vaRows(data.bookings);
  if (!offers.length && !orders.length && !stays.length && !bookings.length && !seatEls.length) return renderOpenedRecords(data);
  const orderByOffer = {}; orders.forEach(o => { if (o.offer_id) orderByOffer[o.offer_id] = o; });
  const segInfo = {};
  [].concat(offers, orders).forEach(o => vaRows(o.slices).forEach(sl => vaRows(sl.segments).forEach(s => { if (s.id && !segInfo[s.id]) segInfo[s.id] = {seg: s, owner: o, isOrder: !!o.booking_reference || orders.indexOf(o) >= 0}; })));
  const carrierBadge = o => '<div class="va-carrier">' + vaE(((o && o.owner) || {}).iata_code || '✈') + '</div>';
  const priceBox = (amt, curCode, base, tax) => '<div style="text-align:right"><div class="va-price">' + vaE(vaMoney(amt, curCode)) + '</div>' + (base != null && tax != null ? '<div class="va-acct-sub">' + vaE(vaMoney(base, curCode)) + ' fare + ' + vaE(vaMoney(tax, curCode)) + ' taxes</div>' : '') + '</div>';
  // Trips
  let trips = '';
  orders.slice().sort((a, b) => String(b.created_at || '').localeCompare(String(a.created_at || ''))).forEach(o => {
    const cx = cancels.find(c => c.order_id === o.id);
    const cancelled = !!o.cancelled_at || (cx && cx.confirmed_at);
    trips += '<div class="va-card"><div class="va-acct-top"><div style="display:flex;gap:12px;align-items:center">' + carrierBadge(o) + '<div><div class="va-acct-name">' + vaE(vaRouteTitle(o.slices)) + '</div><div class="va-acct-sub">' + vaE((o.owner || {}).name || '') + (o.created_at ? ' · booked ' + vaE(vaWhen(o.created_at)) : '') + '</div></div></div>';
    trips += '<div style="text-align:right">' + (o.booking_reference ? '<div class="va-ref">' + vaE(o.booking_reference) + '</div><div class="va-acct-sub">Booking reference</div>' : '') + '<div style="margin-top:6px">' + (cancelled ? '<span class="va-chip bad">Cancelled</span>' : (cx ? '<span class="va-chip warn">Cancellation pending</span>' : '<span class="va-chip good">Confirmed</span>')) + '</div></div></div>';
    vaRows(o.slices).forEach(sl => { trips += vaSliceHtml(sl); });
    const pax = vaRows(o.passengers);
    if (pax.length) {
      trips += '<div class="va-sec" style="margin-top:14px">Passengers</div><div class="va-people">';
      pax.forEach(p => {
        const nm = [vaHuman(p.title) && p.title.length <= 4 ? vaHuman(p.title) + '.' : '', p.given_name, p.family_name].filter(Boolean).join(' ') || vaHuman(p.type) || 'Passenger';
        trips += '<div class="va-person">' + vaAvatar([p.given_name, p.family_name].filter(Boolean).join(' ') || nm, 'sm') + '<div><div style="font-weight:600">' + vaE(nm) + '</div><div class="va-acct-sub">' + vaE([vaHuman(p.type), p.born_on ? 'born ' + vaShortDay(p.born_on) : '', p.email].filter(Boolean).join(' · ')) + '</div></div></div>';
      });
      trips += '</div>';
    }
    const svc = vaRows(o.services);
    if (svc.length) trips += '<div class="va-fl-meta" style="margin-top:10px">Extras: ' + vaE(svc.map(s => [s.quantity ? s.quantity + ' x' : '', vaHuman(s.type), (s.metadata || {}).designator || '', s.total_amount ? vaMoney(s.total_amount, s.total_currency) : ''].filter(Boolean).join(' ')).join(', ')) + '</div>';
    trips += '<div class="va-acct-top" style="margin-top:12px;padding-top:10px;border-top:1px solid var(--border)"><div class="va-acct-sub">Total paid</div>' + priceBox(o.total_amount, o.total_currency) + '</div>';
    if (cx) trips += '<div class="va-fl-meta">Refund ' + vaE(vaMoney(cx.refund_amount, cx.refund_currency)) + (cx.refund_to ? ' to ' + vaE(vaHuman(cx.refund_to).toLowerCase()) : '') + (cx.confirmed_at ? ' · confirmed ' + vaE(vaWhen(cx.confirmed_at)) : (cx.expires_at ? ' · quote expires ' + vaE(vaWhen(cx.expires_at)) : '')) + '</div>';
    trips += '</div>';
  });
  bookings.forEach(b => {
    trips += '<div class="va-card"><div class="va-acct-top"><div><div class="va-acct-name">🏨 ' + vaE(vaPick(b.accommodation_name) || 'Hotel stay') + '</div><div class="va-acct-sub">' + vaE([vaShortDay(b.check_in_date) + ' to ' + vaShortDay(b.check_out_date), b.rooms ? b.rooms + ' room' + (b.rooms > 1 ? 's' : '') : '', _arr(b.guests).length ? _arr(b.guests).length + ' guests' : ''].filter(Boolean).join(' · ')) + '</div></div>';
    trips += '<div style="text-align:right">' + (b.reference ? '<div class="va-ref">' + vaE(b.reference) + '</div>' : '') + '<span class="va-chip ' + (b.cancelled_at || /cancel/i.test(b.status || '') ? 'bad' : 'good') + '">' + vaE(vaHuman(b.status) || (b.cancelled_at ? 'Cancelled' : 'Confirmed')) + '</span><div class="va-price" style="font-size:20px;margin-top:6px">' + vaE(vaMoney(b.total_amount, b.total_currency)) + '</div></div></div></div>';
  });
  // Offers
  let offersHtml = '';
  offers.slice().sort((a, b) => (vaNum(a.total_amount) || 0) - (vaNum(b.total_amount) || 0)).forEach(o => {
    const booked = orderByOffer[o.id];
    const cond = o.conditions || {}, ch = cond.change_before_departure || {}, rf = cond.refund_before_departure || {};
    const rules = [];
    if (ch.allowed === true) rules.push((vaNum(ch.penalty_amount) ? 'Changes for ' + vaMoney(ch.penalty_amount, ch.penalty_currency) : 'Free changes'));
    else if (ch.allowed === false) rules.push('No changes');
    if (rf.allowed === true) rules.push(vaNum(rf.penalty_amount) ? 'Refundable for a ' + vaMoney(rf.penalty_amount, rf.penalty_currency) + ' fee' : 'Refundable');
    else if (rf.allowed === false) rules.push('Non-refundable');
    offersHtml += '<div class="va-card"><div class="va-acct-top"><div style="display:flex;gap:12px;align-items:center">' + carrierBadge(o) + '<div><div class="va-acct-name">' + vaE(vaRouteTitle(o.slices)) + '</div><div class="va-acct-sub">' + vaE([(o.owner || {}).name, vaPaxLine(o.passengers)].filter(Boolean).join(' · ')) + '</div></div></div>' + priceBox(o.total_amount, o.total_currency, o.base_amount, o.tax_amount) + '</div>';
    vaRows(o.slices).forEach(sl => { offersHtml += vaSliceHtml(sl); });
    offersHtml += '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:10px">' + rules.map(r => '<span class="va-chip">' + vaE(r) + '</span>').join('') + (booked ? '<span class="va-chip good">Booked' + (booked.booking_reference ? ' · ' + vaE(booked.booking_reference) : '') + '</span>' : '') + (o.expires_at ? '<span class="va-chip warn">Offer expires ' + vaE(vaWhen(o.expires_at)) + '</span>' : '') + '</div></div>';
  });
  // Seat maps, one cabin per segment
  let seatsHtml = '';
  const bySeg = {}, segOrder = [];
  seatEls.forEach(e => { const k = e.segment_id || e.offer_id || 'cabin'; if (!bySeg[k]) { bySeg[k] = []; segOrder.push(k); } bySeg[k].push(e); });
  segOrder.forEach(k => {
    const els = bySeg[k];
    const info = segInfo[k] || {};
    const s = info.seg || {};
    const mk = s.marketing_carrier || {};
    const o = vaPlace(s.origin), d = vaPlace(s.destination);
    const offerId = (els[0] || {}).offer_id;
    const ord = orders.find(x => x.offer_id === offerId) || (info.isOrder ? info.owner : null);
    const selected = {};
    if (ord) vaRows(ord.services).forEach(sv => { if (String(sv.type || '') === 'seat') { const des = (sv.metadata || {}).designator || sv.designator; if (des && (!_arr(sv.segment_ids).length || _arr(sv.segment_ids).indexOf(k) >= 0)) selected[String(des).toUpperCase()] = 1; } });
    const free = els.filter(e => e.available === true).length;
    seatsHtml += '<div class="va-card"><div class="va-acct-top"><div><div class="va-acct-name">' + vaE((o.code && d.code ? o.code + ' → ' + d.code : 'Cabin') + (mk.iata_code ? ' · ' + mk.iata_code + ' ' + (s.marketing_carrier_flight_number || '') : '')) + '</div><div class="va-acct-sub">' + vaE([vaAirportDay(s.departing_at, o.tz), vaAirportClock(s.departing_at, o.tz), vaHuman((els[0] || {}).cabin_class)].filter(Boolean).join(' · ')) + '</div></div>';
    seatsHtml += '<div style="text-align:right">' + (ord ? '<span class="va-chip good">Booked' + (ord.booking_reference ? ' · ' + vaE(ord.booking_reference) : '') + '</span>' : '<span class="va-chip">Offer</span>') + '<div class="va-acct-sub" style="margin-top:4px">' + free + ' of ' + els.length + ' listed seats open</div></div></div>';
    seatsHtml += vaSeatGrid(els, selected) + '</div>';
  });
  // Stays
  let staysHtml = '';
  stays.forEach(st => {
    const loc = st.location || {}, addr = loc.address || {};
    const where = [addr.line_one, addr.city_name, addr.region, addr.postal_code, addr.country_code].filter(Boolean).join(', ');
    const rating = vaNum(st.rating);
    const ci = st.check_in_information || {};
    staysHtml += '<div class="va-card"><div class="va-acct-top"><div><div class="va-bank-name">🏨 ' + vaE(vaPick(st.name) || 'Hotel') + '</div><div class="va-acct-sub">' + vaE(where) + '</div></div><div style="text-align:right">' + (rating ? '<div class="va-stars">' + '★'.repeat(Math.round(rating)) + '</div>' : '') + (st.review_score != null ? '<span class="va-chip info">' + vaE(st.review_score) + ' guest score</span>' : '') + '</div></div>';
    if (st.description) staysHtml += '<div style="margin-top:8px;font-size:13px">' + vaE(st.description) + '</div>';
    const am = _arr(st.amenities).map(a => typeof a === 'string' ? a : (a && (a.description || a.type))).filter(Boolean);
    if (am.length) staysHtml += '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px">' + am.map(a => '<span class="va-chip">' + vaE(vaHuman(a)) + '</span>').join('') + '</div>';
    if (ci.check_in_after_time || ci.check_out_before_time) staysHtml += '<div class="va-fl-meta">Check-in after ' + vaE(ci.check_in_after_time || '?') + ' · check-out before ' + vaE(ci.check_out_before_time || '?') + '</div>';
    rooms.filter(r => r.accommodation_id === st.id || (!r.accommodation_id && stays.length === 1)).forEach(rm => {
      const beds = vaRows(rm.beds).map(b => (b.count || 1) + ' ' + vaHuman(b.type).toLowerCase() + ' bed' + ((b.count || 1) > 1 ? 's' : '')).join(', ');
      staysHtml += '<div style="margin-top:12px;padding-top:10px;border-top:1px dashed var(--border)"><div class="va-acct-name">' + vaE(vaPick(rm.name) || 'Room') + '</div><div class="va-acct-sub">' + vaE(beds) + '</div>';
      rates.filter(r => r.room_id === rm.id).forEach(r => {
        const a = vaYmd(r.check_in_date), b = vaYmd(r.check_out_date);
        const nights = a && b ? Math.round((Date.UTC(b[0], b[1] - 1, b[2]) - Date.UTC(a[0], a[1] - 1, a[2])) / 86400000) : 0;
        const refund = vaRows(r.cancellation_timeline)[0];
        const q = vaNum(r.quantity_available);
        staysHtml += '<div class="va-acct-top" style="margin-top:8px;background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:10px 12px"><div><div style="font-weight:600">' + vaE(vaShortDay(r.check_in_date) + ' to ' + vaShortDay(r.check_out_date)) + (nights ? ' <span class="va-muted">· ' + nights + ' night' + (nights > 1 ? 's' : '') + '</span>' : '') + '</div><div class="va-acct-sub">' + vaE([vaHuman(r.board_type), r.payment_type ? 'Pay: ' + vaHuman(r.payment_type).toLowerCase() : '', refund ? 'Refund ' + vaMoney(refund.refund_amount, refund.currency) + ' before ' + vaWhen(refund.before) : 'Non-refundable', q === 0 ? 'No rooms left at this rate' : (q ? q + ' left' : '')].filter(Boolean).join(' · ')) + '</div></div>' + priceBox(r.total_amount, r.total_currency, r.base_amount, r.tax_amount) + '</div>';
      });
      staysHtml += '</div>';
    });
    staysHtml += '</div>';
  });
  quotes.forEach(q => {
    staysHtml += '<div class="va-card"><div class="va-acct-top"><div><div class="va-acct-name">Quote</div><div class="va-acct-sub">' + vaE([vaShortDay(q.check_in_date) + ' to ' + vaShortDay(q.check_out_date), q.rooms ? q.rooms + ' room' + (q.rooms > 1 ? 's' : '') : '', _arr(q.guests).length ? _arr(q.guests).length + ' guests' : '', q.expires_at ? 'expires ' + vaWhen(q.expires_at) : ''].filter(Boolean).join(' · ')) + '</div></div>' + priceBox(q.total_amount, q.total_currency) + '</div></div>';
  });
  let h = '<div class="va va-duffel">';
  h += vaTabs('duffel', [
    {label: 'Trips (' + (orders.length + bookings.length) + ')', html: trips},
    {label: 'Flight offers (' + offers.length + ')', html: offersHtml},
    {label: 'Seat maps (' + segOrder.length + ')', html: seatsHtml},
    {label: 'Stays (' + stays.length + ')', html: staysHtml},
  ]);
  return h + '</div>';
}

// ── Facebook ─────────────────────────────────────────────────────────────────
function vaVis(v) {
  const s = String(v || '').toLowerCase();
  if (!s) return '';
  if (s === 'public' || s === 'everyone') return '🌐 Public';
  if (s.indexOf('friend') >= 0) return '👥 Friends';
  if (s === 'only_me' || s === 'private' || s === 'self') return '🔒 Only me';
  return vaHuman(s);
}
function vaCount(v) { if (Array.isArray(v)) return v.length; const n = vaNum(v); if (n != null) return n; if (v && typeof v === 'object') return Object.values(v).reduce((s, x) => s + (vaNum(Array.isArray(x) ? x.length : x) || 0), 0); return 0; }
// Chips over a list of cards that carry data-va-kind (space separated); "all" shows all.
function vaKindFilter(btn) {
  try {
    const kind = btn.getAttribute('data-va-kind');
    const bar = btn.parentNode;
    bar.querySelectorAll('.va-fchip').forEach(b => b.classList.toggle('on', b === btn));
    const box = bar.nextElementSibling;
    if (box) box.querySelectorAll('[data-va-kind]').forEach(el => {
      el.style.display = (kind === 'all' || (' ' + el.getAttribute('data-va-kind') + ' ').indexOf(' ' + kind + ' ') >= 0) ? '' : 'none';
    });
    vaHydrate();
  } catch (e) {}
}
// Live filter for a long people list: rows carry their searchable text in data-va-q.
function vaPeopleFilter(input) {
  try {
    const q = String(input.value || '').trim().toLowerCase();
    const box = input.closest('.va-pane') || input.parentNode.parentNode;
    let shown = 0;
    box.querySelectorAll('[data-va-q]').forEach(el => {
      const hit = !q || el.getAttribute('data-va-q').indexOf(q) >= 0;
      el.style.display = hit ? '' : 'none';
      if (hit) shown++;
    });
    const note = box.querySelector('.va-filter-count');
    if (note) note.textContent = q ? shown + ' match' + (shown === 1 ? '' : 'es') : note.getAttribute('data-va-all');
  } catch (e) {}
}
function vaGroupVis(v) {
  const s = String(v || '').toLowerCase();
  if (!s) return '';
  if (s === 'public' || s === 'everyone' || s === 'open') return 'Public group';
  if (s === 'closed' || s === 'private' || s === 'only_me' || s === 'members') return 'Private group';
  if (s === 'secret' || s === 'hidden') return 'Hidden group';
  return vaHuman(s) + ' group';
}
function vaProfileVis(v) {
  const s = String(v || '').toLowerCase();
  if (!s) return '';
  if (s === 'public' || s === 'everyone') return '🌐 Public profile';
  if (s.indexOf('friend') >= 0) return '👥 Profile visible to friends';
  if (s === 'only_me' || s === 'private' || s === 'self') return '🔒 Private profile';
  return vaHuman(s) + ' profile';
}
function vaListingIcon(cat) {
  const c = String(cat || '').toLowerCase();
  const map = [['furn', '🛋️'], ['kitchen', '🍳'], ['appliance', '🔌'], ['electron', '💻'], ['vehicle', '🚗'], ['car', '🚗'], ['bike', '🚲'], ['cloth', '👕'], ['apparel', '👕'], ['tool', '🔧'], ['garden', '🌱'], ['plant', '🪴'], ['toy', '🧸'], ['baby', '🍼'], ['kid', '🧸'], ['sport', '⚽'], ['book', '📚'], ['music', '🎸'], ['instrument', '🎸'], ['home', '🏠'], ['free', '🎁'], ['food', '🥖'], ['bak', '🥖'], ['pet', '🐾']];
  for (let i = 0; i < map.length; i++) if (c.indexOf(map[i][0]) >= 0) return map[i][1];
  return '🛍️';
}
function renderFacebook(data) {
  const users = vaRows(data.users), pages = vaRows(data.pages), groups = vaRows(data.groups);
  const posts = vaRows(data.posts), listings = vaRows(data.marketplace_listings), saved = vaRows(data.saved_items);
  if (!users.length && !posts.length && !listings.length) return renderOpenedRecords(data);
  const uById = {}; users.forEach(u => { if (u.id) uById[u.id] = u; });
  const uName = {}; users.forEach(u => { if (u.id) uName[u.id] = vaPick(u.name, u.display_name, u.email && String(u.email).split('@')[0]) || 'Facebook user'; });
  const pById = {}; pages.forEach(p => { if (p.id) pById[p.id] = p; });
  const gById = {}; groups.forEach(g => { if (g.id) gById[g.id] = g; });
  const me = users.find(u => u.id === data.current_user_id) || users.find(u => PERSONA && u.name === PERSONA.name) || users[0] || {};
  const myId = me.id || '';
  const myName = uName[myId] || PERSONA.name || 'You';
  // Friendship is mutual, so a friend listed on EITHER side is a friend. Reading only the
  // persona's friend_ids dropped every friend whose row named her and not the reverse.
  const adj = {};
  const link = (a, b) => { if (!a || !b || a === b) return; (adj[a] = adj[a] || {})[b] = 1; (adj[b] = adj[b] || {})[a] = 1; };
  users.forEach(u => _arr(u.friend_ids).forEach(f => link(u.id, f)));
  const myFriends = adj[myId] || {};
  const friendIds = Object.keys(myFriends);
  const friends = friendIds.filter(id => uById[id]).sort((a, b) => uName[a].localeCompare(uName[b]));
  const unlisted = friendIds.length - friends.length;
  const mutualOf = id => Object.keys(adj[id] || {}).filter(x => x !== myId && myFriends[x]).length;
  // Group membership is recorded on the user AND on the group; either counts.
  const myGroups = {};
  _arr(me.group_ids).forEach(g => { if (g) myGroups[g] = 1; });
  groups.forEach(g => { if (_arr(g.member_ids).indexOf(myId) >= 0) myGroups[g.id] = 1; });
  const nGroups = Object.keys(myGroups).length;
  const myPages = pages.filter(p => _arr(p.admin_ids).indexOf(myId) >= 0 || _arr(me.admin_page_ids).indexOf(p.id) >= 0);
  const postsSorted = posts.slice().sort((a, b) => vaMs(b.created_at) - vaMs(a.created_at));
  const kindOf = p => {
    const k = [];
    if (pById[p.page_id]) k.push('page');
    if (gById[p.group_id]) k.push('group');
    if (p.author_id === myId && !pById[p.page_id]) k.push('mine');
    if (myFriends[p.author_id]) k.push('friends');
    return k.join(' ') || 'other';
  };
  const postCard = (p, inGroup) => {
    const page = pById[p.page_id], group = gById[p.group_id];
    const author = page ? (vaPick(page.name) || 'Page') : (uName[p.author_id] || 'Facebook user');
    const meta = [vaWhen(p.created_at), vaVis(p.visibility)].filter(Boolean).join(' · ');
    let c = '<div class="va-card va-fb-post" data-va-kind="' + kindOf(p) + '"><div class="va-post-hdr">' + vaAvatar(author) + '<div style="min-width:0"><div class="va-post-author">' + vaE(author) + (group && !inGroup ? ' <span class="va-muted">▸</span> <a class="va-fb-link" onclick="vaTabTo(\'fb\',\'groups\')">' + vaE(vaPick(group.name) || 'Group') + '</a>' : '') + '</div><div class="va-post-meta">' + vaE(meta) + (page && uName[p.author_id] ? ' · posted by ' + vaE(uName[p.author_id]) : '') + '</div></div></div>';
    if (p.message || p.text) c += '<div class="va-post-body">' + vaE(p.message || p.text) + '</div>';
    vaMediaList(p).forEach(k => { c += vaImgTag(k, 'va-post-img', 'Photo'); });
    const reacts = vaCount(p.reactions != null ? p.reactions : (p.likes != null ? p.likes : p.like_count));
    const cmts = Array.isArray(p.comments) ? p.comments : [];
    const nC = cmts.length || vaCount(p.comment_count);
    const nS = vaCount(p.shares != null ? p.shares : p.share_count);
    if (reacts || nC || nS) c += '<div class="va-post-counts"><span>' + (reacts ? '👍 ' + reacts : '') + '</span><span>' + [nC ? nC + ' comment' + (nC === 1 ? '' : 's') : '', nS ? nS + ' share' + (nS === 1 ? '' : 's') : ''].filter(Boolean).join(' · ') + '</span></div>';
    c += '<div class="va-post-actions"><span>👍 Like</span><span>💬 Comment</span><span>↗ Share</span></div>';
    cmts.filter(x => x && typeof x === 'object').forEach(x => { const who = uName[x.author_id || x.user_id] || 'Facebook user'; c += '<div class="va-cmt" style="margin-top:10px">' + vaAvatar(who, 'sm') + '<div style="background:var(--surface2);border-radius:14px;padding:6px 10px"><b>' + vaE(who) + '</b>' + vaE(x.message || x.text || '') + '<div class="va-cmt-time">' + vaE(vaWhen(x.created_at)) + '</div></div></div>'; });
    return c + '</div>';
  };

  let h = '<div class="va va-fb">';
  h += '<div class="va-fb-cover"></div><div class="va-fb-head">' + vaAvatar(myName, 'lg') + '<div style="padding-bottom:6px;flex:1"><div class="va-fb-name">' + vaE(myName) + '</div><div class="va-acct-sub">' + vaE([friendIds.length + ' friend' + (friendIds.length === 1 ? '' : 's'), nGroups ? nGroups + ' group' + (nGroups === 1 ? '' : 's') : '', myPages.length ? 'manages ' + myPages.map(p => vaPick(p.name) || 'a page').join(', ') : '', vaVis(me.visibility) ? 'profile: ' + vaVis(me.visibility).replace(/^\S+ /, '') : ''].filter(Boolean).join(' · ')) + '</div></div><div style="padding-bottom:10px;color:#5b9bf5;font-weight:800;font-size:22px;letter-spacing:-.03em">facebook</div></div>';

  // left rail: intro, a friends preview, groups, pages
  let rail = '<div class="va-card"><div class="va-sec" style="margin-top:0">Intro</div><div class="va-fb-intro">' + [
    myPages.length ? '💼 Manages <b>' + vaE(myPages.map(p => vaPick(p.name) || 'a page').join(', ')) + '</b>' : '',
    '👥 <b>' + friendIds.length + '</b> friend' + (friendIds.length === 1 ? '' : 's'),
    nGroups ? '🏘️ Member of <b>' + nGroups + '</b> group' + (nGroups === 1 ? '' : 's') : '',
    me.visibility ? vaE(vaProfileVis(me.visibility)) : '',
  ].filter(Boolean).map(x => '<div>' + x + '</div>').join('') + '</div></div>';
  if (friends.length) {
    const top = friends.slice().sort((a, b) => mutualOf(b) - mutualOf(a) || uName[a].localeCompare(uName[b])).slice(0, 9);
    rail += '<div class="va-card"><div class="va-fb-railhdr"><div class="va-sec" style="margin:0">Friends</div><a class="va-fb-link" onclick="vaTabTo(\'fb\',\'friends\')">See all</a></div><div class="va-acct-sub" style="margin:2px 0 10px">' + friendIds.length + ' friend' + (friendIds.length === 1 ? '' : 's') + '</div><div class="va-fb-fgrid">' + top.map(id => '<div class="va-fb-ftile" title="' + vaE(uName[id]) + '">' + vaAvatar(uName[id], '') + '<span>' + vaE(uName[id]) + '</span></div>').join('') + '</div></div>';
  }
  if (groups.length) {
    const gl = groups.slice().sort((a, b) => (myGroups[b.id] ? 1 : 0) - (myGroups[a.id] ? 1 : 0) || String(a.name || '').localeCompare(String(b.name || '')));
    rail += '<div class="va-card"><div class="va-fb-railhdr"><div class="va-sec" style="margin:0 0 6px">Groups</div><a class="va-fb-link" onclick="vaTabTo(\'fb\',\'groups\')">See all</a></div>';
    gl.forEach(g => { rail += '<div class="va-person" style="border:0;padding:6px 0;background:none">' + vaAvatar(g.name || 'Group', 'sm') + '<div style="min-width:0"><div style="font-weight:600">' + vaE(vaPick(g.name) || 'Group') + '</div><div class="va-acct-sub">' + vaE([vaGroupVis(g.visibility), _arr(g.member_ids).length + ' members'].filter(Boolean).join(' · ')) + '</div></div></div>'; });
    rail += '</div>';
  }
  if (pages.length) {
    rail += '<div class="va-card"><div class="va-sec" style="margin-top:0">Pages</div>';
    pages.forEach(p => {
      const followers = users.filter(u => _arr(u.followed_page_ids).indexOf(p.id) >= 0).length;
      const admin = _arr(p.admin_ids).indexOf(myId) >= 0;
      rail += '<div class="va-person" style="border:0;padding:6px 0;background:none">' + vaAvatar(p.name || 'Page', 'sm') + '<div><div style="font-weight:600">' + vaE(vaPick(p.name) || 'Page') + '</div><div class="va-acct-sub">' + vaE([admin ? 'You manage this page' : '', followers ? followers + ' follower' + (followers === 1 ? '' : 's') : ''].filter(Boolean).join(' · ')) + '</div></div></div>';
    });
    rail += '</div>';
  }

  // feed: everything, newest first, filterable by where it was posted
  let feed = '';
  if (postsSorted.length) {
    const n = {friends: 0, group: 0, page: 0, mine: 0};
    postsSorted.forEach(p => kindOf(p).split(' ').forEach(k => { if (k in n) n[k]++; }));
    const chips = [['all', 'All', postsSorted.length], ['friends', 'Friends', n.friends], ['group', 'Groups', n.group], ['page', 'Page', n.page], ['mine', 'Yours', n.mine]].filter(c => c[0] === 'all' || c[2]);
    if (chips.length > 2) feed += '<div class="va-fbar">' + chips.map((c, i) => '<button class="va-fchip' + (i === 0 ? ' on' : '') + '" data-va-kind="' + c[0] + '" onclick="vaKindFilter(this)">' + vaE(c[1]) + ' <b>' + c[2] + '</b></button>').join('') + '</div>';
    feed += '<div class="va-fb-feed">' + postsSorted.map(p => postCard(p, false)).join('') + '</div>';
  } else feed = '<div class="va-empty">No posts yet.</div>';

  // the page the persona runs, with its own posts
  const pageList = myPages.length ? myPages : pages;
  const pagePosts = postsSorted.filter(p => pageList.some(pg => pg.id === p.page_id));
  let pageHtml = '';
  pageList.forEach(pg => {
    const pp = postsSorted.filter(p => p.page_id === pg.id);
    const admins = _arr(pg.admin_ids).map(id => uName[id]).filter(Boolean);
    const fol = users.filter(u => _arr(u.followed_page_ids).indexOf(pg.id) >= 0).length;
    pageHtml += '<div class="va-card va-fb-pagehead">' + vaAvatar(pg.name || 'Page', '') + '<div style="flex:1;min-width:0"><div class="va-fb-gname">' + vaE(vaPick(pg.name) || 'Page') + '</div><div class="va-acct-sub">' + vaE([pg.category ? vaHuman(pg.category) : '', pp.length + ' post' + (pp.length === 1 ? '' : 's'), fol ? fol + ' follower' + (fol === 1 ? '' : 's') : '', admins.length ? 'Admins: ' + admins.join(', ') : ''].filter(Boolean).join(' · ')) + '</div></div>' + (_arr(pg.admin_ids).indexOf(myId) >= 0 ? '<span class="va-chip good">You manage this page</span>' : '') + '</div>';
    pageHtml += pp.length ? pp.map(p => postCard(p, false)).join('') : '<div class="va-empty">No posts on this page yet.</div>';
  });

  // friends, with mutual friends and shared groups
  let friendsHtml = '';
  if (friendIds.length) {
    const all = friendIds.length + ' friend' + (friendIds.length === 1 ? '' : 's');
    friendsHtml = '<div class="va-people-tools">' + (friends.length > 8 ? '<input class="va-filter" type="search" placeholder="Search friends" aria-label="Search friends" oninput="vaPeopleFilter(this)">' : '') + '<span class="va-muted va-filter-count" data-va-all="' + vaE(all) + '">' + vaE(all) + '</span></div>';
    friendsHtml += '<div class="va-fb-friends">' + friends.map(id => {
      const nm = uName[id], mu = mutualOf(id);
      const shared = groups.filter(g => myGroups[g.id] && _arr(g.member_ids).indexOf(id) >= 0).map(g => vaPick(g.name)).filter(Boolean);
      return '<div class="va-fb-friend" data-va-q="' + vaE((nm + ' ' + shared.join(' ')).toLowerCase()) + '">' + vaAvatar(nm, '') + '<div style="min-width:0"><div class="va-fb-fname">' + vaE(nm) + '</div><div class="va-acct-sub">' + vaE([mu ? mu + ' mutual friend' + (mu === 1 ? '' : 's') : '', shared.length ? shared[0] + (shared.length > 1 ? ' +' + (shared.length - 1) : '') : ''].filter(Boolean).join(' · ')) + '</div></div></div>';
    }).join('') + '</div>';
    if (unlisted) friendsHtml += '<div class="va-empty">' + unlisted + ' more friend' + (unlisted === 1 ? ' is' : 's are') + ' listed by id only, with no profile in this dataset.</div>';
  }

  // groups, each with its members and its own posts
  let groupsHtml = '';
  if (groups.length) {
    const gPosts = {};
    postsSorted.forEach(p => { if (gById[p.group_id]) (gPosts[p.group_id] = gPosts[p.group_id] || []).push(p); });
    groupsHtml = groups.slice().sort((a, b) => (myGroups[b.id] ? 1 : 0) - (myGroups[a.id] ? 1 : 0) || String(a.name || '').localeCompare(String(b.name || ''))).map(g => {
      const members = _arr(g.member_ids), known = members.filter(id => uById[id]);
      const gp = gPosts[g.id] || [];
      const admin = _arr(g.admin_ids).indexOf(myId) >= 0;
      let c = '<div class="va-card va-fb-group"><div class="va-post-hdr">' + vaAvatar(g.name || 'Group') + '<div style="min-width:0;flex:1"><div class="va-fb-gname">' + vaE(vaPick(g.name) || 'Group') + '</div><div class="va-acct-sub">' + vaE([vaGroupVis(g.visibility), members.length + ' member' + (members.length === 1 ? '' : 's'), gp.length + ' post' + (gp.length === 1 ? '' : 's')].filter(Boolean).join(' · ')) + '</div></div>' + (admin ? '<span class="va-chip info">Admin</span>' : (myGroups[g.id] ? '<span class="va-chip good">Member</span>' : '')) + '</div>';
      if (g.description) c += '<div class="va-post-body">' + vaE(g.description) + '</div>';
      if (known.length) c += '<div class="va-fb-members">' + known.slice(0, 12).map(id => '<span class="va-fb-member" title="' + vaE(uName[id]) + '">' + vaAvatar(uName[id], 'sm') + '<span>' + vaE(uName[id]) + '</span></span>').join('') + (members.length > 12 ? '<span class="va-acct-sub">+' + (members.length - 12) + ' more</span>' : '') + '</div>';
      if (gp.length) c += '<details class="va-fb-gposts" ontoggle="vaHydrate()"' + (gp.length <= 3 ? ' open' : '') + '><summary>' + gp.length + ' post' + (gp.length === 1 ? '' : 's') + ' in this group</summary>' + gp.map(p => postCard(p, true)).join('') + '</details>';
      return c + '</div>';
    }).join('');
  }

  // marketplace: the persona's own listings first
  const listingCard = l => {
    const img = vaMediaList(l)[0];
    const st = String(l.status || '').toLowerCase();
    const seller = l.seller_id === myId ? 'Your listing' : (uName[l.seller_id] ? 'by ' + uName[l.seller_id] : '');
    return '<div class="va-prod"><div class="va-prod-img' + (img ? '' : ' noimg') + '">' + (img ? vaImgTag(img, '', l.title || 'Listing') : vaListingIcon(l.category || l.title)) + '</div><div class="va-prod-body"><div class="va-prod-price">' + vaE(vaNum(l.price) === 0 ? 'Free' : vaMoney(l.price, l.currency)) + '</div><div style="font-size:13px;margin-top:2px">' + vaE(vaPick(l.title) || 'Listing') + '</div><div class="va-acct-sub">' + vaE([vaHuman(l.category), seller, vaWhen(l.created_at)].filter(Boolean).join(' · ')) + '</div>' + (st ? '<div style="margin-top:6px"><span class="va-chip ' + (st === 'sold' ? 'bad' : (st === 'available' || st === 'active' ? 'good' : 'warn')) + '">' + vaE(vaHuman(st)) + '</span></div>' : '') + (l.description ? '<div class="va-acct-sub" style="margin-top:6px">' + vaE(trunc(String(l.description), 140)) + '</div>' : '') + '</div></div>';
  };
  let market = '';
  if (listings.length) {
    const sorted = listings.slice().sort((a, b) => vaMs(b.created_at) - vaMs(a.created_at));
    const own = sorted.filter(l => l.seller_id === myId), others = sorted.filter(l => l.seller_id !== myId);
    market = (own.length && others.length)
      ? '<div class="va-sec" style="margin-top:0">Your listings (' + own.length + ')</div><div class="va-prod-grid">' + own.map(listingCard).join('') + '</div><div class="va-sec">From others (' + others.length + ')</div><div class="va-prod-grid">' + others.map(listingCard).join('') + '</div>'
      : '<div class="va-prod-grid">' + sorted.map(listingCard).join('') + '</div>';
  }

  // saved: every item resolved to what it points at
  let savedHtml = '';
  if (saved.length) {
    const postById = {}; posts.forEach(p => { if (p.id) postById[p.id] = p; });
    const listById = {}; listings.forEach(l => { if (l.id) listById[l.id] = l; });
    savedHtml = '<div class="va-card">';
    saved.slice().sort((a, b) => vaMs(b.created_at) - vaMs(a.created_at)).forEach(s => {
      const t = String(s.item_type || '').toLowerCase();
      let title = '', icon = '🔖', kind = vaHuman(t) || 'Item';
      if (postById[s.item_id]) {
        const p = postById[s.item_id], pg = pById[p.page_id], gr = gById[p.group_id];
        title = ((pg && vaPick(pg.name)) || uName[p.author_id] || 'Post') + ': ' + trunc(String(p.message || p.text || ''), 110);
        icon = '📝'; kind = 'Post' + (gr ? ' in ' + (vaPick(gr.name) || 'a group') : '');
      } else if (listById[s.item_id]) {
        const l = listById[s.item_id];
        title = (vaPick(l.title) || 'Listing') + (l.price != null ? ' · ' + (vaNum(l.price) === 0 ? 'Free' : vaMoney(l.price, l.currency)) : '');
        icon = '🛍️'; kind = 'Marketplace' + (l.status ? ' · ' + vaHuman(l.status) : '');
      } else if (pById[s.item_id]) { title = vaPick(pById[s.item_id].name) || 'Page'; icon = '📄'; kind = 'Page'; }
      else if (gById[s.item_id]) { title = vaPick(gById[s.item_id].name) || 'Group'; icon = '👥'; kind = 'Group'; }
      else if (uName[s.item_id]) { title = uName[s.item_id]; icon = '👤'; kind = 'Profile'; }
      else title = 'Saved ' + (vaHuman(t) || 'item').toLowerCase();
      savedHtml += '<div class="va-tx"><div class="va-av sm" style="background:var(--surface3)">' + icon + '</div><div style="min-width:0"><div class="va-tx-name">' + vaE(title) + '</div><div class="va-tx-sub">' + vaE([kind, s.user_id && s.user_id !== myId && uName[s.user_id] ? 'saved by ' + uName[s.user_id] : '', vaWhen(s.created_at)].filter(Boolean).join(' · ')) + '</div></div><div></div></div>';
    });
    savedHtml += '</div>';
  }

  const pageLabel = pageList.length === 1 ? trunc(vaPick(pageList[0].name) || 'Page', 26) : 'Pages';
  const main = vaTabs('fb', [
    {label: 'Feed (' + posts.length + ')', html: feed, key: 'feed'},
    {label: pageLabel + ' (' + pagePosts.length + ')', html: pageHtml, key: 'page'},
    {label: 'Friends (' + friendIds.length + ')', html: friendsHtml, key: 'friends'},
    {label: 'Groups (' + groups.length + ')', html: groupsHtml, key: 'groups'},
    {label: 'Marketplace (' + listings.length + ')', html: market, key: 'marketplace'},
    {label: 'Saved (' + saved.length + ')', html: savedHtml, key: 'saved'},
  ]);
  h += '<div class="va-fb-cols"><div class="va-fb-rail">' + rail + '</div><div style="min-width:0">' + main + '</div></div>';
  vaLater();
  return h + '</div>';
}

// ── Instagram ────────────────────────────────────────────────────────────────
let _vaIg = null;
function vaIgMediaKeys(post, assets) {
  const out = [];
  _arr(post.media).forEach((m, i) => {
    if (!m) return;
    if (typeof m === 'string') { const k = assets[m] ? vaMediaFrom(assets[m], 'ig:' + m) : vaMediaFrom(m); if (k) out.push(k); return; }
    const a = assets[m.asset_id || m.id];
    let k = a ? vaMediaFrom(a, 'ig:' + (a.id || m.asset_id)) : '';
    if (!k) k = vaMediaFrom(m, 'ig:' + (post.id || '') + ':' + i);
    if (!k && a && a.rel_path) k = vaMediaFrom(a.rel_path);
    if (!k && (m.asset_id || m.id)) k = vaMediaFrom('instagram/' + (m.asset_id || m.id) + '.jpg');
    if (k) out.push(k);
  });
  vaMediaList({image: post.image, images: post.images, image_path: post.image_path}).forEach(k => { if (out.indexOf(k) < 0) out.push(k); });
  return out;
}
// A username is a handle, underscores and dots included. Only an internal id is not.
function vaIgName(v) {
  const s = String(v == null ? '' : v).trim().replace(/^@/, '');
  if (!s || /\s/.test(s) || /^[0-9a-f]{12,}$/i.test(s) || /^ig_(acct|user|account|media|post|comment)_/i.test(s)) return '';
  return s;
}
// The handle an id such as ig_acct_hazel spells out, for a follower with no row of its own.
function vaIgIdHandle(id) {
  const m = String(id || '').match(/^ig_(?:acct|user|account)_([a-z0-9._]{2,30})$/i);
  return m && !/^[0-9a-f]{6,}$/i.test(m[1]) ? m[1] : '';
}
const VA_IG_METRIC = {follower_count: 'Followers', following_count: 'Following', follows_count: 'Following', reach: 'Reach', impressions: 'Impressions', profile_views: 'Profile views', likes: 'Likes', comments: 'Comments', saves: 'Saves', shares: 'Shares', website_clicks: 'Website clicks', accounts_engaged: 'Accounts engaged'};
const VA_IG_ORDER = ['follower_count', 'reach', 'impressions', 'likes', 'comments', 'profile_views', 'saves', 'shares', 'website_clicks', 'accounts_engaged', 'following_count', 'follows_count'];
function vaIgMetric(m) { return VA_IG_METRIC[m] || vaHuman(m); }
function vaIgOrder(m) { const i = VA_IG_ORDER.indexOf(m); return i < 0 ? 99 : i; }
// A running total (followers) reads as its latest value; a daily metric sums over the days.
function vaIgStock(m) { return /(^|_)(count|followers|following)$/.test(String(m || '')); }
function renderInstagram(data) {
  const users = vaRows(data.users), accounts = vaRows(data.accounts), posts = vaRows(data.posts);
  const comments = vaRows(data.comments), saves = vaRows(data.saves), follows = vaRows(data.follows), insights = vaRows(data.insights);
  if (!accounts.length && !posts.length) return renderOpenedRecords(data);
  const assets = {}; vaRows(data.media_assets).forEach(a => { if (a.id) assets[a.id] = a; });
  const userById = {}; users.forEach(u => { if (u.id) userById[u.id] = u; });
  const acctById = {}; accounts.forEach(a => { if (a.id) acctById[a.id] = a; });
  const acctOfUser = {}; accounts.forEach(a => { if (a.owner_user_id && !acctOfUser[a.owner_user_id]) acctOfUser[a.owner_user_id] = a; });
  const handle = a => (a && (vaIgName(a.username) || vaIgName((userById[a.owner_user_id] || {}).username) || vaIgIdHandle(a.id))) || 'instagram_user';
  const uHandle = id => {
    const u = userById[id] || {};
    return vaIgName(u.username) || vaIgName((acctOfUser[id] || {}).username) || (acctById[id] ? handle(acctById[id]) : '') || vaIgIdHandle(id) || String(u.display_name || '').trim() || 'instagram_user';
  };
  const meId = data.current_user_id;
  const mine = accounts.filter(a => a.owner_user_id === meId);
  const nPosts = {}; posts.forEach(p => { nPosts[p.account_id] = (nPosts[p.account_id] || 0) + 1; });
  // A profile pane for the persona's accounts and for accounts with something to show
  // (posts or a bio). A follower-only account appears in the follower lists instead:
  // a few hundred empty panes in the switcher would bury the ones that matter.
  const others = accounts.filter(a => mine.indexOf(a) < 0 && (nPosts[a.id] || String(a.bio || '').trim()))
    .sort((a, b) => (nPosts[b.id] || 0) - (nPosts[a.id] || 0)).slice(0, 24);
  let ordered = mine.concat(others);
  if (!ordered.length) ordered = accounts.slice(0, 1);
  const paneOf = {}; ordered.forEach((a, i) => { paneOf[a.id] = i; });
  const postsSorted = posts.slice().sort((a, b) => vaMs(b.created_at) - vaMs(a.created_at));
  const cByPost = {}; comments.forEach(c => { (cByPost[c.post_id] = cByPost[c.post_id] || []).push(c); });
  Object.keys(cByPost).forEach(k => cByPost[k].sort((x, y) => vaMs(x.created_at) - vaMs(y.created_at)));
  const sByPost = {}; saves.forEach(s => { (sByPost[s.post_id] = sByPost[s.post_id] || []).push(s); });
  // No likes table in the schema: a per-post count is read when a row carries one, or
  // from a likes table if an export has it. Account-level likes live in insights.
  const lByPost = {}; vaRows(data.likes).forEach(l => { if (l.post_id) lByPost[l.post_id] = (lByPost[l.post_id] || 0) + 1; });
  const likesOf = p => {
    const n = vaNum(p.like_count != null ? p.like_count : (Array.isArray(p.likes) ? null : p.likes));
    if (n != null) return n;
    if (Array.isArray(p.likes)) return p.likes.length;
    return lByPost[p.id] != null ? lByPost[p.id] : null;
  };
  const keysByPost = {}; postsSorted.forEach(p => { keysByPost[p.id] = vaIgMediaKeys(p, assets); });
  _vaIg = {posts: postsSorted, keysByPost, cByPost, sByPost, acctById, userById, handle, uHandle, likesOf};
  const tile = (p, idx) => {
    const ks = keysByPost[p.id], k = ks[0];
    const nC = (cByPost[p.id] || []).length, nS = (sByPost[p.id] || []).length, nL = likesOf(p);
    return '<div class="va-ig-tile" data-va-post="' + idx + '" onclick="vaIgOpen(this)" title="' + vaE(trunc(String(p.caption || ''), 120)) + '">' + (k ? vaImgTag(k, '', trunc(String(p.caption || 'Post'), 80)) : '<div class="va-ig-noimg">' + vaE(trunc(String(p.caption || 'Post'), 90)) + '</div>') + (ks.length > 1 ? '<span class="va-ig-multi" title="' + ks.length + ' photos">❐</span>' : '') + (nC ? '<span class="va-ig-badge">💬 ' + nC + '</span>' : '') + '<div class="va-ig-ov">' + (nL != null ? '<span>♥ ' + nL.toLocaleString() + '</span>' : '') + '<span>💬 ' + nC + '</span><span>🔖 ' + nS + '</span></div></div>';
  };
  const cmtHtml = c => '<div class="va-ig-cmt">' + vaAvatar(uHandle(c.author_user_id), 'sm') + '<div style="min-width:0"><b>' + vaE(uHandle(c.author_user_id)) + '</b> ' + vaE(c.text || '') + '<div class="va-cmt-time">' + vaE(vaWhen(c.created_at)) + '</div></div></div>';
  // One post as the feed shows it: media, counts, caption, then EVERY comment under it.
  const postCard = (p, i, a) => {
    const ks = keysByPost[p.id] || [], cs = cByPost[p.id] || [];
    const nS = (sByPost[p.id] || []).length, nL = likesOf(p);
    const owner = userById[a.owner_user_id] || {};
    let c = '<article class="va-card va-ig-post"><div class="va-post-hdr"><span class="va-ring">' + vaAvatar(owner.display_name || handle(a), 'sm') + '</span><div><div class="va-post-author">' + vaE(handle(a)) + '</div><div class="va-post-meta">' + vaE([vaWhen(p.created_at), p.kind && p.kind !== 'feed' ? vaHuman(p.kind) : ''].filter(Boolean).join(' · ')) + '</div></div></div>';
    if (ks.length) c += '<div class="va-ig-post-media' + (ks.length > 1 ? ' multi' : '') + '" data-va-post="' + i + '" onclick="vaIgOpen(this)">' + ks.map(k => vaImgTag(k, '', trunc(String(p.caption || 'Post'), 80))).join('') + '</div>';
    c += '<div class="va-ig-post-stats">' + (nL != null ? '<b>♥ ' + nL.toLocaleString() + ' like' + (nL === 1 ? '' : 's') + '</b>' : '') + '<span>💬 ' + cs.length + ' comment' + (cs.length === 1 ? '' : 's') + '</span>' + (nS ? '<span>🔖 ' + nS + ' save' + (nS === 1 ? '' : 's') + '</span>' : '') + (ks.length > 1 ? '<span class="va-muted">' + ks.length + ' photos</span>' : '') + '</div>';
    if (p.caption) c += '<div class="va-ig-cap"><b>' + vaE(handle(a)) + '</b> ' + vaE(p.caption) + '</div>';
    c += '<div class="va-ig-cmts">' + (cs.length ? cs.map(cmtHtml).join('') : '<div class="va-muted" style="font-size:12px;padding:6px 0">No comments yet</div>') + '</div>';
    return c + '</article>';
  };
  let h = '<div class="va va-ig">';
  if (ordered.length > 1) {
    h += '<div class="va-ig-switch">';
    ordered.forEach((a, i) => { h += '<button class="va-ig-sw' + (i === 0 ? ' on' : '') + '" data-va-group="ig-acct" data-va-tab="' + i + '" onclick="vaTab(this)"><span class="va-ring">' + vaAvatar(handle(a), '') + '</span>' + vaE(trunc(handle(a), 14)) + '</button>'; });
    h += '</div>';
  }
  ordered.forEach((a, ai) => {
    const own = postsSorted.map((p, i) => [p, i]).filter(([p]) => p.account_id === a.id);
    const feed = own.filter(([p]) => String(p.kind || 'feed') !== 'story');
    const stories = own.filter(([p]) => String(p.kind || '') === 'story');
    const uniq = list => list.filter((x, i) => x && list.indexOf(x) === i);
    const followers = uniq(follows.filter(f => f.followed_account_id === a.id).map(f => f.follower_account_id));
    const following = uniq(follows.filter(f => f.follower_account_id === a.id).map(f => f.followed_account_id));
    const followerSet = {}; followers.forEach(id => { followerSet[id] = 1; });
    const followingSet = {}; following.forEach(id => { followingSet[id] = 1; });
    const ins = insights.filter(x => x.account_id === a.id);
    const latest = metric => ins.filter(x => x.metric === metric).sort((x, y) => String(y.date).localeCompare(String(x.date)))[0];
    const fc = latest('follower_count'), fgc = latest('following_count') || latest('follows_count');
    const nFollowers = fc ? Number(fc.value) : followers.length;
    const nFollowing = fgc ? Number(fgc.value) : following.length;
    const owner = userById[a.owner_user_id] || {};
    const grp = 'ig-' + ai;
    h += '<div class="va-pane' + (ai === 0 ? ' va-show' : '') + '" data-va-group="ig-acct" data-va-tab="' + ai + '">';
    h += '<div class="va-ig-head"><span class="va-ring">' + vaAvatar(owner.display_name || handle(a), 'lg') + '</span><div style="flex:1">';
    h += '<div class="va-ig-user">' + vaE(handle(a)) + (a.account_type && a.account_type !== 'personal' ? ' <span class="va-chip info">' + vaE(vaHuman(a.account_type)) + '</span>' : '') + (owner.is_private ? ' <span class="va-chip">🔒 Private</span>' : '') + (a.owner_user_id === meId ? ' <span class="va-chip good">Your account</span>' : '') + '</div>';
    h += '<div class="va-ig-counts"><span><b>' + feed.length + '</b> posts</span><span class="va-ig-count-link" title="' + vaE(fc ? 'Latest follower_count insight, ' + vaShortDay(fc.date) + '. ' + followers.length + ' follower accounts are in this dataset.' : followers.length + ' follower accounts in this dataset') + '" onclick="vaTabTo(\'' + grp + '\',\'followers\')"><b>' + nFollowers.toLocaleString() + '</b> followers</span><span class="va-ig-count-link" onclick="vaTabTo(\'' + grp + '\',\'following\')"><b>' + nFollowing.toLocaleString() + '</b> following</span></div>';
    if (owner.display_name) h += '<div style="font-weight:600;font-size:14px">' + vaE(owner.display_name) + '</div>';
    if (a.bio) h += '<div class="va-ig-bio">' + vaE(a.bio) + '</div>';
    // account metrics, at a glance
    const flowMetrics = Array.from(new Set(ins.map(x => x.metric))).filter(m => m && !vaIgStock(m)).sort((x, y) => vaIgOrder(x) - vaIgOrder(y) || x.localeCompare(y));
    if (flowMetrics.length) {
      const days = Array.from(new Set(ins.map(x => String(x.date || '').slice(0, 10)).filter(Boolean))).sort();
      h += '<div class="va-ig-insum" onclick="vaTabTo(\'' + grp + '\',\'insights\')" title="Open Insights"><span class="va-muted">' + vaE(days.length > 1 ? vaShortDay(days[0]) + ' to ' + vaShortDay(days[days.length - 1]) : vaShortDay(days[0] || '')) + '</span>' + flowMetrics.map(m => '<span class="va-chip">' + vaE(vaIgMetric(m)) + ' <b>' + ins.filter(x => x.metric === m).reduce((s, x) => s + (vaNum(x.value) || 0), 0).toLocaleString() + '</b></span>').join('') + '</div>';
    }
    h += '</div></div>';
    if (stories.length) {
      h += '<div class="va-ig-stories">';
      stories.forEach(([p, i]) => { const k = keysByPost[p.id][0]; h += '<div class="va-ig-story" data-va-post="' + i + '" onclick="vaIgOpen(this)"><span class="va-ring">' + (k ? vaImgTag(k, '', 'Story') : vaAvatar(handle(a), 'lg')) + '</span>' + vaE(vaWhen(p.created_at).split(',')[0]) + '</div>'; });
      h += '</div>';
    }
    const grid = feed.length ? '<div class="va-ig-grid">' + feed.map(([p, i]) => tile(p, i)).join('') + '</div>' : '<div class="va-empty">No posts yet.</div>';
    const feedList = feed.length ? '<div class="va-ig-feed">' + feed.map(([p, i]) => postCard(p, i, a)).join('') + '</div>' : '';
    const savedRows = saves.filter(s => s.account_id === a.id);
    const savedGrid = savedRows.length ? '<div class="va-ig-grid">' + savedRows.map(s => { const i = postsSorted.findIndex(p => p.id === s.post_id); return i >= 0 ? tile(postsSorted[i], i) : ''; }).join('') + '</div>' : '';
    const cmtRows = comments.filter(c => { const p = postsSorted.find(x => x.id === c.post_id); return p && p.account_id === a.id; }).sort((x, y) => vaMs(y.created_at) - vaMs(x.created_at));
    const cmtList = cmtRows.length ? '<div class="va-card">' + cmtRows.map(c => { const i = postsSorted.findIndex(p => p.id === c.post_id); const k = i >= 0 ? keysByPost[postsSorted[i].id][0] : ''; return '<div class="va-tx" style="grid-template-columns:36px 1fr 54px">' + vaAvatar(uHandle(c.author_user_id), 'sm') + '<div><div class="va-tx-name">' + vaE(uHandle(c.author_user_id)) + ' <span style="font-weight:400">' + vaE(c.text || '') + '</span></div><div class="va-tx-sub">' + vaE(vaWhen(c.created_at)) + (i >= 0 ? ' · on "' + vaE(trunc(String(postsSorted[i].caption || ''), 50)) + '"' : '') + '</div></div><div class="va-ig-tile" style="width:54px" data-va-post="' + i + '" onclick="vaIgOpen(this)">' + (k ? vaImgTag(k, '', 'Post') : '') + '</div></div>'; }).join('') + '</div>' : '';
    // followers / following: every account in the dataset, sorted, scrollable, searchable
    const people = (ids, rel, total) => {
      if (!ids.length) return '';
      const back = rel === 'followers' ? followingSet : followerSet;
      const rows = ids.map(id => {
        const o = acctById[id];
        const u = o ? (userById[o.owner_user_id] || {}) : (userById[id] || {});
        return {hh: o ? handle(o) : uHandle(id), dn: String(u.display_name || '').trim(), priv: !!u.is_private, both: !!back[id], pane: paneOf[id]};
      }).sort((x, y) => x.hh.localeCompare(y.hh));
      const word = rel === 'followers' ? 'followers' : 'following';
      const all = rows.length.toLocaleString() + ' ' + (rel === 'followers' ? 'follower' + (rows.length === 1 ? '' : 's') : 'accounts') + ' in this dataset';
      let out = '<div class="va-people-tools">' + (rows.length > 12 ? '<input class="va-filter" type="search" placeholder="Search ' + word + '" aria-label="Search ' + word + '" oninput="vaPeopleFilter(this)">' : '') + '<span class="va-muted va-filter-count" data-va-all="' + vaE(all) + '">' + vaE(all) + '</span></div>';
      out += '<div class="va-people va-people-scroll">' + rows.map(r => '<div class="va-person' + (r.pane != null ? ' va-person-link" title="Open this profile" onclick="vaIgGo(' + r.pane + ')' : '') + '" data-va-q="' + vaE((r.hh + ' ' + r.dn).toLowerCase()) + '">' + vaAvatar(r.dn || r.hh, 'sm') + '<div style="min-width:0;flex:1"><div style="font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + vaE(r.hh) + (r.priv ? ' <span title="Private account">🔒</span>' : '') + '</div><div class="va-acct-sub">' + vaE(r.dn) + '</div></div>' + (r.both ? '<span class="va-chip">' + (rel === 'followers' ? 'Following' : 'Follows you') + '</span>' : '') + '</div>').join('') + '</div>';
      if (total != null && total > rows.length) out += '<div class="va-empty">' + rows.length.toLocaleString() + ' of ' + total.toLocaleString() + ' ' + word + ' are in this dataset.</div>';
      return out;
    };
    let insHtml = '';
    if (ins.length) {
      const byMetric = {}; ins.forEach(x => { if (x.metric) (byMetric[x.metric] = byMetric[x.metric] || []).push(x); });
      const metrics = Object.keys(byMetric).sort((x, y) => vaIgOrder(x) - vaIgOrder(y) || x.localeCompare(y));
      // summary tiles
      insHtml = '<div class="va-ins-sum">';
      metrics.forEach(m => {
        const rows = byMetric[m].slice().sort((x, y) => String(x.date).localeCompare(String(y.date)));
        const vals = rows.map(r => vaNum(r.value) || 0);
        const last = vals[vals.length - 1], total = vals.reduce((s, v) => s + v, 0);
        const stock = vaIgStock(m);
        const detail = stock ? ((last - vals[0] >= 0 ? '+' : '') + (last - vals[0]).toLocaleString() + ' since ' + vaShortDay(rows[0].date)) : (rows.length + '-day total, avg ' + Math.round(total / Math.max(1, vals.length)).toLocaleString() + ' a day');
        insHtml += '<div class="va-ins-tile"><div class="hero-stat-label">' + vaE(vaIgMetric(m)) + '</div><div class="va-ins-val">' + (stock ? last : total).toLocaleString() + '</div><div class="va-acct-sub">' + vaE(detail) + '</div></div>';
      });
      insHtml += '</div>';
      // the same numbers by date
      const days = Array.from(new Set(ins.map(x => String(x.date || '').slice(0, 10)).filter(Boolean))).sort().reverse();
      const cell = {}; ins.forEach(x => { cell[x.metric + '|' + String(x.date || '').slice(0, 10)] = vaNum(x.value); });
      insHtml += '<div class="va-card" style="overflow-x:auto;padding:6px 8px"><table class="va-ins-table"><thead><tr><th>Date</th>' + metrics.map(m => '<th>' + vaE(vaIgMetric(m)) + '</th>').join('') + '</tr></thead><tbody>' + days.map(d => '<tr><td>' + vaE(vaDay(d)) + '</td>' + metrics.map(m => { const v = cell[m + '|' + d]; return '<td>' + (v == null ? '<span class="va-muted">·</span>' : v.toLocaleString()) + '</td>'; }).join('') + '</tr>').join('') + '</tbody></table></div>';
      // one chart per metric
      insHtml += '<div class="va-ins-grid">';
      metrics.forEach(m => {
        const rows = byMetric[m].slice().sort((x, y) => String(x.date).localeCompare(String(y.date)));
        const vals = rows.map(r => vaNum(r.value) || 0);
        const max = Math.max.apply(null, vals.concat([1])), min = vaIgStock(m) ? Math.min.apply(null, vals) * 0.995 : 0;
        const last = vals[vals.length - 1], delta = last - vals[0];
        let bars = '<svg viewBox="0 0 ' + (rows.length * 20) + ' 70" style="width:100%;height:80px;margin-top:8px">';
        rows.forEach((r, i) => { const hgt = Math.max(2, 60 * ((vals[i] - min) / Math.max(1, max - min))); bars += '<rect x="' + (i * 20 + 3) + '" y="' + (62 - hgt) + '" width="14" height="' + hgt + '" rx="2" fill="var(--accent2)"><title>' + vaE(vaShortDay(r.date) + ': ' + vals[i].toLocaleString()) + '</title></rect>'; });
        bars += '</svg>';
        insHtml += '<div class="va-card"><div class="hero-stat-label">' + vaE(vaIgMetric(m)) + '</div><div class="va-acct-bal" style="margin-top:2px">' + last.toLocaleString() + '</div><div class="va-acct-sub">' + (delta >= 0 ? '+' : '') + delta.toLocaleString() + ' since ' + vaE(vaShortDay(rows[0].date)) + '</div>' + bars + '<div class="va-legend" style="justify-content:space-between"><span>' + vaE(vaShortDay(rows[0].date)) + '</span><span>' + vaE(vaShortDay(rows[rows.length - 1].date)) + '</span></div></div>';
      });
      insHtml += '</div>';
    }
    h += vaTabs(grp, [
      {label: '▦ Posts', html: grid, key: 'posts'},
      {label: '☰ Feed with comments', html: feedList, key: 'feed'},
      {label: '💬 Comments (' + cmtRows.length + ')', html: cmtList, key: 'comments'},
      {label: '🔖 Saved (' + savedRows.length + ')', html: savedGrid, key: 'saved'},
      {label: 'Followers (' + followers.length + ')', html: people(followers, 'followers', fc ? Number(fc.value) : null), key: 'followers'},
      {label: 'Following (' + following.length + ')', html: people(following, 'following', fgc ? Number(fgc.value) : null), key: 'following'},
      {label: '📈 Insights', html: insHtml, key: 'insights'},
    ]);
    h += '</div>';
  });
  vaLater();
  return h + '</div>';
}
function vaIgOpen(el) {
  try {
    const S = _vaIg; if (!S) return;
    const p = S.posts[Number(el.getAttribute('data-va-post'))]; if (!p) return;
    const a = S.acctById[p.account_id] || {};
    const owner = S.userById[a.owner_user_id] || {};
    const k = S.keysByPost[p.id][0];
    const likes = S.likesOf ? S.likesOf(p) : vaNum(p.like_count != null ? p.like_count : p.likes);
    const saves = S.sByPost[p.id] || [];
    const cs = S.cByPost[p.id] || [];
    let h = '<div class="va-modal-box"><div class="va-modal-img">' + (k ? vaImgTag(k, '', trunc(String(p.caption || 'Post'), 80)) : '<div class="va-empty">No image</div>') + '</div><div class="va-modal-side">';
    h += '<div class="va-modal-hdr"><span class="va-ring">' + vaAvatar(owner.display_name || S.handle(a), 'sm') + '</span><div><div style="font-weight:600">' + vaE(S.handle(a)) + '</div><div class="va-acct-sub">' + vaE(vaHuman(p.kind || 'feed') === 'Feed' ? 'Post' : vaHuman(p.kind)) + '</div></div><button class="va-modal-x" onclick="vaIgClose()">×</button></div>';
    h += '<div class="va-modal-body">';
    if (p.caption) h += '<div class="va-cmt">' + vaAvatar(owner.display_name || S.handle(a), 'sm') + '<div><b>' + vaE(S.handle(a)) + '</b>' + vaE(p.caption) + '<div class="va-cmt-time">' + vaE(vaWhen(p.created_at)) + '</div></div></div>';
    cs.forEach(c => { h += '<div class="va-cmt">' + vaAvatar(S.uHandle(c.author_user_id), 'sm') + '<div><b>' + vaE(S.uHandle(c.author_user_id)) + '</b>' + vaE(c.text || '') + '<div class="va-cmt-time">' + vaE(vaWhen(c.created_at)) + '</div></div></div>'; });
    if (!cs.length) h += '<div class="va-empty">No comments yet.</div>';
    h += '</div><div class="va-modal-foot">' + (likes != null ? '<b style="color:var(--text)">♥ ' + likes.toLocaleString() + ' likes</b> · ' : '') + cs.length + ' comment' + (cs.length === 1 ? '' : 's') + ' · ' + saves.length + ' save' + (saves.length === 1 ? '' : 's') + (saves.length ? ' (' + vaE(saves.map(s => S.handle(S.acctById[s.account_id])).join(', ')) + ')' : '') + '<br>' + vaE(vaWhen(p.created_at)) + '</div></div></div>';
    let m = document.getElementById('va-modal');
    if (!m) { m = document.createElement('div'); m.id = 'va-modal'; m.className = 'va-modal'; m.onclick = ev => { if (ev.target === m) vaIgClose(); }; document.body.appendChild(m); }
    m.innerHTML = h; m.style.display = 'flex';
    vaHydrate();
  } catch (e) {}
}
function vaIgClose() { const m = document.getElementById('va-modal'); if (m) m.style.display = 'none'; }
// Open another account's profile pane from a follower row.
function vaIgGo(i) {
  try {
    const b = document.querySelector('.va-ig-sw[data-va-tab="' + i + '"]');
    if (!b) return;
    vaTab(b);
    b.scrollIntoView({block: 'nearest', inline: 'center'});
    const top = document.querySelector('.va-ig');
    if (top) top.scrollIntoView({block: 'start'});
  } catch (e) {}
}

// ── Messenger ────────────────────────────────────────────────────────────────
function renderMessenger(data) {
  const users = vaRows(data.users), threads = vaRows(data.threads), msgs = vaRows(data.messages);
  if (!threads.length && !msgs.length) return renderOpenedRecords(data);
  const seed = vaSeed();
  const byEmail = {};
  vaRows((seed.contacts || {}).contacts).forEach(c => { const n = [c.first_name, c.last_name].filter(Boolean).join(' ').trim(); [c.email, c.work_email].forEach(e => { if (e && n) byEmail[String(e).toLowerCase()] = n; }); });
  const name = {};
  users.forEach(u => { if (u.id) name[u.id] = vaPick(u.name, u.display_name, byEmail[String(u.email || '').toLowerCase()]) || (u.email ? String(u.email).split('@')[0] : ''); });
  let me = data.current_user_id || '';
  if (!me && data.current_user_email) { const u = users.find(x => String(x.email || '').toLowerCase() === String(data.current_user_email).toLowerCase()); if (u) me = u.id; }
  if (!me) { const u = users.find(x => PERSONA && x.name === PERSONA.name); if (u) me = u.id; }
  if (!me) { const c = {}; threads.forEach(t => _arr(t.participant_ids).forEach(p => { c[p] = (c[p] || 0) + 1; })); me = Object.keys(c).sort((a, b) => c[b] - c[a])[0] || ''; }
  // 1:1 thread titles name the other person when the users table does not.
  threads.forEach(t => { const ps = _arr(t.participant_ids); if (ps.length === 2 && vaPick(t.title)) { const other = ps.find(p => p !== me); if (other && !name[other]) name[other] = t.title; } });
  if (me && !name[me]) name[me] = PERSONA.name || 'You';
  const who = id => name[id] || 'Unknown contact';
  const byThread = {}; msgs.forEach(m => { (byThread[m.thread_id] = byThread[m.thread_id] || []).push(m); });
  Object.keys(byThread).forEach(k => byThread[k].sort((a, b) => vaMs(a.created_at || a.timestamp) - vaMs(b.created_at || b.timestamp)));
  const tList = threads.slice().sort((a, b) => {
    const la = (byThread[a.id] || []).slice(-1)[0], lb = (byThread[b.id] || []).slice(-1)[0];
    return vaMs((lb && lb.created_at) || b.updated_at) - vaMs((la && la.created_at) || a.updated_at);
  });
  const title = t => vaPick(t.title) || _arr(t.participant_ids).filter(p => p !== me).map(who).join(', ') || 'Conversation';
  // Messenger names its files ({name, mime_type}) and carries no bytes; vaAttResolve
  // finds them in the filesystem, an email or the Instagram library.
  const attOf = m => _arr(m && m.attachments).map(a => typeof a === 'string' ? {name: a} : a).filter(a => a && typeof a === 'object' && (a.name || a.filename || a.title || a.path))
    .map(a => ({name: String(a.name || a.filename || a.title || String(a.path).split('/').pop()), mime: a.mime_type || a.mime || '', b64: typeof (a.content_base64 || a.data) === 'string' ? (a.content_base64 || a.data) : ''}));
  const preview = m => {
    if (!m) return '';
    const mine = m.sender_id === me;
    const pre = mine ? 'You: ' : '';
    if (m.unsent_at) return (mine ? 'You' : who(m.sender_id).split(' ')[0]) + ' unsent a message';
    const atts = attOf(m);
    if (!m.text && atts.length) return pre + (atts.every(a => vaAttKind(a.mime || vaMimeOf(a.name)) === 'image') ? 'sent a photo' : 'sent an attachment');
    return pre + String(m.text || '');
  };
  let list = '<div class="va-ms-list"><div class="va-ms-list-hdr">Chats</div>';
  let panes = '';
  tList.forEach((t, i) => {
    const rows = byThread[t.id] || [];
    const last = rows[rows.length - 1];
    const ttl = title(t);
    const group = _arr(t.participant_ids).length > 2;
    list += '<div class="va-ms-item' + (i === 0 ? ' on' : '') + '" data-va-group="ms" data-va-tab="' + i + '" onclick="vaTab(this)">' + vaAvatar(ttl) + '<div style="min-width:0;flex:1"><div class="va-ms-item-name">' + vaE(ttl) + '</div><div class="va-ms-item-prev">' + vaE(trunc(preview(last), 60)) + (last ? ' · ' + vaE(vaAgo(last.created_at || last.timestamp)) : '') + '</div></div></div>';
    let body = '', prevT = 0, prevS = null;
    rows.forEach(m => {
      const ts = vaMs(m.created_at || m.timestamp);
      if (!prevT || ts - prevT > 3600000) { body += '<div class="va-ms-sep">' + vaE(fmtDT(ts)) + '</div>'; prevS = null; }
      const mine = m.sender_id === me;
      body += '<div class="va-ms-row' + (mine ? ' me' : '') + '">';
      if (!mine) body += (prevS === m.sender_id ? '<div style="width:28px"></div>' : vaAvatar(who(m.sender_id), 'sm'));
      body += '<div class="va-ms-col">';
      if (!mine && group && prevS !== m.sender_id) body += '<div class="va-ms-who">' + vaE(who(m.sender_id)) + '</div>';
      if (m.unsent_at) body += '<div class="va-bub unsent" title="' + vaE('Unsent ' + vaWhen(m.unsent_at)) + '">' + vaE((mine ? 'You' : who(m.sender_id).split(' ')[0]) + ' unsent a message') + '</div>';
      else {
        if (m.text) body += '<div class="va-bub">' + vaE(m.text) + '</div>';
        const atts = vaAttList(attOf(m), 'ms:' + (m.id || t.id || ''), '');
        if (atts.length) body += vaAttStripHtml(atts, {compact: true});
        const reacts = _arr(m.reactions);
        if (reacts.length) body += '<div class="va-react">' + vaE(reacts.map(r => vaEmojiFace(typeof r === 'string' ? r : (r && (r.emoji || r.reaction || r.name)) || '')).join(' ')) + '</div>';
      }
      body += '<div class="va-ms-time">' + vaE(fmtTime(ts)) + '</div></div></div>';
      prevT = ts; prevS = m.sender_id;
    });
    if (!rows.length) body = '<div class="va-empty">No messages in this conversation.</div>';
    const others = _arr(t.participant_ids).filter(p => p !== me).map(who);
    panes += '<div class="va-ms-pane' + (i === 0 ? ' va-show' : '') + '" data-va-group="ms" data-va-tab="' + i + '"><div class="va-ms-hdr">' + vaAvatar(ttl) + '<div><div style="font-weight:650">' + vaE(ttl) + '</div><div class="va-acct-sub">' + vaE(group ? others.join(', ') : 'Messenger') + ' · ' + rows.length + ' messages</div></div></div><div class="va-ms-body">' + body + '</div></div>';
  });
  list += '</div>';
  vaLater();
  return '<div class="va va-ms">' + list + '<div style="min-height:0;overflow:hidden">' + panes + '</div></div>';
}

function renderRecordsVault(data) {
  const docs = vaRows(data.rv_documents);
  if (!docs.length) return renderOpenedRecords(data);
  const versions = vaRows(data.rv_document_versions);
  const byDoc = {};
  versions.forEach(v => {
    if (!byDoc[v.document_id] || Number(v.version) > Number(byDoc[v.document_id].version)) byDoc[v.document_id] = v;
  });
  let h = '<div style="max-width:760px">';
  docs.forEach(doc => {
    const ver = byDoc[doc.id] || {};
    const b64 = ver.content_inline_b64 || '';
    const path = String(doc.title || '');
    const fname = path.split('/').pop() || path || 'File';
    const png = b64.indexOf('iVBORw0KGgo') === 0;
    h += '<div class="gen-rec" style="padding:12px 14px;margin-bottom:14px">';
    h += '<div style="font-weight:700">' + vaE(fname) + '</div>';
    if (ver.change_note) h += '<div style="color:var(--text-2);font-size:13px;margin-top:4px">' + vaE(ver.change_note) + '</div>';
    const size = Number(ver.size_bytes || doc.size_bytes || 0);
    h += '<div style="color:var(--muted);font-size:12px;margin-top:4px">Version ' + vaE(String(ver.version || doc.current_version || 1)) + (size ? ' · ' + size.toLocaleString() + ' bytes' : '') + '</div>';
    if (b64 && (png || b64.indexOf('/9j/') === 0)) h += vaImgTag(vaMediaKey('rv:' + (doc.id || fname), png ? 'image/png' : 'image/jpeg', b64, ''), '', fname).replace('<img ', '<img style="max-width:100%;margin-top:10px;border-radius:6px;background:#111" ');
    h += '</div>';
  });
  vaLater();
  return h + '</div>';
}

function renderOpenedRecords(data) {
  const arrays = [];
  if (data && typeof data === 'object') {
    for (const [key, value] of Object.entries(data)) {
      if (Array.isArray(value) && value.length) arrays.push([key, value]);
    }
  }
  if (!arrays.length) return '<p class="empty-state">No records</p>';
  let h = '<div style="max-width:900px">';
  for (const [key, rows] of arrays) {
    h += '<div class="gen-section"><div class="gen-sec-title">' + esc(key) + ' (' + rows.length + ')</div>';
    rows.slice(0, 40).forEach((row, i) => {
      if (!row || typeof row !== 'object') {
        h += '<div class="gen-rec">' + esc(String(row)) + '</div>';
        return;
      }
      const title = row.title || row.name || row.caption || row.merchant_name || row.merchant || row.id || (key + ' ' + (i + 1));
      h += '<details class="gen-rec"' + (i === 0 ? ' open' : '') + '><summary><b>' + esc(String(title)) + '</b></summary>';
      const img = row.content_base64 || row.image_base64 || '';
      if (typeof img === 'string' && img.length > 20) {
        const mime = String(row.mime || row.mime_type || 'image/jpeg');
        h += '<img alt="' + esc(String(title)) + '" src="data:' + esc(mime) + ';base64,' + img.replace(/\s+/g, '') + '" style="max-width:100%;margin-top:8px">';
      }
      h += '</details>';
    });
    h += '</div>';
  }
  return h + '</div>';
}

// ── Server dispatcher ─────────────────────────────────────────────────────────
function renderServer(name) {
  const data = SEED[name];
  if (!data) return '<p class="empty-state">No data for ' + name + '</p>';
  // Normalize server names (handle hyphens vs underscores)
  const key = name.replace(/-/g, '_');
  // Hero stats strip (sticky-feeling banner with 3 numbers)
  const hero = renderHeroStats(key, data);
  const bodyFn = () => {
  switch(key) {
    case 'email':     return renderEmail(data);
    case 'calendar':  return renderCalendar(data);
    case 'messaging': return renderMessaging(data);
    case 'contacts':  return renderContacts(data);
    case 'strava':    return renderStrava(data);
    case 'fintrack':  return renderFintrack(data);
    case 'fitbit':    return renderFitbit(data);
    case 'sonos':     return renderSonos(data);
    case 'reminder':  return renderReminder(data);
    case 'logistics_tracking': return renderLogistics(data);
    case 'shopify':   return renderShopify(data);
    case 'shopping':  return renderShopping(data);
    case 'stripe':    return renderStripe(data);
    case 'ticketmaster': return renderTicketmaster(data);
    case 'airtable':  return renderAirtable(data);
    case 'notion':    return renderNotion(data);
    case 'slack':     return renderSlack(data);
    case 'github':    return renderGitHub(data);
    case 'zillow':    return renderZillow(data);
    case 'filesystem': return renderFilesystem(data);
    case 'duffel':    return renderDuffel(data);
    case 'facebook':  return renderFacebook(data);
    case 'instagram': return renderInstagram(data);
    case 'messenger': return renderMessenger(data);
    case 'plaid':     return renderPlaid(data);
    case 'records_vault': return renderRecordsVault(data);
    case 'instacart': return renderInstacart(data);
    case 'fresh_direct': return renderFreshDirect(data);
    case 'eight_sleep':  return renderEightSleep(data);
    case 'apple_health': return renderAppleHealth(data);
    case 'garmin_connect': case 'garmin_health': return renderGarmin(data);
    case 'myfitnesspal': return renderMyFitnessPal(data);
    case 'amazon_fresh': return renderAmazonFresh(data);
    case 'quickbooks': return renderQuickbooksPro(data);
    case 'crm':       return renderCRM(data);
    case 'linear':    return renderLinear(data);
    default:          return renderGeneric(data);
  }
  };
  return hero + bodyFn();
}

function renderGitHub(data) {
  const repos = (data && data.repositories) || [];
  const prs = (data && data.pull_requests) || [];
  const issues = (data && data.issues) || [];
  const commits = (data && data.commits) || [];
  const sidecar = 'github_viewer.html';
  let h = '<div class="gen-wrap">';
  h += '<div class="gen-section" style="display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap">';
  h += '<div>';
  h += '<div class="gen-sec-title">GitHub Standalone Viewer</div>';
  h += '<div style="font-size:12px;color:var(--muted);max-width:620px">Primer-style GitHub UI built from GitHub_Server/tools/build_viewer.py with the deterministic GitHub payload for this universe.</div>';
  h += '</div>';
  h += '<a href="'+sidecar+'" target="_blank" style="display:inline-flex;align-items:center;gap:8px;padding:10px 14px;border-radius:6px;background:var(--accent);color:#fff;text-decoration:none;font-weight:700;font-size:13px">Open GitHub Viewer</a>';
  h += '</div>';
  if (GITHUB_VIEWER_HTML) {
    h += '<iframe title="GitHub viewer" srcdoc="'+attrEsc(GITHUB_VIEWER_HTML)+'" style="width:100%;height:calc(100vh - 250px);min-height:720px;border:1px solid var(--border);border-radius:8px;background:#0d1117"></iframe>';
    h += '<div style="font-size:11px;color:var(--muted);margin:8px 0 14px">Standalone copy: <a href="'+sidecar+'" target="_blank" style="color:var(--accent)">github_viewer.html</a></div>';
    h += '</div>';
    return h;
  }
  h += '<div class="hero-stats" style="margin-bottom:12px">';
  h += '<div class="hero-stat"><div class="hero-stat-num">'+repos.length.toLocaleString()+'</div><div class="hero-stat-lbl">Repositories</div></div>';
  h += '<div class="hero-stat"><div class="hero-stat-num">'+prs.length.toLocaleString()+'</div><div class="hero-stat-lbl">Pull Requests</div></div>';
  h += '<div class="hero-stat"><div class="hero-stat-num">'+issues.length.toLocaleString()+'</div><div class="hero-stat-lbl">Issues</div></div>';
  h += '<div class="hero-stat"><div class="hero-stat-num">'+commits.length.toLocaleString()+'</div><div class="hero-stat-lbl">Commits</div></div>';
  h += '</div>';
  h += '<div class="gen-section"><div class="gen-sec-title">Repositories</div>';
  repos.slice(0, 12).forEach(r => {
    h += '<div class="gen-rec" style="padding:12px 14px">';
    h += '<div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start">';
    h += '<div><div style="font-weight:700">'+esc(r.full_name || r.name || r.repo_id)+'</div>';
    h += '<div style="font-size:12px;color:var(--muted);margin-top:3px">'+esc(r.description || '')+'</div></div>';
    h += '<div style="font-size:11px;color:var(--muted);white-space:nowrap">'+esc(r.language || '')+'</div>';
    h += '</div></div>';
  });
  h += '</div></div>';
  return h;
}

// ── Filesystem (documents: PDF / xlsx / dxf / png / text) ──────────────────────
function renderFilesystem(data) {
  const files = (data && data.files) || [];
  const dirs = (data && data.directories) || [];
  if (!files.length) return '<p class="empty-state">No files</p>';
  const MIME = {pdf:'application/pdf', png:'image/png', jpg:'image/jpeg', jpeg:'image/jpeg',
    gif:'image/gif', xlsx:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    docx:'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    dxf:'image/vnd.dxf', txt:'text/plain', md:'text/markdown', csv:'text/csv', json:'application/json',
    svg:'image/svg+xml'};
  const ICON = {pdf:'📄', png:'🖼️', jpg:'🖼️', jpeg:'🖼️',
    gif:'🖼️', xlsx:'📊', dxf:'📐', txt:'📃', md:'📃', csv:'📈', svg:'🖼️'};
  const b64len = s => { try { return atob(s).length; } catch(e) { return (s||'').length; } };
  const fmt = b => b < 1024 ? b+' B' : (b < 1048576 ? (b/1024).toFixed(1)+' KB' : (b/1048576).toFixed(1)+' MB');
  const imgExt = e => ['png','jpg','jpeg','gif'].includes(e);
  let h = '<div style="max-width:1000px">';
  h += '<div class="gen-section"><div class="gen-sec-title">Files (' + files.length +
       (dirs.length ? ' across ' + dirs.length + ' folders' : '') + ')</div>';
  files.slice().sort((a,b)=>(a.path||'')<(b.path||'')?-1:1).forEach(f => {
    const path = f.path || '(no path)';
    const ext = (path.split('.').pop() || '').toLowerCase();
    const isB64 = f.encoding === 'base64';
    const isExternal = !!(f.viewer_external && f.viewer_uri);
    const size = Number(f.size_bytes || f.size || (isB64 ? b64len(f.content) : (f.content || '').length));
    const mime = MIME[ext] || 'application/octet-stream';
    const uri = isExternal ? f.viewer_uri
                           : (isB64 ? ('data:' + mime + ';base64,' + (f.content||''))
                                    : ('data:' + mime + ';charset=utf-8,' + encodeURIComponent(f.content||'')));
    const fname = path.split('/').pop();
    h += '<div class="gen-rec" style="padding:10px 12px;margin-bottom:10px">';
    h += '<div style="display:flex;gap:10px;align-items:center;justify-content:space-between">';
    h += '<div>' + (ICON[ext]||'📎') + ' <b>' + esc(path) + '</b> ' +
         '<span style="color:var(--muted);font-size:12px">' + esc(ext.toUpperCase()) + ' · ' + fmt(size) + '</span></div>';
    h += '<a href="' + attrEsc(uri) + '" download="' + esc(fname) + '" style="font-size:12px;white-space:nowrap">Download</a>';
    h += '</div>';
    if (ext === 'pdf') {
      h += '<iframe src="' + attrEsc(uri) + '" style="width:100%;height:540px;border:1px solid var(--border);border-radius:6px;margin-top:8px;background:#fff"></iframe>';
    } else if (ext === 'svg') {
      // PA-02: an externalised (base64) SVG has no inline markup; preview its rendered file.
      h += '<div style="max-width:680px;border:1px solid var(--border);border-radius:6px;margin-top:8px;overflow:hidden;background:#fff">' + ((isExternal || !f.content) ? '<img src="' + attrEsc(uri) + '" alt="' + esc(fname) + '" style="max-width:100%;display:block">' : (f.content||'')) + '</div>';
    } else if (imgExt(ext)) {
      h += '<img src="' + attrEsc(uri) + '" style="max-width:100%;border:1px solid var(--border);border-radius:6px;margin-top:8px">';
    } else if (!isB64) {
      h += '<pre style="white-space:pre-wrap;background:rgba(127,127,127,.08);padding:10px;border-radius:6px;margin-top:8px;font-size:12px;max-height:320px;overflow:auto">' + esc(f.content||'') + '</pre>';
    } else {
      const OPENER = {xlsx:'Excel or Numbers', dxf:'a CAD viewer (e.g. sharecad.org)',
                      docx:'Word or Pages', pptx:'PowerPoint or Keynote'};
      const opener = OPENER[ext] || 'an external app';
      h += '<div style="color:var(--muted);font-size:12px;margin-top:6px">Binary ' + esc(ext.toUpperCase()) +
           ' file - download to open in ' + opener + '.</div>';
    }
    h += '</div>';
  });
  h += '</div></div>';
  return h;
}

// ── Fitbit ────────────────────────────────────────────────────────────────────
function renderFitbit(data) {
  const daily = (data.daily_summaries||data.daily_stats||[]).sort((a,b)=>b.date>a.date?1:-1);
  const sleep = data.sleep_logs||[];
  const food = data.food_logs||[];
  const avgSteps = daily.length ? Math.round(daily.reduce((s,d)=>s+(d.steps||0),0)/daily.length) : 0;
  const hrData = daily.filter(d=>d.resting_heart_rate);
  const avgHR = hrData.length ? Math.round(hrData.reduce((s,d)=>s+(d.resting_heart_rate||0),0)/hrData.length) : 0;
  const avgSleep = sleep.length ? (sleep.reduce((s,d)=>s+(d.minutes_asleep||0),0)/sleep.length/60).toFixed(1) : '?';

  let h = '<div style="max-width:900px">';
  h += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px;margin-bottom:20px">';
  h += '<div class="ov-card"><div style="font-size:11px;color:var(--muted)">Avg Steps</div><div style="font-size:24px;font-weight:800">'+avgSteps.toLocaleString()+'</div></div>';
  h += '<div class="ov-card"><div style="font-size:11px;color:var(--muted)">Avg Resting HR</div><div style="font-size:24px;font-weight:800;color:var(--orange)">'+avgHR+' bpm</div></div>';
  h += '<div class="ov-card"><div style="font-size:11px;color:var(--muted)">Avg Sleep</div><div style="font-size:24px;font-weight:800;color:var(--yellow)">'+avgSleep+' hrs</div></div>';
  h += '<div class="ov-card"><div style="font-size:11px;color:var(--muted)">Days Tracked</div><div style="font-size:24px;font-weight:800">'+daily.length+'</div></div>';
  h += '</div>';

  h += '<div class="gen-section"><div class="gen-sec-title">Daily Summaries ('+daily.length+')</div>';
  daily.slice(0,30).forEach(d => {
    const sleepD = sleep.find(s=>s.date===d.date);
    const sleepHrs = sleepD ? (sleepD.minutes_asleep/60).toFixed(1) : '?';
    const totalCal = d.calories_total != null ? d.calories_total : d.calories;
    const activeCal = (totalCal != null && d.calories_bmr != null)
      ? Math.round(Number(totalCal) - Number(d.calories_bmr))
      : (d.calories_active != null ? Math.round(Number(d.calories_active)) : '?');
    h += '<div class="gen-rec" style="display:flex;gap:16px;align-items:center;padding:8px 12px">';
    h += '<div style="font-size:12px;color:var(--muted);min-width:80px">'+esc(d.date)+'</div>';
    h += '<div>🚶 '+(d.steps||0).toLocaleString()+'</div>';
    h += '<div>❤️ '+(d.resting_heart_rate||'?')+' bpm</div>';
    h += '<div>🔥 '+activeCal+' cal</div>';
    h += '<div>😴 '+sleepHrs+' hrs</div>';
    h += '</div>';
  });
  if (daily.length > 30) h += '<div style="padding:8px 12px;color:var(--muted);font-size:12px">+'+(daily.length-30)+' more days</div>';
  h += '</div>';

  if (food.length) {
    h += '<div class="gen-section"><div class="gen-sec-title">Food Logs ('+food.length+')</div>';
    food.slice(0,20).forEach(f => {
      h += '<div class="gen-rec" style="padding:6px 12px;font-size:12px">';
      h += esc(f.date)+' - '+esc(f.food_name||f.meal_type||'')+' ('+esc(f.calories||'')+' cal)';
      h += '</div>';
    });
    h += '</div>';
  }
  return h + '</div>';
}

// ── Sonos ─────────────────────────────────────────────────────────────────────
function renderSonos(data) {
  const speakers = data.speakers||[];
  const favs = data.favorites||[];
  const tracks = data.favorite_tracks||[];
  const queue = data.queue_items||[];
  let h = '<div style="max-width:900px">';
  if (speakers.length) {
    h += '<div class="gen-section"><div class="gen-sec-title">Speakers ('+speakers.length+')</div>';
    speakers.forEach(s => {
      h += '<div class="gen-rec" style="padding:10px 14px"><strong>'+esc(s.room||s.name||'Speaker')+'</strong>';
      if (s.model) h += ' - '+esc(s.model);
      if (s.playback_state) h += ' ('+esc(s.playback_state)+')';
      h += '</div>';
    });
    h += '</div>';
  }
  if (favs.length) {
    h += '<div class="gen-section"><div class="gen-sec-title">Playlists ('+favs.length+')</div>';
    favs.forEach(f => {
      const ftracks = tracks.filter(t=>t.favorite_id===f.favorite_id);
      h += '<div class="gen-rec" style="padding:10px 14px"><strong>'+esc(f.title||'Playlist')+'</strong>';
      h += ' <span style="color:var(--muted);font-size:12px">'+ftracks.length+' tracks</span>';
      if (ftracks.length) {
        h += '<div style="margin-top:6px;font-size:12px;color:var(--muted)">';
        ftracks.slice(0,5).forEach(t => { h += esc(t.title)+' - '+esc(t.artist)+'<br>'; });
        if (ftracks.length > 5) h += '+'+(ftracks.length-5)+' more';
        h += '</div>';
      }
      h += '</div>';
    });
    h += '</div>';
  }
  if (queue.length) {
    h += '<div class="gen-section"><div class="gen-sec-title">Recent Queue ('+queue.length+')</div>';
    queue.slice(0,20).forEach(q => {
      h += '<div class="gen-rec" style="padding:6px 14px;font-size:12px">';
      h += esc(q.title||'')+' - '+esc(q.artist||'');
      if (q.added_at) h += ' <span style="color:var(--muted)">'+fmtDT(q.added_at)+'</span>';
      h += '</div>';
    });
    h += '</div>';
  }
  return h + '</div>';
}

// ── Reminder ──────────────────────────────────────────────────────────────────
function renderReminder(data) {
  const now = personaNowSeconds();
  const rems = (data.reminders||[]).sort((a,b)=>(a.due_datetime||0)-(b.due_datetime||0));
  let h = '<div style="max-width:700px">';
  rems.forEach(r => {
    const due = r.due_datetime||0;
    const done = !!r.time_notified;
    const overdue = !done && due < now;
    const color = done ? 'var(--green)' : overdue ? 'var(--red)' : 'var(--yellow)';
    h += '<div style="padding:10px 14px;margin-bottom:4px;border-left:3px solid '+color+';background:var(--surface);border-radius:0 6px 6px 0">';
    h += '<div style="display:flex;justify-content:space-between;align-items:center">';
    h += '<div style="font-weight:600;'+(done?'text-decoration:line-through;color:var(--muted)':'')+'">'+ esc(r.title||'')+'</div>';
    h += '<div style="font-size:11px;color:var(--muted)">'+fmtDT(due)+'</div>';
    h += '</div>';
    if (r.description) h += '<div style="font-size:12px;color:var(--muted);margin-top:4px">'+esc(r.description)+'</div>';
    h += '</div>';
  });
  return h + '</div>';
}

// ── Logistics Tracking ────────────────────────────────────────────────────────
function renderLogistics(data) {
  const shipments = data.shipments||[];
  const events = data.tracking_events||[];
  const RICHMOND = 'Richmond';

  // Pair outbound + return into round trips
  const sorted = shipments.slice().sort((a,b)=>new Date(a.created_at||0)-new Date(b.created_at||0));
  const routes = []; const used = new Set();
  for (let i=0;i<sorted.length;i++) {
    if (used.has(i)) continue;
    const out = sorted[i];
    if ((out.origin||'').includes(RICHMOND)) {
      let ret = null;
      for (let j=i+1;j<sorted.length&&j<=i+3;j++) {
        if (used.has(j)) continue;
        if ((sorted[j].destination||'').includes(RICHMOND)) { ret=sorted[j]; used.add(j); break; }
      }
      used.add(i);
      routes.push({out, ret});
    } else { used.add(i); routes.push({out, ret:null}); }
  }
  routes.reverse();

  let h = '<div style="max-width:900px">';
  routes.forEach(r => {
    const dest = (r.out.destination||'').split(',')[0];
    const routeEvts = events.filter(e=>e.tracking_number===r.out.tracking_number||(r.ret&&e.tracking_number===r.ret.tracking_number));
    routeEvts.sort((a,b)=>new Date(a.timestamp||0)-new Date(b.timestamp||0));
    h += '<div class="gen-rec" style="cursor:pointer;padding:14px" onclick="this.querySelector(\'.route-tl\')&&this.querySelector(\'.route-tl\').classList.toggle(\'open\')">';
    h += '<div style="font-weight:700">🚛 Richmond → '+esc(dest)+'</div>';
    h += '<div style="font-size:12px;color:var(--muted)">'+fmtDate(r.out.created_at)+' - '+fmtDate(r.ret?r.ret.actual_delivery:r.out.actual_delivery)+'</div>';
    h += '<div style="font-size:11px;color:var(--muted)">'+routeEvts.length+' tracking events</div>';
    if (routeEvts.length) {
      h += '<div class="route-tl" style="display:none;margin-top:10px;padding-top:10px;border-top:1px solid var(--border)">';
      routeEvts.forEach(e => {
        h += '<div style="font-size:12px;margin-bottom:4px"><span style="color:var(--muted)">'+fmtDT(e.timestamp)+'</span> '+esc(e.description||e.status||'');
        if (e.location) h += ' <span style="color:var(--muted)">- '+esc(e.location)+'</span>';
        h += '</div>';
      });
      h += '</div>';
    }
    h += '</div>';
  });
  return h + '</div>';
}

// ── Shopify ───────────────────────────────────────────────────────────────────
function renderShopify(data) {
  const customers = data.customers || [];
  const custById = {};
  customers.forEach(c => { custById[c.id] = c; });
  const products = data.products || [];

  const orders = (data.orders||[]).slice().sort((a,b)=>(b.order_date||b.created_at||0)-(a.order_date||a.created_at||0));

  const fulfilledStatuses = new Set(['delivered','shipped','fulfilled']);

  let h = '<div style="max-width:820px">';

  if (products.length) {
    h += '<div class="gen-section"><div class="gen-sec-title">Products ('+products.length+')</div>';
    products.forEach(p => {
      const title = p.model || p.title || p.name || ('SKU '+(p.sku||p.id));
      const brand = p.brand ? esc(p.brand)+' - ' : '';
      h += '<div class="gen-rec" style="padding:10px 14px;display:flex;justify-content:space-between;gap:12px">';
      h += '<div style="min-width:0"><div style="font-weight:600">'+brand+esc(title)+'</div>';
      if (p.description) h += '<div style="font-size:12px;color:var(--muted)">'+esc(p.description)+'</div>';
      if (p.sku || p.category) h += '<div style="font-size:11px;color:var(--muted);margin-top:2px">'+esc([p.sku, p.category].filter(Boolean).join(' · '))+'</div>';
      h += '</div>';
      h += '<div style="font-size:16px;font-weight:700;white-space:nowrap">$'+Number(p.price||0).toFixed(2)+'</div>';
      h += '</div>';
    });
    h += '</div>';
  }

  if (orders.length) {
    h += '<div class="gen-section"><div class="gen-sec-title">Orders ('+orders.length+')</div>';
    orders.forEach(o => {
      const status = (o.status || o.fulfillment_status || 'pending').toLowerCase();
      const fulfilled = fulfilledStatuses.has(status);
      const cust = custById[o.customer_id] || o.customer || {};
      const custName = (cust.first_name || cust.last_name) ? esc((cust.first_name||'')+' '+(cust.last_name||'')).trim() : '';
      const orderTs = o.order_date || o.created_at;
      const total = Number(o.total ?? o.total_price ?? 0);
      const subtotal = Number(o.subtotal ?? 0);
      const tax = Number(o.tax ?? 0);
      const shipping = Number(o.shipping ?? 0);
      const discount = Number(o.discount ?? 0);

      h += '<div class="gen-rec" style="padding:12px 14px;border-left:3px solid '+(fulfilled?'var(--green)':'var(--yellow)')+'">';
      h += '<div style="display:flex;justify-content:space-between;gap:12px"><strong>'+esc(o.order_number || o.id || '')+'</strong>';
      h += '<span style="font-size:18px;font-weight:700;color:var(--green)">$'+total.toFixed(2)+'</span></div>';
      h += '<div style="font-size:12px;color:var(--muted)">'+fmtDate(orderTs)+' - '+esc(status)+'</div>';
      if (custName) h += '<div style="font-size:12px;color:var(--muted)">Customer: '+custName+'</div>';
      if (o.shipping_address) h += '<div style="font-size:11px;color:var(--muted)">Ship to: '+esc(o.shipping_address)+'</div>';
      if (subtotal || tax || shipping || discount) {
        const parts = [];
        if (subtotal) parts.push('subtotal $'+subtotal.toFixed(2));
        if (shipping) parts.push('shipping $'+shipping.toFixed(2));
        if (tax) parts.push('tax $'+tax.toFixed(2));
        if (discount) parts.push('-$'+discount.toFixed(2)+' discount');
        h += '<div style="font-size:11px;color:var(--muted);margin-top:4px">'+esc(parts.join(' · '))+'</div>';
      }
      if (o.tracking_number) h += '<div style="font-size:11px;color:var(--muted)">Tracking: '+esc(o.tracking_number)+'</div>';
      h += '</div>';
    });
    h += '</div>';
  }

  if (customers.length) {
    h += '<div class="gen-section"><div class="gen-sec-title">Customers ('+customers.length+')</div>';
    customers.forEach(c => {
      const name = esc(((c.first_name||'')+' '+(c.last_name||'')).trim() || c.email || c.id);
      const loc = [c.city, c.state].filter(Boolean).join(', ');
      h += '<div class="gen-rec" style="padding:8px 14px;display:flex;justify-content:space-between;gap:12px">';
      h += '<div><div style="font-weight:600">'+name+'</div>';
      if (c.email) h += '<div style="font-size:12px;color:var(--muted)">'+esc(c.email)+'</div>';
      h += '</div>';
      h += '<div style="font-size:11px;color:var(--muted);text-align:right">';
      if (loc) h += esc(loc);
      if (c.loyalty_member) h += '<br>★ Loyalty';
      h += '</div></div>';
    });
    h += '</div>';
  }

  return h + '</div>';
}

// ── Shopping ──────────────────────────────────────────────────────────────────
// Nested-dict schema: products[{product_id,name,variants:{item_id:{price,...}}}]
//                     orders[{order_id,order_status,order_date,order_total,order_items:{item_id:{quantity,price,options}}}]
function renderShopping(data) {
  const products = data.products || [];
  const orders = (data.orders||[]).slice().sort((a,b)=>(b.order_date||0)-(a.order_date||0));
  const discounts = data.discount_codes || {};

  // Build item_id -> product_name lookup from product variants
  const itemToProduct = {};
  products.forEach(p => {
    const variants = p.variants || {};
    Object.keys(variants).forEach(itemId => { itemToProduct[itemId] = p.name || p.product_id; });
  });

  const fulfilledStatuses = new Set(['delivered','shipped','fulfilled','completed']);

  let h = '<div style="max-width:820px">';

  if (orders.length) {
    h += '<div class="gen-section"><div class="gen-sec-title">Orders ('+orders.length+')</div>';
    orders.forEach(o => {
      const status = (o.order_status || 'pending').toLowerCase();
      const fulfilled = fulfilledStatuses.has(status);
      const items = o.order_items || {};
      const itemKeys = Object.keys(items);
      const total = Number(o.order_total || 0);

      h += '<div class="gen-rec" style="padding:12px 14px;border-left:3px solid '+(fulfilled?'var(--green)':'var(--yellow)')+'">';
      h += '<div style="display:flex;justify-content:space-between;gap:12px"><strong>'+esc(o.order_id||'')+'</strong>';
      h += '<span style="font-size:18px;font-weight:700;color:var(--green)">$'+total.toFixed(2)+'</span></div>';
      h += '<div style="font-size:12px;color:var(--muted)">'+fmtDate(o.order_date)+' - '+esc(status)+'</div>';
      if (itemKeys.length) {
        h += '<div style="margin-top:6px;font-size:13px">';
        itemKeys.forEach(k => {
          const it = items[k];
          const name = itemToProduct[k] || k;
          const qty = it.quantity || 1;
          const price = Number(it.price || 0);
          const opts = it.options ? Object.entries(it.options).map(([k2,v2])=>k2+': '+v2).join(', ') : '';
          h += '<div style="display:flex;justify-content:space-between;padding:2px 0">';
          h += '<span>'+(qty>1?qty+'× ':'')+esc(name)+(opts?' <span style="color:var(--muted);font-size:11px">('+esc(opts)+')</span>':'')+'</span>';
          h += '<span style="color:var(--muted);font-size:12px">$'+price.toFixed(2)+'</span>';
          h += '</div>';
        });
        h += '</div>';
      }
      h += '</div>';
    });
    h += '</div>';
  }

  if (products.length) {
    h += '<div class="gen-section"><div class="gen-sec-title">Products ('+products.length+')</div>';
    products.forEach(p => {
      const variants = p.variants || {};
      const variantKeys = Object.keys(variants);
      const priceRange = variantKeys.length ? (function(){
        const prices = variantKeys.map(k=>Number(variants[k].price||0)).filter(x=>x>0);
        if (!prices.length) return null;
        const mn = Math.min(...prices), mx = Math.max(...prices);
        return mn===mx ? '$'+mn.toFixed(2) : '$'+mn.toFixed(2)+'-$'+mx.toFixed(2);
      })() : null;
      h += '<div class="gen-rec" style="padding:8px 14px;display:flex;justify-content:space-between;gap:12px">';
      h += '<div style="min-width:0"><div style="font-weight:600">'+esc(p.name||p.product_id||'')+'</div>';
      if (variantKeys.length>1) h += '<div style="font-size:11px;color:var(--muted)">'+variantKeys.length+' variants</div>';
      h += '</div>';
      if (priceRange) h += '<div style="font-size:14px;font-weight:600;white-space:nowrap">'+priceRange+'</div>';
      h += '</div>';
    });
    h += '</div>';
  }

  const discKeys = Object.keys(discounts);
  if (discKeys.length) {
    h += '<div class="gen-section"><div class="gen-sec-title">Discount Codes ('+discKeys.length+')</div>';
    discKeys.forEach(k => {
      const d = discounts[k] || {};
      h += '<div class="gen-rec" style="padding:6px 14px;display:flex;justify-content:space-between">';
      h += '<span style="font-family:monospace;font-weight:600">'+esc(k)+'</span>';
      h += '<span style="color:var(--muted);font-size:12px">'+esc(d.description || d.amount || '')+'</span>';
      h += '</div>';
    });
    h += '</div>';
  }

  return h + '</div>';
}

// ── Stripe ────────────────────────────────────────────────────────────────────
function renderStripe(data) {
  const pis = (data.payment_intents||[]).sort((a,b)=>(b.created||0)-(a.created||0));
  const payouts = (data.payouts||[]).sort((a,b)=>(b.created||0)-(a.created||0));
  let h = '<div style="max-width:800px">';
  if (payouts.length) {
    h += '<div class="gen-section"><div class="gen-sec-title">Payouts ('+payouts.length+')</div>';
    payouts.forEach(p => {
      h += '<div class="gen-rec" style="padding:10px 14px;display:flex;justify-content:space-between">';
      h += '<div><div style="font-weight:600">'+esc(p.description||'Payout')+'</div>';
      h += '<div style="font-size:11px;color:var(--muted)">'+fmtDT(p.created)+'</div></div>';
      h += '<div style="font-size:18px;font-weight:700;color:var(--green)">$'+(p.amount/100).toFixed(2)+'</div>';
      h += '</div>';
    });
    h += '</div>';
  }
  if (pis.length) {
    h += '<div class="gen-section"><div class="gen-sec-title">Payments ('+pis.length+')</div>';
    pis.forEach(pi => {
      h += '<div class="gen-rec" style="padding:10px 14px;display:flex;justify-content:space-between">';
      h += '<div><div style="font-weight:600">'+esc(pi.description||pi.id)+'</div>';
      h += '<div style="font-size:11px;color:var(--muted)">'+fmtDT(pi.created)+' - '+esc(pi.status)+'</div></div>';
      h += '<div style="font-size:16px;font-weight:700">$'+(pi.amount/100).toFixed(2)+'</div>';
      h += '</div>';
    });
    h += '</div>';
  }
  return h + '</div>';
}

// ── Email ─────────────────────────────────────────────────────────────────────
let _emThreads = null;  // cached for the keyboard handler

function renderEmail(data) {
  const emails = data.emails || [];
  const byId = {};
  emails.forEach(e => { byId[e.email_id] = e; });

  function rootOf(e) {
    let cur = e, depth = 0;
    while (cur && cur.parent_id && byId[cur.parent_id] && depth < 50) {
      cur = byId[cur.parent_id]; depth++;
    }
    return cur.email_id;
  }
  const threadMap = {};
  emails.forEach(e => {
    const r = rootOf(e);
    (threadMap[r] = threadMap[r] || []).push(e);
  });
  const threads = Object.values(threadMap)
    .map(t => { t.sort((a,b)=>(a.timestamp||0)-(b.timestamp||0)); return t; })
    .sort((a,b) => (b[b.length-1].timestamp||0) - (a[a.length-1].timestamp||0));
  _emThreads = threads;

  function senderLabel(e) {
    const raw = e.sender || '';
    if (raw.includes('<')) return raw.split('<')[0].trim();
    return raw.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }
  function lastSnippet(t) {
    const last = t[t.length-1];
    return (last.content || '').slice(0, 110).replace(/\s+/g, ' ').trim();
  }

  let h = '<div class="em-layout">';
  // Left pane - thread list
  h += '<div class="em-list">';
  h += `<div class="em-list-hdr">${emails.length} messages · ${threads.length} threads</div>`;
  threads.forEach((thread, ti) => {
    const root = thread[0];
    const last = thread[thread.length-1];
    const hasUnread = thread.some(e => !e.is_read);
    const sender = senderLabel(last);
    const subj = (root.subject || '(no subject)').replace(/^(re|fwd?):\s*/i, '');
    const nAtt = thread.reduce((s, e) => s + vaEmailAtts(e).length, 0);
    h += `<div class="em-thread-item ${hasUnread?'unread':''}" data-em="${ti}" onclick="showEmailThread(${ti})">`;
    h += `<div class="em-thread-row">`;
    h += `<div class="em-thread-sender">${esc(sender)}</div>`;
    if (nAtt) h += `<span class="em-thread-clip" title="${nAtt} attachment${nAtt===1?'':'s'}">📎</span>`;
    if (thread.length > 1) h += `<span class="em-thread-count">${thread.length}</span>`;
    h += `<div class="em-thread-date">${esc(fmtDate(last.timestamp))}</div>`;
    h += `</div>`;
    h += `<div class="em-thread-subj">${esc(subj)}</div>`;
    h += `<div class="em-thread-snip">${esc(lastSnippet(thread))}</div>`;
    h += `</div>`;
  });
  h += '</div>';

  // Right pane - reader
  h += '<div class="em-reader" id="em-reader">';
  h += '<div class="em-empty">Select a thread to read</div>';
  h += '</div>';
  h += '</div>';

  // Auto-open first thread after the DOM lands
  setTimeout(() => { if (_emThreads && _emThreads.length) showEmailThread(0); }, 0);

  return h;
}

function showEmailThread(idx) {
  const threads = _emThreads || [];
  const thread = threads[idx];
  if (!thread) return;
  document.querySelectorAll('.em-thread-item').forEach(el => el.classList.remove('active'));
  const itemEl = document.querySelector(`.em-thread-item[data-em="${idx}"]`);
  if (itemEl) {
    itemEl.classList.add('active');
    itemEl.classList.remove('unread');
    itemEl.scrollIntoView({block:'nearest'});
  }
  const root = thread[0];
  const subj = (root.subject || '(no subject)').replace(/^Subject:\s*/i, '');
  let h = '';
  h += '<div class="em-reader-hdr">';
  h += `<div class="em-reader-meta">${thread.length} message${thread.length===1?'':'s'} · oldest first</div>`;
  h += `<div class="em-reader-subject">${esc(subj)}</div>`;
  h += '</div>';
  thread.forEach(email => {
    const senderName = (() => {
      const raw = email.sender || '';
      if (raw.includes('<')) return raw.split('<')[0].trim();
      return raw.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    })();
    const senderAddr = (() => {
      const m = (email.sender || '').match(/<([^>]+)>/);
      return m ? m[1] : (email.sender || '');
    })();
    const bg = hslBg(email.sender||'');
    const fg = hslFg(email.sender||'');
    const recipients = (email.recipients || []).join(', ');
    const cc = (email.cc || []).join(', ');
    const body = cleanContent(email.content || email.body || '');
    h += '<div class="em-msg">';
    h += '<div class="em-msg-hdr">';
    h += `<div class="em-msg-av" style="background:${bg};color:${fg}">${initials(senderName)}</div>`;
    h += `<div style="min-width:0;flex:1">`;
    h += `<div class="em-msg-from">${esc(senderName)}</div>`;
    h += `<div class="em-msg-addr">${esc(senderAddr)}</div>`;
    if (recipients) h += `<div class="em-msg-to">to ${esc(recipients)}${cc ? ' · cc ' + esc(cc) : ''}</div>`;
    h += `</div>`;
    h += `<div class="em-msg-time">${esc(fmtDT(email.timestamp))}</div>`;
    h += '</div>';
    if (body) h += `<div class="em-msg-body">${body}</div>`;
    // Attachments arrive as {filename: base64} on this server, and as name lists or
    // objects on others. The old line only read arrays, so a dict printed nothing.
    const atts = vaAttList(vaEmailAtts(email), 'em:' + (email.email_id || ''), String(email.email_id || ''));
    if (atts.length) h += '<div class="em-att">' + vaAttStripHtml(atts) + '</div>';
    h += '</div>';
  });
  // renderEmail opens the first thread on a timer; by then the reader may be gone.
  const reader = document.getElementById('em-reader');
  if (!reader) return;
  reader.innerHTML = h;
  reader.scrollTop = 0;
  vaHydrate();
}

// Legacy: keep toggleThread so any cached viewer references don't break
function toggleThread(i) { showEmailThread(i); }

// ── Calendar ──────────────────────────────────────────────────────────────────
let CAL = { year:2025, month:10, byDate:{}, selDay:null };

function renderCalendar(data) {
  CAL.byDate = {};
  for (const ev of (data.events||[])) {
    if (!ev.start_datetime) continue;
    // Multi-day events span every calendar day from start to end (inclusive).
    // We mark each occurrence with _spanRole so the day-detail view can
    // render time correctly: "all day (day 2 of 8)" instead of "11:59 PM - 9:59 AM".
    const startMs = tsToMs(ev.start_datetime);
    const endMs = ev.end_datetime ? tsToMs(ev.end_datetime) : startMs;
    // PA-03: an end exactly at local midnight is exclusive (the calendar's all-day
    // form), so a 00:00 to 00:00 event covers one day, not two.
    const endsAtMidnight = endMs > startMs && fmtDateKey((endMs - 1) / 1000) !== fmtDateKey(endMs / 1000);
    const lastMs = endsAtMidnight ? endMs - 1 : endMs;
    const startKey = fmtDateKey(ev.start_datetime);
    const endKey   = fmtDateKey(lastMs / 1000);
    const startsAtMidnight = fmtDateKey((startMs - 1) / 1000) !== startKey;
    const isMultiDay = endKey !== startKey;
    if (!isMultiDay) {
      const one = (endsAtMidnight && startsAtMidnight) ? Object.assign({}, ev, {_allDay: true}) : ev;
      (CAL.byDate[startKey] = CAL.byDate[startKey] || []).push(one);
      continue;
    }
    // Multi-day: walk one day at a time and add a wrapped event to each.
    // Build the list of date keys between startKey and endKey inclusive in
    // the persona timezone.
    const dayMs = 24*60*60*1000;
    const keys = [];
    // Use noon-anchored stepping to avoid DST drift
    let cursorMs = tsToMs(ev.start_datetime);
    let safety = 0;
    while (safety++ < 60) {
      const k = fmtDateKey(cursorMs/1000);
      keys.push(k);
      if (k === endKey) break;
      cursorMs += dayMs;
    }
    const totalDays = keys.length;
    keys.forEach((k, i) => {
      const wrapped = Object.assign({}, ev, {
        _spanRole: i === 0 ? 'start' : (i === totalDays - 1 ? 'end' : 'middle'),
        _spanIndex: i + 1,
        _spanTotal: totalDays,
        _spanStartKey: startKey,
        _spanEndKey: endKey,
      });
      (CAL.byDate[k] = CAL.byDate[k] || []).push(wrapped);
    });
  }
  // Auto-detect starting month from earliest event
  const firstEvt = (data.events||[]).reduce((min,e)=>e.start_datetime && (!min||e.start_datetime<min)?e.start_datetime:min, null);
  if (firstEvt) {
    const d = new Date(tsToMs(firstEvt));
    CAL.year = d.getFullYear();
    CAL.month = d.getMonth() + 1;
  } else {
    CAL.year = 2025; CAL.month = 10;
  }
  CAL.selDay = null;
  return calHTML();
}

function tagCls(tag) {
  const map={work:'w',health:'h',personal:'p',family:'f',creative:'c',legal:'l',
              custody:'cu',social:'s',fitness:'fit'};
  return 't-'+(map[tag]||'other');
}
function tagBorder(tag) {
  const map={work:'bw',health:'bh',personal:'bp',family:'bf',creative:'bc',legal:'bl',
              custody:'bcu',social:'bs',fitness:'bfit'};
  return map[tag]||'bo';
}

function calHTML() {
  const MN=['January','February','March','April','May','June',
            'July','August','September','October','November','December'];
  const {year,month} = CAL;
  const firstDow = new Date(year, month-1, 1).getDay();
  const days = new Date(year, month, 0).getDate();
  const hasPrev = !(year===2024 && month===1);
  const hasNext = !(year===2028 && month===12);
  const todayKey = fmtDateKey(personaNowSeconds());

  let h = `<div style="max-width:1000px">`;
  h += `<div class="cal-nav">`;
  h += `<button class="cal-btn" onclick="calNav(-1)" ${hasPrev?'':'disabled'}>‹</button>`;
  h += `<h2>${MN[month-1]} ${year}</h2>`;
  h += `<button class="cal-btn" onclick="calNav(1)" ${hasNext?'':'disabled'}>›</button>`;
  h += `</div>`;
  h += `<div class="cal-wrap">`;
  h += `<div>`;
  h += `<div class="cal-wdays"><div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div></div>`;
  h += `<div class="cal-grid">`;

  for (let i=0;i<firstDow;i++) h += '<div class="cal-cell empty"></div>';

  for (let d=1;d<=days;d++) {
    const key = `${year}-${String(month).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const evs = (CAL.byDate[key]||[]).sort((a,b)=>(a.start_datetime||0)-(b.start_datetime||0));
    const isSel = key === CAL.selDay;
    const isToday = key === todayKey;

    h += `<div class="cal-cell ${evs.length?'has-ev':''} ${isSel?'sel':''} ${isToday?'today':''}" data-date="${key}" onclick="calPickDay('${key}')">`;
    h += `<span class="cal-day-n">${d}</span>`;
    for (const ev of evs.slice(0,3)) {
      h += `<span class="ev-pill ${tagCls(ev.tag)}">${esc(trunc(ev.title||'',24))}</span>`;
    }
    if (evs.length>3) h += `<span class="ev-more">+${evs.length-3} more</span>`;
    h += `</div>`;
  }
  h += `</div></div>`;

  // Sidebar
  h += `<div class="cal-detail" id="cal-detail">`;
  if (CAL.selDay) {
    h += calDayHTML(CAL.selDay);
  } else {
    h += `<p class="muted" style="font-size:13px">← Click a day to see events</p>`;
  }
  h += `</div>`;
  h += `</div></div>`;
  return h;
}

function calNav(dir) {
  CAL.month += dir;
  if (CAL.month>12){CAL.month=1;CAL.year++;}
  if (CAL.month<1){CAL.month=12;CAL.year--;}
  document.getElementById('sv-content').innerHTML = calHTML();
}

function calPickDay(key) {
  CAL.selDay = key;
  // Update selection classes without full re-render
  document.querySelectorAll('.cal-cell[data-date]').forEach(el => {
    el.classList.toggle('sel', el.dataset.date===key);
  });
  const detail = document.getElementById('cal-detail');
  if (detail) detail.innerHTML = calDayHTML(key);
}

function calDayHTML(key) {
  const evs = (CAL.byDate[key]||[]).sort((a,b)=>(a.start_datetime||0)-(b.start_datetime||0));
  const [y,m,d] = key.split('-').map(Number);
  const dateStr = new Date(y,m-1,d).toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'});

  let h = `<div class="cal-detail-hdr">${dateStr}</div>`;
  if (!evs.length) return h + `<p class="muted" style="font-size:13px">No events</p>`;

  // Persona's display name for highlighting their attendance
  const personaName = (window.PERSONA && PERSONA.name) ? PERSONA.name : '';
  const personaFirst = personaName.split(' ')[0] || '';

  for (const ev of evs) {
    // Time line - multi-day events get a span label instead of misleading
    // 11:59 PM-9:59 AM ranges produced by raw start/end timestamps.
    let timeLine;
    if (ev._allDay) {
      timeLine = 'All day';
    } else if (ev._spanTotal && ev._spanTotal > 1) {
      const startLabel = fmtDate(ev.start_datetime);
      const endMsX = tsToMs(ev.end_datetime);
      const endLabel = (fmtDateKey((endMsX - 1) / 1000) !== fmtDateKey(endMsX / 1000))
        ? fmtDate((endMsX - 1) / 1000) : fmtDate(ev.end_datetime);
      const dayN = ev._spanIndex;
      const total = ev._spanTotal;
      timeLine = `All day · ${startLabel} - ${endLabel} (day ${dayN} of ${total})`;
    } else {
      const startT = ev.start_datetime ? fmtTime(ev.start_datetime) : '';
      const endT   = ev.end_datetime   ? fmtTime(ev.end_datetime)   : '';
      timeLine = startT + (endT ? ' - ' + endT : '');
    }
    h += `<div class="ev-card ${tagBorder(ev.tag)}">`;
    h += `<div class="ev-card-time">${esc(timeLine)}</div>`;
    h += `<div class="ev-card-title">${esc(ev.title||'')}</div>`;
    if (ev.location) h += `<div class="ev-card-sub">📍 ${esc(ev.location)}</div>`;
    if (ev.description) h += `<div class="ev-card-sub">${esc(trunc(ev.description,140))}</div>`;
    // Attendees - render as inline pills with persona highlighted
    const attendees = Array.isArray(ev.attendees) ? ev.attendees : [];
    if (attendees.length) {
      h += `<div class="ev-card-sub" style="margin-top:6px;display:flex;gap:4px;flex-wrap:wrap;align-items:center">`;
      h += `<span style="font-size:11px;color:var(--muted);margin-right:4px">👥</span>`;
      attendees.forEach(a => {
        const name = (typeof a === 'string') ? a : (a.name || a.email || JSON.stringify(a));
        const isUser = personaName && (
          name === personaName ||
          (personaFirst && name === personaFirst) ||
          name.toLowerCase() === personaName.toLowerCase()
        );
        const bg = isUser ? 'var(--blue)' : 'var(--surface2)';
        const fg = isUser ? '#fff' : 'var(--text)';
        h += `<span style="background:${bg};color:${fg};padding:2px 8px;border-radius:10px;font-size:11px;font-weight:500">${esc(name)}</span>`;
      });
      h += `</div>`;
    }
    h += `</div>`;
  }
  return h;
}

// ── Messaging ─────────────────────────────────────────────────────────────────
let _msgData = null;

// Build a map from messaging participant_id (e.g. "p_robert_choi" or a
// contact_id hex) to a human "Robert Choi" string by consulting SEED.contacts.
function buildMessagingNameMap() {
  const m = {};
  // SEED is a top-level const, so it is NOT a property of window: reading
  // window.SEED here returned nothing and every sender fell back to its raw id.
  const seedAll = (typeof SEED !== 'undefined' && SEED) ? SEED : (window.SEED || {});
  const contacts = _arr((seedAll.contacts || {}).contacts);
  contacts.forEach(c => {
    if (!c) return;
    const fullName = [c.first_name, c.last_name].filter(Boolean).join(' ').trim();
    if (!fullName) return;
    // Common participant_id shapes:
    //   "p_<first>_<last>"        - most common
    //   "p_<first>"               - first-only
    //   "p_<lowercase fullname>"  - defensive
    //   contact_id (hex24)        - if the seed uses the literal id
    const f = (c.first_name||'').toLowerCase();
    const l = (c.last_name||'').toLowerCase();
    if (f && l) m["p_" + f + "_" + l] = fullName;
    if (f)      m["p_" + f] = m["p_" + f] || fullName;
    if (f && l) m["p_" + f.charAt(0) + l] = m["p_" + f.charAt(0) + l] || fullName;  // p_jdoe style
    if (c.contact_id) m[c.contact_id] = fullName;
    if (c.id) m[c.id] = fullName;
    [c.email, c.work_email, c.phone].forEach(k => { if (k && !m[k]) m[k] = fullName; });
  });
  // Every other people table the universe carries (Slack, Messenger, Facebook,
  // Instagram users) maps its own ids to names too.
  ['slack', 'messenger', 'facebook', 'instagram'].forEach(srv => {
    _arr((seedAll[srv] || {}).users).forEach(u => {
      if (!u || !u.id || m[u.id]) return;
      const n = u.real_name || u.display_name || u.name || '';
      if (n) m[u.id] = n;
    });
  });
  // The persona, and the other side of every titled 1:1 conversation.
  const msgData = seedAll.messaging || {};
  const convs = _arr(msgData.conversations);
  let me = msgData.current_user_id || '';
  contacts.forEach(c => { if (c && c.is_user && (c.contact_id || c.id)) { me = me || c.contact_id || c.id; } });
  if (!me && convs.length) {
    const cnt = {};
    convs.forEach(cv => _arr(cv.participant_ids).forEach(p => { cnt[p] = (cnt[p] || 0) + 1; }));
    me = Object.keys(cnt).sort((a, b) => cnt[b] - cnt[a])[0] || '';
  }
  if (me && !m[me] && typeof PERSONA !== 'undefined' && PERSONA && PERSONA.name) m[me] = PERSONA.name;
  convs.forEach(cv => {
    const ps = _arr(cv.participant_ids);
    const title = String(cv.title || '').trim();
    if (ps.length !== 2 || !title || !me || ps.indexOf(me) < 0) return;
    const other = ps.find(p => p !== me);
    if (other && !m[other]) m[other] = title;
  });
  return m;
}

// Resolve a participant or sender id to a display name. Falls back to the
// stripped+titlecased handle so we never lose information.
function resolveMsgParty(id, nameMap) {
  if (!id) return '?';
  if (nameMap[id]) return nameMap[id];
  // An opaque id (hex, uuid, long token) is never a name.
  if (/^[0-9a-f-]{12,}$/i.test(String(id)) || (/^[A-Za-z0-9]{16,}$/.test(String(id)) && /\d/.test(String(id)))) return 'Unknown contact';
  // Strip p_ prefix and title-case the remainder so "p_robert_choi" => "Robert Choi"
  const handle = String(id).replace(/^p_/, '');
  if (!handle) return '?';
  return handle
    .split(/[_\.]/)
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function deriveMessagingUserId(convs) {
  // SOT-compliant messaging no longer carries the top-level current_user_id
  // field, so we have to derive it. The persona is by definition the
  // participant who appears in (almost) every conversation, so we take the
  // participant_id with the highest coverage. Tie-break by also preferring
  // the id whose resolved name matches PERSONA.name.
  if (!convs || !convs.length) return '';
  const counts = {};
  convs.forEach(c => {
    (c.participant_ids || []).forEach(pid => {
      counts[pid] = (counts[pid] || 0) + 1;
    });
  });
  const ids = Object.keys(counts);
  if (!ids.length) return '';
  const total = convs.length;
  // Pick highest-coverage; PERSONA name match wins ties
  const personaName = (window.PERSONA && PERSONA.name) ? PERSONA.name.toLowerCase() : '';
  const nameMap = buildMessagingNameMap();
  ids.sort((a, b) => {
    const dc = counts[b] - counts[a];
    if (dc !== 0) return dc;
    const an = (nameMap[a] || '').toLowerCase();
    const bn = (nameMap[b] || '').toLowerCase();
    const am = personaName && an && (personaName === an || personaName.includes(an) || an.includes(personaName)) ? 1 : 0;
    const bm = personaName && bn && (personaName === bn || personaName.includes(bn) || bn.includes(personaName)) ? 1 : 0;
    return bm - am;
  });
  // Require the chosen id to be in at least 50% of conversations (otherwise
  // probably no actual persona participant - leave userId empty).
  return counts[ids[0]] >= Math.max(2, Math.ceil(total * 0.5)) ? ids[0] : '';
}

function renderMessaging(data) {
  const convs = (data.conversations||[]).sort((a,b)=>(b.last_updated||0)-(a.last_updated||0));
  const userId = data.current_user_id || deriveMessagingUserId(convs);
  const nameMap = buildMessagingNameMap();
  _msgData = {convs, userId, nameMap};

  let h = `<div class="msg-layout">`;
  h += `<div class="conv-list"><div class="conv-list-hdr">Conversations</div>`;
  convs.forEach((conv,i) => {
    const msgs = conv.messages||[];
    const last = msgs[msgs.length-1];
    const lastAtt = last && !last.content ? msgAttachmentNames(last)[0] : null;
    const preview = last ? trunc(last.content || (lastAtt ? '📎 ' + lastAtt.name : ''), 45) : '';
    const time = last ? fmtDate(last.timestamp) : '';
    const others = (conv.participant_ids||[]).filter(p => p !== userId);
    const resolvedNames = others.map(p => resolveMsgParty(p, nameMap));
    const title = conv.title
      || (resolvedNames.length ? resolvedNames.join(', ') : null)
      || conv.conversation_id?.slice(0,8)
      || '?';
    h += `<div class="conv-item ${i===0?'active':''}" id="conv-${i}" onclick="showConv(${i})">`;
    h += `<span class="conv-time">${time}</span>`;
    h += `<div class="conv-title">${esc(title)}</div>`;
    h += `<div class="conv-preview">${esc(preview)}</div>`;
    h += `</div>`;
  });
  h += `</div>`;

  // First-conversation header: prefer explicit title; otherwise derive from participants
  let firstHdr = '';
  if (convs.length) {
    const c0 = convs[0];
    const others0 = (c0.participant_ids||[]).filter(p => p !== userId).map(p => resolveMsgParty(p, nameMap));
    firstHdr = c0.title || (others0.length ? others0.join(', ') : '');
  }

  h += `<div class="msg-pane">`;
  h += `<div class="msg-pane-hdr" id="msg-hdr">${esc(firstHdr)}</div>`;
  h += `<div class="msg-pane-body" id="msg-body">${convs.length ? msgBubbles(convs[0], userId, nameMap) : ''}</div>`;
  h += `</div></div>`;
  vaLater();
  return h;
}

function showConv(i) {
  const {convs, userId, nameMap} = _msgData;
  document.querySelectorAll('.conv-item').forEach((el,j) => el.classList.toggle('active',i===j));
  const c = convs[i];
  const others = (c.participant_ids||[]).filter(p => p !== userId).map(p => resolveMsgParty(p, nameMap));
  const hdr = c.title || (others.length ? others.join(', ') : c.conversation_id);
  document.getElementById('msg-hdr').textContent = hdr;
  const body = document.getElementById('msg-body');
  body.innerHTML = msgBubbles(c, userId, nameMap);
  body.scrollTop = body.scrollHeight;
  vaHydrate();
}

// A Messages row names its file in attachment_name (schema), and a few exports carry an
// attachments list instead. Either way only the NAME is stored; vaAttResolve finds bytes.
function msgAttachmentNames(msg) {
  const out = [];
  const one = msg && msg.attachment_name;
  if (typeof one === 'string' && one.trim()) out.push({name: one.trim()});
  _arr(msg && msg.attachments).forEach(a => {
    const nm = typeof a === 'string' ? a : (a && (a.name || a.filename || a.title || a.path));
    if (nm && !out.some(x => x.name === String(nm))) out.push({name: String(nm), mime: (a && (a.mime_type || a.mime)) || ''});
  });
  return out;
}

function msgBubbles(conv, userId, nameMap) {
  const msgs = conv.messages||[];
  if (!msgs.length) return '<div class="empty-state">No messages</div>';
  let h = '';
  msgs.forEach(msg => {
    const sent = msg.sender_id === userId;
    const sender = resolveMsgParty(msg.sender_id||'?', nameMap || {});
    h += `<div class="bubble-wrap ${sent?'sent':'recv'}">`;
    if (!sent) h += `<div class="bubble-meta">${esc(sender)} · ${fmtDT(msg.timestamp)}</div>`;
    else h += `<div class="bubble-meta">${fmtDT(msg.timestamp)}</div>`;
    const text = cleanContent(msg.content||'');
    const atts = vaAttList(msgAttachmentNames(msg), 'msg:' + (msg.message_id || conv.conversation_id || ''), '');
    if (text || !atts.length) h += `<div class="bubble ${sent?'sent':'recv'}">${text}</div>`;
    if (atts.length) h += vaAttStripHtml(atts, {compact: true});
    h += `</div>`;
  });
  return h;
}

// ── Contacts ──────────────────────────────────────────────────────────────────
function renderContacts(data) {
  const contacts = data.contacts||[];
  let h = `<div class="contact-grid">`;
  contacts.forEach(c => {
    const name = `${c.first_name||''} ${c.last_name||''}`.trim();
    h += `<div class="ccard" onclick="showContact('${c.contact_id}')">`;
    h += `<div class="ccard-hdr">`;
    h += `<div class="cavatar" style="background:${hslBg(name)};color:${hslFg(name)}">${initials(name)}</div>`;
    h += `<div><div class="cname">${esc(name)}</div>`;
    if (c.job) h += `<div class="cjob">${esc(c.job)}</div>`;
    if (c.is_user) h += `<span class="you-badge">YOU</span>`;
    h += `</div></div>`;
    if (c.email) h += `<div class="cdetail">✉ ${esc(c.email)}</div>`;
    if (c.phone) h += `<div class="cdetail">📞 ${esc(c.phone)}</div>`;
    if (c.city_living) h += `<div class="cdetail">📍 ${esc(c.city_living)}</div>`;
    h += `</div>`;
  });
  return h + `</div>`;
}

function showContact(id) {
  const all = ((SEED.contacts||{}).contacts)||[];
  const c = all.find(x=>x.contact_id===id);
  if (!c) return;
  const name = `${c.first_name||''} ${c.last_name||''}`.trim();
  const fields = [
    ['Job',c.job],['Email',c.email],['Personal Email',c.personal_email],
    ['Phone',c.phone],['Address',c.address],['Age',c.age],['Status',c.status],
    ['City',c.city_living ? `${c.city_living}, ${c.country||''}` : null],
  ].filter(([,v])=>v!=null&&v!=='');

  let h = `<div class="modal-hdr">`;
  h += `<div class="cavatar" style="width:48px;height:48px;border-radius:10px;font-size:16px;background:${hslBg(name)};color:${hslFg(name)}">${initials(name)}</div>`;
  h += `<div><div style="font-size:18px;font-weight:800">${esc(name)}</div>`;
  if (c.job) h += `<div style="color:var(--muted);font-size:13px">${esc(c.job)}</div>`;
  h += `</div><span class="close-x" onclick="closeModal()">✕</span></div>`;
  fields.forEach(([k,v]) => {
    h += `<div class="fp"><span class="fl">${esc(k)}</span><span>${esc(String(v))}</span></div>`;
  });
  if (c.description) {
    h += `<div style="font-size:11px;color:var(--muted);font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-top:12px;margin-bottom:6px">Notes</div>`;
    h += `<div class="desc-box">${esc(c.description)}</div>`;
  }
  document.getElementById('modal-body').innerHTML = h;
  document.getElementById('overlay').classList.add('open');
}

function closeModal() {
  document.getElementById('overlay').classList.remove('open');
}

// ── Strava ────────────────────────────────────────────────────────────────────
function renderStrava(data) {
  const acts = (data.activities||[]).sort((a,b)=>{
    const ta = tsToMs(a.start_unix || a.start_date || a.start_date_local || 0);
    const tb = tsToMs(b.start_unix || b.start_date || b.start_date_local || 0);
    return tb - ta;
  });
  let h = `<div class="act-list">`;
  for (const a of acts) {
    const ts = a.start_unix || (a.start_date ? new Date(a.start_date).getTime()/1000 : 0);
    const late = ts && isLate(ts);
    const km   = a.distance ? (a.distance/1000).toFixed(1)+' km' : '';
    const dur  = a.moving_time ? fmtDur(a.moving_time) : '';
    const spd  = a.average_speed ? (a.average_speed*3.6).toFixed(1)+' km/h' : '';
    const elev = a.total_elevation_gain ? a.total_elevation_gain.toFixed(0)+'m ↑' : '';
    const hr   = a.average_heartrate ? a.average_heartrate.toFixed(0)+' bpm' : '';
    const dateStr = a.start_date_local ? a.start_date_local.replace('T',' ').slice(0,16) : fmtDT(ts);

    h += `<div class="act-card ${late?'late':''}">`;
    const typeIcon = {Run:'🏃',Ride:'🚴',Swim:'🏊',Walk:'🚶',Hike:'🥾',Yoga:'🧘',WeightTraining:'🏋️',Workout:'💪',Elliptical:'🔄',Kayaking:'🛶',Volleyball:'🏐'}[a.type]||'🏃';
    h += `<div class="act-icon">${typeIcon}</div>`;
    h += `<div><div class="act-name">${esc(a.name||a.type||'Activity')}</div>`;
    h += `<div class="act-date">${esc(dateStr)}`;
    if (late) h += ` <span style="color:var(--red);font-size:11px">● late night</span>`;
    h += `</div>`;
    h += `<div class="act-stats">`;
    if (km)   h += `<span class="stat"><strong>${km}</strong></span>`;
    if (dur)  h += `<span class="stat"><strong>${dur}</strong></span>`;
    if (spd)  h += `<span class="stat"><strong>${spd}</strong> avg</span>`;
    if (elev) h += `<span class="stat"><strong>${elev}</strong></span>`;
    if (hr)   h += `<span class="stat"><strong>${hr}</strong> HR</span>`;
    h += `</div>`;
    if (a.description) h += `<div style="font-size:12px;color:var(--muted);margin-top:4px">${esc(a.description)}</div>`;
    h += `</div>`;
    h += `<div style="font-size:11px;color:var(--muted)">#${a.activity_id}</div>`;
    h += `</div>`;
  }
  return h + `</div>`;
}

function fmtDur(s) {
  const h=Math.floor(s/3600), m=Math.floor((s%3600)/60);
  return h>0 ? `${h}h ${m}m` : `${m}m`;
}

// ── Fintrack ──────────────────────────────────────────────────────────────────
let _finData = null, _finAcct = null;

function renderFintrack(data) {
  _finData = data;
  const accts = data.accounts||[];
  if (!_finAcct && accts.length) _finAcct = accts[0].last_four;
  return finHTML();
}

function finHTML() {
  const {accounts=[], transactions=[]} = _finData||{};
  let h = `<div class="acc-tabs">`;
  accounts.forEach(a => {
    h += `<div class="acc-tab ${a.last_four===_finAcct?'active':''}" onclick="selAcct('${a.last_four}')">`;
    h += `${a.institution_name} ****${a.last_four}</div>`;
  });
  h += `</div>`;

  const acc = accounts.find(a=>a.last_four===_finAcct);
  if (acc) {
    const bal = acc.balance||0;
    h += `<div class="acc-summary">`;
    h += `<div><div style="font-size:12px;color:var(--muted);margin-bottom:2px">${esc(acc.institution_name)} ${esc(acc.account_type||'')} ****${acc.last_four}</div>`;
    h += `<div class="acc-bal" style="color:${bal<0?'var(--red)':'var(--green)'}">`;
    h += `${bal<0?'-':''}${money(bal)}</div></div>`;
    h += `<div style="font-size:12px;color:var(--muted)">${esc(acc.status||'')}</div></div>`;
  }

  const txns = transactions.filter(t=>t.account_last_four===_finAcct)
    .sort((a,b)=>b.date>a.date?1:b.date<a.date?-1:0);

  h += `<div class="txn-table">`;
  h += `<div class="txn-row txn-hdr"><div>Date</div><div>Merchant</div><div>Category</div><div>Amount</div></div>`;
  txns.forEach(t => {
    const cr = (t.amount||0)>0;
    h += `<div class="txn-row">`;
    h += `<div class="txn-date">${esc(t.date||'')}</div>`;
    h += `<div class="txn-merch">${esc(t.merchant||'')}</div>`;
    h += `<div class="txn-cat">${esc(t.category||'')}</div>`;
    h += `<div class="txn-amt ${cr?'cr':'dr'}">${cr?'+':'−'}${money(t.amount)}</div>`;
    h += `</div>`;
  });
  h += `</div>`;

  // Subscriptions panel - the data was populated but never rendered (ana_salazar audit).
  // Subscriptions are not account-scoped, so show the full list under the transactions.
  const subs = (_finData && _finData.subscriptions) || [];
  if (subs.length) {
    h += `<div class="txn-table" style="margin-top:18px">`;
    h += `<div class="txn-row txn-hdr"><div>Subscription (${subs.length})</div><div>Frequency</div><div>Status</div><div>Amount</div></div>`;
    subs.forEach(s => {
      h += `<div class="txn-row">`;
      h += `<div class="txn-merch">${esc(s.service_name||s.name||'')}</div>`;
      h += `<div class="txn-cat">${esc(s.billing_frequency||s.frequency||'')}</div>`;
      h += `<div class="txn-cat">${esc(s.status||'')}</div>`;
      h += `<div class="txn-amt dr">−${money(s.amount)}</div>`;
      h += `</div>`;
    });
    h += `</div>`;
  }
  return h;
}

function selAcct(lastFour) {
  _finAcct = lastFour;
  document.getElementById('sv-content').innerHTML = finHTML();
}

// ── Ticketmaster ──────────────────────────────────────────────────────────────
function renderTicketmaster(data) {
  const events = (data.events||[]).sort((a,b)=>a.date>b.date?1:-1);
  const venues = data.venues||[];
  const orders = data.orders||[];
  const tix = data.ticket_types||[];
  const users = data.users||[];
  const attractions = data.attractions||[];
  const evAttr = data.event_attractions||[];
  const venueMap = {}; venues.forEach(v=>{venueMap[v.id]=v;});
  const attrMap = {}; attractions.forEach(a=>{attrMap[a.id]=a;});

  let h = '<div style="max-width:800px">';
  h += '<div style="font-size:11px;color:var(--muted);margin-bottom:12px">Record count in the sidebar includes all tables below (profile, venues, events, orders, artists, lineups, ticket types).</div>';

  if (users.length) {
    h += '<div class="gen-section"><div class="gen-sec-title">Profile ('+users.length+')</div>';
    users.forEach(u => {
      h += '<div class="gen-rec" style="padding:10px;font-size:13px">';
      h += '<div style="font-weight:600">'+esc(u.name||'')+'</div>';
      h += '<div style="font-size:12px;color:var(--muted)">'+esc(u.email||'')+' - '+esc(u.city||'')+', '+esc(u.state||'')+'</div>';
      h += '</div>';
    });
    h += '</div>';
  }

  if (venues.length) {
    h += '<div class="gen-section"><div class="gen-sec-title">Venues ('+venues.length+')</div>';
    venues.forEach(v => {
      h += '<div class="gen-rec" style="padding:10px">';
      h += '<div style="font-weight:600">'+esc(v.name||'')+'</div>';
      h += '<div style="font-size:12px;color:var(--muted)">'+esc(v.address||'')+', '+esc(v.city||'')+', '+esc(v.state||'')+' '+esc(v.zip||'')+' - cap '+esc(String(v.capacity||''))+'</div>';
      h += '</div>';
    });
    h += '</div>';
  }

  h += '<div class="gen-section"><div class="gen-sec-title">Events ('+events.length+')</div>';
  events.forEach(ev => {
    const venue = venueMap[ev.venue_id]||{};
    const status = ev.status||'';
    const color = status==='on_sale'?'var(--green)':status==='completed'?'var(--muted)':'var(--yellow)';
    h += '<div class="gen-rec" style="padding:14px;border-left:3px solid '+color+'">';
    h += '<div style="display:flex;justify-content:space-between;align-items:start">';
    h += '<div><div style="font-weight:700;font-size:15px">'+esc(ev.name)+'</div>';
    h += '<div style="font-size:12px;color:var(--muted);margin-top:2px">'+esc(ev.date)+' '+esc(ev.time||'')+' - '+esc(venue.name||'')+'</div>';
    h += '<div style="font-size:12px;color:var(--muted)">'+esc(venue.city||'')+', '+esc(venue.state||'')+' - '+esc(ev.genre||ev.segment||'')+'</div></div>';
    h += '<div style="text-align:right"><span style="font-size:10px;font-weight:600;padding:2px 8px;border-radius:4px;background:rgba(255,255,255,0.05);color:'+color+'">'+esc(status.toUpperCase())+'</span>';
    if (ev.min_price) h += '<div style="font-size:13px;margin-top:4px">$'+ev.min_price+' - $'+ev.max_price+'</div>';
    h += '</div></div></div>';
  });
  h += '</div>';

  if (orders.length) {
    h += '<div class="gen-section"><div class="gen-sec-title">Orders ('+orders.length+')</div>';
    orders.forEach(o => {
      const ev = events.find(e=>e.id===o.event_id)||{};
      h += '<div class="gen-rec" style="padding:12px;display:flex;justify-content:space-between">';
      h += '<div><div style="font-weight:600">'+esc(ev.name||o.event_id)+'</div>';
      h += '<div style="font-size:12px;color:var(--muted)">'+esc(o.confirmation_code||'')+' - '+o.quantity+' tickets</div></div>';
      h += '<div style="font-size:18px;font-weight:700;color:var(--green)">$'+(o.total_price||0).toFixed(2)+'</div>';
      h += '</div>';
    });
    h += '</div>';
  }

  if (attractions.length) {
    h += '<div class="gen-section"><div class="gen-sec-title">Artists / attractions ('+attractions.length+')</div>';
    attractions.forEach(a => {
      h += '<div class="gen-rec" style="padding:10px">';
      h += '<div style="font-weight:600">'+esc(a.name||'')+' <span style="font-size:11px;color:var(--muted)">('+esc(a.type||'')+')</span></div>';
      if (a.description) h += '<div style="font-size:12px;color:var(--muted);margin-top:2px">'+esc(a.description)+'</div>';
      h += '</div>';
    });
    h += '</div>';
  }

  if (evAttr.length) {
    h += '<div class="gen-section"><div class="gen-sec-title">Lineups ('+evAttr.length+')</div>';
    evAttr.forEach(l => {
      const ev = events.find(e=>e.id===l.event_id)||{};
      const at = attrMap[l.attraction_id]||{};
      h += '<div class="gen-rec" style="padding:8px;font-size:12px">';
      h += esc(at.name||l.attraction_id)+' - <span style="color:var(--muted)">'+esc(l.billing||'')+'</span> on <b>'+esc(ev.name||l.event_id)+'</b>';
      h += '</div>';
    });
    h += '</div>';
  }

  if (tix.length) {
    h += '<div class="gen-section"><div class="gen-sec-title">Ticket types ('+tix.length+')</div>';
    tix.forEach(tt => {
      const ev = events.find(e=>e.id===tt.event_id)||{};
      h += '<div class="gen-rec" style="padding:10px;display:flex;justify-content:space-between;align-items:start">';
      h += '<div><div style="font-weight:600">'+esc(tt.name||'')+'</div>';
      h += '<div style="font-size:11px;color:var(--muted)">'+esc(ev.name||'')+' - '+esc(tt.section||'')+'</div></div>';
      h += '<div style="text-align:right;font-size:13px">$'+esc(String(tt.price||''))+' <span style="font-size:11px;color:var(--muted)">('+esc(String(tt.quantity_available||''))+' left)</span></div>';
      h += '</div>';
    });
    h += '</div>';
  }

  return h + '</div>';
}

// ── Airtable ──────────────────────────────────────────────────────────────────
function renderAirtable(data) {
  const bases = data.bases || [];
  const tables = data.tables || [];
  const records = data.records || [];
  const validTableIds = new Set(tables.map(t => t.id));

  // Build a field-signature index so we can rescue records whose table_id
  // doesn't match any known table (a common upstream generator bug).
  const sigToTableId = {};
  tables.forEach(t => {
    const fields = (t.fields || []).map(f => f.name).filter(Boolean).sort();
    if (fields.length) sigToTableId[fields.join('|')] = t.id;
  });
  // Rescue orphan records by field signature
  records.forEach(r => {
    if (!validTableIds.has(r.table_id)) {
      const sig = Object.keys(r.fields || {}).sort().join('|');
      if (sigToTableId[sig]) r._inferred_table_id = sigToTableId[sig];
    }
  });

  let h = '<div style="max-width:1100px">';
  if (!tables.length) {
    h += '<div class="gen-section" style="padding:14px;color:var(--muted)">No tables in this airtable workspace.</div>';
    return h + '</div>';
  }

  tables.forEach((t) => {
    const base = bases.find(b => b.id === t.base_id) || {};
    const tRecs = records.filter(r =>
      r.table_id === t.id || r._inferred_table_id === t.id
    );
    const fields = _arr(t.fields);
    const baseLabel = base.name ? esc(base.name) + ' / ' : '';
    h += '<div class="gen-section">';
    h += '<div class="gen-sec-title">' + baseLabel + esc(t.name || '(unnamed table)') +
         ' <span style="color:var(--muted);font-weight:400">(' + tRecs.length + ' record' + (tRecs.length === 1 ? '' : 's') + ')</span></div>';

    if (!fields.length) {
      h += '<div style="padding:10px;color:var(--muted);font-size:12px">No fields declared on this table.</div>';
    } else if (!tRecs.length) {
      h += '<div style="padding:10px;color:var(--muted);font-size:12px">No records in this table.</div>';
    } else {
      h += '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:12px">';
      h += '<thead><tr>' + fields.map(f =>
        '<th style="padding:8px 12px;background:var(--surface2);text-align:left;border-bottom:1px solid var(--border);font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.04em;white-space:nowrap">' +
        esc(f.name) + '</th>'
      ).join('') + '</tr></thead><tbody>';
      tRecs.forEach(r => {
        const flds = _obj(r.fields);
        h += '<tr>' + fields.map(f => {
          let v = flds[f.name];
          if (v == null) v = flds[f.id];
          if (v == null) v = '';
          if (Array.isArray(v)) v = v.join(', ');
          else if (typeof v === 'object') v = JSON.stringify(v);
          return '<td style="padding:8px 12px;border-bottom:1px solid var(--border);vertical-align:top;max-width:340px;overflow:hidden;text-overflow:ellipsis">' +
            esc(String(v)) + '</td>';
        }).join('') + '</tr>';
      });
      h += '</tbody></table></div>';
    }
    h += '</div>';
  });

  // Surface any unmatchable records so they're not silently dropped
  const orphans = records.filter(r =>
    !validTableIds.has(r.table_id) && !r._inferred_table_id
  );
  if (orphans.length) {
    h += '<div class="gen-section"><div class="gen-sec-title" style="color:var(--orange)">Orphan records (' + orphans.length + ')</div>';
    h += '<div style="padding:8px;font-size:12px;color:var(--muted)">These records have a table_id that doesn\'t match any table and no matching field signature.</div>';
    orphans.slice(0, 10).forEach(r => {
      h += '<div class="gen-rec" style="padding:8px;margin:4px 0;font-size:12px"><pre style="margin:0;white-space:pre-wrap">' + esc(JSON.stringify(r.fields || {}, null, 2)) + '</pre></div>';
    });
    h += '</div>';
  }

  return h + '</div>';
}

// ── Notion ────────────────────────────────────────────────────────────────────
function renderNotion(data) {
  const pages = data.pages||[];
  const databases = data.databases||[];
  const blocks = data.blocks||[];
  const propValues = data.property_values||[];
  const properties = data.properties||[];

  function extractRichText(v) {
    if (v == null) return '';
    if (typeof v === 'string') return v;
    if (Array.isArray(v)) return v.map(t => (typeof t === 'string') ? t : (t.plain_text || t.text?.content || '')).join('');
    if (v?.title && Array.isArray(v.title)) return v.title.map(t => t.plain_text || t.text?.content || '').join('');
    if (v?.rich_text && Array.isArray(v.rich_text)) return v.rich_text.map(t => t.plain_text || t.text?.content || '').join('');
    if (v?.plain_text) return v.plain_text;
    if (v?.text) return (typeof v.text === 'string') ? v.text : (v.text.content || '');
    if (v?.content) return (typeof v.content === 'string') ? v.content : extractRichText(v.content);
    if (v?.name) return v.name;
    if (v?.value) return extractRichText(v.value);
    return '';
  }

  // Database title map
  const dbMap = {};
  databases.forEach(db => {
    const t = db.title;
    if (typeof t === 'string') dbMap[db.id] = t;
    else if (Array.isArray(t) && t.length) dbMap[db.id] = extractRichText(t) || 'Untitled';
    else dbMap[db.id] = db.name || extractRichText(db.description) || 'Untitled';
  });

  // Blocks indexed by parent page
  const blockMap = {};
  blocks.forEach(b => { const pid = b.parent?.page_id||b.page_id; if(pid){if(!blockMap[pid])blockMap[pid]=[];blockMap[pid].push(b);} });
  function blockContentText(b) {
    if (!b || b.content == null) return '';
    if (typeof b.content === 'string') return b.content;
    if (typeof b.content === 'object') {
      const c = b.content;
      if (Array.isArray(c.rich_text)) return extractRichText({ rich_text: c.rich_text });
      for (const k of Object.keys(c)) {
        const inner = c[k];
        if (inner && Array.isArray(inner.rich_text))
          return extractRichText({ rich_text: inner.rich_text });
      }
      return extractRichText(c) || '';
    }
    return '';
  }

  // Properties grouped by database (canonical column order: title first, then declared order)
  const propsByDb = {};
  properties.forEach(prop => {
    const dbId = prop.database_id;
    if (!dbId) return;
    if (!propsByDb[dbId]) propsByDb[dbId] = [];
    propsByDb[dbId].push(prop);
  });
  Object.values(propsByDb).forEach(arr => arr.sort((a,b) => {
    if (a.type === 'title' && b.type !== 'title') return -1;
    if (b.type === 'title' && a.type !== 'title') return 1;
    return 0;
  }));

  // property_values keyed by (page_id, property_id)
  const pvMap = {};
  propValues.forEach(pv => { pvMap[pv.page_id+'|'+pv.property_id] = pv; });

  // page → title (from title-typed property_value, else first block)
  const titleMap = {};
  propValues.forEach(pv => {
    if (titleMap[pv.page_id]) return;
    if (pv.property_type === 'title' && pv.value) {
      const t = extractRichText(pv.value);
      if (t) titleMap[pv.page_id] = t;
    } else if (pv.property_type === 'select' && (pv.value?.select?.name || pv.value?.name)) {
      titleMap[pv.page_id] = pv.value.select?.name || pv.value.name;
    }
  });

  // Pages indexed by parent database
  const pagesByDb = {};
  pages.forEach(p => {
    const dbId = p.parent?.database_id || p.database_id;
    if (!dbId) return;
    if (!pagesByDb[dbId]) pagesByDb[dbId] = [];
    pagesByDb[dbId].push(p);
  });

  // Type-aware property cell renderer
  function renderPropCell(pv, prop) {
    if (!pv || pv.value == null) return '<span style="color:var(--muted)">-</span>';
    const v = pv.value;
    const type = pv.property_type || prop?.type || '';
    switch (type) {
      case 'title':
      case 'rich_text': {
        const t = extractRichText(v);
        return t ? esc(t) : '<span style="color:var(--muted)">-</span>';
      }
      case 'number': {
        const n = (typeof v === 'number') ? v : (v?.number ?? Number(v));
        if (Number.isFinite(n)) return Number(n).toLocaleString();
        return esc(String(v));
      }
      case 'select': {
        const name = (typeof v === 'string') ? v : (v?.select?.name || v?.name || '');
        if (!name) return '<span style="color:var(--muted)">-</span>';
        return '<span style="display:inline-block;padding:2px 8px;border-radius:10px;background:var(--surface);border:1px solid var(--border);font-size:11px">'+esc(name)+'</span>';
      }
      case 'multi_select': {
        const items = Array.isArray(v) ? v : (v?.multi_select || v?.options || []);
        if (!items.length) return '<span style="color:var(--muted)">-</span>';
        return items.map(it => '<span style="display:inline-block;padding:2px 8px;border-radius:10px;background:var(--surface);border:1px solid var(--border);font-size:11px;margin-right:4px">'+esc(it.name||String(it))+'</span>').join('');
      }
      case 'date': {
        const start = (typeof v === 'string') ? v : (v?.date?.start || v?.start || (typeof v?.date === 'string' ? v.date : '') || '');
        if (!start) return '<span style="color:var(--muted)">-</span>';
        return '<span style="color:var(--muted)">'+esc(String(start).substring(0,10))+'</span>';
      }
      case 'checkbox': {
        const b = (typeof v === 'boolean') ? v : (typeof v?.checkbox === 'boolean' ? v.checkbox : !!(v?.checked));
        return b ? '✓' : '✗';
      }
      case 'url': {
        const u = (typeof v === 'string') ? v : (v?.url || '');
        return u ? '<a href="'+esc(u)+'" target="_blank" style="color:var(--accent)">'+esc(u)+'</a>' : '<span style="color:var(--muted)">-</span>';
      }
      case 'email':
      case 'phone_number': {
        const s = (typeof v === 'string') ? v : (v?.email || v?.phone_number || '');
        return s ? esc(s) : '<span style="color:var(--muted)">-</span>';
      }
      case 'people':
      case 'relation': {
        const items = Array.isArray(v) ? v : (v?.users || v?.relations || []);
        if (!items.length) return '<span style="color:var(--muted)">-</span>';
        return items.map(it => esc(it.name || it.id || String(it))).join(', ');
      }
      case 'status': {
        const name = (typeof v === 'string') ? v : (v?.name || '');
        return name ? esc(name) : '<span style="color:var(--muted)">-</span>';
      }
      default:
        return esc(extractRichText(v) || (typeof v === 'object' ? JSON.stringify(v) : String(v)));
    }
  }

  let h = '<div style="max-width:1100px">';

  // ── Databases section: each as a real table ─────────────────────────────────
  if (databases.length) {
    h += '<div class="gen-section"><div class="gen-sec-title">Databases ('+databases.length+')</div>';
    databases.forEach((db, dbIdx) => {
      const dbPages = pagesByDb[db.id] || [];
      const dbProps = propsByDb[db.id] || [];
      const desc = extractRichText(db.description);

      h += '<div class="gen-rec" style="padding:14px;margin-bottom:12px">';
      h += '<div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px;margin-bottom:6px">';
      h += '<div style="font-size:18px;font-weight:700">'+esc(dbMap[db.id]||'Untitled')+'</div>';
      h += '<div style="font-size:11px;color:var(--muted)">'+dbPages.length+' '+(dbPages.length===1?'entry':'entries')+' · '+dbProps.length+' '+(dbProps.length===1?'property':'properties')+'</div>';
      h += '</div>';
      if (desc) h += '<div style="font-size:12px;color:var(--muted);margin-bottom:10px">'+esc(desc)+'</div>';

      if (dbProps.length && dbPages.length) {
        // Pin the title column first
        const cols = dbProps;
        h += '<div style="overflow-x:auto;border:1px solid var(--border);border-radius:6px">';
        h += '<table style="width:100%;border-collapse:collapse;font-size:12px">';
        h += '<thead><tr style="background:var(--surface)">';
        cols.forEach(c => {
          const typeLabel = c.type ? ' <span style="color:var(--muted);font-weight:400;font-size:10px">('+esc(c.type)+')</span>' : '';
          h += '<th style="text-align:left;padding:8px 10px;border-bottom:1px solid var(--border);font-weight:600">'+esc(c.name||'(unnamed)')+typeLabel+'</th>';
        });
        h += '</tr></thead><tbody>';
        // Sort pages by created_time descending
        const sortedPages = [...dbPages].sort((a,b) => String(b.created_time||'').localeCompare(String(a.created_time||'')));
        sortedPages.forEach((p, i) => {
          const pageBlocks = blockMap[p.id] || [];
          const hasBody = pageBlocks.length > 0;
          h += '<tr style="border-bottom:1px solid var(--border);'+(hasBody?'cursor:pointer':'')+'" '+(hasBody?('onclick="document.getElementById(&quot;npage-'+dbIdx+'-'+i+'&quot;).classList.toggle(&quot;open&quot;)"'):'')+'>';
          cols.forEach(c => {
            const pv = pvMap[p.id+'|'+c.id];
            h += '<td style="padding:8px 10px;vertical-align:top">'+renderPropCell(pv, c)+'</td>';
          });
          h += '</tr>';
          if (hasBody) {
            const bodyText = pageBlocks.map(blockContentText).filter(Boolean).join('\n\n');
            h += '<tr id="npage-'+dbIdx+'-'+i+'" class="n-body" style="display:none"><td colspan="'+cols.length+'" style="padding:10px 16px 14px;background:var(--surface);font-size:12px;white-space:pre-wrap;color:var(--muted);border-bottom:1px solid var(--border)">'+esc(bodyText)+'</td></tr>';
          }
        });
        h += '</tbody></table></div>';
      } else if (dbPages.length) {
        // Properties not declared but pages exist - fall through to a simple list
        h += '<div style="font-size:12px;color:var(--muted)">'+dbPages.length+' page(s); no properties defined for column rendering.</div>';
      } else {
        h += '<div style="font-size:12px;color:var(--muted)">(empty database)</div>';
      }
      h += '</div>';
    });
    h += '</div>';
  }

  // ── Pages section: standalone (workspace-parented) pages only ──────────────
  const standalonePages = pages.filter(p => {
    const ptype = p.parent?.type;
    return ptype === 'workspace' || ptype === 'page_id' || !p.parent?.database_id;
  });
  if (standalonePages.length) {
    h += '<div class="gen-section"><div class="gen-sec-title">Standalone Pages ('+standalonePages.length+')</div>';
    standalonePages.forEach(p => {
      let title = titleMap[p.id] || 'Untitled';
      if (title === 'Untitled') {
        const pb = blockMap[p.id] || [];
        if (pb.length) {
          const firstText = blockContentText(pb[0]);
          if (firstText) title = firstText.split('\n')[0].substring(0,80);
        }
      }
      const content = (blockMap[p.id]||[]).map(blockContentText).filter(Boolean).join('\n\n');
      h += '<div class="gen-rec" style="padding:12px 14px;cursor:pointer" onclick="this.querySelector(&quot;.n-body&quot;)&&this.querySelector(&quot;.n-body&quot;).classList.toggle(&quot;open&quot;)">';
      h += '<div style="font-weight:600">'+esc(title)+'</div>';
      if (p.last_edited_time) h += '<div style="font-size:11px;color:var(--muted)">Edited: '+String(p.last_edited_time).substring(0,10)+'</div>';
      if (content) h += '<div class="n-body" style="display:none;margin-top:8px;padding-top:8px;border-top:1px solid var(--border);font-size:12px;color:var(--muted);white-space:pre-wrap;max-height:300px;overflow-y:auto">'+esc(content)+'</div>';
      h += '</div>';
    });
    h += '</div>';
  }

  return h + '</div>';
}

// ── Slack ──────────────────────────────────────────────────────────────────────
function slackUserName(id, userMap) {
  const u = userMap[id];
  return u ? (u.real_name || u.display_name || u.name || id) : (id || '?');
}

function slackReactionsHtml(m, userMap) {
  const rs = Array.isArray(m.reactions) ? m.reactions : [];
  if (!rs.length) return '';
  let h = '<div class="sl-reacts">';
  rs.forEach(r => {
    const users = Array.isArray(r.users) ? r.users : [];
    const who = users.map(id => slackUserName(id, userMap)).join(', ');
    const n = r.count || users.length || 1;
    const code = ':' + String(r.name || '').replace(/^:+|:+$/g, '') + ':';
    const g = vaEmoji(r.name);
    h += '<span class="sl-react" title="'+attrEsc(code + (who ? ' ' + who : ''))+'">'+(g ? '<span class="va-emoji">'+g+'</span>' : esc(code))+' '+n+'</span>';
  });
  return h + '</div>';
}

function slackMsgHtml(m, userMap) {
  const uid = m.user || m.user_id;
  const u = userMap[uid] || {};
  const ts = parseFloat(m.ts || m.timestamp || 0) || 0;
  const displayName = u.real_name || u.display_name || u.name || (uid || '?');
  const seed = u.real_name || u.name || '?';
  let h = '<div class="sl-msg">';
  h += '<div class="sl-av" style="background:'+hslBg(seed)+';color:'+hslFg(seed)+'">'+esc(initials(seed))+'</div>';
  h += '<div class="sl-msg-main">';
  h += '<div><span class="sl-name">'+esc(displayName)+'</span> <span class="sl-ts">'+esc(fmtDT(ts))+'</span></div>';
  h += '<div class="sl-text">'+vaEmojiText(esc(m.text || m.content || ''))+'</div>';
  h += slackReactionsHtml(m, userMap);
  return h + '</div></div>';
}

// Group the flat stream back into roots and replies.
let _slackThreadSeq = 0;

function renderSlackChannelBody(c, msgByCh, userMap) {
  if (!c) return '<div style="color:var(--muted)">No channel selected</div>';
  const msgs = msgByCh[c.id] || msgByCh[c.channel_id] || [];
  if (!msgs.length) return '<div style="color:var(--muted)">No messages in this channel</div>';

  const byTs = {};
  msgs.forEach(m => { if (m.ts != null) byTs[String(m.ts)] = m; });

  const repliesOf = {};
  const tops = [];
  let orphans = 0;
  msgs.forEach(m => {
    const parent = m.thread_ts != null ? String(m.thread_ts) : '';
    // A self-referencing or dangling thread_ts falls back to top level, so a broken
    // pointer never causes a message to vanish from the channel.
    if (parent && parent !== String(m.ts) && byTs[parent]) {
      (repliesOf[parent] = repliesOf[parent] || []).push(m);
    } else {
      if (parent && parent !== String(m.ts)) orphans++;
      tops.push(m);
    }
  });
  const byTsAsc = (a,b) => parseFloat(a.ts||a.timestamp||0) - parseFloat(b.ts||b.timestamp||0);
  tops.sort(byTsAsc);
  Object.keys(repliesOf).forEach(k => repliesOf[k].sort(byTsAsc));

  const threadCount = Object.keys(repliesOf).length;
  const replyCount = msgs.length - tops.length;

  let h = '<div class="sl-toolbar">';
  h += '<span class="sl-toolbar-info">'+tops.length+' top-level \u00b7 '+threadCount+' thread'+(threadCount===1?'':'s')
     + ' \u00b7 '+replyCount+' repl'+(replyCount===1?'y':'ies')+'</span>';
  if (threadCount) h += '<button class="sl-btn" data-state="open" onclick="toggleAllSlackThreads(this)">Collapse all threads</button>';
  h += '</div>';

  tops.forEach(m => {
    h += slackMsgHtml(m, userMap);
    const reps = repliesOf[String(m.ts)] || [];
    if (!reps.length) return;
    const tid = 'sl-th-' + (++_slackThreadSeq);
    const last = reps[reps.length - 1];
    h += '<div class="sl-thread">';
    h += '<div class="sl-thread-bar" onclick="toggleSlackThread(this,\''+tid+'\')">';
    h += '<span class="sl-caret">&#9660;</span>'+reps.length+' repl'+(reps.length===1?'y':'ies');
    h += '<span class="sl-thread-note">last '+esc(fmtDT(parseFloat(last.ts||0)))+'</span>';
    if (typeof m.reply_count === 'number' && m.reply_count !== reps.length) {
      h += '<span class="sl-thread-note mismatch">reply_count says '+m.reply_count+'</span>';
    }
    h += '</div>';
    h += '<div class="sl-replies" id="'+tid+'">';
    reps.forEach(r => { h += slackMsgHtml(r, userMap); });
    h += '</div></div>';
  });

  if (orphans) {
    h += '<div class="sl-orphan-note">'+orphans+' repl'+(orphans===1?'y':'ies')
       + ' reference a thread root missing from this channel, shown at top level.</div>';
  }
  return h;
}

window.toggleSlackThread = function(bar, id) {
  const el = document.getElementById(id);
  if (!el) return;
  const collapsed = el.classList.toggle('collapsed');
  bar.classList.toggle('collapsed', collapsed);
};

window.toggleAllSlackThreads = function(btn) {
  const collapse = btn.getAttribute('data-state') === 'open';
  document.querySelectorAll('#slack-ch-body .sl-replies').forEach(el => el.classList.toggle('collapsed', collapse));
  document.querySelectorAll('#slack-ch-body .sl-thread-bar').forEach(el => el.classList.toggle('collapsed', collapse));
  btn.setAttribute('data-state', collapse ? 'collapsed' : 'open');
  btn.textContent = collapse ? 'Expand all threads' : 'Collapse all threads';
};

// Resolve the display label for a slack channel/DM.
// DMs carry name="" by convention. The persona is the user appearing in every DM's
// members list (or, failing that, the U_<HANDLE> derived from the D_<HANDLE>_<OTHER> id).
function slackChannelLabel(c, userMap, personaUserId) {
  if (!c) return 'channel';
  if (c.is_im) {
    const members = Array.isArray(c.members) ? c.members : [];
    const others = members.filter(m => m !== personaUserId);
    const partnerId = others[0] || members[0] || c.user || null;
    if (partnerId) {
      const partner = userMap[partnerId];
      if (partner) return partner.real_name || partner.display_name || partner.name || partnerId;
      return partnerId;
    }
    return 'DM';
  }
  if (c.is_mpim) {
    const members = Array.isArray(c.members) ? c.members : [];
    const others = members.filter(m => m !== personaUserId);
    const names = others.slice(0,3).map(id => {
      const u = userMap[id];
      return u ? (u.display_name || u.real_name || u.name || id) : id;
    });
    if (names.length) return names.join(', ') + (others.length > names.length ? ' +'+(others.length-names.length) : '');
    return c.name || 'group DM';
  }
  return c.name || 'channel';
}

function derivePersonaUserId(channels) {
  const dms = (channels||[]).filter(c => c && c.is_im && Array.isArray(c.members) && c.members.length);
  if (!dms.length) return null;
  // The persona is the user appearing in every DM.
  const tally = {};
  dms.forEach(c => c.members.forEach(m => { tally[m] = (tally[m]||0) + 1; }));
  const universal = Object.keys(tally).filter(k => tally[k] === dms.length);
  if (universal.length === 1) return universal[0];
  // Fallback: D_<HANDLE>_<OTHER> -> U_<HANDLE>
  const fromIds = dms.map(c => {
    const parts = String(c.id||'').split('_');
    return parts.length >= 3 ? 'U_'+parts[1] : null;
  }).filter(Boolean);
  if (fromIds.length && fromIds.every(p => p === fromIds[0])) return fromIds[0];
  return null;
}

function renderSlack(data) {
  const channels = data.channels||[];
  const messages = data.messages||[];
  const users = data.users||[];
  const userMap = {}; users.forEach(u=>{ if(u && u.id) userMap[u.id]=u; });
  const msgByCh = {}; messages.forEach(m=>{const ch=m.channel||m.channel_id;if(ch){if(!msgByCh[ch])msgByCh[ch]=[];msgByCh[ch].push(m);}});
  Object.values(msgByCh).forEach(arr=>arr.sort((a,b)=>parseFloat(a.ts||a.timestamp||0)-parseFloat(b.ts||b.timestamp||0)));

  if (!channels.length) return '<p class="empty-state">No Slack channels.</p>';

  const personaUserId = derivePersonaUserId(channels);

  // Pre-render the first channel's body inline so it works without setTimeout/JS race
  const firstCh = channels[0];
  const firstBody = renderSlackChannelBody(firstCh, msgByCh, userMap);
  const firstLabel = slackChannelLabel(firstCh, userMap, personaUserId);

  let h = '<div style="display:grid;grid-template-columns:220px 1fr;height:calc(100vh - 90px);border:1px solid var(--border);border-radius:8px;overflow:hidden">';
  h += '<div style="border-right:1px solid var(--border);overflow-y:auto;overflow-x:hidden;background:var(--surface);min-height:0">';
  channels.forEach((c,i) => {
    const prefix = c.is_im ? '💬' : (c.is_mpim ? '👥' : '#');
    const label = slackChannelLabel(c, userMap, personaUserId);
    h += '<div class="conv-item'+(i===0?' active':'')+'" onclick="showSlackCh('+i+')" data-idx="'+i+'">'+prefix+' '+esc(label)+'</div>';
  });
  h += '</div>';
  h += '<div style="display:flex;flex-direction:column;min-height:0;overflow:hidden">';
  h += '<div style="padding:10px 16px;border-bottom:1px solid var(--border);font-weight:700;flex-shrink:0" id="slack-ch-name">'+(firstCh.is_im?'':'# ')+esc(firstLabel)+'</div>';
  h += '<div style="flex:1 1 0;overflow-y:auto;overflow-x:hidden;padding:12px;min-height:0" id="slack-ch-body">'+firstBody+'</div>';
  h += '</div></div>';

  window._slackData = {channels, msgByCh, userMap, personaUserId};
  return h;
}

window.showSlackCh = function(i) {
  try {
    const sd = window._slackData||{};
    const channels = sd.channels, msgByCh = sd.msgByCh, userMap = sd.userMap, personaUserId = sd.personaUserId;
    if(!channels) return;
    const c = channels[i];
    if(!c) return;
    document.querySelectorAll('.conv-item').forEach((el,j)=>el.classList.toggle('active',j===i));
    const nameEl = document.getElementById('slack-ch-name');
    if (nameEl) nameEl.textContent = (c.is_im?'':'# ') + slackChannelLabel(c, userMap, personaUserId);
    const bodyEl = document.getElementById('slack-ch-body');
    if (bodyEl) bodyEl.innerHTML = renderSlackChannelBody(c, msgByCh, userMap);
  } catch(err) {
    const bodyEl = document.getElementById('slack-ch-body');
    if (bodyEl) bodyEl.innerHTML = '<div style="color:var(--red)">Slack render error: '+esc(String(err))+'</div>';
  }
};


// ── Amazon Fresh ─────────────────────────────────────────────────────────────
let _amazonFreshData = null;
let _amazonFreshFilter = 'all';

function amazonFreshAddress(value) {
  if (!value) return '';
  if (typeof value === 'string') return value.trim();
  return [value.line1, value.line2, value.city, value.state, value.zip]
    .filter(Boolean).join(', ').trim();
}

function amazonFreshDestination(order) {
  const data = _amazonFreshData || {};
  const address = amazonFreshAddress(order.shipping_address || order.delivery_address || order.address);
  const normalized = address.toLowerCase().replace(/\s+/g,' ').trim();
  const homeAddresses = (data.users || [])
    .filter(user => user && (user.is_user || user.is_active || (data.users || []).length === 1))
    .map(user => amazonFreshAddress(user.address || user.shipping_address).toLowerCase().replace(/\s+/g,' ').trim())
    .filter(Boolean);
  const explicit = String(order.destination_name || order.property_name || order.destination || '').trim();
  const purpose = `${order.destination_type || ''} ${order.purpose || ''} ${explicit}`.toLowerCase();
  const isHome = Boolean(normalized && homeAddresses.includes(normalized)) || /\bhome\b/.test(purpose);
  const isProperty = /airbnb|rental|guest|property|listing/.test(purpose) || Boolean(normalized && !isHome);
  const label = explicit || (isHome ? 'Home' : address.split(',')[0] || 'Other');
  return {label, kind:isHome ? 'home' : isProperty ? 'property' : 'other'};
}

function amazonFreshOrdersHtml(filter) {
  const data = _amazonFreshData || {};
  const products = data.products || [];
  const items = data.order_items || [];
  const productMap = {}; products.forEach(p => { productMap[p.id] = p; });
  let orders = (data.orders || []).slice().sort((a,b) => String(b.delivery_date||'').localeCompare(String(a.delivery_date||'')));
  if (filter === 'home') orders = orders.filter(o => amazonFreshDestination(o).kind === 'home');
  if (filter === 'property') orders = orders.filter(o => amazonFreshDestination(o).kind === 'property');
  let h = `<div style="font-size:12px;color:var(--muted);margin-bottom:10px">Showing ${orders.length} orders</div>`;
  orders.slice(0, 80).forEach(order => {
    const destination = amazonFreshDestination(order);
    const lines = items.filter(item => item.order_id === order.id);
    h += '<details class="gen-rec" style="padding:0;margin-bottom:8px">';
    h += '<summary style="padding:13px 15px;cursor:pointer;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:14px;align-items:center">';
    h += `<div><div style="font-weight:700">${esc(destination.label)} · ${esc(order.delivery_date||'')}</div>`;
    h += `<div style="font-size:12px;color:var(--muted);margin-top:3px">${esc(order.delivery_slot||'')} · ${lines.length} items · ${esc(order.status||'')}</div></div>`;
    h += `<div style="font-size:16px;font-weight:700">$${Number(order.total||0).toFixed(2)}</div></summary>`;
    h += '<div style="border-top:1px solid var(--border);padding:10px 15px 14px">';
    lines.forEach(line => {
      const product = productMap[line.product_id] || {};
      h += `<div style="display:flex;justify-content:space-between;gap:12px;padding:5px 0;font-size:12px">`;
      h += `<span>${esc(product.name||'Item')} × ${esc(line.quantity||1)}</span>`;
      h += `<span style="font-variant-numeric:tabular-nums">$${(Number(line.price_at_purchase||0)*Number(line.quantity||1)).toFixed(2)}</span></div>`;
    });
    h += `<div style="margin-top:8px;padding-top:8px;border-top:1px solid var(--border);font-size:11px;color:var(--muted)">${esc(order.shipping_address||'')}</div>`;
    h += '</div></details>';
  });
  if (orders.length > 80) h += `<div style="font-size:12px;color:var(--muted);padding:8px">80 most recent shown; ${orders.length-80} older orders remain in the dataset.</div>`;
  return h;
}

function amazonFreshProductsHtml(query) {
  const products = ((_amazonFreshData || {}).products || []);
  const needle = String(query||'').trim().toLowerCase();
  const filtered = products.filter(p => !needle || `${p.name||''} ${p.category||''} ${p.description||''}`.toLowerCase().includes(needle));
  let h = `<div style="font-size:12px;color:var(--muted);margin-bottom:10px">${filtered.length} matching products</div>`;
  h += '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:9px">';
  filtered.slice(0, 60).forEach(product => {
    h += '<div class="gen-rec" style="padding:12px;margin:0">';
    h += `<div style="font-weight:700;font-size:13px">${esc(product.name||'')}</div>`;
    h += `<div style="font-size:11px;color:var(--muted);margin-top:3px">${esc(product.category||'Uncategorized')} · ${esc(product.unit||'unit')}</div>`;
    h += `<div style="display:flex;justify-content:space-between;margin-top:9px"><strong>$${Number(product.price||0).toFixed(2)}</strong><span style="font-size:11px;color:var(--muted)">${esc(product.inventory_count||0)} in stock</span></div>`;
    h += '</div>';
  });
  h += '</div>';
  return h;
}

window.setAmazonFreshFilter = function(filter) {
  _amazonFreshFilter = filter;
  document.querySelectorAll('[data-af-filter]').forEach(el => el.style.background = el.dataset.afFilter === filter ? 'var(--accent)' : 'transparent');
  const target = document.getElementById('af-orders');
  if (target) target.innerHTML = amazonFreshOrdersHtml(filter);
};

window.filterAmazonFreshProducts = function(value) {
  const target = document.getElementById('af-products');
  if (target) target.innerHTML = amazonFreshProductsHtml(value);
};

function renderAmazonFresh(data) {
  _amazonFreshData = data || {};
  _amazonFreshFilter = 'all';
  const orders = data.orders || [];
  const items = data.order_items || [];
  const propertyOrders = orders.filter(o => amazonFreshDestination(o).kind === 'property');
  const spend = orders.reduce((sum,o) => sum + Number(o.total||0), 0);
  const propertySpend = propertyOrders.reduce((sum,o) => sum + Number(o.total||0), 0);
  let h = '<div style="max-width:1100px">';
  h += '<div class="af-metrics" style="display:grid;grid-template-columns:repeat(4,minmax(130px,1fr));gap:10px;margin-bottom:16px">';
  [["Orders",orders.length],["Items delivered",items.reduce((s,i)=>s+Number(i.quantity||0),0)],["Total spend",`$${spend.toLocaleString('en-US',{maximumFractionDigits:0})}`],["Other destinations",`$${propertySpend.toLocaleString('en-US',{maximumFractionDigits:0})}`]].forEach(metric => {
    h += `<div class="gen-rec" style="margin:0;padding:13px"><div style="font-size:11px;color:var(--muted)">${metric[0]}</div><div style="font-size:22px;font-weight:750;margin-top:4px">${metric[1]}</div></div>`;
  });
  h += '</div>';
  h += '<div class="gen-section"><div class="gen-sec-title">Delivery history</div>';
  h += '<div class="af-tabs" style="display:flex;gap:6px;margin-bottom:12px" role="tablist">';
  [['all','All'],['home','Home'],['property','Other destinations']].forEach((tab,index) => {
    h += `<button data-af-filter="${tab[0]}" onclick="setAmazonFreshFilter('${tab[0]}')" style="border:1px solid var(--border);background:${index===0?'var(--accent)':'transparent'};color:var(--text);padding:7px 11px;border-radius:6px;cursor:pointer">${tab[1]}</button>`;
  });
  h += '</div><div id="af-orders">'+amazonFreshOrdersHtml('all')+'</div></div>';
  h += '<div class="gen-section"><div class="gen-sec-title">Product catalog</div>';
  h += '<input aria-label="Search Amazon Fresh products" placeholder="Search products or categories" oninput="filterAmazonFreshProducts(this.value)" style="width:100%;max-width:420px;padding:9px 11px;border:1px solid var(--border);border-radius:6px;background:var(--surface);color:var(--text);margin-bottom:12px">';
  h += '<div id="af-products">'+amazonFreshProductsHtml('')+'</div></div></div>';
  return h;
}

// ── QuickBooks operational dashboard ────────────────────────────────────────
let _qbData = null;
let _qbMode = 'overview';

function qbMoney(value) {
  return '$' + Number(value||0).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
}

function qbRefName(ref) {
  if (!ref) return '';
  if (typeof ref === 'string') return ref;
  return ref.name || ref.value || '';
}

function qbDocumentTable(rows, kind, query) {
  const needle = String(query||'').trim().toLowerCase();
  const filtered = rows.filter(row => {
    const party = kind === 'invoice' ? qbRefName(row.CustomerRef) : qbRefName(row.VendorRef);
    return !needle || `${party} ${row.DocNumber||''} ${row.TxnDate||''}`.toLowerCase().includes(needle);
  }).sort((a,b)=>String(b.TxnDate||'').localeCompare(String(a.TxnDate||'')));
  let h = `<div style="font-size:12px;color:var(--muted);margin-bottom:9px">Showing ${Math.min(filtered.length,200)} of ${filtered.length}</div>`;
  h += '<div style="overflow:auto"><table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr style="text-align:left;border-bottom:1px solid var(--border);color:var(--muted)">';
  h += `<th style="padding:8px">${kind==='invoice'?'Customer':'Vendor'}</th><th style="padding:8px">Document</th><th style="padding:8px">Date</th><th style="padding:8px">Due</th><th style="padding:8px;text-align:right">Total</th><th style="padding:8px;text-align:right">Status</th></tr></thead><tbody>`;
  filtered.slice(0,200).forEach(row => {
    const party = kind === 'invoice' ? qbRefName(row.CustomerRef) : qbRefName(row.VendorRef);
    const open = Number(row.Balance||0) > 0;
    h += '<tr style="border-bottom:1px solid var(--border)">';
    h += `<td style="padding:9px 8px;font-weight:600">${esc(party)}</td><td style="padding:9px 8px">${esc(row.DocNumber||row.Id||'')}</td>`;
    h += `<td style="padding:9px 8px">${esc(row.TxnDate||'')}</td><td style="padding:9px 8px">${esc(row.DueDate||'')}</td>`;
    h += `<td style="padding:9px 8px;text-align:right;font-variant-numeric:tabular-nums">${qbMoney(row.TotalAmt)}</td>`;
    h += `<td style="padding:9px 8px;text-align:right;color:${open?'var(--orange)':'var(--green)'}">${open?'OPEN':'PAID'}</td></tr>`;
  });
  h += '</tbody></table></div>';
  return h;
}

function qbPartyTable(rows, query) {
  const needle = String(query||'').trim().toLowerCase();
  const filtered = rows.filter(row => !needle || `${row.DisplayName||''} ${(row.PrimaryEmailAddr||{}).Address||''}`.toLowerCase().includes(needle));
  let h = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:9px">';
  filtered.slice(0,160).forEach(row => {
    h += '<div class="gen-rec" style="margin:0;padding:12px">';
    h += `<div style="font-weight:700">${esc(row.DisplayName||row.CompanyName||'')}</div>`;
    const email = (row.PrimaryEmailAddr||{}).Address || '';
    const phone = (row.PrimaryPhone||{}).FreeFormNumber || '';
    h += `<div style="font-size:11px;color:var(--muted);margin-top:5px">${esc(email)}${email&&phone?' · ':''}${esc(phone)}</div>`;
    h += `<div style="font-size:12px;margin-top:7px">Balance <strong>${qbMoney(row.Balance)}</strong></div></div>`;
  });
  h += '</div>';
  return h;
}

function qbViewHtml(mode, query) {
  const data = _qbData || {};
  const invoices = data.invoices || [];
  const bills = data.bills || [];
  if (mode === 'invoices') return qbDocumentTable(invoices, 'invoice', query);
  if (mode === 'bills') return qbDocumentTable(bills, 'bill', query);
  if (mode === 'customers') return qbPartyTable(data.customers||[], query);
  if (mode === 'vendors') return qbPartyTable(data.vendors||[], query);
  if (mode === 'accounts') {
    const needle = String(query||'').trim().toLowerCase();
    const accounts = (data.accounts||[]).filter(row =>
      !needle || `${row.Name||''} ${row.AccountType||''} ${row.AccountSubType||''}`.toLowerCase().includes(needle)
    );
    let h = '<div style="overflow:auto"><table style="width:100%;border-collapse:collapse;font-size:12px"><tr style="text-align:left;color:var(--muted);border-bottom:1px solid var(--border)"><th style="padding:8px">Account</th><th style="padding:8px">Type</th><th style="padding:8px;text-align:right">Balance</th></tr>';
    accounts.forEach(row => { h += `<tr style="border-bottom:1px solid var(--border)"><td style="padding:9px 8px;font-weight:600">${esc(row.Name||'')}</td><td style="padding:9px 8px">${esc(row.AccountType||'')}</td><td style="padding:9px 8px;text-align:right">${qbMoney(row.CurrentBalance)}</td></tr>`; });
    return h + '</table></div>';
  }
  const revenueByCustomer = {};
  invoices.forEach(invoice => {
    const customer = qbRefName(invoice.CustomerRef) || 'Unassigned';
    revenueByCustomer[customer] = (revenueByCustomer[customer] || 0) + Number(invoice.TotalAmt||0);
  });
  const recentInvoices = invoices.slice().sort((a,b)=>String(b.TxnDate||'').localeCompare(String(a.TxnDate||''))).slice(0,8);
  const recentBills = bills.slice().sort((a,b)=>String(b.TxnDate||'').localeCompare(String(a.TxnDate||''))).slice(0,8);
  let h = '<div class="qb-overview" style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:14px">';
  h += '<div class="gen-rec" style="margin:0"><div style="font-weight:700;margin-bottom:9px">Revenue by customer</div>';
  Object.entries(revenueByCustomer).sort((a,b)=>b[1]-a[1]).slice(0,6).forEach(entry => { h += `<div style="display:flex;justify-content:space-between;gap:12px;padding:7px 0;border-bottom:1px solid var(--border)"><span>${esc(entry[0])}</span><strong>${qbMoney(entry[1])}</strong></div>`; });
  h += '</div><div class="gen-rec" style="margin:0"><div style="font-weight:700;margin-bottom:9px">Recent activity</div>';
  recentInvoices.slice(0,4).forEach(row => { h += `<div style="display:flex;justify-content:space-between;padding:6px 0;font-size:12px"><span>${esc(qbRefName(row.CustomerRef))}</span><strong>${qbMoney(row.TotalAmt)}</strong></div>`; });
  recentBills.slice(0,4).forEach(row => { h += `<div style="display:flex;justify-content:space-between;padding:6px 0;font-size:12px"><span>${esc(qbRefName(row.VendorRef))}</span><strong style="color:var(--orange)">${qbMoney(row.TotalAmt)}</strong></div>`; });
  h += '</div></div>';
  return h;
}

window.showQBView = function(mode) {
  _qbMode = mode;
  document.querySelectorAll('[data-qb-tab]').forEach(el => el.style.background = el.dataset.qbTab === mode ? 'var(--accent)' : 'transparent');
  const search = document.getElementById('qb-search');
  if (search) {
    const placeholders = {
      invoices:'Search customer, invoice, or date',
      bills:'Search vendor, bill, or date',
      customers:'Search customer or email',
      vendors:'Search vendor or email',
      accounts:'Search account or type'
    };
    search.value = '';
    search.hidden = mode === 'overview';
    search.placeholder = placeholders[mode] || 'Search QuickBooks';
  }
  const target = document.getElementById('qb-content');
  if (target) target.innerHTML = qbViewHtml(mode, '');
};

window.filterQuickbooks = function(value) {
  if (_qbMode === 'overview') return;
  const target = document.getElementById('qb-content');
  if (target) target.innerHTML = qbViewHtml(_qbMode, value);
};

function renderQuickbooksPro(data) {
  _qbData = data || {};
  _qbMode = 'overview';
  const invoices = data.invoices || [];
  const bills = data.bills || [];
  const revenue = invoices.reduce((s,row)=>s+Number(row.TotalAmt||0),0);
  const expenses = bills.reduce((s,row)=>s+Number(row.TotalAmt||0),0);
  const receivable = invoices.reduce((s,row)=>s+Number(row.Balance||0),0);
  const payable = bills.reduce((s,row)=>s+Number(row.Balance||0),0);
  let h = '<div style="max-width:1120px">';
  h += '<div class="qb-metrics" style="display:grid;grid-template-columns:repeat(4,minmax(130px,1fr));gap:10px;margin-bottom:16px">';
  [["Invoiced",qbMoney(revenue)],["Bills",qbMoney(expenses)],["Accounts receivable",qbMoney(receivable)],["Accounts payable",qbMoney(payable)]].forEach(metric => { h += `<div class="gen-rec" style="margin:0;padding:13px"><div style="font-size:11px;color:var(--muted)">${metric[0]}</div><div style="font-size:20px;font-weight:750;margin-top:4px">${metric[1]}</div></div>`; });
  h += '</div>';
  h += '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px" role="tablist">';
  [['overview','Overview'],['invoices','Invoices'],['bills','Bills'],['customers','Customers'],['vendors','Vendors'],['accounts','Accounts']].forEach((tab,index) => { h += `<button data-qb-tab="${tab[0]}" onclick="showQBView('${tab[0]}')" style="border:1px solid var(--border);background:${index===0?'var(--accent)':'transparent'};color:var(--text);padding:7px 11px;border-radius:6px;cursor:pointer">${tab[1]}</button>`; });
  h += '</div>';
  h += '<input id="qb-search" hidden aria-label="Search QuickBooks" placeholder="Search QuickBooks" oninput="filterQuickbooks(this.value)" style="width:100%;max-width:460px;padding:9px 11px;border:1px solid var(--border);border-radius:6px;background:var(--surface);color:var(--text);margin-bottom:14px">';
  h += '<div id="qb-content">'+qbViewHtml('overview','')+'</div></div>';
  return h;
}


// ── Legacy QuickBooks renderer ───────────────────────────────────────────────
function renderQuickbooks(data) {
  const customers = data.customers || [];
  const vendors   = data.vendors   || [];
  const accounts  = data.accounts  || [];
  const items     = data.items     || [];
  const bills     = data.bills     || [];
  const invoices  = data.invoices  || [];

  function fmtAddr(a) {
    if (!a || typeof a !== 'object') return '';
    return [a.Line1, a.Line2, [a.City, a.CountrySubDivisionCode, a.PostalCode].filter(Boolean).join(' ')]
      .filter(Boolean).join(', ');
  }
  function fmtPhone(p) {
    if (!p) return '';
    if (typeof p === 'string') return p;
    return p.FreeFormNumber || '';
  }
  function fmtEmail(e) {
    if (!e) return '';
    if (typeof e === 'string') return e;
    return e.Address || '';
  }
  function refName(r) {
    if (!r) return '';
    if (typeof r === 'string') return r;
    return r.name || r.value || '';
  }
  function money(v) { return '$' + Number(v||0).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}); }

  function partyCard(p, kind) {
    const phone = fmtPhone(p.PrimaryPhone);
    const email = fmtEmail(p.PrimaryEmailAddr);
    const addr  = fmtAddr(p.BillAddr);
    const balLabel = kind === 'vendor' ? 'Owed to' : 'Balance';
    const balColor = kind === 'vendor' ? 'var(--orange)' : 'var(--green)';
    let h = `<div class="gen-rec" style="margin-bottom:10px">`;
    h += `<div style="display:flex;justify-content:space-between;align-items:start;gap:12px">`;
    h += `<div style="flex:1">`;
    h += `<div style="font-weight:700;font-size:15px">${esc(p.DisplayName || p.CompanyName || '(unnamed)')}</div>`;
    if (p.CompanyName && p.CompanyName !== p.DisplayName) {
      h += `<div style="font-size:12px;color:var(--muted);margin-top:2px">${esc(p.CompanyName)}</div>`;
    }
    const lines = [];
    if (phone) lines.push(`📞 ${esc(phone)}`);
    if (email) lines.push(`✉ ${esc(email)}`);
    if (addr)  lines.push(`📍 ${esc(addr)}`);
    if (lines.length) {
      h += `<div style="font-size:12px;margin-top:6px;line-height:1.6">${lines.join('<br>')}</div>`;
    }
    if (p.Notes) {
      h += `<div style="font-size:12px;margin-top:8px;color:var(--muted);font-style:italic">${esc(p.Notes)}</div>`;
    }
    h += `</div>`;
    if (typeof p.Balance === 'number' && p.Balance !== 0) {
      h += `<div style="text-align:right;font-size:11px;color:var(--muted)">${esc(balLabel)}`;
      h += `<div style="color:${balColor};font-weight:700;font-size:16px;margin-top:2px">${money(p.Balance)}</div></div>`;
    }
    h += `</div></div>`;
    return h;
  }

  let h = '';

  // ── Customers ──
  if (customers.length) {
    h += `<div class="gen-section"><div class="gen-sec-title">Customers (${customers.length})</div>`;
    customers.forEach(c => h += partyCard(c, 'customer'));
    h += `</div>`;
  }

  // ── Vendors ──
  if (vendors.length) {
    h += `<div class="gen-section"><div class="gen-sec-title">Vendors (${vendors.length})</div>`;
    vendors.forEach(v => h += partyCard(v, 'vendor'));
    h += `</div>`;
  }

  // ── Chart of Accounts ──
  if (accounts.length) {
    h += `<div class="gen-section"><div class="gen-sec-title">Chart of Accounts (${accounts.length})</div>`;
    h += `<div class="gen-rec"><table style="width:100%;font-size:13px;border-collapse:collapse">`;
    h += `<tr style="text-align:left;color:var(--muted);border-bottom:1px solid var(--border)"><th style="padding:6px 8px">Account</th><th style="padding:6px 8px">Type</th><th style="padding:6px 8px;text-align:right">Balance</th></tr>`;
    accounts.forEach(a => {
      const bal = typeof a.CurrentBalance === 'number' ? money(a.CurrentBalance) : '';
      h += `<tr style="border-bottom:1px solid var(--border)">`;
      h += `<td style="padding:6px 8px">${esc(a.Name || a.FullyQualifiedName || '')}</td>`;
      h += `<td style="padding:6px 8px;color:var(--muted)">${esc(a.AccountType || '')}</td>`;
      h += `<td style="padding:6px 8px;text-align:right;font-variant-numeric:tabular-nums">${bal}</td>`;
      h += `</tr>`;
    });
    h += `</table></div></div>`;
  }

  // ── Items ──
  if (items.length) {
    h += `<div class="gen-section"><div class="gen-sec-title">Items (${items.length})</div>`;
    items.forEach(i => {
      h += `<div class="gen-rec"><div style="font-weight:600">${esc(i.Name || '')}`;
      if (i.UnitPrice) h += ` <span style="color:var(--muted);font-weight:400">- ${money(i.UnitPrice)}</span>`;
      h += `</div>`;
      if (i.Description) h += `<div style="font-size:12px;color:var(--muted);margin-top:4px">${esc(i.Description)}</div>`;
      h += `</div>`;
    });
    h += `</div>`;
  }

  // ── Bills ──
  if (bills.length) {
    const sortedBills = [...bills].sort((a,b) => (b.TxnDate||'').localeCompare(a.TxnDate||''));
    h += `<div class="gen-section"><div class="gen-sec-title">Bills (${bills.length})</div>`;
    sortedBills.forEach(b => {
      const vendor = refName(b.VendorRef);
      const isPaid = (b.Balance || 0) === 0;
      const status = isPaid ? '<span style="color:var(--green)">PAID</span>'
                            : '<span style="color:var(--orange)">OPEN</span>';
      h += `<div class="gen-rec">`;
      h += `<div style="display:flex;justify-content:space-between;align-items:center;gap:12px">`;
      h += `<div><div style="font-weight:600">${esc(vendor)}</div>`;
      h += `<div style="font-size:11px;color:var(--muted);margin-top:2px">`;
      if (b.DocNumber) h += `${esc(b.DocNumber)} · `;
      h += `Posted ${esc(b.TxnDate || '')} · Due ${esc(b.DueDate || '')}`;
      h += `</div></div>`;
      h += `<div style="text-align:right">`;
      h += `<div style="font-weight:700;font-size:15px">${money(b.TotalAmt)}</div>`;
      h += `<div style="font-size:11px;margin-top:2px">${status}</div></div>`;
      h += `</div></div>`;
    });
    h += `</div>`;
  }

  // ── Invoices ──
  if (invoices.length) {
    const sortedInv = [...invoices].sort((a,b) => (b.TxnDate||'').localeCompare(a.TxnDate||''));
    h += `<div class="gen-section"><div class="gen-sec-title">Invoices (${invoices.length})</div>`;
    sortedInv.forEach(inv => {
      const cust = refName(inv.CustomerRef);
      const isPaid = (inv.Balance || 0) === 0;
      const status = isPaid ? '<span style="color:var(--green)">PAID</span>'
                            : '<span style="color:var(--orange)">OPEN</span>';
      h += `<div class="gen-rec">`;
      h += `<div style="display:flex;justify-content:space-between;align-items:center;gap:12px">`;
      h += `<div><div style="font-weight:600">${esc(cust)}</div>`;
      h += `<div style="font-size:11px;color:var(--muted);margin-top:2px">`;
      if (inv.DocNumber) h += `${esc(inv.DocNumber)} · `;
      h += `Issued ${esc(inv.TxnDate || '')} · Due ${esc(inv.DueDate || '')}`;
      h += `</div></div>`;
      h += `<div style="text-align:right">`;
      h += `<div style="font-weight:700;font-size:15px;color:var(--green)">${money(inv.TotalAmt)}</div>`;
      h += `<div style="font-size:11px;margin-top:2px">${status}</div></div>`;
      h += `</div></div>`;
    });
    h += `</div>`;
  }

  return h || '<p class="empty-state">No records</p>';
}

// ── Zillow ────────────────────────────────────────────────────────────────────
function renderZillow(data) {
  const props = data.properties||[];
  const saved = data.saved_properties||[];
  const tours = data.scheduled_tours||[];
  const savedIds = new Set(saved.map(s=>s.property_id));
  const tourMap = {}; tours.forEach(t=>{tourMap[t.property_id]=t;});

  let h = '<div style="max-width:900px;display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px">';
  props.forEach(p => {
    const isSaved = savedIds.has(p.id);
    const tour = tourMap[p.id];
    const sv = saved.find(s=>s.property_id===p.id);
    h += '<div class="gen-rec" style="padding:14px;border-left:3px solid '+(tour?'var(--green)':isSaved?'var(--accent)':'var(--border)')+'">';
    h += '<div style="font-weight:700;font-size:18px;color:var(--green)">$'+(p.price||0).toLocaleString()+'</div>';
    h += '<div style="font-size:13px;font-weight:600;margin-top:2px">'+esc(p.address||'')+'</div>';
    h += '<div style="font-size:12px;color:var(--muted)">'+esc(p.city||'')+', '+esc(p.state||'')+' '+esc(p.zip_code||'')+'</div>';
    h += '<div style="font-size:12px;margin-top:6px">'+esc(p.bedrooms||'?')+' bed · '+esc(p.bathrooms||'?')+' bath · '+esc(p.sqft||'?')+' sqft</div>';
    if (isSaved) h += '<div style="font-size:11px;color:var(--accent);margin-top:4px">⭐ Saved'+(sv?.notes?' - '+esc(sv.notes):'')+'</div>';
    if (tour) h += '<div style="font-size:11px;color:var(--green);margin-top:2px">🏠 Tour: '+esc(tour.tour_date)+' '+esc(tour.tour_time||'')+' ('+esc(tour.status||'')+')</div>';
    h += '</div>';
  });
  return h + '</div>';
}

// ── Instacart ─────────────────────────────────────────────────────────────────
function renderInstacart(data) {
  const orders = (data.orders||[]).sort((a,b)=>new Date(b.created_at||0)-new Date(a.created_at||0));
  const items = data.order_items||[];
  const products = data.products||[];
  const prodMap = {}; products.forEach(p=>{prodMap[p.id]=p;});

  let h = '<div style="max-width:800px">';
  orders.forEach(o => {
    const oItems = items.filter(i=>i.order_id===o.id);
    h += '<div class="gen-rec" style="padding:14px;cursor:pointer" onclick="this.querySelector(&quot;.ic-items&quot;)&&this.querySelector(&quot;.ic-items&quot;).classList.toggle(&quot;open&quot;)">';
    h += '<div style="display:flex;justify-content:space-between;align-items:center">';
    h += '<div><div style="font-weight:700">Order #'+esc(o.id)+'</div>';
    h += '<div style="font-size:12px;color:var(--muted)">'+fmtDate(o.created_at)+' - '+esc(o.status||'')+' - '+oItems.length+' items</div></div>';
    h += '<div style="font-size:18px;font-weight:700;color:var(--green)">$'+(o.total||0).toFixed(2)+'</div></div>';
    if (oItems.length) {
      h += '<div class="ic-items" style="display:none;margin-top:8px;padding-top:8px;border-top:1px solid var(--border);font-size:12px">';
      oItems.forEach(i => { const p=prodMap[i.product_id]||{}; h += '<div>'+esc(p.name||'Item')+' × '+esc(i.quantity)+' - $'+esc(i.price_at_purchase||p.price||'?')+'</div>'; });
      h += '</div>';
    }
    h += '</div>';
  });
  return h + '</div>';
}

// ── Fresh Direct ──────────────────────────────────────────────────────────────
// Schema: products[{id,name,price,category}], product_variants[{id,product_id,name,price,sku}],
//         orders[{id,user_id,status,total,created_at,delivery_date,delivery_slot,shipping_address,tracking_number,carrier}],
//         order_items[{id,order_id,product_id,variant_id,quantity,price_at_purchase}]
function renderFreshDirect(data) {
  const orders = (data.orders||[]).slice().sort((a,b)=>new Date(b.created_at||0)-new Date(a.created_at||0));
  const items = data.order_items||[];
  const products = data.products||[];
  const variants = data.product_variants||[];
  const prodMap = {}; products.forEach(p=>{prodMap[p.id]=p;});
  const varMap = {}; variants.forEach(v=>{varMap[v.id]=v;});

  const fulfilledStatuses = new Set(['delivered','shipped','out_for_delivery','fulfilled']);
  const totalSpent = orders.reduce((s,o)=>s+Number(o.total||0),0);

  let h = '<div style="max-width:880px">';

  // Summary cards
  h += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;margin-bottom:20px">';
  h += '<div class="ov-card"><div style="font-size:11px;color:var(--muted)">Orders</div><div style="font-size:24px;font-weight:800">'+orders.length+'</div></div>';
  h += '<div class="ov-card"><div style="font-size:11px;color:var(--muted)">Total Spent</div><div style="font-size:24px;font-weight:800;color:var(--green)">$'+totalSpent.toFixed(2)+'</div></div>';
  h += '<div class="ov-card"><div style="font-size:11px;color:var(--muted)">Items Ordered</div><div style="font-size:24px;font-weight:800">'+items.length+'</div></div>';
  h += '<div class="ov-card"><div style="font-size:11px;color:var(--muted)">Catalog</div><div style="font-size:24px;font-weight:800">'+products.length+'</div></div>';
  h += '</div>';

  if (orders.length) {
    h += '<div class="gen-section"><div class="gen-sec-title">Orders ('+orders.length+')</div>';
    orders.forEach(o => {
      const oItems = items.filter(i=>i.order_id===o.id);
      const status = (o.status||'pending').toLowerCase();
      const fulfilled = fulfilledStatuses.has(status);
      h += '<div class="gen-rec" style="padding:12px 14px;border-left:3px solid '+(fulfilled?'var(--green)':'var(--yellow)')+';cursor:pointer" onclick="this.querySelector(&quot;.fd-items&quot;)&&this.querySelector(&quot;.fd-items&quot;).classList.toggle(&quot;open&quot;)">';
      h += '<div style="display:flex;justify-content:space-between;gap:12px">';
      h += '<div><strong>Order '+esc(String(o.id).slice(0,8))+'</strong>';
      h += '<div style="font-size:12px;color:var(--muted)">'+fmtDate(o.created_at)+' - '+esc(status)+' - '+oItems.length+' items</div>';
      if (o.delivery_date) h += '<div style="font-size:11px;color:var(--muted)">📦 Delivery: '+esc(o.delivery_date)+(o.delivery_slot?' ('+esc(o.delivery_slot)+')':'')+'</div>';
      if (o.shipping_address) h += '<div style="font-size:11px;color:var(--muted)">📍 '+esc(o.shipping_address)+'</div>';
      if (o.tracking_number) h += '<div style="font-size:11px;color:var(--muted)">🚚 '+esc(o.carrier||'')+' '+esc(o.tracking_number)+'</div>';
      h += '</div>';
      h += '<div style="font-size:18px;font-weight:700;color:var(--green);white-space:nowrap">$'+Number(o.total||0).toFixed(2)+'</div>';
      h += '</div>';
      if (oItems.length) {
        h += '<div class="fd-items" style="display:none;margin-top:10px;padding-top:8px;border-top:1px solid var(--border);font-size:12px">';
        oItems.forEach(i => {
          const p = prodMap[i.product_id] || {};
          const v = varMap[i.variant_id] || {};
          const name = v.name || p.name || 'Item';
          h += '<div style="display:flex;justify-content:space-between;gap:10px;padding:2px 0">';
          h += '<div>'+esc(name)+' × '+esc(i.quantity)+'</div>';
          h += '<div style="color:var(--muted)">$'+Number(i.price_at_purchase||v.price||p.price||0).toFixed(2)+'</div>';
          h += '</div>';
        });
        h += '</div>';
      }
      h += '</div>';
    });
    h += '</div>';
  }

  if (products.length) {
    h += '<div class="gen-section"><div class="gen-sec-title">Catalog ('+products.length+')</div>';
    products.slice(0,30).forEach(p => {
      h += '<div class="gen-rec" style="padding:8px 14px;display:flex;justify-content:space-between;gap:12px;font-size:12px">';
      h += '<div><strong>'+esc(p.name||'Product')+'</strong>';
      if (p.category) h += ' <span style="color:var(--muted)">· '+esc(p.category)+'</span>';
      if (p.description) h += '<div style="color:var(--muted)">'+esc(p.description)+'</div>';
      h += '</div>';
      h += '<div style="font-weight:700;white-space:nowrap">$'+Number(p.price||0).toFixed(2)+'</div>';
      h += '</div>';
    });
    h += '</div>';
  }

  return h + '</div>';
}

// ── Eight Sleep ───────────────────────────────────────────────────────────────
// Schema: users, devices, sleep_sessions[{session_date,start_time,end_time,awake_duration_s,light_duration_s,
//         deep_duration_s,rem_duration_s,avg_heart_rate,hrv_ms,respiratory_rate,sleep_fitness_score,...}],
//         sleep_records[{date,sleep_score,time_slept_seconds,latency_seconds,tosses_turns,avg_heart_rate,
//         avg_hrv,avg_respiratory_rate,bed_temp_setting,room_temp_f}],
//         temperature_schedules, alarms
function renderEightSleep(data) {
  const records = (data.sleep_records||[]).slice().sort((a,b)=>b.date>a.date?1:-1);
  const sessions = (data.sleep_sessions||[]).slice().sort((a,b)=>(b.session_date||'')>(a.session_date||'')?1:-1);
  const devices = data.devices||[];
  const schedules = data.temperature_schedules||[];
  const alarms = data.alarms||[];

  const fmtH = s => (Number(s)/3600).toFixed(1);
  const avgScore = records.length ? Math.round(records.reduce((s,r)=>s+(r.sleep_score||0),0)/records.length) : 0;
  const avgHours = records.length ? records.reduce((s,r)=>s+(Number(r.time_slept_seconds)||0),0)/records.length/3600 : 0;
  const avgHR = records.length ? Math.round(records.reduce((s,r)=>s+(r.avg_heart_rate||0),0)/records.length) : 0;
  const avgHRV = records.length ? Math.round(records.reduce((s,r)=>s+(Number(r.avg_hrv)||0),0)/records.length) : 0;

  // Quality bands for sleep score
  const scoreClass = sc => sc >= 80 ? 'var(--green)' : sc >= 65 ? 'var(--yellow)' : 'var(--red)';

  let h = '<div style="max-width:900px">';

  // Summary cards
  h += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;margin-bottom:20px">';
  h += '<div class="ov-card"><div style="font-size:11px;color:var(--muted)">Avg Sleep Score</div><div style="font-size:24px;font-weight:800;color:'+scoreClass(avgScore)+'">'+avgScore+'</div></div>';
  h += '<div class="ov-card"><div style="font-size:11px;color:var(--muted)">Avg Sleep Time</div><div style="font-size:24px;font-weight:800">'+avgHours.toFixed(1)+'h</div></div>';
  h += '<div class="ov-card"><div style="font-size:11px;color:var(--muted)">Avg Heart Rate</div><div style="font-size:24px;font-weight:800">'+avgHR+' bpm</div></div>';
  h += '<div class="ov-card"><div style="font-size:11px;color:var(--muted)">Avg HRV</div><div style="font-size:24px;font-weight:800">'+avgHRV+' ms</div></div>';
  h += '<div class="ov-card"><div style="font-size:11px;color:var(--muted)">Nights Tracked</div><div style="font-size:24px;font-weight:800">'+records.length+'</div></div>';
  h += '</div>';

  if (devices.length) {
    h += '<div class="gen-section"><div class="gen-sec-title">Device</div>';
    devices.forEach(d => {
      h += '<div class="gen-rec" style="padding:10px 14px;font-size:12px">';
      h += '<strong>'+esc(d.model||'Pod')+'</strong> · firmware '+esc(d.firmware_version||'?');
      h += ' · <span style="color:'+(d.is_online?'var(--green)':'var(--red)')+'">'+(d.is_online?'online':'offline')+'</span>';
      if (d.water_level_pct != null) h += ' · 💧 '+d.water_level_pct+'%';
      if (d.last_seen) h += '<div style="color:var(--muted);margin-top:2px">last seen: '+fmtDT(d.last_seen)+'</div>';
      h += '</div>';
    });
    h += '</div>';
  }

  if (records.length) {
    h += '<div class="gen-section"><div class="gen-sec-title">Nightly Sleep ('+records.length+')</div>';
    records.slice(0,40).forEach(r => {
      const sc = r.sleep_score||0;
      h += '<div class="gen-rec" style="display:flex;gap:14px;padding:8px 12px;font-size:12px;border-left:3px solid '+scoreClass(sc)+'">';
      h += '<div style="color:var(--muted);min-width:90px">'+esc(r.date||'')+'</div>';
      h += '<div style="min-width:60px;font-weight:700;color:'+scoreClass(sc)+'">'+sc+'</div>';
      h += '<div>😴 '+fmtH(r.time_slept_seconds)+'h</div>';
      if (r.latency_seconds != null) h += '<div style="color:var(--muted)">latency '+Math.round(r.latency_seconds/60)+'m</div>';
      if (r.tosses_turns != null) h += '<div style="color:var(--muted)">tosses '+r.tosses_turns+'</div>';
      if (r.avg_heart_rate) h += '<div>❤ '+r.avg_heart_rate+'</div>';
      if (r.avg_hrv) h += '<div>HRV '+Math.round(r.avg_hrv)+'</div>';
      if (r.bed_temp_setting != null) h += '<div style="color:var(--muted)">temp '+(r.bed_temp_setting>0?'+':'')+r.bed_temp_setting+'</div>';
      h += '</div>';
    });
    h += '</div>';
  }

  if (sessions.length) {
    h += '<div class="gen-section"><div class="gen-sec-title">Detailed Sessions ('+sessions.length+')</div>';
    sessions.slice(0,20).forEach(s => {
      const sc = s.sleep_fitness_score||s.quality_score||0;
      h += '<div class="gen-rec" style="padding:10px 14px;font-size:12px;border-left:3px solid '+scoreClass(sc)+'">';
      h += '<div style="display:flex;justify-content:space-between"><strong>'+esc(s.session_date||'')+'</strong>';
      h += '<span style="font-weight:700;color:'+scoreClass(sc)+'">'+sc+'</span></div>';
      h += '<div style="color:var(--muted);margin-top:2px">';
      h += fmtDT(s.start_time)+' → '+fmtDT(s.end_time);
      h += '</div>';
      h += '<div style="margin-top:4px;display:flex;gap:12px;flex-wrap:wrap">';
      if (s.deep_duration_s != null) h += '<span>🌊 deep '+fmtH(s.deep_duration_s)+'h</span>';
      if (s.rem_duration_s != null) h += '<span>💭 REM '+fmtH(s.rem_duration_s)+'h</span>';
      if (s.light_duration_s != null) h += '<span>💡 light '+fmtH(s.light_duration_s)+'h</span>';
      if (s.awake_duration_s != null) h += '<span style="color:var(--red)">⏰ awake '+fmtH(s.awake_duration_s)+'h</span>';
      if (s.avg_heart_rate) h += '<span>❤ '+s.avg_heart_rate+'</span>';
      if (s.hrv_ms) h += '<span>HRV '+Math.round(s.hrv_ms)+'</span>';
      if (s.respiratory_rate) h += '<span>🫁 '+s.respiratory_rate+'</span>';
      h += '</div></div>';
    });
    h += '</div>';
  }

  if (alarms.length || schedules.length) {
    h += '<div class="gen-section"><div class="gen-sec-title">Settings</div>';
    alarms.forEach(a => {
      h += '<div class="gen-rec" style="padding:8px 14px;font-size:12px">';
      h += '⏰ <strong>'+esc(a.time||'?')+'</strong> · '+esc(a.days_of_week||'')+' · '+(a.enabled?'<span style="color:var(--green)">enabled</span>':'<span style="color:var(--muted)">off</span>');
      if (a.sound) h += ' · '+esc(a.sound);
      h += '</div>';
    });
    schedules.forEach(s => {
      h += '<div class="gen-rec" style="padding:8px 14px;font-size:12px">';
      h += '🌡 '+esc(s.label||'')+' · '+esc(s.time_of_night||'')+' · level '+(s.temp_level>0?'+':'')+s.temp_level+' · '+esc(s.side||'');
      h += '</div>';
    });
    h += '</div>';
  }

  return h + '</div>';
}

// ── Apple Health ──────────────────────────────────────────────────────────────
function renderAppleHealth(data) {
  const summaries = (data.activity_summaries||[]).sort((a,b)=>b.date>a.date?1:-1);
  const steps = data.step_records||[];
  const sleep = data.sleep_records||[];
  const hr = data.resting_heart_rate_records||data.heart_rate_records||[];
  const workouts = data.workout_records||[];

  const avgSteps = summaries.length ? Math.round(summaries.reduce((s,d)=>s+(d.active_energy_kcal?d.distance_km*1312:0),0)/summaries.length) : steps.length ? Math.round(steps.reduce((s,d)=>s+(d.total_steps||d.value||0),0)/steps.length) : 0;
  const avgHR = hr.length ? Math.round(hr.reduce((s,d)=>s+(d.value||0),0)/hr.length) : 0;

  let h = '<div style="max-width:900px">';
  h += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;margin-bottom:20px">';
  h += '<div class="ov-card"><div style="font-size:11px;color:var(--muted)">Days Tracked</div><div style="font-size:24px;font-weight:800">'+summaries.length+'</div></div>';
  if (avgHR) h += '<div class="ov-card"><div style="font-size:11px;color:var(--muted)">Avg Resting HR</div><div style="font-size:24px;font-weight:800">'+avgHR+' bpm</div></div>';
  h += '<div class="ov-card"><div style="font-size:11px;color:var(--muted)">Sleep Records</div><div style="font-size:24px;font-weight:800">'+sleep.length+'</div></div>';
  h += '<div class="ov-card"><div style="font-size:11px;color:var(--muted)">Workouts</div><div style="font-size:24px;font-weight:800">'+workouts.length+'</div></div>';
  h += '</div>';

  if (summaries.length) {
    h += '<div class="gen-section"><div class="gen-sec-title">Activity Summaries ('+summaries.length+')</div>';
    summaries.slice(0,20).forEach(d => {
      h += '<div class="gen-rec" style="display:flex;gap:16px;padding:8px 12px;font-size:12px">';
      h += '<div style="color:var(--muted);min-width:80px">'+esc(d.date)+'</div>';
      h += '<div>🔥 '+Math.round(d.active_energy_kcal||0)+' cal</div>';
      h += '<div>⏱ '+Math.round(d.exercise_minutes||0)+' min</div>';
      h += '<div>📏 '+(d.distance_km||0).toFixed(1)+' km</div>';
      h += '</div>';
    });
    h += '</div>';
  }
  if (workouts.length) {
    h += '<div class="gen-section"><div class="gen-sec-title">Workouts ('+workouts.length+')</div>';
    workouts.forEach(w => {
      h += '<div class="gen-rec" style="padding:10px 14px">';
      h += '<strong>'+esc(w.activity_type||'Workout')+'</strong> - '+(w.duration_minutes||0)+' min';
      if (w.total_energy_kcal) h += ' - '+Math.round(w.total_energy_kcal)+' cal';
      if (w.total_distance_km) h += ' - '+w.total_distance_km.toFixed(1)+' km';
      h += '<div style="font-size:11px;color:var(--muted)">'+fmtDT(w.start)+'</div></div>';
    });
    h += '</div>';
  }
  return h + '</div>';
}

// ── Garmin ─────────────────────────────────────────────────────────────────────
// Daily Summaries show the 20 newest days first; "Load more" / "Show all" reveal the remaining embedded rows
// (client-side only). Heart rate lives in its own table, garmin_health.heart_rate (one row per user_id + date);
// daily_stats has no heart-rate field. Each row shows that day's recorded avg / resting / min / max bpm, matched on
// (user_id, date), and "No data" when the day has no heart-rate record. Same design as Jade v2 Phase 3B.
const GARMIN_PAGE = 20;
const GARMIN_BTN = 'border:1px solid var(--border);background:transparent;color:var(--text);padding:5px 11px;border-radius:6px;cursor:pointer;font:inherit;font-size:12px';
let _garminView = null;

function renderGarmin(data) {
  const daily = (data.daily_summaries||data.daily_stats||[]).slice().sort((a,b)=>b.date>a.date?1:(b.date<a.date?-1:0));
  const hrRows = (data.heart_rate||[]).filter(r => r && r.date);
  const avgSteps = daily.length ? Math.round(daily.reduce((s,d)=>s+(d.steps||0),0)/daily.length) : 0;
  const rest = hrRows.filter(r => typeof r.resting_hr === 'number' && r.resting_hr > 0);
  const avgHR = rest.length ? Math.round(rest.reduce((s,r)=>s+r.resting_hr,0)/rest.length) : 0;

  let h = '<div style="max-width:900px">';
  h += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;margin-bottom:20px">';
  h += '<div class="ov-card"><div style="font-size:11px;color:var(--muted)">Avg Steps</div><div style="font-size:24px;font-weight:800">'+avgSteps.toLocaleString()+'</div></div>';
  if (avgHR) h += '<div class="ov-card"><div style="font-size:11px;color:var(--muted)">Avg Resting HR</div><div style="font-size:24px;font-weight:800;color:var(--orange)">'+avgHR+' bpm</div><div style="font-size:11px;color:var(--muted)">'+rest.length+' days with heart-rate data</div></div>';
  h += '<div class="ov-card"><div style="font-size:11px;color:var(--muted)">Days</div><div style="font-size:24px;font-weight:800">'+daily.length+'</div></div>';
  h += '</div>';

  if (daily.length) {
    const hrByKey = {};
    hrRows.forEach(r => { hrByKey[(r.user_id||'')+'|'+r.date] = r; });
    _garminView = {daily: daily, hrByKey: hrByKey, shown: Math.min(GARMIN_PAGE, daily.length)};
    h += '<div class="gen-section"><div class="gen-sec-title">Daily Summaries</div>';
    h += '<div style="padding:6px 12px;font-size:11px;color:var(--muted);border-bottom:1px solid var(--border)">❤️ = recorded heart rate for the day (avg · resting · min–max bpm) · "No data" = no heart-rate record for that date</div>';
    h += '<div id="garmin-daily-rows">';
    for (let i = 0; i < _garminView.shown; i++) h += garminDailyRow(daily[i], hrByKey);
    h += '</div>';
    h += '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:10px 12px;border-top:1px solid var(--border);font-size:12px">';
    h += '<span id="garmin-daily-progress" style="color:var(--muted)">'+esc(garminProgressText())+'</span>';
    h += '<span id="garmin-daily-pager" style="display:'+(_garminView.shown < daily.length ? 'inline-flex' : 'none')+';gap:8px">';
    h += '<button onclick="garminShowMore(false)" style="'+GARMIN_BTN+'">Load more</button>';
    h += '<button onclick="garminShowMore(true)" style="'+GARMIN_BTN+'">Show all</button>';
    h += '</span></div>';
    h += '</div>';
  }
  return h + '</div>';
}

function garminDailyRow(d, hrByKey) {
  const r = hrByKey[(d.user_id||'')+'|'+d.date];
  const ok = x => typeof x === 'number' && isFinite(x) && x > 0;
  let h = '<div class="gen-rec" data-garmin-date="'+attrEsc(d.date)+'" style="display:flex;gap:14px;padding:8px 12px;font-size:12px;flex-wrap:wrap">';
  h += '<div style="color:var(--muted);min-width:80px">'+esc(d.date)+'</div>';
  h += '<div>🚶 '+(d.steps||0).toLocaleString()+'</div>';
  if (r && (ok(r.avg_hr) || ok(r.resting_hr))) {
    const parts = [];
    if (ok(r.avg_hr)) parts.push('avg '+r.avg_hr);
    if (ok(r.resting_hr)) parts.push('resting '+r.resting_hr);
    if (ok(r.min_hr) && ok(r.max_hr)) parts.push(r.min_hr+'–'+r.max_hr);
    h += '<div data-garmin-hr="record">❤️ '+esc(parts.join(' · '))+' bpm</div>';
  } else {
    h += '<div data-garmin-hr="none" title="No Garmin heart-rate record for this date" style="color:var(--muted)">❤️ No data</div>';
  }
  h += '</div>';
  return h;
}

function garminProgressText() {
  const v = _garminView;
  return 'Showing '+v.shown+' of '+v.daily.length+' days ('+v.daily[0].date+' to '+v.daily[v.shown-1].date+')';
}

function garminShowMore(all) {
  const v = _garminView, box = document.getElementById('garmin-daily-rows');
  if (!v || !box) return;
  const next = all ? v.daily.length : Math.min(v.shown + GARMIN_PAGE, v.daily.length);
  let h = '';
  for (let i = v.shown; i < next; i++) h += garminDailyRow(v.daily[i], v.hrByKey);
  if (h) box.insertAdjacentHTML('beforeend', h);
  v.shown = next;
  const p = document.getElementById('garmin-daily-progress');
  if (p) p.textContent = garminProgressText();
  const g = document.getElementById('garmin-daily-pager');
  if (g && v.shown >= v.daily.length) g.style.display = 'none';
}
// ── MyFitnessPal ──────────────────────────────────────────────────────────────
function renderMyFitnessPal(data) {
  const foodLogs = data.food_logs||[];
  const foods = data.foods||[];
  const foodMap = {};
  foods.forEach(f => {
    if (f.food_id) foodMap[f.food_id] = f;
    if (f.id != null) foodMap[String(f.id)] = f;
  });

  let daily = (data.daily_nutrition || []).slice();
  if (!daily.length && foodLogs.length) {
    const agg = {};
    foodLogs.forEach(fl => {
      const date = fl.log_date;
      if (!date) return;
      const fd = foodMap[fl.food_id] || {};
      const sv = Number(fl.servings) || 1;
      const cals = (Number(fd.calories) || 0) * sv;
      const pg = (Number(fd.protein_g) || 0) * sv;
      const cg = (Number(fd.carbs_g) || 0) * sv;
      const fg = (Number(fd.fat_g) || 0) * sv;
      if (!agg[date]) agg[date] = { date: date, calories: 0, protein_g: 0, carbs_g: 0, fat_g: 0 };
      agg[date].calories += cals;
      agg[date].protein_g += pg;
      agg[date].carbs_g += cg;
      agg[date].fat_g += fg;
    });
    daily = Object.values(agg);
  }
  daily.sort((a,b)=>b.date>a.date?1:-1);

  const avgCal = daily.length ? Math.round(daily.reduce((s,d)=>s+(d.calories||0),0)/daily.length) : 0;

  let h = '<div style="max-width:900px">';
  h += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;margin-bottom:20px">';
  h += '<div class="ov-card"><div style="font-size:11px;color:var(--muted)">Avg Calories</div><div style="font-size:24px;font-weight:800">'+avgCal.toLocaleString()+'</div></div>';
  h += '<div class="ov-card"><div style="font-size:11px;color:var(--muted)">Days Logged</div><div style="font-size:24px;font-weight:800">'+daily.length+'</div></div>';
  h += '<div class="ov-card"><div style="font-size:11px;color:var(--muted)">Food Entries</div><div style="font-size:24px;font-weight:800">'+foodLogs.length+'</div></div>';
  h += '</div>';

  if (daily.length) {
    h += '<div class="gen-section"><div class="gen-sec-title">Daily Nutrition</div>';
    daily.slice(0,20).forEach(d => {
      h += '<div class="gen-rec" style="display:flex;gap:14px;padding:8px 12px;font-size:12px">';
      h += '<div style="color:var(--muted);min-width:80px">'+esc(d.date)+'</div>';
      h += '<div>🔥 '+(d.calories||0)+' cal</div>';
      h += '<div>🥩 '+(d.protein_g||0)+'g P</div>';
      h += '<div>🍞 '+(d.carbs_g||0)+'g C</div>';
      h += '<div>🧈 '+(d.fat_g||0)+'g F</div>';
      h += '</div>';
    });
    h += '</div>';
  }

  if (foodLogs.length) {
    h += '<div class="gen-section"><div class="gen-sec-title">Recent Food Logs</div>';
    foodLogs.slice(0,15).forEach(fl => {
      const food = foodMap[fl.food_id]||{};
      h += '<div class="gen-rec" style="padding:6px 14px;font-size:12px">';
      h += esc(fl.log_date||'')+' - <strong>'+esc(food.name||fl.meal_type||'Food')+'</strong>';
      if (fl.servings) h += ' × '+fl.servings;
      h += '</div>';
    });
    h += '</div>';
  }
  return h + '</div>';
}

// ── CRM ───────────────────────────────────────────────────────────────────────
function renderCRM(data) {
  const contacts = data.contacts||[];
  const deals = data.deals||[];
  const engagements = data.engagements||[];
  const companies = data.companies||[];

  // SOT-canonical fields: dealname, dealstage, engagement_type, body, createdate
  // Fallbacks (.name, .stage, .type, .timestamp) preserved for legacy seeds.
  const companyMap = {}; companies.forEach(c => { if (c.id) companyMap[c.id] = c; });
  const contactMap = {}; contacts.forEach(c => { if (c.id) contactMap[c.id] = c; });

  // Deal-stage pretty labels (HubSpot pipeline conventions)
  const stageLabel = {
    appointmentscheduled: 'Appointment Scheduled',
    qualifiedtobuy:       'Qualified to Buy',
    presentationscheduled:'Presentation Scheduled',
    decisionmakerboughtin:'Decision Maker Bought-In',
    contractsent:         'Contract Sent',
    closedwon:            'Closed Won',
    closedlost:           'Closed Lost',
  };
  const stageColor = {
    closedwon: 'var(--green)',
    closedlost: 'var(--red)',
    contractsent: 'var(--accent)',
    decisionmakerboughtin: 'var(--accent)',
  };

  let h = '<div style="max-width:900px">';

  if (companies.length) {
    h += '<div class="gen-section"><div class="gen-sec-title">Companies ('+companies.length+')</div>';
    companies.forEach(c => {
      h += '<div class="gen-rec" style="padding:12px 14px">';
      h += '<div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px">';
      h += '<strong>'+esc(c.name||'(unnamed company)')+'</strong>';
      if (c.industry) h += '<span style="color:var(--muted);font-size:12px">'+esc(c.industry)+'</span>';
      h += '</div>';
      const meta = [];
      if (c.city || c.state) meta.push([c.city, c.state].filter(Boolean).join(', '));
      if (c.numberofemployees) meta.push(c.numberofemployees+' employees');
      if (c.annualrevenue) meta.push('$'+Number(c.annualrevenue).toLocaleString()+' rev');
      if (c.domain) meta.push(esc(c.domain));
      if (meta.length) h += '<div style="font-size:12px;color:var(--muted);margin-top:2px">'+meta.join(' · ')+'</div>';
      if (c.description) h += '<div style="font-size:12px;margin-top:6px">'+esc(trunc(c.description, 240))+'</div>';
      h += '</div>';
    });
    h += '</div>';
  }

  if (deals.length) {
    h += '<div class="gen-section"><div class="gen-sec-title">Deals ('+deals.length+')</div>';
    // Sort newest closedate first
    const sortedDeals = [...deals].sort((a,b) => String(b.closedate||'').localeCompare(String(a.closedate||'')));
    sortedDeals.forEach(d => {
      const name = d.dealname || d.name || d.deal_name || '(untitled deal)';
      const stage = d.dealstage || d.stage || '';
      const stagePretty = stageLabel[stage] || stage;
      const sColor = stageColor[stage] || 'var(--muted)';
      const company = d.company_id && companyMap[d.company_id] ? companyMap[d.company_id].name : '';
      h += '<div class="gen-rec" style="padding:12px 14px;border-left:3px solid '+sColor+';cursor:pointer" onclick="this.querySelector(&quot;.crm-deal-body&quot;)&&this.querySelector(&quot;.crm-deal-body&quot;).classList.toggle(&quot;open&quot;)">';
      h += '<div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px">';
      h += '<strong>'+esc(name)+'</strong>';
      if (d.amount) h += '<span style="font-weight:700;color:var(--green)">$'+Number(d.amount).toLocaleString()+'</span>';
      h += '</div>';
      const meta = [];
      if (stagePretty) meta.push('<span style="color:'+sColor+';font-weight:600">'+esc(stagePretty)+'</span>');
      if (company) meta.push(esc(company));
      if (d.closedate) meta.push('Close: '+esc(d.closedate));
      if (d.pipeline) meta.push('Pipeline: '+esc(d.pipeline));
      if (meta.length) h += '<div style="font-size:12px;color:var(--muted);margin-top:4px">'+meta.join(' · ')+'</div>';
      if (d.description) h += '<div class="crm-deal-body" style="display:none;font-size:12px;margin-top:8px;padding-top:8px;border-top:1px solid var(--border);white-space:pre-wrap">'+esc(d.description)+'</div>';
      h += '</div>';
    });
    h += '</div>';
  }

  if (contacts.length) {
    h += '<div class="gen-section"><div class="gen-sec-title">Contacts ('+contacts.length+')</div>';
    contacts.slice(0, 30).forEach(c => {
      h += '<div class="gen-rec" style="padding:8px 14px;font-size:12px">';
      h += '<strong>'+esc(c.full_name||c.name||'')+'</strong>';
      if (c.jobtitle) h += ' - '+esc(c.jobtitle);
      if (c.company_id && companyMap[c.company_id]) h += ' @ '+esc(companyMap[c.company_id].name);
      if (c.email) h += ' <span style="color:var(--muted)">'+esc(c.email)+'</span>';
      h += '</div>';
    });
    h += '</div>';
  }

  if (engagements.length) {
    h += '<div class="gen-section"><div class="gen-sec-title">Engagements ('+engagements.length+')</div>';
    const sortedEng = [...engagements].sort((a,b) => String(b.createdate||b.timestamp||'').localeCompare(String(a.createdate||a.timestamp||'')));
    sortedEng.slice(0, 20).forEach(e => {
      const etype = e.engagement_type || e.type || 'NOTE';
      const when = e.createdate || e.timestamp || e.created_at;
      const body = e.body || e.notes || e.description || '';
      const title = e.title || '';
      const typeColor = etype === 'CALL' ? 'var(--accent)' : (etype === 'EMAIL' ? 'var(--green)' : 'var(--muted)');
      h += '<div class="gen-rec" style="padding:10px 14px">';
      h += '<div style="display:flex;justify-content:space-between;gap:10px;font-size:12px">';
      h += '<span style="color:'+typeColor+';font-weight:700">'+esc(etype)+'</span>';
      if (when) h += '<span style="color:var(--muted)">'+esc(String(when).substring(0,10))+'</span>';
      h += '</div>';
      if (title) h += '<div style="font-size:13px;font-weight:600;margin-top:2px">'+esc(title)+'</div>';
      if (body) h += '<div style="font-size:12px;margin-top:4px;white-space:pre-wrap">'+esc(trunc(body, 400))+'</div>';
      h += '</div>';
    });
    h += '</div>';
  }

  return h + '</div>' || renderGeneric(data);
}

// ── Linear ────────────────────────────────────────────────────────────────────
function renderLinear(data) {
  const issues   = data.issues   || [];
  const users    = data.users    || [];
  const teams    = data.teams    || [];
  const projects = data.projects || [];
  const states   = data.workflow_states || data.states || [];
  const cycles   = data.cycles   || [];
  const comments = data.comments || [];

  // Build id -> display-name lookup tables
  const userMap    = {}; users.forEach(u => { if (u && u.id) userMap[u.id] = u.name || u.email || u.id; });
  const teamMap    = {}; teams.forEach(t => { if (t && t.id) teamMap[t.id] = t.name || t.key || t.id; });
  const projectMap = {}; projects.forEach(p => { if (p && p.id) projectMap[p.id] = p.name || p.id; });
  const stateMap   = {}; states.forEach(s => { if (s && s.id) stateMap[s.id] = s.name || s.id; });
  const cycleMap   = {}; cycles.forEach(c => { if (c && c.id) cycleMap[c.id] = c.name || `Cycle ${c.number || ''}`; });

  const priorityLabel = (p) => ({0:'No priority',1:'Urgent',2:'High',3:'Medium',4:'Low'}[p] || (p==null?'':String(p)));
  const priorityColor = (p) => ({1:'var(--red)',2:'var(--orange)',3:'var(--yellow)',4:'var(--muted)'}[p] || 'var(--muted)');
  const stateColor = (state) => {
    const s = (state || '').toLowerCase();
    if (s.includes('done') || s.includes('complete')) return 'var(--green)';
    if (s.includes('progress') || s.includes('review')) return 'var(--blue)';
    if (s.includes('cancel')) return 'var(--muted)';
    if (s.includes('triage') || s.includes('backlog')) return 'var(--orange)';
    return 'var(--yellow)';
  };

  let h = '<div style="max-width:900px">';

  // Workspace summary header
  h += '<div class="gen-section"><div class="gen-sec-title">Workspace</div>';
  h += '<div class="gen-rec" style="padding:12px;display:flex;gap:24px;flex-wrap:wrap">';
  h += '<div><div style="color:var(--muted);font-size:11px">Issues</div><div style="font-size:20px;font-weight:700">'+issues.length+'</div></div>';
  h += '<div><div style="color:var(--muted);font-size:11px">Projects</div><div style="font-size:20px;font-weight:700">'+projects.length+'</div></div>';
  h += '<div><div style="color:var(--muted);font-size:11px">Teams</div><div style="font-size:20px;font-weight:700">'+teams.length+'</div></div>';
  h += '<div><div style="color:var(--muted);font-size:11px">Members</div><div style="font-size:20px;font-weight:700">'+users.length+'</div></div>';
  if (cycles.length) h += '<div><div style="color:var(--muted);font-size:11px">Cycles</div><div style="font-size:20px;font-weight:700">'+cycles.length+'</div></div>';
  h += '</div></div>';

  // Projects
  if (projects.length) {
    h += '<div class="gen-section"><div class="gen-sec-title">Projects ('+projects.length+')</div>';
    projects.forEach(p => {
      const teamId = p.team_id || (Array.isArray(p.team_ids) ? p.team_ids[0] : '');
      h += '<div class="gen-rec" style="padding:12px;margin-bottom:8px">';
      h += '<div style="font-weight:700;font-size:14px">'+esc(p.name || '(unnamed)')+'</div>';
      const lines = [];
      if (teamId && teamMap[teamId]) lines.push('Team: '+esc(teamMap[teamId]));
      if (p.lead_id && userMap[p.lead_id]) lines.push('Lead: '+esc(userMap[p.lead_id]));
      if (p.state) lines.push('State: '+esc(p.state));
      if (lines.length) h += '<div style="font-size:12px;color:var(--muted);margin-top:4px">'+lines.join(' · ')+'</div>';
      if (p.description) h += '<div style="font-size:12px;margin-top:4px">'+esc(p.description)+'</div>';
      h += '</div>';
    });
    h += '</div>';
  }

  // Issues - the main payload
  h += '<div class="gen-section"><div class="gen-sec-title">Issues ('+issues.length+')</div>';
  // Sort by updated_at desc then created_at desc
  const sortedIssues = [...issues].sort((a, b) => {
    const ka = a.updated_at || a.created_at || '';
    const kb = b.updated_at || b.created_at || '';
    return kb.localeCompare(ka);
  });
  sortedIssues.forEach(iss => {
    const stateName = stateMap[iss.state_id] || '';
    const projectName = projectMap[iss.project_id] || '';
    const cycleName = cycleMap[iss.cycle_id] || '';
    const assigneeName = userMap[iss.assignee_id] || '';
    const teamName = teamMap[iss.team_id] || '';
    h += '<div class="gen-rec" style="padding:12px;margin-bottom:8px;border-left:3px solid '+stateColor(stateName)+'">';
    h += '<div style="display:flex;justify-content:space-between;align-items:start;gap:12px">';
    h += '<div style="flex:1;min-width:0">';
    h += '<div style="font-weight:700;font-size:14px">';
    if (iss.identifier) h += '<span style="color:var(--muted);font-weight:500;margin-right:6px">'+esc(iss.identifier)+'</span>';
    h += esc(iss.title || '(untitled)');
    h += '</div>';
    if (iss.description) h += '<div style="font-size:12px;color:var(--muted);margin-top:4px;max-height:60px;overflow:hidden">'+esc(iss.description)+'</div>';
    const meta = [];
    if (stateName) meta.push('<span style="color:'+stateColor(stateName)+'">●</span> '+esc(stateName));
    if (assigneeName) meta.push('Assignee: '+esc(assigneeName));
    if (projectName) meta.push('Project: '+esc(projectName));
    if (cycleName) meta.push('Cycle: '+esc(cycleName));
    if (teamName) meta.push('Team: '+esc(teamName));
    if (iss.priority != null) meta.push('<span style="color:'+priorityColor(iss.priority)+'">Priority: '+priorityLabel(iss.priority)+'</span>');
    if (iss.estimate != null) meta.push('Estimate: '+iss.estimate);
    if (Array.isArray(iss.labels) && iss.labels.length) meta.push('Labels: '+iss.labels.map(esc).join(', '));
    if (meta.length) h += '<div style="font-size:11px;color:var(--muted);margin-top:6px">'+meta.join(' · ')+'</div>';

    // Timestamps row - created / updated. Linear uses ISO 8601 strings; render
    // them through fmtDT so the persona TZ is honoured.
    const ts = [];
    if (iss.created_at) ts.push('Created ' + fmtDT(iss.created_at));
    if (iss.updated_at && iss.updated_at !== iss.created_at) ts.push('Updated ' + fmtDT(iss.updated_at));
    if (ts.length) h += '<div style="font-size:11px;color:var(--muted);margin-top:4px">' + esc(ts.join(' · ')) + '</div>';

    h += '</div></div></div>';
  });
  h += '</div>';

  // Comments
  if (comments.length) {
    h += '<div class="gen-section"><div class="gen-sec-title">Recent comments ('+comments.length+')</div>';
    comments.slice(0, 10).forEach(c => {
      const authorId = c.author_id || c.user_id || '';
      const author = userMap[authorId] || authorId || 'Unknown';
      const issueRef = (issues.find(i => i.id === c.issue_id) || {});
      const issueLabel = issueRef.identifier ? (issueRef.identifier + ' ' + (issueRef.title || '')) : (c.issue_id || '');
      h += '<div class="gen-rec" style="padding:10px;margin-bottom:6px;font-size:13px">';
      h += '<div><strong>'+esc(author)+'</strong> on <span style="color:var(--muted)">'+esc(issueLabel.slice(0,80))+'</span></div>';
      if (c.body) h += '<div style="margin-top:4px">'+esc(c.body)+'</div>';
      if (c.created_at) h += '<div style="font-size:11px;color:var(--muted);margin-top:4px">'+esc(c.created_at)+'</div>';
      h += '</div>';
    });
    h += '</div>';
  }

  h += '</div>';
  return h;
}


// ── Generic ───────────────────────────────────────────────────────────────────
function renderGeneric(data) {
  let h = '';
  for (const [table, records] of Object.entries(data)) {
    if (!Array.isArray(records)||!records.length) continue;
    h += `<div class="gen-section">`;
    h += `<div class="gen-sec-title">${esc(table)} (${records.length})</div>`;
    records.forEach(rec => {
      h += `<div class="gen-rec"><div class="gen-fields">`;
      Object.entries(rec).forEach(([k,v]) => {
        if (v===null||v===undefined) return;
        let display = typeof v==='object' ? JSON.stringify(v) : String(v);
        const isTs = typeof v==='number' && v>1e9 && v<2e10;
        if (isTs) display = fmtDT(v);
        const long = display.length>100;
        h += `<div class="gf-label">${esc(k)}</div>`;
        h += `<div class="gf-val ${long?'muted':''}">${esc(trunc(display,150))}</div>`;
      });
      h += `</div></div>`;
    });
    h += `</div>`;
  }
  return h || '<p class="empty-state">No records</p>';
}

// ── Markdown ──────────────────────────────────────────────────────────────────
function renderMd(md) {
  if (!md) return '<p class="muted">No content.</p>';
  let h = md.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  // Tables (simple pipe tables)
  h = h.replace(/^(\|.+\|)\n\|[-| :]+\|\n((?:\|.+\|\n?)*)/gm, (_, hdr, body) => {
    const thCells = hdr.split('|').filter((_,i,a)=>i>0&&i<a.length-1).map(c=>`<th>${c.trim()}</th>`).join('');
    const rows = body.trim().split('\n').map(row => {
      const cells = row.split('|').filter((_,i,a)=>i>0&&i<a.length-1).map(c=>`<td>${c.trim()}</td>`).join('');
      return `<tr>${cells}</tr>`;
    }).join('');
    return `<table><thead><tr>${thCells}</tr></thead><tbody>${rows}</tbody></table>`;
  });
  h = h.replace(/^### (.+)$/gm,'<h3>$1</h3>');
  h = h.replace(/^## (.+)$/gm,'<h2>$1</h2>');
  h = h.replace(/^# (.+)$/gm,'<h1>$1</h1>');
  h = h.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
  h = h.replace(/\*(.+?)\*/g,'<em>$1</em>');
  h = h.replace(/`([^`]+)`/g,'<code>$1</code>');
  h = h.replace(/^---+$/gm,'<hr>');
  h = h.replace(/^- (.+)$/gm,'<li>$1</li>');
  h = h.replace(/(<li>.+<\/li>\n?)+/g, m=>`<ul>${m}</ul>`);
  h = h.replace(/\n\n+/g,'</p><p>');
  return `<div class="md-body"><p>${h}</p></div>`.replace(/<p><\/p>/g,'').replace(/<p>(<h[123]|<hr|<ul|<table)/g,'$1').replace(/(<\/h[123]>|<\/ul>|<\/table>)<\/p>/g,'$1');
}

// ── Global search ────────────────────────────────────────────────────────────
// Case-insensitive search across every seed_data record + memory docs. Fires
// on every keystroke. Click a result to jump to that server's panel.
const SEARCH_FIELD_BLACKLIST = new Set([
  // IDs / refs / opaque tokens - never useful to search
  'id', 'email_id', 'transaction_id', 'event_id', 'message_id',
  'conversation_id', 'activity_id', 'reminder_id', 'page_id',
  'block_id', 'database_id', 'parent_id', 'thread_id', 'reply_to',
  'in_reply_to', 'user_id', 'sender_id', 'recipient_id', 'channel',
  'channel_id', 'team_id', 'project_id', 'state_id', 'cycle_id',
  'assignee_id', 'author_id', 'contact_id', 'venue_id', 'order_id',
  'lead_id', 'creator', 'creator_id', 'owner_id', 'workspace_id',
  'speaker_id', 'athlete_id', 'ts', 'thread_ts', 'latest_reply',
  // Internal viewer fields injected by renderCalendar / renderAirtable
  '_inferred_table_id', '_spanRole', '_spanIndex', '_spanTotal',
  '_spanStartKey', '_spanEndKey',
]);
const SEARCH_MAX_RESULTS = 200;

function _serverEmoji(server) {
  const m = (DATA_NAV || []).find(d => d.id === server);
  return m ? m.emoji : '📄';
}

function _serverLabel(server) {
  const m = (DATA_NAV || []).find(d => d.id === server);
  return m ? m.label : server;
}

function _stringifyForSearch(v, seen) {
  if (v == null) return '';
  if (typeof v === 'string') return v;
  if (typeof v === 'number' || typeof v === 'boolean') return String(v);
  if (!seen) seen = new Set();
  if (typeof v === 'object') {
    if (seen.has(v)) return '';
    seen.add(v);
    try {
      const values = Array.isArray(v) ? v : Object.values(v);
      return values.map(item => _stringifyForSearch(item, seen)).join(' ');
    } catch (err) {
      return '';
    }
  }
  return '';
}

function _makeSnippet(text, q, padBefore = 50, padAfter = 80) {
  const idx = text.toLowerCase().indexOf(q);
  if (idx < 0) return text.slice(0, padBefore + padAfter);
  const start = Math.max(0, idx - padBefore);
  const end = Math.min(text.length, idx + q.length + padAfter);
  let snip = text.slice(start, end).replace(/\s+/g, ' ').trim();
  if (start > 0) snip = '…' + snip;
  if (end < text.length) snip = snip + '…';
  return snip;
}

function _highlightHit(text, q) {
  const escapedQ = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return esc(text).replace(new RegExp(escapedQ, 'gi'),
    m => '<mark class="search-hit">' + m + '</mark>');
}

function _recordTitle(rec, collection, index) {
  if (typeof rec === 'string') return rec.slice(0, 80);
  if (!rec || typeof rec !== 'object') return collection + '[' + index + ']';
  for (const f of ['title', 'subject', 'name', 'real_name', 'merchant',
                   'first_name', 'display_name', 'content', 'text', 'body']) {
    if (typeof rec[f] === 'string' && rec[f].trim()) {
      return rec[f].slice(0, 80);
    }
  }
  return collection + '[' + index + ']';
}

function performSearch(rawQuery) {
  try {
    return _performSearch(rawQuery);
  } catch (err) {
    return [];
  }
}

function _performSearch(rawQuery) {
  const q = (rawQuery || '').toLowerCase().trim();
  if (q.length < 2) return [];
  const results = [];

  const SEARCH_SKIP = {memory:1, tensions:1, run_manifest:1, final_manifest:1, safety_tensions:1};
  for (const [server, data] of Object.entries(SEED || {})) {
    if (results.length >= SEARCH_MAX_RESULTS) break;
    if (SEARCH_SKIP[server]) continue;
    if (!data || typeof data !== 'object') continue;
    for (const [collection, items] of Object.entries(data)) {
      if (results.length >= SEARCH_MAX_RESULTS) break;
      if (!Array.isArray(items)) continue;
      items.forEach((rec, i) => {
        if (results.length >= SEARCH_MAX_RESULTS) return;
        if (rec == null) return;
        if (typeof rec === 'string') {
          if (rec.toLowerCase().includes(q)) {
            results.push({
              kind: 'seed',
              server, collection, index: i,
              field: '',
              title: rec.slice(0, 80),
              snippet: _makeSnippet(rec, q),
            });
          }
          return;
        }
        if (typeof rec !== 'object') return;
        let matchedField = '';
        let matchedText = '';
        for (const [field, value] of Object.entries(rec)) {
          if (SEARCH_FIELD_BLACKLIST.has(field)) continue;
          const text = _stringifyForSearch(value);
          if (text && text.toLowerCase().includes(q)) {
            matchedField = field;
            matchedText = text;
            break;
          }
        }
        if (matchedField) {
          results.push({
            kind: 'seed',
            server, collection, index: i,
            field: matchedField,
            title: _recordTitle(rec, collection, i),
            snippet: _makeSnippet(matchedText, q),
          });
        }
      });
    }
  }

  // Markdown docs (Memory, Tensions, Storylines, Relationships/NPCs)
  const DOC_META = {
    memory:     { label: 'Memory',        emoji: '🧠', nav: 'memory' },
    tensions:   { label: 'Tensions',      emoji: '⚠️', nav: 'tensions' },
    storylines: { label: 'Storylines',    emoji: '📖', nav: 'storylines' },
    npcs:       { label: 'Relationships', emoji: '🤝', nav: 'npcs' },
  };
  for (const [docKey, md] of Object.entries(MARKDOWN || {})) {
    if (results.length >= SEARCH_MAX_RESULTS) break;
    if (SEARCH_SKIP[docKey]) continue;
    if (typeof md !== 'string' || !md) continue;
    const lc = md.toLowerCase();
    let from = 0;
    let hits = 0;
    while (hits < 6) {
      const idx = lc.indexOf(q, from);
      if (idx < 0) break;
      // Find the heading immediately above
      const before = md.slice(0, idx);
      const lastHeading = before.match(/(?:^|\n)#{1,6}\s+([^\n]+)\s*(?=[\s\S]*$)/);
      const headings = before.match(/(?:^|\n)#{1,6}\s+[^\n]+/g) || [];
      const lastH = headings.length ? headings[headings.length - 1].replace(/^[\s#]+/, '').trim() : '';
      results.push({
        kind: 'doc',
        docKey,
        meta: DOC_META[docKey] || { label: docKey, emoji: '📄', nav: docKey },
        title: lastH || (DOC_META[docKey] ? DOC_META[docKey].label : docKey),
        snippet: _makeSnippet(md.slice(Math.max(0, idx - 50), Math.min(md.length, idx + q.length + 100)), q),
      });
      from = idx + q.length;
      hits++;
      if (results.length >= SEARCH_MAX_RESULTS) break;
    }
  }

  return results;
}

function renderSearchResults(query, results) {
  const titleEl = document.getElementById('search-title');
  const subEl   = document.getElementById('search-sub');
  const contEl  = document.getElementById('search-content');
  titleEl.textContent = results.length
    ? `${results.length} result${results.length === 1 ? '' : 's'} for "${query}"`
    : `No results for "${query}"`;
  // Count distinct sources
  const sources = new Set(results.map(r => r.kind === 'seed' ? r.server : r.docKey));
  subEl.textContent = results.length
    ? `Across ${sources.size} source${sources.size === 1 ? '' : 's'} · click a result to open`
    : 'Try a different term or check spelling';
  if (!results.length) {
    contEl.innerHTML = '<div class="search-empty">No matches found.</div>';
    return;
  }
  // Group by source
  const grouped = new Map();
  results.forEach(r => {
    const key = r.kind === 'seed' ? r.server : r.docKey;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(r);
  });
  let h = '';
  for (const [key, items] of grouped) {
    const first = items[0];
    const emoji = first.kind === 'seed' ? _serverEmoji(key) : (first.meta?.emoji || '📄');
    const label = first.kind === 'seed' ? _serverLabel(key) : (first.meta?.label || key);
    h += '<div class="gen-section">';
    h += '<div class="gen-sec-title">' + emoji + ' ' + esc(label) + ' (' + items.length + ')</div>';
    items.forEach(r => {
      const nav = r.kind === 'seed' ? r.server : (r.meta?.nav || r.docKey);
      const isServer = r.kind === 'seed';
      const subline = r.kind === 'seed'
        ? `${esc(r.collection)}[${r.index}]${r.field ? ' · ' + esc(r.field) : ''}`
        : 'Section';
      const arg = JSON.stringify(nav == null ? '' : nav).replace(/"/g, '&quot;');
      h += '<div class="search-result-card" onclick="navTo(' + arg + ',' + (isServer ? 'true' : 'false') + ')">';
      h += '<div class="search-result-hdr">' + subline + '</div>';
      h += '<div class="search-result-title">' + _highlightHit(String(r.title || ''), query) + '</div>';
      h += '<div class="search-result-snip">' + _highlightHit(r.snippet || '', query) + '</div>';
      h += '</div>';
    });
    h += '</div>';
  }
  contEl.innerHTML = h;
}

let _searchTimer = null;
let _lastActivePanel = 'overview';

function showSearchPanel(query) {
  // Remember which panel was active before search took over
  document.querySelectorAll('.panel.active').forEach(p => {
    if (p.id !== 'panel-search') _lastActivePanel = p.id.replace('panel-', '');
  });
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.getElementById('panel-search').classList.add('active');
  const results = performSearch(query);
  renderSearchResults(query, results);
}

function hideSearchPanel() {
  document.getElementById('panel-search').classList.remove('active');
  // Restore the panel that was active before search
  const restoreId = _lastActivePanel || 'overview';
  const navEl = document.querySelector('[data-nav="' + restoreId + '"]');
  if (navEl && navEl.closest('#data-nav-items')) {
    navTo(restoreId, true);
  } else {
    navTo(restoreId || 'overview', false);
  }
}

function _searchResultCards() {
  return Array.from(document.querySelectorAll('#search-content .search-result-card'));
}

function _focusSearchCard(idx) {
  const cards = _searchResultCards();
  if (!cards.length) return;
  cards.forEach(c => c.classList.remove('kbd-active'));
  const clamped = Math.max(0, Math.min(cards.length - 1, idx));
  const card = cards[clamped];
  card.classList.add('kbd-active');
  card.scrollIntoView({block:'nearest', behavior:'smooth'});
  card.dataset.kbdIdx = String(clamped);
  // store global active index on the panel
  document.getElementById('panel-search').dataset.kbdIdx = String(clamped);
}

function openKbdHelp() {
  document.getElementById('kbd-help-overlay').classList.add('active');
}
function closeKbdHelp() {
  document.getElementById('kbd-help-overlay').classList.remove('active');
}

function _isTypingInField(e) {
  const t = e.target;
  if (!t) return false;
  if (t.id === 'sb-search') return false;  // search box handled separately
  return t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable;
}

let _gPending = false;

function initSearch() {
  const input = document.getElementById('sb-search');
  const wrap  = document.getElementById('sb-search-wrap');
  const clear = document.getElementById('sb-search-clear');
  if (!input) return;
  input.addEventListener('input', e => {
    const q = e.target.value || '';
    wrap.classList.toggle('has-query', q.trim().length > 0);
    if (q.trim().length < 2) {
      hideSearchPanel();
      return;
    }
    clearTimeout(_searchTimer);
    _searchTimer = setTimeout(() => {
      showSearchPanel(q);
      // Auto-focus first result so ↓/⏎ works immediately
      requestAnimationFrame(() => _focusSearchCard(0));
    }, 60);
  });
  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      input.value = '';
      wrap.classList.remove('has-query');
      hideSearchPanel();
      input.blur();
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const cur = parseInt(document.getElementById('panel-search').dataset.kbdIdx || '-1');
      _focusSearchCard(cur + 1);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const cur = parseInt(document.getElementById('panel-search').dataset.kbdIdx || '0');
      _focusSearchCard(cur - 1);
      return;
    }
    if (e.key === 'Enter') {
      const cards = _searchResultCards();
      const cur = parseInt(document.getElementById('panel-search').dataset.kbdIdx || '0');
      const card = cards[cur];
      if (card) {
        e.preventDefault();
        card.click();
        input.blur();
      }
    }
  });
  clear.addEventListener('click', () => {
    input.value = '';
    wrap.classList.remove('has-query');
    hideSearchPanel();
    input.focus();
  });

  // Global keyboard shortcuts
  document.addEventListener('keydown', e => {
    // Cmd/Ctrl-K focuses search
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      input.focus();
      input.select();
      return;
    }
    // Don't interfere when typing
    if (_isTypingInField(e)) return;
    // "/" focuses search
    if (e.key === '/' && !e.metaKey && !e.ctrlKey && document.activeElement !== input) {
      e.preventDefault();
      input.focus();
      return;
    }
    // "?" toggles help
    if (e.key === '?' && !e.metaKey && !e.ctrlKey) {
      e.preventDefault();
      const ov = document.getElementById('kbd-help-overlay');
      ov.classList.toggle('active');
      return;
    }
    // Esc closes help overlay
    if (e.key === 'Escape') {
      const ov = document.getElementById('kbd-help-overlay');
      if (ov.classList.contains('active')) {
        e.preventDefault();
        ov.classList.remove('active');
        return;
      }
    }
    // g+<n> / g+o leader sequence
    if (e.key === 'g' && !e.metaKey && !e.ctrlKey && !e.altKey) {
      _gPending = true;
      setTimeout(() => { _gPending = false; }, 1200);
      return;
    }
    if (_gPending) {
      _gPending = false;
      if (e.key === 'o' || e.key === 'O') {
        e.preventDefault();
        navTo('overview', false);
        return;
      }
      if (/^[1-9]$/.test(e.key)) {
        e.preventDefault();
        const idx = parseInt(e.key) - 1;
        const target = DATA_NAV[idx];
        if (target) navTo(target.id, true);
        return;
      }
    }
  });
}


// ── Init ──────────────────────────────────────────────────────────────────────
// Normalize JSON-string columns into real arrays/objects. Universes dumped
// straight from a DB store list/JSON columns as encoded strings; this makes
// every renderer's array/object assumptions hold without per-call-site guards.
function normalizeSeed(){
  try {
    const S = (typeof SEED !== 'undefined' && SEED) ? SEED : (window.SEED || {});
    const mg = S.messaging;
    if (mg && Array.isArray(mg.conversations)) {
      mg.conversations.forEach(c => {
        if (c && typeof c === 'object') {
          if (typeof c.participant_ids === 'string') c.participant_ids = _arr(c.participant_ids);
          if (typeof c.messages === 'string') c.messages = _arr(c.messages);
        }
      });
    }
    const at = S.airtable;
    if (at) {
      (at.tables || []).forEach(t => {
        if (t && typeof t === 'object') {
          if (typeof t.fields === 'string') t.fields = _arr(t.fields);
          if (typeof t.views === 'string') t.views = _arr(t.views);
        }
      });
      (at.records || []).forEach(r => {
        if (r && typeof r === 'object' && typeof r.fields === 'string') r.fields = _obj(r.fields);
      });
    }
    const sl = S.slack;
    if (sl && Array.isArray(sl.channels)) {
      sl.channels.forEach(c => { if (c && typeof c.members === 'string') c.members = _arr(c.members); });
    }
    const ln = S.linear;
    if (ln && Array.isArray(ln.issues)) {
      ln.issues.forEach(i => { if (i && typeof i.labels === 'string') i.labels = _arr(i.labels); });
    }
  } catch(e) { /* non-fatal */ }
}
normalizeSeed();
buildSidebar();
document.querySelectorAll('[data-nav]').forEach(el => {
  if (!el.closest('#data-nav-items')) {
    el.addEventListener('click', () => navTo(el.dataset.nav, false));
  }
});
document.getElementById('md-memory').innerHTML    = renderMd(MARKDOWN.memory);
document.getElementById('md-tensions').innerHTML  = renderMd(MARKDOWN.tensions);
document.getElementById('md-storylines').innerHTML = renderMd(MARKDOWN.storylines);
document.getElementById('md-npcs').innerHTML      = renderMd(MARKDOWN.npcs);
// Tensions badge: the number of entries in TENSIONS; no badge while the list is empty.
if (TENSIONS.length) document.querySelector('[data-nav="tensions"]').insertAdjacentHTML('beforeend', `<span class="nav-count">${TENSIONS.length}</span>`);
initSearch();
renderOverview();
// Scroll messaging to bottom on first load if it's shown

