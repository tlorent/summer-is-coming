import { START_QUIZ_BUTTON_ID } from '../constants.js';

/**
 * Create the welcome screen
 * @returns {Element}
 */
export const createWelcomeElement = () => {
  const element = document.createElement('div');
  element.classList.add('welcome__block');
  element.innerHTML = String.raw`
    <h1 class="main__title">Welcome to the Game of Thrones Quiz!</h1>
     <h2 class="sub__title">Think you know the Seven Kingdoms? Test your knowledge and prove you’re worthy of the Iron Throne.</h2>
    <label>
      <input class="input__name" placeholder="Your Name"/>
    </label>
    <button id="${START_QUIZ_BUTTON_ID}">start quiz</button>
  `;
  return element;
};
