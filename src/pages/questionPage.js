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

  for (const [key, answerText] of Object.entries(currentQuestion.answers)) {
    const answerElement = createAnswerElement(key, answerText);
    answersListElement.appendChild(answerElement);
  }

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
