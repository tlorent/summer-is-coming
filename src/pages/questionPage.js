import {
  ANSWERS_LIST_ID,
  NEXT_QUESTION_BUTTON_ID,
  SKIP_QUESTION_BUTTON_ID,
  USER_INTERFACE_ID,
  RESULTAT_BUTTON_ID,
  QUIZ_TRACKER_SECTION,
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { initResultatPage } from '../pages/resultatPage.js';
import {
  checkAnswer,
  clearHint,
  getQuizDataLS,
  initiateAnswer,
  showHint,
  updateCurrentQuestionIndexLS,
  updateQuestion,
} from '../helper.js';
import { userAnswersPage } from './userAnswersPage.js';

export const initQuestionPage = () => {
  clearHint();
  const quizDataLS = getQuizDataLS();
  const userName = localStorage.getItem('userName');

  if (quizDataLS.currentQuestionIndex === quizDataLS.questions.length) {
    initResultatPage();
    return;
  }

  if (quizDataLS.currentQuestionIndex === quizDataLS.questions.length + 1) {
    userAnswersPage();
    return;
  }

  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  const userNameElement = document.createElement('h2');
  userNameElement.classList.add('player__text');
  userNameElement.textContent = `Player: ${userName}`;
  userInterface.prepend(userNameElement);

  const currentQuestion = quizDataLS.questions[quizDataLS.currentQuestionIndex];

  const questionElement = createQuestionElement(currentQuestion);
  userInterface.appendChild(questionElement);

  const answersListElement = document.getElementById(ANSWERS_LIST_ID);
  const currentQuestionAnswersList = currentQuestion.answers;

  const answersListElements = Object.entries(currentQuestionAnswersList).map(
    (answer) => {
      const [key, answerText] = answer;
      const answerElement = createAnswerElement(key, answerText);
      answersListElement.appendChild(answerElement);
      return answerElement;
    }
  );
  answersListElements.forEach((answerElement) => {
    initiateAnswer(currentQuestion, answerElement);
    answerElement.addEventListener('click', () =>
      checkAnswer(answersListElements, answerElement)
    );
  });
  const quizTracker = document.getElementById(QUIZ_TRACKER_SECTION);
  quizTracker.classList.add('quiz-tracker-div');

  const { questions } = quizDataLS;

  questions.forEach((question, index) => {
    const questionCheck = document.createElement('div');
    questionCheck.classList.add('question-check-box');

    if (index === quizDataLS.currentQuestionIndex) {
      questionCheck.classList.add('active');
    }
    const { skipped, selected, correct } = question;

    if (selected === correct) {
      questionCheck.classList.add('correct-answered');
    }
    if (selected && selected !== correct) {
      questionCheck.classList.add('wrong-answered');
    }
    if (skipped) {
      questionCheck.classList.add('skipped');
      // when the user click the button it should display the question
      questionCheck.addEventListener('click', () => {
        quizDataLS.currentQuestionIndex = index;
        initQuestionPage();
      });
    }

    quizTracker.appendChild(questionCheck);
  });

  document.getElementById(RESULTAT_BUTTON_ID).addEventListener('click', () => {
    // If this is the last question, we immediately show the result
    if (quizDataLS.currentQuestionIndex === quizDataLS.questions.length - 1) {
      updateCurrentQuestionIndexLS();
      initResultatPage();
    } else {
      nextQuestion('next');
    }
  });

  document
    .getElementById(NEXT_QUESTION_BUTTON_ID)
    .addEventListener('click', () => nextQuestion('next'));

  document
    .getElementById(SKIP_QUESTION_BUTTON_ID)
    .addEventListener('click', () => {
      // If this is the last question, show the result
      if (quizDataLS.currentQuestionIndex === quizDataLS.questions.length) {
        initResultatPage();
      } else {
        nextQuestion('skip');
      }
    });

  const resultButton = document.getElementById(RESULTAT_BUTTON_ID);
  resultButton.style.display = 'none';
  if (quizDataLS.currentQuestionIndex === quizDataLS.questions.length - 1) {
    resultButton.style.display = 'inline';
    resultButton.addEventListener('click', () => {
      const resultButton = document.getElementById(RESULTAT_BUTTON_ID);
      resultButton.style.display = 'none';
      initResultatPage();
    });
  }
};

// Now nextQuestion function definition
const nextQuestion = (eventType) => {
  const quizDataLS = getQuizDataLS();
  const currentQuestion = quizDataLS.questions[quizDataLS.currentQuestionIndex];

  if (eventType === 'skip') {
    updateQuestion(quizDataLS.currentQuestionIndex, { skipped: true });
  }
  if (eventType === 'next' && !currentQuestion.selected) {
    const helperText = showHint(
      ['hint', 'helperText'],
      `You have to answer the question first or you can skip it if you want`
    );
    document.querySelector('body').appendChild(helperText);
    return;
  }
  const newCureentIndexLs = updateCurrentQuestionIndexLS();
  initQuestionPage();
  if (
    newCureentIndexLs.currentQuestionIndex >=
    quizDataLS.questions.length - 1
  ) {
    const nextQuestionButton = document.getElementById(NEXT_QUESTION_BUTTON_ID);
    nextQuestionButton.style.display = 'none';
  }
};
