# Team 1 Starter Task - Data Ingestion and Validation

## Team mission
Prepare reliable data for the rest of the dashboard teams.

## Student starter tasks
1. Open `script.js` and locate `loadData()`.
2. Add validation checks so the app confirms each satellite object contains:
   - `id`
   - `name`
   - `orbit`
   - `status`
3. Add validation checks so debris objects contain:
   - `band`
   - `estimatedObjects`
   - `year`
4. Create a helper function called `isValidSatellite(record)`.
5. Create a helper function called `isValidDebris(record)`.
6. Filter out invalid rows and log how many records were removed.
7. Add one example of graceful fallback behaviour if a dataset fails to load.

## Success criteria (how you know you have succeeded)
- Dashboard still loads when valid data is present.
- Invalid records are excluded from calculations.
- Console output clearly states number of invalid rows removed.
- You can explain to another team why data validation improves trust.

## Suggested stretch task
Add a visible warning in the QA panel if more than 10% of rows are rejected.
