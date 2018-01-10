/* eslint no-new:0 */

/* Fakeing a loading time with 4 sec, listen to window 'load' for real loading time */
let fakedLoadingTime = setInterval(loadingPage, 4000)

function loadingPage () {
  var loadingScreen = document.getElementById('load_screen')
  document.body.removeChild(loadingScreen)
  clearInterval(fakedLoadingTime)
  loadApplication()
}

/* load applications and set eventlistener on sidebar icons */
function loadApplication () {
  const ChatApplication = require('./ChatApplication')
  const TodoApplication = require('./TodoApplication')
  const MemoryApplication = require('./MemoryApplication')
  const windowFunctionality = require('./windowFunctionality')

/* Start Clock */
  windowFunctionality.starttime()

/* Creating new windows */
  let chatButton = document.querySelector('#chatButton')
  chatButton.addEventListener('click', () => {
    new ChatApplication()
    windowFunctionality.Search()
    windowFunctionality.SearchForWindow()
  })

  let todolistButton = document.querySelector('#todoButton')
  todolistButton.addEventListener('click', () => {
    new TodoApplication()
    windowFunctionality.Search()
    windowFunctionality.SearchForWindow()
  })

  let memoryButton = document.querySelector('#memoryButton')
  memoryButton.addEventListener('click', () => {
    new MemoryApplication(4, 4)
    windowFunctionality.Search()
    windowFunctionality.SearchForWindow()
  })
}
