import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../ui/Button';
import { List, X } from 'phosphor-react';

const Nav = ({ type = 'learner' }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLearner = type === 'learner';
  const ctaVariant = isLearner ? 'primary' : 'primaryEnterprise';
  
  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${scrolled ? 'backdrop-blur-[12px] bg-[rgba(5,8,20,0.8)]' : 'bg-transparent'}`}>
      <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <NavLink to={isLearner ? "/platform" : "/enterprise"} className="text-white font-display text-xl tracking-wide flex items-center gap-2">
            <div className="w-7 h-7 flex items-center justify-center border border-white/60 rounded-md">
                <span className="text-xl">◇</span>
            </div>
            ZeroEka
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-white font-body">
          <NavLink to="/platform" className={({isActive}) => isActive ? "text-cosmic-primary" : "hover:text-gray-300"}>For Learners</NavLink>
          <NavLink to="/enterprise" className={({isActive}) => isActive ? "text-cosmic-accent" : "hover:text-gray-300"}>For Enterprise</NavLink>
          <NavLink to="#about" className="hover:text-gray-300">About</NavLink>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex">
             <Button variant={ctaVariant}>
               {isLearner ? "Get Started" : "Book a Demo"}
             </Button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <List size={28} />}
        </button>

      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-20 left-0 w-full h-screen bg-cosmic-dark p-6 flex flex-col gap-6">
           <NavLink to="/platform" onClick={() => setMobileMenuOpen(false)} className="text-white text-xl">For Learners</NavLink>
           <NavLink to="/enterprise" onClick={() => setMobileMenuOpen(false)} className="text-white text-xl">For Enterprise</NavLink>
           <Button variant={ctaVariant} className="mt-4 w-full">
               {isLearner ? "Get Started" : "Book a Demo"}
           </Button>
        </div>
      )}
    </nav>
  );
}

export default Nav;
