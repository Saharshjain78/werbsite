import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const useCountUp = (endValue, duration = 2, prefix = '', suffix = '') => {
  const nodeRef = useRef(null);
  const [displayValue, setDisplayValue] = useState(prefix + '0' + suffix);

  useGSAP(() => {
    if (!nodeRef.current) return;

    // Use a proxy object for GSAP to animate a flat number
    const counter = { val: 0 };

    gsap.to(counter, {
      val: endValue,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: nodeRef.current,
        start: 'top 90%',
        once: true // animate only once
      },
      onUpdate: () => {
        // Format with commas or raw string logic
        setDisplayValue(prefix + Math.ceil(counter.val).toLocaleString() + suffix);
      }
    });
  }, { scope: nodeRef });

  return { nodeRef, displayValue };
};
