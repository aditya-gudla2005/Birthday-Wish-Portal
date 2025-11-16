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

function showSurprise() {
  playMusic();
  const sec = document.getElementById("surprise-section");
  sec.classList.remove("hidden");
  sec.scrollIntoView({ behavior: "smooth" });
}

// Music autoplay
function playMusic() {
  const music = document.getElementById("bgMusic");
  music.volume = 0.5;
  music.play().catch(()=>{});
}

document.addEventListener("click", playMusic, { once: true });
document.addEventListener("touchstart", playMusic, { once: true });
document.addEventListener("scroll", playMusic, { once: true });

// Voice recognition
function startListening() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recog = new SpeechRecognition();
  recog.lang = "en-US";

  recog.onresult = function(event) {
    const command = event.results[0][0].transcript.toLowerCase();

    if (command.includes("blow")) {
      document.getElementById("cake").src = "cake_off.png";
      confetti();
    }
  };

  recog.start();
}

// Confetti
function confetti() {
  for (let i = 0; i < 20; i++) {
    const c = document.createElement("div");
    c.innerHTML = "🎉";
    c.style.position = "fixed";
    c.style.left = Math.random()*100 + "vw";
    c.style.top = "-20px";
    c.style.fontSize = "28px";
    c.style.transition = "3s";
    document.body.appendChild(c);

    setTimeout(() => {
      c.style.top = "120vh";
      c.style.opacity = "0";
    }, 50);

    setTimeout(() => c.remove(), 2800);
  }
}
function sendWish() {
  const wish = document.getElementById("wishInput").value.trim();
  if (!wish) return;

  // Create angel emoji
  const angel = document.createElement("div");
  angel.className = "angel";
  angel.innerHTML = "👼";

  const floatingWish = document.createElement("div");
  floatingWish.className = "wish-floating";
  floatingWish.innerHTML = wish;

  const container = document.getElementById("angelArea");
  container.innerHTML = ""; // Clear previous animations
  container.appendChild(angel);
  container.appendChild(floatingWish);

  // Show final message after animation
  setTimeout(() => {
    document.getElementById("wishMessage").classList.remove("hidden");
  }, 3000);
}

function showWish() {
  playMusic();
  const sec = document.getElementById("wish-section");
  sec.classList.remove("hidden");
  sec.scrollIntoView({ behavior: "smooth" });
}


