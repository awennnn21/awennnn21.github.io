const questions = [
    {
        question: "What does ICT stands for?",
        answers: [
            { text: "Information and Communications Technology", correct: true},
            { text: "Intelligence and Commands Technology", correct: false},
            { text: "International Communications Technology", correct: false},
            { text: "Informational and Communicating Technology", correct: false},
        ]
    },
    {
        question: "What is the function of a computer mouse?",
        answers: [
            { text: "Keep your computer clean", correct: false},
            { text: "To show an output", correct: false},
            { text: "Make a sound", correct: false},
            { text: "To move a cursor", correct: true}, 
        ]
    },
    {
        question: " ____________ is data that has been organized or presented in a meaningful fashion.",
        answers: [
            { text: "A process", correct: false},
            { text: "Information", correct: true},
            { text: "Storage", correct: false},
            { text: "Software", correct: false}, 
        ]
    },
    {
        question: "What keeps a computer form overheating?",
        answers: [
            { text: "Power Supply", correct: false},
            { text: "Random Access Memory", correct: false},
            { text: "Central Processing Unit", correct: false},
            { text: "System Fan", correct: true},
        ]
    },
    {
        question: "What is the considered as the heart of a computer?",
        answers: [
            { text: "Motherboard", correct: false},
            { text: "Central Processing Unit", correct: true},
            { text: "Read-Only Memory", correct: false},
            { text: "Random Access Memory", correct: false},
        ]
    }
]; 

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore()
    }
}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz()
    }
});


startQuiz();