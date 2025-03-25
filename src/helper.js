import { SKIP_QUESTION_BUTTON_ID } from './constants.js';
import { quizData } from './data.js';

// I add a new file that we can put the helper functions
export const getQuizDataLS = () => {
  const quizDataLS = localStorage.getItem('quizDataLS');
  if (quizDataLS) {
    return JSON.parse(quizDataLS);
  } else {
    localStorage.setItem('quizDataLS', JSON.stringify(quizData));
    return quizData;
  }
};

export const updateCurrentQuestionIndexLS = () => {
  const quizDataLS = getQuizDataLS();
  const { currentQuestionIndex, questions } = quizDataLS;
  if (currentQuestionIndex >= questions.length + 1) {
    const newQuizDataLS = { ...quizDataLS, currentQuestionIndex: 0 };
    localStorage.setItem('quizDataLS', JSON.stringify(newQuizDataLS));
    return newQuizDataLS;
  } else {
    const newQuizDataLS = {
      ...quizDataLS,
      currentQuestionIndex: quizDataLS.currentQuestionIndex + 1,
    };
    localStorage.setItem('quizDataLS', JSON.stringify(newQuizDataLS));
    return newQuizDataLS;
  }
};

export const updateQuestion = (questionIndex, updatedValue) => {
  const quizDataLS = getQuizDataLS();
  let { questions } = quizDataLS;
  const newQuestions = questions.map((question, index) => {
    if (index === questionIndex) {
      return { ...question, ...updatedValue };
    } else {
      return question;
    }
  });
  const newQuizDataLS = { ...quizDataLS, questions: newQuestions };
  localStorage.setItem('quizDataLS', JSON.stringify(newQuizDataLS));
  return newQuizDataLS;
};

export const clearHint = () => {
  const helperHint = document.querySelector('.hint');
  helperHint?.remove();
};

export const showHint = (classNameArr, text, url = null) => {
  clearHint();
  const helperText = document.createElement(`${url ? 'a' : 'div'}`);
  if (url) {
    helperText.setAttribute('target', '_blank');
    helperText.href = url;
  }
  helperText.classList.add(...classNameArr);
  helperText.textContent = text;
  return helperText;
};

export const skipTotalCount = () => {
  const { questions } = getQuizDataLS();
  return questions.reduce((count, question) => {
    if (question.skipped) {
      return count + 1;
    } else {
      return count;
    }
  }, 0);
};

export const correctQuestionsCount = () => {
  const { questions } = getQuizDataLS();
  return questions.reduce((count, question) => {
    if (question.selected === question.correct) {
      return count + 1;
    } else {
      return count;
    }
  }, 0);
};

export const initiateAnswer = (question, element) => {
  if (question.selected) {
    const nextQuestionButton = document.getElementById(SKIP_QUESTION_BUTTON_ID);
    nextQuestionButton.style.display = 'none';
    const { key } = element.dataset;
    if (key === question.correct) {
      element.classList.remove('button');
      element.classList.add('correct-answer');
    } else if (key === question.selected) {
      element.classList.remove('button');
      element.classList.add('wrong-answer');
    }
  }
};

export const checkAnswer = (answersListElements, element) => {
  const quizDataLS = getQuizDataLS();
  const currentQuestion = quizDataLS.questions[quizDataLS.currentQuestionIndex];

  if (currentQuestion.selected) {
    return;
  }

  const { key: userChoice } = element.dataset;
  const newQuizDataLS = updateQuestion(quizDataLS.currentQuestionIndex, {
    selected: userChoice,
  });

  const newCurrentQuestion =
    newQuizDataLS.questions[newQuizDataLS.currentQuestionIndex];

  if (newCurrentQuestion.selected !== currentQuestion.correct) {
    element.classList.remove('button');
    element.classList.add('wrong-answer');
    const hint = showHint(
      ['hint'],
      `Hint: ${newCurrentQuestion.links[0].text}`,
      newCurrentQuestion.links[0].href
    );
    document.querySelector('body').appendChild(hint);
  } else {
    element.classList.remove('button');
    element.classList.add('correct-answer');
  }
  answersListElements.forEach((el) => {
    const { key } = el.dataset;
    if (key === newCurrentQuestion.correct) {
      el.classList.remove('button');
      el.classList.add('correct-answer');
    }
  });
  const skipButton = document.getElementById(SKIP_QUESTION_BUTTON_ID);
  skipButton.style.display = 'none';
};
