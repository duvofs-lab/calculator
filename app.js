let display = document.getElementById("display");
let themeToggle = document.getElementById("themeToggle");

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

// Theme Toggle
themeToggle.onclick = () => {
  document.body.classList.toggle("light");
  themeToggle.textContent =
    document.body.classList.contains("light") ? "🌞" : "🌙";
};

// PWA Install
let deferredPrompt;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = "block";
});

installBtn.addEventListener("click", () => {
  deferredPrompt.prompt();
});

