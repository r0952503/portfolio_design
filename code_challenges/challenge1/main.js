
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'nl-BE';


const questions = [
    { question: "Welk dier staat bekend als de koning van de jungle?", answer: "Een leeuw" },
    { question: "Uit welk land komt de pizza oorspronkelijk?", answer: "Italië" },
    { question: "Wat is de hoofdstad van Nederland?", answer: "Amsterdam" },
    { question: "Welk instrument wordt gebruikt om kleine dingen zoals bacteriën te bekijken?", answer: "Een microscoop" },
    { question: "Welke bekende scheepsramp gebeurde in 1912?", answer: "De Titanic" },
];


let currentQuestionIndex = -1;
document.querySelector("#quizBtn").style.display = 'none';
document.querySelector("#quizBtn").disabled = true;


function askQuestion() {
    currentQuestionIndex++;
   
    
    const question = questions[currentQuestionIndex].question;
    document.querySelector("#question").textContent = question;
    document.querySelector("#output").innerHTML = "";
    document.querySelector("#speakBtn").disabled = false;
    document.querySelector("#nextBtn").disabled = true;

 
    if (currentQuestionIndex === questions.length - 1) {
      document.querySelector("#nextBtn").style.display = 'none'; 
      document.querySelector("#quizBtn").style.display = 'inline-block';
  } else {
      document.querySelector("#quizBtn").style.display = 'none'; 
      document.querySelector("#nextBtn").style.display = 'inline-block'; 
  }
}


recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript.trim().toLowerCase();
    const correctAnswer = questions[currentQuestionIndex].answer.toLowerCase();

    if (transcript === correctAnswer) {
        document.querySelector("#output").innerHTML = "Juist! Je zei: " + transcript;
        document.querySelector("#speakBtn").disabled = true;
        document.querySelector("#nextBtn").disabled = false;
       
       
    if (currentQuestionIndex === questions.length - 1) {
          document.querySelector("#quizBtn").disabled = false;
      }
  } else {
      document.querySelector("#output").innerHTML = "Fout! Probeer opnieuw.";
      document.querySelector("#speakBtn").disabled = false;
      document.querySelector("#quizBtn").disabled = true; 
  }
};

recognition.onerror = function (event) {
    document.querySelector("#output").innerHTML = "Fout bij het herkennen van spraak: " + event.error;
    document.querySelector("#speakBtn").disabled = false;
};

document.querySelector("#startQuizBtn").addEventListener("click", function () {
    
    document.querySelector("#startQuizBtn").style.display = 'none';
    currentQuestionIndex = -1; 
    document.querySelector("#nextBtn").style.display = 'inline-block'; 
    askQuestion(); 
});


document.querySelector("#speakBtn").addEventListener("click", function () {
    recognition.start(); 
});


document.querySelector("#nextBtn").addEventListener("click", function () {
    askQuestion();
});

function completeQuiz() {
    window.location.href = 'index.html'; 
}

