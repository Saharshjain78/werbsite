import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../utils/reducedMotion';

export function initLearnerScrollController(scene) {
  if (prefersReducedMotion()) return null;

  gsap.registerPlugin(ScrollTrigger);

  // Initial state overrides to sync with scroll start expectations
  scene.camera.position.set(0, 0, 20);

  const ctx = gsap.context(() => {
    // 1. Hero -> Constellation expands
    gsap.to(scene.camera.position, {
      z: 12,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 1.5
      }
    });

    // 2. How it works -> path trace / pan + bullet points
    const hiwTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hiw-pin-target",
        start: "top top",
        end: "+=300%",
        scrub: 1.5,
        pin: true,
      }
    });

    hiwTl.to(scene.sceneGroup.rotation, {
      y: Math.PI / 8,
      ease: "none"
    }, 0);

    hiwTl.to(".hiw-step", {
      opacity: 1,
      x: 0,
      stagger: 0.5,
      ease: "none"
    }, 0.2);

    // 3. AI Tutor -> Camera pan left, tilt down
    gsap.to(scene.camera.position, {
      x: -2,
      y: -1,
      ease: "none",
      scrollTrigger: {
        trigger: "#features",
        start: "top 80%",
        end: "top 20%",
        scrub: 1.5
      }
    });

    // 4. Feature Card staggers (DOM only, bound to features section)
    gsap.fromTo(".feature-card", 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, stagger: 0.2, scrollTrigger: {
          trigger: "#features",
          start: "top 85%",
      }}
    );

    // 5. Testimonials -> Background dims, pull back to z=18
    gsap.to(scene.nodeMaterial.uniforms.uGlowIntensity, {
      value: 0.4,
      ease: "none",
      scrollTrigger: {
          trigger: "#testimonials",
          start: "top 80%",
          end: "top 20%",
          scrub: 1.5
      }
    });

    gsap.to(scene.camera.position, {
      z: 18,
      ease: "none",
      scrollTrigger: {
        trigger: "#testimonials",
        start: "top 80%",
        end: "top 20%",
        scrub: 1.5
      }
    });

    // 6. Final CTA -> Rush forward
    gsap.to(scene.camera.position, {
      z: 2,
      ease: "power2.in",
      scrollTrigger: {
        trigger: "#final-cta",
        start: "top 80%",
        end: "top 20%",
        scrub: 1.5
      }
    });
  });

  return ctx;
}
