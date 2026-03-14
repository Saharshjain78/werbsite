/**
 * Generates a node and edge graph for the 3D scenes.
 * @param {number} numNodes - Total nodes generated.
 * @param {boolean} structured - If true, lays out nodes in an enterprise hex/grid structure.
 */
export function generateGraph(numNodes = 200, structured = false) {
  const nodes = [];
  const edges = [];
  
  if (structured) {
    // Hexagonal / structured layout for Enterprise
    let layers = Math.ceil(Math.sqrt(numNodes));
    let id = 0;
    
    for (let l = 0; l <= layers; l++) {
      let count = l === 0 ? 1 : l * 6;
      for (let c = 0; c < count; c++) {
        if (id >= numNodes) break;
        
        let angle = (c / count) * Math.PI * 2;
        let radius = l * 1.5;
        // add slight noise
        let x = Math.cos(angle) * radius + (Math.random() * 0.2 - 0.1);
        let y = (Math.random() * 2 - 1) * 0.5 - l * 0.2; // slight drop
        let z = Math.sin(angle) * radius + (Math.random() * 0.2 - 0.1);
        
        nodes.push({ id, x, y, z, size: l === 0 ? 0.2 : 0.1 + Math.random() * 0.05 });
        
        // Structure edges: connect to random node in previous layer
        if (l > 0) {
          let prevLayerStart = id - count - (l - 1) * 6;
          if (l === 1) prevLayerStart = 0; // Layer 1 connects to Layer 0
          
          let target = Math.max(0, prevLayerStart + Math.floor(Math.random() * (l === 1 ? 1 : (l - 1) * 6)));
          edges.push([id, target]);
        }
        id++;
      }
    }
  } else {
    // Constellation / organic layout for Learner
    for (let i = 0; i < numNodes; i++) {
      let r = 8 + Math.random() * 10;
      let theta = Math.random() * 2 * Math.PI;
      let phi = Math.acos(2 * Math.random() - 1);
      
      let x = r * Math.sin(phi) * Math.cos(theta);
      let y = r * Math.sin(phi) * Math.sin(theta);
      let z = r * Math.cos(phi);
      
      let size = 0.07;
      let rand = Math.random();
      if (rand > 0.9) size = 0.15;
      else if (rand > 0.6) size = 0.10;
      
      nodes.push({ id: i, x, y, z, size });
    }
    
    // Connect nodes by proximity
    for (let i = 0; i < nodes.length; i++) {
      let connections = 0;
      for (let j = i + 1; j < nodes.length; j++) {
        let dx = nodes[i].x - nodes[j].x;
        let dy = nodes[i].y - nodes[j].y;
        let dz = nodes[i].z - nodes[j].z;
        let dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (dist < 4.0 && connections < 3) {
          edges.push([i, j]);
          connections++;
        }
      }
    }
    
    // Add origin node
    nodes.unshift({ id: -1, x: 0, y: 0, z: 0, size: 0.25 });
    for (let i = 0; i < 5; i++) {
      edges.push([-1, Math.floor(Math.random() * 20)]);
    }
  }
  
  return { nodes, edges };
}
