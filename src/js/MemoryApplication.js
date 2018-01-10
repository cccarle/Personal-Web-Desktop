/* eslint no-new:0 */
const windowFunctionality = require('./windowFunctionality')

function MemoryApplication (rows, cols) {
  let brickTemplate = document.querySelectorAll('#memoryContainer template')[2].content.firstElementChild
  let titelTemplate = document.querySelector('#titelTemplate')
  let clone = titelTemplate.content.cloneNode(true)
  let memoryContainer = clone.querySelector('#TheMemoryContainer')
  let header = clone.querySelector('#memory-title')
  let score = clone.querySelector('#results')
  let timer = clone.querySelector('#timer')
  let pairScore = clone.querySelector('#pairs')
  let gameBoard = clone.querySelector('#gameBoard')

  let tiles = []
  let turn1
  let turn2
  let lastTiel
  var pairs = 0
  var tries = 0

  titelTemplate.parentNode.appendChild(clone)
  memoryContainer.appendChild(clone)

  startMem()

  /* Place the images on the bricks and check if its clicked */
  function startMem () {
    // tiles = shuffeld array
    tiles = getPictureArray(rows, cols)

    tiles.forEach((tile, index) => {
      let a = document.importNode(brickTemplate, true)
      gameBoard.appendChild(a)

      a.addEventListener('click', event => {
        let img = event.target.nodeName === 'IMG' ? event.target : event.target.firstElementChild
        turnBrick(tile, index, img)
      })

      if ((index + 1) % cols === 0) {
        gameBoard.appendChild(document.createElement('br'))
      }
    })

    countDown()
  }
  /* Turning the bricks. Keeping count and representing pairs, tries and when the user wins */
  function turnBrick (tile, index, img) {
    if (turn2) {
      return
    }

    img.src = 'image/memorybricks/' + tile + '.png'

    if (!turn1) {
      turn1 = img
      lastTiel = tile
      // checks how many tries the user have
      score.textContent = ''
      let text = document.createTextNode('Attempts : ' + tries)
      score.appendChild(text)
    } else {
      if (img === turn1) {
        return
      }
      // adds 1 to tries
      tries += 1

      turn2 = img

      if (tile === lastTiel) {
        // adds to pairs and represent it
        pairs += 1

        pairScore.textContent = ''
        let text = document.createTextNode('Pairs ' + pairs)
        pairScore.appendChild(text)

        if (pairs === (cols * rows) / 2) {
          // Removing the title head texts
          header.childNodes[5].parentNode.removeChild(header.childNodes[5])
          header.childNodes[5].parentNode.removeChild(header.childNodes[6])
          header.childNodes[5].parentNode.removeChild(header.childNodes[7])
          // Removing the game-bricks and replace it with new elements
          let oldBricks = gameBoard
          let youWonTag = document.createElement('p')
          youWonTag.setAttribute('id', 'youWonTag')
          youWonTag.textContent = 'Congratulations you WON on ' + tries + ' tries'
          let replacenode = oldBricks.parentNode
          replacenode.replaceChild(youWonTag, oldBricks)
        }
        window.setTimeout(() => {
          turn1.parentNode.classList.add('removed')
          turn2.parentNode.classList.add('removed')

          turn1 = null
          turn2 = null
        }, 300)
      } else {
        window.setTimeout(() => {
          turn1.src = 'image/memorybricks/0.png'
          turn2.src = 'image/memorybricks/0.png'

          turn1 = null
          turn2 = null
        }, 500)
      }
    }
  }
  /* Shuffels the array */
  function getPictureArray (rows, cols) {
    let i
    let arr = []

    for (i = 1; i <= (rows * cols) / 2; i += 1) {
      arr.push(i)
      arr.push(i)
    }

    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))
      let temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
    }
    return arr
  }
  /* Set the countDown time and check if the time is 0, if 0 replace template with new playsOverTemplate */
  function countDown () {
    var sec = 20

    let a = setInterval(count, 1000)

    function count () {
      if (sec === 0) {
        clearInterval(a)

        // Removing the title head texts
        header.childNodes[5].parentNode.removeChild(header.childNodes[5])
        header.childNodes[5].parentNode.removeChild(header.childNodes[6])
        header.childNodes[5].parentNode.removeChild(header.childNodes[7])

        // referens to the gameBoard(bricks)
        let oldBricks = gameBoard

        // import the template & clone it
        let playsOverTemplate = document.querySelector('#playsOver')
        let cloneOfPlaysOver = playsOverTemplate.content.cloneNode(true)
        let endResult = cloneOfPlaysOver.querySelector('.endResult')
        let button = cloneOfPlaysOver.querySelector('#playAgainButton')
        let pTag = cloneOfPlaysOver.querySelector('.hej')
        pTag.textContent = 'Times up you got ' + pairs + ' pairs on ' + tries + ' tries'

        button.addEventListener('click', () => {
          new MemoryApplication(4, 4)
          windowFunctionality.Search()
          windowFunctionality.SearchForWindow()
          document.body.removeChild(memoryContainer)
        })

        // referens to the old node
        let replacenode = gameBoard.parentNode
        // do tha thing
        replacenode.replaceChild(endResult, oldBricks)
      } else {
        timer.textContent = ''
        let text = document.createTextNode('You have ' + sec + ' seconds left!')
        timer.appendChild(text)
        sec--
      }
    }
  }
}

module.exports = MemoryApplication
