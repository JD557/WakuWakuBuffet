const ctx = get2dContext();

function loadImage(path) {
  var img = new Image();
  img.src = path;
  return img;
}

var chickenImg = loadImage('res/chicken.png');
var burgerImg = loadImage('res/burger.png');
var brocolliImg = loadImage('res/brocolli.png');

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Food {
  constructor(x, y, score, img) {
    this.x = x;
    this.y = y;
    this.score = score;
    this.img = img;
  }

  moved(dx) {
    return new Food(this.x + dx, this.y, this.score, this.img)
  }
}

class Chicken extends Food {
  constructor(x, y) {
    super(x, y, 100, chickenImg)
  }
}

class Burger extends Food {
  constructor(x, y) {
    super(x, y, 100, burgerImg)
  }
}

class Brocolli extends Food {
  constructor(x, y) {
    super(x, y, -10, brocolliImg)
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
    this.foodSpeed = -10.0;
  }

  nextTick(delta) {
    const increment = this.foodSpeed * delta;
    const validFoods = this.foods.filter(f => f.x + 10 > 0);
    const consumedFoods = validFoods.filter(f => checkCollision(this.player, f))
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
  new Player(10, 16),
  [
    new Chicken(40, 16),
    new Brocolli(90, 16 + 32),
    new Burger(75, 16),
    new Burger(110, 16 + 32)
  ],
  0
);
var currentGameState = initialGameState;

btn1Callback = () => currentGameState.player.y -= 32;
btn2Callback = () => currentGameState.player.y += 32;

function renderScore(ctx, score) {
  ctx.fillStyle = 'black';
  ctx.font = '16pt Arial';
  ctx.fillText('Score: ' + score, 400, 20);
}

function renderPlayer(ctx, player) {
  ctx.fillStyle = 'green';
  ctx.fillRect(10, player.y, 16, 16);
}

function renderFood(ctx, food) {
  ctx.drawImage(food.img, food.x, food.y);
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
