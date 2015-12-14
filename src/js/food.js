class Food {
  constructor(x, y, score, fullnessModifier, capacityModifier, img) {
    this.x = x;
    this.y = y;
    this.score = score;
    this.fullnessModifier = fullnessModifier;
    this.capacityModifier = capacityModifier;
    this.img = img;
  }

  moved(dx) {
    return new Food(this.x + dx, this.y, this.score, this.fullnessModifier, this.capacityModifier, this.img)
  }
}

class Chicken extends Food {
  constructor(x, y) {
    super(x, y, 100, 0.05, 0.0, chickenImg)
  }
}

class Burger extends Food {
  constructor(x, y) {
    super(x, y, 100, 0.05, 0.0, burgerImg)
  }
}

class Sushi extends Food {
  constructor(x, y) {
    super(x, y, 100, 0.05, 0.0, sushiImg)
  }
}

class Brocolli extends Food {
  constructor(x, y) {
    super(x, y, 0, 0.0, 0.1, brocolliImg)
  }
}

class Soup extends Food {
  constructor(x, y) {
    super(x, y, 0, 0.0, 0.1, soupImg)
  }
}
