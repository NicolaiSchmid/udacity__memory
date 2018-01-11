/**
 * @license
 * Copyright (c) 2017 Nicolai Schmid. All rights reserved.
 * The name Nicolai Schmid may not
 * be used to endorse or promote products derived from
 * this software without specific prior written permission.
 */
const telemetry = new Telemetry();

let cards = document.querySelectorAll('.card');
let currentlyOpen = [];
let gameFinished = false;

// Reset and shuffle on boot
restartOnClick();

// Add event listeners
document.querySelector('.restart').addEventListener('click', restartOnClick);
document.querySelector('.modal-restart').addEventListener('click', restartOnClick);


cards.forEach(card => {
    card.addEventListener('click', cardOnClick);
});

function restartOnClick() {
    cards = shuffle([].slice.call(cards));

    document.querySelector('.deck').innerHTML = null;
    const deck = document.createDocumentFragment();
    cards.forEach((card) => {
        card.classList.remove('open');
        card.classList.remove('match');
        card.classList.remove('show');

        deck.appendChild(card);
    });

    document.querySelector('.deck').appendChild(deck);

    // Hide modal
    document.querySelector('.modal-container').classList.add('hidden');

    currentlyOpen = [];
    telemetry.reset();
}


function cardOnClick(event) {
    const target = event.target;

    // If the card is already open, skip the event
    if (target.classList.contains('match')) return;
    if (target.classList.contains('open')) return;

    telemetry.move();

    // State machine
    if (currentlyOpen.length == 2) {
        // New move, clear everything, show card and push to currentlyOpen

        cards.forEach((card) => {
            card.classList.remove('open');
            card.classList.remove('show');
        });

        target.classList.add('open');
        target.classList.add('show');

        currentlyOpen = [];

        currentlyOpen.push(target);

    } else if (currentlyOpen.length == 0) {
        // Just show the card and push to currentlyOpen
        target.classList.add('open');
        target.classList.add('show');

        currentlyOpen.push(target);
    } else if (currentlyOpen.length == 1) {
        if (target.children[0].classList.value == currentlyOpen[0].children[0].classList.value) {
            // Set both to match, clear currentlyOpen
            target.classList.add('match');
            target.classList.remove('open');
            target.classList.remove('show');

            currentlyOpen[0].classList.add('match');
            currentlyOpen[0].classList.remove('open');
            currentlyOpen[0].classList.remove('show');


            // Check if the game is completed
            gameFinished = true;
            cards.forEach((card) => {
                if (!card.classList.contains('match')) gameFinished = false;
            });

            if (gameFinished) {
                endGame();
            }


            currentlyOpen = [];
        } else {
            // No match, just open and push
            target.classList.add('open');
            target.classList.add('show');

            currentlyOpen.push(target);
        }
    }

};

function endGame() {
    // Display modal    
    document.querySelector('.modal-container').classList.remove('hidden');
    telemetry.stop();
}

