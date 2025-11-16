// Show sections + auto-scroll
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

// Music autoplay
function playMusic() {
  const music = document.getElementById("bgMusic");
  music.load();                 // Force reload
  music.volume = 0.5;
  music.play().catch(err => {
    console.log("Autoplay blocked:", err);
  });
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
    if (command.includes("blow")) {
      const cakeImg = document.getElementById("cake");
      if (cakeImg) cakeImg.src = "cake_off.png";
      confetti();
    } else {
      // give feedback
      alert("I heard: " + command + "\nTry saying 'blow' to blow out the candles.");
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
function confetti() {
  for (let i = 0; i < 20; i++) {
    const c = document.createElement("div");
    c.innerHTML = "🎉";
    c.style.position = "fixed";
    c.style.left = Math.random()*100 + "vw";
    c.style.top = "-20px";
    c.style.fontSize = (18 + Math.floor(Math.random()*18)) + "px";
    c.style.transition = "3s";
    c.style.pointerEvents = "none";
    document.body.appendChild(c);

    setTimeout(() => {
      c.style.top = (110 + Math.random()*30) + "vh";
      c.style.opacity = "0";
      c.style.transform = `rotate(${Math.random()*360}deg)`;
    }, 50);

    setTimeout(() => c.remove(), 3200);
  }
}

// Make-a-wish behaviour
function sendWish() {
  const wishInput = document.getElementById("wishInput");
  const wish = (wishInput && wishInput.value || "").trim();
  if (!wish) return;

  // hide previous final message and clear area
  document.getElementById("wishMessage").classList.add("hidden");
  const container = document.getElementById("angelArea");
  container.innerHTML = "";

  // create angel and floating wish
  const angel = document.createElement("div");
  angel.className = "angel";
  angel.innerHTML = "👼";

  const floatingWish = document.createElement("div");
  floatingWish.className = "wish-floating";
  floatingWish.innerText = wish;

  container.appendChild(angel);
  container.appendChild(floatingWish);

  // clear input for privacy
  if (wishInput) wishInput.value = "";

  // show final message after animation
  setTimeout(() => {
    document.getElementById("wishMessage").classList.remove("hidden");
  }, 3000);
}
function playMusic() {
  const music = document.getElementById("bgMusic");
  if (!music) {
    console.log("❌ bgMusic element NOT found");
    return;
  }

  console.log("🎵 Attempting to play music...");

  music.load();   // ensures audio is fully loaded
  music.volume = 0.5;

  music.play().then(() => {
    console.log("✅ Music is playing");
  }).catch((err) => {
    console.log("❌ Music play failed:", err);
  });
}


