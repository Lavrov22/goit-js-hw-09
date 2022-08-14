const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    body: document.querySelector('body',)
}


refs.startBtn.addEventListener('click', onStartClick);
refs.stopBtn.addEventListener('click', onStopClick);
refs.stopBtn.disabled = true;
let timerId = null;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


function onStartClick() {
    console.log('Кликнул старт')
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
    timerId = setInterval(() => {
        console.log('Отложенній старт')
        refs.body.style.backgroundColor = getRandomHexColor();
    }, 2000)
}

function onStopClick() {
    console.log('Кликнул Стоп');
    clearInterval(timerId);
    console.log(`Interval with id ${timerId} has stopped!`);
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
}
