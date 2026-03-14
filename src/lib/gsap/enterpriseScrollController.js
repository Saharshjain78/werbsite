import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../utils/reducedMotion';

export function initEnterpriseScrollController(scene) {
  if (prefersReducedMotion()) return null;

  gsap.registerPlugin(ScrollTrigger);

  // Initial setup for Top-down map assembly
  scene.camera.position.set(0, 20, 16);
  
  const ctx = gsap.context(() => {
    // 1. Hero -> Org map assembles, descend to y=8
    gsap.to(scene.camera.position, {
      y: 8,
      ease: "none",
      scrollTrigger: {
        trigger: "#enterprise-hero",
        start: "top top",
        end: "bottom top",
        scrub: 1.5
      }
    });

    // 2. Use cases -> Highlight clusters, rotate over pinned section
    const useCaseTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".enterprise-pin-target",
        start: "top top",
        end: "+=200%",
        scrub: 1.5,
        pin: true,
      }
    });

    useCaseTl.to(scene.sceneGroup.rotation, {
      y: Math.PI / 4,
      ease: "none"
    }, 0);

    useCaseTl.to(".solution-tile", {
      opacity: 1,
      x: 0,
      stagger: 0.5,
      ease: "none"
    }, 0.2);

    // 3. Analytics -> Pull back further
    gsap.to(scene.camera.position, {
      y: 12,
      ease: "none",
      scrollTrigger: {
        trigger: "#analytics",
        start: "top 80%",
        end: "top 20%",
        scrub: 1.5
      }
    });

    // 5. Final CTA -> Center, simultaneous glow
    gsap.to(scene.camera.position, {
      y: 10,
      z: 10,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#enterprise-cta",
        start: "top 80%",
        end: "top 20%",
        scrub: 1.5
      }
    });

    gsap.to(scene.nodeMaterial.uniforms.uGlowIntensity, {
      value: 1.5,
      ease: "none",
      scrollTrigger: {
        trigger: "#enterprise-cta",
        start: "top 80%",
        end: "top 20%",
        scrub: 1.5
      }
    });
  });

  return ctx;
}
