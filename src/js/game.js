
function update(){

}

var filterStrength = 20;
var frameTime = 0, lastLoop = new Date, thisLoop;
var speed = 1
enemyST.x = 10
var difficulty = 1
var difficultyFilter = Math.floor( 180 / tile.tilesX)
var enemyAmount = []
var i = 0
function draw(){
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  var thisFrameTime = (thisLoop=new Date) - lastLoop;
  frameTime+= (thisFrameTime - frameTime) / filterStrength;
  lastLoop = thisLoop;

  //Debug info

  ctx.fillStyle = "white"
  ctx.fillText((1000/frameTime).toFixed(1) + " fps", 12, 20)


  var start = difficultyFilter * i
  var end = difficultyFilter * (i + 1)
  var avg = calculateAvg( start, end, true)
  if (avg > difficulty) {
    i++
    enemyAmount.push(1)
    console.log(enemyAmount)
    for(var j = 0; j < enemyAmount.length; j++){
        enemyBlock[j] = createEnemy(j)
    }


    //draw enemy
    //debug
    ctx.fillStyle = "green"
    ctx.font = "40px"
    ctx.fillText(Math.floor(avg) + "        from " + start + "  to  " + end, 12, enemyBlock[i].y)

  }
  if(i > tile.tilesY){
    i = 0
  }
  for(var j = 0; j > enemyAmount.length; j++){
    enemyBlock[i].x += speed
  }
}
function createEnemy(i){
  var e
  e = new enemy()
  e.name += i
  e.y = centerY - (tile.height * tile.tilesY) * 0.5 + i * tile.height + (player.height - enemyST.height) * 0.5
  return e
}