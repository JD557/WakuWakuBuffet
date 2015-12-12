const ctx = get2dContext();

var playerY = 10;

btn1Callback = () => playerY -= 10;
btn2Callback = () => playerY += 10;

function main() {
  ctx.clearRect(0, 0, 640, 480);
  ctx.fillStyle = 'green';
  ctx.fillRect(10, playerY, 100, 100);
  requestAnimationFrame(main);
};

main();
