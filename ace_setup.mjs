import { dummyFragmentShader, updateMaterial } from './shadertoy.mjs';

function setupEditor(text) {
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/glsl");
    editor.session.setValue(text);
}

function setupRunButton() {
    let button = document.querySelector("#runButton");
    button.onclick = function() {
        var editor = ace.edit("editor");
        let fragmentCode = editor.getValue();
        updateMaterial(fragmentCode);
        console.log('settting new fragment shader:', fragmentCode);
    }
}

setupEditor(dummyFragmentShader);
setupRunButton();
