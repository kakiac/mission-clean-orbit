# Team 1 Solution - Data Ingestion and Validation

## Expected outcome
By the end of Team 1's work:
- Data loading is reliable.
- Invalid records are removed before downstream calculations.
- QA notes include a simple quality signal.

## Why this matters
All other teams depend on trustworthy input data. Validation protects the dashboard from misleading outputs and runtime errors.

## Example implementation snippet
```javascript
function isValidSatellite(record) {
  return Boolean(
    record &&
    record.id &&
    record.name &&
    ["LEO", "MEO", "GEO"].includes(record.orbit) &&
    ["active", "inactive"].includes(record.status)
  );
}

function isValidDebris(record) {
  return Boolean(
    record &&
    ["LEO", "MEO", "GEO"].includes(record.band) &&
    Number.isFinite(record.estimatedObjects) &&
    Number.isFinite(record.year)
  );
}

async function loadData() {
  const [satRes, debrisRes] = await Promise.all([
    fetch("data/satellites.json"),
    fetch("data/debris.json")
  ]);

  const rawSatellites = await satRes.json();
  const rawDebris = await debrisRes.json();

  const validSatellites = rawSatellites.filter(isValidSatellite);
  const validDebris = rawDebris.filter(isValidDebris);

  const removedSatellites = rawSatellites.length - validSatellites.length;
  const removedDebris = rawDebris.length - validDebris.length;

  console.log(`Validation removed ${removedSatellites} satellite rows and ${removedDebris} debris rows.`);

  state.satellites = validSatellites;
  state.debris = validDebris;
}
```

## Observable success indicators
- No crashes when unexpected data appears.
- Clear console log of rejected records.
- Team can explain validation choices to peers.
