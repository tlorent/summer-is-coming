import {
  USER_INTERFACE_ID,
  WELCOME_BUTTON_ID,
  ANSWERS_BUTTON_ID,
} from '../constants.js';
import { initWelcomePage } from './welcomePage.js';
import { createResultatElement } from '../views/resultatView.js';
import { quizData } from '../data.js';
import { clearHint } from '../helper.js';
import {resultsArray} from './questionPage.js';
import { userAnswersPage} from "./userAnswersPage.js";
import { userName } from './welcomePage.js';


export const initResultatPage = (userName, correctAnswerTotal, skipTotal) => {
  clearHint();
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  const resultatElement = createResultatElement();
  userInterface.appendChild(resultatElement);

  const title = document.querySelector('.title');
  title.textContent = `${userName}, you did this!`;

  const correctAnswers = resultatElement.querySelector('.correct_answers');
  correctAnswers.textContent = 'correct :' + correctAnswerTotal;

  const skipedAnswers = resultatElement.querySelector('.skiped_answers');
  if (skipedAnswers.textContent === null) {skipTotal = 0}
  else { skipedAnswers.textContent = 'skiped :' + skipTotal;}

  const result = resultatElement.querySelector('.result__content');

  if (correctAnswerTotal <= 3) {result.textContent = `"You know nothing, Jon Snow!" Your knowledge of Westeros is as thin as the Night’s Watch rations. Time to rewatch the series or revisit the books!`}
  else if (correctAnswerTotal > 3 && correctAnswerTotal <= 5) {result.textContent = `"A lion does not concern himself with the opinion of sheep." You have a decent grasp of the realm, but you’re not quite ready to claim the Iron Throne. Keep sharpening your knowledge, and soon, you’ll rule like a true Westerosi lord!`}
  else {result.textContent = `"When you play the game of thrones, you win or you die." Congratulations! Your knowledge rivals that of Varys and Tyrion combined. You would survive the intrigues of King’s Landing and maybe even claim the throne yourself!`};
  
  document
    .getElementById(WELCOME_BUTTON_ID)
    .addEventListener('click', startQuiz);

    document
    .getElementById(ANSWERS_BUTTON_ID)
    .addEventListener('click', answersPage);
};


const startQuiz = () => {
  quizData.currentQuestionIndex = 0;
  localStorage.clear();
  quizData.questions.forEach((question) => (question.selected = null));
  initWelcomePage();
};

const answersPage = () => {
  userAnswersPage(userName);
};