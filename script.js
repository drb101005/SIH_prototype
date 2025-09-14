// Sidebar toggle (for mobile use later)
const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");
menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("hidden");
});

// Dark mode toggle
const darkBtn = document.getElementById("dark-btn");
darkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
});

// Language toggle (just demo EN/FR)
const langBtn = document.getElementById("lang-btn");
let currentLang = "EN";
langBtn.addEventListener("click", () => {
  if (currentLang === "EN") {
    currentLang = "FR";
    langBtn.textContent = "🌐 FR";
    document.querySelector(".card h3").textContent = "Rendement des cultures";
  } else {
    currentLang = "EN";
    langBtn.textContent = "🌐 EN";
    document.querySelector(".card h3").textContent = "Crop Yield";
  }
});
