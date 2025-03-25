import { USER_INTERFACE_ID, WELCOME_BUTTON_ID } from '../constants.js';
import { initWelcomePage } from './welcomePage.js';
import { createResultatElement } from '../views/userAnswersView.js';
import { clearHint, getQuizDataLS } from '../helper.js';

export const userAnswersPage = () => {
  const userName = localStorage.getItem('userName') || 'Player';
  const { questions } = getQuizDataLS();
  console.log(questions);

  clearHint();

  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  const resultatElement = createResultatElement();
  userInterface.appendChild(resultatElement);

  const title = document.querySelector('.title');
  title.textContent = `${userName}, how you can sheck your answers`;

  const showResults = document.querySelector('.show_results');
  questions.forEach((element) => {
    const { correct, selected, answers, text, skipped } = element;

    const textQuestionElement = document.createElement('div');
    textQuestionElement.classList.add('question-text');
    textQuestionElement.textContent = text;
    showResults.appendChild(textQuestionElement);

    if ((selected && correct === selected) || skipped) {
      const answerElement = document.createElement('div');
      answerElement.classList.add('correct-answer-text');
      answerElement.textContent = answers[correct];
      showResults.appendChild(answerElement);
    } else if (selected && correct !== selected) {
      const answerElement = document.createElement('div');
      answerElement.classList.add('correct-answer-text');
      answerElement.textContent = answers[correct];
      const answerElementSelected = document.createElement('div');
      answerElementSelected.classList.add('wrong-answer-text');
      answerElementSelected.textContent = answers[selected];
      showResults.appendChild(answerElementSelected);
      showResults.appendChild(answerElement);
    }
  });

  document
    .getElementById(WELCOME_BUTTON_ID)
    .addEventListener('click', startQuiz);
};

const startQuiz = () => {
  localStorage.clear();
  initWelcomePage();
};
