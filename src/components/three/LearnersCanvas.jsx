import React, { useRef, useEffect, useState } from 'react';
import { LearnerScene } from '../../lib/three/LearnerScene';
import { detectGPU } from '../../lib/utils/detectGPU';
import { initLearnerScrollController } from '../../lib/gsap/learnerScrollController';

export default function LearnersCanvas() {
  const canvasRef = useRef(null);
  const [hasGPU, setHasGPU] = useState(true);

  useEffect(() => {
    if (!detectGPU()) {
      setHasGPU(false);
      return;
    }

    let ctx;
    let timeoutId;
    if (canvasRef.current) {
      const scene = new LearnerScene(canvasRef.current);
      scene.render();

      // Delay GSAP initialization slightly to ensure sibling DOM nodes have painted
      timeoutId = setTimeout(() => {
        ctx = initLearnerScrollController(scene);
        
        // Force scrolltrigger recalculation so pinned sections get correct height
        import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
           ScrollTrigger.refresh();
        });
      }, 50);

      return () => {
        clearTimeout(timeoutId);
        if (ctx) ctx.revert();
        scene.dispose();
      };
    }
  }, []);

  if (!hasGPU) {
    return <div className="w-full h-full bg-cosmic-dark flex items-center justify-center text-cosmic-primary">Canvas Fallback Area</div>; // fallback here
  }

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none" 
    />
  );
}
