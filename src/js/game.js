
function update(){

}

var filterStrength = 20;
var frameTime = 0, lastLoop = new Date, thisLoop;
var speed = 5
var MainDifficulty = 50
var difficultyFilter = Math.floor( 180 / tile.tilesX)
var respawnEnemy = -1
var enemyNumber = 0
var j = 0
var firstEnemy = true
var deleter = 0
var tester2 = 0
function draw(){
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  var thisFrameTime = (thisLoop=new Date) - lastLoop;
  frameTime+= (thisFrameTime - frameTime) / filterStrength;
  lastLoop = thisLoop;

  //Debug info

  ctx.fillStyle = "white"
  ctx.fillText((1000/frameTime).toFixed(1) + " fps", 12, 20)


  var start = difficultyFilter * j
  var end = difficultyFilter * (j + 1)
  var avg = calculateAvg( start, end, true)
  
  if(avg > difficulty){
      enemyBlock[enemyNumber] = createEnemy(j, enemyNumber)
      j++
      enemyNumber++
      firstEnemy = false
      //console.log(enemyBlock.length)
  }
  if( j > tile.tilesY - 1){
    j = 0
  }
  for(var i = deleter; i < enemyBlock.length; i++){
    //posCreator++
    //draw enemy
    ctx.fillStyle = enemyST.color
    ctx.fillRect(enemyBlock[i].x, enemyBlock[i].y, enemyST.width, enemyST.height)
    enemyBlock[i].x += speed
    tester2 = 0
    //console.log(i)
    if(enemyBlock[i].x > canvasWidth + enemyST.width * 1.1) {
      deleter = enemyBlock[i].id + 1
      //console.log(enemyBlock[i].id)
      //enemyBlock.splice(i, 1)
    }
  }
  //console.log(enemyBlock.length)
  //debug
  //ctx.fillStyle = "green"
  //ctx.font = "40px"
  //ctx.fillText(Math.floor(avg) + "        from " + start + "  to  " + end, 12, enemyBlock[j].y)
}
function createEnemy(i, id){
  var e
  e = new enemy()
  e.name += i
  e.id = id
  e.y = centerY - (tile.height * tile.tilesY) * 0.5 + i * tile.height + (tile.height - enemyST.height) * 0.5
  return e
}