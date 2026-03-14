import React from 'react';
import LearnersCanvas from '../../components/three/LearnersCanvas';
import Nav from '../../components/sections/Nav';
import Footer from '../../components/sections/Footer';
import Button from '../../components/ui/Button';
import FeatureCard from '../../components/ui/FeatureCard';
import copy from '../../data/learner.copy.json';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const PlatformPage = () => {
  // Setup reveal hooks for different sections
  const heroReveal = useScrollReveal({ stagger: 0.2, yOffset: 30, duration: 1, delay: 0.1 });
  const trustReveal = useScrollReveal({ yOffset: 20 });
  const hiwReveal = useScrollReveal({ stagger: 0.15, start: 'top 70%' });
  const testimonialsReveal = useScrollReveal({ yOffset: 40 });
  const faqReveal = useScrollReveal({ stagger: 0.15 });
  const ctaReveal = useScrollReveal({ yOffset: 50, duration: 1 });

  return (
    <div className="bg-transparent text-white relative">
      <Nav type="learner" />
      <LearnersCanvas />
      
      <div className="relative z-10 w-full overflow-x-hidden" id="main-scroll-container">
        
        {/* HERO SECTION */}
        <section id="hero" ref={heroReveal.containerRef} className="h-screen w-full flex flex-col items-center justify-center text-center px-6 mt-[-4rem]">
            <div ref={(el) => heroReveal.elementsRef.current[0] = el} className="inline-block border border-cosmic-primary text-cosmic-primary px-4 py-1 rounded-full font-mono text-xs mb-6 tracking-widest backdrop-blur-md bg-cosmic-dark/30">
               {copy.hero.eyebrow}
            </div>
            <h1 ref={(el) => heroReveal.elementsRef.current[1] = el} className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.1] max-w-4xl text-white mb-6 opacity-0 translate-y-8">
                {copy.hero.headline}
            </h1>
            <p ref={(el) => heroReveal.elementsRef.current[2] = el} className="font-body text-xl text-gray-300 max-w-2xl mb-10 opacity-0 translate-y-8">
                {copy.hero.subheadline}
            </p>
            <div ref={(el) => heroReveal.elementsRef.current[3] = el} className="flex flex-col sm:flex-row gap-4 opacity-0 translate-y-8">
                <Button variant="primary">{copy.hero.primaryCta}</Button>
                <Button variant="secondary">{copy.hero.secondaryCta}</Button>
            </div>
        </section>

        {/* TRUST BAR */}
        <section id="trust-bar" ref={trustReveal.containerRef} className="w-full py-10 border-y border-white/10 bg-cosmic-dark/40 backdrop-blur-md">
            <div ref={(el) => trustReveal.elementsRef.current[0] = el} className="max-w-[1280px] mx-auto px-6 text-center opacity-0 translate-y-4">
                <p className="text-gray-400 font-body text-sm mb-6 uppercase tracking-wider">{copy.trust.microcopy}</p>
                <div className="flex flex-wrap items-center justify-center gap-12 opacity-50">
                     <span className="font-display text-xl font-bold tracking-widest">IIT MADRAS</span>
                     <span className="font-display text-xl font-bold tracking-widest">IISC</span>
                     <span className="font-display text-xl font-bold tracking-widest">STANFORD</span>
                     <span className="font-display text-xl font-bold tracking-widest">MIT</span>
                </div>
            </div>
        </section>

        {/* HOW IT WORKS (Pinned GSAP via LearnerScene, stagger via React GSAP) */}
        <section id="how-it-works" ref={hiwReveal.containerRef} className="w-full pt-24 px-6 bg-gradient-to-b from-transparent to-cosmic-dark/80 relative">
            <div className="hiw-pin-target min-h-screen flex items-center w-full">
                <div className="max-w-[1280px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                       <h2 ref={(el) => hiwReveal.elementsRef.current[0] = el} className="font-display text-[clamp(2rem,4vw,3.5rem)] mb-12 opacity-0 translate-y-4">{copy.howItWorks.headline}</h2>
                       <div className="flex flex-col gap-12 border-l border-[var(--color-orbit)] pl-8 ml-4">
                           {copy.howItWorks.steps.map((step, idx) => (
                               <div key={idx} className="hiw-step relative opacity-20 transform -translate-x-4">
                                   <div className="absolute -left-[45px] top-0 w-6 h-6 rounded-full bg-cosmic-dark border-2 border-cosmic-primary" />
                                   <h3 className="font-display text-2xl text-cosmic-primary mb-2">Step {idx + 1}</h3>
                                   <p className="font-body text-xl text-gray-300">{step}</p>
                               </div>
                           ))}
                       </div>
                    </div>
                    <div className="hidden md:block"></div>
                </div>
            </div>
        </section>
        
        {/* FEATURES GRID */}
        {/* Note: Cards stagger managed natively in learnerScrollController for global timeline syncing */}
        <section id="features" className="min-h-screen w-full py-32 px-6">
            <div className="max-w-[1280px] mx-auto">
                <div className="text-center mb-20">
                     <h2 className="font-display text-4xl mb-4">Everything you need to master anything</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     <FeatureCard iconName="Brain" title="Adaptive Memory" description="AI builds a spaced repetition schedule specific to your forgetfulness curve." />
                     <FeatureCard iconName="MapTrifold" title="Knowledge Maps" description="Visualize what you know and discover the prerequisites you're missing." />
                     <FeatureCard iconName="Lightning" title="Fast Tracking" description="Bypass what you already know with dynamic pre-assessments." />
                     <FeatureCard iconName="Graph" title="Prerequisite Trees" description="Understand the foundational dependencies of every advanced concept." />
                     <FeatureCard iconName="Target" title="Goal Setting" description="Define your destination and let the AI build the curriculum to get you there." />
                     <FeatureCard iconName="Trophy" title="Mastery Badges" description="Earn verifiable credentials as you lock in core conceptual modules." />
                </div>
            </div>
        </section>
        
        {/* TESTIMONIALS */}
        <section id="testimonials" ref={testimonialsReveal.containerRef} className="bg-cosmic-dark/60 py-32 border-y border-[var(--color-orbit)] w-full">
            <div ref={(el) => testimonialsReveal.elementsRef.current[0] = el} className="max-w-[1280px] mx-auto px-6 text-center opacity-0 translate-y-8">
                <h2 className="font-display text-4xl mb-16">What Learners Say</h2>
                <div className="bg-[rgba(30,41,59,0.6)] border border-[var(--color-orbit)] rounded-[var(--radius-card)] p-12 max-w-3xl mx-auto">
                    <p className="font-body text-xl text-gray-300 italic mb-8">"I used to get stuck constantly, jumping between tutorials. ZeroEka mapped out exactly what I needed to learn to comprehend machine learning visually."</p>
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-600"></div>
                        <div className="text-left">
                            <div className="font-display text-white">Alex M.</div>
                            <div className="font-body text-sm text-cosmic-primary">Data Science Student</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* FAQ */}
        <section ref={faqReveal.containerRef} className="py-32 w-full bg-cosmic-dark relative z-10 px-6">
             <div className="max-w-[800px] mx-auto">
                 <h2 ref={(el) => faqReveal.elementsRef.current[0] = el} className="font-display text-4xl mb-12 text-center opacity-0 translate-y-4">Frequently Asked Questions</h2>
                 <div className="border border-[var(--color-orbit)] rounded-xl overflow-hidden">
                      <div ref={(el) => faqReveal.elementsRef.current[1] = el} className="p-6 border-b border-[var(--color-orbit)] bg-white/5 opacity-0 translate-y-4">
                           <h3 className="font-display text-xl mb-2">{copy.faq.q1.question}</h3>
                           <p className="font-body text-gray-400">{copy.faq.q1.answer}</p>
                      </div>
                      <div ref={(el) => faqReveal.elementsRef.current[2] = el} className="p-6 border-b border-[var(--color-orbit)] opacity-0 translate-y-4">
                           <h3 className="font-display text-xl text-gray-400">Do you offer certificates?</h3>
                      </div>
                      <div ref={(el) => faqReveal.elementsRef.current[3] = el} className="p-6 opacity-0 translate-y-4">
                           <h3 className="font-display text-xl text-gray-400">How does the AI tutor work?</h3>
                      </div>
                 </div>
             </div>
        </section>
        
        {/* FINAL CTA (Launch) */}
        <section id="final-cta" ref={ctaReveal.containerRef} className="h-screen w-full flex items-center justify-center text-center px-6 relative overflow-hidden bg-transparent">
            <div ref={(el) => ctaReveal.elementsRef.current[0] = el} className="relative z-10 p-12 rounded-2xl border border-cosmic-primary/30 bg-cosmic-dark/40 backdrop-blur-md max-w-2xl opacity-0 translate-y-8">
              <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] text-white mb-6">{copy.cta.headline}</h2>
              <p className="font-body text-xl text-gray-300 mb-10">Stop watching tutorials. Start building your expertise graph.</p>
              <Button variant="primary" className="!px-12 !py-4 text-xl">Launch Now</Button>
            </div>
        </section>

      </div>
      
      <Footer type="learner" />
    </div>
  );
};

export default PlatformPage;