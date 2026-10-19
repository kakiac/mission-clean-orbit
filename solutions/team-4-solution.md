# Team 4 Solution - Insights and Recommendations

## Expected outcome
By the end of Team 4's work:
- Insights are dynamically linked to calculated metrics.
- Recommendations are specific, evidence-based and actionable.
- Messaging is suitable for non-technical stakeholders.

## Why this matters
Decision-makers need clear guidance, not only raw numbers.

## Example implementation snippet
```javascript
function buildInsights(metrics) {
  const insights = [];

  insights.push(
    `Executive summary: ${metrics.totalSatellites} satellites in scope with a risk index of ${metrics.collisionRiskIndex}.`
  );

  if (Number(metrics.collisionRiskIndex) >= 2) {
    insights.push(
      "Risk level is high. Action: prioritise collision-avoidance planning and debris mitigation review this quarter."
    );
  } else {
    insights.push(
      "Risk level is moderate. Action: maintain monitoring cadence and publish monthly trend updates."
    );
  }

  if (metrics.inactiveCount > metrics.activeCount) {
    insights.push(
      "Inactive assets exceed active assets. Action: review decommissioning and disposal policy compliance."
    );
  }

  return insights;
}
```

## Observable success indicators
- Recommendations change when underlying metrics change.
- Insight language is concise and stakeholder-focused.
- Team can explain evidence behind each recommendation.
