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
