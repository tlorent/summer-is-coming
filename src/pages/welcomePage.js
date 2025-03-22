import { USER_INTERFACE_ID, START_QUIZ_BUTTON_ID } from '../constants.js';
import { createWelcomeElement } from '../views/welcomeView.js';
import { initQuestionPage } from './questionPage.js';

let userName = '';
export const initWelcomePage = () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  const welcomeElement = createWelcomeElement();
  userInterface.appendChild(welcomeElement);

  document
    .getElementById(START_QUIZ_BUTTON_ID)
    .addEventListener('click', startQuiz);

  document.querySelector('.input__name').addEventListener('change', (e) => {
    userName = e.target.value;
  });
};

const startQuiz = () => {
  if (userName.trim().length < 1) {
    document.querySelector('.input__name').classList.add('need__name');
    

  } else  {
    initQuestionPage(userName);
  }
};
