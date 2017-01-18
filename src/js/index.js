var canvasWidth = 1024
var canvasHeight = 720
var centerX = canvasWidth / 2
var centerY = canvasHeight / 2
var FPS = 60
var ctx = ""
var canvas = ""
var once
var prerender
var pointPos = new Object()
var ontrigger
var trigger
var canvasDiv
var timeStart = []
var timeEnd = []

player.x = centerX - player.height / 2
player.y = centerY - player.width / 2
window.onload = function () {
  canvasDiv = document.getElementById("canvas")
  canvas = document.getElementsByClassName("ctx")[0]
  once = document.getElementsByClassName("ctx")[1]
  ontrigger = document.getElementsByClassName("ctx")[2]
  ctx = canvas.getContext("2d")
  prerender = once.getContext("2d")
  trigger = ontrigger.getContext("2d")
  canvas.width = once.width = ontrigger.width = canvasWidth
  canvas.height = once.height = ontrigger.height = canvasHeight
  canvasDiv.style.width = canvasWidth + "px"
  canvasDiv.style.height = canvasHeight + "px"

  //setting vars
  pointPos = RandomPos()
  point.x = pointPos.x
  point.y = pointPos.y

  tile.x = centerX - (tile.width * tile.tilesX) * 0.5
  tile.y = centerY - (tile.height * tile.tilesY) * 0.5

  enemy.y = centerY - enemy.height/2

  for(var i = 0; i < tile.tilesY; i++){
    timeStart[i] = Date.now()
  }
  //init main functions
  move()
  soundcloud()
  // Game loop
  setInterval(function(){
    update()
    draw()
    if(!moveH.keyup || pointPicker(player, point)){
      triggerDraw()
    }
  }, 1000/FPS)
  if(!moveH.keyup || pointPicker(player, point)){
    triggerDraw()
  }
  drawOnce()
  triggerDraw()
}

/// Other functions
//move
//var posFixer = tile.width * 1.5 - (tile.width - player.width) * 0.125
var moveBlocker = {
  up: centerY - tile.height * Math.floor(tile.tilesY * 0.5) - player.height * 0.5,
  right: centerX + tile.width * Math.floor(tile.tilesX * 0.5) - player.width * 0.5,
  down: centerY + tile.height * Math.floor(tile.tilesY * 0.5) - player.height * 0.5,
  left: centerX - tile.width * Math.floor(tile.tilesX * 0.5) - player.width * 0.5
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
  return {
    x: x,
    y: y
  }
}

function moveTest(){
  window.addEventListener("keydown", function (e) {
      var code = e.keyCode

      if (code == 38 && player.y > moveBlocker.up) { // up
        player.y += -1 * 3
      }

      if (code == 40 && player.y < moveBlocker.down) { // down
        player.y += 1 * 3
      }

      if (code == 37 && player.x > moveBlocker.left) { // left
        player.x += -1 * 3
      }

      if (code == 39 && player.x < moveBlocker.right) { // right
        player.x += 1 * 3
      }

  })
}