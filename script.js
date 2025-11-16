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
