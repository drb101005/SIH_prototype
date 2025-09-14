// script.js — app logic
let state = {
  lang: "hi",
  screen: "welcome",
  messages: [{ type: "bot", text: "👋 नमस्ते! मैं आपका स्मार्ट खेती सहायक हूँ।" }]
};

const root = document.getElementById("app");

function t(key) {
  return Lang[state.lang][key] || key;
}

function render() {
  root.innerHTML = "";
  const container = document.createElement("div");
  container.className = "container";

  if (state.screen === "welcome") {
    const card = document.createElement("div");
    card.className = "card welcome-card";
    card.innerHTML = `
      <h1 class="large-title">🌾 किसान मित्र</h1>
      <div class="welcome-quote">${t("quote")}</div>
      <p class="small-text">${t("selectLanguage")}</p>
      <div class="col mt-2">
        <button class="btn btn-ghost" onclick="setLang('hi')">हिंदी</button>
        <button class="btn btn-ghost" onclick="setLang('mr')">मराठी</button>
        <button class="btn btn-ghost" onclick="setLang('en')">English</button>
      </div>
      <div class="mt-4">
        <button class="btn btn-primary" onclick="go('dashboard')">${t("continue")} →</button>
      </div>
    `;
    container.appendChild(card);
  }

  if (state.screen === "dashboard") {
    const header = document.createElement("div");
    header.className = "header";
    header.innerHTML = `
      <div class="header-top">
        <div>
          <h2>${t("dashboard")}</h2>
          <p>${t("goodMorning")}</p>
        </div>
        <div class="flex">
          <button class="btn-ghost btn" onclick="go('dashboard')">${Icons.home()}</button>
          <button class="btn-ghost btn" onclick="alert('Show Notifications')">${Icons.bell()}</button>
        </div>
      </div>
      <div class="header-weather">
        ${Icons.sun()} <div>28°C • Sunny</div>
      </div>
    `;
    container.appendChild(header);

    const actions = document.createElement("div");
    actions.className = "grid-2";
    actions.innerHTML = `
      <button class="card">${t("soilAnalysis")}</button>
      <button class="card">${t("diseaseDetection")}</button>
      <button class="card">${t("askAI")}</button>
      <button class="card">${t("community")}</button>
      <button class="card">${t("knowledge")}</button>
    `;
    container.appendChild(actions);
  }

  root.appendChild(container);
}

function go(screen) {
  state.screen = screen;
  render();
}

function setLang(l) {
  state.lang = l;
  render();
}

// Initial render
render();
