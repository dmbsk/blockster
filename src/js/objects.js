//setting
var player = {
  width: 20,
  height: 20,
  color: "#0000FF", // blue
  x: 0,
  y: 0,
}

var points = 0
var point = {
  width: player.width ,
  height: player.height ,
  color: "#FFFF00", // red
  x: 0,
  y: 0,
}

var tile = {
  width: player.width + 10,
  height: player.height + 10,
  x: 0,
  y: 0,
  tilesX: 11,
  tilesY: 11,
  color: "#414141",
}

var enemyST = {
  width: player.width - (tile.width - player.width) * 0.5,
  height: player.height - (tile.height - player.height) * 0.5,
  color: "#FF0000", // red
  x: 0,
  y: 0,
}
//enemyST.x = (enemyST.width * -2)

function enemy(){
  this.width = enemyST.width
  this.height = enemyST.height
  this.x = enemyST.x
  this.y = enemyST.y
}

var moveH = {
  x: 0,
  y: 0,
  keyup: true
}

var difficultyHard = {
    speed: 0.1,
    spawn: 2000
  }
var difficultyMedium = {
    speed: 0.075,
    spawn: 2500
  }
var difficultyEasy = {
    speed: 0.015,
    spawn: 3000
  }