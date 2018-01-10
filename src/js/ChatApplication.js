let config = require('../config.json')

function ChatApplication () {
  // importing template and clone it
  let chatTemplate = document.querySelector('#chatTemplate')
  let clone = chatTemplate.content.cloneNode(true)
  let textInput = clone.querySelector('.textInput')
  this.node = document.querySelector('#chatContainer')
  this.theContainer = clone.querySelector('#theContainer')
  this.chatHeader = clone.querySelector('#chat-title')
  this.exitButton = clone.querySelector('#exitButton')
  this.textArea = clone.querySelector('#textArea')
  this.node.append(this.theContainer)

  this.connect(textInput)
}
/* Sends the textInput.value to this.sendMessage */
ChatApplication.prototype.writeMessage = function (textInput) {
  this.checkUserName()
  textInput.addEventListener('change', event => {
    this.sendMessage(textInput.value)
    textInput.value = ' '
  })
}

/* Conencts to socket, listen for the message and pass the message to the printMessage  */
ChatApplication.prototype.connect = function (textInput) {
  return new Promise(function (resolve, reject) {
    if (this.socket && this.socket.readyState === 1) {
      resolve(this.socket)
      return
    }
    this.socket = new window.WebSocket(config.adress)
    this.writeMessage(textInput)

    this.socket.addEventListener('open', function () {
      resolve(this.socket)
      console.log('ping - server is open')
    }.bind(this))

    this.socket.addEventListener('error', function (event) {
      reject(new Error('could not connect'))
    })

    this.socket.addEventListener('message', function (event) {
      let message = JSON.parse(event.data)
      if (message.type === 'message') {
        this.printMessage(message)
      }
    }.bind(this))
  }.bind(this))
}

/* Checks if there is a name saved in localStorage */
ChatApplication.prototype.checkUserName = function () {
  if (window.localStorage.getItem('username') === '' || window.localStorage.getItem('username') === null) {
    this.addUserName()
  } else {
    this.getUserName()
  }
}
/* Sets the Username to localaStorage */

ChatApplication.prototype.addUserName = function () {
  let h2 = document.createElement('h2')
  h2.setAttribute('class', 'h2')
  h2.textContent = 'Enter Username'

  let inputs = document.createElement('input')
  inputs.setAttribute('id', 'textInput')
  inputs.setAttribute('placeholder', 'write new name . . .')

  this.chatHeader.appendChild(h2)
  this.chatHeader.appendChild(inputs)

  inputs.addEventListener('keypress', event => {
    if (event.keyCode === 13) {
      window.localStorage.setItem('username', inputs.value)
      this.checkUserName()
      this.chatHeader.removeChild(inputs)
      this.chatHeader.removeChild(h2)
    }
  })
}

/* Write Welcome text and shows with name is signed in */

ChatApplication.prototype.getUserName = function () {
  this.userName = window.localStorage.getItem('username')
  let h1 = document.createElement('h1')
  h1.textContent = 'Welcome To ChatApplication'
  this.chatHeader.appendChild(h1)

  let h2 = document.createElement('h2')
  h2.textContent = 'you signed in as ' + this.userName
  this.chatHeader.appendChild(h2)

  let setting = document.createElement('figure')
  setting.setAttribute('class', 'settingicon')
  setting.setAttribute('id', 'settingicon')
  this.chatHeader.appendChild(setting)

  // Icon that calls the getUserName to be able to change userName
  setting.addEventListener('click', () => {
    this.addUserName()
    this.chatHeader.removeChild(h1)
    this.chatHeader.removeChild(h2)
    this.chatHeader.removeChild(setting)
  })
}

/* Configs a message and send a socket. */

ChatApplication.prototype.sendMessage = function (text) {
  let data = {
    type: 'message',
    data: text,
    username: this.userName,
    channel: '',
    key: config.key
  }
  this.connect().then(socket => {
    socket.send(JSON.stringify(data))
  })
}

/* Prints the masseges with data from the socket. */

ChatApplication.prototype.printMessage = function (message) {
  let text = document.createElement('p')
  text.setAttribute('class', 'chatText')
  text.textContent = message.data

  let username = document.createElement('h4')
  username.textContent = message.username + ' ' + 'says :'

  this.textArea.appendChild(username)
  this.textArea.appendChild(text)
  // makes scroll always on bottom
  this.textArea.scrollTop = this.textArea.scrollHeight
}

module.exports = ChatApplication
