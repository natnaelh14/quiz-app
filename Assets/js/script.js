//created and placed questions in an array of objects.
const questionList = [
  {
    question:
      "Some months have 30 days, some months have 31 days. How many months have 28 days?",
    answer: "12",
    options: ["3", "6", "1", "12"],
  },
  {
    question: "Which word is not a synonym of the others?",
    answer: "Lassitude",
    options: ["Coruscation", "Luminosity", "Lassitude", "Trenchancy"],
  },
  {
    question:
      "The mystery number is between 60 and 150, a multiple of 7, and the sum of its digits is 10. What is the mystery number?",
    answer: "91",
    options: ["63", "84", "82", "91"],
  },
  {
    question: "What is the capital of Ukraine?",
    answer: "Kyiv",
    options: ["Kyiv", "Minsk", "Odesa", "Moscow"],
  },
  {
    question:
      "	Sequential reasoning is often tested in IQ exams. 3, 7, 13, 21, 31. What number comes next in the sequence?",
    answer: "43",
    options: ["37", "45", "43", "39"],
  },
  {
    question:
      "A painting and a sculpture cost $1500 in total. The painting costs $1,000 more than the sculpture. How much does the sculpture cost?",
    answer: "$250",
    options: ["$400", "$450", "$250", "$200"],
  },
  {
    question:
      "Which of the following words is spelt correctly (using US Spelling)?",
    answer: "Fulfill",
    options: ["Vacumm", "Ocurred", "Greatful", "Fulfill"],
  },
  {
    question: "What is the square root of 225?",
    answer: "15",
    options: ["25", "15", "52", "22"],
  },
  {
    question:
      "A bakery had 3 pies cut into eighths. Three-quarters of all pieces were sold. How many were not sold?",
    answer: "6",
    options: ["6", "8", "9", "12"],
  },
  {
    question: "Water is to ice as milk is to _____.?",
    answer: "Butter",
    options: ["Calf", "Coffee", "Butter", "Cow"],
  },
];

let timer = document.querySelector("h2");
let correctAnswer = document.getElementById("result");
let quizText = document.getElementById("question");
let quesOption = document.getElementById("question-option");
let generateBtn = document.getElementById("generate");
let quizMsg = document.getElementById("quiz-message");
let saveScore = document.getElementById("save-score");
let index = 0;
let counter = 0;
let timerNum = 200;
var quizCompleted = false;

//I created submit button and input area. Then, I created an event listener for submit button.
function submitInitials() {
  let textField = document.createElement("input");
  textField.type = "text";
  textField.value = "";
  textField.setAttribute("id", "final-result");
  let label = document.createElement("label");
  label.innerHTML = "Please enter your initials : ";
  let submit = document.createElement("input");
  submit.type = "submit";
  submit.value = "Submit";
  saveScore.appendChild(label);
  saveScore.appendChild(textField);
  saveScore.appendChild(submit);
  saveScore.addEventListener("submit", submitResult);
}

//When generateBtn is clicked, the quizQuestion() function is executed and the timeNum countdown begins.
if(generateBtn) {
  generateBtn.addEventListener("click", () => {
    quizQuestion();
    setInterval(function () {
      let timeRanOut = timerNum === 0;
      if (!timeRanOut) timerNum--;
      timer.innerHTML = "TIME - " + timerNum;
      //conditional, if time runs out before the user finishes quiz.
      if (timerNum === 0 && !quizCompleted) {
        resetQuiz();
        quizCompleted = true;
        submitInitials();
        if (counter >= 8) {
          quizMsg.appendChild(
            document.createTextNode(
              "You have run out of time. Your final result is " + counter + "/10"
            )
          );
          quizMsg.appendChild(document.createElement("br"));
          quizMsg.appendChild(
            document.createTextNode("You are officially a genius")
          );
        } else {
          quizMsg.appendChild(
            document.createTextNode(
              "You have run out of time. Your final result is " + counter + "/10"
            )
          );
          quizMsg.appendChild(document.createElement("br"));
          quizMsg.appendChild(
            document.createTextNode(
              "Don't worry, We are all smart in our own way"
            )
          );
        }
      }
    }, 1000);
  });
}
//created delete button on highlight.html
function addDeleteButton(li, i) {
  var delButton = document.createElement("button");
  delButton.innerHTML = "Delete";
  delButton.id = "delete-" + i;
  li.appendChild(delButton);
}
//logs the initial and user's score in the highlight.html and create an onclick for the delete button.
function loadHighlight() {
  let list = document.getElementById("highlight-list");
  for (var i = 0; i < localStorage.length; i++) {
    var li = document.createElement("li");
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
    li.appendChild(document.createTextNode(key + " - " + value + "  "));
    list.appendChild(li);
    addDeleteButton(li, i);
    li.appendChild(document.createElement("br"));
    li.appendChild(document.createElement("br"));
    list.onclick = function (event) {
      if (event.target.id.startsWith("delete")) {
        var key  = event.target.id.split("-")[1];
        localStorage.removeItem(localStorage.key(key));
        location.reload();
      }
    };
  }
}
//Saves the initials and score in the local storage.
function submitResult() {
  var initial = document.getElementById("final-result").value;
  localStorage.setItem(initial, counter);
}

function quizQuestion() {
  resetQuiz();
  if (index > questionList.length - 1) {
    submitInitials();
    quizCompleted = true;
    timerNum = 0;
    if (counter >= 8) {
      quizMsg.appendChild(
        document.createTextNode("Your final result is " + counter + "/10.")
      );
      quizMsg.appendChild(document.createElement("br"));
      quizMsg.appendChild(
        document.createTextNode("You are officially a genius")
      );
    } else {
      quizMsg.appendChild(
        document.createTextNode("Your final result is " + counter + "/10.")
      );
      quizMsg.appendChild(document.createElement("br"));
      quizMsg.appendChild(
        document.createTextNode("Don't worry, We are all smart in our own way")
      );
    }
    return;
  }
//creating the questions and choices pair
  let userQuestion = questionList[index];
  quizText.innerText = userQuestion.question;
  for (i = 0; i < userQuestion.options.length; i++) {
    let button = document.createElement("button");
    button.onclick = function () {
      if (button.innerText === userQuestion.answer) {
        counter = counter + 1;
      }
      const index = findIndex(userQuestion, button.innerText);
      //conditional checks whether the answer is correct or not. then, set css class based on the answer.
      if (button.innerText === userQuestion.answer) {
        const element = document.getElementById("button-" + index);
        element.setAttribute("class", "correct");
        setTimeout(function () {
          button.setAttribute("id", "question-option");
        }, 100);
      } else {
        timerNum = timerNum - 10;
        const element = document.getElementById("button-" + index);
        element.setAttribute("class", "incorrect");
        button.setAttribute("id", "question-option");
        setTimeout(function () {
          button.setAttribute("id", "question-option");
        }, 100);
      }
      setTimeout(function () {
        quizQuestion();
      }, 500);
    };
    button.innerHTML = userQuestion.options[i];
    button.setAttribute("id", "button-" + i);
    button.setAttribute("class", "button");
    quesOption.appendChild(button);
    quesOption.appendChild(document.createElement("br"));
    quesOption.appendChild(document.createElement("br"));
  }
  index++;
}

function findIndex(question, selectedAnswer) {
  return question.options.indexOf(selectedAnswer);
}
//clears the html for every render.
function resetQuiz() {
  document.getElementById("question").innerText = "";
  document.getElementById("question-option").innerHTML = "";
  document.querySelector("h3").style.display = "none";
  document.querySelector("ol").style.display = "none";
  generateBtn.remove();
}
