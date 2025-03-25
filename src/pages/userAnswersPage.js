import { USER_INTERFACE_ID, WELCOME_BUTTON_ID } from '../constants.js';
import { initWelcomePage } from './welcomePage.js';
import { createResultElement } from '../views/userAnswersView.js';
import { quizData } from '../data.js';
import { clearHint } from '../helper.js';
import { resultsArray } from './questionPage.js';

export const userAnswersPage = (userName) => {
  clearHint();
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  const resultElement = createResultElement();
  userInterface.appendChild(resultElement);

  const title = document.querySelector('.title');
  title.textContent = `${userName}, how you can sheck your answers`;

  const showResults = document.querySelector('.show_results');

  resultsArray.forEach((element) => {
    if (quizData.questions[element.step]) {
      if (element.correct === element.selected) {
        const text = quizData.questions[element.step].answers[element.correct];
        const textQuestion = quizData.questions[element.step].text;

        const textQuestionElement = document.createElement('div');
        textQuestionElement.classList.add('question-text');
        textQuestionElement.textContent = textQuestion;
        showResults.appendChild(textQuestionElement);

        const answerElement = document.createElement('div');
        answerElement.classList.add('correct-answer-text');
        answerElement.textContent = text;
        showResults.appendChild(answerElement);
      } else {
        const textQuestion = quizData.questions[element.step].text;
        const textQuestionElement = document.createElement('div');
        textQuestionElement.classList.add('question-text');
        textQuestionElement.textContent = textQuestion;
        showResults.appendChild(textQuestionElement);
        const textSelected =
          quizData.questions[element.step].answers[element.selected];

        const answerElementSelected = document.createElement('div');
        answerElementSelected.classList.add('wrong-answer-text');
        answerElementSelected.textContent = textSelected;
        showResults.appendChild(answerElementSelected);

        const textCorrect =
          quizData.questions[element.step].answers[element.correct];
        const answerElementCorrect = document.createElement('div');
        answerElementCorrect.classList.add('correct-answer-text');
        answerElementCorrect.textContent = textCorrect;
        showResults.appendChild(answerElementCorrect);
      }
    }
  });

  document
    .getElementById(WELCOME_BUTTON_ID)
    .addEventListener('click', startQuiz);
};

const startQuiz = () => {
  quizData.currentQuestionIndex = 0;
  localStorage.clear();
  quizData.questions.forEach((question) => {
    question.selected = null;
    question.skipped = null;
  });

  initWelcomePage();
};
