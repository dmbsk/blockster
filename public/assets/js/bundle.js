function update(){
  //console.log("Update")
}

function draw(){
  ctx.fillStyle= "#FF0000"
  ctx.fillRect(player.x, player.y, player.width, player.height)
}
var canvasWidth = 720
var canvasHeight = 480
var centerX = canvasWidth / 2
var centerY = canvasHeight / 2
var FPS = 60
var ctx = ""
var canvas = ""

//setting
var player = {
  width: 25,
  height: 25,
  color: "#0000FF",
  x: 0,
  y: 0,
}
player.x = centerX - player.height / 2
player.y = centerY - player.width / 2
var enemy
window.onload = function () {
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
