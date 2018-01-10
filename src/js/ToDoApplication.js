function TodoApplication () {
  let todoTemplate = document.querySelector('#todoTemplate')
  let clone = todoTemplate.content.cloneNode(true)
  let container = document.querySelector('.ToDoContainer')
  let deletedPlaceholder = clone.querySelector('.deletedPlaceholder')
  let completedPlaceholder = clone.querySelector('.completedPlaceholder')
  this.todolistContainer = clone.querySelector('#toDoListContainer')
  this.todoDiv = clone.querySelector('.mainlistContainer')
  this.todoList = clone.querySelector('.list')
  this.inputs = clone.querySelector('.inputField')
  this.addTodoButton = clone.querySelector('#submitButton')
  this.completedList = []
  this.deletedList = []

  this.addTodo(deletedPlaceholder, completedPlaceholder)

  container.appendChild(this.todolistContainer)
}
/* Creates a todo-li-tag and appends it to the main todolist */
TodoApplication.prototype.addTodo = function (deletedPlaceholder, completedPlaceholder) {
  this.inputs.addEventListener('change', (e) => {
    let todoItem = document.createElement('li')

    // checks if input is empty
    if (this.inputs.value.length > 0) {
      this.addTodoButton.innerText = ' ADD TODO '
      todoItem.innerText = this.inputs.value
      this.todoList.appendChild(todoItem)
    } else {
      this.addTodoButton.innerText = 'enter text'
      console.log('no text, please enter text')
    }

    // adds a red and green button to the LI tag
    let completedButton = document.createElement('input')
    completedButton.setAttribute('class', 'completedButton')
    completedButton.setAttribute('id', 'completedButton')

    let deleteButton = document.createElement('input')
    deleteButton.setAttribute('type', 'button')
    deleteButton.setAttribute('class', 'deleteButton')
    deleteButton.setAttribute('id', 'deleteButton')

    todoItem.appendChild(deleteButton)
    todoItem.appendChild(completedButton)
    let deletedPlaceholde = deletedPlaceholder
    let completedPlaceholde = completedPlaceholder
    this.inputs.value = ''

    this.removedTodo(deleteButton, todoItem, deletedPlaceholde)
    this.completedTodo(completedButton, todoItem, completedPlaceholde)
  })
}
/* Adds the selected todoItem to new list with only completed todos & remove the selected from main todolist  */
TodoApplication.prototype.completedTodo = function (completedButton, todoItem, completedPlaceholde) {
  completedButton.addEventListener('click', () => {
    this.completedList.push(todoItem)
    let listItemValue
    this.completedList.forEach(b => {
      listItemValue = b
    })

    let LI = document.createElement('li')
    LI.setAttribute('class', 'texts')
    LI.textContent = listItemValue.textContent
    completedPlaceholde.appendChild(LI)
    this.deleteTodo(todoItem)
    this.completedCounter(this.completedList)
  })
}
/* Adds the selected todoItem to new list with only deleted todos & remove the selected from main todolist  */
TodoApplication.prototype.removedTodo = function (deleteButton, todoItem, deletedPlaceholde) {
  deleteButton.addEventListener('click', () => {
    this.deletedList.push(todoItem)
    let listItemValue
    this.deletedList.forEach(b => {
      listItemValue = b
    })

    let LI = document.createElement('li')
    LI.setAttribute('class', 'texts')
    LI.textContent = listItemValue.textContent
    deletedPlaceholde.appendChild(LI)
    this.deleteTodo(todoItem)
    this.removedCounter(this.deletedList)
  })
}
/* Delete the todoItem from the mainlist */
TodoApplication.prototype.deleteTodo = function (todoItem) {
  let div = todoItem
  while (div.firstChild) {
    div.removeChild(div.firstChild)
  }
}
/* Checks how many todoitems  ther is in deletedList */
TodoApplication.prototype.removedCounter = function (list) {
  let numberinlist = list.length
  this.todolistContainer.childNodes[3].firstElementChild.innerText = 'Deleted Todos' + ' ' + '\n' + '' + ' ( ' + numberinlist + ' )  '
}
/* Checks how many todoitems  ther is in completedList */
TodoApplication.prototype.completedCounter = function (list) {
  let numberinlist = list.length
  this.todolistContainer.childNodes[5].firstElementChild.innerText = 'Completed Todos' + ' ' + '\n' + '( ' + numberinlist + ' )  '
}

module.exports = TodoApplication
