let addMessage = document.querySelector('.message')
let addButton = document.querySelector('.add')
let todo = document.querySelector('.todo')
let todoList = []

if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'))
    displayMessages()
}

//обработчик нажатия на кнопку Добавить
addButton.addEventListener('click', function() {
    //добавить новый элемент в массив задач
    if (!addMessage.value) return
        //не вносить пустые задачи
        //можно добавить какой-то попап об этом
    let newTodo = {
        todo: addMessage.value,
        checked: false,
        important: false
    }
    todoList.push(newTodo)
        //очистить поле ввода для задачи
    addMessage.value = ''
    displayMessages()
    localStorage.setItem('todo', JSON.stringify(todoList))
})

//формирование списка в HTML на основе данных в массиве todoList
function displayMessages() {
    let displayMessage = ''
    if (todoList.length === 0) todo.innerHTML = ''
    todoList.forEach(function(item, i) {
        displayMessage += `
<li>
    <input type='checkbox' id='item_${i}' ${item.checked ? 'checked':''}>
    <label for='item_${i}' ${item.checked? "class='done'":''} ${item.important && !item.checked ? "class='important'":''}>${item.todo}</label>
</li>
`
        todo.innerHTML = displayMessage

    })

}

//обработчик клика по чекбоксу задачи
todo.addEventListener('change', function(event) {
    let idInput = event.target.getAttribute('id')
    let forLabel = todo.querySelector('[for=' + idInput + ']')
    let valueLabel = forLabel.innerHTML

    todoList.forEach(function(item) {
        if (item.todo === valueLabel) {
            item.checked = !item.checked
            localStorage.setItem('todo', JSON.stringify(todoList))
        }
    })
    displayMessages()
})

//обработчик клика правой кнопкой на задаче (контекстное меню)
todo.addEventListener('contextmenu', function(event) {
    event.preventDefault()
    todoList.forEach(function(item, i) {
        if ('item_' + i === event.target.htmlFor) {
            //проверяем нажатую клавишу Ctrl для удаленя правым кликом мыши
            if (event.ctrlKey || event.metaKey) {
                todoList.splice(i, 1)
            } else {
                item.important = !item.important
            }
            displayMessages()
            localStorage.setItem('todo', JSON.stringify(todoList))
        }
    })
})