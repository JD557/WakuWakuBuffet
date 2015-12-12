const ctx = get2dContext();

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Food {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function checkCollision(player, food) {
  return player.y == food.y &&
    (Math.abs(player.x - food.x) * 2) <= (10 + 10);
}

class GameState {
  constructor(player, foods, score) {
    this.player = player;
    this.foods = foods;
    this.score = score;
    this.foodSpeed = -5.0;
  }

  nextTick(delta) {
    const increment = this.foodSpeed * delta;
    const validFoods = this.foods.filter(f => f.x + 10 > 0);
    const consumedFoods = validFoods.filter(f => checkCollision(this.player, f))
    const newFoods = validFoods
      .filter(f => !checkCollision(this.player, f))
      .map(f => new Food(f.x + increment, f.y));
    return new GameState(this.player, newFoods, this.score + consumedFoods.length * 100);
  }
}

const initialGameState = new GameState(
  new Player(10, 10),
  [new Food(30,10)],
  0
);
var currentGameState = initialGameState;

btn1Callback = () => currentGameState.player.y -= 10;
btn2Callback = () => currentGameState.player.y += 10;

function renderScore(ctx, score) {
  ctx.fillStyle = 'black';
  ctx.font = '16pt Arial';
  ctx.fillText('Score: ' + score, 400, 20);
}

function renderPlayer(ctx, player) {
  ctx.fillStyle = 'green';
  ctx.fillRect(10, player.y, 10, 10);
}

function renderFood(ctx, food) {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, 10, 10);
}

function renderFoods(ctx, foods) {
  foods.forEach(food => renderFood(ctx, food));
}

function renderGameState(ctx, state) {
  ctx.clearRect(0, 0, 640, 480);
  renderFoods(ctx, state.foods);
  renderPlayer(ctx, state.player);
  renderScore(ctx, state.score);
}

var start = null;

function main(gameState) {
  return function(timestamp) {
    renderGameState(ctx, gameState)
    if (!timestamp) timestamp = 0;
    if (!start) start = timestamp;
    const delta = (timestamp - start) / 1000.0;
    start = timestamp;
    const newGameState = gameState.nextTick(delta);
    currentGameState = newGameState;
    requestAnimationFrame(main(newGameState));
  };
};

main(initialGameState)();
