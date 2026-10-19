
const SEED = {};
SEED["airtable"] = __UV.seed["airtable"];
SEED["apple_health"] = __UV.seed["apple_health"];
SEED["calendar"] = __UV.seed["calendar"];
SEED["contacts"] = __UV.seed["contacts"];
SEED["duffel"] = __UV.seed["duffel"];
SEED["email"] = __UV.seed["email"];
SEED["facebook"] = __UV.seed["facebook"];
SEED["filesystem"] = __UV.seed["filesystem"];
SEED["fintrack"] = __UV.seed["fintrack"];
SEED["instagram"] = __UV.seed["instagram"];
SEED["messaging"] = __UV.seed["messaging"];
SEED["messenger"] = __UV.seed["messenger"];
SEED["plaid"] = __UV.seed["plaid"];
SEED["reminder"] = __UV.seed["reminder"];
SEED["slack"] = __UV.seed["slack"];
var SKIN_HTML = {};
SKIN_HTML["reminder"] = "<style>\n.vsk-reminder {display:block; background:#F2F2F7; padding:18px; border-radius:12px; color:#000000; font-size:15px; font-family:-apple-system,'SF Pro Text','Helvetica Neue',Helvetica,Arial,sans-serif;}\n.vsk-reminder .vsk-rem-shell {max-width:760px; margin:0 auto;}\n.vsk-reminder .vsk-rem-head {padding:2px 4px 12px;}\n.vsk-reminder .vsk-rem-h1 {font-size:32px; font-weight:800; margin:0; letter-spacing:-.02em;}\n.vsk-reminder .vsk-rem-sub {font-size:13px; color:#8E8E93; margin-top:2px;}\n.vsk-reminder .vsk-rem-tiles {display:flex; flex-wrap:wrap; gap:10px; margin-bottom:18px;}\n.vsk-reminder .vsk-rem-tile {flex:1 1 120px; background:#FFFFFF; border-radius:12px; padding:10px 12px; display:flex; flex-direction:column; gap:2px;}\n.vsk-reminder .vsk-rem-tile-ic {width:26px; height:26px; border-radius:50%; color:#FFFFFF; font-size:13px; display:flex; align-items:center; justify-content:center; margin-bottom:4px;}\n.vsk-reminder .vsk-rem-tile-n {font-size:24px; font-weight:800; line-height:1;}\n.vsk-reminder .vsk-rem-tile-l {font-size:12px; color:#8E8E93;}\n.vsk-reminder .vsk-rem-scroll {max-height:60vh; overflow:auto; padding-right:2px;}\n.vsk-reminder .vsk-rem-secttl {font-size:12px; font-weight:700; color:#8E8E93; text-transform:uppercase; letter-spacing:.05em; padding:2px 6px 8px;}\n.vsk-reminder .vsk-rem-card, .vsk-reminder .vsk-rem-completed {background:#FFFFFF; border-radius:12px; margin-bottom:14px; overflow:hidden;}\n.vsk-reminder .vsk-rem-cardhead {display:flex; align-items:center; gap:8px; padding:11px 14px; border-bottom:1px solid #E5E5EA;}\n.vsk-reminder .vsk-rem-donehead {background:#FBFBFD;}\n.vsk-reminder .vsk-rem-listdot {width:12px; height:12px; border-radius:50%; flex:0 0 12px;}\n.vsk-reminder .vsk-rem-listname {font-weight:700; font-size:16px;}\n.vsk-reminder .vsk-rem-listcount {margin-left:auto; color:#8E8E93; font-size:14px;}\n.vsk-reminder .vsk-rem-list {list-style:none; margin:0; padding:0;}\n.vsk-reminder .vsk-rem-row {display:flex; gap:11px; align-items:flex-start; padding:10px 14px; border-bottom:1px solid #F0F0F3;}\n.vsk-reminder .vsk-rem-row:last-child {border-bottom:0;}\n.vsk-reminder .vsk-rem-check {flex:0 0 21px; width:21px; height:21px; border-radius:50%; border:1.6px solid #C7C7CC; margin-top:2px; color:#FFFFFF; font-size:12px; line-height:18px; text-align:center;}\n.vsk-reminder .vsk-rem-check-done {background:#8E8E93; border-color:#8E8E93;}\n.vsk-reminder .vsk-rem-content {flex:1 1 auto; min-width:0; display:flex; flex-direction:column; gap:2px;}\n.vsk-reminder .vsk-rem-title {font-size:15px; line-height:1.3;}\n.vsk-reminder .vsk-rem-row-done .vsk-rem-title {color:#8E8E93; text-decoration:line-through;}\n.vsk-reminder .vsk-rem-notes {font-size:13px; color:#8E8E93; line-height:1.35;}\n.vsk-reminder .vsk-rem-badges {display:flex; flex-wrap:wrap; gap:6px; margin-top:3px;}\n.vsk-reminder .vsk-rem-badge {font-size:11px; color:#007AFF; background:#EAF3FF; border-radius:8px; padding:1px 7px;}\n.vsk-reminder .vsk-rem-when {flex:0 0 110px; text-align:right; display:flex; flex-direction:column; gap:1px;}\n.vsk-reminder .vsk-rem-date {font-size:13px; color:#007AFF;}\n.vsk-reminder .vsk-rem-clock {font-size:11px; color:#8E8E93;}\n.vsk-reminder .vsk-rem-late .vsk-rem-date {color:#FF3B30; font-weight:700;}\n.vsk-reminder .vsk-rem-notified {font-size:10px; color:#8E8E93; text-transform:uppercase; letter-spacing:.04em;}\n.vsk-reminder .vsk-rem-inferred {font-size:12px; color:#8E8E93; padding:10px 14px; background:#FFFBEA; border-bottom:1px solid #F0F0F3;}\n.vsk-reminder .vsk-rem-quiet {padding:14px; color:#8E8E93; font-size:13px; font-style:italic;}\n.vsk-reminder .vsk-reminder-empty {padding:24px; background:#FFFFFF; border-radius:12px; color:#8E8E93;}\n<\/style>\n<div class=\"vsk vsk-reminder\" data-skin=\"reminder\" data-skin-product=\"Reminders\"><div class=\"vsk-rem-shell\"><div class=\"vsk-rem-head\"><h1 class=\"vsk-rem-h1\">Reminders<\/h1><div class=\"vsk-rem-sub\">43 reminders, 21 open, 22 completed<\/div><\/div><div class=\"vsk-rem-tiles\"><div class=\"vsk-rem-tile\"><span class=\"vsk-rem-tile-ic\" style=\"background:#FF3B30\">&#9888;<\/span><span class=\"vsk-rem-tile-n\">20<\/span><span class=\"vsk-rem-tile-l\">Overdue<\/span><\/div><div class=\"vsk-rem-tile\"><span class=\"vsk-rem-tile-ic\" style=\"background:#FF9500\">&#128197;<\/span><span class=\"vsk-rem-tile-n\">21<\/span><span class=\"vsk-rem-tile-l\">Scheduled<\/span><\/div><div class=\"vsk-rem-tile\"><span class=\"vsk-rem-tile-ic\" style=\"background:#8E8E93\">&#9776;<\/span><span class=\"vsk-rem-tile-n\">43<\/span><span class=\"vsk-rem-tile-l\">All<\/span><\/div><div class=\"vsk-rem-tile\"><span class=\"vsk-rem-tile-ic\" style=\"background:#FF9500\">&#9873;<\/span><span class=\"vsk-rem-tile-n\">0<\/span><span class=\"vsk-rem-tile-l\">Flagged<\/span><\/div><div class=\"vsk-rem-tile\"><span class=\"vsk-rem-tile-ic\" style=\"background:#8E8E93\">&#10003;<\/span><span class=\"vsk-rem-tile-n\">22<\/span><span class=\"vsk-rem-tile-l\">Completed<\/span><\/div><\/div><div class=\"vsk-rem-scroll\"><div class=\"vsk-rem-listsec\"><div class=\"vsk-rem-secttl\">Scheduled by month<\/div><section class=\"vsk-rem-card\" data-reminder-list=\"October 2026\"><div class=\"vsk-rem-cardhead\"><span class=\"vsk-rem-listdot\" style=\"background:#AF52DE\"><\/span><span class=\"vsk-rem-listname\">October 2026<\/span><span class=\"vsk-rem-listcount\">5<\/span><\/div><ul class=\"vsk-rem-list\"><li class=\"vsk-rem-row\" data-reminder-id=\"a07ed4c29f1b6e83c5a0b39f\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Box the Bennett hummingbird cake<\/span><span class=\"vsk-rem-notes\">June checks the frosting first. Rides to market in the cooler Sat 10/24. $95 balance at pickup, her brother may come.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Oct 23, 2026<\/span><span class=\"vsk-rem-clock\">14:00<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"1b6f8a3dc0e57942e1d6f0a3\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Review Business Visa statement before autopay<\/span><span class=\"vsk-rem-notes\">Closes the 22nd, autopay in full from business checking on the 17th. Flag anything personal before it goes to Priscilla.<\/span><span class=\"vsk-rem-badges\"><span class=\"vsk-rem-badge\">repeats every 1 month<\/span><\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Oct 23, 2026<\/span><span class=\"vsk-rem-clock\">15:30<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"3d7a0e6c2b84f19d7a3e0c62\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Ask Dana about Piedmont net-30 terms<\/span><span class=\"vsk-rem-notes\">Application went in when the account opened 08-03. Still paying each delivery on the Visa.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Oct 26, 2026<\/span><span class=\"vsk-rem-clock\">10:00<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"47e1c9b3f6a0d5e8c2b7f4a1\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Final head count to Sorrel &amp; Pine<\/span><span class=\"vsk-rem-notes\">Staff plus-ones are due today. Sorrel &amp; Pine needs the final count by Thu 11/5. Booked for 12.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Oct 30, 2026<\/span><span class=\"vsk-rem-clock\">10:00<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"f5e20c97b84a3d1f6e0b95c7\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Winter market: answer the board<\/span><span class=\"vsk-rem-notes\">First Saturdays of Dec, Jan and Feb. Reply to board@ by Fri 10/30 if we&#x27;re in.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Oct 30, 2026<\/span><span class=\"vsk-rem-clock\">15:30<\/span><\/span><\/li><\/ul><\/section><section class=\"vsk-rem-card\" data-reminder-list=\"November 2026\"><div class=\"vsk-rem-cardhead\"><span class=\"vsk-rem-listdot\" style=\"background:#FF3B30\"><\/span><span class=\"vsk-rem-listname\">November 2026<\/span><span class=\"vsk-rem-listcount\">11<\/span><\/div><ul class=\"vsk-rem-list\"><li class=\"vsk-rem-row\" data-reminder-id=\"6c39e1a507d8b2f4a9c61e0d\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Caf\u00e9 rent, $4,850 to Haywood Road Properties<\/span><span class=\"vsk-rem-notes\">Due on the 1st by ACH from business checking 5520.<\/span><span class=\"vsk-rem-badges\"><span class=\"vsk-rem-badge\">repeats every 1 month<\/span><\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Nov 01, 2026<\/span><span class=\"vsk-rem-clock\">07:00<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"d0a47f2ce9b153e80c6af4d7\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Mortgage payment, Mountain CU 7740<\/span><span class=\"vsk-rem-notes\">$1,524.05 from personal checking 1904: $1,081.55 principal and interest plus $442.50 escrow.<\/span><span class=\"vsk-rem-badges\"><span class=\"vsk-rem-badge\">repeats every 1 month<\/span><\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Nov 01, 2026<\/span><span class=\"vsk-rem-clock\">07:30<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"8f1eb5c3a26d0e974b3fc8a1\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Owner draw, 1st of the month<\/span><span class=\"vsk-rem-notes\">$3,500 from business checking 5520 to personal checking 1904. A draw, not a business expense.<\/span><span class=\"vsk-rem-badges\"><span class=\"vsk-rem-badge\">repeats every 1 month<\/span><\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Nov 01, 2026<\/span><span class=\"vsk-rem-clock\">08:00<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"3a7d0b9ef6c1d485e2a76c0f\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Zelle Hazel $250<\/span><span class=\"vsk-rem-notes\">Monthly allowance from Mountain CU checking, after the 1st draw lands.<\/span><span class=\"vsk-rem-badges\"><span class=\"vsk-rem-badge\">repeats every 1 month<\/span><\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Nov 01, 2026<\/span><span class=\"vsk-rem-clock\">08:30<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"0f6c3a9e5d2b8f1c4a7e0d3b\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Pick up order - Carolina Knife Works<\/span><span class=\"vsk-rem-notes\">Order CKW-20417, already paid. Open Mon to Sat 10 to 6.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Nov 02, 2026<\/span><span class=\"vsk-rem-clock\">10:00<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"a8d5b1f7c4e0a3d9b6f2c8e5\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Cake boxes 10&quot; for 11/9<\/span><span class=\"vsk-rem-notes\">Pull two from dry storage before the Saturday count.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Nov 06, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"b92c4e0a7d36f18bc5e9a24d\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Save a slice for Hazel<\/span><span class=\"vsk-rem-notes\">Freeze one slice of the pear cake before it goes to Sorrel &amp; Pine. Promised her on 10/18.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Nov 09, 2026<\/span><span class=\"vsk-rem-clock\">16:30<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"27d6a0e3c94f1b58e72a0d6c\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Deductions packet to Priscilla<\/span><span class=\"vsk-rem-notes\">2026 YTD deductions for the 11/17 meeting. Business and personal in separate sections. Due Fri 11/13.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Nov 13, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"0e5ba8d3c7f62e19d4b08f63\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Owner draw, 15th of the month<\/span><span class=\"vsk-rem-notes\">Second $3,500 draw of the month, 5520 to 1904.<\/span><span class=\"vsk-rem-badges\"><span class=\"vsk-rem-badge\">repeats every 1 month<\/span><\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Nov 15, 2026<\/span><span class=\"vsk-rem-clock\">08:00<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"74c8f0e2b5a9d16c3e8f0b27\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Thanksgiving pie pickups at the caf\u00e9<\/span><span class=\"vsk-rem-notes\">7 to 3 at Haywood Rd. Holloway: one apple, one pecan, $60 paid at pickup, around noon.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Nov 25, 2026<\/span><span class=\"vsk-rem-clock\">07:00<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"9d4a17e3b06c2f85a8e31d70\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Renew county permit ($150)<\/span><span class=\"vsk-rem-notes\">TFE-11-0417, market stand. County portal, card or e-check.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Nov 30, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><\/ul><\/section><section class=\"vsk-rem-card\" data-reminder-list=\"December 2026\"><div class=\"vsk-rem-cardhead\"><span class=\"vsk-rem-listdot\" style=\"background:#FFCC00\"><\/span><span class=\"vsk-rem-listname\">December 2026<\/span><span class=\"vsk-rem-listcount\">2<\/span><\/div><ul class=\"vsk-rem-list\"><li class=\"vsk-rem-row\" data-reminder-id=\"2f6c0b8e94a17d53c6e0f2a9\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Upload renewed permit to market vendor portal<\/span><span class=\"vsk-rem-notes\">Certificate PDF under Documents. Needed for 2027 stall.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Dec 04, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"c2f96d1a0e8b47c3a5d2e96f\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Hearth: update Luis&#x27;s pay rate<\/span><span class=\"vsk-rem-notes\">GM rate starts Jan 1. Priscilla says change it before the first January pay run.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Dec 28, 2026<\/span><span class=\"vsk-rem-clock\">10:00<\/span><\/span><\/li><\/ul><\/section><section class=\"vsk-rem-card\" data-reminder-list=\"January 2027\"><div class=\"vsk-rem-cardhead\"><span class=\"vsk-rem-listdot\" style=\"background:#FF2D55\"><\/span><span class=\"vsk-rem-listname\">January 2027<\/span><span class=\"vsk-rem-listcount\">3<\/span><\/div><ul class=\"vsk-rem-list\"><li class=\"vsk-rem-row\" data-reminder-id=\"49e0d7b3a1f6c2589e4d0b7a\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Register for NAABE 2027<\/span><span class=\"vsk-rem-notes\">Registration opens today. Past-attendee rate $275 through Fri 2/26, then $325. Hotel block opens with registration. Book flights after: out 5/16, back 5/18.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Jan 12, 2027<\/span><span class=\"vsk-rem-clock\">10:00<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"b9f24e1c07a8d35b6c9e2f14\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Q4 estimates (IRS + NC)<\/span><span class=\"vsk-rem-notes\">Federal 1040-ES and NC-40 Q4 payments from Mountain CU checking 1904.<\/span><\/span><span class=\"vsk-rem-when vsk-rem-late\"><span class=\"vsk-rem-date\">Jan 15, 2027<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row\" data-reminder-id=\"eb371c8f5a0d92e6b4c1f8d5\" data-completed=\"false\"><span class=\"vsk-rem-check\"><\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Book February espresso service<\/span><span class=\"vsk-rem-notes\">Carolina Espresso recommended Feb 2027, six months after the 8/18 visit (SR-20818-07). Ask for a Tuesday, caf\u00e9 closed.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Jan 26, 2027<\/span><span class=\"vsk-rem-clock\">10:00<\/span><\/span><\/li><\/ul><\/section><\/div><section class=\"vsk-rem-completed\" data-reminder-section=\"completed\"><div class=\"vsk-rem-cardhead vsk-rem-donehead\"><span class=\"vsk-rem-listname\">Completed<\/span><span class=\"vsk-rem-listcount\">22<\/span><\/div><div class=\"vsk-rem-inferred\" data-completion-source=\"notification\">Completion is inferred, not stated: this payload carries no completed field, so a reminder counts as completed when it has a notification time and its due date is before Tuesday 26 January 2027, the newest moment in the data.<\/div><ul class=\"vsk-rem-list\"><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"d6a0b3e95f1c47a28e0b5c13\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Piedmont: charged twice on the 9th?<\/span><span class=\"vsk-rem-notes\">Saw two $1,186.40 Piedmont lines on the Visa around the 9th. Check against invoice 4468.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Oct 20, 2026<\/span><span class=\"vsk-rem-clock\">08:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"4f2c8e0a6d91b37f5e2c0a84\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Match Oct slips to Piedmont invoices<\/span><span class=\"vsk-rem-notes\">October slip photos in Deliveries/2026-10 against the Piedmont invoice PDFs. Fill in Rec&#x27;d in Bakehouse Ops and tick Qty checked.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Oct 20, 2026<\/span><span class=\"vsk-rem-clock\">08:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"e9b5a1d3f70c26e8b4a9d1f5\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Send Piedmont order for Tue 10/20<\/span><span class=\"vsk-rem-notes\">Check the stock sheet in Bakehouse Ops, then send to orders@ before noon.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Oct 19, 2026<\/span><span class=\"vsk-rem-clock\">10:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"5d8b1e46a3f0c97d2b5e0a81\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Pears for Tuesday test bake<\/span><span class=\"vsk-rem-notes\">June at 8:00, back door, before the Piedmont truck. She brings the rye caramel.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Oct 12, 2026<\/span><span class=\"vsk-rem-clock\">14:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"e3c0a7b65d92f14e8b0c2e7d\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Pay Greer Law statement, $725.00<\/span><span class=\"vsk-rem-notes\">September statement: $2,225.00 in fees less the $1,500.00 retainer. Due on receipt, ACH from business checking.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Oct 02, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"27f5c9a3b1e80d64f2c7a59e\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Feldman cake to the market stand<\/span><span class=\"vsk-rem-notes\">Saturday pickup at the stand, 8 to 12. Chocolate with the green toy dinosaur, no writing. $42 balance.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Sep 26, 2026<\/span><span class=\"vsk-rem-clock\">06:30<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"9a2d5f71e0b4c86e3a19f7d0\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Post the fall menu<\/span><span class=\"vsk-rem-notes\">Starts Wed 9/23. Cider donuts Sat and Sun only, June leads pastry. Told Luis I&#x27;d post Monday.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Sep 23, 2026<\/span><span class=\"vsk-rem-clock\">08:30<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"c06b8e3f2d7a51c9b4f8e2a6\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Rye starter to Sourwood, there by 9<\/span><span class=\"vsk-rem-notes\">Class 10 to 1, same room as May. $1,050 check at the end.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Sep 21, 2026<\/span><span class=\"vsk-rem-clock\">08:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"4e9a06d1c5b8f372a6e01d94\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Send Sourwood the rye class handout<\/span><span class=\"vsk-rem-notes\">Rye and Whole Grain Sourdough, Mon 9/21. 14 enrolled, they added a bench.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Sep 17, 2026<\/span><span class=\"vsk-rem-clock\">15:30<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"81d3b7f0e6c24a950d7ec3b8\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Q3 estimates (IRS + NC)<\/span><span class=\"vsk-rem-notes\">Same as June: $4,800 IRS Direct Pay and $1,150 NCDOR from 1904. Set the Q4 reminder after.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Sep 15, 2026<\/span><span class=\"vsk-rem-clock\">08:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"f17c3a0e8d65b29f4c1e7a08\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Order Hazel&#x27;s orgo book<\/span><span class=\"vsk-rem-notes\">Klein, 4th edition, for Chem 261. Link is in her texts. First quiz Thursday.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Sep 14, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"6a4fc2e8d0739b51e8a60f3c\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Block party at 4: two loaves and cookies<\/span><span class=\"vsk-rem-notes\">Saturday on Westwood, sign-up sheet on Tamsin&#x27;s porch. Walt has the smoker, sides still needed.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Aug 22, 2026<\/span><span class=\"vsk-rem-clock\">14:30<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"d82e6b4f1a09c7e53f6da92b\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Espresso service at 9, back door<\/span><span class=\"vsk-rem-notes\">Carolina Espresso: descale and new group gaskets. Machine on and up to temp by 8:30. Bill the Visa on file.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Aug 18, 2026<\/span><span class=\"vsk-rem-clock\">08:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"3c710e9bf5a482d6c3e07b1f\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Pay UNC fall bill, my share $4,215<\/span><span class=\"vsk-rem-notes\">Hazel thinks it&#x27;s due the 21st. Move $4,000 from savings to checking first.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Aug 14, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"b6a2f91d4e073c58d1b9e40a\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Send Hal the Blue Ridge Mill paperwork<\/span><span class=\"vsk-rem-notes\">Scan the July temp log and pull up the 2024 supply agreement first, then send it all in one email.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Aug 05, 2026<\/span><span class=\"vsk-rem-clock\">15:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"0f8e5c3a9b14d7e6a20c63f9\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Greer Law retainer, $1,500<\/span><span class=\"vsk-rem-notes\">ACH from business checking to Greer Law PLLC. Hal bills $250 an hour against it.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Aug 03, 2026<\/span><span class=\"vsk-rem-clock\">09:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"e94d2a8c07f1b6e35c9a0d41\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Q2 estimates (IRS + NC)<\/span><span class=\"vsk-rem-notes\">$4,800 federal 1040-ES and $1,150 NC-40 from personal checking 1904. Save both confirmations to Tax/2026.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Jun 15, 2026<\/span><span class=\"vsk-rem-clock\">08:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"5b07d3e9c1a64f829d0be57c\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Dentist cleaning, Dr. Shah<\/span><span class=\"vsk-rem-notes\">Westgate Family Dentistry at 9:00, 40 Westgate Pkwy, Suite 2. Call (828) 555-0124 to move it.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">Jun 09, 2026<\/span><span class=\"vsk-rem-clock\">08:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"a1c6e07b3f95d2480e6cb7a3\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Out the door by 2:30 for AVL<\/span><span class=\"vsk-rem-notes\">UA 5412 flight leaves at 5:05, conf K7QZ4M. Luis has the Sunday close.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">May 17, 2026<\/span><span class=\"vsk-rem-clock\">14:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"c58a0f2d6e91b34c7a05d8e2\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Starter for 12, Sourwood class<\/span><span class=\"vsk-rem-notes\">Setup from 9:15, class 10 to 1. Bring my bench scrapers. $900 fee by check at the end.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">May 11, 2026<\/span><span class=\"vsk-rem-clock\">08:00<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"7e3b91c0a4d852f6e1b70c39\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Send Sourwood the class handout<\/span><span class=\"vsk-rem-notes\">Sourdough Fundamentals, Mon 5/11, 12 students. They print copies, need it by Fri 5/8.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">May 08, 2026<\/span><span class=\"vsk-rem-clock\">15:30<\/span><\/span><\/li><li class=\"vsk-rem-row vsk-rem-row-done\" data-reminder-id=\"2d9f64a10bc7e835f6a219d4\" data-completed=\"true\"><span class=\"vsk-rem-check vsk-rem-check-done\">&#10003;<\/span><span class=\"vsk-rem-content\"><span class=\"vsk-rem-title\">Certificate of insurance to market board<\/span><span class=\"vsk-rem-notes\">Due Fri 5/15. Market listed as holder and additional insured, policy BOP-NC-2026-118407. No setup on 5/16 without it.<\/span><\/span><span class=\"vsk-rem-when\"><span class=\"vsk-rem-date\">May 05, 2026<\/span><span class=\"vsk-rem-clock\">10:00<\/span><\/span><\/li><\/ul><\/section><\/div><\/div><\/div>";
SKIN_HTML["slack"] = "<style>\n.vsk-slack {display:block; font-family:Lato,'Helvetica Neue',Helvetica,Arial,sans-serif; color:#1D1C1D; font-size:15px; line-height:1.46;}\n.vsk-slack .vsk-slack-shell {display:flex; align-items:stretch; border:1px solid #DDDDDD; border-radius:8px; overflow:hidden; background:#FFFFFF; min-height:520px;}\n.vsk-slack .vsk-slack-rail {flex:0 0 240px; width:240px; background:#3F0E40; color:#BCABBC; display:flex; flex-direction:column; max-height:76vh;}\n.vsk-slack .vsk-slack-ws {background:#4A154B; padding:12px 14px; border-bottom:1px solid rgba(255,255,255,0.12);}\n.vsk-slack .vsk-slack-wsname {color:#FFFFFF; font-weight:900; font-size:15px;}\n.vsk-slack .vsk-slack-wsmeta {color:#CFC3CF; font-size:11px; margin-top:2px;}\n.vsk-slack .vsk-slack-rail-scroll {overflow:auto; padding:8px 0 16px;}\n.vsk-slack .vsk-slack-railsec {color:#BCABBC; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.04em; padding:12px 16px 4px;}\n.vsk-slack .vsk-slack-channels, .vsk-slack .vsk-slack-members {list-style:none; margin:0; padding:0;}\n.vsk-slack .vsk-slack-chan-item > a {display:flex; align-items:center; gap:6px; padding:4px 16px; color:#CFC3CF; text-decoration:none; font-size:14px;}\n.vsk-slack .vsk-slack-chan-item > a:hover {background:#350D36; color:#FFFFFF;}\n.vsk-slack .vsk-slack-hash {opacity:.7; font-weight:700;}\n.vsk-slack .vsk-slack-chan-name {flex:1 1 auto; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;}\n.vsk-slack .vsk-slack-chan-count {font-size:11px; color:#9E8CA0; background:rgba(0,0,0,.18); border-radius:9px; padding:0 6px;}\n.vsk-slack .vsk-slack-chan-archived > a {opacity:.55; font-style:italic;}\n.vsk-slack .vsk-slack-member {display:flex; align-items:center; gap:8px; padding:3px 16px; font-size:13px; color:#CFC3CF;}\n.vsk-slack .vsk-slack-dot {width:10px; height:10px; border-radius:50%; flex:0 0 10px;}\n.vsk-slack .vsk-slack-member-name {flex:1 1 auto; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;}\n.vsk-slack .vsk-slack-member-count {font-size:11px; color:#9E8CA0;}\n.vsk-slack .vsk-slack-main {flex:1 1 auto; background:#FFFFFF; overflow:auto; max-height:76vh; min-width:0;}\n.vsk-slack .vsk-slack-channel {border-bottom:8px solid #F8F8F8;}\n.vsk-slack .vsk-slack-chan-head {position:sticky; top:0; z-index:2; background:#FFFFFF; border-bottom:1px solid #E8E8E8; padding:12px 20px 10px;}\n.vsk-slack .vsk-slack-channel:target .vsk-slack-chan-head {box-shadow:inset 3px 0 0 #4A154B; background:#FBF7FB;}\n.vsk-slack .vsk-slack-chan-title {font-size:17px; font-weight:900; color:#1D1C1D; display:flex; align-items:center; gap:4px;}\n.vsk-slack .vsk-slack-chan-meta {font-size:12px; color:#616061; margin-top:2px;}\n.vsk-slack .vsk-slack-topic {font-size:13px; color:#1D1C1D; margin-top:6px;}\n.vsk-slack .vsk-slack-purpose {font-size:12px; color:#616061; margin-top:2px;}\n.vsk-slack .vsk-slack-msgs {padding:8px 0 14px;}\n.vsk-slack .vsk-slack-msg {display:flex; gap:10px; padding:6px 20px; align-items:flex-start;}\n.vsk-slack .vsk-slack-msg:hover {background:#F8F8F8;}\n.vsk-slack .vsk-slack-avatar {flex:0 0 36px; width:36px; height:36px; border-radius:6px; color:#FFFFFF; font-weight:800; font-size:13px; display:flex; align-items:center; justify-content:center;}\n.vsk-slack .vsk-slack-body {flex:1 1 auto; min-width:0;}\n.vsk-slack .vsk-slack-head {display:flex; align-items:baseline; gap:8px; flex-wrap:wrap;}\n.vsk-slack .vsk-slack-name {font-weight:900; color:#1D1C1D; font-size:15px;}\n.vsk-slack .vsk-slack-ts {font-size:11px; color:#616061;}\n.vsk-slack .vsk-slack-tag {font-size:10px; text-transform:uppercase; letter-spacing:.03em; color:#616061; border:1px solid #E8E8E8; border-radius:3px; padding:0 4px;}\n.vsk-slack .vsk-slack-text {white-space:normal; word-wrap:break-word; margin:2px 0;}\n.vsk-slack .vsk-slack-text-empty {color:#868686; font-style:italic;}\n.vsk-slack .vsk-slack-mention {color:#1264A3; background:#E8F5FA; border-radius:3px; padding:0 2px;}\n.vsk-slack .vsk-slack-link {color:#1264A3; text-decoration:underline;}\n.vsk-slack .vsk-slack-reactions {display:flex; flex-wrap:wrap; gap:6px; margin-top:4px;}\n.vsk-slack .vsk-slack-reaction {font-size:12px; border:1px solid #DDDDDD; border-radius:12px; padding:1px 8px; color:#1D1C1D; background:#F8F8F8; display:inline-flex; align-items:center; cursor:default;}\n.vsk-slack .vsk-slack-reaction > b {margin-left:5px; color:#1264A3;}\n.vsk-slack .vsk-slack-emoji {font-family:'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif; font-size:1.2em; line-height:1; font-style:normal;}\n.vsk-slack .vsk-slack-reaction .vsk-slack-emoji {font-size:15px;}\n.vsk-slack .vsk-slack-files {margin-top:6px; display:flex; flex-direction:column; gap:4px;}\n.vsk-slack .vsk-slack-file {display:flex; gap:8px; align-items:center; font-size:13px; border:1px solid #E8E8E8; border-radius:6px; padding:6px 10px; max-width:520px;}\n.vsk-slack .vsk-slack-file-meta {color:#616061; font-size:11px;}\n.vsk-slack .vsk-slack-thread {margin:2px 0 10px 66px; border-left:2px solid #E3E3E3; padding-left:12px;}\n.vsk-slack .vsk-slack-thread-head {font-size:12px; color:#1264A3; font-weight:700; padding:4px 0 2px;}\n.vsk-slack .vsk-slack-thread-orphan .vsk-slack-thread-head {color:#8A5A00;}\n.vsk-slack .vsk-slack-reply {padding:4px 8px;}\n.vsk-slack .vsk-slack-quiet {padding:14px 20px; color:#868686; font-style:italic; font-size:13px;}\n.vsk-slack .vsk-slack-empty {padding:24px; color:#616061; background:#FFFFFF; border:1px dashed #DDDDDD; border-radius:8px;}\n<\/style>\n<div class=\"vsk vsk-slack\" data-skin=\"slack\" data-skin-product=\"Slack\"><div class=\"vsk-slack-shell\"><nav class=\"vsk-slack-rail\"><div class=\"vsk-slack-ws\"><div class=\"vsk-slack-wsname\">Slack workspace<\/div><div class=\"vsk-slack-wsmeta\">3 channels &#183; 9 members<\/div><\/div><div class=\"vsk-slack-rail-scroll\"><div class=\"vsk-slack-railsec\">Channels<\/div><ul class=\"vsk-slack-channels\"><li class=\"vsk-slack-chan-item\"><a href=\"#vsk-slack-ch-C_86_LIST\"><span class=\"vsk-slack-hash\">#<\/span><span class=\"vsk-slack-chan-name\">86-list<\/span><span class=\"vsk-slack-chan-count\">59<\/span><\/a><\/li><li class=\"vsk-slack-chan-item\"><a href=\"#vsk-slack-ch-C_SCHEDULE\"><span class=\"vsk-slack-hash\">#<\/span><span class=\"vsk-slack-chan-name\">schedule<\/span><span class=\"vsk-slack-chan-count\">98<\/span><\/a><\/li><\/ul><div class=\"vsk-slack-railsec\">Direct messages<\/div><ul class=\"vsk-slack-channels\"><li class=\"vsk-slack-chan-item\"><a href=\"#vsk-slack-ch-D8e0f6f55eaf5a4bbfc1a67c\"><span class=\"vsk-slack-hash\">&#128274;<\/span><span class=\"vsk-slack-chan-name\">elena.marsh-luis.ortega<\/span><span class=\"vsk-slack-chan-count\">3<\/span><\/a><\/li><\/ul><div class=\"vsk-slack-railsec\">Members<\/div><ul class=\"vsk-slack-members\"><li class=\"vsk-slack-member\" data-uid=\"U_ELENA\"><span class=\"vsk-slack-dot\" data-user-color=\"#9A3412\" style=\"background:#9A3412\"><\/span><span class=\"vsk-slack-member-name\">Elena Marsh<\/span><span class=\"vsk-slack-member-count\">63<\/span><\/li><li class=\"vsk-slack-member\" data-uid=\"U_LUIS\"><span class=\"vsk-slack-dot\" data-user-color=\"#155E75\" style=\"background:#155E75\"><\/span><span class=\"vsk-slack-member-name\">Luis Ortega<\/span><span class=\"vsk-slack-member-count\">34<\/span><\/li><li class=\"vsk-slack-member\" data-uid=\"U_JUNE\"><span class=\"vsk-slack-dot\" data-user-color=\"#831843\" style=\"background:#831843\"><\/span><span class=\"vsk-slack-member-name\">June Okafor<\/span><span class=\"vsk-slack-member-count\">20<\/span><\/li><li class=\"vsk-slack-member\" data-uid=\"U_SASHA\"><span class=\"vsk-slack-dot\" data-user-color=\"#2C5FBF\" style=\"background:#2C5FBF\"><\/span><span class=\"vsk-slack-member-name\">Sasha Kim<\/span><span class=\"vsk-slack-member-count\">19<\/span><\/li><li class=\"vsk-slack-member\" data-uid=\"U_NOOR\"><span class=\"vsk-slack-dot\" data-user-color=\"#7C3AED\" style=\"background:#7C3AED\"><\/span><span class=\"vsk-slack-member-name\">Noor Haddad<\/span><span class=\"vsk-slack-member-count\">8<\/span><\/li><li class=\"vsk-slack-member\" data-uid=\"U_MARCO\"><span class=\"vsk-slack-dot\" data-user-color=\"#0B7285\" style=\"background:#0B7285\"><\/span><span class=\"vsk-slack-member-name\">Marco Ruiz<\/span><span class=\"vsk-slack-member-count\">7<\/span><\/li><li class=\"vsk-slack-member\" data-uid=\"U_ELI\"><span class=\"vsk-slack-dot\" data-user-color=\"#A21CAF\" style=\"background:#A21CAF\"><\/span><span class=\"vsk-slack-member-name\">Eli Brandt<\/span><span class=\"vsk-slack-member-count\">5<\/span><\/li><li class=\"vsk-slack-member\" data-uid=\"U_PRIYA\"><span class=\"vsk-slack-dot\" data-user-color=\"#5B4CE0\" style=\"background:#5B4CE0\"><\/span><span class=\"vsk-slack-member-name\">Priya Raman<\/span><span class=\"vsk-slack-member-count\">4<\/span><\/li><li class=\"vsk-slack-member\" data-uid=\"U_CALEB\"><span class=\"vsk-slack-dot\" data-user-color=\"#B91C1C\" style=\"background:#B91C1C\"><\/span><span class=\"vsk-slack-member-name\">Caleb Dunn<\/span><span class=\"vsk-slack-member-count\">0<\/span><\/li><\/ul><\/div><\/nav><main class=\"vsk-slack-main\"><section class=\"vsk-slack-channel\" id=\"vsk-slack-ch-C_86_LIST\" data-channel-id=\"C_86_LIST\"><header class=\"vsk-slack-chan-head\"><div class=\"vsk-slack-chan-title\"><span class=\"vsk-slack-hash\">#<\/span>86-list<\/div><div class=\"vsk-slack-chan-meta\">9 members &#183; created Mar 04, 2026 &#183; 59 messages<\/div><div class=\"vsk-slack-topic\">Post it the minute it sells out.<\/div><div class=\"vsk-slack-purpose\">Sold-out items and low stock, caf\u00e9 and market stand.<\/div><\/header><div class=\"vsk-slack-msgs\"><div class=\"vsk-slack-msg\" data-slack-ts=\"1777736468.088179\" data-slack-user=\"U_LUIS\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#155E75\" data-uid=\"U_LUIS\" style=\"background:#155E75\" title=\"U_LUIS\">LO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Luis Ortega<\/span><span class=\"vsk-slack-ts\">May 02, 2026 11:41<\/span><\/div><div class=\"vsk-slack-text\">86 almond croissants 11:40.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":eyes:\" data-emoji=\"eyes\"><span class=\"vsk-slack-emoji\">&#x1F440;<\/span><b>2<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1777736468.088179\"><div class=\"vsk-slack-thread-head\">3 replies<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1777736531.564953\" data-slack-user=\"U_LUIS\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#155E75\" data-uid=\"U_LUIS\" style=\"background:#155E75\" title=\"U_LUIS\">LO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Luis Ortega<\/span><span class=\"vsk-slack-ts\">May 02, 2026 11:42<\/span><\/div><div class=\"vsk-slack-text\">FYI oat milk is low \ud83d\udc4d<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1777736661.783834\" data-slack-user=\"U_NOOR\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#7C3AED\" data-uid=\"U_NOOR\" style=\"background:#7C3AED\" title=\"U_NOOR\">NH<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Noor Haddad<\/span><span class=\"vsk-slack-ts\">May 02, 2026 11:44<\/span><\/div><div class=\"vsk-slack-text\">one carton left behind the bar. steering people to whole or almond til it&#x27;s gone<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1777736800.966031\" data-slack-user=\"U_LUIS\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#155E75\" data-uid=\"U_LUIS\" style=\"background:#155E75\" title=\"U_LUIS\">LO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Luis Ortega<\/span><span class=\"vsk-slack-ts\">May 02, 2026 11:46<\/span><\/div><div class=\"vsk-slack-text\">Thanks Noor. Oat milk is on Tuesday&#x27;s order list \ud83d\ude4c<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":thumbsup:\" data-emoji=\"thumbsup\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1780842048.197062\" data-slack-user=\"U_JUNE\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#831843\" data-uid=\"U_JUNE\" style=\"background:#831843\" title=\"U_JUNE\">JO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">June Okafor<\/span><span class=\"vsk-slack-ts\">Jun 07, 2026 10:20<\/span><\/div><div class=\"vsk-slack-text\">86 morning buns 10:20. last tray went in like 8 min \ud83d\udd25<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":fire:\" data-emoji=\"fire\"><span class=\"vsk-slack-emoji\">&#x1F525;<\/span><b>3<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1780842048.197062\"><div class=\"vsk-slack-thread-head\">2 replies<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1780842263.712128\" data-slack-user=\"U_MARCO\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0B7285\" data-uid=\"U_MARCO\" style=\"background:#0B7285\" title=\"U_MARCO\">MR<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Marco Ruiz<\/span><span class=\"vsk-slack-ts\">Jun 07, 2026 10:24<\/span><\/div><div class=\"vsk-slack-text\">Second batch is proofing. 12 out by 10:50.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1780842402.385148\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Jun 07, 2026 10:26<\/span><\/div><div class=\"vsk-slack-text\">Good. 18 more next Sunday. Put it on the board.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":white_check_mark:\" data-emoji=\"white_check_mark\"><span class=\"vsk-slack-emoji\">&#x2705;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1782067601.702981\" data-slack-user=\"U_JUNE\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#831843\" data-uid=\"U_JUNE\" style=\"background:#831843\" title=\"U_JUNE\">JO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">June Okafor<\/span><span class=\"vsk-slack-ts\">Jun 21, 2026 14:46<\/span><\/div><div class=\"vsk-slack-text\">86 whipped cream for the rest of today. walk-in is reading 46 and the fan is loud. moved butter and cream to the reach-ins<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":eyes:\" data-emoji=\"eyes\"><span class=\"vsk-slack-emoji\">&#x1F440;<\/span><b>2<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1782067601.702981\"><div class=\"vsk-slack-thread-head\">2 replies<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1782068307.797342\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Jun 21, 2026 14:58<\/span><\/div><div class=\"vsk-slack-text\">Good. Keep the door shut. I&#x27;ll call Smoky Mtn first thing Monday.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1782239104.711954\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Jun 23, 2026 14:25<\/span><\/div><div class=\"vsk-slack-text\">Walk-in is fixed and holding 36 again. Dairy goes back in.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":raised_hands:\" data-emoji=\"raised_hands\"><span class=\"vsk-slack-emoji\">&#x1F64C;<\/span><b>3<\/b><\/span><\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1783173953.522855\" data-slack-user=\"U_SASHA\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#2C5FBF\" data-uid=\"U_SASHA\" style=\"background:#2C5FBF\" title=\"U_SASHA\">SK<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Sasha Kim<\/span><span class=\"vsk-slack-ts\">Jul 04, 2026 10:05<\/span><\/div><div class=\"vsk-slack-text\">Market sold out of blueberry hand pies by 10!<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":fire:\" data-emoji=\"fire\"><span class=\"vsk-slack-emoji\">&#x1F525;<\/span><b>3<\/b><\/span><span class=\"vsk-slack-reaction\" title=\":blueberries:\" data-emoji=\"blueberries\"><span class=\"vsk-slack-emoji\">&#x1FAD0;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1783173953.522855\"><div class=\"vsk-slack-thread-head\">2 replies<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1783174166.869942\" data-slack-user=\"U_LUIS\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#155E75\" data-uid=\"U_LUIS\" style=\"background:#155E75\" title=\"U_LUIS\">LO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Luis Ortega<\/span><span class=\"vsk-slack-ts\">Jul 04, 2026 10:09<\/span><\/div><div class=\"vsk-slack-text\">Nice! Caf\u00e9 still has 5 on the counter. Want me to send them up with Marco? \ud83d\udc4d<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1783174646.719182\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Jul 04, 2026 10:17<\/span><\/div><div class=\"vsk-slack-text\">Keep them at the caf\u00e9. Note for next Fourth: 80 hand pies for the market, not 48.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":thumbsup:\" data-emoji=\"thumbsup\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>2<\/b><\/span><\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1783179663.828878\" data-slack-user=\"U_LUIS\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#155E75\" data-uid=\"U_LUIS\" style=\"background:#155E75\" title=\"U_LUIS\">LO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Luis Ortega<\/span><span class=\"vsk-slack-ts\">Jul 04, 2026 11:41<\/span><\/div><div class=\"vsk-slack-text\">86 blueberry hand pies at the caf\u00e9 too, the last 5 went at 11:40.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":eyes:\" data-emoji=\"eyes\"><span class=\"vsk-slack-emoji\">&#x1F440;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1783179663.828878\"><div class=\"vsk-slack-thread-head\">2 replies<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1783179666.129877\" data-slack-user=\"U_LUIS\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#155E75\" data-uid=\"U_LUIS\" style=\"background:#155E75\" title=\"U_LUIS\">LO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Luis Ortega<\/span><span class=\"vsk-slack-ts\">Jul 04, 2026 11:41<\/span><\/div><div class=\"vsk-slack-text\">FYI cold brew low too \ud83d\udc4d<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1783180094.373999\" data-slack-user=\"U_NOOR\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#7C3AED\" data-uid=\"U_NOOR\" style=\"background:#7C3AED\" title=\"U_NOOR\">NH<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Noor Haddad<\/span><span class=\"vsk-slack-ts\">Jul 04, 2026 11:48<\/span><\/div><div class=\"vsk-slack-text\">on it! last carafe is out, new batch went in this morning so it&#x27;s ready tmrw. pushing iced americanos for the rest of today \ud83d\ude4f<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":raised_hands:\" data-emoji=\"raised_hands\"><span class=\"vsk-slack-emoji\">&#x1F64C;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1783780259.307468\" data-slack-user=\"U_SASHA\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#2C5FBF\" data-uid=\"U_SASHA\" style=\"background:#2C5FBF\" title=\"U_SASHA\">SK<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Sasha Kim<\/span><span class=\"vsk-slack-ts\">Jul 11, 2026 10:30<\/span><\/div><div class=\"vsk-slack-text\">Rye gone by 10:30 at the market!<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":bread:\" data-emoji=\"bread\"><span class=\"vsk-slack-emoji\">&#x1F35E;<\/span><b>2<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1783780259.307468\"><div class=\"vsk-slack-thread-head\">3 replies<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1783780460.216627\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Jul 11, 2026 10:34<\/span><\/div><div class=\"vsk-slack-text\">Good. 6 more rye for next Saturday&#x27;s market. add them to Friday&#x27;s mix.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1783781585.970942\" data-slack-user=\"U_JUNE\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#831843\" data-uid=\"U_JUNE\" style=\"background:#831843\" title=\"U_JUNE\">JO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">June Okafor<\/span><span class=\"vsk-slack-ts\">Jul 11, 2026 10:53<\/span><\/div><div class=\"vsk-slack-text\">ok ok adding 6 rye to fri. how are the peach galettes holding up?<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1783782362.749534\" data-slack-user=\"U_SASHA\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#2C5FBF\" data-uid=\"U_SASHA\" style=\"background:#2C5FBF\" title=\"U_SASHA\">SK<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Sasha Kim<\/span><span class=\"vsk-slack-ts\">Jul 11, 2026 11:06<\/span><\/div><div class=\"vsk-slack-text\">Going fast too! Maybe 8 left, people keep asking if we&#x27;ll have them next week.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":peach:\" data-emoji=\"peach\"><span class=\"vsk-slack-emoji\">&#x1F351;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1784374568.321156\" data-slack-user=\"U_LUIS\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#155E75\" data-uid=\"U_LUIS\" style=\"background:#155E75\" title=\"U_LUIS\">LO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Luis Ortega<\/span><span class=\"vsk-slack-ts\">Jul 18, 2026 07:36<\/span><\/div><div class=\"vsk-slack-text\">86 morning buns 7:30.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":fire:\" data-emoji=\"fire\"><span class=\"vsk-slack-emoji\">&#x1F525;<\/span><b>3<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1784374568.321156\"><div class=\"vsk-slack-thread-head\">2 replies<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1784375393.301188\" data-slack-user=\"U_LUIS\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#155E75\" data-uid=\"U_LUIS\" style=\"background:#155E75\" title=\"U_LUIS\">LO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Luis Ortega<\/span><span class=\"vsk-slack-ts\">Jul 18, 2026 07:49<\/span><\/div><div class=\"vsk-slack-text\">FYI sending 10 country loaves up to the market on the 9:00 run \ud83d\ude4c<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1784381040.939109\" data-slack-user=\"U_SASHA\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#2C5FBF\" data-uid=\"U_SASHA\" style=\"background:#2C5FBF\" title=\"U_SASHA\">SK<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Sasha Kim<\/span><span class=\"vsk-slack-ts\">Jul 18, 2026 09:24<\/span><\/div><div class=\"vsk-slack-text\">Got the loaves! Line&#x27;s 20 deep, thank you!!<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1784819145.630314\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Jul 23, 2026 11:05<\/span><\/div><div class=\"vsk-slack-text\">86 country loaf and baguettes for today. Flour problem.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":eyes:\" data-emoji=\"eyes\"><span class=\"vsk-slack-emoji\">&#x1F440;<\/span><b>2<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1784819145.630314\"><div class=\"vsk-slack-thread-head\">3 replies<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1784819276.130629\" data-slack-user=\"U_JUNE\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#831843\" data-uid=\"U_JUNE\" style=\"background:#831843\" title=\"U_JUNE\">JO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">June Okafor<\/span><span class=\"vsk-slack-ts\">Jul 23, 2026 11:07<\/span><\/div><div class=\"vsk-slack-text\">ok pulling both off the case. pushing extra rye and seeded into the 12:00 bake so the shelves don&#x27;t look empty<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1784819390.949178\" data-slack-user=\"U_LUIS\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#155E75\" data-uid=\"U_LUIS\" style=\"background:#155E75\" title=\"U_LUIS\">LO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Luis Ortega<\/span><span class=\"vsk-slack-ts\">Jul 23, 2026 11:09<\/span><\/div><div class=\"vsk-slack-text\">Got it. Telling the counter now. We have 3 baguette pre-orders for today. I&#x27;ll call them and offer rye instead. \ud83d\udc4d<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1784820113.614969\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Jul 23, 2026 11:21<\/span><\/div><div class=\"vsk-slack-text\">Thanks both. Cash and carry flour run tomorrow morning. Country loaf and baguettes back Sat.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":raised_hands:\" data-emoji=\"raised_hands\"><span class=\"vsk-slack-emoji\">&#x1F64C;<\/span><b>3<\/b><\/span><\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1786539766.999434\" data-slack-user=\"U_LUIS\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#155E75\" data-uid=\"U_LUIS\" style=\"background:#155E75\" title=\"U_LUIS\">LO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Luis Ortega<\/span><span class=\"vsk-slack-ts\">Aug 12, 2026 09:02<\/span><\/div><div class=\"vsk-slack-text\">FYI almond croissants 86 at 9:00. Plain are down to the last tray in the case. \ud83d\udc4d<\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1786539766.999434\"><div class=\"vsk-slack-thread-head\">5 replies<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1786539845.718383\" data-slack-user=\"U_JUNE\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#831843\" data-uid=\"U_JUNE\" style=\"background:#831843\" title=\"U_JUNE\">JO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">June Okafor<\/span><span class=\"vsk-slack-ts\">Aug 12, 2026 09:04<\/span><\/div><div class=\"vsk-slack-text\">ok ok, one more pan of plain is proofing in the back. baking it off now, out in about 20 \ud83e\udd50 no frangipane left though so almond is done for today<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1786539964.645386\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Aug 12, 2026 09:06<\/span><\/div><div class=\"vsk-slack-text\">Good. Almond stays 86. Raising almond par by 12.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1786540313.786501\" data-slack-user=\"U_LUIS\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#155E75\" data-uid=\"U_LUIS\" style=\"background:#155E75\" title=\"U_LUIS\">LO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Luis Ortega<\/span><span class=\"vsk-slack-ts\">Aug 12, 2026 09:11<\/span><\/div><div class=\"vsk-slack-text\">Thanks June, telling the counter plain are back around 9:25. \ud83d\ude4c<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1786540565.295883\" data-slack-user=\"U_JUNE\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#831843\" data-uid=\"U_JUNE\" style=\"background:#831843\" title=\"U_JUNE\">JO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">June Okafor<\/span><span class=\"vsk-slack-ts\">Aug 12, 2026 09:16<\/span><\/div><div class=\"vsk-slack-text\">buns are going fast every morning this week \ud83d\udd25 i can roll 6 more on the next bake, lmk<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1786540639.393791\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Aug 12, 2026 09:17<\/span><\/div><div class=\"vsk-slack-text\">6 works. Luis, post the time when the rye goes.<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1787399480.095135\" data-slack-user=\"U_LUIS\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#155E75\" data-uid=\"U_LUIS\" style=\"background:#155E75\" title=\"U_LUIS\">LO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Luis Ortega<\/span><span class=\"vsk-slack-ts\">Aug 22, 2026 07:51<\/span><\/div><div class=\"vsk-slack-text\">FYI oat milk is low, maybe 4 cartons left. Grabbing a case at Ingles after close. \ud83d\udc4d<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":thumbsup:\" data-emoji=\"thumbsup\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>2<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1789221942.144486\" data-slack-user=\"U_SASHA\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#2C5FBF\" data-uid=\"U_SASHA\" style=\"background:#2C5FBF\" title=\"U_SASHA\">SK<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Sasha Kim<\/span><span class=\"vsk-slack-ts\">Sep 12, 2026 10:05<\/span><\/div><div class=\"vsk-slack-text\">86 rye at the market, 10:05. Sold out!<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":fire:\" data-emoji=\"fire\"><span class=\"vsk-slack-emoji\">&#x1F525;<\/span><b>3<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1789221942.144486\"><div class=\"vsk-slack-thread-head\">2 replies<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1789222350.194499\" data-slack-user=\"U_LUIS\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#155E75\" data-uid=\"U_LUIS\" style=\"background:#155E75\" title=\"U_LUIS\">LO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Luis Ortega<\/span><span class=\"vsk-slack-ts\">Sep 12, 2026 10:12<\/span><\/div><div class=\"vsk-slack-text\">Nice. Caf\u00e9 has 4 rye left on the shelf, holding them for walk-ins \ud83d\udc4d<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1789222744.639318\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Sep 12, 2026 10:19<\/span><\/div><div class=\"vsk-slack-text\">Good. Bake 4 extra rye for the stand next Sat.<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1789231539.869036\" data-slack-user=\"U_SASHA\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#2C5FBF\" data-uid=\"U_SASHA\" style=\"background:#2C5FBF\" title=\"U_SASHA\">SK<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Sasha Kim<\/span><span class=\"vsk-slack-ts\">Sep 12, 2026 12:45<\/span><\/div><div class=\"vsk-slack-text\">Market&#x27;s packed up. A couple of regulars asked if the rye has changed. I told them it&#x27;s the same recipe!<\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1789231539.869036\"><div class=\"vsk-slack-thread-head\">2 replies<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1789232451.422406\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Sep 12, 2026 13:00<\/span><\/div><div class=\"vsk-slack-text\">Good. We switched flour suppliers in August. Same recipe. That&#x27;s the answer.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":+1:\" data-emoji=\"+1\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1789232603.455849\" data-slack-user=\"U_SASHA\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#2C5FBF\" data-uid=\"U_SASHA\" style=\"background:#2C5FBF\" title=\"U_SASHA\">SK<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Sasha Kim<\/span><span class=\"vsk-slack-ts\">Sep 12, 2026 13:03<\/span><\/div><div class=\"vsk-slack-text\">Perfect, that&#x27;s pretty much what I said! Most of them just said they love the crust.<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1790435767.237003\" data-slack-user=\"U_JUNE\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#831843\" data-uid=\"U_JUNE\" style=\"background:#831843\" title=\"U_JUNE\">JO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">June Okafor<\/span><span class=\"vsk-slack-ts\">Sep 26, 2026 11:16<\/span><\/div><div class=\"vsk-slack-text\">86 cider donuts 11:15<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":doughnut:\" data-emoji=\"doughnut\"><span class=\"vsk-slack-emoji\">&#x1F369;<\/span><b>2<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1790435767.237003\"><div class=\"vsk-slack-thread-head\">5 replies<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1790435812.970723\" data-slack-user=\"U_LUIS\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#155E75\" data-uid=\"U_LUIS\" style=\"background:#155E75\" title=\"U_LUIS\">LO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Luis Ortega<\/span><span class=\"vsk-slack-ts\">Sep 26, 2026 11:16<\/span><\/div><div class=\"vsk-slack-text\">Copy. Taking them off the board now.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1790435853.159631\" data-slack-user=\"U_LUIS\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#155E75\" data-uid=\"U_LUIS\" style=\"background:#155E75\" title=\"U_LUIS\">LO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Luis Ortega<\/span><span class=\"vsk-slack-ts\">Sep 26, 2026 11:17<\/span><\/div><div class=\"vsk-slack-text\">FYI that&#x27;s 5 dozen gone since 7. Line was out the door at 9:30 \ud83d\ude4c<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1790436695.493372\" data-slack-user=\"U_SASHA\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#2C5FBF\" data-uid=\"U_SASHA\" style=\"background:#2C5FBF\" title=\"U_SASHA\">SK<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Sasha Kim<\/span><span class=\"vsk-slack-ts\">Sep 26, 2026 11:31<\/span><\/div><div class=\"vsk-slack-text\">Market&#x27;s out too! Three people asked if we&#x27;ll have more tomorrow<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1790436880.283017\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Sep 26, 2026 11:34<\/span><\/div><div class=\"vsk-slack-text\">Double the donut batch tomorrow and next weekend. June, add 2 gal cider to Tuesday&#x27;s count.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":+1:\" data-emoji=\"+1\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>2<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1790437053.605578\" data-slack-user=\"U_JUNE\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#831843\" data-uid=\"U_JUNE\" style=\"background:#831843\" title=\"U_JUNE\">JO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">June Okafor<\/span><span class=\"vsk-slack-ts\">Sep 26, 2026 11:37<\/span><\/div><div class=\"vsk-slack-text\">on it. i&#x27;ll mix the extra dough tonight so it&#x27;s ready at 4<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1790533111.190958\" data-slack-user=\"U_LUIS\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#155E75\" data-uid=\"U_LUIS\" style=\"background:#155E75\" title=\"U_LUIS\">LO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Luis Ortega<\/span><span class=\"vsk-slack-ts\">Sep 27, 2026 14:18<\/span><\/div><div class=\"vsk-slack-text\">Saturday recap. Caf\u00e9 86 croissants 10:30, country loaf 12:10. Rye made it to close with 6 left. \ud83d\udc4d<\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1790533111.190958\"><div class=\"vsk-slack-thread-head\">5 replies<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1790533466.084535\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Sep 27, 2026 14:24<\/span><\/div><div class=\"vsk-slack-text\">Market 86 rye 10:05. Country loaf 11:20. People were still asking for rye at close.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1790533847.698567\" data-slack-user=\"U_JUNE\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#831843\" data-uid=\"U_JUNE\" style=\"background:#831843\" title=\"U_JUNE\">JO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">June Okafor<\/span><span class=\"vsk-slack-ts\">Sep 27, 2026 14:30<\/span><\/div><div class=\"vsk-slack-text\">ok ok croissants sell out earlier every week. i can run an extra block friday for 2 more dozen on saturday. lmk \ud83e\udd50<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1790534142.334501\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Sep 27, 2026 14:35<\/span><\/div><div class=\"vsk-slack-text\">Run it. Move 6 rye from the caf\u00e9 to the market. Country loaf up 10, split 5 and 5.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1790534386.745616\" data-slack-user=\"U_JUNE\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#831843\" data-uid=\"U_JUNE\" style=\"background:#831843\" title=\"U_JUNE\">JO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">June Okafor<\/span><span class=\"vsk-slack-ts\">Sep 27, 2026 14:39<\/span><\/div><div class=\"vsk-slack-text\">adding the extra block + 10 country to friday prep. saturday oven will be packed but it fits \ud83d\udd25<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1790534493.710410\" data-slack-user=\"U_LUIS\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#155E75\" data-uid=\"U_LUIS\" style=\"background:#155E75\" title=\"U_LUIS\">LO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Luis Ortega<\/span><span class=\"vsk-slack-ts\">Sep 27, 2026 14:41<\/span><\/div><div class=\"vsk-slack-text\">Got it. If the market still sells through rye early, I&#x27;ll send Sasha a few off the caf\u00e9 rack. I&#x27;ll keep posting caf\u00e9 times as things sell out. \ud83d\ude4c<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1791039667.449938\" data-slack-user=\"U_SASHA\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#2C5FBF\" data-uid=\"U_SASHA\" style=\"background:#2C5FBF\" title=\"U_SASHA\">SK<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Sasha Kim<\/span><span class=\"vsk-slack-ts\">Oct 03, 2026 11:01<\/span><\/div><div class=\"vsk-slack-text\">Market sold out of rye by 11!<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":tada:\" data-emoji=\"tada\"><span class=\"vsk-slack-emoji\">&#x1F389;<\/span><b>2<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1791039667.449938\"><div class=\"vsk-slack-thread-head\">2 replies<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1791040038.929660\" data-slack-user=\"U_JUNE\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#831843\" data-uid=\"U_JUNE\" style=\"background:#831843\" title=\"U_JUNE\">JO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">June Okafor<\/span><span class=\"vsk-slack-ts\">Oct 03, 2026 11:07<\/span><\/div><div class=\"vsk-slack-text\">ok ok bumping rye to 14 loaves for next sat then<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1791040514.769664\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Oct 03, 2026 11:15<\/span><\/div><div class=\"vsk-slack-text\">Make it 16 for the 10th. 12 market, 4 caf\u00e9.<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1791648971.874284\" data-slack-user=\"U_ELI\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#A21CAF\" data-uid=\"U_ELI\" style=\"background:#A21CAF\" title=\"U_ELI\">EB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Eli Brandt<\/span><span class=\"vsk-slack-ts\">Oct 10, 2026 12:16<\/span><\/div><div class=\"vsk-slack-text\">86 oat milk fyi, last carton went at 12:10<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":thumbsup:\" data-emoji=\"thumbsup\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1791648971.874284\"><div class=\"vsk-slack-thread-head\">1 reply<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1791649100.221831\" data-slack-user=\"U_LUIS\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#155E75\" data-uid=\"U_LUIS\" style=\"background:#155E75\" title=\"U_LUIS\">LO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Luis Ortega<\/span><span class=\"vsk-slack-ts\">Oct 10, 2026 12:18<\/span><\/div><div class=\"vsk-slack-text\">Thanks Eli. Almond only until Tuesday&#x27;s order. Updating the board now \ud83d\udc4d<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1792246936.901627\" data-slack-user=\"U_SASHA\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#2C5FBF\" data-uid=\"U_SASHA\" style=\"background:#2C5FBF\" title=\"U_SASHA\">SK<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Sasha Kim<\/span><span class=\"vsk-slack-ts\">Oct 17, 2026 10:22<\/span><\/div><div class=\"vsk-slack-text\">Market&#x27;s slammed. Rye gone at 10:15, cider donuts going fast!<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":fire:\" data-emoji=\"fire\"><span class=\"vsk-slack-emoji\">&#x1F525;<\/span><b>3<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1792246936.901627\"><div class=\"vsk-slack-thread-head\">1 reply<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1792247516.896686\" data-slack-user=\"U_LUIS\" data-slack-channel=\"C_86_LIST\"><div class=\"vsk-slack-avatar\" data-user-color=\"#155E75\" data-uid=\"U_LUIS\" style=\"background:#155E75\" title=\"U_LUIS\">LO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Luis Ortega<\/span><span class=\"vsk-slack-ts\">Oct 17, 2026 10:31<\/span><\/div><div class=\"vsk-slack-text\">Copy. Down to 3 rye here, holding them for walk-ins. Sending a dozen donuts up with Marco at 11:00 \ud83d\ude4c<\/div><\/div><\/div><\/div><\/div><\/section><section class=\"vsk-slack-channel\" id=\"vsk-slack-ch-C_SCHEDULE\" data-channel-id=\"C_SCHEDULE\"><header class=\"vsk-slack-chan-head\"><div class=\"vsk-slack-chan-title\"><span class=\"vsk-slack-hash\">#<\/span>schedule<\/div><div class=\"vsk-slack-chan-meta\">9 members &#183; created Mar 04, 2026 &#183; 98 messages<\/div><div class=\"vsk-slack-topic\">Weekly schedule goes up Mondays. Swaps go here.<\/div><div class=\"vsk-slack-purpose\">Shift schedule, swaps and time-off requests for bake, caf\u00e9 and the market stand.<\/div><\/header><div class=\"vsk-slack-msgs\"><div class=\"vsk-slack-msg\" data-slack-ts=\"1776693686.706742\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Apr 20, 2026 10:01<\/span><\/div><div class=\"vsk-slack-text\">Schedule wk of 4/22.<br>Bake 4:00 Wed-Sun: Marco. I&#x27;m on bread.<br>Bar: Noor Wed/Thu/Sun, Eli Fri/Sat.<br>Counter: Sasha Wed/Thu, Eli Sun.<br>Sat: Luis runs the caf\u00e9 with Noor and Eli. Sasha is at market with me, load-out 6:45.<br>Caleb dish Wed-Sun 7:00-15:30.<br>Post swaps here.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":thumbsup:\" data-emoji=\"thumbsup\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>4<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1776693686.706742\"><div class=\"vsk-slack-thread-head\">4 replies<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1776694049.366619\" data-slack-user=\"U_SASHA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#2C5FBF\" data-uid=\"U_SASHA\" style=\"background:#2C5FBF\" title=\"U_SASHA\">SK<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Sasha Kim<\/span><span class=\"vsk-slack-ts\">Apr 20, 2026 10:07<\/span><\/div><div class=\"vsk-slack-text\">Got it. I&#x27;ll be at the caf\u00e9 by 6:45 Sat to help load the van!<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1776694947.290182\" data-slack-user=\"U_PRIYA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_PRIYA\" style=\"background:#5B4CE0\" title=\"U_PRIYA\">PR<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Priya Raman<\/span><span class=\"vsk-slack-ts\">Apr 20, 2026 10:22<\/span><\/div><div class=\"vsk-slack-text\">Works for me \ud83d\ude42 Can I leave at 12 on Thursday? I have a dentist appointment.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1776695119.108112\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Apr 20, 2026 10:25<\/span><\/div><div class=\"vsk-slack-text\">Yes. Marco covers the Thu 12:00 bake-off.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":pray:\" data-emoji=\"pray\"><span class=\"vsk-slack-emoji\">&#x1F64F;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1776695525.897889\" data-slack-user=\"U_MARCO\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0B7285\" data-uid=\"U_MARCO\" style=\"background:#0B7285\" title=\"U_MARCO\">MR<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Marco Ruiz<\/span><span class=\"vsk-slack-ts\">Apr 20, 2026 10:32<\/span><\/div><div class=\"vsk-slack-text\">on it. thu 12:00 bake-off is mine.<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1776964808.357046\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Apr 23, 2026 13:20<\/span><\/div><div class=\"vsk-slack-text\">Caleb, 15 minutes with me at 2:00 once the dish pit is clear. I want to go over your summer hours.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":thumbsup:\" data-emoji=\"thumbsup\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1777298523.615290\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Apr 27, 2026 10:02<\/span><\/div><div class=\"vsk-slack-text\">Schedule wk of 4/29.<br>Bake 4:00 Wed-Sun: Marco. I&#x27;m on bread.<br>Bar: Noor Wed/Thu/Sun, Eli Fri/Sat.<br>Counter: Sasha Wed/Thu, Eli Sun.<br>Sat: Luis runs the caf\u00e9 with Noor and Eli. Sasha is at market with me, load-out 6:45.<br>Marco takes the Fri 6:30 flour drop.<br>Caleb dish Wed-Sun 7:00-15:30.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":thumbsup:\" data-emoji=\"thumbsup\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>5<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1777902985.753454\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">May 04, 2026 09:56<\/span><\/div><div class=\"vsk-slack-text\">Schedule wk of 5/6.<br>Bake 4:00 Wed-Sun: Marco.<br>Bar: Noor Wed/Thu/Sun, Eli Fri/Sat.<br>Counter: Sasha Wed/Thu, Eli Sun.<br>Sat: Luis on caf\u00e9 with Noor and Eli. Sasha is at market with me, load-out 6:45.<br>Sun 5/10 is Mother&#x27;s Day. June leads strawberry shortcakes. Expect a line at 7.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":thumbsup:\" data-emoji=\"thumbsup\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>4<\/b><\/span><span class=\"vsk-slack-reaction\" title=\":strawberry:\" data-emoji=\"strawberry\"><span class=\"vsk-slack-emoji\">&#x1F353;<\/span><b>2<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1778523629.145793\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">May 11, 2026 14:20<\/span><\/div><div class=\"vsk-slack-text\">Schedule wk of 5/13.<br>Bake 4:00 Wed-Sun: Marco.<br>Bar: Noor Wed/Thu/Sun, Eli Fri/Sat.<br>Counter: Sasha Wed/Thu, Eli Sun.<br>Sat: Luis on caf\u00e9 with Noor and Eli. Sasha is at market with me, load-out 6:45.<br>Sun 5/17: I leave at 2:30 for the baking expo in Chicago. Luis has the close. I&#x27;m back for the Wed 5/20 bake.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":thumbsup:\" data-emoji=\"thumbsup\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>4<\/b><\/span><span class=\"vsk-slack-reaction\" title=\":airplane:\" data-emoji=\"airplane\"><span class=\"vsk-slack-emoji\">&#x2708;&#xFE0F;<\/span><b>2<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1778523629.145793\"><div class=\"vsk-slack-thread-head\">1 reply<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1778525041.786340\" data-slack-user=\"U_LUIS\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#155E75\" data-uid=\"U_LUIS\" style=\"background:#155E75\" title=\"U_LUIS\">LO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Luis Ortega<\/span><span class=\"vsk-slack-ts\">May 11, 2026 14:44<\/span><\/div><div class=\"vsk-slack-text\">Got it. Sunday close is covered \ud83d\udc4d<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1778612892.882428\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">May 12, 2026 15:08<\/span><\/div><div class=\"vsk-slack-text\">Schedule for the week is up. Sat market setup 07:15. Luis has the caf\u00e9. Swaps here.<\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1778612892.882428\"><div class=\"vsk-slack-thread-head\">5 replies<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1778613268.409536\" data-slack-user=\"U_LUIS\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#155E75\" data-uid=\"U_LUIS\" style=\"background:#155E75\" title=\"U_LUIS\">LO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Luis Ortega<\/span><span class=\"vsk-slack-ts\">May 12, 2026 15:14<\/span><\/div><div class=\"vsk-slack-text\">Got it. FYI Saturdays have been tight with just me and Eli on counter. Noor asked for more hours. Can we put her on bar Sat from 11:30 through close? \ud83d\udc4d<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1778613460.636226\" data-slack-user=\"U_JUNE\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#831843\" data-uid=\"U_JUNE\" style=\"background:#831843\" title=\"U_JUNE\">JO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">June Okafor<\/span><span class=\"vsk-slack-ts\">May 12, 2026 15:17<\/span><\/div><div class=\"vsk-slack-text\">i can be in at 4 sat and finish the caf\u00e9 bake after you load out. lmk<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1778613569.508674\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">May 12, 2026 15:19<\/span><\/div><div class=\"vsk-slack-text\">Yes to both. Noor on bar Sat 11:30 to close. June, 4:00 with me. Rye and country loaves come out first for the stand.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1778613665.703862\" data-slack-user=\"U_LUIS\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#155E75\" data-uid=\"U_LUIS\" style=\"background:#155E75\" title=\"U_LUIS\">LO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Luis Ortega<\/span><span class=\"vsk-slack-ts\">May 12, 2026 15:21<\/span><\/div><div class=\"vsk-slack-text\">Perfect. I&#x27;ll tell Noor and walk her through the Saturday close on her first one. \ud83d\ude4c<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1778613799.598620\" data-slack-user=\"U_JUNE\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#831843\" data-uid=\"U_JUNE\" style=\"background:#831843\" title=\"U_JUNE\">JO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">June Okafor<\/span><span class=\"vsk-slack-ts\">May 12, 2026 15:23<\/span><\/div><div class=\"vsk-slack-text\">ok ok 4 it is. rye and country first, stand crates packed before you head out \ud83e\udd50<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1779039626.182054\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">May 17, 2026 13:40<\/span><\/div><div class=\"vsk-slack-text\">Schedule wk of 5/20. Posting early, I&#x27;m at the expo Mon and Tue.<br>Tue 5/19: June takes the 10:00 flour drop.<br>Bake 4:00 Wed-Sun: Marco. I&#x27;m back on bread Wed.<br>Bar: Noor Wed/Thu/Sun, Eli Fri/Sat.<br>Counter: Sasha Wed/Thu, Eli Sun.<br>Marco takes the Fri 6:30 drop.<br>Sat 5/23: Memorial Day weekend market. Sasha with me, load-out 6:45. Luis on caf\u00e9 with Noor and Eli.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":thumbsup:\" data-emoji=\"thumbsup\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>5<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1779039626.182054\"><div class=\"vsk-slack-thread-head\">1 reply<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1779200776.235233\" data-slack-user=\"U_JUNE\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#831843\" data-uid=\"U_JUNE\" style=\"background:#831843\" title=\"U_JUNE\">JO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">June Okafor<\/span><span class=\"vsk-slack-ts\">May 19, 2026 10:26<\/span><\/div><div class=\"vsk-slack-text\">tuesday drop is in and racked in dry storage. slip is on your desk<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1779046401.588604\" data-slack-user=\"U_LUIS\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#155E75\" data-uid=\"U_LUIS\" style=\"background:#155E75\" title=\"U_LUIS\">LO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Luis Ortega<\/span><span class=\"vsk-slack-ts\">May 17, 2026 15:33<\/span><\/div><div class=\"vsk-slack-text\">Closed up. Drawer counted, walk-in temp logged, cash deposit is in the office safe. I&#x27;ll drop it at the bank tomorrow morning \ud83d\udc4d<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":raised_hands:\" data-emoji=\"raised_hands\"><span class=\"vsk-slack-emoji\">&#x1F64C;<\/span><b>3<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1779717858.144012\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">May 25, 2026 10:04<\/span><\/div><div class=\"vsk-slack-text\">Schedule wk of 5/27.<br>Bake 4:00 Wed-Sun: Marco.<br>Bar: Noor Wed/Thu/Sun, Eli Fri/Sat.<br>Counter: Sasha Wed/Thu, Eli Sun.<br>Sat: Luis on caf\u00e9 with Noor and Eli. Sasha at market with me, load-out 6:45.<br>Caleb dish Wed-Sun.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":thumbsup:\" data-emoji=\"thumbsup\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>4<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1780322281.685795\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Jun 01, 2026 09:58<\/span><\/div><div class=\"vsk-slack-text\">Schedule wk of 6/3.<br>Bake 4:00 Wed-Sun: Marco. 36 strawberry hand pies for the market Sat.<br>Bar: Noor Wed/Thu/Sun, Eli Fri/Sat.<br>Counter: Sasha Wed/Thu, Eli Sun.<br>Sat: Luis on caf\u00e9 with Noor and Eli. Sasha at market with me.<br>Marco takes the Fri 6:30 flour drop.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":thumbsup:\" data-emoji=\"thumbsup\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>5<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1780927292.698087\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Jun 08, 2026 10:01<\/span><\/div><div class=\"vsk-slack-text\">Schedule wk of 6/10.<br>Bake 4:00 Wed-Sun: Marco. Herb focaccia Wed and Sun.<br>Bar: Noor Wed/Thu/Sun, Eli Fri/Sat.<br>Counter: Sasha Wed/Thu, Eli Sun.<br>Sat: Luis on caf\u00e9 with Noor and Eli. Sasha at market with me, load-out 6:45.<br>Caleb dish Wed-Sun.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":thumbsup:\" data-emoji=\"thumbsup\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>4<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1781116557.671012\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Jun 10, 2026 14:35<\/span><\/div><div class=\"vsk-slack-text\">Sasha: market vendor parking moves to the upper lot starting Sat 6/13. Weights on all four tent legs. Afternoon storms have been gusty. July 4 market runs as usual, set up by 7:30.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":thumbsup:\" data-emoji=\"thumbsup\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>2<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1781116557.671012\"><div class=\"vsk-slack-thread-head\">1 reply<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1781117548.414551\" data-slack-user=\"U_SASHA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#2C5FBF\" data-uid=\"U_SASHA\" style=\"background:#2C5FBF\" title=\"U_SASHA\">SK<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Sasha Kim<\/span><span class=\"vsk-slack-ts\">Jun 10, 2026 14:52<\/span><\/div><div class=\"vsk-slack-text\">Got it. I&#x27;ll load the extra sandbags from the back hall Friday!<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1781351207.014724\" data-slack-user=\"U_LUIS\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#155E75\" data-uid=\"U_LUIS\" style=\"background:#155E75\" title=\"U_LUIS\">LO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Luis Ortega<\/span><span class=\"vsk-slack-ts\">Jun 13, 2026 07:46<\/span><\/div><div class=\"vsk-slack-text\">FYI Marco is out sick today. Caleb has porter until 9:00, then back on dish \ud83d\udc4d<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":thumbsup:\" data-emoji=\"thumbsup\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>2<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1781351207.014724\"><div class=\"vsk-slack-thread-head\">1 reply<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1781352744.461938\" data-slack-user=\"U_MARCO\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0B7285\" data-uid=\"U_MARCO\" style=\"background:#0B7285\" title=\"U_MARCO\">MR<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Marco Ruiz<\/span><span class=\"vsk-slack-ts\">Jun 13, 2026 08:12<\/span><\/div><div class=\"vsk-slack-text\">sorry. fever. back sunday.<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1781532373.237201\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Jun 15, 2026 10:06<\/span><\/div><div class=\"vsk-slack-text\">Schedule wk of 6/17.<br>Bake 4:00 Wed-Sun: Marco. Cherry clafoutis Thu-Sun.<br>Bar: Noor Wed/Thu/Sun, Eli Fri/Sat.<br>Counter: Sasha Wed/Thu, Eli Sun.<br>Sat: Luis on caf\u00e9 with Noor and Eli. Sasha at market with me.<br>Sun 6/21 is Father&#x27;s Day.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":thumbsup:\" data-emoji=\"thumbsup\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>5<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1782136666.725546\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Jun 22, 2026 09:57<\/span><\/div><div class=\"vsk-slack-text\">Schedule wk of 6/24.<br>Walk-in repair Tue at 10:30. Dairy stays in the reach-ins until then.<br>Bake 4:00 Wed-Sun: Marco.<br>Bar: Noor Wed/Thu/Sun, Eli Fri/Sat.<br>Counter: Sasha Wed/Thu, Eli Sun.<br>Sat 6/27: peach galettes at the stand again. Sasha with me, load-out 6:45. Luis on caf\u00e9 with Noor and Eli.<br>Marco takes the Fri 6:30 flour drop.<br>Check-in: Priya today at 12:00.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":thumbsup:\" data-emoji=\"thumbsup\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>4<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1782136666.725546\"><div class=\"vsk-slack-thread-head\">1 reply<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1782138677.805017\" data-slack-user=\"U_PRIYA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_PRIYA\" style=\"background:#5B4CE0\" title=\"U_PRIYA\">PR<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Priya Raman<\/span><span class=\"vsk-slack-ts\">Jun 22, 2026 10:31<\/span><\/div><div class=\"vsk-slack-text\">Sounds good, talk at 12 \ud83d\ude42<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1782587544.183226\" data-slack-user=\"U_LUIS\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#155E75\" data-uid=\"U_LUIS\" style=\"background:#155E75\" title=\"U_LUIS\">LO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Luis Ortega<\/span><span class=\"vsk-slack-ts\">Jun 27, 2026 15:12<\/span><\/div><div class=\"vsk-slack-text\">June asked me Monday about a swap. Marco&#x27;s good to take her Sunday bake and she picks up his Thursday. OK to lock it in? \ud83d\udc4d<\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1782587544.183226\"><div class=\"vsk-slack-thread-head\">5 replies<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1782587916.937427\" data-slack-user=\"U_JUNE\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#831843\" data-uid=\"U_JUNE\" style=\"background:#831843\" title=\"U_JUNE\">JO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">June Okafor<\/span><span class=\"vsk-slack-ts\">Jun 27, 2026 15:18<\/span><\/div><div class=\"vsk-slack-text\">yep, that&#x27;s the plan. i&#x27;ll leave marco notes on the levain feed so sunday isn&#x27;t a scramble \ud83e\udd50<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1782588187.698246\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Jun 27, 2026 15:23<\/span><\/div><div class=\"vsk-slack-text\">Approved. June bakes Thursday, Marco bakes Sunday.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1782588269.276039\" data-slack-user=\"U_LUIS\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#155E75\" data-uid=\"U_LUIS\" style=\"background:#155E75\" title=\"U_LUIS\">LO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Luis Ortega<\/span><span class=\"vsk-slack-ts\">Jun 27, 2026 15:24<\/span><\/div><div class=\"vsk-slack-text\">Locked in on the sheet. FYI Eli asked off Saturday, so I&#x27;m thin on counter. Any chance Sasha stays at the caf\u00e9 instead of the stand? \ud83d\udc4d<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1782588570.925417\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Jun 27, 2026 15:29<\/span><\/div><div class=\"vsk-slack-text\">Sasha stays at the stand. We set up at 07:15. Put Caleb on counter once dishes are caught up.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1782588786.117364\" data-slack-user=\"U_LUIS\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#155E75\" data-uid=\"U_LUIS\" style=\"background:#155E75\" title=\"U_LUIS\">LO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Luis Ortega<\/span><span class=\"vsk-slack-ts\">Jun 27, 2026 15:33<\/span><\/div><div class=\"vsk-slack-text\">Got it. I&#x27;ll walk Caleb through the register Friday so he&#x27;s not learning it mid-rush. Noor stays on bar. \ud83d\ude4c<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1782741827.907242\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Jun 29, 2026 10:03<\/span><\/div><div class=\"vsk-slack-text\">Schedule wk of 7/1.<br>Bake 4:00 Wed-Sun: Marco. 48 blueberry hand pies for the market Sat.<br>Bar: Noor Wed/Thu/Sat/Sun, Eli Fri.<br>Counter: Sasha Wed/Thu, Eli Sun.<br>Sat 7/4: market runs 8 to 12. Set up by 7:30, so load-out is 6:15. Sasha with me. Luis on caf\u00e9 with Noor, Caleb on counter once dishes are caught up.<br>Caleb dish Wed-Sun.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":thumbsup:\" data-emoji=\"thumbsup\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>5<\/b><\/span><span class=\"vsk-slack-reaction\" title=\":blueberries:\" data-emoji=\"blueberries\"><span class=\"vsk-slack-emoji\">&#x1FAD0;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1782741827.907242\"><div class=\"vsk-slack-thread-head\">1 reply<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1782744057.338187\" data-slack-user=\"U_SASHA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#2C5FBF\" data-uid=\"U_SASHA\" style=\"background:#2C5FBF\" title=\"U_SASHA\">SK<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Sasha Kim<\/span><span class=\"vsk-slack-ts\">Jun 29, 2026 10:40<\/span><\/div><div class=\"vsk-slack-text\">I&#x27;ll be at the caf\u00e9 by 6:00 Saturday to load!<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1783346365.731595\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Jul 06, 2026 09:59<\/span><\/div><div class=\"vsk-slack-text\">Schedule wk of 7/8.<br>Bake 4:00 Wed-Sun: Marco. Tomato pie Wednesdays start this week, June leads.<br>Bar: Noor Wed/Thu/Sun, Eli Fri/Sat.<br>Counter: Sasha Wed/Thu, Eli Sun.<br>Sat: Luis on caf\u00e9 with Noor and Eli. Sasha at market with me, load-out 6:45. Peach galettes for the stand.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":thumbsup:\" data-emoji=\"thumbsup\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>4<\/b><\/span><span class=\"vsk-slack-reaction\" title=\":peach:\" data-emoji=\"peach\"><span class=\"vsk-slack-emoji\">&#x1F351;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1783951547.613586\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Jul 13, 2026 10:05<\/span><\/div><div class=\"vsk-slack-text\">Schedule wk of 7/15.<br>Bake 4:00 Wed-Sun: Marco. 6 extra rye for the Sat market.<br>Bar: Noor Wed/Thu/Sun, Eli Fri/Sat.<br>Counter: Sasha Wed/Thu, Eli Sun.<br>Sat: Luis on caf\u00e9 with Noor and Eli. Sasha at market with me.<br>Marco takes the Fri 6:30 flour drop.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":thumbsup:\" data-emoji=\"thumbsup\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>5<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1784556131.006693\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Jul 20, 2026 10:02<\/span><\/div><div class=\"vsk-slack-text\">Schedule wk of 7/22.<br>Bake 4:00 Wed-Sun: Marco.<br>Bar: Noor Wed/Thu/Sun, Eli Fri/Sat.<br>Counter: Sasha Wed/Thu, Eli Sun.<br>Sat: Luis on caf\u00e9 with Noor and Eli. Sasha at market with me, load-out 6:45.<br>Check-ins: Eli today 4:00 by phone. Noor Tue 2:00, coffee after at 4:00. Luis Wed 10:00 in the office.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":thumbsup:\" data-emoji=\"thumbsup\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>5<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1785160820.333239\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Jul 27, 2026 10:00<\/span><\/div><div class=\"vsk-slack-text\">Schedule wk of 7/29.<br>Flour comes from cash and carry for now. I do the runs Tue and Fri. Flag anything low by close the day before.<br>Bake 4:00 Wed-Sun: Marco.<br>Bar: Noor Wed/Thu/Sun, Eli Fri/Sat.<br>Counter: Sasha Wed/Thu, Eli Sun.<br>Sat: Luis on caf\u00e9 with Noor and Eli. Sasha at market with me.<br>Caleb dish Wed-Sun.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":thumbsup:\" data-emoji=\"thumbsup\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>4<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1785160820.333239\"><div class=\"vsk-slack-thread-head\">1 reply<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1785163311.795855\" data-slack-user=\"U_MARCO\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0B7285\" data-uid=\"U_MARCO\" style=\"background:#0B7285\" title=\"U_MARCO\">MR<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Marco Ruiz<\/span><span class=\"vsk-slack-ts\">Jul 27, 2026 10:41<\/span><\/div><div class=\"vsk-slack-text\">Fri run, I&#x27;ll unload.<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1785765345.965686\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Aug 03, 2026 09:55<\/span><\/div><div class=\"vsk-slack-text\">Schedule wk of 8/5.<br>Bake 4:00 Wed-Sun: Marco.<br>Bar: Noor Wed/Thu/Sun, Eli Fri/Sat.<br>Counter: Sasha Wed/Thu, Eli Sun.<br>Sat: Luis on caf\u00e9 with Noor and Eli. Sasha at market with me, load-out 6:45.<br>Tue is the last cash and carry flour run. New supplier starts Fri 6:30. Details Wed.<br>Check-ins: Sasha Tue 2:00, Noor Fri 10:00, Priya Sun 4:00 after close.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":thumbsup:\" data-emoji=\"thumbsup\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>5<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1785954769.174306\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Aug 05, 2026 14:32<\/span><\/div><div class=\"vsk-slack-text\">We switched flour suppliers. Piedmont Grain Co. starts Fri 8/7. Drops are Tue around 10:00 and Fri at 6:30 at the back door. The truck pulls into the side lot. Marco has Fridays. Recipes stay the same.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":thumbsup:\" data-emoji=\"thumbsup\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>6<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1785954769.174306\"><div class=\"vsk-slack-thread-head\">2 replies<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1785955825.219593\" data-slack-user=\"U_MARCO\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0B7285\" data-uid=\"U_MARCO\" style=\"background:#0B7285\" title=\"U_MARCO\">MR<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Marco Ruiz<\/span><span class=\"vsk-slack-ts\">Aug 05, 2026 14:50<\/span><\/div><div class=\"vsk-slack-text\">on it. fri 6:30.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1786100312.143359\" data-slack-user=\"U_MARCO\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0B7285\" data-uid=\"U_MARCO\" style=\"background:#0B7285\" title=\"U_MARCO\">MR<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Marco Ruiz<\/span><span class=\"vsk-slack-ts\">Aug 07, 2026 06:58<\/span><\/div><div class=\"vsk-slack-text\">piedmont drop is in. racked in dry storage, slip&#x27;s on your desk.<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1786370668.516216\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Aug 10, 2026 10:04<\/span><\/div><div class=\"vsk-slack-text\">Schedule wk of 8/12.<br>Bake 4:00 Wed-Sun: Marco. Country loaf stays at the new hydration.<br>Bar: Noor Wed/Thu/Sun, Eli Fri/Sat.<br>Counter: Sasha Wed/Thu, Eli Sun.<br>Sat: Luis on caf\u00e9 with Noor and Eli. Sasha at market with me.<br>Piedmont drops Tue 10:00 and Fri 6:30. Marco has Fri.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":thumbsup:\" data-emoji=\"thumbsup\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>4<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1786976675.989958\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Aug 17, 2026 10:24<\/span><\/div><div class=\"vsk-slack-text\">Schedule wk of 8/19.<br>Espresso machine service Tue 9:00. dial in the grinder Wed at 6:30 before open.<br>Bake 4:00 Wed-Sun: Marco.<br>Bar: Noor Wed/Thu/Sun, Eli Fri/Sat.<br>Counter: Sasha Wed/Thu, Eli Sun.<br>Sat: Luis on caf\u00e9 with Noor and Eli. Sasha at market with me, load-out 6:45.<br>Check-ins: Caleb today 12:00, Sasha Tue 12:00, Priya Sat 12:30 by phone after market.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":thumbsup:\" data-emoji=\"thumbsup\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>5<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1786976675.989958\"><div class=\"vsk-slack-thread-head\">1 reply<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1786979156.124325\" data-slack-user=\"U_NOOR\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#7C3AED\" data-uid=\"U_NOOR\" style=\"background:#7C3AED\" title=\"U_NOOR\">NH<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Noor Haddad<\/span><span class=\"vsk-slack-ts\">Aug 17, 2026 11:05<\/span><\/div><div class=\"vsk-slack-text\">on it, 6:30 wed \ud83d\ude4f<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1787067352.184451\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Aug 18, 2026 11:35<\/span><\/div><div class=\"vsk-slack-text\">Espresso machine is done. Descaled, new gaskets and screens on both groups, pressure set at 9 bar. Shots pull even again.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":coffee:\" data-emoji=\"coffee\"><span class=\"vsk-slack-emoji\">&#x2615;<\/span><b>3<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1787067352.184451\"><div class=\"vsk-slack-thread-head\">1 reply<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1787069428.700962\" data-slack-user=\"U_LUIS\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#155E75\" data-uid=\"U_LUIS\" style=\"background:#155E75\" title=\"U_LUIS\">LO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Luis Ortega<\/span><span class=\"vsk-slack-ts\">Aug 18, 2026 12:10<\/span><\/div><div class=\"vsk-slack-text\">Great. Cappuccinos should taste right again tomorrow. \ud83d\udc4d<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1787579898.462557\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Aug 24, 2026 09:58<\/span><\/div><div class=\"vsk-slack-text\">Schedule wk of 8/26.<br>Bake 4:00 Wed-Sun: Marco. First apple galettes Thu.<br>Bar: Noor Wed/Thu/Sun, Eli Fri/Sat.<br>Counter: Sasha Wed/Thu, Eli Sun.<br>Sat: Luis runs the caf\u00e9 with Noor and Eli. Sasha at the market with me. We leave the caf\u00e9 at 6:45.<br>Marco takes the Fri 6:30 Piedmont drop.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":thumbsup:\" data-emoji=\"thumbsup\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>4<\/b><\/span><span class=\"vsk-slack-reaction\" title=\":apple:\" data-emoji=\"apple\"><span class=\"vsk-slack-emoji\">&#x1F34E;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1787769864.193713\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Aug 26, 2026 14:44<\/span><\/div><div class=\"vsk-slack-text\">Sasha: per the market board, the last market is Sat 11/21. Load-out has to be finished by 12:45 so they can reopen the lot. Sat 10/31 is Halloween and costumes are welcome.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":jack_o_lantern:\" data-emoji=\"jack_o_lantern\"><span class=\"vsk-slack-emoji\">&#x1F383;<\/span><b>2<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1787769864.193713\"><div class=\"vsk-slack-thread-head\">1 reply<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1787770969.154251\" data-slack-user=\"U_SASHA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#2C5FBF\" data-uid=\"U_SASHA\" style=\"background:#2C5FBF\" title=\"U_SASHA\">SK<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Sasha Kim<\/span><span class=\"vsk-slack-ts\">Aug 26, 2026 15:02<\/span><\/div><div class=\"vsk-slack-text\">Costumes, I&#x27;m in! We&#x27;re usually packed by 12:30 anyway, so 12:45 is fine.<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1788184844.953932\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Aug 31, 2026 10:00<\/span><\/div><div class=\"vsk-slack-text\">Schedule wk of 9/2.<br>Bake 4:00 Wed-Sun: Marco.<br>Bar: Noor Wed-Fri, Eli Sat/Sun.<br>Counter: Sasha Wed/Thu/Sun, Eli Fri.<br>Sat: Luis runs the caf\u00e9 with Noor and Eli. Sasha at the market with me.<br>Caleb on dish Wed-Sun.<br>Marco takes the Fri 6:30 Piedmont delivery and puts it in dry storage.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":thumbsup:\" data-emoji=\"thumbsup\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>5<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1788184844.953932\"><div class=\"vsk-slack-thread-head\">3 replies<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1788185707.490632\" data-slack-user=\"U_NOOR\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#7C3AED\" data-uid=\"U_NOOR\" style=\"background:#7C3AED\" title=\"U_NOOR\">NH<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Noor Haddad<\/span><span class=\"vsk-slack-ts\">Aug 31, 2026 10:15<\/span><\/div><div class=\"vsk-slack-text\">hey! could i come in at 7:15 thurs instead of 7? my bus schedule changed \ud83d\ude4f<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1788186043.059030\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Aug 31, 2026 10:20<\/span><\/div><div class=\"vsk-slack-text\">Fine. Sasha opens the bar at 7:00 Thu.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1788186882.168625\" data-slack-user=\"U_SASHA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#2C5FBF\" data-uid=\"U_SASHA\" style=\"background:#2C5FBF\" title=\"U_SASHA\">SK<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Sasha Kim<\/span><span class=\"vsk-slack-ts\">Aug 31, 2026 10:34<\/span><\/div><div class=\"vsk-slack-text\">On it. I&#x27;ll have the grinder dialed in before Noor gets there.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":heart:\" data-emoji=\"heart\"><span class=\"vsk-slack-emoji\">&#x2764;&#xFE0F;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1788356479.564747\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Sep 02, 2026 09:41<\/span><\/div><div class=\"vsk-slack-text\">Eli, I&#x27;ll call you at 10:00 about your Fri counter and weekend bar hours.<\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1788356479.564747\"><div class=\"vsk-slack-thread-head\">1 reply<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1788356674.412767\" data-slack-user=\"U_ELI\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#A21CAF\" data-uid=\"U_ELI\" style=\"background:#A21CAF\" title=\"U_ELI\">EB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Eli Brandt<\/span><span class=\"vsk-slack-ts\">Sep 02, 2026 09:44<\/span><\/div><div class=\"vsk-slack-text\">sounds good, phone&#x27;s on<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1788789836.678813\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Sep 07, 2026 10:03<\/span><\/div><div class=\"vsk-slack-text\">Schedule wk of 9/9.<br>Bake 4:00 Wed-Sun: Marco.<br>Bar: Noor Wed-Fri, Eli Sat/Sun.<br>Counter: Sasha Wed/Thu/Sun, Eli Fri.<br>Sat: Luis on caf\u00e9 with Noor and Eli. Sasha at market with me.<br>Marco takes the Fri 6:30 Piedmont drop.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":thumbsup:\" data-emoji=\"thumbsup\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>5<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1789394221.600204\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Sep 14, 2026 09:57<\/span><\/div><div class=\"vsk-slack-text\">Schedule for the week of 9/16.<br>Bake 4:00 Wed-Sun: Marco. Fall menu tests: pumpkin loaf Thu, cider donut test batch at the caf\u00e9 Sat.<br>Bar: Noor Wed-Fri, Eli Sat/Sun.<br>Counter: Sasha Wed/Thu/Sun, Eli Fri.<br>Sat: Luis runs the caf\u00e9 with Noor and Eli. Sasha at the market with me, load-out 6:45.<br>Marco takes the Fri 6:30 Piedmont drop.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":thumbsup:\" data-emoji=\"thumbsup\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>4<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1789394221.600204\"><div class=\"vsk-slack-thread-head\">1 reply<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1789396253.752726\" data-slack-user=\"U_JUNE\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#831843\" data-uid=\"U_JUNE\" style=\"background:#831843\" title=\"U_JUNE\">JO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">June Okafor<\/span><span class=\"vsk-slack-ts\">Sep 14, 2026 10:30<\/span><\/div><div class=\"vsk-slack-text\">ok ok. pumpkin loaf thurs after bake-off, donut dough sat at 4<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1789991065.342716\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Sep 21, 2026 07:44<\/span><\/div><div class=\"vsk-slack-text\">Schedule for the week of 9/23.<br>Bake 4:00 Wed-Sun: Marco.<br>Bar: Noor Wed-Fri, Eli Sat/Sun.<br>Counter: Sasha Wed/Thu/Sun, Eli Fri.<br>Sat: Luis runs the caf\u00e9 with Noor and Eli. Sasha at the market with me, load-out 6:45.<br>Custom cakes: Pryor, 8 inch chocolate stout, pickup Fri 2:00 at the caf\u00e9. Feldman, chocolate with the green dinosaur, goes to the market Sat.<br>Check-ins: Caleb today 1:00, Priya Tue 2:00.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":thumbsup:\" data-emoji=\"thumbsup\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>4<\/b><\/span><span class=\"vsk-slack-reaction\" title=\":t-rex:\" data-emoji=\"t-rex\"><span class=\"vsk-slack-emoji\">&#x1F996;<\/span><b>2<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1789991065.342716\"><div class=\"vsk-slack-thread-head\">1 reply<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1789993220.057024\" data-slack-user=\"U_SASHA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#2C5FBF\" data-uid=\"U_SASHA\" style=\"background:#2C5FBF\" title=\"U_SASHA\">SK<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Sasha Kim<\/span><span class=\"vsk-slack-ts\">Sep 21, 2026 08:20<\/span><\/div><div class=\"vsk-slack-text\">I&#x27;ll keep the dinosaur cake in the shade under the table on Saturday!<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1789999252.510949\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Sep 21, 2026 10:00<\/span><\/div><div class=\"vsk-slack-text\">Fall menu starts Wed 9/23. Cider donuts Sat/Sun only. June leads pastry.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":apple:\" data-emoji=\"apple\"><span class=\"vsk-slack-emoji\">&#x1F34E;<\/span><b>3<\/b><\/span><span class=\"vsk-slack-reaction\" title=\":fire:\" data-emoji=\"fire\"><span class=\"vsk-slack-emoji\">&#x1F525;<\/span><b>2<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1789999252.510949\"><div class=\"vsk-slack-thread-head\">4 replies<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1789999434.573245\" data-slack-user=\"U_JUNE\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#831843\" data-uid=\"U_JUNE\" style=\"background:#831843\" title=\"U_JUNE\">JO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">June Okafor<\/span><span class=\"vsk-slack-ts\">Sep 21, 2026 10:03<\/span><\/div><div class=\"vsk-slack-text\">ok ok finally. pumpkin loaf goes in the case wed, i&#x27;ll do one more test tmrw after the stock count<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1789999582.704121\" data-slack-user=\"U_LUIS\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#155E75\" data-uid=\"U_LUIS\" style=\"background:#155E75\" title=\"U_LUIS\">LO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Luis Ortega<\/span><span class=\"vsk-slack-ts\">Sep 21, 2026 10:06<\/span><\/div><div class=\"vsk-slack-text\">Got it. I&#x27;ll swap the menu board Tuesday afternoon and brief counter at 6:45 Wednesday \ud83d\udc4d<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":+1:\" data-emoji=\"+1\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1790000613.396961\" data-slack-user=\"U_NOOR\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#7C3AED\" data-uid=\"U_NOOR\" style=\"background:#7C3AED\" title=\"U_NOOR\">NH<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Noor Haddad<\/span><span class=\"vsk-slack-ts\">Sep 21, 2026 10:23<\/span><\/div><div class=\"vsk-slack-text\">hey! are we doing a cider drink at the bar too or just the donuts?? \ud83d\ude4f<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1790000706.381970\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Sep 21, 2026 10:25<\/span><\/div><div class=\"vsk-slack-text\">Just donuts for now. Hot cider by the cup if June has some left after the batter.<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1790604172.799535\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Sep 28, 2026 10:02<\/span><\/div><div class=\"vsk-slack-text\">Schedule wk of 9/30.<br>Bake 4:00 Wed-Sun: Marco. Cider donuts stay doubled Sat/Sun. Adding 2 gal cider to Tuesday&#x27;s order.<br>Bar: Noor Wed-Fri, Eli Sat/Sun.<br>Counter: Sasha Wed/Thu/Sun, Eli Fri.<br>Sat: Luis on caf\u00e9 with Noor and Eli. Sasha at market with me, load-out 6:45.<br>Marco takes the Fri 6:30 Piedmont drop.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":thumbsup:\" data-emoji=\"thumbsup\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>5<\/b><\/span><span class=\"vsk-slack-reaction\" title=\":doughnut:\" data-emoji=\"doughnut\"><span class=\"vsk-slack-emoji\">&#x1F369;<\/span><b>2<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1790604172.799535\"><div class=\"vsk-slack-thread-head\">1 reply<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1790606147.189330\" data-slack-user=\"U_JUNE\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#831843\" data-uid=\"U_JUNE\" style=\"background:#831843\" title=\"U_JUNE\">JO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">June Okafor<\/span><span class=\"vsk-slack-ts\">Sep 28, 2026 10:35<\/span><\/div><div class=\"vsk-slack-text\">got it. doubling donut dough sat and sun \ud83c\udf69<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1791208794.145319\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Oct 05, 2026 09:59<\/span><\/div><div class=\"vsk-slack-text\">Schedule wk of 10/7.<br>Bake 4:00 Wed-Sun: Marco. Apple butter morning buns start Wed.<br>Bar: Noor Wed-Fri, Eli Sat/Sun.<br>Counter: Sasha Wed/Thu/Sun, Eli Fri.<br>Sat 10/10: 16 rye, 12 market and 4 caf\u00e9. Sasha with me, load-out 6:45. Luis on caf\u00e9 with Noor and Eli.<br>Marco takes the Fri 6:30 Piedmont drop.<br>Hearth: check your mailing address and W-2 delivery choice in the employee portal by 12/4.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":thumbsup:\" data-emoji=\"thumbsup\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>5<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1791208794.145319\"><div class=\"vsk-slack-thread-head\">1 reply<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1791213155.157315\" data-slack-user=\"U_ELI\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#A21CAF\" data-uid=\"U_ELI\" style=\"background:#A21CAF\" title=\"U_ELI\">EB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Eli Brandt<\/span><span class=\"vsk-slack-ts\">Oct 05, 2026 11:12<\/span><\/div><div class=\"vsk-slack-text\">done, my address is updated in hearth<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1791484841.632777\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Oct 08, 2026 14:40<\/span><\/div><div class=\"vsk-slack-text\">Staff dinner Mon 11/9, 6pm, Sorrel &amp; Pine. On me. Partners welcome.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":tada:\" data-emoji=\"tada\"><span class=\"vsk-slack-emoji\">&#x1F389;<\/span><b>6<\/b><\/span><span class=\"vsk-slack-reaction\" title=\":heart:\" data-emoji=\"heart\"><span class=\"vsk-slack-emoji\">&#x2764;&#xFE0F;<\/span><b>3<\/b><\/span><span class=\"vsk-slack-reaction\" title=\":thumbsup:\" data-emoji=\"thumbsup\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>2<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1791484841.632777\"><div class=\"vsk-slack-thread-head\">7 replies<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1791485131.387684\" data-slack-user=\"U_SASHA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#2C5FBF\" data-uid=\"U_SASHA\" style=\"background:#2C5FBF\" title=\"U_SASHA\">SK<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Sasha Kim<\/span><span class=\"vsk-slack-ts\">Oct 08, 2026 14:45<\/span><\/div><div class=\"vsk-slack-text\">So in! Thank you Elena!!<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1791485245.623801\" data-slack-user=\"U_JUNE\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#831843\" data-uid=\"U_JUNE\" style=\"background:#831843\" title=\"U_JUNE\">JO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">June Okafor<\/span><span class=\"vsk-slack-ts\">Oct 08, 2026 14:47<\/span><\/div><div class=\"vsk-slack-text\">so in, thanks elena. bringing my partner<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1791485577.901538\" data-slack-user=\"U_PRIYA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_PRIYA\" style=\"background:#5B4CE0\" title=\"U_PRIYA\">PR<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Priya Raman<\/span><span class=\"vsk-slack-ts\">Oct 08, 2026 14:52<\/span><\/div><div class=\"vsk-slack-text\">Thank you Elena! Me plus one \ud83d\ude0a<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1791486449.868307\" data-slack-user=\"U_NOOR\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#7C3AED\" data-uid=\"U_NOOR\" style=\"background:#7C3AED\" title=\"U_NOOR\">NH<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Noor Haddad<\/span><span class=\"vsk-slack-ts\">Oct 08, 2026 15:07<\/span><\/div><div class=\"vsk-slack-text\">yay!! my partner&#x27;s coming too, thank u \ud83d\ude4f<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1791487178.410786\" data-slack-user=\"U_ELI\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#A21CAF\" data-uid=\"U_ELI\" style=\"background:#A21CAF\" title=\"U_ELI\">EB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Eli Brandt<\/span><span class=\"vsk-slack-ts\">Oct 08, 2026 15:19<\/span><\/div><div class=\"vsk-slack-text\">ill be there, just me<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1791487920.064806\" data-slack-user=\"U_MARCO\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#0B7285\" data-uid=\"U_MARCO\" style=\"background:#0B7285\" title=\"U_MARCO\">MR<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Marco Ruiz<\/span><span class=\"vsk-slack-ts\">Oct 08, 2026 15:32<\/span><\/div><div class=\"vsk-slack-text\">count me in. plus one.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1791488920.988038\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Oct 08, 2026 15:48<\/span><\/div><div class=\"vsk-slack-text\">Booked for 12 for now. Send me plus-ones by Fri 10/30 and I&#x27;ll update the count.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":thumbsup:\" data-emoji=\"thumbsup\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>4<\/b><\/span><\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1791813708.533672\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Oct 12, 2026 10:01<\/span><\/div><div class=\"vsk-slack-text\">Schedule wk of 10/14.<br>Bake 4:00 Wed-Sun: Marco. Chocolate rye cookies go on the menu Thu.<br>Bar: Noor Wed-Fri, Eli Sat/Sun.<br>Counter: Sasha Wed/Thu/Sun, Eli Fri.<br>Sat 10/17: big market bake. Rye, seeded, country, sandwich and cider donuts. Sasha with me, load-out 6:45. Luis on caf\u00e9 with Noor and Eli.<br>Six market Saturdays left. Last one is 11/21.<br>Marco takes the Fri 6:30 Piedmont drop.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":thumbsup:\" data-emoji=\"thumbsup\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>4<\/b><\/span><span class=\"vsk-slack-reaction\" title=\":cookie:\" data-emoji=\"cookie\"><span class=\"vsk-slack-emoji\">&#x1F36A;<\/span><b>2<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1791813708.533672\"><div class=\"vsk-slack-thread-head\">1 reply<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1791815860.018300\" data-slack-user=\"U_SASHA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#2C5FBF\" data-uid=\"U_SASHA\" style=\"background:#2C5FBF\" title=\"U_SASHA\">SK<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Sasha Kim<\/span><span class=\"vsk-slack-ts\">Oct 12, 2026 10:37<\/span><\/div><div class=\"vsk-slack-text\">Six more! Let&#x27;s make them count!<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1792001895.065353\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Oct 14, 2026 14:18<\/span><\/div><div class=\"vsk-slack-text\">Thanksgiving pie preorders open today. Orders come in through the Facebook page and I log them. Pickup Wed 11/25 at the caf\u00e9, 7:00-15:00. Pies bake that morning, so plan on a full oven.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":pie:\" data-emoji=\"pie\"><span class=\"vsk-slack-emoji\">&#x1F967;<\/span><b>3<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1792001895.065353\"><div class=\"vsk-slack-thread-head\">1 reply<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1792002711.894912\" data-slack-user=\"U_LUIS\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#155E75\" data-uid=\"U_LUIS\" style=\"background:#155E75\" title=\"U_LUIS\">LO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Luis Ortega<\/span><span class=\"vsk-slack-ts\">Oct 14, 2026 14:31<\/span><\/div><div class=\"vsk-slack-text\">Got it. I&#x27;ll clear a pickup shelf behind the counter that week \ud83d\udc4d<\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1792006268.657661\" data-slack-user=\"U_NOOR\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#7C3AED\" data-uid=\"U_NOOR\" style=\"background:#7C3AED\" title=\"U_NOOR\">NH<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Noor Haddad<\/span><span class=\"vsk-slack-ts\">Oct 14, 2026 15:31<\/span><\/div><div class=\"vsk-slack-text\">hey! can anyone swap sun 11/1? \ud83d\ude4f<\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1792006268.657661\"><div class=\"vsk-slack-thread-head\">3 replies<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1792006591.889127\" data-slack-user=\"U_ELI\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#A21CAF\" data-uid=\"U_ELI\" style=\"background:#A21CAF\" title=\"U_ELI\">EB<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Eli Brandt<\/span><span class=\"vsk-slack-ts\">Oct 14, 2026 15:36<\/span><\/div><div class=\"vsk-slack-text\">i can take it noor, free that sunday. put me on bar for your hours<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":raised_hands:\" data-emoji=\"raised_hands\"><span class=\"vsk-slack-emoji\">&#x1F64C;<\/span><b>2<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1792006705.080930\" data-slack-user=\"U_NOOR\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#7C3AED\" data-uid=\"U_NOOR\" style=\"background:#7C3AED\" title=\"U_NOOR\">NH<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Noor Haddad<\/span><span class=\"vsk-slack-ts\">Oct 14, 2026 15:38<\/span><\/div><div class=\"vsk-slack-text\">thank you eli!! i owe you one \ud83d\ude4f<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1792007877.102705\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Oct 14, 2026 15:57<\/span><\/div><div class=\"vsk-slack-text\">Approved. Eli on bar Sun 11/1, Noor off.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":white_check_mark:\" data-emoji=\"white_check_mark\"><span class=\"vsk-slack-emoji\">&#x2705;<\/span><b>2<\/b><\/span><\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1792080681.596051\" data-slack-user=\"U_LUIS\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#155E75\" data-uid=\"U_LUIS\" style=\"background:#155E75\" title=\"U_LUIS\">LO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Luis Ortega<\/span><span class=\"vsk-slack-ts\">Oct 15, 2026 12:11<\/span><\/div><div class=\"vsk-slack-text\">Saw the invite for Mon 11/9 at Sorrel &amp; Pine. Partners welcome too? Need me to do anything?<\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1792080681.596051\"><div class=\"vsk-slack-thread-head\">1 reply<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1792080992.216088\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Oct 15, 2026 12:16<\/span><\/div><div class=\"vsk-slack-text\">Yes, partners welcome. Tell me by Fri 10/30 so I can update the count. Otherwise nothing. Just show up.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":raised_hands:\" data-emoji=\"raised_hands\"><span class=\"vsk-slack-emoji\">&#x1F64C;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1792418473.494545\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Oct 19, 2026 10:01<\/span><\/div><div class=\"vsk-slack-text\">Schedule wk of 10/21.<br>Bake 4:00 Wed-Sun: Marco.<br>Bar: Noor Wed/Thu/Sat, Eli Fri/Sun.<br>Counter: Sasha Wed/Thu, Eli Sat.<br>Sat 10/24: Luis on caf\u00e9 with Noor and Eli. Sasha at market with me, load-out 6:45.<br>Bennett order (2-tier hummingbird) rides to market in the cooler Sat.<br>Caleb dish Wed-Sun.<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":thumbsup:\" data-emoji=\"thumbsup\"><span class=\"vsk-slack-emoji\">&#x1F44D;<\/span><b>4<\/b><\/span><\/div><\/div><\/div><div class=\"vsk-slack-thread\" data-thread-ts=\"1792418473.494545\"><div class=\"vsk-slack-thread-head\">4 replies<\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1792419198.750299\" data-slack-user=\"U_SASHA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#2C5FBF\" data-uid=\"U_SASHA\" style=\"background:#2C5FBF\" title=\"U_SASHA\">SK<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Sasha Kim<\/span><span class=\"vsk-slack-ts\">Oct 19, 2026 10:13<\/span><\/div><div class=\"vsk-slack-text\">Got it! I&#x27;ll pull the big cooler out of the walk-in Friday before I leave.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1792419385.102745\" data-slack-user=\"U_ELENA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Oct 19, 2026 10:16<\/span><\/div><div class=\"vsk-slack-text\">Good. Cake gets boxed Fri 14:00. June checks the frosting first.<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1792420842.010042\" data-slack-user=\"U_PRIYA\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#5B4CE0\" data-uid=\"U_PRIYA\" style=\"background:#5B4CE0\" title=\"U_PRIYA\">PR<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Priya Raman<\/span><span class=\"vsk-slack-ts\">Oct 19, 2026 10:40<\/span><\/div><div class=\"vsk-slack-text\">I can make the cream cheese frosting batch Thursday if June wants a hand \ud83d\ude42<\/div><\/div><\/div><div class=\"vsk-slack-msg vsk-slack-reply\" data-slack-ts=\"1792421215.069914\" data-slack-user=\"U_JUNE\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#831843\" data-uid=\"U_JUNE\" style=\"background:#831843\" title=\"U_JUNE\">JO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">June Okafor<\/span><span class=\"vsk-slack-ts\">Oct 19, 2026 10:46<\/span><\/div><div class=\"vsk-slack-text\">yes priya, thurs after morning bake. i&#x27;ll leave the recipe card on the reach-in<\/div><div class=\"vsk-slack-reactions\"><span class=\"vsk-slack-reaction\" title=\":heart:\" data-emoji=\"heart\"><span class=\"vsk-slack-emoji\">&#x2764;&#xFE0F;<\/span><b>1<\/b><\/span><\/div><\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1792447868.579638\" data-slack-user=\"U_LUIS\" data-slack-channel=\"C_SCHEDULE\"><div class=\"vsk-slack-avatar\" data-user-color=\"#155E75\" data-uid=\"U_LUIS\" style=\"background:#155E75\" title=\"U_LUIS\">LO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Luis Ortega<\/span><span class=\"vsk-slack-ts\">Oct 19, 2026 18:11<\/span><\/div><div class=\"vsk-slack-text\">For the 9th, want me to set up the back room or bring anything? Happy to handle it \ud83d\udc4d<\/div><\/div><\/div><\/div><\/section><section class=\"vsk-slack-channel\" id=\"vsk-slack-ch-D8e0f6f55eaf5a4bbfc1a67c\" data-channel-id=\"D8e0f6f55eaf5a4bbfc1a67c\"><header class=\"vsk-slack-chan-head\"><div class=\"vsk-slack-chan-title\"><span class=\"vsk-slack-hash\">&#128274;<\/span>elena.marsh-luis.ortega<\/div><div class=\"vsk-slack-chan-meta\">2 members &#183; created Sep 19, 2026 &#183; 3 messages<\/div><\/header><div class=\"vsk-slack-msgs\"><div class=\"vsk-slack-msg\" data-slack-ts=\"1792447934.782584\" data-slack-user=\"U_LUIS\" data-slack-channel=\"D8e0f6f55eaf5a4bbfc1a67c\"><div class=\"vsk-slack-avatar\" data-user-color=\"#155E75\" data-uid=\"U_LUIS\" style=\"background:#155E75\" title=\"U_LUIS\">LO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Luis Ortega<\/span><span class=\"vsk-slack-ts\">Oct 19, 2026 18:12<\/span><\/div><div class=\"vsk-slack-text\">Sunday close recap: oat milk is down to 4 cartons and the hand pies sold through by 2.<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1792447978.827182\" data-slack-user=\"U_ELENA\" data-slack-channel=\"D8e0f6f55eaf5a4bbfc1a67c\"><div class=\"vsk-slack-avatar\" data-user-color=\"#9A3412\" data-uid=\"U_ELENA\" style=\"background:#9A3412\" title=\"U_ELENA\">EM<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Elena Marsh<\/span><span class=\"vsk-slack-ts\">Oct 19, 2026 18:12<\/span><\/div><div class=\"vsk-slack-text\">Thanks Luis. I&#x27;ll grab oat milk on the way in. I&#x27;ve got the Piedmont drop tomorrow, enjoy your day off.<\/div><\/div><\/div><div class=\"vsk-slack-msg\" data-slack-ts=\"1792448152.170960\" data-slack-user=\"U_LUIS\" data-slack-channel=\"D8e0f6f55eaf5a4bbfc1a67c\"><div class=\"vsk-slack-avatar\" data-user-color=\"#155E75\" data-uid=\"U_LUIS\" style=\"background:#155E75\" title=\"U_LUIS\">LO<\/div><div class=\"vsk-slack-body\"><div class=\"vsk-slack-head\"><span class=\"vsk-slack-name\">Luis Ortega<\/span><span class=\"vsk-slack-ts\">Oct 19, 2026 18:15<\/span><\/div><div class=\"vsk-slack-text\">\ud83d\udc4d<\/div><\/div><\/div><\/div><\/section><\/main><\/div><\/div>";
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
const TENSIONS  = [];
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
const COUNT_UNITS = __UV.c["COUNT_UNITS"];
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
const TZ = "America/New_York";

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
    document.getElementById('sv-sub').textContent = `${m.count||0} records`;
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
    let lastCol = -1;
    for (const m of monthMarkers) {
      const span = m.col - lastCol;
      h += `<div style="grid-column:span ${span};text-align:left">${m.label}</div>`;
      lastCol = m.col;
    }
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

  // Card 2: top conversation partner (across emails + messaging + slack DMs)
  const partnerCount = {};
  const personaName = (PERSONA.name || '').toLowerCase();
  for (const e of (SEED.email && SEED.email.emails) || []) {
    for (const r of (e.recipients || [])) {
      if (typeof r === 'string') partnerCount[r] = (partnerCount[r]||0) + 1;
    }
    if (e.sender && typeof e.sender === 'string') {
      partnerCount[e.sender] = (partnerCount[e.sender]||0) + 1;
    }
  }
  for (const c of (SEED.messaging && SEED.messaging.conversations) || []) {
    for (const p of (c.participant_ids || [])) {
      partnerCount[p] = (partnerCount[p]||0) + (c.messages||[]).length;
    }
  }
  // Resolve to readable names
  const contacts = (SEED.contacts && SEED.contacts.contacts) || [];
  function resolvePartner(key) {
    // Strip noreply
    if (/noreply|no-reply|notification|automated|donotreply/i.test(key)) return null;
    if (key.includes('@')) {
      const m = contacts.find(c => c.email && c.email.toLowerCase() === key.toLowerCase());
      if (m) return [m.first_name, m.last_name].filter(Boolean).join(' ');
      // Display the local part
      return key.split('@')[0].split(/[._]/).map(w => w.charAt(0).toUpperCase()+w.slice(1)).join(' ');
    }
    if (key.startsWith('p_')) {
      const handle = key.slice(2);
      const m = contacts.find(c => c.first_name && (c.first_name.toLowerCase()+'_'+(c.last_name||'').toLowerCase()) === handle);
      if (m) return [m.first_name, m.last_name].filter(Boolean).join(' ');
      return handle.split(/[._]/).map(w => w.charAt(0).toUpperCase()+w.slice(1)).join(' ');
    }
    const byId = contacts.find(c => c.contact_id === key);
    if (byId) return [byId.first_name, byId.last_name].filter(Boolean).join(' ');
    return null;
  }
  let topPartner = '', topPartnerCount = 0, topPartnerKey = '';
  for (const [k, v] of Object.entries(partnerCount)) {
    const resolved = resolvePartner(k);
    if (!resolved) continue;
    if (resolved.toLowerCase() === personaName) continue;
    if (v > topPartnerCount) { topPartnerCount = v; topPartner = resolved; topPartnerKey = k; }
  }

  // Card 3: biggest financial outflow category
  const catTotals = {};
  for (const t of (SEED.fintrack && SEED.fintrack.transactions) || []) {
    const amt = parseFloat(t.amount);
    if (isNaN(amt) || amt >= 0) continue;
    const cat = t.category || 'uncategorized';
    catTotals[cat] = (catTotals[cat] || 0) + Math.abs(amt);
  }
  let topCat = '', topCatAmt = 0;
  for (const [k, v] of Object.entries(catTotals)) {
    if (v > topCatAmt) { topCatAmt = v; topCat = k; }
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
  h += `<div class="pulse-detail">${topPartnerCount} cross-server interactions</div>`;
  h += sparkH.replace(/var\(--accent-dim\)/g, 'var(--accent2)');
  h += '</div>';
  // Top spend category
  h += '<div class="pulse-card"><div class="pulse-label">Largest Outflow</div>';
  h += `<div class="pulse-value" style="font-family:var(--font-mono);font-size:26px">$${Math.round(topCatAmt).toLocaleString()}</div>`;
  h += `<div class="pulse-detail">${esc(catLabel || '-')}</div>`;
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
    const els = document.querySelectorAll('img[data-va-src]');
    for (let i = 0; i < els.length; i++) {
      const el = els[i];
      if (el.getAttribute('src')) continue;
      // Only what is on screen. A hidden tab is painted when it opens (vaTab calls
      // back here), so a photo library is not decoded before anyone looks at it.
      if (el.getClientRects && el.getClientRects().length === 0) continue;
      const src = vaMediaSrc(el.getAttribute('data-va-src'));
      if (src) el.setAttribute('src', src);
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
      h += '<div style="max-width:680px;border:1px solid var(--border);border-radius:6px;margin-top:8px;overflow:hidden;background:#fff">' + (f.content||'') + '</div>';
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
    const durationMs = endMs - startMs;
    const isMultiDay = durationMs >= 24*60*60*1000;
    if (!isMultiDay) {
      const k = fmtDateKey(ev.start_datetime);
      (CAL.byDate[k] = CAL.byDate[k] || []).push(ev);
      continue;
    }
    // Multi-day: walk one day at a time and add a wrapped event to each.
    const startKey = fmtDateKey(ev.start_datetime);
    const endKey   = fmtDateKey(ev.end_datetime);
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
    if (ev._spanTotal && ev._spanTotal > 1) {
      const startLabel = fmtDate(ev.start_datetime);
      const endLabel = fmtDate(ev.end_datetime);
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
function renderGarmin(data) {
  const daily = (data.daily_summaries||data.daily_stats||[]).sort((a,b)=>b.date>a.date?1:-1);
  const activities = data.activities||[];
  const sleep = data.sleep_records||[];

  const avgSteps = daily.length ? Math.round(daily.reduce((s,d)=>s+(d.steps||0),0)/daily.length) : 0;
  const avgStress = daily.length ? Math.round(daily.reduce((s,d)=>s+(d.average_stress||0),0)/daily.length) : 0;
  const avgHR = daily.filter(d=>d.resting_heart_rate).length ? Math.round(daily.reduce((s,d)=>s+(d.resting_heart_rate||0),0)/daily.filter(d=>d.resting_heart_rate).length) : 0;

  let h = '<div style="max-width:900px">';
  h += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;margin-bottom:20px">';
  h += '<div class="ov-card"><div style="font-size:11px;color:var(--muted)">Avg Steps</div><div style="font-size:24px;font-weight:800">'+avgSteps.toLocaleString()+'</div></div>';
  if (avgHR) h += '<div class="ov-card"><div style="font-size:11px;color:var(--muted)">Avg Resting HR</div><div style="font-size:24px;font-weight:800;color:var(--orange)">'+avgHR+' bpm</div></div>';
  if (avgStress) h += '<div class="ov-card"><div style="font-size:11px;color:var(--muted)">Avg Stress</div><div style="font-size:24px;font-weight:800;color:var(--yellow)">'+avgStress+'</div></div>';
  h += '<div class="ov-card"><div style="font-size:11px;color:var(--muted)">Days</div><div style="font-size:24px;font-weight:800">'+daily.length+'</div></div>';
  h += '</div>';

  if (daily.length) {
    h += '<div class="gen-section"><div class="gen-sec-title">Daily Summaries</div>';
    daily.slice(0,20).forEach(d => {
      h += '<div class="gen-rec" style="display:flex;gap:14px;padding:8px 12px;font-size:12px">';
      h += '<div style="color:var(--muted);min-width:80px">'+esc(d.date)+'</div>';
      h += '<div>🚶 '+(d.steps||0).toLocaleString()+'</div>';
      h += '<div>❤️ '+(d.resting_heart_rate||'?')+' bpm</div>';
      if (d.average_stress) h += '<div>😰 '+d.average_stress+'</div>';
      if (d.body_battery_high) h += '<div>🔋 '+d.body_battery_low+'-'+d.body_battery_high+'</div>';
      h += '</div>';
    });
    h += '</div>';
  }
  return h + '</div>';
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
initSearch();
renderOverview();
// Scroll messaging to bottom on first load if it's shown

