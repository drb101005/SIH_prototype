import React, { useState, useEffect } from 'react';
import { Camera, MapPin, Leaf, Users, BookOpen, Bell, Phone, ShoppingCart, ArrowLeft, ArrowRight, Play, Upload, Eye, DollarSign, Droplets, Sun, Youtube, ThumbsUp, MessageCircle, Share2, X, BarChart2, Home, Sprout, Info, Plus, Minus } from 'lucide-react';

// Sample data with added knowledge videos and detailed plans
const sampleData = {
  user: {
    name: "राम शर्मा",
    phone: "+91 9876543210",
    location: "Pune, Maharashtra",
    preferredLanguage: "hi"
  },
  weatherData: {
    temperature: "28°C",
    humidity: "65%",
    rainfall: "800mm/year",
    forecast: "Sunny"
  },
  cropRecommendations: [
    { 
      name: "Wheat", 
      rating: 5, 
      expectedYield: 25, 
      profit: 45000, 
      reason: "High market demand, suitable soil conditions",
      details: {
        forecast: { yield: 25, demand: 85, profit: 45000 },
        cost: { seeds: 4000, fertilizer: 6000, water: 3000, labor: 10000, misc: 2000 },
        rationale: "Wheat is highly suitable for your region's loamy soil and winter climate. Market prices are consistently strong, and it's an MSP-supported crop, ensuring profit.",
        guidance: {
          planting: "Sow seeds in November. Maintain row spacing of 20-22 cm. Seed depth should be 5 cm.",
          fertilizers: "Basal Dose: 50kg N, 60kg P, 40kg K per hectare. Top Dressing: Apply 50kg N after 21-25 days.",
          pestControl: "Watch for aphids and termites. Use recommended pesticides like Imidacloprid if infestation occurs."
        },
        calculator: { seedRate: 100, fertilizerRate: 150 },
        schemes: ["PM-KISAN", "Pradhan Mantri Fasal Bima Yojana (PMFBY)", "MSP for Wheat"]
      }
    },
    { 
      name: "Maize", 
      rating: 5, 
      expectedYield: 30, 
      profit: 40000, 
      reason: "Good for your soil type, drought resistant",
      details: {
        forecast: { yield: 30, demand: 75, profit: 40000 },
        cost: { seeds: 3500, fertilizer: 5000, water: 2500, labor: 9000, misc: 1500 },
        rationale: "Maize is a hardy crop that performs well in loamy soil and is relatively drought-resistant, making it a safe choice for your water availability. Strong demand from the poultry feed industry.",
        guidance: {
          planting: "Best sown during Kharif season (June-July). Use a seed rate of 20 kg/ha. Spacing: 60x20 cm.",
          fertilizers: "Apply 120kg N, 60kg P, and 40kg K per hectare. Apply Nitrogen in 3 split doses.",
          pestControl: "Stem borer is a common pest. Use Pheromone traps and spray Chlorantraniliprole if needed."
        },
        calculator: { seedRate: 20, fertilizerRate: 120 },
        schemes: ["National Food Security Mission (NFSM)", "Rashtriya Krishi Vikas Yojana (RKVY)"]
      }
    },
    { 
      name: "Cotton", 
      rating: 4, 
      expectedYield: 8, 
      profit: 35000, 
      reason: "Current market prices favorable",
       details: {
        forecast: { yield: 8, demand: 90, profit: 35000 },
        cost: { seeds: 5000, fertilizer: 7000, water: 4000, labor: 12000, misc: 2500 },
        rationale: "Favorable market prices and high demand from the textile industry make cotton a profitable option. Your soil type is suitable for high-quality staple production.",
        guidance: {
          planting: "Sowing time is April-May. Use delinted seeds. Spacing depends on the variety, typically 90x60 cm.",
          fertilizers: "Requires a balanced dose of NPK. Recommendations vary by soil test results, but a general dose is 80:40:40 kg/ha NPK.",
          pestControl: "Pink bollworm and whitefly are major threats. Regular monitoring and integrated pest management (IPM) are crucial."
        },
        calculator: { seedRate: 15, fertilizerRate: 160 },
        schemes: ["Technology Mission on Cotton", "Cotton Corporation of India (CCI) procurement"]
      }
    }
  ],
  diseaseAnalysis: {
    disease: "Leaf Blight", confidence: 87, severity: "Medium",
    treatment: ["Spray Mancozeb 75% WP", "2g per liter water", "Apply in evening", "Repeat after 7 days"]
  },
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


const FarmingApp = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [selectedLanguage, setSelectedLanguage] = useState('hi');
  const [tourStep, setTourStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showManualLocation, setShowManualLocation] = useState(false);
  
  const [detailedCrop, setDetailedCrop] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);

  // --- FULLY TRANSLATED CONTENT OBJECT ---
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
    },
    mr: {
        voicePrompt: "नमस्कार! मला तुमच्या शेताबद्दल सांगा, आणि मी तुम्हाला मार्गदर्शन करेन.",
        skipToSetup: "सेटअपवर जा",
        welcome: "स्वागत आहे!",
        selectLanguage: "भाषा निवडा",
        continue: "पुढे जा",
        getStarted: "सुरु करा",
        next: "पुढे",
        back: "मागे",
        farmSetupTitle: "शेती प्रोफाइल सेटअप",
        farmLocation: "शेताचे ठिकाण",
        gpsAutoDetect: "GPS ऑटो-डिटेक्ट",
        manual: "मॅन्युअल",
        locationDetected: "ठिकाण आढळले:",
        landDetails: "जमिनीचा तपशील",
        acre: "एकर",
        hectare: "हेक्टर",
        irrigationSource: "सिंचनाचा स्रोत",
        borewell: "बोरवेल",
        canal: "कालवा",
        rainFed: "पावसावर अवलंबून",
        dripIrrigation: "ठिबक सिंचन",
        waterAvailability: " पाण्याची उपलब्धता",
        low: "कमी",
        medium: "मध्यम",
        high: "जास्त",
        budgetOptional: "बजेट (ऐच्छिक)",
        perSeason: "प्रति हंगाम",
        saveAndContinue: "जतन करा आणि पुढे जा",
        mainDashboard: "मुख्य डॅशबोर्ड",
        goodMorning: "शुभ सकाळ",
        choosePath: "आपला मार्ग निवडा:",
        soilAnalysis: "माती विश्लेषण",
        diseaseDetection: "रोग ओळख",
        planningNewCrop: "नवीन पिकाचे नियोजन करत आहात?",
        cropIssue: "पिकामध्ये समस्या आहे? मदत मिळवा!",
        quickActions: "द्रुत क्रिया",
        askAI: "AI ला विचारा",
        community: "समुदाय",
        learn: "शिका",
        knowledgeCenter: "ज्ञान केंद्र",
        learnNewTechniques: "नवीन शेती तंत्र आणि टिप्स शिका",
        watchVideo: "व्हिडिओ पहा",
        selectState: "राज्य निवडा...",
        maharashtra: "महाराष्ट्र",
        punjab: "पंजाब",
        uttarPradesh: "उत्तर प्रदेश",
        tour_step1_title: "स्मार्ट पीक शिफारसी",
        tour_step1_desc: "तुमच्या माती आणि हवामानावर आधारित सर्वात फायदेशीर पिकांसाठी AI-चालित सूचना मिळवा.",
        tour_step2_title: "रोग ओळख सोपी झाली",
        tour_step2_desc: "रोगांची त्वरित ओळख करून घेण्यासाठी आणि उपचारांचा सल्ला मिळवण्यासाठी फक्त तुमच्या पिकाच्या पानांचा फोटो घ्या.",
        tour_step3_title: "तज्ञांशी संपर्क साधा",
        tour_step3_desc: "कृषी तज्ञांशी गप्पा मारा आणि तुमच्या समुदायातील सहकारी शेतकऱ्यांशी संपर्क साधा.",
        tour_step4_title: "सरकारी योजना आणि सबसिडी",
        tour_step4_desc: "नवीनतम सरकारी योजना, सबसिडी आणि बाजारभावावर अपडेट रहा.",
        callExpert: "तज्ञांना कॉल करा",
        buyMedicine: "औषध खरेदी करा",
        backToDashboard: "डॅशबोर्डवर परत जा",
        loadingData: "डेटा लोड होत आहे...",
        environmentalDataTitle: "पर्यावरणीय डेटा",
        soilAndClimateInfo: "तुमच्या स्थानावर आधारित माती आणि हवामानाची माहिती.",
        lastSeason: "मागील हंगाम",
        viewDetailedPlan: "तपशीलवार योजना पहा",
        detailedPlanFor: "साठी तपशीलवार योजना",
        forecast: "अंदाज",
        yield: "उत्पन्न",
        marketDemand: "बाजारातील मागणी",
        profit: "नफा",
        costBreakdown: "खर्चाचे विवरण",
        seeds: "बियाणे",
        fertilizer: "खत",
        labor: "मजुरी",
        waterMisc: "पाणी आणि इतर",
        netProfit: "निव्वळ नफा",
        rationale: "तर्क",
        whyThisCrop: "हे पीक का?",
        cultivationGuide: "लागवड मार्गदर्शक",
        planting: "लागवड",
        pestControl: "कीड नियंत्रण",
        resourceCalculator: "संसाधन कॅल्क्युलेटर",
        yourLandSize: "तुमच्या जमिनीचे क्षेत्रफळ (एकरमध्ये)",
        calculate: "गणना करा",
        requiredSeeds: "आवश्यक बियाणे",
        requiredFertilizer: "आवश्यक खत",
        govtSchemes: "सरकारी योजना",
        notifications: "सूचना",
    }
  };


  const currentContent = content[selectedLanguage] || content.en;

  // Welcome Screen Component
  const WelcomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🌾 किसान मित्र</h1>
          <p className="text-gray-600">AI Farming Co-Pilot</p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">{currentContent.selectLanguage}</h3>
          <div className="space-y-2">
            {[
              { code: 'hi', name: 'हिंदी' },
              { code: 'mr', name: 'मराठी' },
              { code: 'en', name: 'English' }
            ].map(lang => (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.code)}
                className={`w-full p-3 rounded-xl border-2 text-left transition-all ${
                  selectedLanguage === lang.code 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <span className="font-medium">{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="text-center mb-6">
          <div className="bg-blue-50 rounded-xl p-4 mb-4">
            <Play className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-sm text-blue-700">🎤 "{currentContent.voicePrompt}"</p>
          </div>
        </div>
        
        <button
          onClick={() => setCurrentScreen('tour')}
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
        >
          {currentContent.continue} →
        </button>
        <button 
           onClick={() => setCurrentScreen('farmSetup')}
           className="w-full text-center text-gray-500 mt-4 font-medium hover:text-gray-700"
        >
            {currentContent.skipToSetup}
        </button>
      </div>
    </div>
  );

  // App Tour Component
  const AppTourScreen = () => {
    const tourSteps = [
      { title: currentContent.tour_step1_title, description: currentContent.tour_step1_desc, icon: "🌾", color: "from-green-400 to-green-600" },
      { title: currentContent.tour_step2_title, description: currentContent.tour_step2_desc, icon: "🔍", color: "from-blue-400 to-blue-600" },
      { title: currentContent.tour_step3_title, description: currentContent.tour_step3_desc, icon: "👥", color: "from-purple-400 to-purple-600" },
      { title: currentContent.tour_step4_title, description: currentContent.tour_step4_desc, icon: "💰", color: "from-orange-400 to-orange-600" }
    ];

    const currentTourStep = tourSteps[tourStep];

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
            <div className="text-center mb-8">
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${currentTourStep.color} flex items-center justify-center text-3xl mx-auto mb-4`}>
                {currentTourStep.icon}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentTourStep.title}</h2>
              <p className="text-gray-600">{currentTourStep.description}</p>
            </div>
            
            <div className="flex justify-center mb-8">
              {tourSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full mx-1 ${
                    index === tourStep ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-white">
          <div className="flex justify-between max-w-md mx-auto">
            <button
              onClick={() => setCurrentScreen('farmSetup')}
              className="text-gray-500 hover:text-gray-700 font-medium"
            >
              {currentContent.skipTour}
            </button>
            
            <div className="space-x-4">
              {tourStep > 0 && (
                <button
                  onClick={() => setTourStep(tourStep - 1)}
                  className="text-green-500 hover:text-green-700 font-medium"
                >
                  ← {currentContent.back}
                </button>
              )}
              <button
                onClick={() => {
                  if (tourStep < tourSteps.length - 1) {
                    setTourStep(tourStep + 1);
                  } else {
                    setCurrentScreen('farmSetup');
                  }
                }}
                className="bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-600 font-medium"
              >
                {tourStep < tourSteps.length - 1 ? `${currentContent.next} →` : currentContent.getStarted}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Farm Setup Component with Dropdown
  const FarmSetupScreen = () => (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">🌾 {currentContent.farmSetupTitle}</h2>
          
          <div className="space-y-6">
            <div>
              <label className="flex items-center text-gray-700 font-medium mb-2">
                <MapPin className="w-5 h-5 mr-2 text-green-500" />
                {currentContent.farmLocation}
              </label>
              <div className="flex space-x-2 mb-2">
                <button 
                  onClick={() => setShowManualLocation(false)}
                  className={`flex-1 border rounded-xl py-2 px-4 text-sm font-medium ${!showManualLocation ? 'bg-green-500 text-white border-green-500' : 'bg-gray-50 text-gray-700 border-gray-200'}`}>
                  📍 {currentContent.gpsAutoDetect}
                </button>
                <button 
                   onClick={() => setShowManualLocation(true)}
                  className={`flex-1 border rounded-xl py-2 px-4 text-sm font-medium ${showManualLocation ? 'bg-green-500 text-white border-green-500' : 'bg-gray-50 text-gray-700 border-gray-200'}`}>
                  📝 {currentContent.manual}
                </button>
              </div>
              {showManualLocation ? (
                <div className="mt-4">
                  <select className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-2 focus:border-green-500 focus:outline-none bg-white">
                    <option value="">{currentContent.selectState}</option>
                    <option value="MH">{currentContent.maharashtra}</option>
                    <option value="PB">{currentContent.punjab}</option>
                    <option value="UP">{currentContent.uttarPradesh}</option>
                  </select>
                </div>
              ) : (
                <div className="bg-green-50 rounded-xl p-3">
                  <p className="text-sm text-green-700">✅ {currentContent.locationDetected} Pune, Maharashtra</p>
                </div>
              )}
            </div>
            
            <div>
              <label className="flex items-center text-gray-700 font-medium mb-2">
                🌾 {currentContent.landDetails}
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="5"
                  className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:border-green-500 focus:outline-none"
                  value={formData.landSize || ''}
                  onChange={(e) => setFormData({...formData, landSize: e.target.value})}
                />
                <select className="border border-gray-300 rounded-xl px-4 py-2 focus:border-green-500 focus:outline-none bg-white">
                  <option>{currentContent.acre}</option>
                  <option>{currentContent.hectare}</option>
                </select>
              </div>
              <select className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-2 focus:border-green-500 focus:outline-none bg-white">
                  <option value="">{currentContent.irrigationSource}</option>
                  <option>{currentContent.borewell}</option>
                  <option>{currentContent.canal}</option>
                  <option>{currentContent.rainFed}</option>
                  <option>{currentContent.dripIrrigation}</option>
              </select>
            </div>
            
            <div>
              <label className="flex items-center text-gray-700 font-medium mb-2">
                <Droplets className="w-5 h-5 mr-2 text-blue-500" />
                {currentContent.waterAvailability}
              </label>
              <div className="flex space-x-2">
                {[{key: 'low', label: currentContent.low}, {key: 'medium', label: currentContent.medium}, {key: 'high', label: currentContent.high}].map(level => (
                  <button
                    key={level.key}
                    className={`flex-1 py-2 px-4 rounded-xl border-2 font-medium ${
                      formData.waterAvailability === level.key 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-200 text-gray-600 hover:border-blue-300'
                    }`}
                    onClick={() => setFormData({...formData, waterAvailability: level.key})}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="flex items-center text-gray-700 font-medium mb-2">
                <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                {currentContent.budgetOptional}
              </label>
              <input
                type="number"
                placeholder="50000"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:border-green-500 focus:outline-none"
                value={formData.budget || ''}
                onChange={(e) => setFormData({...formData, budget: e.target.value})}
              />
              <p className="text-sm text-gray-500 mt-1">₹ {currentContent.perSeason}</p>
            </div>
          </div>
          
          <button
            onClick={() => setCurrentScreen('environmentalData')}
            className="w-full mt-8 bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
          >
            {currentContent.saveAndContinue} →
          </button>
        </div>
      </div>
    </div>
  );

    // Environmental Data Screen
    const EnvironmentalDataScreen = () => {
        return (
            <div className="min-h-screen bg-gray-50 p-6 flex flex-col justify-center">
                <div className="max-w-md mx-auto w-full">
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">🌱 {currentContent.environmentalDataTitle}</h2>
                        <p className="text-center text-gray-500 text-sm mb-6">{currentContent.soilAndClimateInfo}</p>
                        
                        <div className="space-y-6 animate-fade-in">
                            <div className="bg-green-50 rounded-xl p-4">
                            <h3 className="font-semibold text-green-800 mb-3 flex items-center"><Leaf className="w-5 h-5 mr-2" /> Soil Information</h3>
                            <div className="text-sm space-y-2 text-green-700">
                                <div className="flex justify-between"><span>Type:</span><span className="font-medium">Loamy Soil</span></div>
                                <div className="flex justify-between"><span>pH:</span><span className="font-medium">6.8 (Good)</span></div>
                                <div className="flex justify-between"><span>Organic Matter:</span><span className="font-medium">2.1%</span></div>
                            </div>
                            </div>
                            
                            <div className="bg-blue-50 rounded-xl p-4">
                            <h3 className="font-semibold text-blue-800 mb-3 flex items-center"><Sun className="w-5 h-5 mr-2" /> Climate Data</h3>
                            <div className="text-sm space-y-2 text-blue-700">
                                <div className="flex justify-between"><span>Rainfall:</span><span className="font-medium">800mm/year</span></div>
                                <div className="flex justify-between"><span>Temperature:</span><span className="font-medium">22-35°C</span></div>
                                <div className="flex justify-between"><span>Humidity:</span><span className="font-medium">65%</span></div>
                            </div>
                            </div>
                        </div>
                        
                        <button
                            onClick={() => setCurrentScreen('dashboard')}
                            className="w-full mt-8 bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                        >
                            Complete Setup ✅
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const NotificationsPanel = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowNotifications(false)}>
            <div className="absolute top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 p-6 flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">{currentContent.notifications}</h2>
                    <button onClick={() => setShowNotifications(false)} className="p-2 rounded-full hover:bg-gray-100">
                        <X className="w-6 h-6 text-gray-600" />
                    </button>
                </div>
                <div className="flex-1 space-y-4 overflow-y-auto">
                    {sampleData.notifications.map(notif => (
                        <div key={notif.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                notif.type === 'scheme' ? 'bg-blue-100 text-blue-600' : 
                                notif.type === 'weather' ? 'bg-yellow-100 text-yellow-600' : 
                                'bg-green-100 text-green-600'
                            }`}>
                                {notif.type === 'scheme' ? <Info size={18}/> : notif.type === 'weather' ? <Sun size={18}/> : <BarChart2 size={18}/>}
                            </div>
                            <div>
                                <p className="text-sm text-gray-700">{notif.text}</p>
                                <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

  // Main Dashboard
  const DashboardScreen = () => (
    <div className="min-h-screen bg-gray-50">
      {showNotifications && <NotificationsPanel />}
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6">
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">{currentContent.mainDashboard}</h1>
          <div className="flex space-x-2">
            <button onClick={() => setCurrentScreen('welcome')} className="p-2 bg-white bg-opacity-20 rounded-xl"><Home className="w-5 h-5" /></button>
            <button onClick={() => setShowNotifications(true)} className="p-2 bg-white bg-opacity-20 rounded-xl relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center border-2 border-green-500">
                    {sampleData.notifications.length}
                </span>
            </button>
          </div>
        </div>
        
        {/* Weather Widget */}
        <div className="bg-white bg-opacity-20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Sun className="w-8 h-8" />
              <div>
                <p className="font-bold text-lg">{sampleData.weatherData.temperature}</p>
                <p className="text-sm text-green-100">{sampleData.weatherData.forecast}</p>
              </div>
            </div>
            <div className="text-right text-sm">
              <p>Humidity: {sampleData.weatherData.humidity}</p>
              <p>Annual: {sampleData.weatherData.rainfall}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Options */}
      <div className="p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">{currentContent.choosePath}</h2>
        
        <div className="space-y-4">
          <button
            onClick={() => setCurrentScreen('soilPath')}
            className="w-full bg-gradient-to-r from-green-400 to-green-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <div className="flex items-center mb-2">
                  <Leaf className="w-6 h-6 mr-2" />
                  <h3 className="text-xl font-bold">{currentContent.soilAnalysis}</h3>
                </div>
                <p className="text-green-100 text-sm">{currentContent.planningNewCrop}</p>
              </div>
              <div className="text-4xl">🌱</div>
            </div>
          </button>
          
          <button
            onClick={() => setCurrentScreen('leafPath')}
            className="w-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <div className="flex items-center mb-2">
                  <Eye className="w-6 h-6 mr-2" />
                  <h3 className="text-xl font-bold">{currentContent.diseaseDetection}</h3>
                </div>
                <p className="text-blue-100 text-sm">{currentContent.cropIssue}</p>
              </div>
              <div className="text-4xl">🍃</div>
            </div>
          </button>
        </div>
        
        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="font-bold text-gray-800 mb-4">📱 {currentContent.quickActions}</h3>
          <div className="grid grid-cols-3 gap-4">
            <button onClick={() => setCurrentScreen('chat')} className="flex flex-col items-center justify-center bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all border border-gray-200">
                <div className="text-2xl mb-2">🤖</div>
                <p className="text-sm font-medium text-gray-700 text-center">{currentContent.askAI}</p>
            </button>
            <button onClick={() => setCurrentScreen('community')} className="flex flex-col items-center justify-center bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all border border-gray-200">
                <Users className="w-6 h-6 mb-2 text-purple-500" />
                <p className="text-sm font-medium text-gray-700 text-center">{currentContent.community}</p>
            </button>
            <button onClick={() => setCurrentScreen('knowledge')} className="flex flex-col items-center justify-center bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all border border-gray-200">
                <BookOpen className="w-6 h-6 mb-2 text-orange-500" />
                <p className="text-sm font-medium text-gray-700 text-center">{currentContent.learn}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // --- NEW KNOWLEDGE/LEARN SCREEN ---
  const KnowledgeScreen = () => (
    <div className="min-h-screen bg-gray-50">
        <div className="bg-orange-500 text-white p-6 sticky top-0 z-10">
            <button onClick={() => setCurrentScreen('dashboard')} className="absolute top-6 left-4">
                <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold flex items-center justify-center">
              <Youtube className="w-8 h-8 mr-3" />
              {currentContent.knowledgeCenter}
            </h1>
        </div>
        <div className="p-6">
            <p className="text-center text-gray-600 mb-6 -mt-2">{currentContent.learnNewTechniques}</p>
            <div className="space-y-4">
                {sampleData.knowledgeVideos.map(video => (
                    <a key={video.id} href={video.url} target="_blank" rel="noopener noreferrer" className="block bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                        <div className="flex items-center space-x-4">
                            <div className="relative flex-shrink-0">
                                <img src={video.thumbnail} alt={video.title} className="w-28 h-20 object-cover rounded-lg"/>
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-lg">
                                    <Play className="w-8 h-8 text-white" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-800 leading-tight">{video.title}</h3>
                                <p className="text-sm text-gray-500 mt-1">{video.channel}</p>
                                <span className="mt-2 text-sm text-orange-600 font-semibold inline-block">{currentContent.watchVideo} →</span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    </div>
  );


  // Soil Analysis Path
  const SoilPathScreen = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-500 text-white p-6">
        <button onClick={() => setCurrentScreen('dashboard')} className="mb-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold">📸 Soil Photo Upload</h1>
      </div>
      
      <div className="p-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center mb-6">
            {uploadedImage ? (
              <div>
                <img src={uploadedImage} alt="Soil" className="w-32 h-32 object-cover rounded-lg mx-auto mb-4" />
                <p className="text-green-600 font-medium">✅ Soil image uploaded!</p>
              </div>
            ) : (
              <div>
                <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium mb-2">Tap to take soil photo</p>
                <p className="text-sm text-gray-400">For best results</p>
              </div>
            )}
          </div>
          
          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-blue-800 mb-2">💡 Tips for best results:</h3>
            <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
              <li>Clear, bright lighting</li>
              <li>6 inches from soil</li>
              <li>Avoid shadows</li>
            </ul>
          </div>

          <div className="my-6">
            <label className="block text-gray-700 font-medium mb-2">
                🌾 {currentContent.lastSeason}
            </label>
            <select className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-green-500 focus:outline-none bg-white">
                <option>Rice</option>
                <option>Wheat</option>
                <option>Cotton</option>
                <option>Soybean</option>
                <option>Sugarcane</option>
                <option>Maize</option>
                <option>Tomato</option>
                <option>Potato</option>
            </select>
          </div>
          
          <div className="flex space-x-4 mb-4">
            <button onClick={() => setUploadedImage('https://placehold.co/200x200/c2b280/FFFFFF?text=Soil')} className="flex-1 bg-gray-100 border border-gray-300 rounded-xl py-3 px-4 font-medium text-gray-700 hover:bg-gray-200 transition-all flex items-center justify-center space-x-2"> <Upload size={16} /> <span>Gallery</span></button>
            <button onClick={() => setUploadedImage('https://placehold.co/200x200/c2b280/FFFFFF?text=Soil')} className="flex-1 bg-green-500 text-white rounded-xl py-3 px-4 font-medium hover:bg-green-600 transition-all flex items-center justify-center space-x-2"><Camera size={16}/><span>Camera</span></button>
          </div>
          
          <button onClick={() => setCurrentScreen('manualSoil')} className="w-full text-center text-blue-500 font-medium hover:text-blue-700">📝 Skip to manual entry</button>
        </div>
        
        {uploadedImage && (
          <button onClick={() => setCurrentScreen('cropRecommendation')} className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">Generate Recommendations ✨</button>
        )}
      </div>
    </div>
  );

  // Crop Recommendation Results
  const CropRecommendationScreen = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-500 text-white p-6 sticky top-0 z-10">
        <button onClick={() => setCurrentScreen('soilPath')} className="absolute top-6 left-4"><ArrowLeft className="w-6 h-6" /></button>
        <h1 className="text-2xl font-bold text-center">🎯 Top Crop Recommendations</h1>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {sampleData.cropRecommendations.map((crop, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-3xl mr-4">{crop.name === 'Wheat' ? '🌾' : crop.name === 'Maize' ? '🌽' : '🌿'}</span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{index + 1}. {crop.name}</h3>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (<span key={i} className={i < crop.rating ? "text-yellow-400" : "text-gray-300"}>⭐</span>))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">₹{crop.profit.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">per acre</p>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600"><Info size={14} className="inline mr-1 text-blue-500" />{crop.reason}</p>
              </div>
              
              <button onClick={() => { setDetailedCrop(crop); setCurrentScreen('detailedPlan'); }} className="w-full bg-green-100 text-green-700 py-3 rounded-xl font-medium hover:bg-green-200 transition-all flex items-center justify-center space-x-2">
                <BarChart2 size={16}/>
                <span>{currentContent.viewDetailedPlan}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ... other components remain the same ...
  // LeafPathScreen, DiseaseResultsScreen, CommunityScreen, ChatScreen

    const LeafPathScreen = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-500 text-white p-6">
        <button onClick={() => setCurrentScreen('dashboard')} className="mb-4"><ArrowLeft className="w-6 h-6" /></button>
        <h1 className="text-2xl font-bold">🍃 Leaf Disease Detection</h1>
      </div>
      <div className="p-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <h3 className="font-bold text-gray-800 mb-4">🌾 Select Your Crop</h3>
          <select className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none bg-white">
            <option>Rice</option><option>Wheat</option><option>Cotton</option><option>Tomato</option><option>Potato</option><option>Maize</option>
          </select>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center mb-6">
            {uploadedImage ? (
              <div>
                <img src={uploadedImage} alt="Leaf" className="w-32 h-32 object-cover rounded-lg mx-auto mb-4" />
                <p className="text-blue-600 font-medium">✅ Leaf image uploaded!</p>
              </div>
            ) : (
              <div>
                <Leaf className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium mb-2">Upload leaf photo</p>
                <p className="text-sm text-gray-400">For disease detection</p>
              </div>
            )}
          </div>
          <div className="flex space-x-4">
            <button onClick={() => setUploadedImage('https://placehold.co/200x200/90ee90/FFFFFF?text=Leaf')} className="flex-1 bg-gray-100 border border-gray-300 rounded-xl py-3 px-4 font-medium text-gray-700 hover:bg-gray-200 transition-all flex items-center justify-center space-x-2"><Upload size={16}/><span>Gallery</span></button>
            <button onClick={() => setUploadedImage('https://placehold.co/200x200/90ee90/FFFFFF?text=Leaf')} className="flex-1 bg-blue-500 text-white rounded-xl py-3 px-4 font-medium hover:bg-blue-600 transition-all flex items-center justify-center space-x-2"><Camera size={16}/><span>Camera</span></button>
          </div>
        </div>
        {uploadedImage && (
          <button onClick={() => setCurrentScreen('diseaseResults')} className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">Analyze Disease 🔍</button>
        )}
      </div>
    </div>
  );

  const DiseaseResultsScreen = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-500 text-white p-6"><button onClick={() => setCurrentScreen('leafPath')} className="mb-4"><ArrowLeft className="w-6 h-6" /></button><h1 className="text-2xl font-bold">🔍 Disease Analysis</h1></div>
      <div className="p-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between">
              <div><h3 className="text-lg font-bold text-orange-800">⚠️ {sampleData.diseaseAnalysis.disease}</h3><p className="text-sm text-orange-600">Confidence: {sampleData.diseaseAnalysis.confidence}%</p></div>
              <div className="text-right"><p className="text-sm text-gray-600">Severity</p><span className={`px-3 py-1 rounded-full text-sm font-medium ${sampleData.diseaseAnalysis.severity === 'Medium' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'}`}>{sampleData.diseaseAnalysis.severity}</span></div>
            </div>
          </div>
          <div className="mb-4">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center">🩺 Treatment Plan:</h4>
            <ul className="space-y-2">
              {sampleData.diseaseAnalysis.treatment.map((step, index) => (
                <li key={index} className="flex items-start"><span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-xs font-bold flex items-center justify-center mr-3 mt-0.5">{index + 1}</span><span className="text-gray-700">{step}</span></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="space-y-4">
          <button className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all flex items-center justify-center"><Phone className="w-5 h-5 mr-2" />{currentContent.callExpert}</button>
          <button className="w-full bg-orange-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all flex items-center justify-center"><ShoppingCart className="w-5 h-5 mr-2" />{currentContent.buyMedicine}</button>
          <button onClick={() => setCurrentScreen('dashboard')} className="w-full bg-gray-100 border border-gray-300 rounded-xl py-3 font-medium text-gray-700 hover:bg-gray-200 transition-all">← {currentContent.backToDashboard}</button>
        </div>
      </div>
    </div>
  );

    const CommunityScreen = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-purple-500 text-white p-6 sticky top-0 z-10"><button onClick={() => setCurrentScreen('dashboard')} className="absolute top-6 left-4"><ArrowLeft className="w-6 h-6" /></button><h1 className="text-2xl font-bold text-center flex items-center justify-center"><Users className="w-6 h-6 mr-2" />Farmer Community</h1></div>
      <div className="p-6">
        <div className="space-y-4">
          {sampleData.communityPosts.map((post, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">{post.author.charAt(0)}</div>
                  <div><h3 className="font-bold text-gray-800">{post.author}</h3><p className="text-sm text-gray-500">{post.location} • {post.time}</p></div>
                </div>
              </div>
              <p className="text-gray-700 mb-4">"{post.content}"</p>
              <div className="flex items-center justify-between text-sm text-gray-600 border-t pt-3">
                <div className="flex items-center space-x-6">
                  <button className="flex items-center hover:text-blue-500"><ThumbsUp className="w-4 h-4 mr-2"/> {post.likes}</button>
                  <button className="flex items-center hover:text-gray-900"><MessageCircle className="w-4 h-4 mr-2"/> {post.comments}</button>
                </div>
                <button className="flex items-center hover:text-green-500"><Share2 className="w-4 h-4 mr-2"/> Share</button>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">➕ Share Update</button>
      </div>
    </div>
  );

  const ChatScreen = () => {
    const [messages, setMessages] = useState([ { type: 'bot', text: 'नमस्ते! मैं आपका AI कृषि सहायक हूँ। आप मुझसे फसल, मिट्टी, या खेती के बारे में कुछ भी पूछ सकते हैं।' } ]);
    const [inputText, setInputText] = useState('');
    const sampleQuestions = [ "कौनसी फसल ज्यादा मुनाफा देगी?", "मिट्टी का pH कैसे बढ़ाएं?", "Cotton की market price क्या है?", "Organic farming कैसे शुरू करें?" ];
    const sendMessage = () => { if (inputText.trim()) { setMessages([...messages, { type: 'user', text: inputText }, { type: 'bot', text: 'मैं आपके सवाल का जवाब तैयार कर रहा हूँ...' }]); setInputText(''); }};
    return (<div className="min-h-screen bg-gray-50 flex flex-col"><div className="bg-green-500 text-white p-6"><button onClick={() => setCurrentScreen('dashboard')} className="mb-4"><ArrowLeft className="w-6 h-6" /></button><h1 className="text-2xl font-bold">🤖 AI Assistant</h1></div><div className="flex-1 p-4 space-y-4 overflow-y-auto">{messages.map((message, index) => (<div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${message.type === 'user' ? 'bg-green-500 text-white rounded-br-none' : 'bg-white shadow-md text-gray-800 rounded-bl-none'}`}><p className="text-sm">{message.text}</p></div></div>))}</div><div className="p-4 bg-white border-t"><div className="flex flex-wrap gap-2 mb-4">{sampleQuestions.map((q, i) => (<button key={i} onClick={() => setInputText(q)} className="bg-gray-100 text-gray-700 px-3 py-2 rounded-xl text-xs hover:bg-gray-200 transition-all">{q}</button>))}</div><div className="flex space-x-2"><input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Type your question..." className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:border-green-500 focus:outline-none" onKeyPress={(e) => e.key === 'Enter' && sendMessage()} /><button onClick={sendMessage} className="bg-green-500 text-white p-3 rounded-xl hover:bg-green-600 transition-all"><ArrowRight className="w-5 h-5" /></button></div></div></div>);
  };
  
  // Manual Soil Data Entry Screen
  const ManualSoilScreen = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-500 text-white p-6 sticky top-0 z-10">
        <button onClick={() => setCurrentScreen('soilPath')} className="absolute top-6 left-4"><ArrowLeft className="w-6 h-6" /></button>
        <h1 className="text-2xl font-bold text-center">📝 Soil Test Results</h1>
      </div>
      <div className="p-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">pH Level: <span className="font-normal text-gray-500">(6.0-7.5 ideal)</span></label>
              <div className="relative"><input type="number" step="0.1" placeholder="6.5" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-green-500 focus:outline-none"/><button className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">❓</button></div>
            </div>
            <div>
              <h3 className="text-gray-700 font-medium mb-4 flex items-center">🌱 Nutrients (ppm):</h3>
              <div className="space-y-4">
                {['Nitrogen', 'Phosphorus', 'Potassium'].map((nutrient) => (
                  <div key={nutrient} className="flex items-center space-x-4"><label className="w-24 text-sm text-gray-600">{nutrient}:</label><input type="number" placeholder="50" className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:border-green-500 focus:outline-none"/><button className="text-gray-400 hover:text-gray-600">❓</button></div>
                ))}
              </div>
            </div>
             {/* Last Crop Section Moved Here */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">🌾 {currentContent.lastSeason}</label>
              <select className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-green-500 focus:outline-none bg-white">
                <option>Rice</option><option>Wheat</option><option>Cotton</option><option>Soybean</option><option>Sugarcane</option><option>Maize</option><option>Tomato</option><option>Potato</option>
              </select>
            </div>
          </div>
          <button onClick={() => setCurrentScreen('cropRecommendation')} className="w-full mt-8 bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">Generate Recommendations ✨</button>
        </div>
      </div>
    </div>
  );

    // Detailed Plan Screen Component
    const DetailedPlanScreen = () => {
        if (!detailedCrop) return null;
        const [activeGuidanceTab, setActiveGuidanceTab] = useState('planting');
        const [calculatorArea, setCalculatorArea] = useState(1);

        const totalCost = Object.values(detailedCrop.details.cost).reduce((sum, val) => sum + val, 0);
        const netProfit = detailedCrop.profit;

        const Bar = ({ label, value, max, color, unit }) => (
            <div>
                <div className="flex justify-between text-sm mb-1"><span className="text-gray-600">{label}</span><span className={`font-bold ${color}`}>{value}{unit}</span></div>
                <div className="w-full bg-gray-200 rounded-full h-4"><div className={`bg-${color.split('-')[1]}-500 h-4 rounded-full`} style={{ width: `${(value / max) * 100}%` }}></div></div>
            </div>
        );
        
        return (
            <div className="min-h-screen bg-gray-50">
                 <div className="bg-white text-gray-800 p-6 sticky top-0 z-10 shadow-sm">
                    <button onClick={() => setCurrentScreen('cropRecommendation')} className="absolute top-6 left-4"><ArrowLeft className="w-6 h-6" /></button>
                    <h1 className="text-xl font-bold text-center">{currentContent.detailedPlanFor} {detailedCrop.name}</h1>
                </div>
                <div className="p-6 space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <h3 className="text-lg font-bold mb-4 flex items-center"><BarChart2 className="w-5 h-5 mr-2 text-blue-500"/>{currentContent.forecast}</h3>
                        <div className="space-y-4">
                           <Bar label={currentContent.yield} value={detailedCrop.details.forecast.yield} max={40} color="text-green-500" unit=" q/acre"/>
                           <Bar label={currentContent.marketDemand} value={detailedCrop.details.forecast.demand} max={100} color="text-yellow-500" unit="%"/>
                           <Bar label={currentContent.profit} value={detailedCrop.details.forecast.profit / 1000} max={50} color="text-blue-500" unit="k ₹"/>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <h3 className="text-lg font-bold mb-4 flex items-center"><DollarSign className="w-5 h-5 mr-2 text-green-500"/>{currentContent.costBreakdown}</h3>
                        <div className="space-y-2 text-sm">
                            {Object.entries(detailedCrop.details.cost).map(([key, value]) => (
                                <div key={key} className="flex justify-between text-gray-600"><span>{currentContent[key] || key.charAt(0).toUpperCase() + key.slice(1)}:</span><span className="font-medium">₹{value.toLocaleString()}</span></div>
                            ))}
                            <hr className="my-2"/>
                            <div className="flex justify-between font-bold text-base"><span className="text-gray-800">Total Cost:</span><span>₹{totalCost.toLocaleString()}</span></div>
                            <div className="flex justify-between font-bold text-lg"><span className="text-green-600">{currentContent.netProfit}:</span><span className="text-green-600">₹{netProfit.toLocaleString()}</span></div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <h3 className="text-lg font-bold mb-2 flex items-center"><Info className="w-5 h-5 mr-2 text-purple-500"/>{currentContent.whyThisCrop}</h3>
                        <p className="text-sm text-gray-600">{detailedCrop.details.rationale}</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <h3 className="text-lg font-bold mb-4">{currentContent.cultivationGuide}</h3>
                        <div className="flex border-b mb-4">
                            {['planting', 'fertilizers', 'pestControl'].map(tab => (
                                <button key={tab} onClick={() => setActiveGuidanceTab(tab)} className={`py-2 px-4 font-medium text-sm ${activeGuidanceTab === tab ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-500'}`}>{currentContent[tab]}</button>
                            ))}
                        </div>
                        <p className="text-sm text-gray-600">{detailedCrop.details.guidance[activeGuidanceTab]}</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <h3 className="text-lg font-bold mb-4 flex items-center"><Sprout className="w-5 h-5 mr-2 text-green-500"/>{currentContent.resourceCalculator}</h3>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">{currentContent.yourLandSize}</label>
                        <div className="flex items-center space-x-2 mb-4">
                            <input type="number" value={calculatorArea} onChange={e => setCalculatorArea(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2"/>
                        </div>
                        <div className="space-y-3 mt-4 text-sm bg-green-50 p-4 rounded-lg">
                            <div className="flex justify-between"><span>{currentContent.requiredSeeds}:</span><span className="font-bold">{(calculatorArea * detailedCrop.details.calculator.seedRate).toFixed(1)} kg</span></div>
                            <div className="flex justify-between"><span>{currentContent.requiredFertilizer}:</span><span className="font-bold">{(calculatorArea * detailedCrop.details.calculator.fertilizerRate).toFixed(1)} kg</span></div>
                        </div>
                    </div>

                     <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <h3 className="text-lg font-bold mb-4">{currentContent.govtSchemes}</h3>
                        <ul className="space-y-2 list-disc list-inside text-sm text-blue-600">
                            {detailedCrop.details.schemes.map(scheme => <li key={scheme}><a>{scheme}</a></li>)}
                        </ul>
                    </div>
                </div>
            </div>
        );
    };

  // Main Render Function
  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome': return <WelcomeScreen />;
      case 'tour': return <AppTourScreen />;
      case 'farmSetup': return <FarmSetupScreen />;
      case 'environmentalData': return <EnvironmentalDataScreen />;
      case 'dashboard': return <DashboardScreen />;
      case 'soilPath': return <SoilPathScreen />;
      case 'manualSoil': return <ManualSoilScreen />;
      case 'cropRecommendation': return <CropRecommendationScreen />;
      case 'leafPath': return <LeafPathScreen />;
      case 'diseaseResults': return <DiseaseResultsScreen />;
      case 'community': return <CommunityScreen />;
      case 'chat': return <ChatScreen />;
      case 'knowledge': return <KnowledgeScreen />;
      case 'detailedPlan': return <DetailedPlanScreen />; // New screen added
      default: return <WelcomeScreen />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {renderScreen()}
    </div>
  );
};

export default FarmingApp;

