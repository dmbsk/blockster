
function update(){
  //if(coinPicker()){

 // }
}

var filterStrength = 20;
var frameTime = 0, lastLoop = new Date, thisLoop;

function draw(){
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  var thisFrameTime = (thisLoop=new Date) - lastLoop;
  frameTime+= (thisFrameTime - frameTime) / filterStrength;
  lastLoop = thisLoop;


  //player
  ctx.fillStyle= player.color
  ctx.fillRect(player.x, player.y, player.width, player.height)

  //point
  ctx.fillStyle= point.color
  ctx.fillRect(point.x, point.y, point.width, point.height)


  //Debug info
  ctx.fillStyle = "white"
  ctx.fillText((1000/frameTime).toFixed(1) + " fps", 12, 20)
  ctx.fillStyle = player.color
  ctx.fillText("Player pos: " + player.x + " x " + player.y, 12, 40)
  ctx.fillStyle = point.color
  ctx.fillText("Point pos: " + point.x + " x " + point.y, 12, 60)

}

