import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    btnStart: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  input: document.querySelector('input'),  
   
}


let selectedTime;
let intervalId = null;
refs.btnStart.disabled = true;

let isActive = false;
const date = Date.now();

refs.btnStart.addEventListener('click', onTimerStartClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] <= options.defaultDate) {
            stopTimer();
            Notiflix.Notify.failure("Please choose a date in the future");
        } else {
          refs.btnStart.disabled = false;
          refs.input.disabled = true;
        return (selectedTime = selectedDates[0].getTime());
      }
       
  },
};

flatpickr("input#datetime-picker", options);

function onTimerStartClick() {
     if (isActive) {
        return;
    }
      isActive = true;
    intervalId = setInterval(() => {
   refs.btnStart.disabled = true;
      
        const currentTime = Date.now();
        const delta = selectedTime - currentTime;
        console.log(delta);
          if (delta <= 1000) {
            stopTimer()
        }
        const timeComponents = convertMs(delta);
        updateTime(timeComponents);
      
    }, 1000)
}

function stopTimer() {
    clearInterval(intervalId);
  refs.btnStart.disabled = false;
  refs.input.disabled = false;
}



function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function updateTime({ days, hours, minutes, seconds }) {
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.minutes.textContent = `${minutes}`;
    refs.seconds.textContent = `${seconds}`;
}


