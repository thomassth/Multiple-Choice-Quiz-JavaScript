if (location.protocol !== "https:") {
  location.replace(
    `https:${location.href.substring(location.protocol.length)}`
  );
}
// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
  {
    question: "Little pleasure or little interest in doing things",
    imgSrc: "",
    choiceA: "Not at all",
    choiceB: "Several days",
    choiceC: "More than half of the two week period",
    choiceD: "Nearly every day",
    correct: "A"
  },
  {
    question: "Feeling down, depressed, or hopeless",
    imgSrc: "",
    choiceA: "Not at all",
    choiceB: "Several days",
    choiceC: "More than half of the two week period",
    choiceD: "Nearly every day",
    correct: "B"
  },
  {
    question: "Trouble falling or staying asleep, or sleeping too much",
    imgSrc: "",
    choiceA: "Not at all",
    choiceB: "Several days",
    choiceC: "More than half of the two week period",
    choiceD: "Nearly every day",
    correct: "C"
  },
  {
    question: "Having little energy or feeling tired ",
    imgSrc: "",
    choiceA: "Not at all",
    choiceB: "Several days",
    choiceC: "More than half of the two week period",
    choiceD: "Nearly every day",
    correct: "C"
  },
  {
    question: "Poor appetite or overeating",
    imgSrc: "",
    choiceA: "Not at all",
    choiceB: "Several days",
    choiceC: "More than half of the two week period",
    choiceD: "Nearly every day",
    correct: "C"
  },
  {
    question:
      "Feeling negative about yourself or that you are a failure or have let your self or your family down",
    imgSrc: "",
    choiceA: "Not at all",
    choiceB: "Several days",
    choiceC: "More than half of the two week period",
    choiceD: "Nearly every day",
    correct: "C"
  },
  {
    question:
      "Trouble concentrating on things, such as reading the newspaper or watching television",
    imgSrc: "",
    choiceA: "Not at all",
    choiceB: "Several days",
    choiceC: "More than half of the two week period",
    choiceD: "Nearly every day",
    correct: "C"
  },
  {
    question:
      "Moving or talking so slowly that other people could have noticed?  Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual ",
    imgSrc: "",
    choiceA: "Not at all",
    choiceB: "Several days",
    choiceC: "More than half of the two week period",
    choiceD: "Nearly every day",
    correct: "C"
  },
  {
    question:
      "Thoughts that you would be better off dead or of hurting yourself in some way",
    imgSrc: "",
    choiceA: "Not at all",
    choiceB: "Several days",
    choiceC: "More than half of the two week period",
    choiceD: "Nearly every day",
    correct: "C"
  }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
//const questionTime = 10; // 10s
//const gaugeWidth = 150; // 150px
//const gaugeUnit = gaugeWidth / questionTime;
//let TIMER;
let score = 0;

// render a question
function renderQuestion() {
  let q = questions[runningQuestion];

  if (runningQuestion == 0) {
    $("#question").hide(0, function() {
      $(this)
        .text(q.question)
        .fadeIn(500);
    });
  } else {
    $("#question").fadeOut(250, function() {
      $(this)
        .text(q.question)
        .fadeIn(250);
    });
    $("#choices").fadeIn();
  }

  //question.innerHTML = "<p>" + q.question + "</p>";

  $("#A").text(q.choiceA);
  $("#B").text(q.choiceB);
  $("#C").text(q.choiceC);
  $("#D").text(q.choiceD);
}

start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
  $("#preQ").hide();
  //start.style.display = "none";
  renderQuestion();
  quiz.style.display = "flex";
  renderProgress();
  //renderCounter();
  //TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress (green dots)
function renderProgress() {
  for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
    var display = qIndex;
    display++;
    progress.innerHTML +=
      "<div class='prog' id=" + qIndex + ">" + display + "</div>";
    $("#0").addClass("nowQ");
  }
}

// counter render (timer)
function renderCounter() {
  /*   if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }*/
}

// checkAnwer & proceed
var click = 0;
function checkAnswer(answer) {
  $("#choices").hide();
  //If you press too fast
  click++;
  
  //LOGIC: if too many clicks detected, no excess clicks will be logged && directly proceed to result.
  if (click > lastQuestion + 1) {
    scoreRender();
  }
  else
    switch (answer) {
      case "A":
        break;
      case "B":
        score += 1;
        break;
      case "C":
        score += 2;
        break;
      case "D":
        score += 3;
        break;
      default:
        
    }
  answerIsCorrect();

  //For one correct answer only
  /*if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        //answerIsWrong();
              answerIsCorrect();

    }*/
  //Timer reset
  //count = 0;

  //Change to next Q
  if (runningQuestion < lastQuestion) {
    runningQuestion++;
    renderQuestion();
    $("#" + runningQuestion).addClass("nowQ");
  } else {
    // end the quiz and show the score
    //clearInterval(TIMER);
    scoreRender();
  }
}

// answer is correct
function answerIsCorrect() {
  $("#" + runningQuestion).removeClass("nowQ");
  document.getElementById(runningQuestion).classList.add("progGreen");
}

// answer is Wrong
/*function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}*/

// score render
function scoreRender() {
  //scoreDiv.style.display = "grid";
  $("#quiz").slideUp(function() {
    $("#scoreContainer").slideDown();
  });
  // calculate the amount of question percent answered by the user
  //const scorePerCent = Math.round(100 * score/questions.length);

  // choose the image based on the scorePerCent

  //scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
  $("#scoreNum").text(score);
  //scoreDiv.innerHTML += "<p>" + score + "</p>";
  if (score >= 0 && score <= 4) {
    $("#advice").html(
      "<p>Your mental health is in good shape! Keep at it :)</p>"
    );
  } else if (score >= 5 && score <= 9) {
    $("#advice").html(
      "<p>Depression risk: Minimal</p><p>You seems to be having some bad time. Take a look at these relaxation techniques.</p><a class='qButton' id='adviceButton' href='resilience.html'>Go</a>"
    );
  } else if (score >= 10 && score <= 14) {
    $("#advice").html(
      "<p>Depression risk: Mild</p><p>You seems to be having some bad time. Take a look at these relaxation techniques.</p><a class='qButton' id='adviceButton' href='resilience.html'>Go</a>"
    );
  } else if (score >= 15 && score <= 19) {
    $("#advice").html(
      "<p>Depression risk: Moderate</p><p>Oh dear, it seems that you are going through some difficult times.</p><p>Here are some organisations where you can find peers and counselors, who would like to listen and share your troubles.</p><a class='qButton' id='adviceButton' href='links.html'>Go</a>"
    );
  } else if (score >= 20 && score <= 27) {
    $("#advice").html(
      "<p>Depression risk: Severe</p><p>Oh dear, it seems that you are going through some difficult times.</p><p>Here are some organisations where you can find peers and counselors, who would like to listen and share your troubles.</p><a class='qButton' id='adviceButton' href='links.html'>Go</a>"
    );
  } else {
    
  }
}
