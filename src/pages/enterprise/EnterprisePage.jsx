import React from 'react';
import EnterpriseCanvas from '../../components/three/EnterpriseCanvas';
import Nav from '../../components/sections/Nav';
import Footer from '../../components/sections/Footer';
import Button from '../../components/ui/Button';
import copy from '../../data/enterprise.copy.json';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useCountUp } from '../../hooks/useCountUp';

const StatCounter = ({ endValue, prefix = '', suffix = '', text }) => {
  const { nodeRef, displayValue } = useCountUp(endValue, 2, prefix, suffix);
  return (
    <div ref={nodeRef} className="px-6 py-4">
         <p className="font-display text-4xl text-cosmic-accent font-bold mb-2">{displayValue}</p>
         <p className="font-body text-sm text-gray-400">{text}</p>
    </div>
  );
};

const EnterprisePage = () => {
  // Hooks setup
  const heroReveal = useScrollReveal({ stagger: 0.2, yOffset: 30, duration: 1, delay: 0.1 });
  const statsReveal = useScrollReveal({ stagger: 0.15, yOffset: 20 });
  const useCasesReveal = useScrollReveal({ stagger: 0.15, start: 'top 75%' });
  const analyticsReveal = useScrollReveal({ stagger: 0.2, yOffset: 40 });
  const securityReveal = useScrollReveal({ yOffset: 30 });
  const ctaReveal = useScrollReveal({ yOffset: 50 });

  return (
    <div className="bg-transparent text-white relative">
      <Nav type="enterprise" />
      <EnterpriseCanvas />

      <div className="relative z-10 w-full overflow-x-hidden" id="main-scroll-container">
        
        {/* HERO SECTION */}
        <section id="enterprise-hero" ref={heroReveal.containerRef} className="h-[90vh] w-full flex flex-col items-center justify-center pt-20 px-6 text-center">
            <h1 ref={(el) => heroReveal.elementsRef.current[0] = el} className="font-display text-[clamp(2.5rem,6vw,5.5rem)] text-white max-w-5xl mb-6 leading-tight opacity-0 translate-y-8">
                {copy.hero.headline}
            </h1>
            <p ref={(el) => heroReveal.elementsRef.current[1] = el} className="font-body text-xl text-gray-300 max-w-3xl mb-10 opacity-0 translate-y-8">
                {copy.hero.subheadline}
            </p>
            <div ref={(el) => heroReveal.elementsRef.current[2] = el} className="flex flex-col sm:flex-row gap-4 opacity-0 translate-y-8">
                <Button variant="primaryEnterprise">{copy.hero.primaryCta}</Button>
                <Button variant="secondaryEnterprise">{copy.hero.secondaryCta}</Button>
            </div>
        </section>

        {/* L&D PROBLEM STATS */}
        <section id="stats" ref={statsReveal.containerRef} className="w-full py-16 bg-cosmic-dark/80 backdrop-blur-md border-y border-[var(--color-orbit)]">
            <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[var(--color-orbit)]">
                 <div ref={(el) => statsReveal.elementsRef.current[0] = el} className="opacity-0 translate-y-4">
                     <StatCounter endValue={68} suffix="%" text="of L&D leaders say their current LMS lacks personalisation" />
                 </div>
                 <div ref={(el) => statsReveal.elementsRef.current[1] = el} className="opacity-0 translate-y-4">
                     <StatCounter endValue={90} suffix="%" text="of training content forgotten within a week without reinforcement" />
                 </div>
                 <div ref={(el) => statsReveal.elementsRef.current[2] = el} className="opacity-0 translate-y-4">
                     <StatCounter endValue={13} prefix="$" suffix="M" text="lost annually per 1,000 employees to ineffective training" />
                 </div>
            </div>
        </section>

        {/* USE CASES & CLUSTER HIGHLIGHT */}
        <section id="use-cases" className="w-full bg-transparent py-32 px-6">
            <div className="enterprise-pin-target min-h-screen w-full flex items-center">
                <div className="max-w-[1280px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16">
                     {/* Left side UI content mapping to the Three.js cluster focus */}
                     <div className="bg-cosmic-dark/60 p-10 rounded-[var(--radius-card)] border border-[var(--color-orbit)] backdrop-blur-md">
                          <h2 className="font-display text-4xl mb-8 tracking-wide">Enterprise Solutions</h2>
                          <div className="space-y-6">
                               {copy.solutions.map((solution, idx) => (
                                   <div key={idx} className="solution-tile p-4 border-l-4 border-cosmic-accent bg-white/5 rounded-r-md opacity-20 transform -translate-x-4">
                                      <h3 className="font-body text-xl text-white">{solution.title}</h3>
                                      <p className="font-body text-sm text-gray-400 mt-2">{solution.description}</p>
                                   </div>
                               ))}
                          </div>
                     </div>
                     <div></div> {/* Right side is clear for Org Map visualization rotation */}
                </div>
            </div>
        </section>

        {/* ANALYTICS SECTION */}
        <section id="analytics" ref={analyticsReveal.containerRef} className="min-h-screen w-full flex flex-col items-center justify-center py-24 px-6 bg-gradient-to-b from-transparent to-cosmic-dark relative">
            <div ref={(el) => analyticsReveal.elementsRef.current[0] = el} className="text-center max-w-4xl mb-16 opacity-0 translate-y-4">
                <h2 className="font-display text-4xl mb-4 text-white">Full Cohort Visibility</h2>
                <p className="font-body text-xl text-gray-300">Measure learning velocity across your entire organizational graph.</p>
            </div>
            
            <div ref={(el) => analyticsReveal.elementsRef.current[1] = el} className="w-full max-w-5xl h-[600px] bg-[rgba(15,23,42,0.8)] border border-[var(--color-orbit)] rounded-xl shadow-2xl relative overflow-hidden backdrop-blur-xl opacity-0 translate-y-8 flex flex-col">
                 <div className="flex items-center gap-2 p-4 border-b border-white/5 bg-white/5">
                     <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                     <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                     <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                     <div className="ml-4 text-xs font-mono text-gray-500 tracking-wider">zeroeka / analytics / cohort-view</div>
                 </div>
                 <div className="flex flex-1 p-6 gap-6">
                     <div className="w-48 hidden md:flex flex-col gap-4 border-r border-white/10 pr-6 pt-2">
                         <div className="h-3 w-24 bg-cosmic-primary/40 rounded"></div>
                         <div className="h-3 w-32 bg-white/10 rounded mt-6"></div>
                         <div className="h-3 w-28 bg-white/10 rounded"></div>
                         <div className="h-3 w-20 bg-white/10 rounded"></div>
                         <div className="h-3 w-24 bg-white/10 rounded"></div>
                     </div>
                     <div className="flex-1 flex flex-col gap-6">
                         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                             <div className="h-24 bg-white/5 rounded-[var(--radius-card)] border border-white/10 p-4 flex flex-col justify-between">
                                 <span className="text-sm font-body text-gray-400 uppercase tracking-wider">Completion Rate</span>
                                 <span className="text-3xl font-display text-white">92%</span>
                             </div>
                             <div className="h-24 bg-white/5 rounded-[var(--radius-card)] border border-white/10 p-4 flex flex-col justify-between">
                                 <span className="text-sm font-body text-gray-400 uppercase tracking-wider">Active Learners</span>
                                 <span className="text-3xl font-display text-white">1,240</span>
                             </div>
                             <div className="h-24 bg-cosmic-dark rounded-[var(--radius-card)] border border-[var(--color-orbit)] shadow-[0_0_15px_rgba(245,166,35,0.1)] p-4 flex flex-col justify-between relative overflow-hidden">
                                 <div className="absolute top-0 right-0 w-16 h-16 bg-cosmic-accent/20 blur-xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
                                 <span className="text-sm font-body text-cosmic-primary relative z-10 uppercase tracking-wider">Avg. Velocity</span>
                                 <span className="text-3xl font-display text-cosmic-accent relative z-10">2.4x</span>
                             </div>
                         </div>
                         <div className="flex-1 bg-white/5 rounded-[var(--radius-card)] border border-white/10 p-6 flex flex-col justify-end gap-2 isolate relative overflow-hidden">
                             <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:2rem_2rem] z-[-1]"></div>
                             
                             <div className="flex items-end flex-wrap justify-between w-full h-[80%] z-10">
                                 {[40, 65, 45, 80, 55, 90, 70, 85, 60, 100].map((h, i) => (
                                     <div key={i} className="w-[6%] bg-gradient-to-t from-cosmic-primary/20 to-cosmic-primary/80 rounded-t-[4px] hover:to-cosmic-accent hover:shadow-[0_0_15px_rgba(245,166,35,0.5)] transition-all cursor-crosshair group relative" style={{ height: `${h}%` }}>
                                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity border border-white/20 pointer-events-none whitespace-nowrap shadow-xl">
                                             {h}% Cohort
                                          </div>
                                     </div>
                                 ))}
                             </div>
                             <div className="flex justify-between w-full text-xs font-mono text-gray-500 mt-2 border-t border-white/10 pt-3">
                                 <span>Jan</span>
                                 <span>Feb</span>
                                 <span>Mar</span>
                                 <span>Apr</span>
                                 <span>May</span>
                             </div>
                         </div>
                     </div>
                 </div>
            </div>
        </section>

        {/* SECURITY & TRUST */}
        <section ref={securityReveal.containerRef} className="py-24 bg-cosmic-dark px-6 border-t border-[var(--color-orbit)]">
            <div className="max-w-[1280px] mx-auto text-center">
                 <div ref={(el) => securityReveal.elementsRef.current[0] = el} className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cosmic-accent/20 text-cosmic-accent mb-6 opacity-0 scale-90">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M208,40H48A16,16,0,0,0,32,56V112c0,58.87,35,108.31,84.7,118.84a16.14,16.14,0,0,0,6.6,0C173,220.31,208,170.87,208,112V56A16,16,0,0,0,192,40ZM128,214.67c-40.41-8.54-64-50.51-64-102.67V56H192v56C192,164.16,168.41,206.13,128,214.67Z"></path><path d="M128,88a24,24,0,1,0,24,24A24,24,0,0,0,128,88Zm0,32a8,8,0,1,1,8-8A8,8,0,0,1,128,120Z"></path></svg>
                 </div>
                 <h2 ref={(el) => securityReveal.elementsRef.current[1] = el} className="font-display text-3xl mb-4 opacity-0 translate-y-4">{copy.security.headline}</h2>
                 <p ref={(el) => securityReveal.elementsRef.current[2] = el} className="font-body text-gray-400 max-w-2xl mx-auto opacity-0 translate-y-4">{copy.security.sla}</p>
            </div>
        </section>

        {/* ENTERPRISE CTA FORM */}
        <section id="enterprise-cta" ref={ctaReveal.containerRef} className="min-h-screen w-full flex items-center justify-center py-24 px-6 bg-transparent relative z-10">
            <div ref={(el) => ctaReveal.elementsRef.current[0] = el} className="max-w-xl w-full bg-cosmic-dark/90 p-10 rounded-2xl border border-cosmic-accent shadow-[0_0_50px_rgba(245,166,35,0.1)] backdrop-blur-xl opacity-0 translate-y-8">
                 <h2 className="font-display text-4xl mb-2 text-white text-center">Let's talk scale</h2>
                 <p className="font-body text-gray-400 text-center mb-8">Schedule a walkthrough with our solutions team.</p>
                 
                 <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                      <div>
                          <label htmlFor="work-email" className="text-sm font-body text-gray-300 block mb-1">Work Email</label>
                          <input id="work-email" type="email" placeholder="name@company.com" className="w-full bg-black/50 border border-gray-700 rounded-md p-3 text-white focus:outline-none focus:border-cosmic-accent transition-colors" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                              <label htmlFor="first-name" className="text-sm font-body text-gray-300 block mb-1">First Name</label>
                              <input id="first-name" type="text" className="w-full bg-black/50 border border-gray-700 rounded-md p-3 text-white focus:outline-none focus:border-cosmic-accent transition-colors" />
                          </div>
                          <div>
                              <label htmlFor="last-name" className="text-sm font-body text-gray-300 block mb-1">Last Name</label>
                              <input id="last-name" type="text" className="w-full bg-black/50 border border-gray-700 rounded-md p-3 text-white focus:outline-none focus:border-cosmic-accent transition-colors" />
                          </div>
                      </div>
                      <div>
                          <label htmlFor="company-size" className="text-sm font-body text-gray-300 block mb-1">Company Size</label>
                          <select id="company-size" className="w-full bg-black/50 border border-gray-700 rounded-md p-3 text-white focus:outline-none focus:border-cosmic-accent transition-colors">
                               <option>50 - 200</option>
                               <option>201 - 1000</option>
                               <option>1000+</option>
                          </select>
                      </div>
                      <Button variant="primaryEnterprise" className="w-full mt-4">Book Demo</Button>
                 </form>
            </div>
        </section>
      </div>

      <Footer type="enterprise" />
    </div>
  );
};

export default EnterprisePage;