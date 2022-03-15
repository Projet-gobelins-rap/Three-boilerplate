import '../styles/style.styl'
import * as THREE from "three";
import { Camera, Clock, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

//@ts-ignore
import fragment from '../webgl/shader/fragment.glsl'
//@ts-ignore
import vertex from '../webgl/shader/vertex.glsl'

class Main {
    public scene: Scene
    public camera: Camera
    public renderer: WebGLRenderer
    public controls: OrbitControls
    public clock: Clock
    public loader: GLTFLoader
    public uniforms: any
    public sizes: {
        height: number,
        width: number
    }
    public canvas: HTMLCanvasElement | null

    constructor() {
        this.canvas = document.querySelector('.webgl')
        this.sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        } 
        this.loader = new GLTFLoader()
        this.clock = new THREE.Clock()
        this.uniforms = {
            u_time: { type: "f", value: 1.0 }
        };
        this.init()
    } 

    init() {
        this.copyright()
        this.createScene()

        this.renderLoop()
        this.bindEvents()
    }

    bindEvents() {
        window.addEventListener('resize', () => {
            this.resize()
        })
    }

    createScene() {
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(70, this.sizes.width / this.sizes.height, 0.01, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        const light = new THREE.AmbientLight(0x404040); // soft white light
        this.scene.add(light);

        // const pl = new THREE.PointLight( 0xff0000, 1, 100 );
        // light.position.set( 1250, 50, 50 );
        // this.scene.add( pl );
        this.createGeometry()
    }

    createGeometry() {
        const geometry = new THREE.SphereGeometry();
        const material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: vertex,
            fragmentShader: fragment
        });

        const sphere = new THREE.Mesh(geometry, material);
        this.scene.add(sphere);
        const axesHelper = new THREE.AxesHelper(5);
        this.scene.add(axesHelper);
        this.camera.position.set(10, 5, 10);
    }

    resize() {
        this.sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.camera.aspect = this.sizes.width / this.sizes.height;
        this.camera.updateProjectionMatrix();
    }

    renderLoop() {
        this.uniforms.u_time.value += 0.05;
        this.renderer.render(this.scene, this.camera);
        this.controls.update()
        window.requestAnimationFrame(this.renderLoop.bind(this))
    }

    copyright() {
        console.log(
            "%c SUCEPUTE ",
            "color:white;padding:10px;font-weight:700;font-style:italic;background:red;font-size:16px;"
        );
    }
}

new Main()
