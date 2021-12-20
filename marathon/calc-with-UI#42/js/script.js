const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operation');
const screen = document.querySelector(".input-text");
const submit = document.getElementById("submit");
const clear = document.getElementById("clear");
const back = document.getElementById('back');

const INITIAL_STATE = {
    a: "",
    b: "",
    operation: "",
    isOperatorSelected: false,
  };

const state = { ...INITIAL_STATE };
const OPERATIONS_MAP = { div, multi, sub, add };

function updateScreen(value){
    screen.textContent = '';
    screen.textContent = value
}

function resetState(initialState) {
    Object.entries(initialState).forEach(([key, value]) => {
      state[key] = value;
    });
  }

function add(a, b) {
    return a + b;
}
  
function div(a, b) {
    return a / b;}
  
function multi(a, b) {
    return a * b;}
  
function sub(a, b) {
    return a - b;
}

updateScreen("0");

clear.addEventListener("click", () => {
    resetState(INITIAL_STATE);
    updateScreen("0");
});

numbers.forEach((numberButton) => {
    numberButton.addEventListener("click", ({ target: { value } }) => {
      state.isOperatorSelected ? (state.b += value) : (state.a += value);
      updateScreen(state.isOperatorSelected ? state.b : state.a);
    });
});

operations.forEach((operationButton) => {
    operationButton.addEventListener("click", () => {
      const operation = operationButton.getAttribute("data-operation");
      state.isOperatorSelected = true;
      
      if (state.a !== "" && state.b !== "") {
          state.a = resultIperation()
          console.log(state.b, operation);
          state.b = ""
        }
        state.operation = operation;
    
      updateScreen("")
    });
  });
  

  function resultIperation(){
    let result;
    let { a, b, operation } = state;
    let operationFn = OPERATIONS_MAP[operation];
    return result = operationFn(Number(a), Number(b));
  }

  submit.addEventListener("click", () => {
    let result = resultIperation();
    updateScreen(result);
  });
  
  back.addEventListener("click", function(){

    if(state.a == screen.textContent){
        let newNumber = state.a.slice(0, state.a.length-1)
      state.a = newNumber
      updateScreen(state.a)
    }

    if(state.b == screen.textContent){
        let newNumber = state.b.slice(0, state.b.length-1)
      state.b = newNumber
      updateScreen(state.b)
    }
    
  })