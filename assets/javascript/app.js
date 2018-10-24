let defaultStopWatchTimer = 20;

var stopWatch = defaultStopWatchTimer;

let questionInterval = defaultStopWatchTimer * 1000;

var questionTimer, questionTimout;

var count = -1;

var clickable = true;

var correctAnswer = 0;
var incorrectAnswer = 0
var unanswer = 0;


var q1 = {
    question: "What colour jersey is worn by the winners of each stage of the Tour De France? ",
    a1: "yellow",
    a2: "black",
    a3: "blue",
    a4: "white",
    checkAnswer: function(response){
        return response === this.a1;
    },
    getAnswer: function(){
        return this.a1;
    }
}

var q2 = {
    question: "In 2011, which country hosted a Formula 1 race for the first time?",
    a1: "Canada",
    a2: "India",
    a3: "Italy",
    a4: "France",
    checkAnswer: function(response){
        return response === this.a2;
    },
    getAnswer: function(){
        return this.a2;
    }
}

var q3 = {
    question: "Which chess piece can only move diagonally?",
    a1: "King",
    a2: "Queen",
    a3: "Bishop",
    a4: "None of the above",
    checkAnswer: function(response){
        return response === this.a3;
    },
    getAnswer: function(){
        return this.a3;
    }
}

var q4 = {
    question: "How many times was the Men's Tennis Singles at Wimbledon won by Bjorn Borg?",
    a1: "One",
    a2: "Two",
    a3: "Four",
    a4: "Five",
    checkAnswer: function(response){
        return response === this.a4;
    },
    getAnswer: function(){
        return this.a4;
    }
}

var questions = [q1,q2,q3,q4];




// This function will replace display whatever image it's given
// in the 'src' attribute of the img tag.
function displayQuestion() {

    $('.answers').addClass('answer');
    $('#time_remaining').empty();
    $('#restart').empty();
    $('#question').text(questions[count].question);
     $('#a1').text(questions[count].a1);
     $('#a2').text(questions[count].a2);
    $('#a3').text(questions[count].a3);
    $('#a4').text(questions[count].a4);

  var time_remaining = $('<div>');

    time_remaining.text("Time Remaining: " + stopWatch + " seconds");
    $('#time_remaining').html('<h3>' + time_remaining.html() + '</h3>');

    if (stopWatch > 0){
        stopWatch--;
    } else {
        // times up
   
        unanswer++;
       
    }

}



function displayResult(){
  
    $('#question').empty();
    $('#time_remaining').empty();
    $('#a1').text('Correct Answers : ' + correctAnswer);
    $('#a2').text("Incorrect Answers: " + incorrectAnswer);
    $('#a3').text("Unanswered: " + unanswer);
    
    $('#restart').text ("Start Over?");
    $('#restart').on('click',startGame );

    
}

function getQuestion() {
    
    clickable = true;
    stopWatch = defaultStopWatchTimer;
    count++
    questionTimer = setInterval(displayQuestion, 1000);
    questionTimeout = setTimeout(timeout, questionInterval+1000);
}

function timeout(){
    unanswer++;
    clearInterval(questionTimer);
    displayResponse(true, false);
}

function startGame() {
  count = -1;
  
  getQuestion();
}

function displayResponse(outOfTime, correctAnswer){

    clickable = false;
    $('.answer').text('');

    $('.answers').removeClass('answer');

    if (outOfTime){
         $('#a2').text('Out of time');
         $('#a3').text('The correct answer was ' + questions[count].getAnswer());
    } else{
        if (correctAnswer){
            $('#a2').text('Your answer was right')
        }else {
            $('#a2').text('Your answer was wrong');
            $('#a3').text('The correct answer was ' + questions[count].getAnswer());

        }
    }

    if (count === questions.length - 1){
        // display final result 
        setTimeout(displayResult,5000);
    } else {
        setTimeout(getQuestion, 5000);
    }

}


$(document).ready(function() {
 
    $('.answer').on ('click', function(){
        if (clickable){
        clearInterval(questionTimer);
        clearTimeout(questionTimeout);
        ( questions[count].checkAnswer($(this).text()))? correctAnswer++ : incorrectAnswer++;
        displayResponse(false,questions[count].checkAnswer($(this).text()));
        }
    });

    $('#start').on('click', startGame);

});

  



