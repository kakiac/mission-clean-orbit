# Team 5 Solution - Agile Check-ins, Integration and QA

## Expected outcome
By the end of Team 5's work:
- Regular agile check-ins are completed with all teams.
- Blockers are visible and managed promptly.
- Integration quality is evidenced through a final QA summary.

## Why this matters
Strong facilitation and QA practices improve delivery reliability and team coordination, even when coding contribution is lower.

## Example implementation snippet (QA panel update)
```javascript
function renderQaLog(metrics) {
  const riskClass = Number(metrics.collisionRiskIndex) >= 2 ? "status-risk" : "status-good";

  els.qaLog.innerHTML = `
    <p><strong>Agile check-in summary</strong></p>
    <ul>
      <li>Team 1 (Data): complete, no blockers.</li>
      <li>Team 2 (Metrics): complete, formulas verified.</li>
      <li>Team 3 (UI): complete, responsive checks passed.</li>
      <li>Team 4 (Insights): complete, recommendations linked to data.</li>
      <li>Overall risk index: <span class="${riskClass}">${metrics.collisionRiskIndex}</span></li>
      <li>Release recommendation: GO for presentation.</li>
    </ul>
  `;
}
```

## Suggested agile check-in cadence
- Minute 15: Team setup confirmation
- Minute 22: Progress and blockers
- Minute 29: Dependency and hand-off check
- Minute 36: Integration readiness
- Minute 42: QA pass/fail and fix priorities

## Observable success indicators
- Each check-in produces clear actions.
- Integration issues are identified early.
- Final release decision is evidence-based.
