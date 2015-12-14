function generateLevel(itemsPerLane) {
  var level = [];
  for (var lane = 0; lane < 3; lane += 1) {
    for (var position = 0; position < itemsPerLane * 64; position += Math.ceil(32 + Math.random() * 64)) {
      const x = lane * 16 + 100 + position;
      const y = 144 + lane * 32;
      const type = Math.floor(Math.random() * 5);
      switch(type) {
        case 0: level.push(new Chicken(x, y)); break;
        case 1: level.push(new Brocolli(x, y)); break;
        case 2: level.push(new Burger(x, y)); break;
        case 3: level.push(new Sushi(x, y)); break;
        case 4: level.push(new Soup(x, y)); break;
      };
    }
  }
  return level;
}
