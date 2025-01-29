let gameStarted = false;
let timerInterval;

let facts = [
    "I chipped my front tooth while taking the pop quiz for this class.",
    "My brother was born in a car.",
    "I am an analog filmmaker and photographer!",
    "I <33 working with Super 8, 16mm, and 35mm film.",
    "I'm not so secretly obsessed with Ross Lynch.",
    "I made some 3D stickers for Juicy Couture's Fall 2024 drop!",
    "My typeface 'Gemini' is featured on Uncut.",
    "My dad didn't see me for 27 days after I was born.",
    "I am terrible at tennis even though I played regulary for 6 years.",
    "I am trained Kathak dancer.",
    "My first tattoo was a duck, hid it from my parents for two weeks.",
    "I was kinda blue when I was born.",
    "I used to bite my nails constantl.",
    "I have always disliked running.",
    "I was in a band called 'Purgatory' between the ages 13 and 16.",
    "I can crack my jaw like people crack fingers and necks.",
    "I love ancient Greek philosophy.",
    "My thesis is entirely on 16mm film.",
    "I <3 title design.",
    "I have taught classes about 35mm film before",
    "Sleep is on my vision board for 2025.",
];

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("fact").innerText = "Press arrow keys to start playing.";
});

function updateLengthDisplay(newLength) {
    let lengthElement = document.getElementById("lengthDisplay");
    if (lengthElement) lengthElement.innerText = newLength;
}

function updateFact() {
    let factElement = document.getElementById("fact");
    if (factElement) {
        let randomFact = facts[Math.floor(Math.random() * facts.length)];
        factElement.innerText = "About Me: " + randomFact;
    }
}

function stopTimer() {
    clearInterval(timerInterval);
}

function restart() {
    location.reload();
}
