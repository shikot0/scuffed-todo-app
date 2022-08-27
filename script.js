const input = document.getElementById('input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const todoWrapper = document.getElementById('todo-wrapper');
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();
const currentDay = currentDate.getDay();
let list = JSON.parse(localStorage.getItem('todoList')) || [];

dateInput.setAttribute("min", `${currentYear}-01-01`);



function add() {
    const outputText = input.value;
    const date = dateInput.value;
    const dateOutput = new Date(date);
    const month = dateOutput.toLocaleString('default', {month: 'long'});
    const year = dateOutput.getFullYear();
    const day = dateOutput.getDate();
    
    const newItem = document.createElement('div');
    newItem.setAttribute('id', 'list-item');

    if(outputText !== "") {
        todoWrapper.appendChild(newItem);
        list.push({
            outputText,
            day,
            month,
            year
        });
        if(date !== "" && year !== currentYear && list.length == 1){
            newItem.innerText = `${list[0].outputText} is due by ${list[list.length - 0].month} ${list[list.length - 0].day} ${list[list.length - 0].year}`;
        }else if(date !== "" && list.length == 1) {
            newItem.innerText = `${list[0].outputText} is due by ${list[0].month} ${list[0].day}`;
        }else if(list.length == 1){
            newItem.innerText = `${list[0].outputText}`;
        }else if(date !== "" && year !== currentYear) {
            newItem.innerText = `${list[list.length - 1].outputText} is due by ${list[list.length - 1].month} ${list[list.length - 1].day} ${list[list.length - 1].year}`;
        }else if(date !== "") {
            newItem.innerText = `${list[list.length - 1].outputText} is due by ${list[list.length - 1].month} ${list[list.length - 1].day}`;
        }else {
            newItem.innerText = `${list[list.length - 1].outputText}`;
        }
        const removeBtn = document.createElement('button');
        removeBtn.setAttribute('id', 'removeBtn');
        removeBtn.innerText = "x";
        removeBtn.addEventListener('click', function(e){
            const target = e.target;
            list.forEach(function(listItem, index) {
                if(listItem.outputText == outputText && listItem.day == day) {
                    console.log(listItem.outputText)
                    console.log(index)
                    list.splice(index, 1);
                }
            })
            target.parentNode.remove();
            localStorage.setItem('todoList', JSON.stringify(list))
            console.log(list);
        })
        newItem.appendChild(removeBtn);
        localStorage.setItem('todoList', JSON.stringify(list))
        input.value = "";
        location.reload();
    }
    console.log(list);
}

addBtn.addEventListener('click', add);


const createElement = ({outputText, day, month, year}) => {
    const newItem = document.createElement('div');
    newItem.setAttribute('id', 'list-item');

    const removeBtn = document.createElement('button');
    removeBtn.setAttribute('id', 'removeBtn');
    removeBtn.innerText = "x";
    removeBtn.addEventListener('click', function(e){
        const target = e.target;
        target.parentNode.remove();
        list.forEach(function(listItem, index) {
            if(listItem.outputText == outputText && listItem.day == day) {
                console.log(listItem.outputText)
                console.log(index)
                list.splice(index, 1);
            }
        })
        localStorage.setItem('todoList', JSON.stringify(list))
        console.log(list);
    })
    
    if(day !== null && year !== currentYear) {
        newItem.innerText = `${outputText} is due by ${month} ${day} ${year}`;
    }else if(day !== null) {
        newItem.innerText = `${outputText} is due by ${month} ${day}`;
    }else {
        newItem.innerText = `${outputText}`;
    }
    newItem.appendChild(removeBtn);
    todoWrapper.appendChild(newItem);
}
window.addEventListener('load', () => {
    localStorage.getItem('list');
    list.forEach(createElement);
});