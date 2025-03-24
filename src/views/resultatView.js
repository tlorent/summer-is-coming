import { WELCOME_BUTTON_ID } from "../constants.js";
import { ANSWERS_BUTTON_ID } from "../constants.js";


/**
 * Create the resultat screen
 * @returns {Element}
 */
export const createResultatElement = () => {
  const element = document.createElement('div');

  element.innerHTML = String.raw`
    <h2 class="title"></h2>
    <div class="correct_answers"></div>
    <p class="skiped_answers"></p>
    <div class="result__content"></div>
    </div>
    <button id="${WELCOME_BUTTON_ID}">Start Quiz again</button>
    <button id="${ANSWERS_BUTTON_ID}">Your answers</button>
  `;
  return element;
};