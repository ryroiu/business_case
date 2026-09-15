# Signpost - supporting research notes

**Date:** September 15, 2026. **Case:** fictional Alder Systems, continuing the September 7 business case.

## Evidence and method

Competitor findings come from official product documentation and documented interaction flows, not hands-on tests of paid accounts. Technical findings combine official documentation with inspection of this repository. Interviews and participant observations below are deliberately simulated at the project author's request; no people were recruited, interviewed, or observed. They are design hypotheses, not validated demand or measured performance.

## Competitive analysis

| Competitor | Documented features and interaction flow | Implication for Signpost (design judgment) |
| --- | --- | --- |
| Backstage | Open catalog; switch from owned components to All; use inline search and filters; open a component; star it for later. Metadata lives in source control and owners maintain it. [Source B1](https://backstage.io/docs/features/software-catalog/). | Reuse find → detail → pin and owner-reviewed data. A plugin-based portal exceeds this case's first-version scope. |
| Port | Open a catalog page; search entity properties; combine filters; open an entity; preserve a customized view. Table controls include sorting, grouping, and selectable columns. [Source P1](https://docs.port.io/interface-builder/port-interface/page/catalog-page/). | Keep visible team/tier filters and preserve browsing context. Omit configurable layouts from this small catalog. |
| Cortex | Open global Search; enter a query; select an entity. Ownership can be defined or inherited, with dedicated ownership views. [Search C1](https://docs.cortex.io/configure/settings/search), [Ownership C2](https://docs.cortex.io/docs/reference/basics/ownership). | Put owning team and operational destinations near the service title. Avoid advanced query syntax and automatic ownership inference. |

These are feature and flow comparisons, not claims that Signpost is faster, cheaper, or superior in real use. No new vendor pricing was assumed; last week's financial estimates remain scenario assumptions.

## Simulated user interviews

### Questions

1. Think of the last time you needed the owner or runbook for an unfamiliar service. What would you do first, and what would happen next? (Current workflow.)
2. Where would you lose time or lose confidence in the answer? (Pain points.)
3. What would you most want to see immediately in a catalog entry? (Desired changes.)
4. What would make you trust an entry enough to act on it?
5. How would you return to the same services next week, and who should correct mistakes?

### Fictional response summaries

| Persona | Current workflow | Pain point | Desired improvement |
| --- | --- | --- | --- |
| Maya, backend engineer, Commerce, 3 years | Searches the team wiki, then asks in the engineering chat channel; bookmarks recurring services. | Similar service names and an old runbook link make it unclear which entry to use. | Search by name or purpose, visible owner, direct runbook, and pins. |
| Jules, new platform engineer, first month | Starts with the onboarding guide, opens repositories, and asks a teammate to explain ownership. | Team names and tier numbers lack context; knowing a repository does not explain service criticality. | Plain-language tier labels, team filter, and one-sentence purpose. |
| Sam, on-call engineer, Reliability, 18 months | Searches the alert's service name, checks an incident tool for the schedule, and looks for a runbook. | A named individual can be off shift; undated ownership records can be stale. | A link to the maintained schedule, a last-reviewed date, and a clear warning when review is overdue. |

**Synthesis:** Fast lookup, ownership clarity, trust, and a short route back to recurring services are plausible priorities. The interviews motivate requirements; they do not validate the business case's 22-minute weekly saving or 70% adoption estimate.

## Technical feasibility

- **Reuse the starter:** it already loads CSV with Papa Parse and uses Vue Router hash routes. Hash routing avoids server rewrite requirements; Papa Parse supports headers and parse errors. [Vue Router T1](https://router.vuejs.org/guide/essentials/history-mode.html), [Papa Parse T2](https://www.papaparse.com/docs).
- **Pins:** browser localStorage survives normal sessions but can be blocked; values are tied to the browser/origin. Fall back to session-only pins and explain the limitation. [MDN T3](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
- **Hosting:** GitHub Pages serves static HTML, CSS, and JavaScript. It suits a fictional classroom demonstration. A real internal catalog needs access-controlled hosting protecting the CSV as well as the page. The application can omit its own login only when the hosting environment supplies access control. [GitHub T4](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).
- **Data quality:** CSV still needs a defined schema. Validate IDs, required columns, tiers, and links; display missing operational destinations honestly. A date older than 90 days is a proposed review threshold, not a guarantee about accuracy. A future or invalid date is unverified.
- **Scope:** no live incident integration, current on-call lookup, infrastructure changes, dependency graph, or automatic safety assessment. A service's tier describes business impact, not whether it is healthy or safe to change.
- **Operations:** nine teams must review their records; a named catalog steward coordinates quarterly checks. Owner approval and a protected publishing process remain requirements for a real rollout, not capabilities this UI implements.
- **Estimate:** retaining this starter makes the proposed small catalog plausible. The earlier 120 development hours and ten-week schedule are planning assumptions, not validated estimates. Team review, protected hosting, and sample-to-real data replacement are prerequisites for production.

## Prototype evaluation design

Give each participant the same fictional dataset. Do not explain where controls are. Ask them to think aloud. Record success, time, help needed, hesitation, and one direct quote with permission. Stop tasks after two minutes and discuss the difficulty.

1. From Home, find Payments API's owner and its runbook. Target: under 30 seconds without help.
2. Find Commerce services in Tier 1. Open one and return to the filtered list. Target: filters remain intact.
3. Pin Payments API, return Home, and refresh. Target: the pin is still visible; distinguish a browser pin from a shared team favorite.
4. Open Legacy Exporter. Explain whether the listed information is current, and find the next step when an on-call link is missing.

### Simulated participant observations (not empirical test results)

- **Jules, task 2:** In a scenario using abbreviated tier numbers, Jules would need to ask what “T1” means. **Design response:** use “Tier 1 · Critical” and explain all tiers beside the filters. **Validation still needed:** ask a real first-time user to explain criticality in their own words.
- **Sam, tasks 1 and 4:** In a scenario using a generic “On call” action and no review date, Sam could read the entry as current shift information. **Design response:** label the action “On-call schedule,” show the review date, and mark overdue or undated entries. **Validation still needed:** check that a real tester distinguishes a schedule link from live status.

No fictional completion times or success percentages are presented as measured results. The implemented version is separately checked in a browser; those checks belong in the submission's Prototype Evaluation section.

## Revision trace

| Finding | Initial draft | Revised decision |
| --- | --- | --- |
| Ownership trust (simulated Sam interview) | No review date | Add `last_reviewed`; visible age warning; quarterly attestation |
| Tier ambiguity (simulated Jules evaluation) | Tier filter only | Pair tier number with a plain-language impact label |
| Return journey (Port pattern + design review) | Context unspecified | Preserve search, filters, and pinned-only state through detail navigation |
| On-call ambiguity (simulated Sam evaluation) | On-call destination | Explicit schedule link; never imply a live person lookup |
| Hosting feasibility | Static deployment assumption | Public demo contains fictional data; real deployment needs protected hosting |
| Broken or missing data (repository review) | General error message | Retry, explicit missing links, invalid-record rejection, and unknown-ID recovery |
