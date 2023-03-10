song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX =0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWRist= 0;
song1_status = "";
song2_status = "";


function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(500, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', getPoses);
}

function modelLoaded() {
    console.log("Model is Ready");
}

function getPoses() {
    if(results.length > 0)
    {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWrist ="+ rightWristX+"rightWristY ="+rightWristY);
        
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = "+ scoreLeftWrist);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = "+ scoreRightWRist);
    }
}

function draw() {
    image(video, 0, 0, 500, 400);
    fill("blue");
    stroke("Blue");
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();
    if(scoreLeftWrist > 0.2) {
       circle (leftWristX,leftWrist,20);
       song2.stop();
       if(song1_status == false)
       {
        song1.play();
        document.getElementById("Song_Name").innerHTML = "song1 is playing";
       }
    }

    
}