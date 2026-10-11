var questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlink Text Management Language",
            "Home Tool Markup Language"
        ],
        answer: 0
    },
    {
        question: "Which language is used to style a website?",
        options: ["HTML", "CSS", "JavaScript", "Python"],
        answer: 1
    },
    {
        question: "Which language makes a website interactive?",
        options: ["HTML", "CSS", "JavaScript", "SQL"],
        answer: 2
    },
    {
        question: "Which HTML tag creates a hyperlink?",
        options: ["<link>", "<href>", "<url>", "<a>"],
        answer: 3
    },
    {
        question: "Which CSS property changes the color of text?",
        options: ["color", "font-color", "text-color", "foreground"],
        answer: 0
    },
    {
        question: "Which symbol is used to select an element by its ID in CSS?",
        options: [".", "*", "#", "&"],
        answer: 2
    },
    {
        question: "Which keyword declares a block-scoped variable that can be reassigned in JavaScript?",
        options: ["var", "const", "define", "let"],
        answer: 3
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Computer Style Sheets",
            "Creative Style System",
            "Cascading Style Sheets",
            "Colorful Style Syntax"
        ],
        answer: 2
    },
    {
        question: "Which HTML tag creates the largest heading?",
        options: ["<heading>", "<h1>", "<h6>", "<head>"],
        answer: 1
    },
    {
        question: "How do you write a single-line comment in JavaScript?",
        options: [
            "// comment",
            "# comment",
            "<!-- comment -->",
            "** comment **"
        ],
        answer: 0
    },
    {
        question: "Which method selects an element by its ID?",
        options: [
            "document.querySelectorAll()",
            "document.getElement()",
            "document.findId()",
            "document.getElementById()"
        ],
        answer: 3
    },
    {
        question: "What does DOM stand for?",
        options: [
            "Data Object Model",
            "Document Object Model",
            "Digital Order Method",
            "Display Object Management"
        ],
        answer: 1
    },
    {
        question: "Which CSS property adds space inside an element, between its content and its border?",
        options: ["margin", "spacing", "padding", "gap"],
        answer: 2
    },
    {
        question: "What does typeof \"hello\" return in JavaScript?",
        options: ["\"text\"", "\"char\"", "\"string\"", "\"word\""],
        answer: 2
    },
    {
        question: "Which operator checks both value and type in JavaScript?",
        options: ["=", "==", "!=", "==="],
        answer: 3
    },
    {
        question: "Which HTML attribute provides alternative text for an image?",
        options: ["title", "src", "alt", "caption"],
        answer: 2
    },
    {
        question: "Which CSS declaration turns an element into a flex container?",
        options: [
            "display: flex",
            "position: flex",
            "flex: container",
            "layout: flex"
        ],
        answer: 0
    },
    {
        question: "Which HTML tag is used to include JavaScript?",
        options: ["<js>", "<script>", "<javascript>", "<code>"],
        answer: 1
    },
    {
        question: "What does console.log() do?",
        options: [
            "Creates a new variable",
            "Reloads the page",
            "Deletes an element",
            "Prints output to the browser console"
        ],
        answer: 3
    },
    {
        question: "Which array method adds an item to the end of an array?",
        options: ["push()", "pop()", "shift()", "slice()"],
        answer: 0
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let correctAnswers = 0;
let wrongAnswers = 0;
let questionNumber = 0;

function showQuestion() {
    document.getElementById("question").textContent =
        questions[currentQuestion].question;

    document.getElementById("progress").textContent =
        "Question " + (currentQuestion + 1) + " of " + questions.length;

    for (let i = 0; i < 4; i++) {
        document.getElementById("option" + i).textContent =
            questions[currentQuestion].options[i];
    }
}



function checkAnswer(answer) {
    selectedAnswer = answer;

    for (let i = 0; i < 4; i++) {
    document.getElementById("option" + i).classList.remove("selected")
        }
    document.getElementById("option" + answer).classList.add("selected")
}

function nextQuestion(){
    document.getElementById("option" + selectedAnswer).classList.remove("selected")
    if (selectedAnswer == questions[currentQuestion].answer) {
        score++;
        correctAnswers++;
    } else {
        wrongAnswers++;
    }

    currentQuestion++;
    selectedAnswer = null;

    if (currentQuestion < questions.length ) {
        showQuestion()
    }else{
        showResult()
    }
    
}


function showResult() {
    document.getElementById("quiz").style.display = "none";

    document.getElementById("progress").style.display = "none";

    document.getElementById("resultCard").style.display = "block";

    document.getElementById("finalScore").innerHTML =
        "Your Score: " + score + " / " + questions.length;

    document.getElementById("finalProgress").innerHTML =
        "Correct: " + correctAnswers +
        " | Wrong: " + wrongAnswers;

    if (score >= 12) {
        document.getElementById("passCard").style.display = "block";
        document.getElementById("failCard").style.display = "none";
        launchConfetti()
    } else {
        document.getElementById("passCard").style.display = "none";
        document.getElementById("failCard").style.display = "block";
    }

        localStorage.setItem("quizResult", JSON.stringify({
        score: score,
        correctAnswers: correctAnswers,
        wrongAnswers: wrongAnswers}))
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    selectedAnswer = null;

    document.getElementById("progress").style.display = "block";
    document.getElementById("resultCard").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    document.getElementById("score").innerHTML = "";
    localStorage.clear()

    showQuestion();
}


document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        nextQuestion();
    }
});

function launchConfetti() {
    var container = document.getElementById("confetti-container");
    var colors = ["#ff4757", "#ffa502", "#2ed573", "#1e90ff", "#a55eea", "#ff6bcb"];

    for (var i = 0; i < 100; i++) {
        var piece = document.createElement("div");

        piece.classList.add("confetti");
        piece.style.left = Math.random() * 100 + "vw";
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDelay = Math.random() * 1.5 + "s";
        piece.style.transform = "rotate(" + Math.random() * 360 + "deg)";

        container.appendChild(piece);
    }

    setTimeout(function () {
        container.innerHTML = "";
    }, 5000);
}

let savedResult = localStorage.getItem("quizResult");

if (savedResult) {
    var data = JSON.parse(savedResult);
    score = data.score;
    correctAnswers = data.correctAnswers;
    wrongAnswers = data.wrongAnswers;
    document.getElementById("startCard").style.display = "none";
    showResult(false);
} else {
    showQuestion();
}

function startQuiz() {
    document.getElementById("startCard").style.display = "none";
    document.getElementById("quiz").style.display = "block";
}
