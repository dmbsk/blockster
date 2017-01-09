/**
 * Created by towek on 1/8/2017.
 */
var frequencyData
var audio
var track_id = ""
var client_id = '3094f9bd10f26938c4aff27c56fe7b97'
var input
var track_url
var radiusGlobal
var currentTime = 0
var canvas
var volumeFix = 1

function soundcloud() {
  track_url = "https://soundcloud.com/solacerecords/wolfe-love-like-that-again"
  input = document.getElementById("input")
  input.value = track_url

  //var divsAmount = 200
  audio = document.getElementById("audio")
  audio.crossOrigin = "anonymous"

  //generateDivs(divsAmount)
  SCmain()

  //audio.src = "https://soundcloud.com/alltrapnation/jinco-clocktower-feat-mia-vaile/stream/?client_id=3094f9bd10f26938c4aff27c56fe7b97"
  audio.play()
  var context = new window.AudioContext()
  var analyser = context.createAnalyser()
  var source = context.createMediaElementSource(audio)

  source.connect(analyser)
  analyser.connect(context.destination)


  //console.log(analyser.getByteFrequencyData(frequencyData))
  //console.log(analyser.frequencyBinCount)

  function renderFrame () {
    requestAnimationFrame(renderFrame)
    frequencyData = new Uint8Array(analyser.frequencyBinCount)
    analyser.getByteFrequencyData(frequencyData)
    radiusGlobal = calculateAvg(0, 200)
    //volumeFix = audio.volume != 0.001 ? 1/audio.volume : audio.pause()
  }
  audio.play()
  renderFrame()
}


function calculateAvg (start, end, filter){
  var sum = 0
  var amount = 0;
  for (var i = start; i < end; i++) {
    if(frequencyData[i] != 0 || filter){
      sum += frequencyData[i]
      amount++
    }else{
      sum += frequencyData[i]
      amount++
    }
  }
  var avg = sum / amount
  if(isNaN(avg)) avg = 0
  return avg
}

function generateDivs(amount){
  var divs = ""
  var size = 100/amount;
  for(var i = 0; i < amount; i++){
    divs += "<div class='ch' style='left:"+size*i+"%; width:"+size+"%'></div>"
  }
  //document.getElementById("vi").innerHTML = divs;
}

function getTrack(){
  SC.get(track_id).then(function (track){
    audio.src = track.stream_url + "/?client_id=" + client_id;
  });
}

function changeLink(){
  audio.pause()
  track_url = input.value
  SCmain()
}

function SCmain(){
  SC.initialize({
    client_id: client_id
  });
  SC.resolve(track_url).then(function (res){
    track_id = "tracks/"+res.id
  }).then(function (){
    getTrack()
  });
  audio.play()
}
