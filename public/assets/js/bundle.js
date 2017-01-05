
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


//setting
var player = {
  width: 40,
  height: 40,
  color: "#0000FF", // blue
  x: 0,
  y: 0,
}

var enemy = {
  width: 40,
  height: 40,
  color: "#FF0000", // red
  x: 0,
  y: 0,
}

var tile = {
  width: 50,
  height: 50,
  x: 0,
  y: 0,
  tilesX: 5,
  tilesY: 5,
  color: "#414141",
}
var canvasWidth = 1024
var canvasHeight = 720
var centerX = canvasWidth / 2
var centerY = canvasHeight / 2
var FPS = 60
var ctx = ""
var canvas = ""
var previousFrameTime = 0

player.x = centerX - player.height / 2
player.y = centerY - player.width / 2

window.onload = function () {
  fpsOut = document.getElementById('fps');
  canvas = document.getElementById("game")
  ctx = canvas.getContext("2d")
  canvas.width = canvasWidth
  canvas.height = canvasHeight
  setInterval(function(){
    update()
    draw()
  }, 1000/FPS)
}

/// Other functions
//move
//var posFixer = tile.width * 1.5 - (tile.width - player.width) * 0.125
var moveBlocker = {
  up: centerY - tile.height * 2 - player.height * 0.5,
  right: centerX + tile.width * 2 - player.width * 0.5,
  down: centerY + tile.height * 2 - player.height * 0.5,
  left: centerX - tile.width * 2 - player.width * 0.5
}
console.log(moveBlocker.left)
function move(){
  window.addEventListener("keydown", function (e) {
    if(moveH.keyup){
      var code = e.keyCode

      if (code == 38 && player.y > moveBlocker.up) { // up
        moveH.y--
      }

      if (code == 40 && player.y < moveBlocker.down) { // down
        moveH.y++
      }

      if (code == 37 && player.x > moveBlocker.left) { // left
        moveH.x--
      }

      if (code == 39 && player.x < moveBlocker.right) { // right
        moveH.x++
      }
      player.x += moveH.x * tile.width
      player.y += moveH.y * tile.height
      moveH.keyup = false
    }
    //console.log(move.x+" x "+move.y)
  })

  window.addEventListener("keyup", function (e){
    moveH.x = 0
    moveH.y = 0
    moveH.keyup = true
  })
}