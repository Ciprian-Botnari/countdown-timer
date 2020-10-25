let submitBtn = document.getElementById( 'submitBtn' );
submitBtn.addEventListener( 'click', submitClick );

function submitClick(e) 
{
  e.preventDefault();

  let userInput = document.getElementById( 'userInput' ).value;
  console.log( userInput );
}

