import {
  ANSWERS_LIST_ID,
  NEXT_QUESTION_BUTTON_ID,
  QUIZ_TRACKER_SECTION,
  SKIP_QUESTION_BUTTON_ID,
  USER_INTERFACE_ID,
  RESULTAT_BUTTON_ID,
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { quizData } from '../data.js';
import { initResultatPage } from '../pages/resultatPage.js';
import { clearHint, showHint, updateQuestion } from '../helper.js';

let correctAnswerTotal = 0;
let skipTotal = 0;

export const initQuestionPage = (userName) => {
  // here insted to do a foreach to clear the hint i do a function that clear any hint every time the question page will be created
  clearHint();
  //temporary descision
  if (quizData.currentQuestionIndex === 0) {
    correctAnswerTotal = 0;
    skipTotal = 0;
  }
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  const el = document.createElement('h2');
  el.textContent = `Player: ${userName}`;
  userInterface.prepend(el);

  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];

  // if (document.contains)
  const questionElement = createQuestionElement(currentQuestion.text);

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
    const checkAnswer = () => {
      // here i get the currentQuestion again  because i need it here to updated it !
      const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
      // here i checked if the user select the answer i will return so the rest if the function will not executed !
      if (currentQuestion.selected) {
        return;
      }
      answersListElements.forEach((answerElement) => {
        answerElement.classList.remove('correct-answer', 'wrong-answer');
      });
      const { key: userChoice } = answerElement.dataset;
      //also here i do a helper function that can update any question depending on the question index
      const newCurrentQuestion = updateQuestion(quizData.currentQuestionIndex, {
        selected: userChoice,
      });

      if (newCurrentQuestion.selected !== currentQuestion.correct) {
        answerElement.classList.remove('button');
        answerElement.classList.add('wrong-answer');
        // also here i use Nikita code and put it in a function so i can use it also
        const hint = showHint(
          ['hint'],
          `Hint: ${newCurrentQuestion.links[0].text}`,
          newCurrentQuestion.links[0].href
        );
        document.querySelector('body').appendChild(hint);
      } else {
        answerElement.classList.remove('button');
        answerElement.classList.add('correct-answer');
        //I move  correctAnswerTotal++  here becaue if we keep it down it will count every answer is correct
        correctAnswerTotal++;
      }
      answersListElements.forEach((el) => {
        const { key } = el.dataset;
        if (key === newCurrentQuestion.correct) {
          el.classList.remove('button');
          el.classList.add('correct-answer');
        }
      });
    };

    answerElement.addEventListener('click', checkAnswer);
  });

  const quizTracker = document.getElementById(QUIZ_TRACKER_SECTION);
  quizTracker.classList.add('quiz-tracker-div');

  const { questions } = quizData;

  questions.forEach((question, index) => {
    const questionCheck = document.createElement('div');
    questionCheck.classList.add('question-check-box');
    if (index === quizData.currentQuestionIndex) {
      questionCheck.classList.add('active');
    }

    const { skipped, selected } = question;

    if (selected) {
      questionCheck.classList.add('answered');
    }

    if (skipped) {
      questionCheck.classList.add('skipped');
    }
    // when the user click the button it should display the question ,, i have a problem that i can not access the user name
    // questionCheck.addEventListener('click', () => {
    //   quizData.currentQuestionIndex = index;
    //   initQuestionPage();
    // });
    quizTracker.appendChild(questionCheck);
  });

  document
    .getElementById(NEXT_QUESTION_BUTTON_ID)
    .addEventListener('click', () => nextQuestion(userName, 'next'));

  document
    .getElementById(SKIP_QUESTION_BUTTON_ID)
    .addEventListener('click', () => {
      skipTotal++;
      nextQuestion(userName, 'skip');
    });

  const resultButton = document.getElementById(RESULTAT_BUTTON_ID);
  resultButton.style.display = 'none';
  if (quizData.currentQuestionIndex === quizData.questions.length - 1) {
    resultButton.style.display = 'inline';
    resultButton.addEventListener('click', () => {
      const resultButton = document.getElementById(RESULTAT_BUTTON_ID);
      resultButton.style.display = 'none';
      resultat(userName, correctAnswerTotal, skipTotal);
    });
  }
};

const nextQuestion = (userName, eventType) => {
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  if (eventType === 'skip') {
    updateQuestion(quizData.currentQuestionIndex, { skipped: true });
  }
  if (eventType === 'next' && !currentQuestion.selected) {
    const helperText = showHint(
      ['hint', 'helperText'],
      `You have to answer the questionfirst or you can skipped it if you want`
    );
    document.querySelector('body').appendChild(helperText);
    return;
  }
  quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;
  initQuestionPage(userName);
  if (quizData.currentQuestionIndex === 9) {
    const nextQuestionBytton = document.getElementById(NEXT_QUESTION_BUTTON_ID);
    nextQuestionBytton.style.display = 'none';
  }
};

const resultat = (userName, correctAnswerTotal, skipTotal) => {
  initResultatPage(userName, correctAnswerTotal, skipTotal);
};
