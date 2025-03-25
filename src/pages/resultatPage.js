import {
  USER_INTERFACE_ID,
  WELCOME_BUTTON_ID,
  ANSWERS_BUTTON_ID,
} from '../constants.js'
import { initWelcomePage } from './welcomePage.js'
import { createResultatElement } from '../views/resultatView.js'
import { quizData } from '../data.js'
import { clearHint } from '../helper.js'
import { resultsArray } from './questionPage.js'
import { userAnswersPage } from './userAnswersPage.js'
import { userName } from './welcomePage.js'

export const initResultatPage = (correctAnswerTotal) => {
  clearHint()
  const userInterface = document.getElementById(USER_INTERFACE_ID)
  userInterface.innerHTML = ''

  const resultatElement = createResultatElement()
  userInterface.appendChild(resultatElement)

  const userName = localStorage.getItem('userName') || 'Player'
  const title = document.querySelector('.title')
  title.textContent = `${userName}, you did this!`

  const gif = document.querySelector('.gif__result')

  const correctAnswers = resultatElement.querySelector('.correct_answers')

  correctAnswers.textContent = `correct : ${
    localStorage.getItem('correctAnswerTotal') || 0
  }`
  // to get correctAnswerTotal  you can get it from local storage here "localStorage.getItem("correctAnswerTotal")"

  const skipedAnswers = resultatElement.querySelector('.skiped_answers')
  skipedAnswers.textContent = `skipped : ${
    localStorage.getItem('skipTotal') || 0
  }`

  const result = resultatElement.querySelector('.result__content')

  if (correctAnswerTotal <= 3) {
    result.textContent = `"You know nothing, Jon Snow!" Your knowledge of Westeros is as thin as the Night’s Watch rations. Time to rewatch the series or revisit the books!`
    gif.src =
      'https://i.pinimg.com/originals/1d/81/1c/1d811c6f6a57c73154f52158bf21833d.gif'
  } else if (correctAnswerTotal > 3 && correctAnswerTotal <= 5) {
    result.textContent = `"A lion does not concern himself with the opinion of sheep." You have a decent grasp of the realm, but you’re not quite ready to claim the Iron Throne. Keep sharpening your knowledge, and soon, you’ll rule like a true Westerosi lord!`
    gif.src =
      'https://media1.popsugar-assets.com/files/thumbor/RAK72YKlTpQobAXRL4mAs2I1h9I=/fit-in/500x215/top/filters:format_auto():upscale()/2016/06/22/787/n/1922283/e469d8f3_edit_img_cover_file_40413653_1457067600_tyrion.gif'
  } else {
    result.textContent = `"When you play the game of thrones, you win or you die." Congratulations! Your knowledge rivals that of Varys and Tyrion combined. You would survive the intrigues of King’s Landing and maybe even claim the throne yourself!`
    gif.src =
      'https://img.allw.mn/content/hx/t0/sfhpm03o5599004a48155894374162_500x281.gif'
  }

  document
    .getElementById(WELCOME_BUTTON_ID)
    .addEventListener('click', startQuiz)

  document
    .getElementById(ANSWERS_BUTTON_ID)
    .addEventListener('click', answersPage)
}

const startQuiz = () => {
  quizData.currentQuestionIndex = 0
  localStorage.clear()
  quizData.questions.forEach((question) => (question.selected = null))
  initWelcomePage('playSoundAgain')
}

const answersPage = () => {
  userAnswersPage(userName)
}