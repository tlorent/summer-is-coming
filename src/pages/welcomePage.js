import { USER_INTERFACE_ID, START_QUIZ_BUTTON_ID } from '../constants.js'
import { quizData } from '../data.js'
import { createWelcomeElement } from '../views/welcomeView.js'
import { initQuestionPage } from './questionPage.js'

let userName = ''
export const initWelcomePage = () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID)
  userInterface.innerHTML = ''

  const welcomeElement = createWelcomeElement()
  userInterface.appendChild(welcomeElement)

  document
    .getElementById(START_QUIZ_BUTTON_ID)
    .addEventListener('click', startQuiz)

  document.querySelector('.input__name').addEventListener('change', (e) => {
    userName = e.target.value
  })
  // Background moving feature
  document.addEventListener('mousemove', (event) => {
    const { clientX, clientY } = event
    const { innerWidth, innerHeight } = window

    const staticArea = document.querySelector('#user-interface')
    const rect = staticArea.getBoundingClientRect()
    const isInsideStaticArea =
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom

    if (!isInsideStaticArea) {
      const xOffset = (clientX / innerWidth) * 100
      const yOffset = (clientY / innerHeight) * 100
      document.body.style.backgroundPosition = `${xOffset}% ${yOffset}%`
    } else {
      document.body.style.backgroundPosition = 'center center'
    }
  })
}

const startQuiz = () => {
  //https://github.com/tlorent/summer-is-coming/issues/34 fixed
  initQuestionPage(userName)
  quizData.questions.forEach((question) => (question.selected = null))
}
