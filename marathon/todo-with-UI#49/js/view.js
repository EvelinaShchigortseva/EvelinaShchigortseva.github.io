import {
  addTask,
  deleteTask,
  changeTask,
  changeNameTask, list,
} from "./main.js";

const UI_ELEMENTS = {
  forms: document.querySelectorAll(".form-input"),
  task_containers: document.querySelectorAll(".task_container"),
}

UI_ELEMENTS.forms.forEach(function (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const task_name = event.target.firstElementChild.value.trim();
    try{

      if(!task_name){
        throw new SyntaxError("Данные некорректны");
      }

      const task_status = "To Do";
      const task_priority = event.target.parentElement.id;

      const task_Element = addTask(task_name, task_status, task_priority);

      form.reset();

      if (task_priority === "high") {
        createBlockTask(task_Element.id, task_Element.name, UI_ELEMENTS.task_containers[0]);
      }

      if (task_priority === "low") {
        createBlockTask(task_Element.id, task_Element.name, UI_ELEMENTS.task_containers[1]);
      }
      console.log(list)
    }
    catch(e){
      alert("Недопустимо введение пустых полей")
    }
  });
});

function createBlockTask(id_task, task_name, task_container) {
  const shellTask = document.createElement("div");
  shellTask.classList.add("task");

  const task = document.createElement("input");
  task.classList.add("task_text");
  task.value = task_name;
  task.setAttribute("id", id_task);
  task.setAttribute('readonly', 'readonly')
  task.addEventListener('dblclick', function (event){
    changeNameTaskElement(event)
  })

  const checkboxForTask = document.createElement("input");
  checkboxForTask.classList.add("checkbox");
  checkboxForTask.setAttribute("type", "checkbox");
  checkboxForTask.addEventListener("click", function (event) {
    changeStatusElement(event);
  });

  const buttonDeleteTask = document.createElement("input");
  buttonDeleteTask.classList.add("button_x");
  buttonDeleteTask.setAttribute("type", "button");
  buttonDeleteTask.setAttribute("value", "");
  buttonDeleteTask.addEventListener("click", function (event) {
    deleteTaskElement(event);
  });

  shellTask.prepend(task, checkboxForTask, buttonDeleteTask);

  task_container.append(shellTask);
}

function deleteTaskElement(event) {
  const task = event.target.previousElementSibling.previousElementSibling;

  deleteTask(task.id);
  event.target.parentElement.remove();

}

function changeStatusElement(event) {
  const task = event.target.previousElementSibling
  const task_container = event.target.parentElement.parentElement;
  const taskElement = event.target.parentElement;

  let task_status;


  if (event.target.checked) {
    task.style.background = "#F4F4F4";
    task_status = "Done";
    task_container.append(taskElement)
  } else {
    task.style.background = "";
    task_status = "To Do";
    task_container.prepend(taskElement)
  }

  changeTask(task.id, task_status);
}

function changeNameTaskElement(event){

    let task = event.target
    task.style.background = "#93A8F0"
    task.removeAttribute('readonly','readonly');
    task.setAttribute('type', 'text')
    task.addEventListener('keydown', function (event){

      let newName =""
      if(event.key == "Enter") {
        newName += task.value
        task.setAttribute('readonly', 'readonly')
        task.style.background = ""
      }
      changeNameTask(task.id, newName)
    })
}