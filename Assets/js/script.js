const question = [
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

function addDeleteButton(li) {
  var delButton = document.createElement("button");
  delButton.innerHTML = "Delete";
  delButton.id = "delete";
  li.appendChild(delButton);
}

generateBtn.addEventListener("click", () => {
  quizQuestion();
  setInterval(function () {
    let timeRanOut = timerNum === 0;
    if (!timeRanOut) timerNum--;
    timer.innerHTML = "TIME - " + timerNum;
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

function loadHighlight() {
  let list = document.getElementById("highlight-list");
  var li = document.createElement("li");
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
    li.appendChild(document.createTextNode(key + " - " + value + "  "));
    console.log(li);
    list.appendChild(li);
    addDeleteButton(li);
    li.appendChild(document.createElement("br"));
    li.appendChild(document.createElement("br"));
    list.onclick = function (event) {
      if (event.target.id === "delete") {
        localStorage.removeItem(key);
        location.reload();
      }
    };
  }
}

function submitResult() {
  var initial = document.getElementById("final-result").value;
  localStorage.setItem(initial, counter);
}

function quizQuestion() {
  if (index > question.length - 1) {
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
  }
  resetQuiz();
  let userQuestion = question[index];
  document.getElementById("question").innerText = userQuestion.question;
  for (i = 0; i < userQuestion.options.length; i++) {
    let button = document.createElement("button");
    button.onclick = function () {
      if (button.innerText === userQuestion.answer) {
        counter = counter + 1;
      }
      const index = findIndex(userQuestion, button.innerText);
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

function resetQuiz() {
  document.getElementById("question").innerText = "";
  document.getElementById("question-option").innerHTML = "";
  document.querySelector("h3").style.display = 'none';
  document.querySelector("ol").style.display = "none";
  generateBtn.remove();
}
