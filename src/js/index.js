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