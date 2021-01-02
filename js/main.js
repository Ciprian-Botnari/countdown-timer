// Getting the ids for hours, minutes, seconds fields 
// and for startBtn
const hoursEl     = document.getElementById( 'hours' );
const minutesEl   = document.getElementById( 'minutes' );
const secondsEl   = document.getElementById( 'seconds' );
const startBtn    = document.getElementById( 'startBtn' );
const arr         = [hoursEl, minutesEl, secondsEl];

// Adding for each element of timer functions
for (const elem of arr) 
{
  elem.addEventListener( 'paste',     preventDefault );
  elem.addEventListener( 'dragstart', preventDefault );
  elem.addEventListener( 'select',    clearInput     );
  elem.addEventListener( 'keydown',   sanitizeInput  );
  elem.addEventListener( 'keyup',     checkRegex     );
}

// Adding the run timer function when clicking on button
startBtn.addEventListener( 'click', runTimer );

function runTimer() 
{
  if(!isReady())
  {
    return false;
  }

  let t             = new Date();
  let countdownTime = new Date();
  
  (hours.value)   ? (countdownTime.setHours(t.getHours() + parseInt(hours.value))) : false;
  (minutes.value) ? (countdownTime.setMinutes(t.getMinutes() + parseInt(minutes.value))) : false;
  (seconds.value) ? (countdownTime.setSeconds(t.getSeconds() + parseInt(seconds.value))) : false;


  let countdown = setInterval(function() {
    let now 	   = new Date().getTime(); 
    let timeLeft = countdownTime - now;

    let h = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let m = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    let s = Math.floor((timeLeft % (1000 * 60))  / (1000));

    (h < 10) ? (h = '0' + h) : h;
    (m < 10) ? (m = '0' + m) : m;
    (s < 10) ? (s = '0' + s) : s;

    hours.value 	= h;
    minutes.value = m;
    seconds.value = s;

    if (timeLeft < 0) 
    {
      clearInterval(countdown);
      hours.value   = '';
      minutes.value = '';
      seconds.value = '';
    }
  }, 1000);
}

// Removes unwanted characters
function sanitizeInput(e)
{
  const invalidChars = ['-', 'e', '+', 'E', '.']; 
  if ( invalidChars.includes(e.key) )
  {
    e.preventDefault();
  }
  
  let inputNum = e.target.value;
  if(e.target.id === 'hours')
  {
    limitOfChars(e, inputNum, 3); 
    return;
  }

  let numbers = ['6', '7', '8', '9'];
  if(inputNum.length === 0)
  {
    if( numbers.includes(e.key) ) 
    {
      e.target.value = '0' + inputNum; 
    }
  }

  limitOfChars(e, inputNum, 2);
}

// Checks if input corresponds with regex
function checkRegex(e) {
  const regex = /^[0-5]?[0-9]$/g;  
  const numInput = e.target.value;

  if(e.target.id === 'hours') { return; }
  
  if(!regex.test(numInput))
  {
    clearInput(e);
  }
}

// How many characters in an input field
// NOTE: for keydown event use (number - 1)
function limitOfChars(event, elem, number)
{
  if (event.type === 'keydown' || event.type === 'keypress') { number -= 1; }
  if(elem.length > number)
  {
    if( event.keyCode === 8 || event.keyCode === 46 || // backspace and delete
        event.keyCode === 37 || event.keyCode === 39 ) // arrow keys (left and right)
    {
      return; 
    }
    event.preventDefault();
  }
}

// Check if it's ready to start
function isReady()
{
  if(hoursEl.value === '' && minutesEl.value === '' && secondsEl.value === '')
  {
    return false;
  }

  return true;
}

// Clear input
function clearInput(e)
{
  e.target.value = '';
}

// Prevent user from pasting 
function preventDefault(e)
{
  e.preventDefault();
}