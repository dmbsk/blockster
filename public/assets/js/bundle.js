//setting
var player = {
  width: 60,
  height: 60,
  color: "#0000FF", // blue
  x: 0,
  y: 0,
}

var enemy = {
  width: player.width,
  height: player.height,
  color: "#FF0000", // red
  x: 0,
  y: 0,
}

var point = {
  width: player.width,
  height: player.height,
  color: "#FFFF00", // red
  x: 0,
  y: 0,
}

var tile = {
  width: player.width + 10,
  height: player.height + 10,
  x: 0,
  y: 0,
  tilesX: 5,
  tilesY: 5,
  color: "#414141",
}

var moveH = {
  x: 0,
  y: 0,
  keyup: true
}


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


/**
 * Created by towek on 1/6/2017.
 */
function drawOnce(){
  //Map
  prerender.fillStyle = tile.color
  prerender.fillRect(tile.x, tile.y, tile.width * tile.tilesX, tile.height * tile.tilesY)

  //Map grid
  generateMap()
}


function generateMap(){
  for(var y = 0; y < tile.tilesX; y++){
    for(var x = 0; x < tile.tilesY; x++){
      prerender.rect(centerX - x * tile.width + centerMap, centerY - y * tile.height + centerMap, tile.width, tile.height)
      prerender.strokeStyle = 'green'
      prerender.lineWidth = 1
      prerender.stroke()
    }
  }
}

var canvasWidth = 1024
var canvasHeight = 720
var centerX = canvasWidth / 2
var centerY = canvasHeight / 2
var FPS = 30
var ctx = ""
var canvas = ""
var once
var prerender
var pointPos = new Object()


player.x = centerX - player.height / 2
player.y = centerY - player.width / 2
window.onload = function () {

  canvas = document.getElementsByClassName("ctx")[0]
  once = document.getElementsByClassName("ctx")[1]
  console.log(once)
  ctx = canvas.getContext("2d")
  prerender = once.getContext("2d")
  canvas.width = once.width = canvasWidth
  canvas.height = once.height = canvasHeight

  //setting vars
  pointPos = RandomPos()
  point.x = pointPos.x
  point.y = pointPos.y

  tile.x = centerX - (tile.width * tile.tilesX) * 0.5
  tile.y = centerY - (tile.height * tile.tilesY) * 0.5

  move()

  // Game loop
  setInterval(function(){
    update()
    draw()
  }, 1000/FPS)
  drawOnce()
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
centerMap = (tile.tilesX * tile.width) * 0.5 - tile.width
function RandomPos(){
  var randomX = Math.floor((Math.random() * tile.tilesX))
  var randomY = Math.floor((Math.random() * tile.tilesY))
  var x = centerX - centerMap + ( tile.width - point.width ) * 0.5 + randomX * tile.width - tile.width
  var y = centerY - centerMap + ( tile.height - point.height ) * 0.5 + randomY * tile.height - tile.height
  console.log("x " + randomX)
  console.log("y " + randomY)
  return {
    x: x,
    y: y
  }
}

function coinPicker(a, b){
  if(a.x == b.x && a.y == b.y){
    console.log(a + " picking " + b)
    return true
  }
  return false
}