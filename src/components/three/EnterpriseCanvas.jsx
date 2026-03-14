import React, { useRef, useEffect, useState } from 'react';
import { EnterpriseScene } from '../../lib/three/EnterpriseScene';
import { detectGPU } from '../../lib/utils/detectGPU';
import { initEnterpriseScrollController } from '../../lib/gsap/enterpriseScrollController';

export default function EnterpriseCanvas() {
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
      const scene = new EnterpriseScene(canvasRef.current);
      scene.render();

      timeoutId = setTimeout(() => {
        ctx = initEnterpriseScrollController(scene);
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
    return <div className="w-full h-full bg-cosmic-dark flex items-center justify-center text-cosmic-accent">Enterprise Canvas Fallback</div>; // fallback here
  }

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none" 
    />
  );
}
