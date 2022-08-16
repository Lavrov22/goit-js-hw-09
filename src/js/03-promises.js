import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
}

refs.form.addEventListener('submit', onBtnClick);

function onBtnClick(e) {
  e.preventDefault();
  // const formElements = e.currentTarget.elements;
  // const delay = Number(formElements.delay.value);
  // const step = Number(formElements.step.value);
  // const amount = Number(formElements.amount.value);
  // const formData = {
  //   delay,
  //   step,
  //   amount,
  // }
  const formElements = e.currentTarget;
  const formData = new FormData(formElements);
  const finalData = {};
  for (const [key, value] of formData.entries()) {
    finalData[key] = Number(value);
  }
  for (let i = 1; i <= finalData.amount; i += 1) {
    createPromise(i, finalData.delay)
  .then(onSucsess)
  .catch(onError) 
    finalData.delay = finalData.delay + finalData.step
  }
}


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    
    setTimeout(() => {
      if (shouldResolve) {
        resolve ({position, delay})
      } else {
        reject ({position, delay})  
      }
    }, delay);
  
  })
}

function onSucsess({ position, delay }) {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onError({ position, delay }) {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}