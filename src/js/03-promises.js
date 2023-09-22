import Notiflix from 'notiflix';

const form = document.querySelector('form');
const createBtn = document.querySelector('[type="submit"]');

form.addEventListener('submit', onSubmit);

createBtn.disabled = false;

function onSubmit(event) {
  event.preventDefault();

  const firstDelay = Number(form.elements.delay.value);
  const delayStep = Number(form.elements.step.value);
  const amount = Number(form.elements.amount.value);

  // console.log(firstDelay);
  // console.log(delayStep);
  // console.log(amount);

  for (let i = 0; i < amount; i += 1) {
    // console.log(i);
    const position = i + 1;
    const delay = firstDelay + delayStep * i;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.warning(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

function createPromise(position, delay) {
  createBtn.disabled = true;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
