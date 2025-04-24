let score = 650;
let turns = 10;
const target = 750;
const achievements = new Set();

const cardArea = document.getElementById('cardArea');
const scoreDisplay = document.getElementById('score');
const turnsDisplay = document.getElementById('turns');
const achievementList = document.getElementById('achievementList');

const drawCardBtn = document.getElementById('drawCard');
const resetBtn = document.getElementById('resetGame');

const cardFlipSound = new Audio('sounds/card-flip.mp3');
const scoreUpSound = new Audio('sounds/score-up.mp3');
const scoreDownSound = new Audio('sounds/score-down.mp3');
const badgeEarnedSound = new Audio('sounds/badge-earned.mp3');
const gameOverSound = new Audio('sounds/game-over.mp3');

const events = [
  { text: "You paid your credit card bill on time.", change: +20, type: "good" },
  { text: "You maxed out a credit card.", change: -30, type: "bad" },
  { text: "You checked your credit report and found an error.", change: +15, type: "good" },
  { text: "You applied for 5 new credit cards.", change: -25, type: "bad" },
  { text: "Your credit utilization dropped to 10%.", change: +25, type: "good" },
  { text: "You missed a student loan payment.", change: -40, type: "bad" },
  { text: "You became an authorized user on a good-standing card.", change: +20, type: "good" },
  { text: "Your credit age is over 7 years.", change: +15, type: "good" },
  { text: "You opened a new account, shortening your average credit age.", change: -10, type: "bad" },
  { text: "You got a secured credit card and used it wisely.", change: +30, type: "good" },
  { text: "You exceeded 50% credit utilization.", change: -20, type: "bad" },
  { text: "You paid off a loan in full.", change: +25, type: "good" },
  { text: "You only made the minimum payment this month.", change: -10, type: "bad" },
  { text: "You checked your credit report for free at AnnualCreditReport.com.", change: +10, type: "good" },
  { text: "Your file is thin — consider adding a rent-reporting service.", change: 0, type: "neutral" },
  { text: "You avoided unnecessary hard inquiries.", change: +10, type: "good" },
  { text: "You refinanced a loan at a better rate thanks to your good credit.", change: +15, type: "good" },
  { text: "You closed your oldest account — credit age dropped.", change: -15, type: "bad" },
  { text: "You set up auto-pay and avoided missed payments.", change: +20, type: "good" },
  { text: "You became debt-free this year!", change: +35, type: "great" },
];

function drawCard() {
  if (turns <= 0) return;

  const event = events[Math.floor(Math.random() * events.length)];
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `<h3>${event.type === 'bad' ? '⚠️' : event.type === 'good' ? '✅' : 'ℹ️'} Event</h3><p>${event.text}</p>`;

  cardArea.prepend(card);
  cardFlipSound.play();

  updateScore(event.change);
  updateTurns(-1);
  checkAchievement(event);
  checkGameOver();
}

function updateScore(amount) {
  score += amount;
  if (score < 300) score = 300;
  if (score > 850) score = 850;
  scoreDisplay.textContent = score;
  if (amount > 0) scoreUpSound.play();
  else if (amount < 0) scoreDownSound.play();
}

function updateTurns(change) {
  turns += change;
  turnsDisplay.textContent = turns;
}

function checkAchievement(event) {
  const key = `${event.text}-${event.change}`;
  if (!achievements.has(key)) {
    achievements.add(key);
    const li = document.createElement('li');
    li.textContent = event.text;
    achievementList.appendChild(li);
    badgeEarnedSound.play();
  }
}

function checkGameOver() {
  if (turns <= 0) {
    drawCardBtn.disabled = true;
    gameOverSound.play();
    setTimeout(() => {
      alert(score >= target ? "🎉 Congrats! You reached a great credit score!" : "Game Over! Try to improve your score next time.");
    }, 500);
  }
}

function resetGame() {
  score = 650;
  turns = 10;
  achievements.clear();
  scoreDisplay.textContent = score;
  turnsDisplay.textContent = turns;
  achievementList.innerHTML = '';
  cardArea.innerHTML = '';
  drawCardBtn.disabled = false;
}

drawCardBtn.addEventListener('click', drawCard);
resetBtn.addEventListener('click', resetGame);
