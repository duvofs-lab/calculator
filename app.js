let display = document.getElementById("display");
let themeToggle = document.getElementById("themeToggle");
const installBtn = document.getElementById("installBtn");

let deferredPrompt = null;

// Calculator logic
function append(val) {
  if (display.innerText === "0") display.innerText = val;
  else display.innerText += val;
}

function clearDisplay() {
  display.innerText = "0";
}

function deleteLast() {
  display.innerText = display.innerText.slice(0, -1) || "0";
}

function calculate() {
  try {
    display.innerText = eval(display.innerText);
  } catch {
    display.innerText = "Error";
  }
}

// Theme toggle
themeToggle.onclick = () => {
  document.body.classList.toggle("light");
  themeToggle.textContent =
    document.body.classList.contains("light") ? "🌞" : "🌙";
};

// Register Service Worker (IMPORTANT)
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}

// PWA install logic
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = "block";
});

installBtn.addEventListener("click", async () => {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();
  const result = await deferredPrompt.userChoice;

  if (result.outcome === "accepted") {
    installBtn.style.display = "none";
  }

  deferredPrompt = null;
});
