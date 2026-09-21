# Signpost — Week 4 planning evaluation

**Date:** September 21, 2026. **Scope:** Plan and task documents, checked against specification v0.2, the Week 4 guides, the existing source, and the September 15 browser report.

This was an AI-assisted document review and direct editing pass. It is not a human sign-off, a new usability study, or a rerun of the earlier application test suite. Ryan's manual review and personal reflection remain the final author steps.

## Starting evidence

- The repository started clean at `0b99db2`. The existing prototype already implements the core catalog, filters, detail views, pins, review warnings, and sample resources.
- The CSV contains eight fictional services across five teams. Commerce + Tier 1 corresponds to Checkout Web and Payments API. Legacy Exporter supplies both an overdue date and missing destinations.
- The specification gives 12 functional requirements, five nonfunctional requirements, and seven success criteria. Simulated research is explicitly labeled; SC-02 and SC-07 have no real-user evidence.
- The course guides/templates were downloaded into [reference](reference/README.md). Their headings and unchanged task Definition of Done informed the drafts. The notes' example backend and AI stack does not match Signpost's scope.
- Actual first drafts were saved before edits: [plan v0.1](../prompt-scratch-pad/drafts/plan-v0.1.md) and [tasks v0.1](../prompt-scratch-pad/drafts/tasks-v0.1.md).

## Evaluation and refinements

| Review question | Issue in the first draft | Direct refinement in v0.2 |
| --- | --- | --- |
| Does the plan reflect the real starting point? | It said the prototype existed but lacked a concise inventory. | Added source revision, file-level baseline, and the original evidence date to plan §6. |
| Could task status misrepresent completed code? | Every new acceptance task was pending, which could be read as every feature being missing. | Explained that status belongs to the new acceptance pass; existing functionality is recorded separately. Preserved the human-review rule. |
| Are tests specific enough to reproduce? | Date checks lacked exact boundaries; performance tasks lacked a sampling method. | Specified 90/91-day behavior, invalid dates, fixed reference date/timezone, ten filter samples, and three cold-cache startup runs. |
| Do dependencies allow a practical order? | Pinned-only tests appeared to rely on a later pin-control task; tester scheduling came too late. | Specified a seeded test pin. Moved scheduling to after T1; sessions still wait for T15–T18. |
| Does acceptance cover important screen variations? | Detail image checks and delayed-load focus needed more explicit coverage. | Added detail image cases and keyboard checks for delayed data, Retry, unknown IDs, and current-section recognition. |
| Can evaluation findings safely lead to release? | A one-hour findings-review task might be mistaken for all corrective implementation. | Required separate traced correction/retest rows and their addition to T21 dependencies. |
| Is all specified work represented? | Coverage was distributed across rows without a single reference table. | Added the FR/NFR/SC coverage table and the total effort range, separate from the business-case budget. |

## Guide and scope checks

- Plan retains all eight course sections, including Tech Stack and Review & Approval. The approach is four plain-language sentences.
- All ten ADRs cite requirement IDs, compare alternatives, and state tradeoffs. Components cite requirements; risks have mitigation and ownership.
- Tasks retain the required columns and four permitted statuses. All 21 tasks trace to requirements/decisions, have an observable pass condition, and are estimated below one day. Their dependencies have no cycle.
- The task Definition of Done retains all three course statements. No task is declared Done without human review; participant availability and sign-off remain visible.
- The scope preserves the four routes, framework, CSV, read-only records, and fictional-data boundary. No app source or prior assignment deliverable is changed by this planning assignment.
- Document links and requirement/task/ADR references are checked before publication. Public URLs are checked after deployment; see [publication verification](week-4-publication.md).

Local validation passed for the eight plan headings, ten ADR IDs, 21 ordered task IDs, permitted statuses, dependency references, FR/NFR coverage, unchanged Definition of Done, and local Markdown file links. The estimated task ranges add up to 24–31 hours; an initial 24–32 total was corrected during validation.

## Author review still needed

Ryan should review whether the decisions and estimates match his intentions, make any personal edits, and enter his own decision in plan §7. The course guide's sign-off-before-tasks sequence has not been fully met: the task document is supplied as a proposed draft for that review. No simulated project approval is substituted for a real author's approval.

The [reflection](week-4-reflection.md) is an AI-assisted draft grounded in this workflow. It should be personalized before being pasted into the assignment's text entry. The future participant study and backlog belong to the later execution/evaluation phase, not to completion of this Week 4 document preparation.
