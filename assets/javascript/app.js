var numCorrect = 0;
var numIncorrect = 0;
var numUnanswered = 0;
var timeLeft = 60;
var intervalId;
var audio = new Audio('assets/javascript/TheOffice.mp3');

var trivia = [{
    question: "1. In the TV show 'The Office', who is the regional manager?",
    options: ["Michael Scott", "Jim Halpert", "Pam Beasely", "Dwight Schrute"],
    userAns: "",
    correctAns: "Michael Scott"
}, {
    question: "2. What special event does Michael host for his employees every year?",
    options: ["The Mifflins", "The Dunflies", "The Miffies", "The Dundies"],
    userAns: "",
    correctAns: "The Dundies"
}, {
    question: "3. How does Michael save Meredith from rabies?",
    options: ["Hits her with his car", "He lends her money for an operation", "He stops her from taking too many painkillers", "He drives her mom after the Christian fiasco"],
    userAns: "",
    correctAns: "Hits her with his car"
}, {
    question: "4. Who does Michael marry?",
    options: ["Pam", "Jan", "Holly", "Angela"],
    userAns: "",
    correctAns: "Holly"
}, {
    question: "5. If Michael had a gun with two bullets and was in a room with Hitler, Bin Laden, and Toby, what would he do?",
    options: ["Shoot Hitler and Bin Laden", "Shoot Toby twice", "Shoot Hitler twice", "Shoot Bin Laden twice"],
    userAns: "",
    correctAns: "Shoot Toby twice"
}, {
    question: "6. Complete the quote: 'I love inside jokes...'",
    options: ["... I'd love to be a part of one someday", "... But no one likes it when I explain it to them", "... But I don't understand them", "... Do you want to have an inside joke with me?"],
    userAns: "",
    correctAns: "... I'd love to be a part of one someday"
}, {
    question: "7. Which of the following movies did Michael write, produce, direct, and star in?",
    options: ["Hockey Sticks: Ignite", "The Best Boss: Chronicles", "Threat Level Midnight", "Somehow, I Manage"],
    userAns: "",
    correctAns: "Threat Level Midnight"
}, {
    question: "8. Where does Michael move to with Holly?",
    options: ["New York", "Wyoming", "Arizona", "Colorado"],
    userAns: "",
    correctAns: "Colorado"
}, {
    question: "9. What was the name of Angela's sick cat that Dwight killed?",
    options: ["Sprinkles", "Mr. Longwhiskers", "Princess Puss", "Kitty"],
    userAns: "",
    correctAns: "Sprinkles"
}, {
    question: "10. What is Michael's favorite joke of all time?",
    options: ["Your mama's so fat!", "That's what she said", "Can I have some fries with that shake?", "You sound like my grandma!"],
    userAns: "",
    correctAns: "That's what she said"
}];

//creating and calling a function to display the questions from the trivia objectarray
for (var i = 0; i < trivia.length; i++) {
    displayQuestions(i);
}

//looping through my trivia object arry and then looping through the options property array to display each as a button
for (var i = 0; i < trivia.length; i++) {
    for (var j = 0; j < trivia[i].options.length; j++) {
        $(".answer." + i).append('<input type="radio" class ="question" name=question' + i + ' value="' + trivia[i].options[j] + '" > ' + trivia[i].options[j] + ' <br>');
        // console.log("here: ", trivia[i].options[j]);
    }
}

function displayQuestions(num) {
    // console.log("trivia question is: ", trivia[num].question);
    $(".question." + num).prepend('<p>' + trivia[num].question + '</p>');
}

function checkAnswers() {
    for (var i = 0; i < trivia.length; i++) {
        console.log("userans: ", trivia[i].userAns);
        console.log("correctAns: ", trivia[i].correctAns);
        if (trivia[i].userAns === trivia[i].correctAns) {
            numCorrect += 1;
        } else if (trivia[i].userAns === undefined) {
            numUnanswered += 1;
        } else {
            numIncorrect += 1;
        }
    }
    return [numCorrect, numUnanswered, numIncorrect];
}

function restart() {
    numCorrect = 0;
    numUnanswered = 0;
    numIncorrect = 0;
    timeLeft = 60;
    $(".show-number").html("<h2>Time Remaining:</h2><h2>60</h2>");
    //setting userAnswer to blank
    for (var i = 0; i < trivia.length; i++) {
        trivia[i].userAns = "";
    }
    //clearing the selected answers
    $(".question").prop('checked', false);
    // return trivia;
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
}

function decrement() {
    timeLeft--;
    $(".show-number").html("<h2>Time Remaining:</h2><h2>" + timeLeft + "</h2>");
    if (timeLeft === 0) {
        stopTimer();
        alert("Times Up! Let's see how well you know The Office");
        $(".questions").hide();
        $(".results").show();
        $(".submit").hide();
        $(".retry").show();
        $(".show-number").hide();
        stopTimer();
        for (var i = 0; i < trivia.length; i++) {
            trivia[i].userAns = $('input[name="question' + i + '"]:checked').val();
        }
        checkAnswers();
        $(".numCorrect").text(numCorrect);
        $(".numIncorrect").text(numIncorrect);
        $(".numUnanswered").text(numUnanswered);
    }
}

function stopTimer() {
    clearInterval(intervalId);
}

$(document).ready(function () {
    $(".questions").hide();
    $(".results").hide();
    $(".submit").hide();
    $(".retry").hide();
    $(".show-number").hide();
    // audio.play();

    $(".start").on("click", function () {
        $(".start").hide();
        $(".questions").show();
        $(".submit").show();
        $(".retry").hide();
        $(".show-number").show();
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
    }); //start ends here

    $(".submit").on("click", function () {
        $(".questions").hide();
        $(".results").show();
        $(".submit").hide();
        $(".retry").show();
        $(".show-number").hide();
        stopTimer();
        //looping through the inputs (buttons) and then getting each checked value and putting it in userAns property of trivia
        for (var i = 0; i < trivia.length; i++) {
            trivia[i].userAns = $('input[name="question' + i + '"]:checked').val();
            // console.log($('input[name="question'+i+'"]:checked').val());
            // console.log("trivia.userans: ", trivia[i].userAns);
        }
        checkAnswers();
        // console.log("correct: ", numCorrect);
        // console.log("incorr: ", numIncorrect);
        // console.log("unans: ", numUnanswered);
        $(".numCorrect").text(numCorrect);
        $(".numIncorrect").text(numIncorrect);
        $(".numUnanswered").text(numUnanswered);
    }); //submit ends here

    $(".retry").on("click", function () {
        $(".results").hide();
        $(".questions").show();
        $(".submit").show();
        $(".retry").hide();
        $(".show-number").show();
        restart();
    }); //retry ends here
}); //doucment ends here