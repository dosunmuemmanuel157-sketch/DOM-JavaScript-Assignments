// Quiz questions
let questions = [
  {
    question: "What does DOM stand for?",
    options: [
      "Document Object Model",
      "Data Object Model",
      "Document Oriented Model",
      "Data Oriented Module"
    ],
    answer: 0,
    explanation: "DOM stands for Document Object Model. It is a tree-like representation of an HTML page."
  },
  {
    question: "Which HTML tag is used to link a CSS file?",
    options: [
      "<script>",
      "<style>",
      "<link>",
      "<css>"
    ],
    answer: 2,
    explanation: "The <link> tag is used inside the <head> to connect an external CSS file to an HTML page."
  },
  {
    question: "Which method selects an element by ID in JavaScript?",
    options: [
      "document.getElement()",
      "document.getElementById()",
      "document.selectById()",
      "document.findById()"
    ],
    answer: 1,
    explanation: "document.getElementById() is used to select a single HTML element using its unique ID."
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Colorful Style Sheets"
    ],
    answer: 2,
    explanation: "CSS stands for Cascading Style Sheets. It is used to style and layout HTML elements."
  },
  {
    question: "Which keyword is used to declare a class in JavaScript?",
    options: [
      "function",
      "object",
      "class",
      "define"
    ],
    answer: 2,
    explanation: "The class keyword is used to define a class in JavaScript. Example: class Book { }"
  },
  {
    question: "What is the correct HTML tag for the largest heading?",
    options: [
      "<h6>",
      "<heading>",
      "<head>",
      "<h1>"
    ],
    answer: 3,
    explanation: "The <h1> tag defines the largest heading in HTML. Headings go from <h1> to <h6>."
  },
  {
    question: "Which CSS property changes the text color?",
    options: [
      "font-color",
      "text-color",
      "color",
      "foreground"
    ],
    answer: 2,
    explanation: "The color property in CSS is used to set the color of text. Example: color: red;"
  },
  {
    question: "What method adds an element to the end of an array?",
    options: [
      "push()",
      "pop()",
      "shift()",
      "add()"
    ],
    answer: 0,
    explanation: "push() adds one or more elements to the end of an array and returns the new length."
  },
  {
    question: "Which event fires when a button is clicked?",
    options: [
      "onchange",
      "onhover",
      "onload",
      "onclick"
    ],
    answer: 3,
    explanation: "The onclick event fires when the user clicks on an HTML element like a button."
  },
  {
    question: "What does JSON stand for?",
    options: [
      "JavaScript Object Notation",
      "Java Standard Object Notation",
      "JavaScript Oriented Network",
      "Java Simple Object Name"
    ],
    answer: 0,
    explanation: "JSON stands for JavaScript Object Notation. It is a lightweight format for storing and exchanging data."
  }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = new Array(questions.length).fill(null);

// Load question
function loadQuestion() {
  let q = questions[currentQuestion];

  document.getElementById("question-num").textContent =
    "Question " + (currentQuestion + 1) + " of " + questions.length;

  document.getElementById("question-text").textContent = q.question;

  // Reset all buttons
  let buttons = document.querySelectorAll(".option-btn");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].textContent = q.options[i];
    buttons[i].className = "option-btn";
    buttons[i].disabled = false;
  }

  // If user already answered this question show their answer
  if (userAnswers[currentQuestion] !== null) {
    let selected = userAnswers[currentQuestion];
    buttons[selected].classList.add(
      selected === q.answer ? "correct" : "wrong"
    );
    if (selected !== q.answer) {
      buttons[q.answer].classList.add("correct");
    }
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
  }

  // Handle prev and next buttons
  document.getElementById("prev-btn").disabled = currentQuestion === 0;
  document.getElementById("next-btn").textContent =
    currentQuestion === questions.length - 1 ? "Finish" : "Next";
}

// Check answer
function checkAnswer(selected) {
  // Don't allow if already answered
  if (userAnswers[currentQuestion] !== null) return;

  let q = questions[currentQuestion];
  let buttons = document.querySelectorAll(".option-btn");

  // Save user answer
  userAnswers[currentQuestion] = selected;

  // Disable all buttons
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }

  // Show correct and wrong
  if (selected === q.answer) {
    buttons[selected].classList.add("correct");
  } else {
    buttons[selected].classList.add("wrong");
    buttons[q.answer].classList.add("correct");
  }
}

// Next question
function nextQuestion() {
  if (currentQuestion === questions.length - 1) {
    showResult();
    return;
  }
  currentQuestion++;
  loadQuestion();
}

// Previous question
function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
}

// Show result
function showResult() {
  // Calculate score
  score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  document.getElementById("question-section").style.display = "none";
  document.getElementById("result-section").style.display = "block";

  document.getElementById("score").textContent = score;

  let remark = "";
  if (score === 10) {
    remark = "Excellent! Perfect Score! 🎉";
  } else if (score >= 8) {
    remark = "Great Job! Almost Perfect! 👏";
  } else if (score >= 6) {
    remark = "Good effort! Keep studying! 📚";
  } else if (score >= 4) {
    remark = "Fair! You need more practice! 😊";
  } else {
    remark = "Keep practicing! You got this! 💪";
  }

  document.getElementById("grade-remark").textContent = remark;

  // Show explanations
  let expList = document.getElementById("explanation-list");
  expList.innerHTML = "<h3>Explanations</h3>";

  for (let i = 0; i < questions.length; i++) {
    let q = questions[i];
    let isCorrect = userAnswers[i] === q.answer;

    let item = document.createElement("div");
    item.className = "exp-item";
    item.innerHTML = `
      <p class="exp-q">${i + 1}. ${q.question}</p>
      <p class="exp-text">💡 ${q.explanation}</p>
      <p class="${isCorrect ? 'exp-correct' : 'exp-wrong'}">
        ${isCorrect ? '✅ You got this right!' : '❌ You got this wrong. Correct answer: ' + q.options[q.answer]}
      </p>
    `;
    expList.appendChild(item);
  }
}

// Restart quiz
function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  userAnswers = new Array(questions.length).fill(null);
  document.getElementById("question-section").style.display = "block";
  document.getElementById("result-section").style.display = "none";
  document.getElementById("explanation-list").innerHTML = "";
  loadQuestion();
}

// Start quiz
loadQuestion();