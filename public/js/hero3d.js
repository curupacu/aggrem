import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BG_COLOR = 0x0c0717;

const bg = document.getElementById('mountain-bg');
const canvas = document.getElementById('mountain-canvas');
const loadingEl = document.getElementById('hero3d-loading');
// a montanha sobe pela rolagem da página inteira (hero → serviços → portfólio
// → sobre → contato), não só pelo hero — o fundo fica fixo atrás de tudo e
// só "chega ao topo" perto do rodapé.
const climbTrigger = document.querySelector('main');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function supportsWebGL() {
    try {
        const test = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (test.getContext('webgl') || test.getContext('experimental-webgl')));
    } catch (e) {
        return false;
    }
}

if (!bg || !canvas || !climbTrigger || !supportsWebGL()) {
    if (bg) bg.classList.add('mountain-bg-fallback');
    loadingEl?.classList.add('hidden');
} else {
    initHero3D();
}

function initHero3D() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(BG_COLOR);
    scene.fog = new THREE.FogExp2(BG_COLOR, 0.025);

    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight || 1, 0.1, 100);

    let renderer;
    try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    } catch (e) {
        bg.classList.add('mountain-bg-fallback');
        loadingEl?.classList.add('hidden');
        return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // ── Iluminação ──
    const ambient = new THREE.AmbientLight(0x6a4aa8, 0.55);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xc3a3f2, 1.3);
    key.position.set(4, 6, 4);
    scene.add(key);

    const summitLight = new THREE.DirectionalLight(0xe0b3ff, 2.0);
    summitLight.position.set(-2.5, 9, -3);
    scene.add(summitLight);

    const fill = new THREE.DirectionalLight(0x2a1850, 0.6);
    fill.position.set(-4, -2, 5);
    scene.add(fill);

    // ── Trajeto da câmera: sobe devagar da base ao topo ao longo da página
    // inteira (hero → serviços → portfólio → sobre → contato) ──
    const camWaypoints = [
        new THREE.Vector3(0, 2.6, 9.5),     // hero: base da montanha
        new THREE.Vector3(-2, 3.0, 8.0),    // entrando em "serviços"
        new THREE.Vector3(-3.5, 3.6, 6.0),  // meio de "serviços"
        new THREE.Vector3(2.5, 4.0, 5.0),   // "portfólio"
        new THREE.Vector3(-1.5, 4.3, 4.0),  // "sobre"
        new THREE.Vector3(0.9, 4.6, 3.4),   // "contato": quase no topo
    ];
    const lookStart = new THREE.Vector3(0, 2.6, 0);
    const lookEnd = new THREE.Vector3(0, 4.9, 0);

    const camCurve = new THREE.CatmullRomCurve3(camWaypoints);

    camera.position.copy(camWaypoints[0]);
    camera.lookAt(lookStart);

    let mountain = null;
    let scrollTriggerInstance = null;

    // ── Material de marca: substitui a textura realista (foto de rocha/grama)
    // por um gradiente roxo procedural (mesma paleta do resto do site) com
    // realce fresnel nas bordas — a montanha some no fundo em vez de "brilhar
    // sozinha, deslocada" contra o visual roxo/neon do site.
    const gradientUniforms = {
        uMinY: { value: 0 },
        uMaxY: { value: 5 },
        uColorBase: { value: new THREE.Color(0x0a0613) },
        uColorMid: { value: new THREE.Color(0x5f1dbb) },
        uColorPeak: { value: new THREE.Color(0xc97dff) },
        uRimColor: { value: new THREE.Color(0xc97dff) },
        uRimPower: { value: 2.2 },
        uRimIntensity: { value: 0.9 },
    };

    function applyBrandMaterial(mesh) {
        const material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.6,
            metalness: 0.2,
        });
        material.onBeforeCompile = (shader) => {
            Object.assign(shader.uniforms, gradientUniforms);

            shader.vertexShader = shader.vertexShader
                .replace('varying vec3 vViewPosition;', 'varying vec3 vViewPosition;\nvarying float vWorldY;')
                .replace(
                    '#include <begin_vertex>',
                    '#include <begin_vertex>\n\tvWorldY = (modelMatrix * vec4(transformed, 1.0)).y;'
                );

            shader.fragmentShader = shader.fragmentShader
                .replace(
                    'varying vec3 vViewPosition;',
                    'varying vec3 vViewPosition;\nvarying float vWorldY;\nuniform float uMinY;\nuniform float uMaxY;\nuniform vec3 uColorBase;\nuniform vec3 uColorMid;\nuniform vec3 uColorPeak;\nuniform vec3 uRimColor;\nuniform float uRimPower;\nuniform float uRimIntensity;'
                )
                .replace(
                    '#include <color_fragment>',
                    `#include <color_fragment>
                    {
                        float h = clamp((vWorldY - uMinY) / max(uMaxY - uMinY, 0.0001), 0.0, 1.0);
                        vec3 gradCol = h < 0.5 ? mix(uColorBase, uColorMid, h * 2.0) : mix(uColorMid, uColorPeak, (h - 0.5) * 2.0);
                        diffuseColor.rgb = gradCol;
                    }`
                )
                .replace(
                    '#include <opaque_fragment>',
                    `{
                        vec3 viewDirN = normalize(vViewPosition);
                        float fresnel = pow(1.0 - clamp(dot(normalize(vNormal), viewDirN), 0.0, 1.0), uRimPower);
                        outgoingLight += uRimColor * fresnel * uRimIntensity;
                    }
                    #include <opaque_fragment>`
                );
        };
        mesh.material = material;
    }

    const loader = new GLTFLoader();
    loader.load(
        'models/mountain-peak.glb',
        (gltf) => {
            mountain = gltf.scene;

            mountain.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = false;
                    child.receiveShadow = false;
                    applyBrandMaterial(child);
                }
            });

            // normaliza pela ALTURA (não pela dimensão máxima) — em modelos largos
            // isso evita que o pico fique achatado; precisa escalar ANTES de medir
            // o centro, senão o deslocamento de centralização fica errado quando
            // a escala está longe de 1 (posição e escala não comutam).
            const rawBox = new THREE.Box3().setFromObject(mountain);
            const rawSize = rawBox.getSize(new THREE.Vector3());
            const scale = 5 / (rawSize.y || 1);
            mountain.scale.setScalar(scale);
            mountain.updateMatrixWorld(true);

            const box = new THREE.Box3().setFromObject(mountain);
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());
            mountain.position.sub(center);
            mountain.position.y += size.y / 2;

            scene.add(mountain);
            loadingEl?.classList.add('hidden');

            if (!reduceMotion) {
                setupScrollCamera();
            }
        },
        undefined,
        (err) => {
            console.error('Falha ao carregar o modelo da montanha:', err);
            bg.classList.add('mountain-bg-fallback');
            loadingEl?.classList.add('hidden');
        }
    );

    function setupScrollCamera() {
        scrollTriggerInstance = ScrollTrigger.create({
            trigger: climbTrigger,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.8,
            onUpdate: (self) => {
                const t = self.progress;
                camera.position.copy(camCurve.getPointAt(Math.min(t, 0.999)));
                const look = new THREE.Vector3().lerpVectors(lookStart, lookEnd, t);
                camera.lookAt(look);
            },
        });
    }

    function onResize() {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        if (!w || !h) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
    }
    window.addEventListener('resize', onResize);

    // pausa o loop de render quando a aba está oculta ou o conteúdo com a
    // montanha já ficou todo pra trás no scroll (economiza bateria/CPU)
    let visible = true;
    const io = new IntersectionObserver(
        ([entry]) => { visible = entry.isIntersecting; },
        { threshold: 0 }
    );
    io.observe(climbTrigger);

    function animate() {
        requestAnimationFrame(animate);
        if (!visible || document.hidden) return;
        renderer.render(scene, camera);
    }
    animate();
}
