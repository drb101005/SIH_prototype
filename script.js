/* KisanMitra — Vanilla JS single-file application
   Converted from your React implementation. All screens and sampleData included.
   Save as script.js alongside index.html and style.css.
*/

/* ---------- Sample data (copied / adapted from your attached file) ---------- */
const sampleData = {
  user: { name: "राम शर्मा", phone: "+91 9876543210", location: "Pune, Maharashtra", preferredLanguage: "hi" },
  weatherData: { temperature: "28°C", humidity: "65%", rainfall: "800mm/year", forecast: "Sunny" },
  cropRecommendations: [
    { name: "Wheat", rating: 5, expectedYield: 25, profit: 45000, reason: "High market demand, suitable soil conditions",
      details: {
        forecast: { yield: 25, demand: 85, profit: 45000 },
        cost: { seeds: 4000, fertilizer: 6000, water: 3000, labor: 10000, misc: 2000 },
        rationale: "Wheat suits loamy soil and winter climate. MSP support increases safety.",
        guidance: { planting: "Sow seeds in November. Row spacing 20-22 cm.",
                    fertilizers: "Basal: 50kg N, 60kg P, 40kg K/ha. Top dressing after 21-25 days.",
                    pestControl: "Monitor aphids. Use recommended pesticides if infestation." },
        calculator: { seedRate: 100, fertilizerRate: 150 },
        schemes: ["PM-KISAN", "PMFBY", "MSP for Wheat"]
      }
    },
    { name: "Maize", rating: 5, expectedYield: 30, profit: 40000, reason: "Good for your soil type, drought resistant",
      details: {
        forecast: { yield: 30, demand: 75, profit: 40000 },
        cost: { seeds: 3500, fertilizer: 5000, water: 2500, labor: 9000, misc: 1500 },
        rationale: "Hardy crop; good demand from poultry feed.",
        guidance: { planting: "Sow during Kharif (June-July). Spacing 60x20 cm.",
                    fertilizers: "Apply 120kg N, 60kg P, 40kg K/ha in splits.",
                    pestControl: "Stem borer: pheromone traps." },
        calculator: { seedRate: 20, fertilizerRate: 120 },
        schemes: ["NFSM","RKVY"]
      }
    },
    { name: "Cotton", rating: 4, expectedYield: 8, profit: 35000, reason: "Current market favourable",
      details: {
        forecast: { yield: 8, demand: 90, profit: 35000 },
        cost: { seeds: 5000, fertilizer: 7000, water: 4000, labor: 12000, misc: 2500 },
        rationale: "High demand from textile industry.",
        guidance: { planting: "Sowing April-May. Use delinted seeds.",
                    fertilizers: "Balanced NPK as per soil test.",
                    pestControl: "Monitor pink bollworm, whitefly." },
        calculator: { seedRate: 15, fertilizerRate: 160 },
        schemes: ["Technology Mission on Cotton","CCI procurement"]
      }
    }
  ],
  diseaseAnalysis: { disease: "Leaf Blight", confidence: 87, severity: "Medium",
    treatment: ["Spray Mancozeb 75% WP", "2g per liter water", "Apply in evening", "Repeat after 7 days"] },
  communityPosts:[
    { author: "राम शर्मा", location: "Pune", time: "2h", content: "Cotton prices up 15% in local mandi today!", likes: 25, comments: 12 },
    { author: "Dr. Priya", location: "Agri Expert", time: "4h", content: "Monsoon forecast looks good for wheat sowing", likes: 120, comments: 45 }
  ],
  knowledgeVideos:[
    { id:1, title:"How to Start Organic Farming", channel:"Farming Guru", thumbnail:"https://i.ytimg.com/vi/a_II-y-aG4U/hqdefault.jpg", url:"https://www.youtube.com/watch?v=a_II-y-aG4U" },
    { id:2, title:"Modern Drip Irrigation", channel:"AgriTech India", thumbnail:"https://i.ytimg.com/vi/SgRuh8f_a-w/hqdefault.jpg", url:"https://www.youtube.com/watch?v=SgRuh8f_a-w" },
    { id:3, title:"Soil Health Management", channel:"Kisan Talks", thumbnail:"https://i.ytimg.com/vi/3b-y-w-Y-qQ/hqdefault.jpg", url:"https://www.youtube.com/watch?v=3b-y-w-Y-qQ" }
  ],
  notifications:[
    { id:1, type:'scheme', text:'New subsidy for solar pumps under PM-KUSUM. Apply now!', time:'Yesterday' },
    { id:2, type:'weather', text:'Rain expected in your area in next 48 hours', time:'2 days ago' },
    { id:3, type:'market', text:'Maize prices increased by 5% in local mandi', time:'3 days ago' }
  ]
};

/* ---------- Translations & UI text (copied from file) ---------- */
const content = {
  hi: {
    voicePrompt: "नमस्ते! मुझे अपने खेत के बारे में बताएं, और मैं आपका मार्गदर्शन करूंगा।",
    skipToSetup: "सेटअप पर जाएं", welcome: "स्वागत है!", selectLanguage: "भाषा चुनें",
    continue: "जारी रखें", getStarted: "शुरू करें", next: "अगला", back: "वापस",
    farmSetupTitle:"खेत की जानकारी सेटअप", farmLocation:"खेत का स्थान", gpsAutoDetect:"GPS ऑटो-डिटेक्ट",
    manual:"मैन्युअल", locationDetected:"स्थान पता चला:", landDetails:"भूमि का विवरण", acre:"एकड़", hectare:"हेक्टेयर",
    irrigationSource:"सिंचाई का स्रोत", borewell:"बोरवेल", canal:"नहर", rainFed:"वर्षा-आधारित", dripIrrigation:"ड्रिप सिंचाई",
    waterAvailability:"पानी की उपलब्धता", low:"कम", medium:"मध्यम", high:"उच्च", budgetOptional:"बजट (वैकल्पिक)",
    perSeason:"प्रति सीजन", saveAndContinue:"सहेजें और जारी रखें", mainDashboard:"मुख्य डैशबोर्ड", goodMorning:"सुप्रभात",
    choosePath:"अपना रास्ता चुनें:", soilAnalysis:"मिट्टी विश्लेषण", diseaseDetection:"रोग पहचान", planningNewCrop:"नई फसल की योजना?",
    cropIssue:"फसल में समस्या? मदद पाएं!", quickActions:"त्वरित कार्रवाइयां", askAI:"AI से पूछें", community:"समुदाय",
    learn:"सीखें", knowledgeCenter:"ज्ञान केंद्र", learnNewTechniques:"खेती की नई तकनीकें और टिप्स सीखें", watchVideo:"वीडियो देखें",
    selectState:"राज्य चुनें...", maharashtra:"महाराष्ट्र", punjab:"पंजाब", uttarPradesh:"उत्तर प्रदेश", tour_step1_title:"स्मार्ट फसल सिफारिशें",
    tour_step1_desc:"अपनी मिट्टी और जलवायु के आधार पर सबसे अधिक लाभदायक फसलों के लिए AI-संचालित सुझाव प्राप्त करें।",
    tour_step2_title:"रोग पहचान हुई आसान", tour_step2_desc:"बीमारियों की तुरंत पहचान करने और उपचार की सलाह पाने के लिए बस अपनी फसल के पत्तों की एक तस्वीर लें।",
    tour_step3_title:"विशेषज्ञों से जुड़ें", tour_step3_desc:"कृषि विशेषज्ञों से चैट करें और अपने समुदाय के साथी किसानों से जुड़ें।",
    tour_step4_title:"सरकारी योजनाएं और सब्सिडी", tour_step4_desc:"नवीनतम सरकारी योजनाओं, सब्सिडी और बाजार की कीमतों पर अपडेट रहें।",
    callExpert:"विशेषज्ञ को कॉल करें", buyMedicine:"दवा खरीदें", backToDashboard:"डैशबोर्ड पर वापस जाएं",
    loadingData:"डेटा लोड हो रहा है...", environmentalDataTitle:"पर्यावरणीय डेटा", soilAndClimateInfo:"आपके स्थान के आधार पर मिट्टी और जलवायु की जानकारी।",
    lastSeason:"पिछला सीजन", viewDetailedPlan:"विस्तृत योजना देखें", detailedPlanFor:"के लिए विस्तृत योजना", forecast:"पूर्वानुमान",
    yield:"उपज", marketDemand:"बाजार की मांग", profit:"मुनाफा", costBreakdown:"लागत का विवरण", seeds:"बीज", fertilizer:"उर्वरक",
    labor:"श्रम", waterMisc:"पानी और अन्य", netProfit:"शुद्ध लाभ", rationale:"तर्क", whyThisCrop:"यह फसल क्यों?", cultivationGuide:"खेती गाइड",
    planting:"रोपण", pestControl:"कीट नियंत्रण", resourceCalculator:"संसाधन कैलकुलेटर", yourLandSize:"आपकी जमीन का आकार (एकड़ में)",
    calculate:"गणना करें", requiredSeeds:"आवश्यक बीज", requiredFertilizer:"आवश्यक उर्वरक", govtSchemes:"सरकारी योजनाएं", notifications:"सूचनाएं"
  },
  en: {
    voicePrompt: "Hi! Tell me about your farm, and I'll guide you.",
    skipToSetup: "Skip to Setup", welcome:"Welcome!", selectLanguage:"Select Language", continue:"Continue", getStarted:"Get Started",
    next:"Next", back:"Back", farmSetupTitle:"Farm Profile Setup", farmLocation:"Farm Location", gpsAutoDetect:"GPS Auto-detect",
    manual:"Manual", locationDetected:"Location detected:", landDetails:"Land Details", acre:"Acre", hectare:"Hectare",
    irrigationSource:"Irrigation Source", borewell:"Borewell", canal:"Canal", rainFed:"Rain-fed", dripIrrigation:"Drip Irrigation",
    waterAvailability:"Water Availability", low:"Low", medium:"Medium", high:"High", budgetOptional:"Budget (Optional)",
    perSeason:"per season", saveAndContinue:"Save & Continue", mainDashboard:"Main Dashboard", goodMorning:"Good Morning",
    choosePath:"Choose Your Path:", soilAnalysis:"Soil Analysis", diseaseDetection:"Disease Detection", planningNewCrop:"Planning New Crop?",
    cropIssue:"Crop Issue? Get Help!", quickActions:"Quick Actions", askAI:"Ask AI", community:"Community", learn:"Learn",
    knowledgeCenter:"Knowledge Center", learnNewTechniques:"Learn new farming techniques and tips", watchVideo:"Watch Video",
    selectState:"Select State...", maharashtra:"Maharashtra", punjab:"Punjab", uttarPradesh:"Uttar Pradesh",
    tour_step1_title:"Smart Crop Recommendations", tour_step1_desc:"Get AI-powered suggestions for the most profitable crops based on your soil and climate.",
    tour_step2_title:"Disease Detection Made Easy", tour_step2_desc:"Take a photo of your crop leaves to identify diseases and get treatment advice.",
    tour_step3_title:"Connect with Experts", tour_step3_desc:"Chat with agricultural experts and connect with fellow farmers.",
    tour_step4_title:"Government Schemes & Subsidies", tour_step4_desc:"Stay updated on government schemes, subsidies and market prices.",
    callExpert:"Call Expert", buyMedicine:"Buy Medicine", backToDashboard:"Back to Dashboard", loadingData:"Loading Data...",
    environmentalDataTitle:"Environmental Data", soilAndClimateInfo:"Soil and climate information based on your location.",
    lastSeason:"Last Season", viewDetailedPlan:"View Detailed Plan", detailedPlanFor:"Detailed Plan for", forecast:"Forecast",
    yield:"Yield", marketDemand:"Market Demand", profit:"Profit", costBreakdown:"Cost Breakdown", seeds:"Seeds", fertilizer:"Fertilizer",
    labor:"Labor", waterMisc:"Water & Misc.", netProfit:"Net Profit", rationale:"Rationale", whyThisCrop:"Why this Crop?", cultivationGuide:"Cultivation Guide",
    planting:"Planting", pestControl:"Pest Control", resourceCalculator:"Resource Calculator", yourLandSize:"Your Land Size (in acres)",
    calculate:"Calculate", requiredSeeds:"Required Seeds", requiredFertilizer:"Required Fertilizer", govtSchemes:"Government Schemes", notifications:"Notifications"
  },
  mr: {
    voicePrompt: "नमस्कार! मला तुमच्या शेताबद्दल सांगा, आणि मी तुम्हाला मार्गदर्शन करेन.",
    skipToSetup: "सेटअपवर जा", welcome:"स्वागत आहे!", selectLanguage:"भाषा निवडा", continue:"पुढे जा", getStarted:"सुरु करा",
    next:"पुढे", back:"मागे", farmSetupTitle:"शेती प्रोफाइल सेटअप", farmLocation:"शेताचे ठिकाण", gpsAutoDetect:"GPS ऑटो-डिटेक्ट",
    manual:"मॅन्युअल", locationDetected:"ठिकाण आढळले:", landDetails:"जमिनीचा तपशील", acre:"एकर", hectare:"हेक्टर",
    irrigationSource:"सिंचनाचा स्रोत", borewell:"बोरवेल", canal:"कालवा", rainFed:"पावसावर अवलंबून", dripIrrigation:"ठिबक सिंचन",
    waterAvailability:"पाण्याची उपलब्धता", low:"कमी", medium:"मध्यम", high:"जास्त", budgetOptional:"बजेट (ऐच्छिक)",
    perSeason:"प्रति हंगाम", saveAndContinue:"जतन करा आणि पुढे जा", mainDashboard:"मुख्य डॅशबोर्ड", goodMorning:"शुभ सकाळ",
    choosePath:"आपला मार्ग निवडा:", soilAnalysis:"माती विश्लेषण", diseaseDetection:"रोग ओळख", planningNewCrop:"नवीन पिकाचे नियोजन करत आहात?",
    cropIssue:"पिकामध्ये समस्या आहे? मदत मिळवा!", quickActions:"द्रुत क्रिया", askAI:"AI ला विचारा", community:"समुदाय",
    learn:"शिका", knowledgeCenter:"ज्ञान केंद्र", learnNewTechniques:"नवीन शेती तंत्र आणि टिप्स शिका", watchVideo:"व्हिडिओ पहा",
    selectState:"राज्य निवडा...", maharashtra:"महाराष्ट्र", punjab:"पंजाब", uttarPradesh:"उत्तर प्रदेश", tour_step1_title:"स्मार्ट पीक शिफारसी",
    tour_step1_desc:"तुमच्या माती आणि हवामानावर आधारित सर्वात फायदेशीर पिकांसाठी AI-चालित सूचना मिळवा.",
    tour_step2_title:"रोग ओळख सोपी झाली", tour_step2_desc:"पिकाच्या पानांचा फोटो घेऊन रोग ओळखा आणि उपचार मिळवा.",
    tour_step3_title:"तज्ञांशी संपर्क साधा", tour_step3_desc:"कृषि तज्ञांशी गप्पा मारा आणि समुदायाशी जुळा.",
    tour_step4_title:"सरकारी योजना आणि सबसिडी", tour_step4_desc:"नवीनतम सरकारी योजना, सबसिडी आणि बाजारभावावर अपडेट रहा.",
    callExpert:"तज्ञांना कॉल करा", buyMedicine:"औषध खरेदी करा", backToDashboard:"डॅशबोर्डवर परत जा", loadingData:"डेटा लोड होत आहे...",
    environmentalDataTitle:"पर्यावरणीय डेटा", soilAndClimateInfo:"तुमच्या स्थानावर आधारित माती आणि हवामानाची माहिती.",
    lastSeason:"मागील हंगाम", viewDetailedPlan:"तपशीलवार योजना पहा", detailedPlanFor:"साठी तपशीलवार योजना", forecast:"अंदाज",
    yield:"उत्पन्न", marketDemand:"बाजारातील मागणी", profit:"नफा", costBreakdown:"खर्चाचे विवरण", seeds:"बियाणे", fertilizer:"खत",
    labor:"मजुरी", waterMisc:"पाणी आणि इतर", netProfit:"निव्वळ नफा", rationale:"तर्क", whyThisCrop:"हे पीक का?", cultivationGuide:"लागवड मार्गदर्शक",
    planting:"लागवड", pestControl:"कीड नियंत्रण", resourceCalculator:"संसाधन कॅल्क्युलेटर", yourLandSize:"तुमच्या जमिनीचे क्षेत्रफळ (एकरमध्ये)",
    calculate:"गणना करा", requiredSeeds:"आवश्यक बियाणे", requiredFertilizer:"आवश्यक खत", govtSchemes:"सरकारी योजना", notifications:"सूचना"
  }
};

/* ---------- App State ---------- */
const state = {
  lang: 'hi',
  screen: 'welcome', // welcome, tour, farmSetup, environmentalData, dashboard, soilPath, manualSoil, cropRecommendation, leafPath, diseaseResults, community, chat, knowledge, detailedPlan
  tourStep: 0,
  formData: {},
  uploadedImage: null,
  showNotifications: false,
  detailedCrop: null,
  chatMessages: [{type:'bot', text: content['hi'].voicePrompt}],
};

/* ---------- Helpers ---------- */
function t(key){
  return (content[state.lang] && content[state.lang][key]) || key;
}
function el(tag, cls, html){ const e=document.createElement(tag); if(cls) e.className=cls; if(html!==undefined) e.innerHTML=html; return e; }
function setScreen(screen){ state.screen=screen; render(); }
function setLang(lang){ state.lang=lang; state.chatMessages=[{type:'bot', text: content[lang].voicePrompt}]; render(); }
function setUploadedImage(src){ state.uploadedImage = src; render(); }
function pushChat(msg){ state.chatMessages.push(msg); render(); }

/* ---------- Screens (render functions) ---------- */

function renderWelcome(container){
  container.innerHTML = '';
  const wrap = el('div','welcome-wrap');
  const card = el('div','card fade-in');
  const title = el('div','title','🌾 किसान मित्र');
  const subtitle = el('div','small','AI Farming Co-Pilot');
  card.appendChild(title); card.appendChild(subtitle);
  card.appendChild(el('hr','mt-6'));
  const langTitle = el('div','label', t('selectLanguage'));
  card.appendChild(langTitle);
  ['hi','mr','en'].forEach(code=>{
    const btn = el('button','btn btn-ghost btn-block', (code==='hi'?'हिंदी':code==='mr'?'मराठी':'English'));
    if(state.lang===code) btn.style.border='2px solid var(--green)';
    btn.onclick = ()=> setLang(code);
    card.appendChild(btn);
  });
  card.appendChild(el('div','mt-6 small',`🎤 "${t('voicePrompt')}"`));
  card.appendChild(el('div','mt-6'));
  const cont = el('button','btn btn-primary btn-block', t('continue') + ' →');
  cont.onclick = ()=> { state.tourStep=0; setScreen('tour'); };
  card.appendChild(cont);
  const skip = el('button','btn-ghost btn-block small', t('skipToSetup'));
  skip.onclick = ()=> setScreen('farmSetup');
  card.appendChild(skip);
  wrap.appendChild(card); container.appendChild(wrap);
}

function renderTour(container){
  container.innerHTML='';
  const card = el('div','card fade-in');
  const steps = [
    { title:t('tour_step1_title'), desc:t('tour_step1_desc'), icon:'🌾' },
    { title:t('tour_step2_title'), desc:t('tour_step2_desc'), icon:'🔍' },
    { title:t('tour_step3_title'), desc:t('tour_step3_desc'), icon:'👥' },
    { title:t('tour_step4_title'), desc:t('tour_step4_desc'), icon:'💰' }
  ];
  const step = steps[state.tourStep];
  card.appendChild(el('div','title', step.icon + ' ' + step.title));
  card.appendChild(el('div','small', step.desc));
  const dots = el('div','row mt-6');
  steps.forEach((s,i)=>{ const d=el('div','', i===state.tourStep?'<span class="badge">●</span>':'○'); dots.appendChild(d); });
  card.appendChild(dots);
  const nav = el('div','row mt-6');
  const back = el('button','btn-ghost', t('back'));
  back.onclick = ()=> { if(state.tourStep>0){ state.tourStep--; render(); } else setScreen('farmSetup'); };
  const next = el('button','btn btn-primary', state.tourStep < steps.length-1 ? (t('next')+' →') : t('getStarted'));
  next.onclick = ()=> {
    if(state.tourStep < steps.length-1) { state.tourStep++; render(); } else setScreen('farmSetup');
  };
  nav.appendChild(back); nav.appendChild(next);
  card.appendChild(nav);
  container.appendChild(card);
}

function renderFarmSetup(container){
  container.innerHTML='';
  const card = el('div','card fade-in');
  card.appendChild(el('div','title','🌾 ' + t('farmSetupTitle')));
  // Location row
  card.appendChild(el('div','label', t('farmLocation')));
  const locRow = el('div','row');
  const gpsBtn = el('button','btn btn-ghost','📍 ' + t('gpsAutoDetect'));
  const manualBtn = el('button','btn btn-ghost','📝 ' + t('manual'));
  gpsBtn.onclick=()=> { state.formData.location='Pune, Maharashtra'; state.showManual=false; render(); };
  manualBtn.onclick=()=> { state.showManual=true; render(); };
  locRow.appendChild(gpsBtn); locRow.appendChild(manualBtn);
  card.appendChild(locRow);
  if(state.showManual){
    const sel = el('select','input');
    sel.innerHTML = `<option value="">${t('selectState')}</option><option value="MH">${t('maharashtra')}</option><option value="PB">${t('punjab')}</option><option value="UP">${t('uttarPradesh')}</option>`;
    sel.onchange = (e)=> state.formData.state = e.target.value;
    card.appendChild(sel);
  } else {
    card.appendChild(el('div','small','✅ ' + (state.formData.location || 'Pune, Maharashtra')));
  }
  // Land details
  card.appendChild(el('div','label mt-6', t('landDetails')));
  const landRow = el('div','row');
  const landInput = el('input','input');
  landInput.type='number'; landInput.placeholder='5';
  landInput.value = state.formData.landSize || '';
  landInput.oninput = (e)=> state.formData.landSize = e.target.value;
  const unitSel = el('select','input'); unitSel.innerHTML=`<option>${t('acre')}</option><option>${t('hectare')}</option>`;
  landRow.appendChild(landInput); landRow.appendChild(unitSel);
  card.appendChild(landRow);
  // irrigation
  const irrig = el('select','input mt-6');
  irrig.innerHTML = `<option>${t('irrigationSource')}</option><option>${t('borewell')}</option><option>${t('canal')}</option><option>${t('rainFed')}</option><option>${t('dripIrrigation')}</option>`;
  irrig.onchange = (e)=> state.formData.irrigation = e.target.value;
  card.appendChild(irrig);
  // water availability
  card.appendChild(el('div','label mt-6', t('waterAvailability')));
  const wa = el('div','row');
  ['low','medium','high'].forEach(l=>{
    const b=el('button','btn btn-ghost', t(l));
    b.onclick=()=>{ state.formData.waterAvailability=l; render(); };
    if(state.formData.waterAvailability===l){ b.style.border='2px solid var(--blue)'; }
    wa.appendChild(b);
  });
  card.appendChild(wa);
  // budget
  card.appendChild(el('div','label mt-6', t('budgetOptional')));
  const budget = el('input','input'); budget.type='number'; budget.placeholder='50000';
  budget.value = state.formData.budget || '';
  budget.oninput = (e)=> state.formData.budget = e.target.value;
  card.appendChild(budget);
  // Save button
  const save = el('button','btn btn-primary btn-block mt-6', t('saveAndContinue') + ' →');
  save.onclick = ()=> setScreen('environmentalData');
  card.appendChild(save);
  container.appendChild(card);
}

function renderEnvironmentalData(container){
  container.innerHTML='';
  const card = el('div','card fade-in');
  card.appendChild(el('div','title','🌱 ' + t('environmentalDataTitle')));
  card.appendChild(el('div','small', t('soilAndClimateInfo')));
  // Soil box
  const soilBox = el('div','card mt-6');
  soilBox.appendChild(el('div','label','Soil Information'));
  soilBox.appendChild(el('div','small','Type: Loamy'));
  soilBox.appendChild(el('div','small','pH: 6.8 (Good)'));
  soilBox.appendChild(el('div','small','Organic Matter: 2.1%'));
  card.appendChild(soilBox);
  // Climate box
  const climateBox = el('div','card mt-6');
  climateBox.appendChild(el('div','label','Climate Data'));
  climateBox.appendChild(el('div','small','Rainfall: ' + sampleData.weatherData.rainfall));
  climateBox.appendChild(el('div','small','Temperature: 22-35°C'));
  climateBox.appendChild(el('div','small','Humidity: ' + sampleData.weatherData.humidity));
  card.appendChild(climateBox);

  const done = el('button','btn btn-primary btn-block mt-6','Complete Setup ✅');
  done.onclick = ()=> setScreen('dashboard');
  card.appendChild(done);
  container.appendChild(card);
}

function renderNotificationsOverlay(root){
  if(!state.showNotifications) return null;
  const overlay = el('div','','');
  overlay.style = "position:fixed;inset:0;background:rgba(0,0,0,0.45);display:flex;align-items:flex-start;justify-content:flex-end;padding:18px;z-index:50";
  const panel = el('div','card');
  panel.style.width='320px'; panel.style.maxHeight='80vh'; panel.style.overflowY='auto';
  panel.appendChild(el('div','title', t('notifications')));
  sampleData.notifications.forEach(n=>{
    const row = el('div','', `<div style="display:flex;gap:10px;margin-top:12px;"><div style="width:36px;height:36px;border-radius:10px;background:#f3f4f6;display:flex;align-items:center;justify-content:center">${n.type==='scheme'?'💡':n.type==='weather'?'☔':'📈'}</div><div><div style="font-weight:600">${n.text}</div><div class="small">${n.time}</div></div></div>`);
    panel.appendChild(row);
  });
  const close = el('button','btn-ghost mt-6','Close');
  close.onclick = ()=> { state.showNotifications=false; render(); };
  panel.appendChild(close);
  overlay.appendChild(panel);
  root.appendChild(overlay);
}

function renderDashboard(container){
  container.innerHTML='';
  const header = el('div','header');
  header.appendChild(el('div','title', t('mainDashboard')));
  const rightRow = el('div','small','');
  const notifBtn = el('button','btn-ghost','🔔');
  notifBtn.onclick = ()=>{ state.showNotifications=true; render(); };
  rightRow.appendChild(notifBtn);
  header.appendChild(rightRow);
  container.appendChild(header);

  // weather card
  const weather = el('div','card');
  weather.appendChild(el('div','row space-between', `<div><strong>${sampleData.weatherData.temperature}</strong><div class="small">${sampleData.weatherData.forecast}</div></div><div class="small">Humidity: ${sampleData.weatherData.humidity}</div>`));
  container.appendChild(weather);

  // main options
  const choose = el('div','card');
  choose.appendChild(el('div','label', t('choosePath')));
  const opt1 = el('button','btn btn-primary btn-block mt-6', '🌱 ' + t('soilAnalysis'));
  opt1.onclick = ()=> setScreen('soilPath');
  const opt2 = el('button','btn btn-primary btn-block mt-6', '🍃 ' + t('diseaseDetection'));
  opt2.onclick = ()=> setScreen('leafPath');
  choose.appendChild(opt1); choose.appendChild(opt2);
  container.appendChild(choose);

  // quick actions
  const quick = el('div','card');
  quick.appendChild(el('div','label','📱 ' + t('quickActions')));
  const grid = el('div','grid-3 mt-6');
  const a1 = el('button','btn','🤖 ' + t('askAI')); a1.onclick = ()=> setScreen('chat'); grid.appendChild(a1);
  const a2 = el('button','btn','👥 ' + t('community')); a2.onclick = ()=> setScreen('community'); grid.appendChild(a2);
  const a3 = el('button','btn','📚 ' + t('learn')); a3.onclick = ()=> setScreen('knowledge'); grid.appendChild(a3);
  quick.appendChild(grid);
  container.appendChild(quick);

  // notifications overlay
  renderNotificationsOverlay(document.body);
}

function renderSoilPath(container){
  container.innerHTML='';
  const header = el('div','header');
  const back = el('button','btn-ghost','← ' + t('back')); back.onclick = ()=> setScreen('dashboard');
  header.appendChild(back);
  header.appendChild(el('div','title','📸 Soil Photo Upload'));
  container.appendChild(header);

  const card = el('div','card');
  const uploadArea = el('div','card','');
  uploadArea.style.textAlign='center';
  if(state.uploadedImage){
    const img = el('img',''); img.src = state.uploadedImage; img.style.width='120px'; img.style.height='120px'; img.style.objectFit='cover'; img.style.borderRadius='10px';
    uploadArea.appendChild(img);
    uploadArea.appendChild(el('div','small','✅ Soil image uploaded!'));
  } else {
    uploadArea.appendChild(el('div','title','📷'));
    uploadArea.appendChild(el('div','small','Tap to take soil photo'));
    const gbtn = el('button','btn btn-ghost btn-block mt-6','Gallery'); gbtn.onclick = ()=> setUploadedImage('https://placehold.co/200x200/c2b280/FFFFFF?text=Soil');
    const cbtn = el('button','btn btn-primary btn-block mt-2','Camera'); cbtn.onclick = ()=> setUploadedImage('https://placehold.co/200x200/c2b280/FFFFFF?text=Soil');
    uploadArea.appendChild(gbtn); uploadArea.appendChild(cbtn);
  }
  card.appendChild(uploadArea);
  card.appendChild(el('div','card','<strong>Tips for best results:</strong><ul class="small"><li>Clear lighting</li><li>6 inches from soil</li><li>Avoid shadows</li></ul>'));
  container.appendChild(card);
  if(state.uploadedImage){
    const gen = el('button','btn btn-primary btn-block mt-6','Generate Recommendations ✨');
    gen.onclick = ()=> setScreen('cropRecommendation');
    container.appendChild(gen);
  }
}

function renderManualSoil(container){
  container.innerHTML='';
  const header = el('div','header');
  const back=el('button','btn-ghost','← ' + t('back')); back.onclick=()=> setScreen('soilPath');
  header.appendChild(back); header.appendChild(el('div','title','📝 Soil Test Results'));
  container.appendChild(header);

  const card=el('div','card');
  card.appendChild(el('div','label','pH Level: (6.0-7.5 ideal)'));
  const ph = el('input','input'); ph.type='number'; ph.step='0.1'; ph.placeholder='6.5';
  card.appendChild(ph);
  card.appendChild(el('div','label mt-6','🌱 Nutrients (ppm):'));
  ['Nitrogen','Phosphorus','Potassium'].forEach(n=>{
    const row = el('div','row');
    const lbl = el('div','small',n+':');
    const inp = el('input','input'); inp.type='number'; inp.placeholder='50';
    row.appendChild(lbl); row.appendChild(inp); card.appendChild(row);
  });
  // last season
  card.appendChild(el('div','label mt-6','🌾 ' + t('lastSeason')));
  const sel = el('select','input'); sel.innerHTML = '<option>Rice</option><option>Wheat</option><option>Cotton</option><option>Soybean</option>';
  card.appendChild(sel);
  const gen = el('button','btn btn-primary btn-block mt-6','Generate Recommendations ✨'); gen.onclick = ()=> setScreen('cropRecommendation');
  card.appendChild(gen);
  container.appendChild(card);
}

function renderCropRecommendation(container){
  container.innerHTML='';
  const header = el('div','header'); const back=el('button','btn-ghost','← ' + t('back')); back.onclick=()=> setScreen('soilPath');
  header.appendChild(back); header.appendChild(el('div','title','🎯 Top Crop Recommendations')); container.appendChild(header);

  sampleData.cropRecommendations.forEach((crop, idx)=>{
    const card = el('div','card');
    const left = el('div','row');
    left.innerHTML = `<div style="font-size:26px;margin-right:10px">${crop.name==='Wheat'?'🌾':crop.name==='Maize'?'🌽':'🌿'}</div>`;
    const info = el('div','');
    info.appendChild(el('div','title', (idx+1) + '. ' + crop.name));
    // rating stars
    const stars = el('div','small'); stars.innerHTML = '★'.repeat(crop.rating) + '☆'.repeat(5 - crop.rating);
    info.appendChild(stars);
    left.appendChild(info);
    card.appendChild(left);
    card.appendChild(el('div','small','' + crop.reason));
    // price/profit
    const price = el('div','row space-between');
    price.innerHTML = `<strong style="color:var(--green)">${toIndian(crop.profit)}</strong> <span class="small">per acre</span>`;
    card.appendChild(price);
    const detailBtn = el('button','btn btn-ghost btn-block mt-6','View Detailed Plan');
    detailBtn.onclick = ()=> { state.detailedCrop = crop; setScreen('detailedPlan'); };
    card.appendChild(detailBtn);
    container.appendChild(card);
  });
}

function toIndian(n){ return '₹'+(n).toLocaleString('en-IN'); }

function renderLeafPath(container){
  container.innerHTML='';
  const header = el('div','header'); const back=el('button','btn-ghost','← ' + t('back')); back.onclick=()=> setScreen('dashboard');
  header.appendChild(back); header.appendChild(el('div','title','🍃 Leaf Disease Detection')); container.appendChild(header);

  const card = el('div','card');
  card.appendChild(el('div','label','Select Your Crop'));
  const cropSel = el('select','input'); cropSel.innerHTML = '<option>Rice</option><option>Wheat</option><option>Cotton</option><option>Tomato</option>';
  card.appendChild(cropSel);
  const uploadArea = el('div','card');
  uploadArea.style.textAlign='center';
  if(state.uploadedImage){
    const img=el('img'); img.src=state.uploadedImage; img.style.width='120px'; img.style.height='120px'; img.style.objectFit='cover';
    uploadArea.appendChild(img); uploadArea.appendChild(el('div','small','✅ Leaf image uploaded!'));
    const analyze=el('button','btn btn-primary btn-block mt-6','Analyze Disease 🔍'); analyze.onclick = ()=> setScreen('diseaseResults');
    card.appendChild(uploadArea); card.appendChild(analyze);
  } else {
    uploadArea.appendChild(el('div','title','🍃')); uploadArea.appendChild(el('div','small','Upload leaf photo'));
    const gal = el('button','btn btn-ghost btn-block mt-6','Gallery'); gal.onclick = ()=> setUploadedImage('https://placehold.co/200x200/90ee90/FFFFFF?text=Leaf');
    const cam = el('button','btn btn-primary btn-block mt-2','Camera'); cam.onclick = ()=> setUploadedImage('https://placehold.co/200x200/90ee90/FFFFFF?text=Leaf');
    card.appendChild(uploadArea); card.appendChild(gal); card.appendChild(cam);
  }
  container.appendChild(card);
}

function renderDiseaseResults(container){
  container.innerHTML='';
  const header = el('div','header'); const back = el('button','btn-ghost','← ' + t('back')); back.onclick=()=> setScreen('leafPath');
  header.appendChild(back); header.appendChild(el('div','title','🔍 Disease Analysis')); container.appendChild(header);

  const card = el('div','card');
  card.appendChild(el('div','small','⚠ ' + sampleData.diseaseAnalysis.disease + ' (Confidence: ' + sampleData.diseaseAnalysis.confidence + '%)'));
  card.appendChild(el('div','small','Severity: ' + sampleData.diseaseAnalysis.severity));
  const list = el('ul','small'); sampleData.diseaseAnalysis.treatment.forEach(s=>{ list.appendChild(el('li','',s)); });
  card.appendChild(list);
  card.appendChild(el('div','mt-6'));
  const call = el('button','btn btn-primary btn-block', t('callExpert')); call.onclick = ()=> alert('Calling expert (demo)...');
  const buy = el('button','btn btn-ghost btn-block mt-2', t('buyMedicine')); buy.onclick = ()=> alert('Open marketplace (demo)');
  const backDash = el('button','btn-ghost btn-block mt-2', '← ' + t('backToDashboard')); backDash.onclick = ()=> setScreen('dashboard');
  card.appendChild(call); card.appendChild(buy); card.appendChild(backDash);
  container.appendChild(card);
}

function renderCommunity(container){
  container.innerHTML='';
  const header = el('div','header');
  const back = el('button','btn-ghost','← ' + t('back')); back.onclick = ()=> setScreen('dashboard');
  header.appendChild(back); header.appendChild(el('div','title','👥 Farmer Community')); container.appendChild(header);
  sampleData.communityPosts.forEach(p=>{
    const card = el('div','card');
    card.appendChild(el('div','title', p.author + ' • ' + p.location));
    card.appendChild(el('div','small', `"${p.content}"`));
    const stats = el('div','row small'); stats.innerHTML = `👍 ${p.likes}  💬 ${p.comments}`;
    card.appendChild(stats);
    container.appendChild(card);
  });
  const share = el('button','btn btn-primary btn-block mt-6','➕ Share Update'); share.onclick = ()=> alert('Share update (demo)');
  container.appendChild(share);
}

function renderKnowledge(container){
  container.innerHTML='';
  const header = el('div','header'); const back = el('button','btn-ghost','← ' + t('back')); back.onclick = ()=> setScreen('dashboard');
  header.appendChild(back); header.appendChild(el('div','title','📚 ' + t('knowledgeCenter'))); container.appendChild(header);
  sampleData.knowledgeVideos.forEach(v=>{
    const card = el('div','card');
    card.innerHTML = `<div style="display:flex;gap:10px"><img style="width:100px;height:60px;object-fit:cover;border-radius:8px" src="${v.thumbnail}" /><div><div style="font-weight:700">${v.title}</div><div class="small">${v.channel}</div><a target="_blank" href="${v.url}" class="small">▶ ${t('watchVideo')}</a></div></div>`;
    container.appendChild(card);
  });
}

function renderDetailedPlan(container){
  if(!state.detailedCrop){ setScreen('cropRecommendation'); return; }
  container.innerHTML='';
  const header = el('div','header'); const back = el('button','btn-ghost','← ' + t('back')); back.onclick = ()=> setScreen('cropRecommendation');
  header.appendChild(back); header.appendChild(el('div','title', t('detailedPlanFor') + ' ' + state.detailedCrop.name)); container.appendChild(header);

  const crop = state.detailedCrop;
  const top = el('div','card');
  top.appendChild(el('div','label','Forecast'));
  top.appendChild(el('div','small', `${t('yield')}: ${crop.details.forecast.yield} q/acre`));
  top.appendChild(el('div','small', `${t('marketDemand')}: ${crop.details.forecast.demand}%`));
  top.appendChild(el('div','small', `${t('profit')}: ${toIndian(crop.details.forecast.profit)}`));
  container.appendChild(top);

  const cost = el('div','card');
  cost.appendChild(el('div','label', t('costBreakdown')));
  Object.entries(crop.details.cost).forEach(([k,v])=>{
    const row = el('div','row'); row.innerHTML = `<div class="small">${k.charAt(0).toUpperCase() + k.slice(1)}</div><div class="small" style="font-weight:700">${toIndian(v)}</div>`;
    cost.appendChild(row);
  });
  const totalCost = Object.values(crop.details.cost).reduce((s,n)=>s+n,0);
  cost.appendChild(el('div','row space-between mt-6', `<div style="font-weight:700">Total Cost</div><div style="font-weight:700">${toIndian(totalCost)}</div>`));
  cost.appendChild(el('div','row space-between', `<div style="font-weight:700;color:var(--green)">${t('netProfit')}</div><div style="font-weight:700;color:var(--green)">${toIndian(crop.profit)}</div>`));
  container.appendChild(cost);

  // resource calculator
  const calc = el('div','card');
  calc.appendChild(el('div','label', t('resourceCalculator')));
  const areaInput = el('input','input'); areaInput.type='number'; areaInput.value=1;
  calc.appendChild(areaInput);
  const calcBtn = el('button','btn btn-primary btn-block mt-4', t('calculate'));
  const calcOut = el('div','small mt-6');
  calcBtn.onclick = ()=>{
    const area = Number(areaInput.value) || 1;
    const seeds = (area * (crop.details.calculator.seedRate || 0)).toFixed(1);
    const fert = (area * (crop.details.calculator.fertilizerRate || 0)).toFixed(1);
    calcOut.innerHTML = `<div>${t('requiredSeeds')}: <strong>${seeds} kg</strong></div><div>${t('requiredFertilizer')}: <strong>${fert} kg</strong></div>`;
  };
  calc.appendChild(calcBtn); calc.appendChild(calcOut);
  container.appendChild(calc);

  const schemes = el('div','card');
  schemes.appendChild(el('div','label', t('govtSchemes')));
  schemes.appendChild(el('ul','small', crop.details.schemes.map(s=>`<li>${s}</li>`).join('')));
  container.appendChild(schemes);
}

function renderChat(container){
  container.innerHTML='';
  const header = el('div','header'); const back = el('button','btn-ghost','← ' + t('back')); back.onclick = ()=> setScreen('dashboard');
  header.appendChild(back); header.appendChild(el('div','title','🤖 AI Assistant')); container.appendChild(header);

  const card = el('div','card chat');
  const messagesWrap = el('div','chat-messages');
  state.chatMessages.forEach(m=>{
    const d = el('div','msg ' + (m.type==='user'?'user':'bot'), m.text);
    messagesWrap.appendChild(d);
  });
  card.appendChild(messagesWrap);

  const inputRow = el('div','row mt-6');
  const input = el('input','input'); input.placeholder = 'Type your question...';
  const sendBtn = el('button','btn btn-primary','Send');
  sendBtn.onclick = ()=>{
    if(!input.value) return;
    state.chatMessages.push({type:'user', text: input.value});
    state.chatMessages.push({type:'bot', text: 'यह डेमो उत्तर है: ' + input.value});
    input.value='';
    render();
  };
  inputRow.appendChild(input); inputRow.appendChild(sendBtn);
  card.appendChild(inputRow);

  container.appendChild(card);
}

function renderScreen(root){
  root.innerHTML='';
  const wrap = el('div','container');
  switch(state.screen){
    case 'welcome': renderWelcome(wrap); break;
    case 'tour': renderTour(wrap); break;
    case 'farmSetup': renderFarmSetup(wrap); break;
    case 'environmentalData': renderEnvironmentalData(wrap); break;
    case 'dashboard': renderDashboard(wrap); break;
    case 'soilPath': renderSoilPath(wrap); break;
    case 'manualSoil': renderManualSoil(wrap); break;
    case 'cropRecommendation': renderCropRecommendation(wrap); break;
    case 'leafPath': renderLeafPath(wrap); break;
    case 'diseaseResults': renderDiseaseResults(wrap); break;
    case 'community': renderCommunity(wrap); break;
    case 'chat': renderChat(wrap); break;
    case 'knowledge': renderKnowledge(wrap); break;
    case 'detailedPlan': renderDetailedPlan(wrap); break;
    default: renderWelcome(wrap); break;
  }
  // add wrapper to DOM
  root.appendChild(wrap);
}

/* ---------- Main render ---------- */
function render(){
  const app = document.getElementById('app');
  app.innerHTML=''; // clear
  renderScreen(app);
  // If notifications overlay active, it was appended to body earlier via renderDashboard -> renderNotificationsOverlay
}

/* Initialize */
document.addEventListener('DOMContentLoaded', ()=>{
  state.lang = sampleData.user.preferredLanguage || 'hi';
  render();
});

/* Expose for console (debug) */
window.KisanMitraState = state;
