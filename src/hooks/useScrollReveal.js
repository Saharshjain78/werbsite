import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const useScrollReveal = (options = {}) => {
  const containerRef = useRef(null);
  const elementsRef = useRef([]);

  const {
    stagger = 0,
    yOffset = 50,
    duration = 0.8,
    delay = 0,
    ease = 'power3.out',
    start = 'top 85%',
    scrub = false,
  } = options;

  useGSAP(() => {
    if (!containerRef.current || elementsRef.current.length === 0) return;

    // Filter out null refs if any
    const targets = elementsRef.current.filter(Boolean);

    gsap.fromTo(targets, 
      {
        y: yOffset,
        autoAlpha: 0
      },
      {
        y: 0,
        autoAlpha: 1,
        duration,
        delay,
        ease,
        stagger,
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          toggleActions: scrub ? undefined : 'play none none reverse',
          scrub: scrub
        }
      }
    );
  }, { scope: containerRef });

  return { containerRef, elementsRef };
};
