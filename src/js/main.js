const ctx = get2dContext();

function loadImage(path) {
  var img = new Image();
  img.src = path;
  return img;
}

var characterImg = loadImage('res/character.png');
var backgroundImg = loadImage('res/background.png');
var chickenImg = loadImage('res/chicken.png');
var burgerImg = loadImage('res/burger.png');
var brocolliImg = loadImage('res/brocolli.png');

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

const level1 = [
  new Chicken(40, 144),
  new Brocolli(90, 144 + 32),
  new Burger(75, 144),
  new Burger(110, 144 + 32)
];

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
  new Player(10, 144),
  level1,
  0
);
var currentGameState = initialGameState;

btn1Callback = () => currentGameState.player = currentGameState.player.goUp();
btn2Callback = () => currentGameState.player = currentGameState.player.goDown();

function renderScore(ctx, score) {
  ctx.fillStyle = 'black';
  ctx.font = '16px Monospace';
  ctx.fillText('Score: ' + score, 16, 16);
}

function renderPlayer(ctx, player) {
  ctx.drawImage(characterImg, 10, player.y);
}

function renderFood(ctx, food) {
  ctx.drawImage(food.img, food.x, food.y);
}

function renderFoods(ctx, foods) {
  foods.forEach(food => renderFood(ctx, food));
}

function renderGameState(ctx, state) {
  ctx.clearRect(0, 0, 256, 256);
  ctx.drawImage(backgroundImg, 0, 0);
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
