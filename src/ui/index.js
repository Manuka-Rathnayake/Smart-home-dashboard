const socket = io();

let buttonState1 = false;
let buttonState2 = false;
let buttonState3 = false;
let buttonState4 = false;

const bulbElement = document.getElementById('bulb1');
bulbElement.addEventListener('change', function(event) {
  buttonState1 = event.target.checked;
  socket.emit('buttonState1', buttonState1);
  updateUI();
});

const fanElement = document.getElementById('ceilingfan');
fanElement.addEventListener('change', function(event) {
  buttonState2 = event.target.checked;
  socket.emit('buttonState2', buttonState2);
  updateUI();
});

const lampElement = document.getElementById('lamp');
lampElement.addEventListener('change', function(event) {
  buttonState3 = event.target.checked;
  socket.emit('buttonState3', buttonState3);
  updateUI();
});

const curtainElement = document.getElementById('curtain');
curtainElement.addEventListener('change', function(event) {
  buttonState4 = event.target.checked;
  socket.emit('buttonState4', buttonState4);
  updateUI();
});

const updateUI = () => {
  bulbElement.checked = buttonState1;
  bulbElement.classList.toggle('slider-pressed', buttonState1);
  fanElement.checked = buttonState2;
  fanElement.classList.toggle('slider-pressed', buttonState2);
  lampElement.checked = buttonState3;
  lampElement.classList.toggle('slider-pressed', buttonState3);
  curtainElement.checked = buttonState4;
  curtainElement.classList.toggle('slider-pressed', buttonState4);
}

socket.on('buttonState1', state => {
  console.log('Updated state:', state);
  buttonState1 = state;
  updateUI();
});

socket.on('buttonState2', state => {
  console.log('Updated state:', state);
  buttonState2 = state;
  updateUI();
});

socket.on('buttonState3', state => {
  console.log('Updated state:', state);
  buttonState3 = state;
  updateUI();
});

socket.on('buttonState4', state => {
  console.log('Updated state:', state);
  buttonState4 = state;
  updateUI();
});