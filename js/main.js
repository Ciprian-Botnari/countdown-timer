// Getting the ids for hours, minutes, seconds fields 
// and for startBtn
const hours     = document.getElementById( 'hours' );
const minutes   = document.getElementById( 'minutes' );
const seconds   = document.getElementById( 'seconds' );
const startBtn  = document.getElementById( 'startBtn' );
const timer     = [hours, minutes, seconds];

// Adding the run timer function when clicking on button
// startBtn.addEventListener( 'click', runTimer );

// Adding for each element of timer 
// a sanitize function
for (const elem of timer) 
{
  elem.addEventListener( 'keydown', sanitizeInput);
  elem.addEventListener( 'keydown', checkRegex);
}

// Removes unwanted characters
function sanitizeInput(e)
{
  const invalidChars = ['-', 'e', '+', 'E', '.']; 
  if ( invalidChars.includes(e.key) )
  {
    e.preventDefault();
  }
}

// Checks if input corresponds with regex
function checkRegex(e) {
  const regex     = /^[0-5]?[0-9]$/g;  
  
  let num1 = e.key;
  {
    let num = num1 + e.key;
    
    console.log( e.key );
    console.log( num );
  }
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
