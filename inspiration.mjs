import { send, registerReceiveHandler } from './p2p.mjs';

let inspirationButton = document.querySelector("#inspirationButton");
let inspirationWords = document.querySelector("#inspirationWords");

function generateInspiration() {
    console.log('Soliciting from the crowd...');
    var words = ["cos", "sin", "tan", "intersect", "AND", "OR", "true", "false", ".xzy", "10.", "floor", 
                "red", "blue", "purple", "dark", "blink", "time", "rotate", "fade", "blur", "0.0001", "ray",
                "sphere", "rect", "abs", "length", "x^2", "x^3", "sqrt", "exp", "grid"];

    let chosenWords = [];
    while(chosenWords.length < 4) {
        let word = words[Math.floor(Math.random() * words.length)];
        if (!chosenWords.includes(word)) {
            chosenWords.push(word);
        }
    }
    let inspirationString = chosenWords.join(', ');
    inspirationWords.textContent = inspirationString;
    send('inspiration', inspirationString);
}

registerReceiveHandler('inspiration', function(data) {
    inspirationWords.textContent = data;
});

inspirationButton.onclick = function () { generateInspiration(); };
