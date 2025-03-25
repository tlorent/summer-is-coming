import { WELCOME_BUTTON_ID } from "../constants.js";

/**
 * Create the result screen
 * @returns {Element}
 */
export const createResultElement = () => {
  const element = document.createElement('div');

  element.innerHTML = String.raw`
    <h2 class="title"></h2>
    <div class="show_results">
    </div>
    <button id="${WELCOME_BUTTON_ID}">Start Quiz again</button>
  `;
  return element;
};