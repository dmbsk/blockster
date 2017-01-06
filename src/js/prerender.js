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
