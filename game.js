var numclick = -1;
var randomNumber = Math.floor(Math.random() * 3);
var possiblecolor = ["red", "blue", "green", "yellow"];
var userpattern = [];
var correctpattern = [];
var start = false;
var level = 0;
var highscore = 0;

$(document).keydown(function () {
  if (level <= 0) {
    nextsequent();
  }
});

function nextsequent() {
  level++;
  $("#level").text(level);
  var randomNumber = Math.floor(Math.random() * 4);
  var color = possiblecolor[randomNumber];
  correctpattern.push(color);
  playAudio(color);
  clickanimation("#" + color);
}

$(".btn").click(function (buttonClicked) {
  numclick++;
  var color = buttonClicked.target.id;
  clickanimation("#" + color);
  playAudio(color);
  checkanswer(color);
});

function checkanswer(color) {
  var highscore = 0;
  userpattern.push(color);
  if (color == correctpattern[numclick]) {
    if (userpattern.length == correctpattern.length) {
      setTimeout(function () {
        userpattern = [];
        numclick = -1;
        nextsequent();
      }, 1000);
    }
  } else {
    $("#level-title").text("game over hit any key for restart! ");
    userpattern = [];
    correctpattern = [];
    if (level > highscore) {
      highscore = level;
      $("#highscore").text(highscore);
    }
    level = 0;
    numclick = -1;
  }
}

function clickanimation(id) {
  $(id).fadeOut(100).fadeIn(100);
}

function playAudio(color) {
  var musicpath = `sounds/${color}.mp3`;
  var audio = new Audio(musicpath);
  audio.play();
}
