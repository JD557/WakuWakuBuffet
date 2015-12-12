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
