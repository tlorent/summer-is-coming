import { quizData } from '../data.js';
/**
 * Create an Answer element
 * @returns {Element}
 */

export const createAnswerElement = (key, answerText) => {
  const element = document.createElement('li');
  element.classList.add('answer-item', 'button');
  element.setAttribute('data-key', key);
  element.innerHTML = String.raw`
    ${answerText};
  `;
  return element;
};
