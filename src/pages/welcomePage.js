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
// Background moving feature 
  document.addEventListener('mousemove', (event) => {
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;
  
    const staticArea = document.querySelector("#user-interface")
    const rect = staticArea.getBoundingClientRect();
    const isInsideStaticArea = (
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom
    );
  
    if (!isInsideStaticArea) {
      const xOffset = (clientX / innerWidth) * 100;
      const yOffset = (clientY / innerHeight) * 100;
      document.body.style.backgroundPosition = `${xOffset}% ${yOffset}%`;
    } else {
      document.body.style.backgroundPosition = 'center center';
    }
  });
};



const startQuiz = () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  const el = document.createElement('h2'); // i think we should change the variable nme to be descriptive like userName
  // el.style.color = "gray"
  el.textContent = `Player: ${userName}`;
  userInterface.prepend(el);
  initQuestionPage();
};
