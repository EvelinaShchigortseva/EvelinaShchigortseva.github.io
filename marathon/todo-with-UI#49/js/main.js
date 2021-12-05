let list = [];
const statuses = ["To Do", "In Progress", "Done"];
const priorities = ["low", "high"];
let id = 0;

function isTaskExist(id) {
  return list.some((item) => item.id == id);
}

function isStatusExist(status) {
  return statuses.includes(status);
}

function resultConsole(isExist, type) {
  if (!isExist) {
    switch (type) {
      case "id":
        console.log("Не существует такой задачи");
        break;
      case "status":
        console.log("Не существует такого статуса");
        break;
      case "prioryty":
        console.log("Не существует такого приоритета");
        break;
    }
  }
}

function addTask(taskName, status = "To Do", priority = "low") {
  const task = {
    id: ++id,
    name: taskName,
    status: status,
    priority: priority,
  };

  list.push(task);
  return task;
}

function changeTask(id, status, priority) {
  let isExistTask = isTaskExist(id);
  let isExistStatus = isStatusExist(status);

  if (isExistTask && isExistStatus) {
    let task = list.find((item) => item.id == id);
    task.status = status;
    if (priority) task.priority = priority;
  }
  resultConsole(isExistTask, "id");
  resultConsole(isExistStatus, "status");
}

function deleteTask(id) {
  let isExistTask = isTaskExist(id);

  if (isExistTask) {
    list = list.filter((item) => item.id != id);
  }

  resultConsole(isTaskExist);
}

function showList(sortBy) {
  let arraySort = [];

  if (sortBy == "status") {
    arraySort = statuses;
    keyObj = "status";
  }

  if (sortBy == "priority") {
    arraySort = priorities;
    keyObj = "priority";
  }

  for (let key of arraySort) {
    let count = 0;

    console.log(`${key}`);

    list.forEach(function (item) {
      if (item[keyObj] == `${key}`) {
        console.log(`-"${item.name}",`);
        count++;
      }
    });

    if (count == 0) {
      console.log("-");
    }
  }
}

export { list, statuses, priorities, id, addTask, deleteTask, changeTask };

// addTask("задача 1");
// addTask("задача 2");
// addTask("задача 3");
// changeTask("2", "Done", "high");
// deleteTask("2");
// deleteTask("1");
// addTask("задача 4");
// changeTask("5", "In Progress");
// showList("priority");
// showList("status");

// console.log(list);
