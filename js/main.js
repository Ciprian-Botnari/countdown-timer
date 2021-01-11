// Getting the ids for hours, minutes, seconds fields 
// and for startBtn
const hoursEl   = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const startBtn  = document.getElementById('startBtn');
const resetBtn  = document.getElementById('resetBtn');
const arr       = [hoursEl, minutesEl, secondsEl];
let   handler, handler2;

// Adding for each element of timer functions
for (const elem of arr) 
{
  elem.addEventListener('paste',     preventDefault);
  elem.addEventListener('dragstart', preventDefault);
  elem.addEventListener('select',    clearInput);
  elem.addEventListener('keydown',   sanitizeInput);
  elem.addEventListener('keyup',     checkRegex);
}

// Adding the functions to buttons
startBtn.addEventListener('click', runTimer);
resetBtn.addEventListener('click', resetTimer);

function runTimer() 
{
  if (areInputsEmpty()) { return false; }

  // startBtn.value = 'Pause';

  let start = Date.now(),
      diff, minutes, seconds;

  let inputHours   = hoursEl.value;
  let inputMinutes = minutesEl.value;
  let inputSeconds = secondsEl.value;
  let duration     = (inputHours * 3600) + (inputMinutes * 60) + (+inputSeconds); // in seconds

  function timer() 
  {
    // get the number of seconds that have elapsed since 
    // startTimer() was called
    diff = duration - (((Date.now() - start) / 1000) | 0);

    // does the same job as parseInt truncates the float
    hours   = (diff / 3600)    | 0; // 60 * 60
    minutes = (diff / 60 % 60) | 0; // need rest
    seconds = (diff % 60)      | 0; // mod operator

    hours   = (hours < 10)   ? '0' + hours   : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    hoursEl.value   = hours;
    minutesEl.value = minutes;
    secondsEl.value = seconds;

    if(diff <= 0) 
    {
      // add one second so that the count down starts at the full duration
      // example 05:00 not 04:59
      start = Date.now() + 1000;
    }
  }

  // we don't want to wait a full second before the timer starts
  timer();
  handler  = setInterval(timer, 1000);
  handler2 = setInterval(expireTimer, 1000);
}

// Stop the timer 
function stopTimer()
{
  clearInterval(handler);
}

// When timer expires
function expireTimer() 
{
  if(didTimerExpire()) 
  {
    setTimeout(() => {
      stopTimer();
      clearAllInputs();
      clearInterval(handler2);
    }, 1000);
  }
}

// Reset the timer
function resetTimer()
{
  if (areInputsEmpty()) { return false; }
  stopTimer();
  clearAllInputs();
}

// Removes unwanted characters
function sanitizeInput(e) 
{
  const invalidChars = ['-', 'e', '+', 'E', '.'];
  if (invalidChars.includes(e.key)) 
  {
    e.preventDefault();
  }

  let inputNum = e.target.value;
  if (e.target.id === 'hours') 
  {
    limitOfChars(e, inputNum, 3);
    return;
  }

  let numbers = ['6', '7', '8', '9'];
  if (inputNum.length === 0) 
  {
    if (numbers.includes(e.key)) 
    {
      e.target.value = '0' + inputNum;
    }
  }

  limitOfChars(e, inputNum, 2);
}

// Checks if input corresponds with regex
function checkRegex(e) 
{
  const regex = /^[0-5]?[0-9]$/g;
  const numInput = e.target.value;

  if (e.target.id === 'hours') 
  {
    return;
  }

  if (!regex.test(numInput)) 
  {
    clearInput(e);
  }
}

// How many characters in an input field
// NOTE: for keydown event use (number - 1)
function limitOfChars(event, elem, number) 
{
  if (event.type === 'keydown' || event.type === 'keypress') 
  {
    number -= 1;
  }
  if (elem.length > number) 
  {
    if (event.keyCode === 8 || event.keyCode === 46 || // backspace and delete
       event.keyCode === 37 || event.keyCode === 39) // arrow keys (left and right)
    {
      return;
    }
    event.preventDefault();
  }
}

// Check if it's ready to start
function areInputsEmpty() 
{
  if (hoursEl.value === '' && minutesEl.value === '' && secondsEl.value === '') 
  {
    return true;
  }

  return false;
}

// Check if timer has finished
function didTimerExpire() {
  if (hoursEl.value == '00' && minutes.value == '00' && secondsEl.value == '00') 
  {
    return true;
  }

  return false;
}

// Clear input (with event)
function clearInput(e) 
{
  e.target.value = '';
}

// Clear all inputs
function clearAllInputs() 
{
  hoursEl.value   = '';
  minutesEl.value = '';
  secondsEl.value = '';
}

// Prevent user from pasting 
function preventDefault(e) 
{
  e.preventDefault();
}