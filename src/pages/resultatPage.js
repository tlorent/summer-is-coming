import {
  USER_INTERFACE_ID,
  WELCOME_BUTTON_ID,
} from '../constants.js';
import { initWelcomePage } from './welcomePage.js';
import { createResultatElement } from '../views/resultatView.js';
import { quizData } from '../data.js';
import { clearHint } from '../helper.js';
import {resultsArray} from './questionPage.js';
import {createAnswerElement} from '../views/answerView.js'
 
export const initResultatPage = (userName, correctAnswerTotal, skipTotal) => {
  clearHint();
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  const resultatElement = createResultatElement();
  userInterface.appendChild(resultatElement);

  const title = document.querySelector('.title');
  title.textContent = `${userName}, you did this!`;

  const correctAnswers = resultatElement.querySelector('.correct_answers');
  correctAnswers.textContent = `correct : ${localStorage.getItem(
    'correctAnswerTotal'
  )}`;
  // to get correctAnswerTotal  you can get it from local storage here "localStorage.getItem("correctAnswerTotal")"

  const skipedAnswers = resultatElement.querySelector('.skiped_answers');
  skipedAnswers.textContent = 'skiped :' + skipTotal;

  const result = resultatElement.querySelector('.result__content');

  if (correctAnswerTotal <= 3) {result.textContent = `"You know nothing, Jon Snow!" Your knowledge of Westeros is as thin as the Night’s Watch rations. Time to rewatch the series or revisit the books!`}
  else if (correctAnswerTotal > 3 && correctAnswerTotal <= 5) {result.textContent = `"A lion does not concern himself with the opinion of sheep." You have a decent grasp of the realm, but you’re not quite ready to claim the Iron Throne. Keep sharpening your knowledge, and soon, you’ll rule like a true Westerosi lord!`}
  else {result.textContent = `"When you play the game of thrones, you win or you die." Congratulations! Your knowledge rivals that of Varys and Tyrion combined. You would survive the intrigues of King’s Landing and maybe even claim the throne yourself!`};
  
const showResults = document.querySelector('.show_results');

resultsArray.forEach((element) => {

  if (quizData.questions[element.step]) {
    if (element.correct === element.selected) {
    const text = quizData.questions[element.step].answers[element.correct];
    const textQuestion = quizData.questions[element.step].text;

    const textQuestionElement = document.createElement('div');
    textQuestionElement.classList.add('question-text')
    textQuestionElement.textContent = textQuestion;
    showResults.appendChild(textQuestionElement);

    const answerElement = document.createElement('div')
    answerElement.classList.add('correct-answer-text');
    answerElement.textContent = text;
    showResults.appendChild(answerElement);
  } else {
    const textQuestion = quizData.questions[element.step].text;
    const textQuestionElement = document.createElement('div');
    textQuestionElement.classList.add('question-text')
    textQuestionElement.textContent = textQuestion;
    showResults.appendChild(textQuestionElement);
    const textSelected = quizData.questions[element.step].answers[element.selected];

    const answerElementSelected = document.createElement('div');
    answerElementSelected.classList.add('wrong-answer-text');
    answerElementSelected.textContent = textSelected;
    showResults.appendChild(answerElementSelected);

    const textCorrect = quizData.questions[element.step].answers[element.correct];
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
  localStorage.setItem('correctAnswerTotal', 0);
  localStorage.setItem('currentQuestion', 0);
  quizData.questions.forEach((question) => (question.selected = null));
  initWelcomePage();
};
