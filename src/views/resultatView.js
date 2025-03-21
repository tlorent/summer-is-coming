import { WELCOME_BUTTON_ID } from "../constants.js";

/**
 * Create the resultat screen
 * @returns {Element}
 */
export const createResultatElement = () => {
  const element = document.createElement('div');
  element.innerHTML = String.raw`
    <h1>Resultat</h1>
    <button id="${WELCOME_BUTTON_ID}">to the home page</button>
  `;
  return element;
};
