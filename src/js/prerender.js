/**
 * Created by towek on 1/6/2017.
 */
var enemyBlock = []
function drawOnce(){
  //Map
  prerender.fillStyle = tile.color
  prerender.fillRect(tile.x, tile.y, tile.width * tile.tilesX, tile.height * tile.tilesY)
  //Map grid
  generateMap()
  for(var i = 0; i < tile.tilesY; i++){
    difficulty[i] = 255 -  (i + 1) * 23
    console.log(difficulty[i])
  }
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

function createEnemys(amount){
  var e = []
  for(var i = 0; i < amount; i++){
    e[i] = new enemy()
    e[i].name += i
    e[i].y = centerY - (tile.height * tile.tilesY) * 0.5 + i * tile.height + (player.height - enemyST.height) * 0.5
  }
  return e
}
