# Plan — Signpost

**Version:** 0.2 — September 21, 2026. Revised after specification, repository, and course-guide review; prepared for Ryan's approval.

**Basis:** [Specification v0.2](specification.md), [business case](business-case.md), and the [course plan guide](reference/plan-guide.md). Requirement IDs below refer to the specification. This is the Week 4 planning assignment for the fictional Alder Systems case.

**Companion documents:** [Tasks](tasks.md) · [Evaluation and revision record](planning-review.md) · [Reflection draft](week-4-reflection.md). Archived first drafts are retained in the prompt scratch pad.

## 1. Approach Summary

We will refine the existing service catalog so engineers can find a service, identify its owner, and open its supporting information. We will keep the current pages and shared service file, with personal pins saved in each visitor's browser. We will check incomplete records and recovery paths before polishing the normal browsing flow. The public demonstration will continue to use fictional data; a real internal release would require protected hosting and owner-reviewed records. (FR-01–FR-12; NFR-05.)

## 1.5 Tech Stack

- **Frontend:** Existing no-build Vue 3, Vue Router 4, Bootstrap 5.3.3, Bootstrap Icons 1.10.5, JavaScript, HTML, and CSS. (FR-01, FR-04–FR-07; NFR-01–NFR-02; specification scope.)
- **Backend/DB:** None. Papa Parse 5.4.1 reads `items-template.csv`; browser localStorage holds personal pin IDs. (FR-03, FR-08–FR-09, FR-12.)
- **Hosting:** Existing GitHub Pages site for the fictional demonstration; a local static server for preview. Protected internal hosting is a separate condition for any real deployment. (NFR-05.)
- **Other services/APIs:** Existing jsDelivr and unpkg library delivery. No operational, authentication, database, or AI API is needed for this prototype. (FR-11–FR-12; specification scope.)

## 2. Key Decisions (ADRs)

An Architecture Decision Record (ADR) explains a meaningful choice and its tradeoff.

| ADR # | Decision | Traces to (R#) | Alternatives considered | Why this one |
| --- | --- | --- | --- | --- |
| ADR-00 | Retain the current no-build Vue application and four hash routes. | FR-01; NFR-03 | Rebuild with React or a Vue build pipeline; server-managed routes | Preserves the working template and direct links on static hosting; accepts the current external-library dependency. |
| ADR-01 | Retain the ten-column CSV, validate the complete file, and reject an invalid load. | FR-03; Key Data | Introduce a database; display only valid rows | A reviewed file fits a small read-only catalog. Rejecting a faulty file prevents an incomplete catalog from appearing authoritative, at the cost of availability until corrected. |
| ADR-02 | Use one shared in-memory store for loaded records and current filters. | FR-03, FR-05–FR-06 | Fetch in each screen; save filters permanently | Loads once initially and preserves browsing context between screens without another state library. Filters reset after refresh, as allowed by the specification. |
| ADR-03 | Save only service IDs in `signpost:pins:v1`, with session-only fallback. | FR-02, FR-08–FR-09 | User accounts and synchronized favorites; session-only pins for everyone | Supports return visits without storing duplicate service records or adding login. Pins remain specific to the browser and origin. |
| ADR-04 | Show review age and missing information explicitly. | FR-07, FR-10; SC-05, SC-07 | Hide old entries; infer that recent records are healthy | Keeps potentially useful ownership information available while making uncertainty visible. The 90-day threshold is a proposed policy, not a health measurement. |
| ADR-05 | Allow HTTPS external destinations and only the specified local sample-link pattern; render CSV text as text. | FR-07, FR-11; NFR-04 | Allow arbitrary links and HTML; integrate a live incident tool | Restricts unsafe content and keeps the demonstration understandable. Links lead to information and never establish that a responder is available. |
| ADR-06 | Retain Bootstrap and the existing responsive style, with optional images omitted when absent or broken. | FR-04; NFR-01–NFR-02 | Adopt a new design system; require images for every card | Preserves the established layout and prioritizes ownership and actions. Accessibility still requires explicit checks. |
| ADR-07 | Maintain shared records through repository review; document the steward's role in About. | FR-11–FR-12 | Add an editing form and role management | Fits the read-only scope. Approval and publishing are organizational responsibilities; the prototype does not enforce them. |
| ADR-08 | Publish fictional records on the existing Pages site; require protected hosting for real records. | NFR-05 | Publish real internal data here; add a cosmetic login to the static page | Prevents confusing a classroom demonstration with an internal deployment. Access protection would have to cover both the page and its CSV. |
| ADR-09 | Separate implementation checks from first-time-user evaluation. | SC-01–SC-07; NFR-01–NFR-03 | Treat simulated observations or one successful walkthrough as acceptance | Browser evidence can verify behavior; only people can establish lookup time and comprehension. Neither evidence type substitutes for the other. |

## 3. Components / Building Blocks

| Component | Purpose | Related requirements |
| --- | --- | --- |
| App shell and navigation | Provide Home, Services, detail, About, page titles, and unknown-route recovery. | FR-01; NFR-01 |
| Service data file and loader | Supply eight fictional records, validate the full file, and support loading/error/retry states. | FR-03; NFR-04–NFR-05 |
| Shared catalog and filter state | Keep records available across pages and preserve search, team, tier, and pinned-only selections. | FR-03, FR-05–FR-06 |
| Home | Introduce the catalog and display personal pins or a helpful empty state. | FR-02, FR-08 |
| Services and reusable service cards | Show alphabetical records, combined filters, result count, review status, and empty/no-results states. | FR-04–FR-06, FR-10 |
| Service detail | Display ownership, purpose, review date, operational destinations, and unknown-ID recovery. | FR-07, FR-10 |
| Pin storage and fallback notice | Keep personal shortcuts across normal visits or explain session-only storage. | FR-08–FR-09 |
| About and sample resources | Explain tiers, pins, fictional data, corrections, and sample operational destinations. | FR-11–FR-12 |
| Shared visual and interaction style | Provide readable content, responsive layout, visible focus, labels, and usable controls. | NFR-01–NFR-02 |

## 4. Dependencies & Assumptions

**External services/tools needed**

- GitHub repository access and the existing Pages publishing configuration. The site currently publishes the root of `main`. A static preview server is needed for local CSV loading. (FR-03; NFR-05; ADR-08.)
- Browser access to the existing Vue, router, Bootstrap, icons, and Papa Parse libraries. Vue and Vue Router currently use major-version CDN URLs; this is a reproducibility risk to assess before a real release. (NFR-03; ADR-00.)
- A modern browser with JavaScript. Persistent storage may be unavailable, so storage access is optional rather than a condition for browsing. (FR-08–FR-09.)
- For human evaluation, two available first-time testers and Ryan's review of their observations. For an operational rollout, a designated steward, owning teams, and a hosting owner would also be required. These roles have not been staffed for the fictional case. (FR-12; NFR-05; SC-02, SC-07.)

**Assumptions being made**

- The specification v0.2 defines the current scope. It refines earlier business-case language: the catalog provides schedule links, not a current responder or a judgment that a change is safe; it requires a ten-column schema and protected hosting for real records. (FR-07, FR-10–FR-12; NFR-05.)
- The classroom dataset contains eight services across five teams. A roughly 70-service, nine-team internal catalog is a future case assumption. No production data collection is part of this assignment. (Key Data; NFR-03, NFR-05.)
- **Unverified:** the 30-second lookup target and users' understanding of schedules/review warnings. Prior simulated interviews do not establish either result. (SC-02, SC-07.)
- **Unverified:** normal-broadband initial display within three seconds. The earlier local 70-record filter measurement is useful evidence only for that test environment. (NFR-03.)
- **Unverified for real rollout:** owner availability, acceptance of the 90-day policy, protected hosting, and the business case's costs and savings. The original ten-week, 270-hour scenario is not an estimate of remaining classroom work. (FR-10, FR-12; NFR-05; business-case feasibility.)

## 5. Risks

Likelihood and impact are qualitative planning judgments for this case. Ryan is the classroom owner; organizational roles below are proposed roles for a future internal release.

| Risk | Likelihood | Impact | Mitigation | Owner |
| --- | --- | --- | --- | --- |
| Records become stale or incomplete. (FR-07, FR-10, FR-12) | High | High | Show warnings and missing-link text; document owner review and quarterly attestation. Require complete, owner-attested Tier 1 records before an operational release. | Ryan for demo; proposed catalog steward and owning teams for rollout |
| A malformed CSV makes the catalog unavailable. (FR-03) | Medium | Medium | Validate before publication; test full-file rejection and Retry; restore the previous valid file if needed. | Ryan |
| Public artifacts accidentally contain real internal information. (NFR-05) | Low | High | Review changed records and destinations before publication; use fictional sample resources. Protect app and CSV before introducing real data elsewhere. | Ryan; proposed hosting owner for rollout |
| A CDN failure or changing library version prevents startup. (NFR-03) | Medium | High | Record dependencies, measure a fresh load, and retain a known working revision. Assess fixed versions or internal copies before operational use. | Ryan; proposed hosting owner for rollout |
| Browser storage is blocked or damaged. (FR-09) | Medium | Low | Keep in-memory pins, show the session-only notice, and test malformed stored values. | Ryan |
| Users mistake schedule links or recent review dates for live incident information. (FR-10–FR-11; SC-07) | Medium | High | Keep explicit labels and escalation guidance; ask two testers to explain what the links and warnings mean. | Ryan |
| The plan duplicates finished work or declares unreviewed work complete. (SC-01–SC-07; ADR-09) | Medium | Medium | Inventory the existing prototype, write acceptance/refinement tasks, and require passing evidence plus human review before marking a task Done. | Ryan |

## 6. Sequencing

The next phase starts from the existing prototype. This assignment produces and evaluates planning documents; it does not launch the implementation backlog.

### Starting point: what already exists

The baseline is repository revision `0b99db2` and the [September 15 browser report](browser-checks.md). A September 21 source review confirmed the following implementation is present. Historical test results retain their original date; they are not new human acceptance evidence.

| Existing work | Evidence / location | Implication for the next phase |
| --- | --- | --- |
| CSV loader, validation, link/date rules, shared filters, and pins | `app.js`, `items-template.csv`; FR-03, FR-05–FR-10 | Check boundary cases and correct failures; do not create another data layer. |
| Home, catalog/cards, detail, About/sample resources, navigation | Existing `components/` files; FR-01–FR-02, FR-04–FR-08, FR-11–FR-12 | Retain these screens and their list-to-detail flow. |
| Responsive styling, focus helpers, labels, and status messages | `index.html`, `style.css`, components; NFR-01–NFR-02 | Perform focused accessibility acceptance checks; presence in source is not a complete audit. |
| Published fictional prototype and earlier implementation checks | Existing Pages site and browser report; NFR-03, NFR-05; SC-01, SC-03–SC-06 | Recheck only as required by changes or missing evidence; initial-load measurement and real-user outcomes remain open. |

### Order for the next implementation phase

1. **Establish the baseline.** Compare v0.2 with the current files and existing browser report. Identify what is implemented and what still needs evidence before changing code. (FR-01–FR-12; NFR-01–NFR-05; ADR-09.)
2. **Check data and trust boundaries first.** Verify schema, failure recovery, safe destinations, and review-date rules. Every screen relies on these decisions and incorrect information is the main risk. (FR-03, FR-07, FR-10–FR-11; NFR-04–NFR-05.)
3. **Refine discovery and detail only where checks fail.** Preserve the existing cards, routes, filters, ownership information, and return path. (FR-01, FR-04–FR-07.)
4. **Check personal shortcuts and explanations.** Verify normal and blocked storage, Home, and About after the shared data and detail flow are stable. (FR-02, FR-08–FR-09, FR-11–FR-12.)
5. **Check accessibility, responsive layout, and performance.** Exercise normal and recovery screens, including delayed loads, at the specified widths. Record measured results and remaining issues. (NFR-01–NFR-03; SC-06.)
6. **Evaluate with two first-time users.** Use the existing research protocol to assess lookup time and comprehension. Apply narrowly scoped fixes or revise the specification if the problem requires a changed requirement. (SC-01–SC-07; ADR-09.)
7. **Review and publish the next prototype revision.** Verify fictional content, record the human review, deploy through the existing Pages workflow, and confirm the published routes and documents. Real deployment remains a separate decision. (NFR-05; FR-01, FR-11–FR-12.)

Steps 2–5 can use temporary fictional fixtures without changing the public catalog. Tester scheduling can begin during step 2 so participant availability does not become a last-minute dependency; actual sessions wait until the relevant checks pass. The Week 4 document publication is separate from a later prototype release. (NFR-04–NFR-05; SC-02, SC-07; ADR-09.)

## 7. Review & Approval

| Reviewer | Date | Approved? |
| --- | --- | --- |
| AI-assisted consistency review | September 21, 2026 | Draft reviewed and refined; see the review record. This is not human approval. |
| Ryan Roberts, project author | Pending | Awaiting personal review and approval. |
| Instructor, if required by the course | Pending | No approval claimed. |

**Gate:** The course guide calls for accountable human sign-off before tasks. The companion task document is a proposed draft supplied for review as part of this assignment; it is not evidence of sign-off or authorization for an operational release. No human approval is invented.

**Review checklist:** Every ADR and component traces to requirements; every risk names a mitigation and owner; sequencing prioritizes data/trust risks; existing work is distinguished from pending evidence. Accountable human sign-off remains pending.
