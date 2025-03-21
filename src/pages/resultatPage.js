import { USER_INTERFACE_ID, WELCOME_BUTTON_ID, START_QUIZ_BUTTON_ID, RESULTAT_BUTTON_ID } from '../constants.js';
import { initWelcomePage } from './welcomePage.js';
import { createResultatElement } from '../views/resultatView.js';
import { createWelcomeElement } from '../views/welcomeView.js';

export const initResultatPage = (userName, correctAnswerTotal, skipTotal) => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  const resultatElement = createResultatElement();
  userInterface.appendChild(resultatElement);

  const el = document.createElement('h2');
  el.textContent = `${userName}, you did this!`;

  const resultat = document.createElement('div');
  if (correctAnswerTotal <= 3) {resultat.textContent = `correct ${correctAnswerTotal}, skipped ${skipTotal}. "You know nothing, Jon Snow!" Your knowledge of Westeros is as thin as the Night’s Watch rations. Time to rewatch the series or revisit the books!`} 
  else if (correctAnswerTotal > 3 && correctAnswerTotal <= 5) {resultat.textContent = `correct ${correctAnswerTotal}, skipped ${skipTotal}. "A lion does not concern himself with the opinion of sheep." You have a decent grasp of the realm, but you’re not quite ready to claim the Iron Throne. Keep sharpening your knowledge, and soon, you’ll rule like a true Westerosi lord!`}
  else {resultat.textContent = `correct ${correctAnswerTotal}, skipped ${skipTotal}. "When you play the game of thrones, you win or you die." Congratulations! Your knowledge rivals that of Varys and Tyrion combined. You would survive the intrigues of King’s Landing and maybe even claim the throne yourself!`};

  
  userInterface.appendChild(el);
  userInterface.appendChild(resultat);

  document
    .getElementById(WELCOME_BUTTON_ID)
    .addEventListener('click', startQuiz);

};

const startQuiz = (correctAnswerTotal, skipTotal) => {
  correctAnswerTotal = 0;
  skipTotal = 0;
  initWelcomePage();
};



