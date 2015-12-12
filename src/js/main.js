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

class GameState {
  constructor(player, foods) {
    this.player = player;
    this.foods = foods;
    this.foodSpeed = -3.0;
  }

  nextTick(delta) {
    const increment = this.foodSpeed * delta;
    const newFoods = this.foods.map(f => new Food(f.x + increment, f.y));
    return new GameState(this.player, newFoods);
  }
}

const initialGameState = new GameState(new Player(10, 10), [new Food(30,10)]);
var currentGameState = initialGameState;

btn1Callback = () => currentGameState.player.y -= 10;
btn2Callback = () => currentGameState.player.y += 10;

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
  renderPlayer(ctx, state.player);
  renderFoods(ctx, state.foods);
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
