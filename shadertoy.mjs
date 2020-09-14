import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/build/three.module.js';

export const dummyFragmentShader = `#include <common>
 
uniform vec3 iResolution;
uniform float iTime;
 
// By iq: https://www.shadertoy.com/user/iq  
// license: Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy;
 
    // Time varying pixel color
    vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));
 
    // Output to screen
    fragColor = vec4(col,1.0);
}
 
void main() {
  mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

const uniforms = {
  iTime: { value: 0 },
  iResolution: { value: new THREE.Vector3() },
};

var planeMesh;

// let purpleMaterial = new THREE.Material('purple');
// let errorBox = document.querySelector('#glsl-errors');

function createMaterial(fragmentShader) {
  // errorBox.textContent = 'No errors.';
  return new THREE.ShaderMaterial({
    fragmentShader,
    uniforms,
  });
}

export function updateMaterial(fragmentShader) {
  planeMesh.material = createMaterial(fragmentShader);
}

function main() {
  // window.onerror = function (msg, url, line) {
  //   errorBox.textContent = msg + '\n' + url + '\n' + line;
  //   planeMesh.material = purpleMaterial;
  // }
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.autoClearColor = false;

  const camera = new THREE.OrthographicCamera(
    -1, // left
    1, // right
    1, // top
    -1, // bottom
    -1, // near,
    1, // far
  );
  const scene = new THREE.Scene();
  const plane = new THREE.PlaneBufferGeometry(2, 2);
  planeMesh = new THREE.Mesh(plane, createMaterial(dummyFragmentShader));
  scene.add(planeMesh);

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.001;  // convert to seconds

    resizeRendererToDisplaySize(renderer);

    const canvas = renderer.domElement;
    uniforms.iResolution.value.set(canvas.width, canvas.height, 1);
    uniforms.iTime.value = time;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
