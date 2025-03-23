import { USER_INTERFACE_ID, START_QUIZ_BUTTON_ID } from '../constants.js';
import { createWelcomeElement } from '../views/welcomeView.js';
import { initQuestionPage } from './questionPage.js';
import { quizData } from '../data.js';

let userName = '';

export const initWelcomePage = () => {
  // Check if there's a saved user name and current question index in localStorage
  const savedUserName = localStorage.getItem('userName');
  const savedQuestionIndex = localStorage.getItem('currentQuestion');
  
  if (savedUserName && savedQuestionIndex !== null) {
    // If both are saved, load the quiz directly without showing the welcome page
    userName = savedUserName;
    quizData.currentQuestionIndex = JSON.parse(savedQuestionIndex);
    initQuestionPage(userName);  // Start quiz from the saved state
    return;  // Exit early to avoid showing the welcome page
  }

  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  const welcomeElement = createWelcomeElement();
  userInterface.appendChild(welcomeElement);

  document.getElementById(START_QUIZ_BUTTON_ID)
    .addEventListener('click', startQuiz);

  document.querySelector('.input__name').addEventListener('change', (e) => {
    userName = e.target.value;
    localStorage.setItem('userName', userName);
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
  // Store the starting question index if starting a new quiz
  quizData.currentQuestionIndex = 0;
  localStorage.setItem("currentQuestion", JSON.stringify(quizData.currentQuestionIndex));
  initQuestionPage(userName);  // Start the quiz after clicking the button
};