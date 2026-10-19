# Team 2 Solution - Metrics and Calculations

## Expected outcome
By the end of Team 2's work:
- KPI set includes meaningful additional indicators.
- Calculations remain accurate under all filters.
- Outputs are formatted clearly for users.

## Why this matters
Metrics transform raw data into evidence stakeholders can use for decisions.

## Example implementation snippet
```javascript
function calculateMetrics(filteredSatellites, debris) {
  const activeCount = filteredSatellites.filter((s) => s.status === "active").length;
  const inactiveCount = filteredSatellites.filter((s) => s.status === "inactive").length;
  const totalDebris = debris.reduce((acc, item) => acc + item.estimatedObjects, 0);
  const totalSatellites = filteredSatellites.length;

  const activePercentage = totalSatellites ? (activeCount / totalSatellites) * 100 : 0;
  const inactivePercentage = totalSatellites ? (inactiveCount / totalSatellites) * 100 : 0;
  const debrisPerSatellite = totalSatellites ? totalDebris / totalSatellites : 0;

  return {
    totalSatellites,
    activeCount,
    inactiveCount,
    totalDebris,
    activePercentage: activePercentage.toFixed(1),
    inactivePercentage: inactivePercentage.toFixed(1),
    debrisPerSatellite: debrisPerSatellite.toFixed(1)
  };
}
```

## Observable success indicators
- Metrics update correctly when filters change.
- No divide-by-zero issues.
- Teachers can trace and verify each formula.
