const hours     = document.getElementById( 'hours' );
const minutes   = document.getElementById( 'minutes' );
const seconds   = document.getElementById( 'seconds' );
const timer     = [hours, minutes, seconds];

const startBtn = document.getElementById( 'startBtn' );

startBtn.addEventListener( 'click', runTimer );


for (const elem of timer) 
{
  elem.addEventListener( 'keydown', sanitizeInput);
  elem.addEventListener( 'keyup',   thinkLater);
}

// Original script
function sanitizeInput(e)
{
  const invalidChars = ['-', 'e', '+', 'E', '.']; 
  if ( invalidChars.includes(e.key) )
  {
    e.preventDefault();
  }
  
}

// This is for keyup event, although
// it has a delete animation which bothers me
function thinkLater() {
  const regex     = /^[0-5]?[0-9]$/g;

  if (Array.isArray(this.value.match(regex)))
  {
    this.value = this.value.match(regex).join();
  }
  else 
  {
    let arr = Array.from(this.value.toString());
    this.value = arr[0] + arr[1];
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
