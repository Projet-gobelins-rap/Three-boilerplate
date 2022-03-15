import '../styles/style.styl'
import * as THREE from "three";
import {Camera, Clock, Scene, WebGLRenderer} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

//@ts-ignore
import fragment from '../webgl/shader/fragment.glsl'
//@ts-ignore
import vertex from '../webgl/shader/vertex.glsl'

class Main{
    public scene:Scene
    public camera:Camera
    public renderer:WebGLRenderer
    public controls:OrbitControls
    public clock:Clock
    public loader:GLTFLoader

    public uniforms:any
    public vpWidth:number
    public vpHeight:number
    public canvas:HTMLCanvasElement | null

    constructor(){
        this.canvas = document.querySelector('.webgl')
        this.vpWidth = window.innerWidth
        this.vpHeight = window.innerHeight
        this.loader = new GLTFLoader()
        this.clock = new THREE.Clock()
        this.uniforms = {
            u_time: { type: "f", value: 1.0 }
        };
        this.init()
        console.log(fragment,'fragement')
        console.log(vertex,'vertex')
    }

    init(){
        this.copyright()
        this.createScene()
        console.log(this.renderer.domElement)
        this.bindEvents()
    }

    bindEvents(){
        this.render()
        window.addEventListener('resize',()=>{
            this.resize()
        })
    }

    createScene(){
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera( 75, this.vpWidth / this.vpHeight, 0.1, 1000 );
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        this.renderer.setSize( this.vpWidth, this.vpHeight );
        document.body.appendChild( this.renderer.domElement );
        this.controls = new OrbitControls( this.camera, this.renderer.domElement );

        const light = new THREE.AmbientLight( 0x404040 ); // soft white light
        this.scene.add( light );

        // const pl = new THREE.PointLight( 0xff0000, 1, 100 );
        // light.position.set( 1250, 50, 50 );
        // this.scene.add( pl );
        this.createGeometry()
    }

    createGeometry(){
        const geometry = new THREE.SphereGeometry();
        const material = new THREE.ShaderMaterial( {
            uniforms: this.uniforms,
            vertexShader: vertex,
            fragmentShader: fragment
        } );
        // const material = new THREE.MeshBasicMaterial({
        //     color:0xCC24EA
        // });
        const cube = new THREE.Mesh( geometry, material );
        this.scene.add( cube );
        const axesHelper = new THREE.AxesHelper( 5 );
        this.scene.add( axesHelper );
        this.camera.position.z = 25;
        // this.camera.position.y = 15;
        // this.camera.position.x = 5;
        // this.camera.position. = 45;
        console.log(this.scene,'scene')
    }

    resize(){
        // a repasser sur cette methode ça marche pas trop zebi
        console.log('resizeee')
        this.renderer.setSize(this.vpWidth,this.vpHeight);
    }

    render(){
        this.uniforms.u_time.value += 0.05;
        this.renderer.render( this.scene, this.camera );
        requestAnimationFrame(this.render.bind(this))
    }

    copyright(){
        console.log(
            "%c three starter",
            "color:white;padding:10px;background:#a29bfe;font-size:16px;"
        );
    }
}

new Main()
