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
    }, 1000);
}

// Typewriter-FX
function typeWriter(element, text, delay = 50, callback = null) {
    let i = 0;
    element.innerHTML = '';
    element.style.visibility = 'visible';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, delay);
        } else if (callback) {
            callback();
        }
    }
    type();
}

window.onload = function() {
    const h1 = document.querySelector('.header h1');
    const p = document.querySelector('.header p');

    const h1Text = h1.textContent;
    const pText = p.textContent;

    h1.style.visibility = 'hidden';
    p.style.visibility = 'hidden';
    
    typeWriter(h1, h1Text, 50, function() {
        setTimeout(function() {
            typeWriter(p, pText, 50);
        }, 200);
    });

    const container = document.getElementById('threejs-container');
    setTimeout(function() {
        container.classList.add('show');
    }, 900);
};

// Three.js Animation
const container = document.getElementById('threejs-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshStandardMaterial({ color: 0x002244, metalness: 0.8, roughness: 0.2, emissive: 0x050505 });
const shape = new THREE.Mesh(geometry, material);
scene.add(shape);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1.5);
pointLight.position.set(25, 50, 25);
scene.add(pointLight);

camera.position.z = 50;

function animate() {
    requestAnimationFrame(animate);
    shape.rotation.x += 0.01;
    shape.rotation.y += 0.01;
    shape.rotation.z += 0.005;
    renderer.render(scene, camera);
}
animate();

document.addEventListener('mousemove', function (e) {
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;
    shape.rotation.x += y * 0.05;
    shape.rotation.y += x * 0.05;
});

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
