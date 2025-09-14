/* script.js - Vanilla implementation of the React app */
(() => {
  // --- Sample Data (kept from original) ---
  const sampleData = {
    user: { name: "राम शर्मा", phone: "+91 9876543210", location: "Pune, Maharashtra", preferredLanguage: "hi" },
    weatherData: { temperature: "28°C", humidity: "65%", rainfall: "800mm/year", forecast: "Sunny" },
    cropRecommendations: [
      { name: "Wheat", rating: 5, expectedYield: 25, profit: 45000, reason: "High market demand, suitable soil conditions", details: {
          forecast: { yield: 25, demand: 85, profit: 45000 },
          cost: { seeds: 4000, fertilizer: 6000, water: 3000, labor: 10000, misc: 2000 },
          rationale: "Wheat is highly suitable for your region's loamy soil and winter climate. Market prices are consistently strong, and it's an MSP-supported crop, ensuring profit.",
          guidance: { planting: "Sow seeds in November. Maintain row spacing of 20-22 cm. Seed depth should be 5 cm.", fertilizers: "Basal Dose: 50kg N, 60kg P, 40kg K per hectare. Top Dressing: Apply 50kg N after 21-25 days.", pestControl: "Watch for aphids and termites. Use recommended pesticides like Imidacloprid if infestation occurs." },
          calculator: { seedRate: 100, fertilizerRate: 150 }, schemes: ["PM-KISAN", "Pradhan Mantri Fasal Bima Yojana (PMFBY)", "MSP for Wheat"]
      } },
      { name: "Maize", rating: 5, expectedYield: 30, profit: 40000, reason: "Good for your soil type, drought resistant", details: {
          forecast: { yield: 30, demand: 75, profit: 40000 },
          cost: { seeds: 3500, fertilizer: 5000, water: 2500, labor: 9000, misc: 1500 },
          rationale: "Maize is a hardy crop that performs well in loamy soil and is relatively drought-resistant.",
          guidance: { planting: "Best sown during Kharif season (June-July). Use a seed rate of 20 kg/ha. Spacing: 60x20 cm.", fertilizers: "Apply 120kg N, 60kg P, and 40kg K per hectare.", pestControl: "Stem borer is a common pest. Use Pheromone traps." },
          calculator: { seedRate: 20, fertilizerRate: 120 }, schemes: ["NFSM", "RKVY"]
      } },
      { name: "Cotton", rating: 4, expectedYield: 8, profit: 35000, reason: "Current market prices favorable", details: {
          forecast: { yield: 8, demand: 90, profit: 35000 },
          cost: { seeds: 5000, fertilizer: 7000, water: 4000, labor: 12000, misc: 2500 },
          rationale: "Favorable market prices and high demand from textile industry.",
          guidance: { planting: "Sowing time is April-May.", fertilizers: "Requires a balanced dose of NPK.", pestControl: "Pink bollworm and whitefly are major threats." },
          calculator: { seedRate: 15, fertilizerRate: 160 }, schemes: ["Technology Mission on Cotton", "CCI procurement"]
      } },
    ],
    diseaseAnalysis: { disease: "Leaf Blight", confidence: 87, severity: "Medium", treatment: ["Spray Mancozeb 75% WP", "2g per liter water", "Apply in evening", "Repeat after 7 days"] },
    communityPosts: [
      { author: "राम शर्मा", location: "Pune", time: "2h", content: "Cotton prices up 15% in local mandi today!", likes: 25, comments: 12 },
      { author: "Dr. Priya", location: "Agri Expert", time: "4h", content: "Monsoon forecast looks good for wheat sowing", likes: 120, comments: 45 }
    ],
    knowledgeVideos: [
      { id: 1, title: "How to Start Organic Farming", channel: "Farming Guru", thumbnail: "https://i.ytimg.com/vi/a_II-y-aG4U/hqdefault.jpg", url: "https://www.youtube.com/watch?v=a_II-y-aG4U" },
      { id: 2, title: "Modern Drip Irrigation Techniques", channel: "AgriTech India", thumbnail: "https://i.ytimg.com/vi/SgRuh8f_a-w/hqdefault.jpg", url: "https://www.youtube.com/watch?v=SgRuh8f_a-w" },
      { id: 3, title: "Soil Health Management for Better Yields", channel: "Kisan Talks", thumbnail: "https://i.ytimg.com/vi/3b-y-w-Y-qQ/hqdefault.jpg", url: "https://www.youtube.com/watch?v=3b-y-w-Y-qQ" }
    ],
    notifications: [
      { id: 1, type: 'scheme', text: 'New subsidy available for solar water pumps under PM-KUSUM. Apply now!', time: 'Yesterday' },
      { id: 2, type: 'weather', text: 'Rainfall expected in your area in the next 48 hours. Plan irrigation accordingly.', time: '2 days ago' },
      { id: 3, type: 'market', text: 'Maize prices have increased by 5% in the local mandi.', time: '3 days ago' }
    ]
  };

  // --- App State ---
  const state = {
    screen: 'welcome',
    selectedLanguage: 'hi',
    tourStep: 0,
    formData: {},
    uploadedImage: null,
    showNotifications: false,
    detailedCrop: null,
    messages: [{ type: 'bot', text: 'नमस्ते! मैं आपका AI कृषि सहायक हूँ। आप मुझसे फसल, मिट्टी, या खेती के बारे में कुछ भी पूछ सकते हैं।' }]
  };

  // --- Translations / Content ---
  const content = {
    hi: {
      voicePrompt: "नमस्ते! मुझे अपने खेत के बारे में बताएं, और मैं आपका मार्गदर्शन करूंगा।",
      skipToSetup: "सेटअप पर जाएं",
      welcome: "स्वागत है!",
      selectLanguage: "भाषा चुनें",
      continue: "जारी रखें",
      getStarted: "शुरू करें",
      next: "अगला",
      back: "वापस",
      farmSetupTitle: "खेत की जानकारी सेटअप",
      farmLocation: "खेत का स्थान",
      gpsAutoDetect: "GPS ऑटो-डिटेक्ट",
      manual: "मैन्युअल",
      locationDetected: "स्थान पता चला:",
      landDetails: "भूमि का विवरण",
      acre: "एकड़",
      hectare: "हेक्टेयर",
      irrigationSource: "सिंचाई का स्रोत",
      borewell: "बोरवेल",
      canal: "नहर",
      rainFed: "वर्षा-आधारित",
      dripIrrigation: "ड्रिप सिंचाई",
      waterAvailability: "पानी की उपलब्धता",
      low: "कम",
      medium: "मध्यम",
      high: "उच्च",
      budgetOptional: "बजट (वैकल्पिक)",
      perSeason: "प्रति सीजन",
      saveAndContinue: "सहेजें और जारी रखें",
      mainDashboard: "मुख्य डैशबोर्ड",
      goodMorning: "सुप्रभात",
      choosePath: "अपना रास्ता चुनें:",
      soilAnalysis: "मिट्टी विश्लेषण",
      diseaseDetection: "रोग पहचान",
      planningNewCrop: "नई फसल की योजना?",
      cropIssue: "फसल में समस्या? मदद पाएं!",
      quickActions: "त्वरित कार्रवाइयां",
      askAI: "AI से पूछें",
      community: "समुदाय",
      learn: "सीखें",
      knowledgeCenter: "ज्ञान केंद्र",
      learnNewTechniques: "खेती की नई तकनीकें और टिप्स सीखें",
      watchVideo: "वीडियो देखें",
      selectState: "राज्य चुनें...",
      maharashtra: "महाराष्ट्र",
      punjab: "पंजाब",
      uttarPradesh: "उत्तर प्रदेश",
      tour_step1_title: "स्मार्ट फसल सिफारिशें",
      tour_step1_desc: "अपनी मिट्टी और जलवायु के आधार पर सबसे अधिक लाभदायक फसलों के लिए AI-संचालित सुझाव प्राप्त करें।",
      tour_step2_title: "रोग पहचान हुई आसान",
      tour_step2_desc: "बीमारियों की तुरंत पहचान करने और उपचार की सलाह पाने के लिए बस अपनी फसल के पत्तों की एक तस्वीर लें।",
      tour_step3_title: "विशेषज्ञों से जुड़ें",
      tour_step3_desc: "कृषि विशेषज्ञों से चैट करें और अपने समुदाय के साथी किसानों से जुड़ें।",
      tour_step4_title: "सरकारी योजनाएं और सब्सिडी",
      tour_step4_desc: "नवीनतम सरकारी योजनाओं, सब्सिडी और बाजार की कीमतों पर अपडेट रहें।",
      callExpert: "विशेषज्ञ को कॉल करें",
      buyMedicine: "दवा खरीदें",
      backToDashboard: "डैशबोर्ड पर वापस जाएं",
      loadingData: "डेटा लोड हो रहा है...",
      environmentalDataTitle: "पर्यावरणीय डेटा",
      soilAndClimateInfo: "आपके स्थान के आधार पर मिट्टी और जलवायु की जानकारी।",
      lastSeason: "पिछला सीजन",
      viewDetailedPlan: "विस्तृत योजना देखें",
      detailedPlanFor: "के लिए विस्तृत योजना",
      forecast: "पूर्वानुमान",
      yield: "उपज",
      marketDemand: "बाजार की मांग",
      profit: "मुनाफा",
      costBreakdown: "लागत का विवरण",
      seeds: "बीज",
      fertilizer: "उर्वरक",
      labor: "श्रम",
      waterMisc: "पानी और अन्य",
      netProfit: "शुद्ध लाभ",
      rationale: "तर्क",
      whyThisCrop: "यह फसल क्यों?",
      cultivationGuide: "खेती गाइड",
      planting: "रोपण",
      pestControl: "कीट नियंत्रण",
      resourceCalculator: "संसाधन कैलकुलेटर",
      yourLandSize: "आपकी जमीन का आकार (एकड़ में)",
      calculate: "गणना करें",
      requiredSeeds: "आवश्यक बीज",
      requiredFertilizer: "आवश्यक उर्वरक",
      govtSchemes: "सरकारी योजनाएं",
      notifications: "सूचनाएं",
    },
    en: {
      voicePrompt: "Hi! Tell me about your farm, and I'll guide you.",
      skipToSetup: "Skip to Setup",
      welcome: "Welcome!",
      selectLanguage: "Select Language",
      continue: "Continue",
      getStarted: "Get Started",
      next: "Next",
      back: "Back",
      farmSetupTitle: "Farm Profile Setup",
      farmLocation: "Farm Location",
      gpsAutoDetect: "GPS Auto-detect",
      manual: "Manual",
      locationDetected: "Location detected:",
      landDetails: "Land Details",
      acre: "Acre",
      hectare: "Hectare",
      irrigationSource: "Irrigation Source",
      borewell: "Borewell",
      canal: "Canal",
      rainFed: "Rain-fed",
      dripIrrigation: "Drip Irrigation",
      waterAvailability: "Water Availability",
      low: "Low",
      medium: "Medium",
      high: "High",
      budgetOptional: "Budget (Optional)",
      perSeason: "per season",
      saveAndContinue: "Save & Continue",
      mainDashboard: "Main Dashboard",
      goodMorning: "Good Morning",
      choosePath: "Choose Your Path:",
      soilAnalysis: "Soil Analysis",
      diseaseDetection: "Disease Detection",
      planningNewCrop: "Planning New Crop?",
      cropIssue: "Crop Issue? Get Help!",
      quickActions: "Quick Actions",
      askAI: "Ask AI",
      community: "Community",
      learn: "Learn",
      knowledgeCenter: "Knowledge Center",
      learnNewTechniques: "Learn new farming techniques and tips",
      watchVideo: "Watch Video",
      selectState: "Select State...",
      maharashtra: "Maharashtra",
      punjab: "Punjab",
      uttarPradesh: "Uttar Pradesh",
      tour_step1_title: "Smart Crop Recommendations",
      tour_step1_desc: "Get AI-powered suggestions for the most profitable crops based on your soil and climate conditions.",
      tour_step2_title: "Disease Detection Made Easy",
      tour_step2_desc: "Simply take a photo of your crop leaves to instantly identify diseases and get treatment advice.",
      tour_step3_title: "Connect with Experts",
      tour_step3_desc: "Chat with agricultural experts and connect with fellow farmers in your community.",
      tour_step4_title: "Government Schemes & Subsidies",
      tour_step4_desc: "Stay updated on latest government schemes, subsidies, and market prices.",
      callExpert: "Call Expert",
      buyMedicine: "Buy Medicine",
      backToDashboard: "Back to Dashboard",
      loadingData: "Loading Data...",
      environmentalDataTitle: "Environmental Data",
      soilAndClimateInfo: "Soil and climate information based on your location.",
      lastSeason: "Last Season",
      viewDetailedPlan: "View Detailed Plan",
      detailedPlanFor: "Detailed Plan for",
      forecast: "Forecast",
      yield: "Yield",
      marketDemand: "Market Demand",
      profit: "Profit",
      costBreakdown: "Cost Breakdown",
      seeds: "Seeds",
      fertilizer: "Fertilizer",
      labor: "Labor",
      waterMisc: "Water & Misc.",
      netProfit: "Net Profit",
      rationale: "Rationale",
      whyThisCrop: "Why this Crop?",
      cultivationGuide: "Cultivation Guide",
      planting: "Planting",
      pestControl: "Pest Control",
      resourceCalculator: "Resource Calculator",
      yourLandSize: "Your Land Size (in acres)",
      calculate: "Calculate",
      requiredSeeds: "Required Seeds",
      requiredFertilizer: "Required Fertilizer",
      govtSchemes: "Government Schemes",
      notifications: "Notifications",
    }
  };

  // --- Helper functions for DOM ---
  function el(tag, cls, children) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (Array.isArray(children)) children.forEach(c => appendChild(e, c));
    else if (children !== undefined && children !== null) appendChild(e, children);
    return e;
  }
  function appendChild(parent, child) {
    if (typeof child === 'string' || typeof child === 'number') parent.appendChild(document.createTextNode(child));
    else parent.appendChild(child);
  }

  function t(key) {
    return (content[state.selectedLanguage] && content[state.selectedLanguage][key]) || content.en[key] || key;
  }

  // --- High-level render ---
  const root = document.getElementById('app');

  function render() {
    root.innerHTML = ''; // clear
    // make container
    const container = el('div','container');

    // header (common)
    const header = el('div','header card');
    const headerTop = el('div','header-top');
    const left = el('div','col');
    left.appendChild(el('div','large-title', t('mainDashboard')));
    left.appendChild(el('div','small-muted', `${t('goodMorning')}, ${sampleData.user.name}`));
    headerTop.appendChild(left);
    const right = el('div','flex');
    // home button
    const homeBtn = el('button','icon-btn', '🏠');
    homeBtn.title = 'Home';
    homeBtn.onclick = () => { state.screen = 'dashboard'; render(); };
    right.appendChild(homeBtn);
    // notifications
    const notifBtn = el('button','icon-btn', '🔔');
    notifBtn.title = t('notifications');
    notifBtn.onclick = () => { state.showNotifications = true; render(); };
    const notifCount = el('span','badge', sampleData.notifications.length);
    notifCount.style.marginLeft = '6px';
    right.appendChild(notifBtn);
    right.appendChild(notifCount);
    headerTop.appendChild(right);
    header.appendChild(headerTop);
    // weather widget
    const weather = el('div','header-weather');
    const sun = el('div', '', '☀️');
    const winfo = el('div');
    winfo.appendChild(el('div','', sampleData.weatherData.temperature));
    winfo.appendChild(el('div','small-muted', sampleData.weatherData.forecast));
    weather.appendChild(sun);
    weather.appendChild(winfo);
    const wmeta = el('div','small-muted', `Humidity: ${sampleData.weatherData.humidity} • Annual: ${sampleData.weatherData.rainfall}`);
    weather.appendChild(wmeta);
    header.appendChild(weather);

    container.appendChild(header);

    // switch screens:
    if (state.showNotifications) {
      // create and append notifications overlay
      const tpl = document.getElementById('notifications-template');
      const clone = tpl.content.cloneNode(true);
      document.body.appendChild(clone);
      const overlay = document.getElementById('notif-overlay');
      overlay.onclick = (e) => {
        if (e.target === overlay) closeNotifications();
      };
      const panel = document.getElementById('notifications-panel');
      document.getElementById('close-notif').onclick = closeNotifications;
      const list = document.getElementById('notif-list');
      list.innerHTML = '';
      sampleData.notifications.forEach(n => {
        const item = el('div','list-item');
        const left = el('div','col');
        const tag = el('div','small-muted', n.time);
        left.appendChild(el('div','','' + n.text));
        left.appendChild(tag);
        item.appendChild(left);
        list.appendChild(item);
      });
    } else {
      // ensure any leftover overlay is removed
      const existing = document.querySelector('.overlay');
      if (existing) existing.remove();
    }

    // screen specific rendering
    let contentWrap;
    switch (state.screen) {
      case 'welcome': contentWrap = renderWelcome(); break;
      case 'tour': contentWrap = renderTour(); break;
      case 'farmSetup': contentWrap = renderFarmSetup(); break;
      case 'environmentalData': contentWrap = renderEnvironmental(); break;
      case 'dashboard': contentWrap = renderDashboard(); break;
      case 'soilPath': contentWrap = renderSoilPath(); break;
      case 'leafPath': contentWrap = renderLeafPath(); break;
      case 'cropRecommendation': contentWrap = renderCropRecommendations(); break;
      case 'detailedPlan': contentWrap = renderDetailedPlan(); break;
      case 'diseaseResults': contentWrap = renderDiseaseResults(); break;
      case 'community': contentWrap = renderCommunity(); break;
      case 'knowledge': contentWrap = renderKnowledge(); break;
      case 'chat': contentWrap = renderChat(); break;
      case 'manualSoil': contentWrap = renderManualSoil(); break;
      default: contentWrap = renderWelcome(); break;
    }
    container.appendChild(contentWrap);
    root.appendChild(container);
  }

  function closeNotifications(){
    state.showNotifications = false;
    const overlay = document.querySelector('.overlay');
    if (overlay) overlay.remove();
    render();
  }

  // --- Screens ---
  function renderWelcome(){
    const wrap = el('div','welcome-wrap');
    const card = el('div','welcome-card card');
    card.appendChild(el('h1','large-title', '🌾 किसान मित्र'));
    card.appendChild(el('p','small-muted','AI Farming Co-Pilot'));
    card.appendChild(el('h3','',''));
    card.appendChild(el('div','mb-4', t('selectLanguage')));

    ['hi','mr','en'].forEach(code=>{
      const names = {hi:'हिंदी', mr:'मराठी', en:'English'};
      const btn = el('button','lang-btn', [
        el('span','',''+names[code]),
        el('span','','' + (state.selectedLanguage === code ? '✓' : ''))
      ]);
      btn.onclick = () => { state.selectedLanguage = code; render(); };
      card.appendChild(btn);
    });

    const voice = el('div','card small-muted', `"${(content[state.selectedLanguage] || content.en).voicePrompt}"`);
    voice.style.marginTop = '12px';
    card.appendChild(voice);

    const cont = el('div','mt-8');
    const btn = el('button','btn btn-primary', t('continue') + ' →');
    btn.onclick = () => { state.screen = 'tour'; render(); };
    cont.appendChild(btn);

    const skip = el('div','center small muted');
    const skipLink = el('button','btn-ghost btn', t('skipToSetup'));
    skipLink.onclick = () => { state.screen = 'farmSetup'; render(); };
    skip.appendChild(skipLink);

    card.appendChild(cont);
    card.appendChild(skip);

    wrap.appendChild(card);
    return wrap;
  }

  function renderTour(){
    const wrap = el('div','tour');
    const steps = [
      { title: t('tour_step1_title'), desc: t('tour_step1_desc'), icon:'🌾', color:'#81fbb8' },
      { title: t('tour_step2_title'), desc: t('tour_step2_desc'), icon:'🔍', color:'#93c5fd' },
      { title: t('tour_step3_title'), desc: t('tour_step3_desc'), icon:'👥', color:'#c4b5fd' },
      { title: t('tour_step4_title'), desc: t('tour_step4_desc'), icon:'💰', color:'#ffcc80' }
    ];
    const s = steps[state.tourStep];

    const box = el('div','tour-step card');
    const icon = el('div','center', s.icon);
    icon.style.fontSize = '40px';
    box.appendChild(icon);
    box.appendChild(el('h2','center large-title', s.title));
    box.appendChild(el('p','center small-muted', s.desc));

    const dots = el('div','tour-dots');
    steps.forEach((_,i) => {
      const dot = el('div', '', '●');
      dot.style.opacity = i === state.tourStep ? '1' : '0.2';
      dot.style.fontSize = '12px';
      dot.onclick = () => { state.tourStep = i; render(); };
      dots.appendChild(dot);
    });
    box.appendChild(dots);

    const foot = el('div','flex');
    const skip = el('button','btn-ghost btn', t('skipToSetup'));
    skip.onclick = () => { state.screen='farmSetup'; render(); };
    foot.appendChild(skip);
    const next = el('button','btn btn-primary', state.tourStep < steps.length-1 ? t('next') + ' →' : t('getStarted'));
    next.onclick = () => {
      if (state.tourStep < steps.length-1) { state.tourStep++; render(); } else { state.screen='farmSetup'; render(); }
    };
    foot.appendChild(next);
    box.appendChild(foot);

    wrap.appendChild(box);
    return wrap;
  }

  function renderFarmSetup(){
    const wrap = el('div','card');
    wrap.appendChild(el('h2','large-title','🌾 ' + t('farmSetupTitle')));
    // location
    wrap.appendChild(el('label','',' ' + t('farmLocation')));
    const locWrap = el('div','flex');
    const gpsBtn = el('button','btn-ghost btn', '📍 ' + t('gpsAutoDetect'));
    gpsBtn.onclick = () => { state.formData.location = sampleData.user.location; render(); };
    const manualBtn = el('button','btn-ghost btn', '📝 ' + t('manual'));
    manualBtn.onclick = () => { state.formData.location = 'Manual'; render(); };
    locWrap.appendChild(gpsBtn);
    locWrap.appendChild(manualBtn);
    wrap.appendChild(locWrap);
    const locDesc = el('div','small-muted', state.formData.location ? (t('locationDetected') + ' ' + state.formData.location) : '');
    wrap.appendChild(locDesc);

    // land details
    wrap.appendChild(el('label','', '🌾 ' + t('landDetails')));
    const landRow = el('div','flex');
    const landInput = el('input','input');
    landInput.type='number';
    landInput.placeholder='5';
    landInput.value = state.formData.landSize || '';
    landInput.oninput = (e) => { state.formData.landSize = e.target.value; };
    landRow.appendChild(landInput);
    const unit = el('select','input');
    unit.innerHTML = `<option>${t('acre')}</option><option>${t('hectare')}</option>`;
    landRow.appendChild(unit);
    wrap.appendChild(landRow);

    const irrig = el('select','input');
    irrig.innerHTML = `<option>${t('irrigationSource')}</option><option>${t('borewell')}</option><option>${t('canal')}</option><option>${t('rainFed')}</option><option>${t('dripIrrigation')}</option>`;
    irrig.onchange = (e) => state.formData.irrigation = e.target.value;
    wrap.appendChild(irrig);

    // water availability
    wrap.appendChild(el('label','','💧 ' + t('waterAvailability')));
    const waterRow = el('div','flex');
    ['low','medium','high'].forEach(key=>{
      const b = el('button','btn-ghost btn', t(key));
      b.onclick = () => { state.formData.waterAvailability = key; render(); };
      if (state.formData.waterAvailability === key) b.style.background = '#e6ffed';
      waterRow.appendChild(b);
    });
    wrap.appendChild(waterRow);

    // budget
    wrap.appendChild(el('label','','💰 ' + t('budgetOptional')));
    const bud = el('input','input');
    bud.type='number'; bud.placeholder='50000'; bud.value = state.formData.budget || '';
    bud.oninput = (e)=> state.formData.budget = e.target.value;
    wrap.appendChild(bud);
    wrap.appendChild(el('div','small-muted', '₹ ' + t('perSeason')));

    // actions
    const go = el('div','mt-8');
    const save = el('button','btn btn-primary', t('saveAndContinue') + ' →');
    save.onclick = () => { state.screen = 'environmentalData'; render(); };
    go.appendChild(save);
    wrap.appendChild(go);

    return wrap;
  }

  function renderEnvironmental(){
    const wrap = el('div','card');
    wrap.appendChild(el('h2','large-title','🌱 ' + t('environmentalDataTitle')));
    wrap.appendChild(el('p','small-muted', t('soilAndClimateInfo')));
    const soilCard = el('div','card');
    soilCard.appendChild(el('h3','','Soil Information'));
    soilCard.appendChild(el('div','small-muted','Type: Loamy Soil'));
    soilCard.appendChild(el('div','small-muted','pH: 6.8 (Good)'));
    soilCard.appendChild(el('div','small-muted','Organic Matter: 2.1%'));
    wrap.appendChild(soilCard);

    const climateCard = el('div','card mt-8');
    climateCard.appendChild(el('h3','','Climate Data'));
    climateCard.appendChild(el('div','small-muted','Rainfall: 800mm/year'));
    climateCard.appendChild(el('div','small-muted','Temperature: 22-35°C'));
    climateCard.appendChild(el('div','small-muted','Humidity: 65%'));
    wrap.appendChild(climateCard);

    const btn = el('button','btn btn-primary mt-8','Complete Setup ✅');
    btn.onclick = () => { state.screen = 'dashboard'; render(); };
    wrap.appendChild(btn);
    return wrap;
  }

  function renderDashboard(){
    const wrap = el('div','col');
    // options
    wrap.appendChild(el('h2','large-title', t('choosePath')));
    const opt1 = el('button','options-btn', [
      el('div', '', [el('div','','🌱 ' + t('soilAnalysis')), el('div','small-muted', t('planningNewCrop'))]),
      el('div','', '➡')
    ]);
    opt1.onclick = () => { state.screen='soilPath'; render(); };
    opt1.style.background = 'linear-gradient(90deg,#34d399,#10b981)';
    wrap.appendChild(opt1);

    const opt2 = el('button','options-btn', [
      el('div', '', [el('div','','🍃 ' + t('diseaseDetection')), el('div','small-muted', t('cropIssue'))]),
      el('div','', '➡')
    ]);
    opt2.onclick = () => { state.screen='leafPath'; render(); };
    opt2.style.background = 'linear-gradient(90deg,#60a5fa,#3b82f6)';
    wrap.appendChild(opt2);

    // quick actions
    wrap.appendChild(el('h3','mt-8','📱 ' + t('quickActions')));
    const quick = el('div','quick-grid');
    const q1 = el('button','card', ['🤖', el('div','','' + t('askAI'))]);
    q1.onclick = () => { state.screen='chat'; render(); };
    quick.appendChild(q1);
    const q2 = el('button','card', ['👥', el('div','','' + t('community'))]);
    q2.onclick = () => { state.screen='community'; render(); };
    quick.appendChild(q2);
    const q3 = el('button','card', ['📚', el('div','','' + t('learn'))]);
    q3.onclick = () => { state.screen='knowledge'; render(); };
    quick.appendChild(q3);
    wrap.appendChild(quick);

    // recommended crops preview
    wrap.appendChild(el('h3','mt-8','🎯 Top Crop Recommendations'));
    sampleData.cropRecommendations.slice(0,3).forEach((crop, idx) => {
      const item = el('div','list-item');
      const left = el('div','flex');
      const emoji = crop.name === 'Wheat' ? '🌾' : crop.name === 'Maize' ? '🌽':'🌿';
      left.appendChild(el('div','', emoji));
      left.appendChild(el('div','col',[ el('div','','' + (idx+1) + '. ' + crop.name), el('div','small-muted', crop.reason) ]));
      item.appendChild(left);
      const right = el('div','col');
      right.appendChild(el('div','', '₹' + crop.profit.toLocaleString()));
      const vbtn = el('button','btn btn-ghost','View Plan');
      vbtn.onclick = () => { state.detailedCrop = crop; state.screen='detailedPlan'; render(); };
      right.appendChild(vbtn);
      item.appendChild(right);
      wrap.appendChild(item);
    });

    return wrap;
  }

  function renderSoilPath(){
    const wrap = el('div','col');
    const header = el('div','card');
    header.appendChild(el('h2','large-title','📸 Soil Photo Upload'));
    wrap.appendChild(header);

    const uploadCard = el('div','card mt-8');
    const drop = el('div','card center');
    drop.style.border = '2px dashed #d1d5db';
    drop.style.padding = '30px';
    if (state.uploadedImage) {
      const img = el('img','', '');
      img.src = state.uploadedImage;
      img.style.width = '120px'; img.style.height='120px'; img.style.objectFit='cover';
      drop.appendChild(img);
      drop.appendChild(el('div','small-muted','✅ Soil image uploaded!'));
    } else {
      drop.appendChild(el('div','','📷'));
      drop.appendChild(el('div','small-muted','Tap to take soil photo'));
      drop.onclick = () => { state.uploadedImage = 'https://placehold.co/200x200/c2b280/FFFFFF?text=Soil'; render(); };
    }
    uploadCard.appendChild(drop);

    uploadCard.appendChild(el('div','small-muted mt-8', 'Tips for best results: Clear, bright lighting, 6 inches from soil, avoid shadows'));

    const lastSeason = el('select','input mt-8');
    lastSeason.innerHTML = `<option>${t('lastSeason')}</option><option>Rice</option><option>Wheat</option><option>Cotton</option>`;
    uploadCard.appendChild(lastSeason);

    const row = el('div','flex mt-8');
    const gBtn = el('button','btn btn-ghost','Gallery');
    gBtn.onclick = ()=> { state.uploadedImage='https://placehold.co/200x200/c2b280/FFFFFF?text=Soil'; render(); };
    const cBtn = el('button','btn btn-primary','Camera');
    cBtn.onclick = ()=> { state.uploadedImage='https://placehold.co/200x200/c2b280/FFFFFF?text=Soil'; render(); };
    row.appendChild(gBtn); row.appendChild(cBtn);
    uploadCard.appendChild(row);

    if (state.uploadedImage) {
      const gen = el('button','btn btn-primary mt-8','Generate Recommendations ✨');
      gen.onclick = () => { state.screen='cropRecommendation'; render(); };
      uploadCard.appendChild(gen);
    }

    wrap.appendChild(uploadCard);
    return wrap;
  }

  function renderLeafPath(){
    const wrap = el('div','col');
    const header = el('div','card');
    header.appendChild(el('h2','large-title','🍃 Leaf Disease Detection'));
    wrap.appendChild(header);

    const chooseCard = el('div','card mt-8');
    chooseCard.appendChild(el('h3','','Select Your Crop'));
    const sel = el('select','input');
    sel.innerHTML = `<option>Rice</option><option>Wheat</option><option>Cotton</option>`;
    chooseCard.appendChild(sel);
    wrap.appendChild(chooseCard);

    const uploadCard = el('div','card mt-8');
    const drop = el('div','card center');
    drop.style.border = '2px dashed #bfdbfe';
    drop.style.padding = '30px';
    if (state.uploadedImage) {
      const img = el('img','', ''); img.src = state.uploadedImage; img.style.width='120px'; img.style.height='120px';
      drop.appendChild(img);
      drop.appendChild(el('div','small-muted','✅ Leaf image uploaded!'));
    } else {
      drop.appendChild(el('div','','🍃'));
      drop.appendChild(el('div','small-muted','Upload leaf photo'));
      drop.onclick = ()=>{ state.uploadedImage='https://placehold.co/200x200/90ee90/FFFFFF?text=Leaf'; render(); };
    }
    uploadCard.appendChild(drop);
    const row = el('div','flex mt-8');
    const gBtn = el('button','btn btn-ghost','Gallery'); gBtn.onclick = ()=>{ state.uploadedImage='https://placehold.co/200x200/90ee90/FFFFFF?text=Leaf'; render(); };
    const cBtn = el('button','btn btn-primary','Camera'); cBtn.onclick = ()=>{ state.uploadedImage='https://placehold.co/200x200/90ee90/FFFFFF?text=Leaf'; render(); };
    row.appendChild(gBtn); row.appendChild(cBtn);
    uploadCard.appendChild(row);

    if (state.uploadedImage) {
      const analyze = el('button','btn btn-primary mt-8','Analyze Disease 🔍');
      analyze.onclick = ()=>{ state.screen='diseaseResults'; render(); };
      uploadCard.appendChild(analyze);
    }
    wrap.appendChild(uploadCard);
    return wrap;
  }

  function renderCropRecommendations(){
    const wrap = el('div','col');
    const header = el('div','card'); header.appendChild(el('h2','large-title','🎯 Top Crop Recommendations')); wrap.appendChild(header);

    sampleData.cropRecommendations.forEach((crop, idx) => {
      const card = el('div','card mt-8');
      const top = el('div','flex');
      top.appendChild(el('div','','' + (crop.name === 'Wheat' ? '🌾' : crop.name === 'Maize' ? '🌽' : '🌿')));
      top.appendChild(el('div','col',[ el('div','','' + (idx+1) + '. ' + crop.name), el('div','small-muted', crop.reason) ]));
      top.style.justifyContent = 'space-between';
      card.appendChild(top);
      card.appendChild(el('div','small-muted','₹' + crop.profit.toLocaleString() + ' per acre'));
      const view = el('button','btn btn-primary mt-8','' + t('viewDetailedPlan') || 'View Detailed Plan');
      view.onclick = ()=>{ state.detailedCrop = crop; state.screen='detailedPlan'; render(); };
      card.appendChild(view);
      wrap.appendChild(card);
    });
    return wrap;
  }

  function renderDetailedPlan(){
    const crop = state.detailedCrop;
    if (!crop) { state.screen='cropRecommendation'; render(); return el('div','card'); }
    const wrap = el('div','col');
    const header = el('div','card'); header.appendChild(el('h2','large-title', `${t('detailedPlanFor')} ${crop.name}`)); wrap.appendChild(header);

    // Forecast card
    const forecast = el('div','card mt-8');
    forecast.appendChild(el('h3','','' + t('forecast')));
    forecast.appendChild(el('div','small-muted', `${t('yield')}: ${crop.details.forecast.yield} q/acre`));
    forecast.appendChild(el('div','small-muted', `${t('marketDemand')}: ${crop.details.forecast.demand}%`));
    forecast.appendChild(el('div','small-muted', `${t('profit')}: ₹${(crop.details.forecast.profit).toLocaleString()}`));
    wrap.appendChild(forecast);

    // Cost breakdown
    const cost = el('div','card mt-8');
    cost.appendChild(el('h3','','' + t('costBreakdown')));
    const totalCost = Object.values(crop.details.cost).reduce((a,b)=>a+b,0);
    Object.entries(crop.details.cost).forEach(([k,v]) => {
      cost.appendChild(el('div','small-muted', `${k.charAt(0).toUpperCase()+k.slice(1)}: ₹${v.toLocaleString()}`));
    });
    cost.appendChild(el('hr'));
    cost.appendChild(el('div','','Total cost: ₹' + totalCost.toLocaleString()));
    cost.appendChild(el('div','','' + t('netProfit') + ': ₹' + crop.profit.toLocaleString()));
    wrap.appendChild(cost);

    // Why this crop
    const why = el('div','card mt-8'); why.appendChild(el('h3','','' + t('whyThisCrop'))); why.appendChild(el('div','small-muted', crop.details.rationale)); wrap.appendChild(why);

    // cultivation guide
    const guide = el('div','card mt-8');
    guide.appendChild(el('h3','','' + t('cultivationGuide')));
    const tabs = el('div','flex');
    const tabslist = ['planting','fertilizers','pestControl'];
    let active = 'planting';
    const contentBox = el('div','small-muted mt-4', crop.details.guidance[active]);
    tabslist.forEach(tab=>{
      const b = el('button','btn-ghost btn', t(tab) || tab);
      b.onclick = ()=>{ active = tab; contentBox.textContent = crop.details.guidance[tab]; };
      tabs.appendChild(b);
    });
    guide.appendChild(tabs);
    guide.appendChild(contentBox);
    wrap.appendChild(guide);

    // resource calculator
    const calc = el('div','card mt-8');
    calc.appendChild(el('h3','','' + t('resourceCalculator')));
    const areaInput = el('input','input'); areaInput.type='number'; areaInput.value = 1;
    calc.appendChild(el('label','','' + t('yourLandSize'))); calc.appendChild(areaInput);
    const calcResult = el('div','small-muted mt-4', '');
    const compute = () => {
      const a = Number(areaInput.value) || 1;
      calcResult.innerHTML = `${t('requiredSeeds')}: ${(a * crop.details.calculator.seedRate).toFixed(1)} kg<br>${t('requiredFertilizer')}: ${(a * crop.details.calculator.fertilizerRate).toFixed(1)} kg`;
    };
    areaInput.oninput = compute;
    compute();
    calc.appendChild(calcResult);
    wrap.appendChild(calc);

    // schemes
    const schemes = el('div','card mt-8');
    schemes.appendChild(el('h3','','' + t('govtSchemes')));
    const ul = el('ul','small-muted');
    crop.details.schemes.forEach(s => { ul.appendChild(el('li','', s)); });
    schemes.appendChild(ul);
    wrap.appendChild(schemes);

    return wrap;
  }

  function renderDiseaseResults(){
    const wrap = el('div','col');
    const header = el('div','card'); header.appendChild(el('h2','large-title','🔍 Disease Analysis')); wrap.appendChild(header);

    const card = el('div','card mt-8');
    card.appendChild(el('div','','⚠ ' + sampleData.diseaseAnalysis.disease));
    card.appendChild(el('div','small-muted','Confidence: ' + sampleData.diseaseAnalysis.confidence + '%'));
    card.appendChild(el('div','small-muted','Severity: ' + sampleData.diseaseAnalysis.severity));
    card.appendChild(el('h4','','🩺 Treatment Plan:'));
    const ul = el('ul','small-muted');
    sampleData.diseaseAnalysis.treatment.forEach((t,i)=> ul.appendChild(el('li','', t)));
    card.appendChild(ul);
    wrap.appendChild(card);

    const actions = el('div','mt-8');
    const call = el('button','btn btn-primary','📞 ' + t('callExpert'));
    const buy = el('button','btn btn-primary','🛒 ' + t('buyMedicine'));
    call.onclick = ()=> alert('Calling expert...');
    buy.onclick = ()=> alert('Taking you to shop...');
    actions.appendChild(call); actions.appendChild(buy);
    actions.appendChild(el('button','btn-ghost btn', '← ' + t('backToDashboard')));
    wrap.appendChild(actions);
    return wrap;
  }

  function renderCommunity(){
    const wrap = el('div','col');
    const header = el('div','card'); header.appendChild(el('h2','large-title','👥 Farmer Community')); wrap.appendChild(header);
    sampleData.communityPosts.forEach(p=>{
      const post = el('div','post mt-8');
      post.appendChild(el('div','flex',[ el('div','','' + p.author.charAt(0)), el('div','col',[ el('div','','' + p.author), el('div','small-muted', p.location + ' • ' + p.time) ]) ]));
      post.appendChild(el('p','', '"' + p.content + '"'));
      const foot = el('div','flex small-muted'); foot.appendChild(el('div','','👍 ' + p.likes)); foot.appendChild(el('div','','💬 ' + p.comments));
      post.appendChild(foot);
      wrap.appendChild(post);
    });
    wrap.appendChild(el('button','btn btn-primary mt-8','➕ Share Update'));
    return wrap;
  }

  function renderKnowledge(){
    const wrap = el('div','col');
    const header = el('div','card'); header.appendChild(el('h2','large-title','📚 ' + t('knowledgeCenter'))); wrap.appendChild(header);
    sampleData.knowledgeVideos.forEach(v=>{
      const tile = el('a','video-tile');
      tile.href = v.url; tile.target='_blank';
      const thumb = el('img','', ''); thumb.src = v.thumbnail; thumb.style.width='120px'; thumb.style.height='80px'; thumb.style.objectFit='cover'; thumb.style.borderRadius='8px';
      tile.appendChild(thumb);
      tile.appendChild(el('div','col',[el('div','','' + v.title), el('div','small-muted', v.channel), el('div','small-muted','▶ ' + t('watchVideo'))]));
      wrap.appendChild(tile);
    });
    return wrap;
  }

  function renderChat(){
    const wrap = el('div','card chat-container');
    wrap.appendChild(el('h2','large-title','🤖 AI Assistant'));
    const chatWindow = el('div','chat-window');
    state.messages.forEach(m => {
      const msg = el('div','msg ' + (m.type === 'user' ? 'user' : 'bot'), m.text);
      chatWindow.appendChild(msg);
    });
    wrap.appendChild(chatWindow);
    const controls = el('div','card');
    const sampleQuestions = ["कौनसी फसल ज्यादा मुनाफा देगी?", "मिट्टी का pH कैसे बढ़ाएं?", "Cotton की market price क्या है?", "Organic farming कैसे शुरू करें?"];
    const suggestions = el('div','flex');
    sampleQuestions.forEach(q => {
      const b = el('button','btn-ghost btn', q);
      b.onclick = ()=> { chatSend(q); };
      suggestions.appendChild(b);
    });
    controls.appendChild(suggestions);
    const inputRow = el('div','flex mt-8');
    const input = el('input','input'); input.placeholder = 'Type your question...';
    input.onkeypress = (e) => { if (e.key === 'Enter') chatSend(input.value); };
    const sendBtn = el('button','btn btn-primary','➡');
    sendBtn.onclick = () => { chatSend(input.value); input.value=''; };
    inputRow.appendChild(input); inputRow.appendChild(sendBtn);
    controls.appendChild(inputRow);
    wrap.appendChild(controls);
    return wrap;
  }

  function chatSend(text){
    if (!text || !text.trim()) return;
    state.messages.push({ type:'user', text });
    state.messages.push({ type:'bot', text: 'मैं आपके सवाल का जवाब तैयार कर रहा हूँ...' });
    render();
    // fake AI reply after short delay
    setTimeout(() => {
      state.messages.pop();
      state.messages.push({ type:'bot', text: 'यहाँ एक संक्षिप्त सुझाव है: ' + (text.length>50 ? text.slice(0,50) : text) });
      render();
    }, 800);
  }

  function renderManualSoil(){
    const wrap = el('div','card');
    wrap.appendChild(el('h2','large-title','📝 Soil Test Results'));
    wrap.appendChild(el('label','','pH Level: (6.0-7.5 ideal)'));
    const ph = el('input','input'); ph.type='number'; ph.step='0.1'; ph.placeholder='6.5';
    wrap.appendChild(ph);
    wrap.appendChild(el('h3','','🌱 Nutrients (ppm):'));
    ['Nitrogen','Phosphorus','Potassium'].forEach(n => {
      const row = el('div','flex'); row.appendChild(el('label','','' + n + ':')); const v = el('input','input'); v.type='number'; v.placeholder='50'; row.appendChild(v); wrap.appendChild(row);
    });
    wrap.appendChild(el('label','','🌾 ' + t('lastSeason')));
    const s = el('select','input'); s.innerHTML = `<option>Rice</option><option>Wheat</option><option>Cotton</option>`;
    wrap.appendChild(s);
    const gen = el('button','btn btn-primary mt-8','Generate Recommendations ✨');
    gen.onclick = () => { state.screen = 'cropRecommendation'; render(); };
    wrap.appendChild(gen);
    return wrap;
  }

  // initial render
  render();

  // Expose for debugging if needed
  window.__app = { state, render };

})();
