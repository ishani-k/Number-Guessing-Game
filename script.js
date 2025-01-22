let randomNum = parseInt(Math.random() * 100 + 1);

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remAttempts = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultPara');

const p = document.createElement('p')

let prevGuess = []
let numGuess = 1

let playGame = true;

if(playGame)
{
    submit.addEventListener('click', function(e)
{
    e.preventDefault();
    const guess = parseInt(userInput.value);
    validateGuess(guess);
})
}

function validateGuess(guess)
{
    //checks if the guess is valid(!<1,!>100)
    if(isNaN(guess))
    {
        alert('Please enter a valid number.')
    }
    else if(guess < 1)
    {
        alert('Please enter a number greater than 0.')
    }
    else if(guess > 100)
    {
        alert('Please enter a number less than 100.')
    }
    else
    {
        prevGuess.push(guess);
        if(numGuess === 11)
        {
            displayGuess(guess)
            displayMsg(`Game Over ! The Random Number was ${randomNum}. Happy Playing !`)
            endGame()
        }
        else
        {
            prevGuess.push(guess);
            displayGuess(guess)
            checkGuess(guess)
        }
    }
}

function checkGuess(guess)
{
    //checks if the guess is correct
    if(guess === randomNum)
    {
        displayMsg(`Congratulations !! You guessed it right ! The number is ${randomNum}.`)
        endGame()
    }
    else if(guess < randomNum)
    {
        displayMsg('Number is tooooo low ! Try something higher.')
    }
    else if(guess > randomNum)
    {
        displayMsg('Number is tooooo high ! Try something lower.')
    }
}

function displayGuess(guess)
{
    //cleans values, array update, attempts reduce
    userInput.value = ''
    guessSlot.innerHTML += `${guess} `
    numGuess++;
    remAttempts.innerHTML = `${10 - numGuess}`
}

function displayMsg(message)
{
    //displays reqd msgs
    lowOrHi.innerHTML = `<h2>${message}</h2>`
}

function endGame()
{
    userInput.value = ''
    userInput.setAttribute('disabled', '')
    p.classList.add('button')
    p.innerHTML = `<h2 id="newGame">Start New Game</h2>`;
    startOver.appendChild(p);
    playGame = false;
    newGame();
}

function newGame()
{
    const newGame = document.querySelector('#newGame')
    newGame.addEventListener('click', function(e)
    {
        let randomNum = parseInt(Math.random() * 100 + 1);
        prevGuess = []
        numGuess = 1
        guessSlot.innerHTML = ''
        remAttempts.innerHTML = `${10 - numGuess}`;
        userInput.removeAttribute('disabled')
        startOver.removeChild(p)
        
        playGame = true;
    })
}