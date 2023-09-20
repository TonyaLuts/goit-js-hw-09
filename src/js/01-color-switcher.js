const btnStartEl = document.querySelector('[data-start]');
const btnStopEl = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

let timerInterval = null;

btnStartEl.addEventListener('click', onClickStart);
btnStopEl.addEventListener('click', onClickStop);

function onClickStart() {
  // if (btnStartEl.disabled === false) {
  // }
  timerInterval = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
    console.log(timerInterval);
    btnStartEl.disabled = true;
  }, 1000);
}

function onClickStop() {
  clearInterval(timerInterval);
  btnStartEl.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
