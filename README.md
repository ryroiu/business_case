# Signpost - internal service catalog prototype

Signpost is a fictional service catalog for Alder Systems, continuing the [business case](docs/design/business-case.md). The prototype helps engineers find owners, runbooks, and on-call schedules, then pin services for later.

## Design and submission

- [Revised specification, v0.2](docs/design/specification.md)
- [Initial specification, v0.1](docs/design/specification-v0.1.md)
- [Original course template](docs/design/specification-template.md)
- [Research notes and simulated feedback](docs/design/research-notes.md)
- [Submission report with prototype images](docs/design/submission.md)
- [Submission PDF](output/pdf/signpost-submission.pdf)
- [Style guide](docs/design/style-guide.html)
- [Browser verification](docs/design/browser-checks.md)

The company, service data, interview responses, and participant observations are fictional. The report clearly distinguishes those simulations from real documentation research and browser checks.

## Preview and evaluate

Serve this folder with a local static web server (for example, `python3 -m http.server 8765`), then open `http://localhost:8765`. Network access is needed for the existing external Vue, Bootstrap, and Papa Parse libraries. Opening index.html directly as a local file will not load CSV reliably.

1. Open Services, search for Payments API, and follow its detail and sample runbook links.
2. Filter by Commerce and Tier 1, open a service, and return to the same results.
3. Pin a service, return Home, and refresh. Unpin it to remove the shortcut.
4. Open Legacy Exporter to examine an overdue review and missing links.

All operational destinations lead to fictional resource explanations. The app remains read-only and keeps the original four routes, framework, and CSV data source.

## Publication

The [live prototype](https://ryroiu.github.io/business_case/) and required [GitHub Pages specification](https://ryroiu.github.io/business_case/docs/design/specification.md) were verified in a browser on September 15, 2026. The specification displays version 0.2. The published prototype passed service browsing, search, detail navigation, direct-link refresh, and sample-runbook checks.

Only fictional demonstration data belongs on the public site. Any real internal catalog requires protected hosting and team-reviewed records.
