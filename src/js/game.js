
function update(){
  move()
}
var filterStrength = 20;
var frameTime = 0, lastLoop = new Date, thisLoop;
function draw(){
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  var thisFrameTime = (thisLoop=new Date) - lastLoop;
  frameTime+= (thisFrameTime - frameTime) / filterStrength;
  lastLoop = thisLoop;


  ctx.fillStyle = "white"
  ctx.fillText((1000/frameTime).toFixed(1) + " fps", 12, 20)
  ctx.fillStyle = "white"
  ctx.fillText("Player pos: " + player.x + " x " + player.y, 12, 40)
  ctx.fillStyle = tile.color
  ctx.fillRect(centerX - (tile.width * tile.tilesX) * 0.5, centerY - (tile.height * tile.tilesY) * 0.5, tile.width * tile.tilesX, tile.height * tile.tilesY)
  ctx.stroke();
  ctx.fillStyle= player.color
  ctx.fillRect(player.x, player.y, player.width, player.height)
}
var moveH = {
  x: 0,
  y: 0,
  keyup: true
}

