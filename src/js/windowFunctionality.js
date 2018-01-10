module.exports = {
  starttime: startTime,
  Search: search,
  SearchForWindow: searchForWindow
}
/* Clock Application */
function startTime () {
  var today = new Date()
  var h = today.getHours()
  var m = today.getMinutes()
  m = checkTime(m)

  document.getElementById('clock').innerHTML =
        h + ':' + m
  setTimeout(startTime, 500)

  function checkTime (i) {
    if (i < 10) {
      i = '0' + i
    } // add zero in front of numbers < 10
    return i
  }
}

/* Search for exitButtons & Delete Window */
function search () {
  let exitButton = document.querySelectorAll('.exitButton')
  exitButton.forEach(element => {
    element.addEventListener('click', event => {
      deleteWindow(event.target)
    })
  })
    /* Delete Windows */
  function deleteWindow (selected) {
    if (selected.parentNode.parentNode.parentNode === null) {
      console.log('')
    } else {
      selected.parentNode.parentNode.parentNode.removeChild(selected.parentNode.parentNode)
    }
  }
}

/* Search for new windows & make it Move */
function searchForWindow () {
  let container = document.querySelectorAll('.theContainer')
  container.forEach(element => {
    move(element)
  })

    /* Making Windows Move */
  function move (cont) {
        // if the mouse targets any of these ID´s move wont fire
    cont.onmousedown = event => {
      if (event.target.id === 'exitButton' || event.target.id === 'settingicon' || event.target.id === 'sendButton' || event.target.id === 'imgs' || event.target.id === 'deleteButton' || event.target.id === 'completedButton' || event.target.id === 'submitButton' || event.target.id === 'playAgainButton') {
        return
      } else {
        let shiftX = event.clientX - cont.getBoundingClientRect().left
        let shiftY = event.clientY - cont.getBoundingClientRect().top

        cont.style.opacity = '0.5'
        cont.style.boxShadow = '10px 20px 30px lightblue'
        cont.style.position = 'absolute'
        cont.style.zIndex = 1000
        document.body.append(cont)

        moveAt(event.pageX, event.pageY)

                // centers the cont at (pageX, pageY) coordinates
        function moveAt (pageX, pageY) {
          cont.style.left = pageX - shiftX + 'px'
          cont.style.top = pageY - shiftY + 'px'
        }

        function onMouseMove (event) {
          moveAt(event.pageX, event.pageY)
        }

                // (3) move the cont on mousemove
        document.addEventListener('mousemove', onMouseMove)

                // (4) drop the cont, remove unneeded handlers
        cont.onmouseup = () => {
          document.removeEventListener('mousemove', onMouseMove)
          cont.onmouseup = null
          cont.style.opacity = '1'
          cont.style.background = 'transparent'
          cont.style.boxShadow = ''
        }
      }
      cont.ondragstart = () => {
        return false
      }
    }
  }
}
