# Specification: Signpost

**App description:** Signpost helps engineers at fictional Alder Systems find an internal service, identify its owning team, and reach its runbook, repository, and on-call schedule. It is a read-only catalog: shared records change through repository review, while each engineer can pin services in their own browser.

**Version:** 0.2, September 15, 2026 - revised from [v0.1](specification-v0.1.md) using competitor research, simulated feedback, and prototype design review. Human validation has not taken place.

**Related work:** [Business case](business-case.md) · [Research and evaluation notes](research-notes.md) · [Submission report](submission.md) · [Visual style guide](style-guide.html)

## Style and Theme

Calm, professional, and easy to scan during an interruption. Retain Bootstrap and the existing component structure. Use an off-white canvas, white panels, dark navy text, and blue actions. Use amber for information needing review, never color alone. See [style-guide.html](style-guide.html) for colors, type, spacing, and controls.

Show the service name, purpose, owning team, and tier before decorative content. Architecture images are optional and omitted in the demonstration. Cards must not reserve empty image space. Buttons use descriptive labels such as “View service,” “Pin Payments API,” and “On-call schedule.”

## User Scenarios

### Story 1 - Find the right team during an incident (most important)

Sam receives an alert mentioning Payments API. From Home, Sam opens Services, searches for Payments, opens the result, and sees Commerce as the owner, the last-reviewed date, and links to the runbook and on-call schedule. Signpost does not identify the current responder or promise that a change is safe.

### Story 2 - Understand a team's services

Jules is new to Alder Systems. Jules filters Services to Commerce and Tier 1 · Critical, reads each service's purpose, opens a detail, and returns to the same filtered results. The tier labels explain business impact without requiring prior knowledge.

### Story 3 - Return to familiar services

Maya pins Payments API and Billing Worker. Both appear on Home; they remain pinned after a normal refresh in the same browser. Unpinning removes a shortcut without altering the shared service record.

### Story 4 - Recognize incomplete or old information

Sam opens Legacy Exporter. A review warning and “On-call schedule not provided” make the limitations visible. Signpost advises contacting the owning team and using the established incident escalation process if the catalog cannot supply a destination.

## Requirements

### Functional Requirements

| ID | Required behavior |
| --- | --- |
| FR-01 | Keep four routes: Home `#/`, Services `#/items`, Service detail `#/items/:id`, About `#/about`. Navigation labels are Home, Services, About; mark the current page. Unknown routes give a clear recovery page. |
| FR-02 | Home has a “Browse services” action and a pinned-services section. Show a helpful empty state when there are no pins. |
| FR-03 | Load `items-template.csv` once per page load. Show loading status. On network, parsing, or invalid-record failure, show “The service catalog could not be loaded” and Retry. Never present a partial file as complete. A valid header-only file is an empty catalog. |
| FR-04 | Show one card per service, alphabetically by name, containing name, purpose, owning team, tier, review status, a pin button, and a “View service” link. Show an optional image only when provided and successfully loaded. |
| FR-05 | Provide a labeled search field, owning-team selector, service-tier selector, and pinned-only checkbox. Search matches all entered words, case-insensitively, across name, ID, description, and owning team. All filters combine with AND. Options come from loaded records; result count updates immediately. |
| FR-06 | Keep browsing selections when visiting a detail and using “Back to services.” Show “Clear filters” and a useful no-results message. Clearing resets search, team, tier, and pinned-only selections. Filter state need only survive navigation during the session, not refresh. |
| FR-07 | Detail shows service ID, name, full purpose, tier, owning team, review date/status, and repository/runbook/on-call schedule destinations. Put the operational links near ownership. Missing or unsafe destinations appear as text, not active links. Unknown IDs show “Service not found” and a way back. |
| FR-08 | Pin and unpin from cards and detail. Save only service IDs under `signpost:pins:v1` in browser localStorage. Show pins on Home and via the pinned-only filter. Pins are personal to this browser and do not synchronize. Ignore removed IDs when showing pins. |
| FR-09 | If storage is blocked, retain pins for the current session and display “Pins are available for this visit only.” Malformed stored pins must not break the catalog. |
| FR-10 | Show a valid `last_reviewed` date as “Reviewed YYYY-MM-DD.” If it is more than 90 calendar days old, add “Review overdue.” Missing, invalid, or future dates show “Review date unverified.” An overdue entry remains visible. The date is an owner attestation, not a link-health or service-health signal. |
| FR-11 | About explains the catalog's purpose, fictional demonstration, tiers, personal pins, and correction process. Demo operational links lead to clearly labeled sample resource views within About; opening them never contacts an operational service or sends a page. |
| FR-12 | Keep the catalog read-only. A real catalog correction is proposed in the source repository, reviewed by the owning team, and published by the steward. Explain this process in About. The prototype does not enforce approvals or provide an editing form. |

### Accessibility and Usability Requirements

- **NFR-01:** All navigation, filters, links, and pin controls work by keyboard. Provide visible focus, programmatic labels, a skip link, descriptive page titles, and a heading focus change after navigation. Pin buttons expose their pressed state; result counts announce updates politely.
- **NFR-02:** At 390 px and 1440 px widths, all content remains usable without horizontal page scrolling. Stack filters and cards on small screens. Controls have at least 44 px height; text meets a target contrast ratio of 4.5:1.
- **NFR-03:** For a 70-service test catalog, search/filter updates target under 200 ms after the data is loaded on a current desktop browser. Initial display targets three seconds on a normal broadband connection; external-library/network timing needs separate measurement. Human lookup targets are listed below and are not benchmark results.
- **NFR-04:** Insert CSV text as text, never executable HTML. Accept only HTTPS external destinations. The public demo additionally allows the exact local sample-link pattern `#/about?resource=runbook|on-call|repository&service=<id>` (one resource value at a time). Invalid links remain unavailable. Reject unsafe image URLs; only HTTPS image URLs are supported.
- **NFR-05:** The public repository and demo contain fictional records only, with no real operational endpoints, credentials, or personal on-call details. Production hosting must restrict both the application and the CSV to authorized staff.

### Key Data

One CSV row represents one service. Keep the six starter columns and add four. Every column header is required; empty optional cells are allowed. Trim surrounding whitespace.

| CSV field | Meaning / visible label | Rule |
| --- | --- | --- |
| `id` | Stable service identifier | Required; unique lowercase letters, digits, hyphens; e.g. `payments-api` |
| `name` | Service name | Required; e.g. Payments API |
| `description` | Purpose | Required; plain text, ideally 1-3 sentences |
| `category` | Service tier | Required; exactly `Tier 1`, `Tier 2`, or `Tier 3` |
| `image_url` | Optional architecture image | May be empty; HTTPS only; omit broken images |
| `location` | Owning team | Required; one accountable team, e.g. Commerce |
| `repository_url` | Source repository | Optional; a valid link or “Repository not provided” |
| `runbook_url` | Operational guide | Optional; a valid link or “Runbook not provided” |
| `on_call_url` | Maintained on-call schedule | Optional; a valid link or “On-call schedule not provided”; no live-person data |
| `last_reviewed` | Most recent owner attestation | Optional ISO calendar date `YYYY-MM-DD`; validate as described in FR-10 |

**Tier definitions for this case:** Tier 1 · Critical = core customer journeys stop if unavailable. Tier 2 · Important = significant functionality is impaired. Tier 3 · Supporting = limited immediate customer impact. These labels describe impact, not live health or permission to change a service.

A real first release targets roughly 70 services across nine teams. The demonstration contains eight fictional services across five teams, including one overdue record and one incomplete record to exercise exception states. Before an operational release, every Tier 1 record must have an owner-attested review date and validated repository, runbook, and schedule links.

## Success Criteria

| ID | Observable outcome | How to evaluate |
| --- | --- | --- |
| SC-01 | Home → Services takes one click; Services → detail takes one more. | Browser walkthrough and real first-time-user test. |
| SC-02 | A first-time user identifies Payments API's owner and runbook within 30 seconds, without help. | Timed task with at least two people; simulated feedback is not evidence of passing. |
| SC-03 | Commerce + Tier 1 returns only matching services. Returning from detail preserves both filters. | Browser check; ask a tester to repeat it. |
| SC-04 | Pin → Home → refresh preserves the service in a normal browser; unpin removes it. | Browser check including storage-disabled fallback. |
| SC-05 | No results, empty catalog, bad data, missing destinations, overdue review, and unknown IDs all have clear visible outcomes. | Controlled browser fixtures and comprehension review. |
| SC-06 | Core flows work on desktop and mobile widths and by keyboard. | Browser checks; an accessibility audit remains necessary before production. |
| SC-07 | Real users distinguish an on-call schedule link from a live responder and understand an overdue review warning. | Ask two testers to explain each; not validated by the simulated study. |

## Assumptions and Scope

- Alder Systems, the personas, and sample services are fictional. Simulated interviews and observations inform design but do not establish actual user behavior. Business-case savings, costs, adoption, and headcount remain illustrative assumptions.
- Preserve Vue 3, Vue Router 4, Bootstrap 5, Papa Parse, static files, and the list-to-detail flow. No framework migration, database, application server, or build step is needed for the prototype. The existing CDN dependencies require network access; version pinning or internal vendoring is a production deployment decision.
- A real internal rollout relies on existing access-controlled hosting, not an unauthenticated public page. This refines the business case's “no authentication” wording: no login is implemented in this UI, but access control is still necessary for real internal data.
- No deployments, provisioning, catalog editing, dependency mapping, live status, automated discovery, chat integration, analytics tracking, or paging. Understanding a service does not establish that changing it is safe; dependency analysis remains future work.
- A designated Developer Experience steward coordinates quarterly owner checks. The 90-day review threshold is a proposed policy requiring sponsor acceptance. If staffing or protected hosting is unavailable, reconsider the business-case schedule.

## Revision Record

| Area reviewed | Decision from v0.1 to v0.2 | Basis |
| --- | --- | --- |
| Description and scope | Retained read-only discovery; clarify no live status/safety judgment | Business case + technical review |
| Style and theme | Keep simple cards; remove unused image space; use full tier labels | Template review + simulated Jules observation |
| User scenarios | Add stale/incomplete-data scenario; clarify schedule destination | Simulated Sam interview/evaluation |
| Functional requirements | Specify combined search, preserved filters, personal pins, retry and missing states | Competitor flows + design review |
| Key data | Add `last_reviewed`; define validation for ten columns | Trust hypothesis + schema review |
| Success criteria | Separate browser-verifiable behavior from human comprehension/time targets | Evaluation design |
| Assumptions | Separate public fictional demo from protected internal hosting | Hosting documentation |

The whole template has been reviewed. See [research-notes.md](research-notes.md) for source links, interview questions, simulated responses, and the evaluation protocol. Further revision should follow real feedback if the assignment requires observations of actual people.
