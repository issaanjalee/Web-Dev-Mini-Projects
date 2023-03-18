let input = document.getElementById('input');

function addInput(value) {
  input.value += value;
}

function clearInput() {
  input.value = '';
}

function deleteInput() {
  input.value = input.value.slice(0, -1);
}

function calculate() {
  try {
    input.value = eval(input.value);
  } catch (err) {
    input.value = 'Error';
  }
};