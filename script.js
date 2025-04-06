let currentQuestion = 0;
let totalQuestions = 0;
let correctAnswers = 0;
let userAnswers = []; // Track user answers

const questions = [
    //  N.B. Keep me: Add more questions here
    { question: "What is 1 + 1", answers: ["5", "3", "2"], correct: "2"}, // N.B. Keep me
    { question: "What is 2 + 2", answers: ["4", "5", "1"], correct: "4"},
    { question: "What is 3 + 3", answers: ["6", "8", "10"], correct: "6"},
    { question: "What is 4 + 4", answers: ["2", "8", "4"], correct: "8"},
    { question: "What is 5 + 5", answers: ["10", "18", "1"], correct: "10"},
    { question: "What is 6 + 6", answers: ["26", "12", "20"], correct: "12"},
    { question: "What is 7 + 7", answers: ["14", "19", "15"], correct: "14"},
    { question: "What is 8 + 8", answers: ["12", "16", "19"], correct: "16"},
    { question: "What is 9 + 9", answers: ["26", "18", "15"], correct: "18"},
    { question: "What is 10 + 10", answers: ["20", "18", "10"], correct: "20"},
    { question: "What is 11 + 11", answers: ["22", "33", "44"], correct: "22" },
    { question: "What is 12 + 12", answers: ["24", "36", "48"], correct: "24" },
    { question: "What is 13 + 13", answers: ["26", "39", "52"], correct: "26" },
    { question: "What is 14 + 14", answers: ["28", "42", "56"], correct: "28" },
    { question: "What is 15 + 15", answers: ["30", "45", "60"], correct: "30" },
    { question: "What is 16 + 16", answers: ["32", "48", "64"], correct: "32" },
    { question: "What is 17 + 17", answers: ["34", "51", "68"], correct: "34" },
    { question: "What is 18 + 18", answers: ["36", "54", "72"], correct: "36" },
    { question: "What is 19 + 19", answers: ["38", "57", "76"], correct: "38" },
    { question: "What is 20 + 20", answers: ["40", "60", "80"], correct: "40" },
];

function checkAnswer(element) {
    totalQuestions++;
    const isCorrect = questions[currentQuestion].correct === element.textContent;
    userAnswers.push({ 
        question: questions[currentQuestion].question, 
        selected: element.textContent, 
        correct: questions[currentQuestion].correct 
    });

    document.querySelectorAll(".answer").forEach(btn => {
        if (btn === element) {
            if (isCorrect) {
                btn.style.backgroundColor = "green"; // Highlight correct choice in green
            } else {
                btn.style.backgroundColor = "red"; // Highlight wrong choice in red
            }
        } else if (btn.textContent === questions[currentQuestion].correct) {
            btn.style.backgroundColor = "green"; // Highlight correct answer in green
        } else {
            btn.style.backgroundColor = ""; // Keep other options in their original gradient
        }
        btn.disabled = true; // Disable all buttons
    });

    if (isCorrect) {
        correctAnswers++;
        document.getElementById("result").textContent = "Correct!";
        document.getElementById("quiz-container").style.color = "lime";
        document.getElementById("quiz-container").style.backgroundColor = "DarkGreen";
    } else {
        document.getElementById("result").textContent = "Wrong!";
        document.getElementById("quiz-container").style.color = "red";
        document.getElementById("quiz-container").style.backgroundColor = "darkred";
    }

    document.getElementById("next").style.display = 'block';
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        document.getElementById("question").textContent = `Q${currentQuestion + 1}: ${questions[currentQuestion].question}`;
        const buttons = document.querySelectorAll(".answer");
        const shuffledAnswers = [...questions[currentQuestion].answers];
        shuffleArray(shuffledAnswers); // Shuffle the answers

        shuffledAnswers.forEach((answer, index) => {
            buttons[index].textContent = answer;
            buttons[index].disabled = false;
            buttons[index].style.backgroundColor = getRandomColor(); // Assign random rainbow color
        });

        document.getElementById("result").textContent = "";
        document.getElementById("next").style.display = 'none';
        document.getElementById("quiz-container").style.color = "black";
        document.getElementById("quiz-container").style.backgroundColor = "white";
    } else {
        endQuiz();
    }
}

function endQuiz() {
    let reportCard = `
        <div>Quiz completed! You got ${correctAnswers}/${totalQuestions} correct</div>
        <div style="overflow-y: auto; max-height: 400px; margin-top: 20px;">
            <table style="width: 100%; border-collapse: collapse; text-align: left;">
                <thead>
                    <tr>
                        <th style="border-bottom: 2px solid white; padding: 10px;">Question</th>
                        <th style="border-bottom: 2px solid white; padding: 10px;">Your Answer</th>
                        <th style="border-bottom: 2px solid white; padding: 10px;">Correct Answer</th>
                    </tr>
                </thead>
                <tbody>
    `;
    userAnswers.forEach((answer, index) => {
        const isCorrect = answer.selected === answer.correct;
        reportCard += `
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid white;">Q${index + 1}: ${answer.question}</td>
                <td style="padding: 10px; border-bottom: 1px solid white; color: ${isCorrect ? 'lime' : 'red'};">
                    ${answer.selected} ${isCorrect ? "(Correct)" : "(Wrong)"}
                </td>
                <td style="padding: 10px; border-bottom: 1px solid white;">${answer.correct}</td>
            </tr>
        `;
    });
    reportCard += `
                </tbody>
            </table>
        </div>
        <button id="play-again" onclick="restartQuiz()">Play Again</button>
    `;

    document.getElementById("quiz-container").innerHTML = reportCard;

    const quizContainer = document.getElementById("quiz-container");
    if (correctAnswers / totalQuestions === 1) {
        quizContainer.style.color = "green";
        quizContainer.style.backgroundColor = "limegreen";
    } else if (Math.round(correctAnswers / totalQuestions) === 1) {
        quizContainer.style.color = "yellow";
        quizContainer.style.backgroundColor = "darkgoldenrod";
    } else {
        quizContainer.style.color = "red";
        quizContainer.style.backgroundColor = "blue";
    }
}

function restartQuiz() {
    currentQuestion = 0;
    totalQuestions = 0;
    correctAnswers = 0;
    userAnswers = []; // Reset user answers

    shuffleArray(questions); // Randomize the order of questions

    document.getElementById("quiz-container").innerHTML = `
        <div id="question">Q1: ${questions[currentQuestion].question}</div>
        ${questions[currentQuestion].answers.map((answer, index) => `
            <button class="answer" onclick="checkAnswer(this)" style="background-color: ${getRandomColor()}">${answer}</button>
        `).join('')}
        <div id="result"></div>
        <button id="next" onclick="nextQuestion()" style="display: none;">Next Question</button>
    `;
}
