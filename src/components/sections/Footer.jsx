import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = ({ type = 'learner' }) => {
  const isLearner = type === 'learner';
  const highlightColor = isLearner ? 'text-cosmic-primary' : 'text-cosmic-accent';

  return (
    <footer className="w-full bg-cosmic-dark border-t border-[var(--color-orbit)] pt-16 pb-8 px-6 relative z-10">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
            <h3 className={`font-display text-2xl ${highlightColor} mb-4 flex items-center gap-2`}>
               <span className="text-xl">◇</span> ZeroEka
            </h3>
            <p className="text-gray-400 font-body max-w-sm">
              Empowering the next generation of learning through AI and dynamic knowledge mapping.
            </p>
        </div>

        <div>
            <h4 className="text-white font-body font-bold mb-4">Platform</h4>
            <ul className="flex flex-col gap-2 text-gray-400 font-body">
                <li><NavLink to="/platform" className="hover:text-white">Learners</NavLink></li>
                <li><NavLink to="/enterprise" className="hover:text-white">Enterprise</NavLink></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
            </ul>
        </div>

        <div>
            <h4 className="text-white font-body font-bold mb-4">Legal</h4>
            <ul className="flex flex-col gap-2 text-gray-400 font-body">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            </ul>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto mt-16 pt-8 border-t border-[var(--color-orbit)] text-center text-gray-500 font-body text-sm">
        © {new Date().getFullYear()} ZeroEka. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
