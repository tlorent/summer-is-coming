import { quizData } from '../data.js';
/**
 * Create an Answer element
 * @returns {Element}
 */
export const createAnswerElement = (key, answerText) => {
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  const element = document.createElement('li');
  element.classList.add('item__answer');
  const btnAnswer = document.createElement('button');
  btnAnswer.classList.add('btn__answer');
  btnAnswer.textContent = answerText;
  btnAnswer.addEventListener('click', () => {
    currentQuestion.selected = key;
    if (currentQuestion.selected === currentQuestion.correct) {
      btnAnswer.style.backgroundColor = 'green';
    } else {
      btnAnswer.style.backgroundColor = 'red';
      const hint = document.createElement('a');
      hint.classList.add('hint');
      hint.textContent = `Hint: ${currentQuestion.links[0].text}`;
      hint.href = currentQuestion.links[0].href;

      document.querySelector('body').appendChild(hint);
    }
  });
  element.prepend(btnAnswer);
  return element;
};
