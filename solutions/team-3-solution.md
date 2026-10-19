# Team 3 Solution - Visualisation and UI

## Expected outcome
By the end of Team 3's work:
- Visual section includes at least one additional informative component.
- Layout is clear on both desktop and mobile widths.
- Accessibility and readability are improved.

## Why this matters
Good UI and visualisation enable non-technical audiences to understand complex information quickly.

## Example implementation snippet
```javascript
function renderOrbitDistribution(filteredSatellites) {
  const counts = { LEO: 0, MEO: 0, GEO: 0 };

  filteredSatellites.forEach((sat) => {
    counts[sat.orbit] += 1;
  });

  const total = filteredSatellites.length || 1;

  return Object.entries(counts)
    .map(([orbit, count]) => {
      const pct = Math.round((count / total) * 100);
      return `
        <div class="bar-row">
          <span>${orbit}</span>
          <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
          <strong>${pct}%</strong>
        </div>
      `;
    })
    .join("");
}
```

## Observable success indicators
- Visuals are labelled and interpretable.
- Data updates are reflected correctly in charts/bars.
- Team can justify accessibility and design decisions.
