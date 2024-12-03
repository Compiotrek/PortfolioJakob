function openTab(evt, tabName) {
    var i, tabcontent, tabbuttons;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tabbuttons = document.getElementsByClassName("tab-button");
    for (i = 0; i < tabbuttons.length; i++) {
        tabbuttons[i].className = tabbuttons[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function showEmailPopup() {
    document.getElementById("emailPopup").style.display = "flex";
}

function closeEmailPopup() {
    document.getElementById("emailPopup").style.display = "none";
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        showSuccessMessage();
    }, function(err) {
        alert("Fehler beim Kopieren der E-Mail-Adresse");
    });
}

function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.add('show');
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 1000); // Dauer der Animation in Millisekunden
}

// Three.js Animation
const container = document.getElementById('threejs-container');
container.style.position = 'fixed';
container.style.top = '50%';
container.style.left = '50%';
container.style.transform = 'translate(-50%, -50%)';
container.style.width = '100%';
container.style.height = '100%';
container.style.overflow = 'hidden';
container.style.zIndex = '-2';
container.style.filter = 'brightness(1.8) contrast(1.5) saturate(1.6)';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Add more complex geometry (like a torus knot)
const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshStandardMaterial({ color: 0x002244, metalness: 0.8, roughness: 0.2, emissive: 0x050505 });
const shape = new THREE.Mesh(geometry, material);
scene.add(shape);

// Add lighting for better visual effect
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1.5);
pointLight.position.set(25, 50, 25);
scene.add(pointLight);

camera.position.z = 50;

// Animation Loop with more dynamic rotation
function animate() {
    requestAnimationFrame(animate);
    shape.rotation.x += 0.01;
    shape.rotation.y += 0.01;
    shape.rotation.z += 0.005;
    renderer.render(scene, camera);
}
animate();

// Mouse Interaction for speed and rotation direction
document.addEventListener('mousemove', function (e) {
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;
    shape.rotation.x += y * 0.05;
    shape.rotation.y += x * 0.05;
});

// Adjust canvas on window resize
window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
