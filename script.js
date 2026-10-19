const state = {
  satellites: [],
  debris: [],
  filters: {
    orbit: "all",
    status: "all"
  }
};

const els = {
  orbitFilter: document.getElementById("orbitFilter"),
  statusFilter: document.getElementById("statusFilter"),
  refreshBtn: document.getElementById("refreshBtn"),
  kpiCards: document.getElementById("kpiCards"),
  visualSummary: document.getElementById("visualSummary"),
  insightsList: document.getElementById("insightsList"),
  qaLog: document.getElementById("qaLog")
};

async function loadData() {
  const [satRes, debrisRes] = await Promise.all([
    fetch("data/satellites.json"),
    fetch("data/debris.json")
  ]);

  state.satellites = await satRes.json();
  state.debris = await debrisRes.json();
}

function applyFilters(satellites) {
  return satellites.filter((sat) => {
    const orbitMatch = state.filters.orbit === "all" || sat.orbit === state.filters.orbit;
    const statusMatch = state.filters.status === "all" || sat.status === state.filters.status;
    return orbitMatch && statusMatch;
  });
}

function calculateMetrics(filteredSatellites, debris) {
  const activeCount = filteredSatellites.filter((s) => s.status === "active").length;
  const inactiveCount = filteredSatellites.filter((s) => s.status === "inactive").length;
  const totalDebris = debris.reduce((acc, item) => acc + item.estimatedObjects, 0);
  const collisionRiskIndex = filteredSatellites.length
    ? ((totalDebris / filteredSatellites.length) / 100).toFixed(2)
    : "0.00";

  return {
    totalSatellites: filteredSatellites.length,
    activeCount,
    inactiveCount,
    totalDebris,
    collisionRiskIndex
  };
}

function renderKpis(metrics) {
  const cards = [
    { label: "Satellites in scope", value: metrics.totalSatellites },
    { label: "Active satellites", value: metrics.activeCount },
    { label: "Inactive satellites", value: metrics.inactiveCount },
    { label: "Estimated debris objects", value: metrics.totalDebris.toLocaleString("en-GB") },
    { label: "Collision risk index", value: metrics.collisionRiskIndex }
  ];

  els.kpiCards.innerHTML = cards
    .map(
      (card) => `
        <article class="kpi-card">
          <p class="kpi-label">${card.label}</p>
          <p class="kpi-value">${card.value}</p>
        </article>
      `
    )
    .join("");
}

function renderVisualSummary(metrics) {
  const total = metrics.totalSatellites || 1;
  const activePct = Math.round((metrics.activeCount / total) * 100);
  const inactivePct = Math.round((metrics.inactiveCount / total) * 100);

  els.visualSummary.innerHTML = `
    <div class="bar-row">
      <span>Active</span>
      <div class="bar-track"><div class="bar-fill" style="width: ${activePct}%"></div></div>
      <strong>${activePct}%</strong>
    </div>
    <div class="bar-row">
      <span>Inactive</span>
      <div class="bar-track"><div class="bar-fill" style="width: ${inactivePct}%"></div></div>
      <strong>${inactivePct}%</strong>
    </div>
  `;
}

function buildInsights(metrics) {
  const insights = [];

  if (metrics.collisionRiskIndex >= 2) {
    insights.push("High debris-to-satellite ratio detected. Prioritise mitigation and avoidance planning.");
  } else {
    insights.push("Debris-to-satellite ratio currently moderate within filtered scope.");
  }

  if (metrics.inactiveCount > metrics.activeCount) {
    insights.push("Inactive satellite count exceeds active count. Review end-of-life disposal policies.");
  } else {
    insights.push("Active satellites outnumber inactive satellites, indicating stronger operational utilisation.");
  }

  insights.push("Recommendation: publish monthly trend snapshots for policy and operations stakeholders.");

  return insights;
}

function renderInsights(insights) {
  els.insightsList.innerHTML = insights.map((item) => `<li>${item}</li>`).join("");
}

function renderQaLog(metrics) {
  const riskClass = metrics.collisionRiskIndex >= 2 ? "status-risk" : "status-good";

  els.qaLog.innerHTML = `
    <p><strong>Agile check-in snapshot</strong></p>
    <ul>
      <li>Data source load: <span class="status-good">successful</span></li>
      <li>Filter controls: <span class="status-good">responding</span></li>
      <li>Current collision risk index: <span class="${riskClass}">${metrics.collisionRiskIndex}</span></li>
      <li>Next action: Team 5 to confirm each team has completed acceptance criteria.</li>
    </ul>
  `;
}

function updateFilters() {
  state.filters.orbit = els.orbitFilter.value;
  state.filters.status = els.statusFilter.value;
  render();
}

function render() {
  const filteredSatellites = applyFilters(state.satellites);
  const metrics = calculateMetrics(filteredSatellites, state.debris);
  const insights = buildInsights(metrics);

  renderKpis(metrics);
  renderVisualSummary(metrics);
  renderInsights(insights);
  renderQaLog(metrics);
}

async function init() {
  try {
    await loadData();
    render();

    els.orbitFilter.addEventListener("change", updateFilters);
    els.statusFilter.addEventListener("change", updateFilters);
    els.refreshBtn.addEventListener("click", render);
  } catch (error) {
    console.error(error);
    els.kpiCards.innerHTML = `<p class="status-risk">Error loading data. Check file paths and JSON format.</p>`;
  }
}

init();
