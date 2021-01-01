// Getting the ids for hours, minutes, seconds fields 
// and for startBtn
const hoursEl     = document.getElementById( 'hours' );
const minutesEl   = document.getElementById( 'minutes' );
const secondsEl   = document.getElementById( 'seconds' );
const startBtn    = document.getElementById( 'startBtn' );
const timer       = [hoursEl, minutesEl, secondsEl];

// Adding the run timer function when clicking on button
// startBtn.addEventListener( 'click', runTimer );

// Adding for each element of timer 
// a sanitize function
for (const elem of timer) 
{
  elem.addEventListener( 'paste', preventPaste);
  elem.addEventListener( 'keydown', sanitizeInput);
  elem.addEventListener( 'keyup', checkRegex);
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


  if(inputNum.length === 0)
  {
    let numbers = ['6', '7', '8', '9'];
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

  let value = parseInt(e.target.value);
  let firstDig = value[0];

  // if(e.target.id === 'hours')
  // {
  //   if(value.length > 3) 
  //   {
  //     e.target.value = value.slice(0, 3);
  //   }
  //   return;
  // }


  
  // if(value === 0)
  // {
  //   e.target.value = '';
  // }

  // if(e.target.value.length === 2)
  // {
  //   if( e.keyCode === 8 || e.keyCode === 46 ) 
  //   {
  //     return; 
  //   }
  //   e.preventDefault();
  // }

  // if (value.length === 2 && firstDig === 0)
  // {
  //   e.target.value = '';
  // }

  // if(firstDig > 5) 
  // {
  //   e.target.value = '0' + value;
  // } 

  // if(value.length > 2)
  // {
  //   e.target.value = value.slice(0, 2);
  // }
}

function runTimer(e) 
{
  e.preventDefault();

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

// Prevent user from pasting 
function preventPaste(e)
{
  e.preventDefault();
}

// How many characters in an input field
// NOTE: for keydown event use (number - 1)
function limitOfChars(event, elem, number)
{
  let finalNumber = number;
  if (event.type === 'keydown' || event.type === 'keypress') { finalNumber = number - 1; }
  if(elem.length > finalNumber)
  {
    if( event.keyCode === 8 || event.keyCode === 46 ) 
    {
      return; 
    }
    event.preventDefault();
  }
}