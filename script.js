let currentStep = 0;
let birthdayName = "Beautiful Girl";
let gameScore = 0;
let gameStarted = false;
let heartInterval;

const content = document.getElementById("content");
const stepBadge = document.getElementById("stepBadge");
const progressBar = document.getElementById("progressBar");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");

const girlPictures = [
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/women/65.jpg",
  "https://randomuser.me/api/portraits/women/68.jpg",
  "https://randomuser.me/api/portraits/women/72.jpg",
  "https://randomuser.me/api/portraits/women/79.jpg",
  "https://randomuser.me/api/portraits/women/85.jpg",
  "https://randomuser.me/api/portraits/women/90.jpg"
];

const randomGirlPicture =
  girlPictures[Math.floor(Math.random() * girlPictures.length)];

function cuteGif(emoji) {
  return `
    <div class="cute-gif">
      <span class="sparkle one">✨</span>
      <span class="sparkle two">🌸</span>
      <span class="sparkle three">✨</span>
      <div class="gif-emoji">${emoji}</div>
    </div>
  `;
}

function renderGirlPicture() {
  return `
    <div class="girl-card">
      <img 
        src="${randomGirlPicture}" 
        alt="Birthday girl"
        onerror="this.src='https://randomuser.me/api/portraits/women/44.jpg'"
      />
    </div>
  `;
}

function renderCakeCutting() {
  return `
    <div class="cake-cut-area" id="cakeCutArea">
      <div class="knife"></div>
      <div class="cut-line"></div>

      <div class="cake-body">
        <div class="cake-half cake-left"></div>

        <div class="cake-half cake-right">
          <div class="candle">
            <div class="flame"></div>
          </div>
        </div>
      </div>

      <div class="cake-plate"></div>
    </div>
  `;
}

function renderStep() {
  stepBadge.textContent = `Step ${currentStep + 1} of 5`;
  progressBar.style.width = `${((currentStep + 1) / 5) * 100}%`;

  backBtn.style.visibility = currentStep === 0 ? "hidden" : "visible";
  nextBtn.textContent = currentStep === 4 ? "Replay" : "Next";

  if (currentStep === 0) {
    content.innerHTML = `
      <h1>A Cute Birthday Surprise 💝</h1>
      ${renderGirlPicture()}
      ${cuteGif("🎁")}
      <p>Write her name and open this small birthday love story. Sulaiman</p>
      <input id="nameInput" placeholder="Enter her name..." />
      <div class="love-note">
        This surprise is full of love, cute moments, tiny hearts, and birthday magic ✨
      </div>
    `;
  }

  if (currentStep === 1) {
    content.innerHTML = `
      <h1>Dear ${birthdayName} 🌸</h1>
      ${renderGirlPicture()}
      ${cuteGif("💕")}
      <p>
        Today is special because it belongs to you. 
        Your smile makes everything brighter, softer, and more beautiful.
      </p>
      <div class="love-note">
        May your heart always stay happy, your eyes always shine, and your life always feel loved 💖
      </div>
    `;
  }

  if (currentStep === 2) {
    content.innerHTML = `
      <h1>Catch the Love Hearts 💘</h1>
      ${cuteGif("💘")}
      <p>Mini cute game: catch 7 hearts to unlock extra birthday love.</p>
      <button class="btn-main" id="startGameBtn">Start Game</button>
      <div class="score" id="scoreText">Score: 0 / 7</div>
      <div class="game-box" id="gameBox"></div>
    `;
    document.getElementById("startGameBtn").addEventListener("click", startGame);
  }

  if (currentStep === 3) {
    content.innerHTML = `
      <h1>Cut the Birthday Cake 🎂</h1>
      <p>Tap the button and cut the cake with love.</p>

      ${renderCakeCutting()}

      <button class="btn-main" id="cutCakeBtn">Cut the Cake</button>

      <div class="love-note hidden" id="wishMessage">
        Cake cut successfully! May this birthday bring sweetness, love, and endless happiness ✨
      </div>
    `;
    document.getElementById("cutCakeBtn").addEventListener("click", cutCake);
  }

  if (currentStep === 4) {
    content.innerHTML = `
      <h1>Happy Birthday, ${birthdayName}! 🎉</h1>
      ${renderGirlPicture()}
      ${cuteGif("🎉")}
      <p>
        May your birthday be filled with love, laughter, cute surprises, peace, success,
        and moments that stay in your heart forever.
      </p>
      <div class="love-note">
        You are special, you are loved, and you deserve a year as beautiful as your smile 💗
      </div>
      <div class="signature">With lots of love 💖</div>
    `;

    launchConfetti();
  }
}

nextBtn.addEventListener("click", () => {
  if (currentStep === 0) {
    const input = document.getElementById("nameInput");
    if (input && input.value.trim()) {
      birthdayName = input.value.trim();
    }
  }

  clearInterval(heartInterval);
  gameStarted = false;

  if (currentStep === 4) {
    currentStep = 0;
  } else {
    currentStep++;
  }

  renderStep();
});

backBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    clearInterval(heartInterval);
    gameStarted = false;
    currentStep--;
    renderStep();
  }
});

function startGame() {
  if (gameStarted) return;

  gameStarted = true;
  gameScore = 0;

  const scoreText = document.getElementById("scoreText");
  const gameBox = document.getElementById("gameBox");

  scoreText.textContent = "Score: 0 / 7";
  gameBox.innerHTML = "";

  heartInterval = setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart-game";
    heart.textContent = ["💖", "💘", "💕", "💗", "💝"][Math.floor(Math.random() * 5)];
    heart.style.left = Math.random() * 85 + "%";

    heart.onclick = () => {
      gameScore++;
      scoreText.textContent = `Score: ${gameScore} / 7`;
      heart.remove();

      if (gameScore >= 7) {
        clearInterval(heartInterval);
        gameBox.innerHTML = `
          <div style="padding:45px 15px; color:#ff2f7d; font-weight:900; font-size:20px; line-height:1.6;">
            You caught all the love! 💝<br>
            Extra birthday happiness unlocked ✨
          </div>
        `;
        launchConfetti();
      }
    };

    gameBox.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 3000);
  }, 650);
}

function cutCake() {
  const cakeArea = document.getElementById("cakeCutArea");
  const wishMessage = document.getElementById("wishMessage");

  if (!cakeArea) return;

  cakeArea.classList.add("cutting");

  setTimeout(() => {
    if (wishMessage) {
      wishMessage.classList.remove("hidden");
    }

    launchConfetti();
  }, 1200);
}

function createFloatingHeart() {
  const heart = document.createElement("div");
  heart.className = "floating-heart";
  heart.textContent = ["💖", "💕", "💗", "💘"][Math.floor(Math.random() * 4)];
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 4 + Math.random() * 3 + "s";
  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 7000);
}

setInterval(createFloatingHeart, 700);

function launchConfetti() {
  const colors = ["#ff5f9e", "#ffd166", "#9b5de5", "#00bbf9", "#00f5d4"];

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = 2 + Math.random() * 2 + "s";
    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 4000);
  }
}

renderStep();
