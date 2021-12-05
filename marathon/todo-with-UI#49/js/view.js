import {
  list,
  addTask,
  deleteTask,
  changeTask,
} from "./main.js";

const UI_ELEMENTS = {
    forms: document.querySelectorAll(".form-input"),
    task_containers: document.querySelectorAll(".task_container"),
}

UI_ELEMENTS.forms.forEach(function (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    
    let task_name = event.target.firstElementChild.value.trim();
    if(task_name){
        let task_status = "To Do";
        let task_priority = event.target.parentElement.id;

    let task_Element = addTask(task_name, task_status, task_priority);

    form.reset();

    if (task_priority == "high") {
      createBlockTask(task_Element.id, task_Element.name, UI_ELEMENTS.task_containers[0]);
    }

    if (task_priority == "low") {
      createBlockTask(task_Element.id, task_Element.name, UI_ELEMENTS.task_containers[1]);
    }

}
  }); 
});

function createBlockTask(id_task, task_name, task_container) {
  let shellTask = document.createElement("div");
  shellTask.classList.add("task");

  let task_text = document.createElement("span");
  task_text.classList.add("task_text");
  task_text.textContent = task_name;
  task_text.setAttribute("id", id_task);


  let checkboxForTask = document.createElement("input");
  checkboxForTask.classList.add("checkbox");
  checkboxForTask.setAttribute("type", "checkbox");
  checkboxForTask.addEventListener("click", function (event) {
    changeStatusElement(event);
  });

  let buttonDeleteTask = document.createElement("input");
  buttonDeleteTask.classList.add("button_x");
  buttonDeleteTask.setAttribute("type", "button");
  buttonDeleteTask.setAttribute("value", "");
  buttonDeleteTask.addEventListener("click", function (event) {
    deleteTaskElement(event);
  });

  shellTask.prepend(task_text, checkboxForTask, buttonDeleteTask);

  task_container.append(shellTask);
}

function deleteTaskElement(event) {
  let id_task = +event.target.previousElementSibling.previousElementSibling.id;

  deleteTask(id_task);
  event.target.parentElement.remove();
  
}

function changeStatusElement(event) {
  let id_task = +event.target.previousElementSibling.id;
  let task_status;
  let container_task = event.target.parentElement.parentElement;
  let taskElement = event.target.parentElement;

  if (event.target.checked) {
    event.target.previousElementSibling.style.background = "#F4F4F4";
    task_status = "Done";
    container_task.append(taskElement)
  } else {
    event.target.previousElementSibling.style.background = "";
    task_status = "To Do";
    container_task.prepend(taskElement)
  }

  changeTask(id_task, task_status);
}
