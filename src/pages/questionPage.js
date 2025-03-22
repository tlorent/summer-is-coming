import {
  ANSWERS_LIST_ID,
  NEXT_QUESTION_BUTTON_ID,
  SKIP_QUESTION_BUTTON_ID,
  USER_INTERFACE_ID,
  RESULTAT_BUTTON_ID
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { quizData } from '../data.js';
import { initResultatPage  } from '../pages/resultatPage.js';


let correctAnswerTotal = 0;
let skipTotal = 0;


export const initQuestionPage = (userName) => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  const el = document.createElement('h2');
  // el.style.color = "gray"
  el.textContent = `Player: ${userName}`;

  userInterface.prepend(el);
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];

  const questionElement = createQuestionElement(currentQuestion.text);

  userInterface.appendChild(questionElement);

  const answersListElement = document.getElementById(ANSWERS_LIST_ID);

  const currentQuestionAnswersList = currentQuestion.answers;

  const answersListElements = Object.entries(currentQuestionAnswersList).map(
    (answer) => {
      const [key, answerText] = answer;
      const answerElement = createAnswerElement(key, answerText);
      answersListElement.appendChild(answerElement);
      return answerElement;
    }
  );

  answersListElements.forEach((answerElement) => {
    const checkAnswer = () => {
      answersListElements.forEach((answerElement) => {
        answerElement.classList.remove('correct-answer', 'wrong-answer');
      });

      const { key: userChoice } = answerElement.dataset;
      currentQuestion.selected = userChoice;

      if (currentQuestion.selected !== currentQuestion.correct) {
        answerElement.classList.add('wrong-answer');
        answerElement.classList.remove('button');
        const hint = document.createElement('a');
        hint.classList.add('hint');
        hint.textContent = `Hint: ${currentQuestion.links[0].text}`;
        hint.href = currentQuestion.links[0].href;
        document.querySelector('body').appendChild(hint);
      }

      answersListElements.forEach((el) => {
        const { key } = el.dataset;
        if (key === currentQuestion.correct) {
          el.classList.add('correct-answer');
          //remove 'button' class to not change backgrondcolor if the answer have correct 'answer-class'
          el.classList.remove('button');
          
          correctAnswerTotal++;
        }
      });




        const hint = document.createElement('a');
        hint.classList.add('hint');
        hint.setAttribute('target', '_blank');
        hint.textContent = `Hint: ${currentQuestion.links[0].text}`;
        hint.href = currentQuestion.links[0].href;
        document.querySelector('body').appendChild(hint);
      }

    answerElement.addEventListener('click', checkAnswer);


  });

  document
    .getElementById(NEXT_QUESTION_BUTTON_ID)
    .addEventListener('click', () => nextQuestion(userName));

  document
    .getElementById(SKIP_QUESTION_BUTTON_ID)
    .addEventListener('click', () => 
      {
        skipTotal++;
        nextQuestion(userName)
      });


      const resultButton = document.getElementById(RESULTAT_BUTTON_ID);
      resultButton.style.display = "none"; 
      if (quizData.currentQuestionIndex === quizData.questions.length - 1) {
        resultButton.style.display = "block";   
        resultButton.addEventListener('click', () => {
              
const ex = document.getElementById(RESULTAT_BUTTON_ID);
ex.style.display="none";
          resultat(userName, correctAnswerTotal, skipTotal);

        });
      }
      
};

const nextQuestion = (userName) => {
  quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;

  const hints = document.querySelectorAll('.hint');
  if (hints) {
    hints.forEach((hint) => hint.remove());
  }

  initQuestionPage(userName);
  if (quizData.currentQuestionIndex===9) {
    const nextQuestionBytton = document.getElementById(NEXT_QUESTION_BUTTON_ID);
    nextQuestionBytton.style.display="none";
  }

};

const resultat = (userName, correctAnswerTotal, skipTotal) => {  
  
  initResultatPage(userName, correctAnswerTotal, skipTotal);     
};