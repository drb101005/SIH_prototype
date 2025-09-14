let state = {
  lang: "en",
  screen: "welcome",
  messages: [{ type: "bot", text: "👋 Welcome to KisanMitra, your AI farming assistant!" }]
};
const root = document.getElementById("app");
function t(key) { return Lang[state.lang][key] || key; }

function render() {
  root.innerHTML = "";
  const container = document.createElement("div");
  container.className = "container";

  if (state.screen === "welcome") {
    container.innerHTML = `
      <div class="welcome card center">
        <h1>🌾 KisanMitra</h1>
        <div class="welcome-quote">${t("quote")}</div>
        <p>${t("selectLanguage")}</p>
        <div class="col">
          <button class="btn btn-ghost" onclick="setLang('hi')">हिंदी</button>
          <button class="btn btn-ghost" onclick="setLang('mr')">मराठी</button>
          <button class="btn btn-ghost" onclick="setLang('en')">English</button>
        </div>
        <div class="mt-4">
          <button class="btn btn-primary" onclick="go('dashboard')">${t("continue")} →</button>
        </div>
      </div>`;
  }

  if (state.screen === "dashboard") {
    container.innerHTML = `
      <div class="header">
        <div class="header-top">
          <div>
            <h2>${t("dashboard")}</h2>
            <p>${t("goodMorning")}</p>
          </div>
          <div class="flex">
            <button class="btn-ghost btn">${Icons.home()}</button>
            <button class="btn-ghost btn">${Icons.bell()}</button>
          </div>
        </div>
        <div class="header-weather">${Icons.sun()} ${SampleData.weather.today}</div>
      </div>
      <div class="grid-2">
        <button class="card" onclick="go('soil')">${t("soilAnalysis")}</button>
        <button class="card" onclick="go('disease')">${t("diseaseDetection")}</button>
        <button class="card" onclick="go('crops')">${t("cropRecommendation")}</button>
        <button class="card" onclick="go('chat')">${t("askAI")}</button>
        <button class="card" onclick="go('community')">${t("community")}</button>
        <button class="card" onclick="go('knowledge')">${t("knowledge")}</button>
      </div>`;
  }

  if (state.screen === "crops") {
    container.innerHTML = `<h2>${t("cropRecommendation")}</h2>`;
    SampleData.crops.forEach(c=>{
      const card=document.createElement("div");
      card.className="card";
      card.innerHTML=`<h3>${c.crop}</h3><p>${c.yield} • ${c.profit}</p><p>${c.desc}</p>`;
      container.appendChild(card);
    });
    container.innerHTML += `<button class="btn btn-primary mt-4" onclick="go('dashboard')">← ${t("dashboard")}</button>`;
  }

  if (state.screen === "disease") {
    container.innerHTML = `<h2>${t("diseaseDetection")}</h2><p>Upload leaf photo (demo)</p>`;
    SampleData.diseases.forEach(d=>{
      const card=document.createElement("div");
      card.className="card";
      card.innerHTML=`<h3>${d.name}</h3><p>Symptom: ${d.symptom}</p><p>Treatment: ${d.treatment}</p>`;
      container.appendChild(card);
    });
    container.innerHTML += `<button class="btn btn-primary mt-4" onclick="go('dashboard')">← ${t("dashboard")}</button>`;
  }

  if (state.screen === "soil") {
    container.innerHTML = `<h2>${t("soilAnalysis")}</h2>`;
    SampleData.soil.forEach(s=>{
      const card=document.createElement("div");
      card.className="card";
      card.innerHTML=`<h3>pH ${s.pH}</h3><p>${s.suggestion}</p>`;
      container.appendChild(card);
    });
    container.innerHTML += `<button class="btn btn-primary mt-4" onclick="go('dashboard')">← ${t("dashboard")}</button>`;
  }

  if (state.screen === "chat") {
    container.innerHTML = `<h2>${t("askAI")}</h2><div class="chat"><div class="chat-messages" id="chatBox"></div><div class="flex"><input id="chatInput" placeholder="Type here..." style="flex:1;padding:8px"/><button class="btn btn-primary" onclick="sendMsg()">Send</button></div></div>`;
  }

  root.appendChild(container);
  if (state.screen==="chat") renderChat();
}
function go(screen){ state.screen=screen; render(); }
function setLang(l){ state.lang=l; render(); }
function renderChat(){
  const box=document.getElementById("chatBox");
  box.innerHTML="";
  state.messages.forEach(m=>{
    const div=document.createElement("div");
    div.className=`msg ${m.type}`;
    div.textContent=m.text;
    box.appendChild(div);
  });
}
function sendMsg(){
  const inp=document.getElementById("chatInput");
  if(!inp.value) return;
  state.messages.push({type:"user",text:inp.value});
  state.messages.push({type:"bot",text:"This is a demo AI response for: "+inp.value});
  inp.value="";
  render();
}
render();
