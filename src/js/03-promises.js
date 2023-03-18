import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
};

function createPromise(position, delay) {
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
function onError({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}

function onSuccess({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onCreatePromises(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const amount = Number(formData.get('amount'));
  const delay = Number(formData.get('delay'));
  const step = Number(formData.get('step'));

  for (let i = 1; i <= amount; i += 1) {
    const promiseDelay = delay + (i - 1) * step;
    createPromise(i, promiseDelay).then(onSuccess).catch(onError);
  }
}

refs.form.addEventListener('submit', onCreatePromises);
