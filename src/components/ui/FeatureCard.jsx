import React from 'react';
import * as Icons from 'phosphor-react';

const FeatureCard = ({ iconName, title, description, variant = 'learner' }) => {
  const Icon = Icons[iconName] || Icons.Circle; // fallback

  const glowColorClass = variant === 'learner' 
    ? 'hover:border-[var(--color-violet-glow)] hover:shadow-[0_0_15px_rgba(124,58,237,0.1)]'
    : 'hover:border-[var(--color-gold-glow)] hover:shadow-[0_0_15px_rgba(245,166,35,0.1)]';

  const iconColorClass = variant === 'learner' ? 'text-cosmic-primary' : 'text-cosmic-accent';

  return (
    <div className={`feature-card bg-[rgba(30,41,59,0.6)] border border-[var(--color-orbit)] rounded-[var(--radius-card)] p-8 transition-all duration-300 ease-in-out ${glowColorClass}`}>
      <div className={`mb-6 ${iconColorClass}`} aria-hidden="true">
        <Icon size={48} weight="fill" />
      </div>
      <h3 className="font-display text-xl text-white mb-3">{title}</h3>
      <p className="font-body text-gray-300">{description}</p>
    </div>
  );
};

export default FeatureCard;
