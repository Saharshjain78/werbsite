import * as THREE from 'three';
import { SceneManager } from './SceneManager.js';
import { generateGraph } from './generateGraph.js';
import glowVert from '../shaders/glow.vert.glsl?raw';
import glowFrag from '../shaders/glow.frag.glsl?raw';

export class LearnerScene extends SceneManager {
  constructor(canvas) {
    super(canvas);

    this.bloomPass.threshold = 0.2;
    this.bloomPass.strength = 1.5;
    this.bloomPass.radius = 0.8;

    this.initScene();
    
    // Mouse drift
    this.mouse = new THREE.Vector2(0, 0);
    this.targetCameraPos = new THREE.Vector3(0, 0, 12);
    
    this.onMouseMove = this.onMouseMove.bind(this);
    window.addEventListener('mousemove', this.onMouseMove);
  }

  initScene() {
    const { nodes, edges } = generateGraph(200, false);
    this.nodesData = nodes;

    // Node Material (Custom Shader)
    const nodeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uBaseColor: { value: new THREE.Color('#7C3AED') },
        uGlowColor: { value: new THREE.Color('#A78BFA') },
        uGlowIntensity: { value: 1.0 },
        uTime: { value: 0 }
      },
      vertexShader: glowVert,
      fragmentShader: glowFrag,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
    this.nodeMaterial = nodeMaterial;

    // Instanced Mesh for Nodes
    const sphereGeo = new THREE.SphereGeometry(1, 8, 8);
    this.instancedNodes = new THREE.InstancedMesh(sphereGeo, nodeMaterial, nodes.length);
    
    const dummy = new THREE.Object3D();
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      dummy.position.set(n.x, n.y, n.z);
      dummy.scale.set(n.size, n.size, n.size);
      dummy.updateMatrix();
      this.instancedNodes.setMatrixAt(i, dummy.matrix);
    }
    this.scene.add(this.instancedNodes);

    // Edges
    const lineGeo = new THREE.BufferGeometry();
    const linePositions = [];
    edges.forEach(edge => {
      // Handle the dummy nodes that might not exist in array cleanly if index is wrong
      const n1 = nodes.find(n => n.id === edge[0]) || nodes[0];
      const n2 = nodes.find(n => n.id === edge[1]) || nodes[1];
      linePositions.push(n1.x, n1.y, n1.z);
      linePositions.push(n2.x, n2.y, n2.z);
    });
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xA78BFA,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending
    });
    this.edgesLine = new THREE.LineSegments(lineGeo, lineMat);
    this.scene.add(this.edgesLine);

    // Particles
    const particlesGeo = new THREE.BufferGeometry();
    const particlePositions = [];
    for (let i = 0; i < 3000; i++) {
      const r = 50;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      particlePositions.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
    }
    particlesGeo.setAttribute('position', new THREE.Float32BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xE2E8F0,
      size: 0.08,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true
    });
    this.particles = new THREE.Points(particlesGeo, particleMat);
    this.scene.add(this.particles);

    // Group for rotation
    this.sceneGroup = new THREE.Group();
    this.sceneGroup.add(this.instancedNodes);
    this.sceneGroup.add(this.edgesLine);
    this.scene.add(this.sceneGroup);
  }

  onMouseMove(e) {
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  update(elapsed) {
    this.nodeMaterial.uniforms.uTime.value = elapsed;
    
    // Slow drift rotation
    this.sceneGroup.rotation.y = elapsed * 0.05;
    this.sceneGroup.rotation.x = elapsed * 0.02;

    // Camera drift lerp
    const targetX = this.mouse.x * 2;
    const targetY = this.mouse.y * 2;
    
    this.camera.position.x += (targetX - this.camera.position.x) * 0.05;
    this.camera.position.y += (targetY - this.camera.position.y) * 0.05;
    this.camera.lookAt(this.sceneGroup.position);
  }

  dispose() {
    super.dispose();
    window.removeEventListener('mousemove', this.onMouseMove);
  }
}
