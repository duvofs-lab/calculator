let display = document.getElementById("display");
let themeToggle = document.getElementById("themeToggle");
const installBtn = document.getElementById("installBtn");

let deferredPrompt = null;

// ---------------- Calculator Core ----------------
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

// ---------------- Theme Toggle ----------------
themeToggle.onclick = () => {
  document.body.classList.toggle("light");
  themeToggle.textContent =
    document.body.classList.contains("light") ? "🌞" : "🌙";
};

// ---------------- Service Worker ----------------
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}

// ---------------- PWA Install ----------------
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = "block";
});

installBtn.addEventListener("click", async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  installBtn.style.display = "none";
});

// ---------------- Keyboard Support ----------------
document.addEventListener("keydown", (e) => {
  const key = e.key;

  // Numbers
  if (!isNaN(key)) {
    append(key);
    return;
  }

  // Operators
  if (["+", "-", "*", "/", "%"].includes(key)) {
    append(key);
    return;
  }

  // Decimal
  if (key === ".") {
    append(".");
    return;
  }

  // Enter = Calculate
  if (key === "Enter" || key === "=") {
    e.preventDefault();
    calculate();
    return;
  }

  // Backspace
  if (key === "Backspace") {
    deleteLast();
    return;
  }

  // Escape = Clear
  if (key === "Escape") {
    clearDisplay();
  }
});
