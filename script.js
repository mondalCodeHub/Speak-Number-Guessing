const msg = document.getElementById('msg');
const randomNumber = getRandomNumber();
console.log(randomNumber);


// window.SpeechRecognition =
//   window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
console.log(new SpeechRecognition);
const recognition = new SpeechRecognition();

// start-recognition
recognition.start();

// on speak function[onSpeak()] to get the 'result.transcript' and update the DOM 
function onSpeak(e) {
    console.log(e);
    const message = e.results[0][0].transcript;
    console.log(message);
    userMSGOnPage(message)
    checkNumber(message)
}

function userMSGOnPage(message) {
    msg.innerHTML = `
    <div> You Said : </div>
        <span class="box">${message}</span>
    `
}

// check-number [checkNumber()]
function checkNumber(message) {
    const number = +message;
    // check number is valid or not in case number is not valid or out of range update DOM (or use alert()-you can uncomment if needed)
    if (Number.isNaN(number)) {
        // alert('not a valid number')
        msg.innerHTML += '<div>This is not a valid number . Say valid number </div>';
        return;
    }

    // check-range
    if (number > 100 || number < 1) {
        msg.innerHTML += '<div>Number must be between 1 to 100</div>';
        return;
    }

    // check-number
    if (number === randomNumber) {
        document.body.innerHTML = `
        <h2> Congrats! You have guessed the right number <br><br>
         It was ${number} </h2>
         <button class="playAgain"  id="playAgain" >Play Again </button>
        `;
    } else if (number > randomNumber) {
        msg.innerHTML += '<div> GO LOWER </div>'
    } else {
        msg.innerHTML += '<div> GO HIGHER </div>'
    }

}


// get-random number
function getRandomNumber() {
    return Math.floor(Math.random() * 100);
}

// speak-result
recognition.addEventListener('result', onSpeak);
// end of 'SpeechRecognition'-service and loop the game until user wins
recognition.addEventListener('end', () => {
    recognition.start();
})

// playAgain-button-functionality
document.body.addEventListener('click', (e) => {
    if (e.target.id == 'playAgain') {
        window.location.reload();
    }
})

//* @mondalcodehub-NOV2022 *//