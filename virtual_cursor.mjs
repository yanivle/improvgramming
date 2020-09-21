import { send, registerReceiveHandler } from './p2p.mjs';

let cursor = document.querySelector("#virtual_cursor");
let body = document.querySelector("body");

registerReceiveHandler('mouse', function (data) {
    let [what, x, y] = data;
    if (what == 'move') {
        cursor.style.left = x;
        cursor.style.top = y;
    } else if (what == 'click') {
        cursor.style.left = x;
        cursor.style.top = y;
        var img = document.createElement("img");
        img.src = "click.png";
        img.style.left = x;
        img.style.top = y;
        img.classList.add('overlayImg');
        body.appendChild(img);
        setTimeout(function () {
            img.remove();
        }, 500);
    }
});

body.onmousemove = function (event) {
    var x = event.clientX;
    var y = event.clientY;
    send('mouse', ['move', x, y]);
};

body.onclick = function (event) {
    var x = event.clientX;
    var y = event.clientY;
    send('mouse', ['click', x, y]);
};
