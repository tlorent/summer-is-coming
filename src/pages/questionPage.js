import {
  ANSWERS_LIST_ID,
  NEXT_QUESTION_BUTTON_ID,
  SKIP_QUESTION_BUTTON_ID,
  USER_INTERFACE_ID,
  RESULTAT_BUTTON_ID,
} from '../constants.js'
import { createQuestionElement } from '../views/questionView.js'
import { createAnswerElement } from '../views/answerView.js'
import { quizData } from '../data.js'
import { initResultatPage } from '../pages/resultatPage.js'
import { clearHint, showHint, updateQuestion } from '../helper.js'

let correctAnswerTotal = 0
let skipTotal = 0

export const initQuestionPage = (userName) => {

  clearHint();

  const savedQuestionIndex = localStorage.getItem('currentQuestion');
  if (savedQuestionIndex) {
    quizData.currentQuestionIndex = JSON.parse(savedQuestionIndex);
  } else {
    quizData.currentQuestionIndex = 0;
  }


  if (quizData.currentQuestionIndex === 0) {
    correctAnswerTotal = 0
    skipTotal = 0
  }


  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';


  const el = document.createElement('h2')
  el.textContent = `Player: ${userName}`
  userInterface.prepend(el)

  const currentQuestion = quizData.questions[quizData.currentQuestionIndex]

  localStorage.setItem('currentQuestion', JSON.stringify(quizData.currentQuestionIndex));

  const questionElement = createQuestionElement(currentQuestion.text);
  userInterface.appendChild(questionElement);

  const answersListElement = document.getElementById(ANSWERS_LIST_ID);
  const currentQuestionAnswersList = currentQuestion.answers;

  const answersListElements = Object.entries(currentQuestionAnswersList).map((answer) => {
    const [key, answerText] = answer;
    const answerElement = createAnswerElement(key, answerText);
    answersListElement.appendChild(answerElement);
    return answerElement;
  });

  answersListElements.forEach((answerElement) => {
    const checkAnswer = () => {
      const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
      if (currentQuestion.selected) return;
      answersListElements.forEach((answerElement) => {
        answerElement.classList.remove('correct-answer', 'wrong-answer');
      });
      const { key: userChoice } = answerElement.dataset;

      const newCurrentQuestion = updateQuestion(quizData.currentQuestionIndex, {
        selected: userChoice,
      })

      if (newCurrentQuestion.selected !== currentQuestion.correct) {

        answerElement.classList.remove('button');
        answerElement.classList.add('wrong-answer');

        const hint = showHint(
          ['hint'],
          `Hint: ${newCurrentQuestion.links[0].text}`,
          newCurrentQuestion.links[0].href
        )
        document.querySelector('body').appendChild(hint)
      } else {

        answerElement.classList.remove('button');
        answerElement.classList.add('correct-answer');
        correctAnswerTotal++;
        localStorage.setItem("correctAnswerTotal", JSON.stringify(correctAnswerTotal));

      }
      answersListElements.forEach((el) => {
        const { key } = el.dataset
        if (key === newCurrentQuestion.correct) {
          el.classList.remove('button')
          el.classList.add('correct-answer')
        }
      })
    }

    answerElement.addEventListener('click', checkAnswer)
  })

  document
    .getElementById(NEXT_QUESTION_BUTTON_ID)
    .addEventListener('click', () => nextQuestion(userName, 'next'))

  document
    .getElementById(SKIP_QUESTION_BUTTON_ID)
    .addEventListener('click', () => {
      //added logic with condition for skipping question and going to result page after last question (nik)
      skipTotal++
      if (quizData.currentQuestionIndex === quizData.questions.length - 1) {
        initResultatPage(userName, correctAnswerTotal, skipTotal)
      } else {
        nextQuestion(userName, 'skip')
      }
    })

  const resultButton = document.getElementById(RESULTAT_BUTTON_ID)
  resultButton.style.display = 'none'
  if (quizData.currentQuestionIndex === quizData.questions.length - 1) {
    resultButton.style.display = 'inline'
    resultButton.addEventListener('click', () => {

      const resultButton = document.getElementById(RESULTAT_BUTTON_ID);
      resultButton.style.display = 'none';
      initResultatPage(userName, correctAnswerTotal, skipTotal);
    });

  }
}

// Now nextQuestion function definition
const nextQuestion = (userName, eventType) => {
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];

  if (eventType === 'next' && !currentQuestion.selected) {
    const helperText = showHint(
      ['hint', 'helperText'],
      `You have to answer the question first or you can skip it if you want`
    );
    document.querySelector('body').appendChild(helperText);
    return;
  }

  quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;
  localStorage.setItem('currentQuestion', JSON.stringify(quizData.currentQuestionIndex));
  initQuestionPage(userName);

  if (quizData.currentQuestionIndex === quizData.questions.length - 1) {
    const nextQuestionButton = document.getElementById(NEXT_QUESTION_BUTTON_ID);
    nextQuestionButton.style.display = 'none';
  }
  
};

