import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dateEl = document.querySelector('#datetime-picker');
const timerStart = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValye = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    if (selectedDates[0] <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    timerStart.disabled = false;
  },
};

flatpickr('#datetime-picker', options);

timerStart.addEventListener('click', onClickBtn);

timerStart.disabled = true;

function onClickBtn(event) {
  countdownTimer();
}

function countdownTimer() {
  const finishDate = new Date(dateEl.value).getTime();

  const timerID = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = finishDate - currentTime;
    const { days, hours, minutes, seconds } = convertMs(deltaTime);

    console.log({ days, hours, minutes, seconds });

    daysValue.textContent = addLeadingZero(days);
    hoursValye.textContent = addLeadingZero(hours);
    minutesValue.textContent = addLeadingZero(minutes);
    secondsValue.textContent = addLeadingZero(seconds);

    timerStart.disabled = true;

    if (deltaTime < 1000) {
      clearInterval(timerID);
      timerStart.disabled = false;
      return;
    }
  }, 1000);
  // },
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
