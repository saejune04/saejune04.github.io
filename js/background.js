// js/main.js

/**
 * 0: Galaxy
 * 1: Triangles
 */

/**
 * TODO:
 * customizable speed controller for animation
 * make triangles not epileptic
 */

const animationMode = 0

const xInput = document.getElementById("xSpeed");
const yInput = document.getElementById("ySpeed");

let rotationSpeedX = parseFloat(xInput?.value || 0.0003);
let rotationSpeedY = parseFloat(yInput?.value || 0.002);

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("bg");
  if (!canvas) {
    console.error("Canvas with id 'bg' not found.");
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 20;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Star geometry
  const starCount = 50000;
  const positions = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount * 3; i++) {
    positions[i] = THREE.MathUtils.randFloatSpread(100);
  }

  const geometry = new THREE.BufferGeometry();
  const sphere_geometry = new THREE.SphereGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  sphere_geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  // Shader material with color animation
  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0.0 }
    },
    vertexShader: `
      varying float brightness;
      void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        brightness = 0.6 + 0.4 * sin(position.x * 0.1 + position.y * 0.1);
        gl_PointSize = 1.5 + 1.5 * brightness;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform float time;
      varying float brightness;
      void main() {
        float r = 0.5 + 0.5 * sin(time + brightness * 5.0);
        float g = 0.5 + 0.5 * sin(time + brightness * 3.0 + 2.0);
        float b = 0.5 + 0.5 * sin(time + brightness * 7.0 + 4.0);
        gl_FragColor = vec4(r, g, b, 1.0);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  const stars = new THREE.Points(geometry, material);
  const sphere = new THREE.Mesh(sphere_geometry, material);
  if (animationMode == 0) {
    scene.add(stars);
  } else if (animationMode == 1) {
    scene.add(sphere);
  }

  // Animation loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    material.uniforms.time.value = clock.getElapsedTime();
  
    // Read slider values (in case they changed)
    const xInput = document.getElementById("xSpeed");
    const yInput = document.getElementById("ySpeed");
    if (xInput && yInput) {
      rotationSpeedX = parseFloat(xInput.value);
      rotationSpeedY = parseFloat(yInput.value);
    }
  
    stars.rotation.x += rotationSpeedY;
    stars.rotation.y += rotationSpeedX;
  
    renderer.render(scene, camera);
  }

  // Resize support
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  animate();
});
