song1 = "";
song2 = "";
left_wrist_x = 0;
right_wrist_x = 0;
left_wrist_y = 0;
right_wrist_y = 0;
score_y_right = 0;
score_y_left = 0;
flag = "false"
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotposes)
}
function modelLoaded(){
    console.log("pose net is working fine ")
}
function draw(){
    image(video,0,0,600,500);
    fill("#ff000")
    stroke("#ff000")
    if(score_y_left >0.2){
        if(flag == "false"){
           song2.stop()
            song1.play();
            flag = "true"
          circle(left_wrist_x, left_wrist_y, 20)
          document.getElementById("song").innerHTML= "song : Harry potter theme "
        }
    } 
    
}
function preload(){
    song1 = loadSound("AC_17_23_53.mp3");
    song2 = loadSound("music.mp3");
}
function gotposes(results){
if(results.length > 0 ){
    console.log(results);
    left_wrist_x = results[0].pose.leftWrist.x;
    right_wrist_x  = results[0].pose.rightWrist.x
    left_wrist_y = results[0].pose.leftWrist.y
    right_wrist_y  = results[0].pose.rightWrist.y
    console.log("right wrist y =  "  + right_wrist_y + " right wrist x =  "+ right_wrist_x + " leftwrist y  = "+ left_wrist_y + " left wrist x  = "+ left_wrist_x );
    score_y_left =  results[0].pose.keypoints[9].score ;
score_y_right = results[0].pose.keypoints[10].score ;
}
}
