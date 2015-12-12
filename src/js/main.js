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
  constructor(player, foods, score) {
    this.player = player;
    this.foods = foods;
    this.score = score;
    this.foodSpeed = -15.0;
  }

  nextTick(delta) {
    const increment = this.foodSpeed * delta;
    const validFoods = this.foods.filter(f => f.x > 16);
    const consumedFoods = validFoods.filter(f => f.x > 25 && checkCollision(this.player, f))
    const newFoods = validFoods
      .filter(f => !checkCollision(this.player, f))
      .map(f => f.moved(increment));
    return new GameState(
      this.player,
      newFoods,
      consumedFoods.map(f => f.score).reduce((x, y) => x + y, this.score)
    );
  }
}

const initialGameState = new GameState(
  new Player(10, 144),
  generateLevel(5),
  0
);
var currentGameState = initialGameState;

btn1Callback = () => currentGameState.player = currentGameState.player.goUp();
btn2Callback = () => currentGameState.player = currentGameState.player.goDown();

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
