import { WELCOME_BUTTON_ID } from "../constants.js";

/**
 * Create the resultat screen
 * @returns {Element}
 */
export const createResultatElement = () => {
  const element = document.createElement('div');

  element.innerHTML = String.raw`
    <h1 class="title"></h1>
    <div class="correct_answers"></div>
    <p class="skiped_answers"></p>
        <img class="gif__result" />
    <div class="result__content"></div>
    <button id="${WELCOME_BUTTON_ID}">Start the Quiz again</button>
  `;
  return element;
};