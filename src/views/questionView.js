import { ANSWERS_LIST_ID } from '../constants.js';
import {
  NEXT_QUESTION_BUTTON_ID,
  SKIP_QUESTION_BUTTON_ID,
} from '../constants.js';
import { RESULTAT_BUTTON_ID } from '../constants.js';

/**
 * Create a full question element
 * @returns {Element}
 */
export const createQuestionElement = (question) => {
  if (question.backgroundImage) {
    document.body.style.backgroundImage = `url(/${question.backgroundImage})`;
  } else {
    document.body.style.backgroundImage = 'none';
  }
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundPosition = 'center';
  const element = document.createElement('div');

  // I use String.raw just to get fancy colors for the HTML in VS Code.
  element.innerHTML = String.raw`
    <h1>${question.text}</h1>

    <ul id="${ANSWERS_LIST_ID}">
    </ul>
    <button id="${SKIP_QUESTION_BUTTON_ID}">
    Skip question
    </button>
    <button id="${NEXT_QUESTION_BUTTON_ID}">
      Next question
    </button>
    <button id="${RESULTAT_BUTTON_ID}">
    Resultat
    </button>
  `;

  return element;
};
