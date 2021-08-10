object = [];
status = "";
sound = "";
function preload() {
sound = loadSound('welcome_to_my_house.mp3')
}

function setup() {

  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO)
  video.hide()
  objectdetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status: Detecting Objects(s)"

}

function draw() {
  image(video, 0, 0, 380, 380)
if(status != ""){
  for(i = 0;i<object.length;i++){
    document.getElementById("status").innerHTML = "Status: Object(s) Detected"
    
    fill("aquamarine")
    percent = floor(object[i].confidence*100);
    text(object[i].label + " " + percent + "%",object[i].x,object[i].y)
    noFill()
    stroke("lightcoral")
    rect(object[i].x,object[i].y,object[i].width,object[i].height)
  
    if(object[i].label == "person"){
      document.getElementById("number_of_objects").innerHTML = "baby is found"
      sound.stop()
    }
    else{
      document.getElementById("number_of_objects").innerHTML = "baby is not found"
      sound.play()
    }
    if(object.length == 0){
      document.getElementById("number_of_objects").innerHTML = "baby is not found"
      sound.play()
    }
  }
}

}

function modelLoaded() {
  console.log("model is loaded");
  status = true;
  objectdetector.detect(video, gotresult)
}

function gotresult(error, result) {
  if (error) {
    console.log(error)
  }
  else {
    console.log(result)
    object = result
  }

}