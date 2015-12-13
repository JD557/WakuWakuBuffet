function renderScore(ctx, score, accum, full, capacity) {
  ctx.fillStyle = 'black';
  ctx.font = '8px PressStart2P';

  ctx.fillText('Score: ' + score, 8, 16);
  ctx.fillText('Accumulated: ' + accum, 8, 32);

  ctx.drawImage(capacityBarImg, 8, 48);
  ctx.drawImage(emptyBarImg,
      0, 0,
      128 * capacity, 16,
      8, 48,
      128 * capacity, 16);
  ctx.drawImage(fullBarImg,
      0, 0,
      128 * full, 16,
      8, 48,
      128 * full, 16);
}

function renderPlayer(ctx, player, full, capacity) {
  const frame = Math.ceil(Date.now()/200) % 4;
  const state = Math.floor(full / capacity * 4);
  if (player.y == 112) {
    ctx.drawImage(wcImg,
      16, 0,
      16, 32,
      10, 102,
      16, 32);
  }
  else {
    ctx.drawImage(wcImg,
      0, 0,
      16, 32,
      10, 102,
      16, 32);
    ctx.drawImage(characterImg,
      frame * 16, state * 32,
      16, 32,
      10, player.y,
      16, 32);
  }
}

function renderFood(ctx, food) {
  if (food.x <= 25) {
    ctx.drawImage(droppedPlateImg, 25, food.y);
  }
  else {
    ctx.drawImage(food.img, food.x, food.y);
  }
}

function renderFoods(ctx, foods) {
  foods.forEach(food => renderFood(ctx, food));
}

function renderGameState(ctx, state) {
  ctx.clearRect(0, 0, 256, 256);
  ctx.drawImage(backgroundImg, 0, 0);
  renderFoods(ctx, state.foods);
  renderPlayer(ctx, state.player, state.full, state.capacity);
  renderScore(ctx, state.score, state.accum, state.full, state.capacity);
}

function renderMenu(ctx, highScore, page) {
  const delta = Math.floor(Date.now()/50) % 256;
  ctx.clearRect(0, 0, 256, 256);
  ctx.drawImage(scrollBgImg, delta - 256, delta);
  ctx.drawImage(scrollBgImg, delta, delta - 256);
  ctx.drawImage(scrollBgImg, delta - 256, delta - 256);
  ctx.drawImage(scrollBgImg, delta, delta);
  ctx.drawImage(logoImg, 32, 16);
  ctx.drawImage(keyAImg, 96, 192);
  ctx.drawImage(plusImg, 128, 192);
  ctx.drawImage(keyZImg, 160, 192);
  ctx.fillStyle = 'black';
  ctx.font = '8px PressStart2P';
  ctx.fillText('Start Game!', 96, 240);
  ctx.fillText('Hi-Score: ' + highScore, 64, 96);
  if (page == 0) {
    ctx.fillText('Welcome to Waku Waku Buffet!', 8, 128);
    ctx.fillText('(Press A to continue)', 8, 160);
  }
  else if (page == 1) {
    ctx.fillText('We have 3 lanes full of', 8, 112);
    ctx.fillText('delicious food!', 8, 128);
    ctx.fillText('Move up and down with A and Z', 8, 144);
    ctx.fillText('and eat as much as you can!', 8, 160);
  }
  else if (page == 2) {
    ctx.fillText('Eat food you like:', 8, 112);
    ctx.drawImage(chickenImg, 8, 112);
    ctx.drawImage(burgerImg, 40, 112);
    ctx.fillText('And avoid food you dislike:', 8, 144);
    ctx.drawImage(brocolliImg, 8, 144);
  }
  else if (page == 3) {
    ctx.fillText('If you get full, feel free', 8, 112);
    ctx.fillText('to use the bathroom :)', 8, 128);
    ctx.fillText('If you get too full we will', 8, 144);
    ctx.fillText('have to kick you out :(', 8, 160);
  }
  else if (page == 4) {
    ctx.fillText('Don\'t forget, you only get', 8, 112);
    ctx.fillText('points if you flush ;)', 8, 128);
    ctx.fillText('Itadakimasu!', 8, 160);
  }
}
