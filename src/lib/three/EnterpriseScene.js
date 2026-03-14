import * as THREE from 'three';
import { SceneManager } from './SceneManager.js';
import { generateGraph } from './generateGraph.js';
import glowVert from '../shaders/glow.vert.glsl?raw';
import glowFrag from '../shaders/glow.frag.glsl?raw';

export class EnterpriseScene extends SceneManager {
  constructor(canvas) {
    super(canvas);

    this.bloomPass.threshold = 0.3;
    this.bloomPass.strength = 1.0;
    this.bloomPass.radius = 0.6;

    this.camera.position.set(0, 8, 16);

    this.initScene();
  }

  initScene() {
    const { nodes, edges } = generateGraph(100, true);

    const nodeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uBaseColor: { value: new THREE.Color('#F5A623') },
        uGlowColor: { value: new THREE.Color('#FCD34D') },
        uGlowIntensity: { value: 1.0 },
        uTime: { value: 0 }
      },
      vertexShader: glowVert,
      fragmentShader: glowFrag,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
    this.nodeMaterial = nodeMaterial;

    const sphereGeo = new THREE.SphereGeometry(1, 12, 12);
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

    const lineGeo = new THREE.BufferGeometry();
    const linePositions = [];
    edges.forEach(edge => {
        const n1 = nodes[edge[0]];
        const n2 = nodes[edge[1]];
        if(n1 && n2) {
          linePositions.push(n1.x, n1.y, n1.z);
          linePositions.push(n2.x, n2.y, n2.z);
        }
    });
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
        color: 0xF5A623,
        transparent: true,
        opacity: 0.25,
        blending: THREE.AdditiveBlending
    });
    this.edgesLine = new THREE.LineSegments(lineGeo, lineMat);
    this.scene.add(this.edgesLine);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(20, 20, 0x1E293B, 0x1E293B);
    gridHelper.position.y = -2;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.5;
    this.scene.add(gridHelper);

    this.sceneGroup = new THREE.Group();
    this.sceneGroup.add(this.instancedNodes);
    this.sceneGroup.add(this.edgesLine);
    this.scene.add(this.sceneGroup);
    
    this.camera.lookAt(this.sceneGroup.position);
  }

  update(elapsed) {
    this.nodeMaterial.uniforms.uTime.value = elapsed;
    
    // Gentle sway
    this.sceneGroup.rotation.y = Math.sin(elapsed * 0.1) * 0.1;
    this.camera.position.x = Math.sin(elapsed * 0.2) * 2;
    this.camera.lookAt(this.sceneGroup.position);
  }
}
