import {
  ANSWERS_LIST_ID,
  NEXT_QUESTION_BUTTON_ID,
  SKIP_QUESTION_BUTTON_ID,
  USER_INTERFACE_ID,
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { quizData } from '../data.js';

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
        answerElement.classList.remove('correct-answer');
        answerElement.classList.remove('wrong-answer');
      });

      const { key: userChoice } = answerElement.dataset;
      currentQuestion.selected = userChoice;
      if (currentQuestion.selected === currentQuestion.correct) {
        answerElement.classList.add('correct-answer');
      } else {
        answerElement.classList.add('wrong-answer');
      }
    };
    answerElement.addEventListener('click', checkAnswer);
  });

  document
    .getElementById(NEXT_QUESTION_BUTTON_ID)
    .addEventListener('click', () => nextQuestion(userName));

  document
    .getElementById(SKIP_QUESTION_BUTTON_ID)
    .addEventListener('click', () => nextQuestion(userName));
};

const nextQuestion = (userName) => {
  quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;

  initQuestionPage(userName);
};
