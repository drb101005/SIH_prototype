const SampleData = {
  crops: [
    { crop: "Wheat", yield: "35 q/ha", profit: "₹40,000", desc: "High yield, moderate water requirement." },
    { crop: "Rice", yield: "30 q/ha", profit: "₹38,000", desc: "Needs good water, strong demand." },
    { crop: "Moong", yield: "12 q/ha", profit: "₹25,000", desc: "Low water, soil enrichment." }
  ],
  diseases: [
    { name: "Leaf Blight", symptom: "Brown patches", treatment: "Mancozeb 2g/L water spray." },
    { name: "Rust", symptom: "Yellow-orange spots", treatment: "Propiconazole spray." }
  ],
  soil: [
    { pH: "<6", suggestion: "Add lime, organic manure." },
    { pH: "6-7.5", suggestion: "Good range for most crops." },
    { pH: ">7.5", suggestion: "Add gypsum or sulphur." }
  ],
  weather: { today: "Sunny 28°C", forecast: ["Tue: 30°C 🌤", "Wed: 27°C 🌧"] }
};
