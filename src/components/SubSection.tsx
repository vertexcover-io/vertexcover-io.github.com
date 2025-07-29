import React from 'react';

interface SubSectionProps {
  title: string;
  children: React.ReactNode;
  isLast?: boolean;
}

export default function SubSection({ title, children, isLast = false }: SubSectionProps) {
  return (
    <div style={{ 
      marginBottom: isLast ? '24px' : '32px',
      background: 'var(--ifm-background-surface-color, #ffffff)',
      borderRadius: '12px',
      padding: '24px',
      border: '1px solid var(--ifm-color-emphasis-200, #e3e5e7)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
      transition: 'all 0.2s ease-in-out'
    }}>
      {/* Clean subsection heading */}
      <h4 style={{ 
        fontSize: '1.3rem',
        fontWeight: '700',
        marginBottom: '16px',
        color: 'var(--ifm-color-primary, #2e8555)'
      }}>
        {title}
      </h4>
      
      {/* Subsection content */}
      <div style={{
        fontSize: '1rem',
        lineHeight: '1.7'
      }}>
        {children}
      </div>
    </div>
  );
}