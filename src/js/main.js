const ctx = get2dContext();

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  goUp() {
    return new Player(this.x, Math.max(112, this.y - 32));
  }
  goDown() {
    return new Player(this.x, Math.min(208, this.y + 32));
  }
}

function checkCollision(player, food) {
  return player.y == food.y &&
    (Math.abs(player.x - food.x) * 2) <= (16 + 16);
}

class GameState {
  constructor(player, foods, level, accum, score, full, capacity) {
    this.player = player;
    this.foods = foods;
    this.level = level;
    this.accum = accum;
    this.score = score;
    this.full = Math.max(0.0, Math.min(full, 1.0));
    this.capacity = capacity;
    this.gameOver = full >= capacity;
    this.foodSpeed = -25.0 * level;
    this.multiplier = Math.max(Math.ceil(this.full* 4), 1);
  }

  nextTick(delta) {
    const increment = this.foodSpeed * delta;
    const validFoods = this.foods.filter(f => f.x > 16);
    const consumedFoods = validFoods.filter(f => f.x > 25 && checkCollision(this.player, f))
    var newFoods = validFoods
      .filter(f => !checkCollision(this.player, f))
      .map(f => f.moved(increment));
    const currentAccum =
      consumedFoods.map(f => f.score).reduce((x, y) => x + y, this.accum);
    var newScore = this.score;
    var newAccum = currentAccum;
    var newFull =
      consumedFoods.map(f => f.fullnessModifier).reduce((x, y) => x + y, this.full);
    var newCapacity =
      consumedFoods.map(f => f.capacityModifier).reduce((x, y) => x - y, this.capacity);
    var newLevel = this.level;
    if (this.player.y == 112) {
      newAccum = 0;
      newScore = this.score + this.multiplier * currentAccum;
      newFull = 0;
    }
    if (newFoods.length == 0) {
      newLevel = newLevel + 1;
      appState = 1;
      readySnd.play();
      newFoods = generateLevel(5 * newLevel);
    }
    return new GameState(
      this.player,
      newFoods,
      newLevel,
      newAccum,
      newScore,
      newFull,
      newCapacity
    );
  }
}

const initialGameState = new GameState(
  new Player(10, 144),
  generateLevel(5),
  1,
  0,
  0,
  0.0,
  1.0
);
var currentGameState = initialGameState;

var start = null;
var appState = 0;
// 0 - In Menu
// 1 - Ready
// 2 - In Game
// 3 - Game Over
var stateTimer = 0;
var menuPage = 0;
var highScore = 10000;

btn1Callback = function() {
  if (appState == 0) {
    menuPage = (menuPage + 1) % 5;
  }
  else if (appState == 2) {
    currentGameState.player = currentGameState.player.goUp();
  }
}
btn2Callback = function() {
  if (appState == 0) {
    menuPage = (menuPage + 4) % 5; // - 1
  }
  if (appState == 2) {
    currentGameState.player = currentGameState.player.goDown();
  }
}
btn12Callback = function() {if (appState == 0) {
  appState = 1;
  readySnd.play();
  stateTimer = 0;
  wakuwakuSnd.pause();
  wakuwakuSnd.currentTime = 0;
}}

function main(gameState) {
  return function(timestamp) {
    if (appState == 0) {
      renderMenu(ctx, highScore, menuPage);
      requestAnimationFrame(main(initialGameState));
    }
    else {
      renderGameState(ctx, gameState)
      if (!timestamp) timestamp = 0;
      if (!start) start = timestamp;
      const delta = (timestamp - start) / 1000.0;
      start = timestamp;
      if (appState == 1 || appState == 3) {
        stateTimer += delta;
        if (stateTimer >= 1.0) {
          appState = (appState + 1) % 4;
          stateTimer = 0;
        }
        requestAnimationFrame(main(gameState));
      }
      else {
        const newGameState = gameState.nextTick(delta);
        currentGameState = newGameState;
        if (newGameState.gameOver) {
          if (newGameState.score > highScore) {
            highScore = newGameState.score;
          }
          appState = 3;
          stateTimer = 0;
        }
        requestAnimationFrame(main(newGameState));
      }
    }
  };
};

wakuwakuSnd.play();
main(initialGameState)();
