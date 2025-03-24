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

  const element = document.createElement('div');
  element.classList.add("main__block")

  // I use String.raw just to get fancy colors for the HTML in VS Code.
  element.innerHTML = String.raw`
  <div class="question-text">
    <h1>${question.text}</h1>
  </div>
  <div class="question-bottom">
    <div class="answers-column">
      <ul id="${ANSWERS_LIST_ID}"></ul>
    </div>
    <div class="image-column">
      <img src="${question.backgroundImage}" alt="question image" />
    </div>
  </div>
  <div class="question-buttons-row">
    <button id="${SKIP_QUESTION_BUTTON_ID}" tooltip="Skip question"><img src="./images/skip.png" width="35" height = "35"></button>
    <button id="${NEXT_QUESTION_BUTTON_ID}" tooltip="Next button"><img src="./images/next.png" width="35" height = "35"></button>
    <button id="${RESULTAT_BUTTON_ID}" tooltip="Result button"><img src="./images/mission.png" width="35" height = "30"></button>
  </div>
`;

  return element;
};
