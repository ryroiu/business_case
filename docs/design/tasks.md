# Tasks — Signpost

**Version:** 0.2 — September 21, 2026. Revised task draft derived from [plan.md](plan.md) and [specification v0.2](specification.md), using the [course tasks guide](reference/tasks-guide.md). See the [evaluation and revision record](planning-review.md).

These tasks continue the existing prototype. Each row is an acceptance or refinement step, not an instruction to rebuild a feature already present. The document is proposed for Ryan's review alongside the plan. Each task is intended to take less than one working day; estimates below are planning estimates, not logged time.

The [plan's baseline inventory](plan.md#starting-point-what-already-exists) records implemented work. **Not started** below refers to the proposed next-phase acceptance task, not to the age or completeness of the feature. The September 15 checks remain historical evidence, and the course's human-review rule prevents automatically marking these new tasks Done.

## Task List

| ID | Task | Traces to (R# / ADR#) | Depends on | Status |
| --- | --- | --- | --- | --- |
| T1 | Record the current files, existing features, and remaining acceptance gaps against v0.2. | ADR-00, ADR-09; FR-01–FR-12; NFR-01–NFR-05 | — | Not started |
| T2 | Verify the ten-column CSV and its eight fictional records before using them as the test baseline. | FR-03; NFR-05; ADR-01, ADR-08 | T1 | Not started |
| T3 | Exercise catalog loading, invalid-file rejection, empty data, and Retry with controlled fixtures. | FR-03; SC-05; ADR-01 | T2 | Not started |
| T4 | Verify safe destinations and inert text using valid and unsafe sample values. | FR-07, FR-11; NFR-04; ADR-05 | T2 | Not started |
| T5 | Check review-date boundaries and warning language against the specification. | FR-10; SC-05; ADR-04 | T2 | Not started |
| T6 | Verify alphabetical service cards and optional-image behavior. | FR-04; ADR-06 | T3, T4, T5 | Not started |
| T7 | Check combined search, team, tier, and pinned-only filtering. | FR-05; SC-03; ADR-02 | T6 | Not started |
| T8 | Check filter preservation and clear/no-results recovery. | FR-06; SC-03, SC-05; ADR-02 | T7 | Not started |
| T9 | Verify detail content, missing destinations, and unknown-service recovery. | FR-07; SC-01, SC-05; ADR-04, ADR-05 | T3, T4, T5 | Not started |
| T10 | Verify all four routes, active navigation, and unknown-route recovery. | FR-01; SC-01; ADR-00 | T8, T9 | Not started |
| T11 | Check pin/unpin behavior and persistence across cards, detail, and Home. | FR-02, FR-08; SC-04; ADR-03 | T6, T9 | Not started |
| T12 | Exercise blocked storage, malformed stored pins, and removed service IDs. | FR-08–FR-09; SC-04; ADR-03 | T11 | Not started |
| T13 | Review About and each sample resource against the catalog's limits and correction process. | FR-11–FR-12; NFR-05; ADR-07, ADR-08 | T4, T9, T12 | Not started |
| T14 | Check keyboard navigation, focus, page titles, labels, and status announcements. | NFR-01; SC-06; ADR-06 | T10, T12, T13 | Not started |
| T15 | Check mobile/desktop layout, control sizes, and text contrast. | NFR-02; SC-06; ADR-06 | T14 | Not started |
| T16 | Measure filtering with 70 fictional records. | NFR-03; ADR-09 | T7 | Not started |
| T17 | Measure a fresh initial load with the normal external dependencies. | NFR-03; ADR-00, ADR-09 | T10 | Not started |
| T18 | Prepare the two-person evaluation sheet and arrange two first-time testers. | SC-01–SC-07; ADR-09 | T1 | Not started |
| T19 | Run the lookup, filtering, pinning, and comprehension tasks with both testers. | SC-01–SC-07; ADR-09 | T15, T16, T17, T18 | Blocked |
| T20 | Review findings and define a small correction task for each unmet requirement. | ADR-09; affected FR/NFR/SC IDs from findings | T19 | Not started |
| T21 | Publish the reviewed prototype revision and verify the live routes and documentation. | FR-01, FR-11–FR-12; NFR-05; ADR-08 | T20 | Not started |

**Status values:** Not started · In progress · Done · Blocked

### Acceptance checks and working files

An existing behavior can pass without a code change. Record the test date, steps, expected and actual result, and a screenshot or other useful evidence. Make a small correction only when a check fails. A material correction becomes its own traced task, followed by the affected check again.

| Task | Files / area | Pass condition | Estimated effort |
| --- | --- | --- | --- |
| T1 | Specification, plan, current app, and browser report | Every FR/NFR has an existing implementation location or an explicit gap; historical checks are labeled with their original date. | 1–2 hours |
| T2 | `items-template.csv`, `app.js` | All ten headers exist; required values and unique IDs are valid; eight services and five teams are recorded; only fictional sample destinations appear. | 1 hour |
| T3 | `app.js`, catalog status and consuming pages | Loading is visible; header-only CSV is empty; missing headers, malformed CSV, duplicate IDs, invalid required values, and network failure show the catalog error without partial records; Retry succeeds after valid data returns. Check one initial fetch and no navigation-triggered refetch. | 2–3 hours |
| T4 | `app.js`, cards, detail, About | HTTPS and the exact permitted sample-link form work; HTTP, `javascript:`, `data:`, credentials in URLs, and malformed sample links do not become active destinations. Markup-like CSV text displays literally. Unsafe images are omitted. | 1–2 hours |
| T5 | `app.js`, cards and detail | With a fixed reference date, today and exactly 90 calendar days ago are reviewed; 91 days ago is overdue. Missing, impossible dates such as February 30, and future dates are unverified. Check month/year boundaries and record timezone. Old records remain accessible; labels do not imply service or link health. | 1 hour |
| T6 | `components/service-card-component.js`, collection, `style.css` | Eight cards appear alphabetically with required fields and controls. Blank/broken images leave no empty image area; a valid optional image appears. | 1 hour |
| T7 | `components/collection-page-component.js`, shared state | Search is case-insensitive and requires every word across name, ID, description, and team. Commerce + Tier 1 returns Checkout Web and Payments API. Seed Payments API as a test pin to check pinned-only without depending on T11's pin-control test; selectors come from records and counts update. | 1–2 hours |
| T8 | Collection, detail, shared state | Search, team, tier, and pinned-only survive detail → Back to services. A nonsense query yields helpful recovery; Clear filters resets all four selections. | 1 hour |
| T9 | `components/item-detail-page-component.js` | Payments API shows Commerce, purpose, ID, tier, review information, and three resources. Legacy Exporter exposes missing runbook/schedule text and escalation guidance. Unknown IDs show Service not found and a return link. Check optional-image display and broken-image removal in detail as well as on cards. | 1 hour |
| T10 | `app.js`, navbar, all pages | Home, Services, detail, and About work through navigation and direct hash links/refresh. Current navigation is clear; unknown paths recover. Home → Services → detail takes two clicks. | 1 hour |
| T11 | Shared state, cards, detail, Home | Pin Payments API and Billing Worker; both appear on Home and survive a normal refresh. Unpin from either control removes the corresponding shortcut. Only IDs are saved under `signpost:pins:v1`; empty Home guidance remains useful. | 1 hour |
| T12 | `app.js`, storage warning, Home | Denied reads/writes retain session pins and show the specified warning; malformed JSON and wrong-shaped saved values do not break browsing; removed IDs do not create cards. | 1–2 hours |
| T13 | `components/about-page-component.js` | About explains fiction, tiers, browser-only pins, and owner/steward review. All three sample resource types remain clearly fictional and lead back to the selected service; no live responder or paging action is implied. | 1 hour |
| T14 | `index.html`, `app.js`, navigation, filters, cards, detail | Complete core flows by keyboard with visible focus, labels, skip link, pressed pin state, polite results, descriptive titles, and appropriate heading focus after navigation. Check Services remains recognizable as the current section on detail, including for assistive technology. Include delayed data, Retry, and unknown-ID recovery; confirm the final visible heading receives focus where navigation requires it. | 2–3 hours |
| T15 | `style.css`, all screens | At 390 px and 1440 px there is no horizontal page scrolling; filters/cards stack appropriately; controls meet the specified 44 px height; measured text/background pairs meet 4.5:1. Record any exceptions and fixes. | 2 hours |
| T16 | Temporary 70-service fixture and filter view | Record browser/device and input-to-visible-results timing for at least ten representative changes after data loads. Report median and maximum; every sampled change should be under 200 ms. Keep the fixture fictional and separate from the eight-row published demo. | 1 hour |
| T17 | Published/local app and external libraries | Record browser, network conditions, disabled/warm cache, and navigation-to-usable-catalog time for three cold-cache runs on normal broadband. Report each run against the three-second target; a failure is logged, not relabeled as a filter-performance pass. | 1 hour |
| T18 | [Research protocol](research-notes.md), new evaluation notes | Prepare identical tasks, neutral instructions, timing/help/comprehension fields, and privacy-conscious participant labels. Two first-time testers are scheduled before T19 begins. | 1 hour plus scheduling |
| T19 | Prototype and evaluation notes | Record both testers' actual outcomes: owner/runbook within 30 seconds without help, retained filters, pin persistence, and explanations of schedule links/overdue warnings. Record failures honestly; collecting results does not itself mean SC-02/SC-07 pass. | 1–2 hours |
| T20 | Evaluation notes, tasks, affected requirements | Each finding is linked to a requirement with a decision to fix, revise scope, or document a limitation. Add separately estimated correction/retest rows before release; record human review. | 1 hour |
| T21 | Repository, GitHub Pages, browser report | Add any correction/retest IDs from T20 to this task's dependencies before work starts. Release only after those tasks pass and receive human review; publication completes; live Home, Services, detail refresh, About/sample links, plan, and tasks open correctly. Record URLs and the deployed revision. | 1 hour |

Estimated active effort for this proposed acceptance pass is **24–31 hours**, excluding participant scheduling delays and any correction work discovered. This is not a replacement for the business case's illustrative whole-project budget. T18 can begin after T1 while technical checks proceed; T19 still waits for both a usable prototype and available participants.

### Requirement coverage

| Specification requirement | Tasks |
| --- | --- |
| FR-01: routes and recovery | T10, T14, T21 |
| FR-02: Home and pins | T11, T12 |
| FR-03: load, validate, retry, empty catalog | T2, T3 |
| FR-04: alphabetical cards and optional images | T6 |
| FR-05: combined filters | T7 |
| FR-06: preserved/cleared filters | T8 |
| FR-07: detail and destinations | T4, T9 |
| FR-08: personal pins | T11, T12 |
| FR-09: storage fallback | T12 |
| FR-10: review dates | T5, T9 |
| FR-11: About and fictional resources | T4, T13 |
| FR-12: read-only correction process | T13, T21 |
| NFR-01: accessibility | T14 |
| NFR-02: responsive layout and contrast | T15 |
| NFR-03: performance | T16, T17 |
| NFR-04: safe text and URLs | T4 |
| NFR-05: fictional data/publication boundary | T2, T13, T21 |
| SC-01–SC-07: technical checks and actual user outcomes | T3, T5, T7–T12, T14–T15, T18–T20 |

## Definition of Done (applies to every task)

- Matches its linked requirement's acceptance criteria in the specification.
- Reviewed by a human before marked done
- No task marked done without a test passing

For a documentation or evaluation task, the check is inspection of the required output against its pass condition. AI review is assistance, not the human review required above. No implementation task is marked Done merely because code exists or an earlier AI-run check passed.

## Blocked / Questions

| Task | Blocker | Raised | Resolved |
| --- | --- | --- | --- |
| Proposed backlog | Plan sign-off is pending. This is a draft for review, not an approved execution schedule. | 2026-09-21 | Pending Ryan's review. |
| T19 | Two real first-time participants have not been identified. Simulated feedback cannot supply the SC-02/SC-07 evidence. | 2026-09-21 | Pending recruitment through T18. |
| T20–T21 | The size of corrective work depends on evaluation findings. Do not assume a one-hour review task includes implementing every fix. | 2026-09-21 | Add traced correction/retest rows after T19, if needed. |

Any future operational release additionally needs protected hosting, a designated steward, owner-attested records, and sponsor acceptance of the review policy. Those are outside this front-end backlog and are described in the plan rather than treated as completed classroom tasks.
