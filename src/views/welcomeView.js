import { START_QUIZ_BUTTON_ID } from '../constants.js';

/**
 * Create the welcome screen
 * @returns {Element}
 */
export const createWelcomeElement = () => {
  const element = document.createElement('div');
  element.classList.add('welcome__block');
  element.innerHTML = String.raw`
    <h1>Welcome</h1>
    <label>
      <input class="input__name" placeholder="Your Name"/>
    </label>
    <button id="${START_QUIZ_BUTTON_ID}">start quiz</button>
  `;
  return element;
};
