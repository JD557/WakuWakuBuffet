function renderScore(ctx, score, accum, full) {
  ctx.fillStyle = 'black';
  ctx.font = '12px Arial';
  ctx.fillText('Score: ' + score, 16, 16);
  ctx.fillText('Accumulated: ' + accum, 16, 32);
  ctx.drawImage(emptyBarImg, 128, 16);
  ctx.drawImage(fullBarImg, 0, 0, 128 * full, 16, 128, 16, 128 * full, 16);
}

function renderPlayer(ctx, player, full) {
  const frame = Math.ceil(Date.now()/200) % 4;
  const state = Math.floor(full * 4);
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
  renderPlayer(ctx, state.player, state.full);
  renderScore(ctx, state.score, state.accum, state.full);
}

function renderMenu(ctx) {
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
  ctx.font = '12px Arial';
  ctx.fillText('Start Game!', 96, 240);
}
