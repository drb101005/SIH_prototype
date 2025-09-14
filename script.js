/* script.js - Vanilla app implementing the original React app flows.
   Full features: welcome -> tour -> setup -> environmental -> dashboard -> soil/leaf uploads -> manual entry -> crop recommendations -> detailed plan -> disease results -> community -> knowledge -> chat
   Language switching updates UI instantly using LANG from lang.js
*/

// ---------- Sample data (copied/adapted from your uploaded file) ----------
const SAMPLE = {
  user: { name: "राम शर्मा", phone: "+91 9876543210", location: "Pune, Maharashtra", preferredLanguage: "hi" },
  weatherData: { temperature: "28°C", humidity: "65%", rainfall: "800mm/year", forecast: "Sunny" },
  cropRecommendations: [
    { name: "Wheat", rating: 5, expectedYield: 25, profit: 45000, reason: "High market demand, suitable soil conditions", details:{
        forecast:{yield:25,demand:85,profit:45000},
        cost:{seeds:4000,fertilizer:6000,water:3000,labor:10000,misc:2000},
        rationale:"Wheat is highly suitable for your region's loamy soil and winter climate. Market prices are consistently strong, and it's an MSP-supported crop, ensuring profit.",
        guidance:{planting:"Sow seeds in November. Maintain row spacing of 20-22 cm. Seed depth should be 5 cm.",fertilizers:"Basal Dose: 50kg N, 60kg P, 40kg K per hectare.",pestControl:"Watch for aphids and termites. Use recommended pesticides."},
        calculator:{seedRate:100,fertilizerRate:150},
        schemes:["PM-KISAN","Pradhan Mantri Fasal Bima Yojana (PMFBY)","MSP for Wheat"]
    }},
    { name: "Maize", rating: 5, expectedYield: 30, profit: 40000, reason: "Good for your soil type, drought resistant", details:{
        forecast:{yield:30,demand:75,profit:40000},
        cost:{seeds:3500,fertilizer:5000,water:2500,labor:9000,misc:1500},
        rationale:"Maize is a hardy crop that performs well in loamy soil and is relatively drought-resistant.",
        guidance:{planting:"Best sown during Kharif season (June-July).",fertilizers:"Apply 120kg N, 60kg P, and 40kg K per hectare.",pestControl:"Stem borer is a common pest."},
        calculator:{seedRate:20,fertilizerRate:120}, schemes:["NFSM","RKVY"]
    }},
    { name: "Cotton", rating: 4, expectedYield: 8, profit:35000, reason:"Current market prices favorable", details:{
        forecast:{yield:8,demand:90,profit:35000},
        cost:{seeds:5000,fertilizer:7000,water:4000,labor:12000,misc:2500},
        rationale:"Favorable market prices and high demand from the textile industry.",
        guidance:{planting:"Sowing time is April-May.",fertilizers:"Balanced NPK.",pestControl:"Pink bollworm and whitefly are major threats."},
        calculator:{seedRate:15,fertilizerRate:160}, schemes:["Technology Mission on Cotton","CCI procurement"]
    }}
  ],
  diseaseAnalysis: { disease: "Leaf Blight", confidence: 87, severity: "Medium", treatment: ["Spray Mancozeb 75% WP", "2g per liter water", "Apply in evening", "Repeat after 7 days"] },
  communityPosts: [
    { author: "राम शर्मा", location: "Pune", time: "2h", content: "Cotton prices up 15% in local mandi today!", likes: 25, comments: 12 },
    { author: "Dr. Priya", location: "Agri Expert", time: "4h", content: "Monsoon forecast looks good for wheat sowing", likes: 120, comments: 45 }
  ],
  knowledgeVideos: [
    { id:1, title:"How to Start Organic Farming", channel:"Farming Guru", thumbnail:"https://i.ytimg.com/vi/a_II-y-aG4U/hqdefault.jpg", url:"https://www.youtube.com/watch?v=a_II-y-aG4U"},
    { id:2, title:"Modern Drip Irrigation Techniques", channel:"AgriTech India", thumbnail:"https://i.ytimg.com/vi/SgRuh8f_a-w/hqdefault.jpg", url:"https://www.youtube.com/watch?v=SgRuh8f_a-w"},
    { id:3, title:"Soil Health Management for Better Yields", channel:"Kisan Talks", thumbnail:"https://i.ytimg.com/vi/3b-y-w-Y-qQ/hqdefault.jpg", url:"https://www.youtube.com/watch?v=3b-y-w-Y-qQ"}
  ],
  notifications: [
    { id:1, type:'scheme', text:'New subsidy available for solar water pumps under PM-KUSUM. Apply now!', time:'Yesterday' },
    { id:2, type:'weather', text:'Rainfall expected in your area in the next 48 hours. Plan irrigation accordingly.', time:'2 days ago' },
    { id:3, type:'market', text:'Maize prices have increased by 5% in the local mandi.', time:'3 days ago' }
  ]
};

// ---------- App State ----------
const STATE = {
  lang: SAMPLE.user.preferredLanguage || 'hi',
  screen: 'welcome',
  tourStep: 0,
  form: {},
  uploadedImage: null,
  detailedCrop: null,
  messages: [{type:'bot', text: (LANG[SAMPLE.user.preferredLanguage] || LANG.en).voicePrompt}],
  showNotifications: false
};

// ---------- DOM root ----------
const ROOT = document.getElementById('app');

// ---------- Helpers ----------
function t(key){ return (LANG[STATE.lang] && LANG[STATE.lang][key]) || (LANG.en[key] || key); }
function el(tag, cls, html){ const e = document.createElement(tag); if(cls) e.className = cls; if(html!==undefined) e.innerHTML = html; return e; }
function clearRoot(){ ROOT.innerHTML = ''; }
function icon(name){ return Icon[name] ? Icon[name]() : ''; }

// ---------- Renderers for each screen ----------

function renderWelcome(){
  const root = el('div','welcome-screen');
  const card = el('div','card welcome-card');

  // Header / brand
  const brandWrap = el('div','col');
  const brand = el('div','brand','🌾 किसान मित्र — KisanMitra');
  const sub = el('div','small', 'AI Farming Co-Pilot');
  brandWrap.appendChild(brand); brandWrap.appendChild(sub);

  // Quote
  const quote = el('div','quote', t('quote'));

  // Language selector
  const langWrap = el('div','col');
  langWrap.appendChild(el('div','section-title', t('selectLanguage')));
  const langList = el('div','lang-list');
  [{code:'hi',name:'हिंदी'},{code:'mr',name:'मराठी'},{code:'en',name:'English'}].forEach(l=>{
    const b = el('button','lang-btn', `<span>${l.name}</span><strong>${STATE.lang===l.code? '✓':''}</strong>`);
    if(STATE.lang===l.code) b.classList.add('active');
    b.onclick = () => { STATE.lang = l.code; render(); };
    langList.appendChild(b);
  });
  langWrap.appendChild(langList);

  // Voice prompt card
  const voiceCard = el('div','card');
  voiceCard.innerHTML = `<div style="display:flex;align-items:center;gap:12px">${icon('play')}<div><div style="font-weight:700">${t('voicePrompt')}</div><div class="small" style="margin-top:6px">${t('selectLanguage')}</div></div></div>`;

  // CTA
  const ctaRow = el('div','flex');
  const cta = el('button','btn btn-primary', t('continue') + ' →');
  cta.onclick = () => { STATE.screen='tour'; render(); };
  const skip = el('button','btn btn-ghost', t('skipToSetup'));
  skip.onclick = () => { STATE.screen='farmSetup'; render(); };
  ctaRow.appendChild(cta); ctaRow.appendChild(skip);

  // assemble
  card.appendChild(brandWrap);
  card.appendChild(quote);
  card.appendChild(langWrap);
  card.appendChild(voiceCard);
  card.appendChild(ctaRow);

  root.appendChild(card);
  return root;
}

function renderTour(){
  const wrap = el('div','card');
  const steps = [
    {title:t('soilAnalysis'), desc:t('learnNewTechniques'), icon:'leaf', color:'#84cc16'},
    {title:t('diseaseDetection'), desc:t('watchVideo'), icon:'info', color:'#60a5fa'},
    {title:t('community'), desc:t('learnNewTechniques'), icon:'users', color:'#8b5cf6'},
    {title:t('knowledge'), desc:t('learnNewTechniques'), icon:'play', color:'#fb923c'}
  ];
  const s = steps[STATE.tourStep];

  wrap.innerHTML = `<div style="text-align:center;padding:18px"><div style="width:88px;height:88px;border-radius:999px;background:linear-gradient(135deg,rgba(255,255,255,0.4),rgba(255,255,255,0.2));display:inline-flex;align-items:center;justify-content:center;font-size:36px;margin-bottom:12px">${icon(s.icon)||'🌾'}</div><h2 class="section-title">${s.title}</h2><p class="small">${s.desc}</p></div>`;
  // dots + controls
  const dots = el('div','flex'); dots.style.justifyContent='center';
  steps.forEach((_,i)=>{
    const d = el('div', '', '●'); d.style.opacity = i===STATE.tourStep?1:0.25; d.style.margin='0 6px'; d.style.cursor='pointer';
    d.onclick = ()=>{ STATE.tourStep=i; render(); };
    dots.appendChild(d);
  });

  const controls = el('div','flex'); controls.style.justifyContent='space-between';
  const back = el('button','btn-ghost btn', '← ' + t('skipToSetup')); back.onclick = ()=>{ STATE.screen='farmSetup'; render(); };
  const next = el('button','btn btn-primary', (STATE.tourStep<steps.length-1? t('continue') : t('continue')) + ' →');
  next.onclick = ()=>{
    if(STATE.tourStep < steps.length-1){ STATE.tourStep++; render(); } else { STATE.screen='farmSetup'; render(); }
  };
  controls.appendChild(back); controls.appendChild(next);

  wrap.appendChild(dots); wrap.appendChild(controls);
  const outer = el('div','min-h-screen'); outer.appendChild(wrap);
  return outer;
}

function renderFarmSetup(){
  const wrap = el('div','columns');
  const left = el('div','card');
  left.appendChild(el('div','section-title','🌾 ' + t('farmSetupTitle')));

  // Location block
  const loc = el('div','col');
  loc.appendChild(el('label','small', t('farmLocation')));
  const locBtns = el('div','flex');
  const gps = el('button','btn-ghost btn', icon('home') + ' ' + t('gpsAutoDetect'));
  gps.onclick = ()=>{ STATE.form.location = SAMPLE.user.location; render(); };
  const manual = el('button','btn-ghost btn', icon('info') + ' ' + t('manual'));
  manual.onclick = ()=>{ STATE.form.manualLocation = !STATE.form.manualLocation; render(); };
  locBtns.appendChild(gps); locBtns.appendChild(manual);
  loc.appendChild(locBtns);
  if(STATE.form.manualLocation){
    const sel = el('select',''); sel.innerHTML = `<option>${t('selectLanguage')}</option><option>Maharashtra</option><option>Punjab</option><option>Uttar Pradesh</option>`;
    loc.appendChild(sel);
  } else if(STATE.form.location){
    loc.appendChild(el('div','small','✅ ' + t('locationDetected') + ' ' + STATE.form.location));
  }
  left.appendChild(loc);

  // Land details
  left.appendChild(el('label','small','🌾 ' + t('landDetails')));
  const landRow = el('div','flex');
  const landInput = el('input',''); landInput.type='number'; landInput.placeholder='5'; landInput.value = STATE.form.landSize || '';
  landInput.oninput = (e)=>{ STATE.form.landSize = e.target.value; };
  const unitSelect = el('select',''); unitSelect.innerHTML = `<option>${t('acre')}</option><option>${t('hectare')}</option>`;
  landRow.appendChild(landInput); landRow.appendChild(unitSelect);
  left.appendChild(landRow);

  // irrigation
  const ir = el('select',''); ir.innerHTML = `<option>${t('irrigationSource')}</option><option>${t('borewell')}</option><option>${t('canal')}</option><option>${t('rainFed')}</option><option>${t('dripIrrigation')}</option>`;
  ir.onchange = (e)=> STATE.form.irrigation = e.target.value;
  left.appendChild(ir);

  // water availability
  left.appendChild(el('label','small','💧 ' + t('waterAvailability')));
  const waRow = el('div','flex');
  ['low','medium','high'].forEach(k=>{
    const btn = el('button','btn-ghost btn', t(k));
    if(STATE.form.waterAvailability===k) btn.classList.add('active');
    btn.onclick = ()=>{ STATE.form.waterAvailability = k; render(); };
    waRow.appendChild(btn);
  });
  left.appendChild(waRow);

  // budget
  left.appendChild(el('label','small','💰 ' + t('budgetOptional')));
  const budget = el('input',''); budget.type='number'; budget.placeholder='50000'; budget.value = STATE.form.budget || '';
  budget.oninput = (e)=> STATE.form.budget = e.target.value;
  left.appendChild(budget);
  left.appendChild(el('div','small','₹ ' + t('perSeason')));

  // action
  const save = el('button','btn btn-primary', t('saveAndContinue') || t('continue') + ' →');
  save.onclick = ()=>{ STATE.screen='environmentalData'; render(); };
  left.appendChild(save);

  // Right column: preview / tips
  const right = el('div','card');
  right.appendChild(el('div','section-title', t('environmentalDataTitle')));
  right.appendChild(el('div','small', t('soilAndClimateInfo') || 'Soil and climate info'));
  right.appendChild(el('hr'));
  right.appendChild(el('div','small','Weather: ' + SAMPLE.weatherData.temperature + ' • ' + SAMPLE.weatherData.forecast));
  right.appendChild(el('div','small','Humidity: ' + SAMPLE.weatherData.humidity));
  right.appendChild(el('div','small','Location: ' + (STATE.form.location || SAMPLE.user.location)));

  wrap.appendChild(left); wrap.appendChild(right);
  return wrap;
}

function renderEnvironmental(){
  const wrap = el('div','card');
  wrap.appendChild(el('div','section-title','🌱 ' + t('environmentalDataTitle')));
  wrap.appendChild(el('div','small', t('soilAndClimateInfo')));
  const soil = el('div','card'); soil.innerHTML = `<h4 class="small">Soil Information</h4><div class="small">Type: Loamy<br>pH: 6.8<br>Organic Matter: 2.1%</div>`;
  const climate = el('div','card'); climate.innerHTML = `<h4 class="small">Climate</h4><div class="small">Rainfall: ${SAMPLE.weatherData.rainfall}<br>Temp Range: 22-35°C</div>`;
  wrap.appendChild(soil); wrap.appendChild(climate);
  const done = el('button','btn btn-primary', 'Complete Setup ✅'); done.onclick = ()=>{ STATE.screen='dashboard'; render(); };
  wrap.appendChild(done);
  return wrap;
}

function renderHeader(){
  const header = el('div','header card');
  const row = el('div','header-row');
  const left = el('div','header-left');
  left.innerHTML = `<div style="font-weight:800">${t('mainDashboard')}</div><div class="header-sub">${t('goodMorning')}, ${SAMPLE.user.name}</div>`;
  const right = el('div','flex');
  const homeBtn = el('button','btn-icon', icon('home')); homeBtn.onclick = ()=>{ STATE.screen='dashboard'; render(); };
  const notifBtn = el('button','btn-icon', icon('bell')); notifBtn.onclick = ()=>{ STATE.showNotifications = !STATE.showNotifications; render(); };
  right.appendChild(homeBtn); right.appendChild(notifBtn);
  row.appendChild(left); row.appendChild(right);
  header.appendChild(row);
  // small weather
  const weather = el('div','header-sub'); weather.innerHTML = `<div class="flex">${icon('sun')}<div style="margin-left:10px"><strong>${SAMPLE.weatherData.temperature}</strong><div class="small">${SAMPLE.weatherData.forecast}</div></div></div>`;
  header.appendChild(weather);
  return header;
}

function renderNotifications(){
  if(!STATE.showNotifications) return null;
  const overlay = el('div','card'); overlay.style.position='fixed'; overlay.style.inset='0'; overlay.style.background='rgba(0,0,0,0.28)'; overlay.style.display='flex'; overlay.style.alignItems='flex-start'; overlay.style.justifyContent='center'; overlay.style.padding='24px'; overlay.onclick = ()=>{ STATE.showNotifications=false; render(); };
  const panel = el('div','card'); panel.style.maxWidth='380px'; panel.style.marginTop='40px'; panel.onclick = e=>e.stopPropagation();
  panel.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center"><div style="font-weight:800">${t('notifications')}</div><button class="btn-icon" onclick="(function(){STATE.showNotifications=false;render();})()">${Icon['bell']()}</button></div>`;
  SAMPLE.notifications.forEach(n=>{
    const item = el('div','list-item'); item.innerHTML = `<div class="list-left"><div style="width:40px;height:40px;border-radius:10px;background:#f3f4f6;display:flex;align-items:center;justify-content:center;margin-right:10px">${n.type==='scheme'?Icon.info(): n.type==='weather'?Icon.sun():Icon.chart()}</div><div><div class="small">${n.text}</div><div class="small" style="color:#9aa0a6;margin-top:6px">${n.time}</div></div></div>`;
    panel.appendChild(item);
  });
  overlay.appendChild(panel);
  return overlay;
}

function renderDashboard(){
  const page = el('div','col');
  const header = renderHeader();
  page.appendChild(header);

  // Options
  const opts = el('div','card');
  opts.appendChild(el('div','section-title', t('choosePath')));
  const soilBtn = el('button','btn btn-primary'); soilBtn.style.width='100%'; soilBtn.innerHTML = `${icon('leaf')}  ${t('soilAnalysis')} — ${t('quickActions')}`; soilBtn.onclick = ()=>{ STATE.screen='soilPath'; render(); };
  const diseaseBtn = el('button','btn btn-primary'); diseaseBtn.style.width='100%'; diseaseBtn.style.marginTop='10px'; diseaseBtn.innerHTML = `${icon('info')}  ${t('diseaseDetection')}`; diseaseBtn.onclick = ()=>{ STATE.screen='leafPath'; render(); };
  opts.appendChild(soilBtn); opts.appendChild(diseaseBtn);
  page.appendChild(opts);

  // Quick actions grid
  const quick = el('div','card');
  quick.innerHTML = `<div class="section-title">📱 ${t('quickActions')}</div>`;
  const grid = el('div','flex'); grid.style.justifyContent='space-between';
  const q1 = el('button','card'); q1.style.flex='1'; q1.style.marginRight='8px'; q1.innerHTML = `<div style="text-align:center">${icon('play')}<div class="small">${t('askAI')}</div></div>`; q1.onclick = ()=>{ STATE.screen='chat'; render(); };
  const q2 = el('button','card'); q2.style.flex='1'; q2.style.marginRight='8px'; q2.innerHTML = `<div style="text-align:center">${icon('users')}<div class="small">${t('community')}</div></div>`; q2.onclick = ()=>{ STATE.screen='community'; render(); };
  const q3 = el('button','card'); q3.style.flex='1'; q3.innerHTML = `<div style="text-align:center">${icon('play')}<div class="small">${t('knowledge')}</div></div>`; q3.onclick = ()=>{ STATE.screen='knowledge'; render(); };
  grid.appendChild(q1); grid.appendChild(q2); grid.appendChild(q3);
  quick.appendChild(grid);
  page.appendChild(quick);

  // Recommendations preview
  const recCard = el('div','card');
  recCard.appendChild(el('div','section-title','🎯 Top Crop Recommendations'));
  SAMPLE.cropRecommendations.slice(0,3).forEach((c,i)=>{
    const item = el('div','list-item');
    item.innerHTML = `<div class="list-left"><div style="font-weight:800;font-size:18px">${c.name}</div><div class="small">${c.reason}</div></div><div style="text-align:right"><div style="font-weight:800;color:var(--accent-green)">₹${c.profit.toLocaleString()}</div><button class="btn-ghost btn" style="margin-top:8px">View Plan</button></div>`;
    const btn = item.querySelector('button'); btn.onclick = ()=>{ STATE.detailedCrop = c; STATE.screen='detailedPlan'; render(); };
    recCard.appendChild(item);
  });
  page.appendChild(recCard);

  return page;
}

function renderSoilPath(){
  const page = el('div','col');
  page.appendChild(el('div','section-title','📸 Soil Photo Upload'));
  const uploadCard = el('div','card');
  const box = el('div','upload-box');
  if(STATE.uploadedImage){
    box.innerHTML = `<img src="${STATE.uploadedImage}" style="width:140px;height:140px;object-fit:cover;border-radius:10px;display:block;margin:0 auto 12px"/><div class="small" style="color:green">✅ Soil image uploaded!</div>`;
  } else {
    box.innerHTML = `<div style="font-size:28px;color:#9aa0a6">${icon('camera')}</div><div class="small">Tap to take soil photo (demo)</div>`;
    box.onclick = ()=>{ STATE.uploadedImage = 'https://placehold.co/200x200/c2b280/FFFFFF?text=Soil'; render(); };
  }
  uploadCard.appendChild(box);
  uploadCard.appendChild(el('div','small','Tips: Clear bright light, 6 inches from soil, avoid shadows'));
  const row = el('div','flex');
  const g = el('button','btn-ghost btn','Gallery'); g.onclick = ()=>{ STATE.uploadedImage='https://placehold.co/200x200/c2b280/FFFFFF?text=Soil'; render(); };
  const c = el('button','btn btn-primary','Camera'); c.onclick = ()=>{ STATE.uploadedImage='https://placehold.co/200x200/c2b280/FFFFFF?text=Soil'; render(); };
  row.appendChild(g); row.appendChild(c);
  uploadCard.appendChild(row);
  if(STATE.uploadedImage){
    const gen = el('button','btn btn-primary','Generate Recommendations ✨'); gen.onclick = ()=>{ STATE.screen='cropRecommendation'; render(); };
    uploadCard.appendChild(gen);
  }
  page.appendChild(uploadCard);
  return page;
}

function renderLeafPath(){
  const page = el('div','col');
  page.appendChild(el('div','section-title','🍃 Leaf Disease Detection'));
  const card = el('div','card');
  const sel = el('select',''); sel.innerHTML = `<option>Rice</option><option>Wheat</option><option>Cotton</option>`;
  card.appendChild(el('div','small','Select your crop')); card.appendChild(sel);
  const box = el('div','upload-box');
  if(STATE.uploadedImage){
    box.innerHTML = `<img src="${STATE.uploadedImage}" style="width:140px;height:140px;object-fit:cover;border-radius:10px;display:block;margin:0 auto 12px"/><div class="small" style="color:blue">✅ Leaf uploaded</div>`;
  } else {
    box.innerHTML = `<div style="font-size:28px;color:#60a5fa">${icon('leaf')}</div><div class="small">Upload leaf photo</div>`;
    box.onclick = ()=>{ STATE.uploadedImage='https://placehold.co/200x200/90ee90/FFFFFF?text=Leaf'; render(); };
  }
  card.appendChild(box);
  const row = el('div','flex'); const g = el('button','btn-ghost btn','Gallery'); g.onclick=()=>{ STATE.uploadedImage='https://placehold.co/200x200/90ee90/FFFFFF?text=Leaf'; render(); }; const c = el('button','btn btn-primary','Camera'); c.onclick=()=>{ STATE.uploadedImage='https://placehold.co/200x200/90ee90/FFFFFF?text=Leaf'; render(); };
  row.appendChild(g); row.appendChild(c);
  card.appendChild(row);
  if(STATE.uploadedImage){ const a = el('button','btn btn-primary','Analyze Disease 🔍'); a.onclick=()=>{ STATE.screen='diseaseResults'; render(); }; card.appendChild(a); }
  page.appendChild(card);
  return page;
}

function renderDiseaseResults(){
  const page = el('div','col');
  page.appendChild(el('div','section-title','🔍 Disease Analysis'));
  const card = el('div','card');
  card.innerHTML = `<div style="background:#fff6ef;border-radius:10px;padding:12px;margin-bottom:12px"><strong>⚠ ${SAMPLE.diseaseAnalysis.disease}</strong><div class="small">Confidence: ${SAMPLE.diseaseAnalysis.confidence}% • Severity: ${SAMPLE.diseaseAnalysis.severity}</div></div>`;
  const ul = el('ul','small'); SAMPLE.diseaseAnalysis.treatment.forEach(s => { const li = el('li','', s); ul.appendChild(li); });
  card.appendChild(el('div','small','Treatment Plan:')); card.appendChild(ul);
  const call = el('button','btn btn-primary', icon('phone') + ' ' + t('callExpert')); call.onclick = ()=> alert('Calling expert...');
  const buy = el('button','btn btn-primary', icon('play') + ' ' + t('buyMedicine')); buy.style.marginLeft='8px'; buy.onclick = ()=> alert('Open shop (demo)');
  card.appendChild(call); card.appendChild(buy);
  page.appendChild(card);
  return page;
}

function renderCropRecommendation(){
  const page = el('div','col');
  page.appendChild(el('div','section-title','🎯 ' + t('viewDetailedPlan')));
  SAMPLE.cropRecommendations.forEach((c,i)=>{
    const card = el('div','card');
    card.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center"><div><strong>${i+1}. ${c.name}</strong><div class="small">${c.reason}</div></div><div style="text-align:right"><div style="color:var(--accent-green);font-weight:800">₹${c.profit.toLocaleString()}</div><div class="small">per acre</div></div></div>`;
    const view = el('button','btn btn-primary','View Plan'); view.style.marginTop='12px';
    view.onclick = ()=>{ STATE.detailedCrop = c; STATE.screen='detailedPlan'; render(); };
    card.appendChild(view);
    page.appendChild(card);
  });
  return page;
}

function renderDetailedPlan(){
  const crop = STATE.detailedCrop;
  if(!crop) { STATE.screen='cropRecommendation'; return render(); }
  const page = el('div','col');
  page.appendChild(el('div','section-title', `${t('detailedPlanFor')} ${crop.name}`));

  // Forecast/Stats
  const forecastCard = el('div','card'); forecastCard.innerHTML = `<div class="small"><strong>${t('forecast')}</strong></div>
    <div class="small">Yield: ${crop.details.forecast.yield} q/acre • Demand: ${crop.details.forecast.demand}% • Profit: ₹${crop.details.forecast.profit.toLocaleString()}</div>`;
  page.appendChild(forecastCard);

  // Cost breakdown
  const costCard = el('div','card'); let total=0; Object.entries(crop.details.cost).forEach(([k,v])=>{ total+=v; costCard.appendChild(el('div','small', `${k.charAt(0).toUpperCase()+k.slice(1)}: ₹${v.toLocaleString()}`)); });
  costCard.appendChild(el('hr')); costCard.appendChild(el('div','small','Total Cost: ₹' + total.toLocaleString())); costCard.appendChild(el('div','small','Net Profit: ₹' + crop.profit.toLocaleString()));
  page.appendChild(costCard);

  // Rationale & guidance
  const why = el('div','card'); why.appendChild(el('div','section-title', t('whyThisCrop'))); why.appendChild(el('div','small', crop.details.rationale));
  page.appendChild(why);

  const guide = el('div','card'); guide.appendChild(el('div','section-title', t('cultivationGuide')));
  const tabs = el('div','flex'); ['planting','fertilizers','pestControl'].forEach(k=>{
    const tab = el('button','btn-ghost btn', t(k) || k); tab.onclick = ()=>{ guideContent.innerText = crop.details.guidance[k]; };
    tabs.appendChild(tab);
  });
  guide.appendChild(tabs);
  const guideContent = el('div','small', crop.details.guidance.planting);
  guide.appendChild(guideContent);
  page.appendChild(guide);

  // calculator
  const calc = el('div','card'); calc.appendChild(el('div','section-title', t('resourceCalculator')));
  const areaRow = el('div','flex'); const areaInput = el('input',''); areaInput.type='number'; areaInput.value = 1; areaInput.oninput = ()=> updateCalc();
  areaRow.appendChild(areaInput); calc.appendChild(el('div','small', t('yourLandSize'))); calc.appendChild(areaRow);
  const calcResult = el('div','small'); calc.appendChild(calcResult);
  function updateCalc(){ const a = Number(areaInput.value)||1; calcResult.innerHTML = `${t('requiredSeeds')}: ${(a*crop.details.calculator.seedRate).toFixed(1)} kg<br>${t('requiredFertilizer')}: ${(a*crop.details.calculator.fertilizerRate).toFixed(1)} kg`; }
  updateCalc();
  page.appendChild(calc);

  // schemes
  const schemes = el('div','card'); schemes.appendChild(el('div','section-title', t('govtSchemes')));
  const ul = el('ul','small'); crop.details.schemes.forEach(s => ul.appendChild(el('li','', s))); schemes.appendChild(ul);
  page.appendChild(schemes);

  return page;
}

function renderCommunity(){
  const page = el('div','col');
  page.appendChild(el('div','section-title','👥 ' + t('community')));
  SAMPLE.communityPosts.forEach(p=>{
    const card = el('div','card'); card.innerHTML = `<div style="display:flex;gap:12px;align-items:center"><div style="width:48px;height:48px;border-radius:999px;background:linear-gradient(90deg,#34d399,#3b82f6);display:flex;align-items:center;justify-content:center;color:white;font-weight:800">${p.author.charAt(0)}</div><div><strong>${p.author}</strong><div class="small">${p.location} • ${p.time}</div></div></div><p style="margin-top:10px">${p.content}</p><div class="flex" style="justify-content:space-between;margin-top:10px"><div class="small">👍 ${p.likes} • 💬 ${p.comments}</div><button class="btn-ghost btn">Share</button></div>`;
    page.appendChild(card);
  });
  const share = el('button','btn btn-primary','➕ Share Update'); share.style.marginTop='8px';
  page.appendChild(share);
  return page;
}

function renderKnowledge(){
  const page = el('div','col');
  page.appendChild(el('div','section-title','📚 ' + t('knowledge')));
  SAMPLE.knowledgeVideos.forEach(v=>{
    const card = el('div','card'); card.innerHTML = `<div style="display:flex;gap:12px;align-items:center"><img src="${v.thumbnail}" style="width:120px;height:66px;object-fit:cover;border-radius:8px"><div><strong>${v.title}</strong><div class="small">${v.channel}</div><a class="small" href="${v.url}" target="_blank">${t('watchVideo')} →</a></div></div>`;
    page.appendChild(card);
  });
  return page;
}

function renderChat(){
  const page = el('div','col');
  page.appendChild(el('div','section-title','🤖 AI Assistant'));
  const chatWrap = el('div','card chat-wrap');
  const win = el('div','chat-window');
  STATE.messages.forEach(m => {
    const msg = el('div','msg ' + (m.type==='user'? 'user':'bot'), m.text);
    win.appendChild(msg);
  });
  chatWrap.appendChild(win);
  // input
  const controls = el('div','flex'); controls.style.marginTop='8px';
  const inp = el('input',''); inp.type='text'; inp.placeholder = t('askAI');
  const send = el('button','btn btn-primary','Send'); send.onclick = ()=>{ if(inp.value.trim()){ STATE.messages.push({type:'user', text: inp.value}); STATE.messages.push({type:'bot', text:t('loadingData')}); inp.value=''; render(); setTimeout(()=>{ STATE.messages.pop(); STATE.messages.push({type:'bot', text:'यहाँ एक संक्षिप्त सुझाव है: ' + 'आप ' + SAMPLE.cropRecommendations[0].name + ' पर विचार कर सकते हैं.'}); render(); },700); } };
  controls.appendChild(inp); controls.appendChild(send);
  chatWrap.appendChild(controls);
  page.appendChild(chatWrap);
  return page;
}

function renderManualSoil(){
  const page = el('div','col');
  page.appendChild(el('div','section-title','📝 ' + t('loadingData')));
  const card = el('div','card');
  card.innerHTML = `<label class="small">pH Level (6.0-7.5 ideal)</label><input type="number" step="0.1" class="" placeholder="6.5" /><h4 class="small" style="margin-top:12px">Nutrients (ppm)</h4>`;
  ['Nitrogen','Phosphorus','Potassium'].forEach(n=>{
    const r = el('div','flex'); r.innerHTML = `<div style="width:120px">${n}</div><input type="number" placeholder="50" style="flex:1" />`; card.appendChild(r);
  });
  const gen = el('button','btn btn-primary','Generate Recommendations ✨'); gen.onclick = ()=>{ STATE.screen='cropRecommendation'; render(); };
  card.appendChild(gen);
  page.appendChild(card);
  return page;
}

// ---------- Main render dispatcher ----------
function render(){
  clearRoot();
  // Notifications overlay (if toggled)
  const notif = renderNotifications();
  if(notif) document.body.appendChild(notif);

  // show header for screens other than welcome/tour/farmSetup/environmental
  let node;
  switch(STATE.screen){
    case 'welcome': node = renderWelcome(); break;
    case 'tour': node = renderTour(); break;
    case 'farmSetup': node = renderFarmSetup(); break;
    case 'environmentalData': node = renderEnvironmental(); break;
    case 'dashboard': node = renderDashboard(); break;
    case 'soilPath': node = renderSoilPath(); break;
    case 'leafPath': node = renderLeafPath(); break;
    case 'diseaseResults': node = renderDiseaseResults(); break;
    case 'cropRecommendation': node = renderCropRecommendation(); break;
    case 'detailedPlan': node = renderDetailedPlan(); break;
    case 'community': node = renderCommunity(); break;
    case 'knowledge': node = renderKnowledge(); break;
    case 'chat': node = renderChat(); break;
    case 'manualSoil': node = renderManualSoil(); break;
    default: node = renderWelcome(); break;
  }
  // top-level container: if not welcome screens, show header + content (for better consistency)
  if(['welcome','tour','farmSetup','environmentalData'].includes(STATE.screen)){
    ROOT.appendChild(node);
  } else {
    const container = el('div','columns');
    const left = el('div'); left.appendChild(renderHeader()); left.appendChild(node);
    const right = el('div'); // side summary
    const summary = el('div','card'); summary.innerHTML = `<div style="font-weight:800">Quick Info</div><div class="small" style="margin-top:8px">Location: ${STATE.form.location||SAMPLE.user.location}</div><div class="small">Weather: ${SAMPLE.weatherData.temperature}</div><div class="small">Notifications: ${SAMPLE.notifications.length}</div>`;
    right.appendChild(summary);
    container.appendChild(left); container.appendChild(right);
    ROOT.appendChild(container);
  }

  // ensure any notifications overlay appended earlier is removed if not needed
  if(!STATE.showNotifications){ const existing = document.querySelector('body > div[style*="position: fixed"]'); if(existing) existing.remove(); }
}

// initial render
render();

// Expose STATE for debug
window.__KISAN_APP = {STATE, SAMPLE, LANG};
