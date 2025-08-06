const taskinput = document.getElementById("taskinput")
const addBtn = document.getElementById("addbtn");
const taskList = document.getElementById("task-list");

let todolist = JSON.parse(localStorage.getItem("todo")) || [];
console.log(todolist);

function attachtask(listItem,index){
    let clickTimer;
    listItem.addEventListener("click",()=>{
        clickTimer = setTimeout(()=>{
        let updatedTask = prompt("Edit Your Task: ",todolist[index]);
        if(updatedTask && updatedTask.trim() !== ""){
            todolist[index] = updatedTask.trim();
            localStorage.setItem("todo",JSON.stringify(todolist));
            location.reload();
        }
        },250);
        });
    listItem.addEventListener("dblclick",()=>{
        clearTimeout(clickTimer);
        let confirmDlt = confirm("Do you really want to delete this task?");
        if(confirmDlt){
        todolist.splice(index,1);
        localStorage.setItem("todo",JSON.stringify(todolist));
        location.reload();
    }
});
}

function onPageLoad (){
    todolist.forEach ((task,index) => {
        let listItem = document.createElement("li");
        listItem.innerText = task;
        attachtask(listItem,index);
        taskList.appendChild (listItem);
    });
}


addBtn.addEventListener("click", ()=>{
    let task = taskinput.value;
    if(task.trim() ===""){
        return;
    }
    let listItem = document.createElement("li");
    listItem.innerText = task;

    taskList.appendChild (listItem);
    todolist.push(task);
    taskinput.value = "";
    localStorage.setItem("todo", JSON.stringify(todolist));
    attachtask(listItem,todolist.length - 1);
});


//taskList.appendChild(listItem);

onPageLoad();