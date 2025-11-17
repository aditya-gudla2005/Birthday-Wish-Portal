// Show sections + auto-scroll
// GLOBAL SNOWFALL
function createSnow() {
  const snow = document.getElementById("snow");
  
  for (let i = 0; i < 60; i++) {
    const s = document.createElement("div");
    s.className = "snowflake";
    s.innerHTML = "•";
    s.style.left = Math.random() * 100 + "vw";
    s.style.fontSize = (8 + Math.random() * 10) + "px";
    s.style.opacity = Math.random();
    s.style.animationDuration = (3 + Math.random() * 5) + "s";
    s.style.setProperty("--drift", (Math.random() * 80 - 40) + "px");
    snow.appendChild(s);
  }
}
createSnow();

let musicStarted = false;

function showCake() {
  playMusic();
  const sec = document.getElementById("cake-section");
  sec.classList.remove("hidden");
  sec.scrollIntoView({ behavior: "smooth" });
}

function showMessage() {
  playMusic();
  const sec = document.getElementById("message-section");
  sec.classList.remove("hidden");
  sec.scrollIntoView({ behavior: "smooth" });
}

function showWish() {
  playMusic();
  const sec = document.getElementById("wish-section");
  sec.classList.remove("hidden");
  sec.scrollIntoView({ behavior: "smooth" });
}




document.addEventListener("click", playMusic, { once: true });
document.addEventListener("touchstart", playMusic, { once: true });
document.addEventListener("scroll", playMusic, { once: true });

// Voice recognition (safe guard + UI state)
let isListening = false;
function startListening() {
  if (isListening) return;
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("Sorry — your browser doesn't support voice recognition. Try Chrome or Edge on desktop/mobile.");
    return;
  }

  const listenBtn = document.getElementById("listenBtn");
  const recog = new SpeechRecognition();
  recog.lang = "en-US";
  recog.interimResults = false;
  recog.maxAlternatives = 1;

  recog.onstart = () => {
    isListening = true;
    if (listenBtn) {
      listenBtn.textContent = "Listening...";
      listenBtn.disabled = true;
      listenBtn.style.opacity = "0.7";
    }
  };

  recog.onresult = function(event) {
    const command = event.results[0][0].transcript.toLowerCase();
    console.log("Heard:", command);
    if (command.includes("make a wish")) {
  const cakeImg = document.getElementById("cake");

  // change cake image
  cakeImg.src = "cake_off.png";

  // shake animation
  cakeImg.classList.add("cake-shake");
  setTimeout(() => cakeImg.classList.remove("cake-shake"), 500);

  // smoke poof
  const poof = document.createElement("div");
  poof.className = "poof";
  poof.innerHTML = "💨";
  cakeImg.parentElement.appendChild(poof);
  setTimeout(() => poof.remove(), 1200);

  // improved confetti
  magicConfetti();
} else {
      // give feedback
      alert("I heard: " + command + "\nTry saying 'make a wish' to blow out the candles.");
    }
  };

  recog.onerror = function(e) {
    console.warn("Speech error", e);
    alert("Voice recognition error. Please try again.");
  };

  recog.onend = () => {
    isListening = false;
    if (listenBtn) {
      listenBtn.textContent = "Start Voice";
      listenBtn.disabled = false;
      listenBtn.style.opacity = "";
    }
  };

  try {
    recog.start();
  } catch (e) {
    console.error("Could not start recognition:", e);
    alert("Could not start voice recognition. Try reloading the page.");
  }
}

// Confetti
function magicConfetti() {
  for (let i = 0; i < 60; i++) {
    const c = document.createElement("div");
    c.innerHTML = "🎉";
    c.style.position = "fixed";
    c.style.left = Math.random() * 100 + "vw";
    c.style.top = "-20px";
    c.style.fontSize = (20 + Math.random() * 15) + "px";
    c.style.transition = "4s";
    c.style.pointerEvents = "none";
    document.body.appendChild(c);

    setTimeout(() => {
      c.style.top = "120vh";
      c.style.opacity = "0";
      c.style.transform = `rotate(${Math.random()*360}deg)`;
    }, 50);

    setTimeout(() => c.remove(), 4500);
  }
}




// Make-a-wish behaviour
function sendWish() {
  const wishInput = document.getElementById("wishInput");
  const wishBtn = document.querySelector(".wish-btn");
  const area = document.getElementById("angelArea");

  // Hide wish input + button
  wishInput.style.display = "none";
  wishBtn.style.display = "none";

  // Clear previous content
  area.innerHTML = "";

  // Create pink box container
  const box = document.createElement("div");
  box.className = "wish-box";

  // Angel image
  const angel = document.createElement("img");
  angel.src = "angel.png?v=" + Date.now();
  angel.className = "wish-angel";

  // Text beside angel
  const text = document.createElement("div");
  text.className = "wish-text";
  text.innerHTML =
  "Your wish is with the universe now.<br>The universe will do its job.<br>You do your job by staying kind, hopeful… and a little bit magical. ✨";


  // Append elements
  box.appendChild(angel);
  box.appendChild(text);
  area.appendChild(box);

  // Trigger animation
  setTimeout(() => {
    box.classList.add("rise");
  }, 100);
}


function playMusic() {
  if (musicStarted) {
    return; // prevent restarting
  }
  
  const music = document.getElementById("bgMusic");
  if (!music) return;

  music.load();
  music.volume = 0.25;

  music.play().then(() => {
    console.log("Music playing");
    musicStarted = true;   // lock music on after first play
  }).catch((err) => {
    console.log("Autoplay blocked:", err);
  });
}



function createSparkles() {
  const container = document.getElementById("sparkle-container");
  setInterval(() => {
    const s = document.createElement("div");
    s.className = "sparkle";
    s.style.left = Math.random() * 100 + "vw";
    s.style.top = "110vh";
    s.style.animationDuration = (4 + Math.random() * 4) + "s";
    container.appendChild(s);

    setTimeout(() => s.remove(), 8000);
  }, 300);
}

createSparkles(); // start sparkles



















