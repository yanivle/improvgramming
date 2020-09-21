import { dummyFragmentShader, updateMaterial } from './shadertoy.mjs';
import { send, registerReceiveHandler } from './p2p.mjs';

var editor;

function setupEditor(text) {
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/glsl");
    editor.session.setValue(text);

    document.querySelector('#editor').onkeyup = function () {
        send('editor', editor.getValue());
    }
}

registerReceiveHandler('editor', function (data) {
    // console.log('Got new editor data:', data);
    editor.setValue(data, -1);
});

registerReceiveHandler('run', function () {
    run();
});

function run(remote = true) {
    console.log('Running...');
    var editor = ace.edit("editor");
    let fragmentCode = editor.getValue();
    updateMaterial(fragmentCode);
    // console.log('settting new fragment shader:', fragmentCode);
    if (!remote) {
        send('run', null);
    }
}

function setupRunButton() {
    let button = document.querySelector("#runButton");
    button.onclick = function () { run(false); };
}

setupEditor(dummyFragmentShader);
setupRunButton();
