import React from 'react';

interface HierarchySectionProps {
  title: string;
  children: React.ReactNode;
}

export default function HierarchySection({ title, children }: HierarchySectionProps) {
  return (
    <div style={{ 
      margin: '48px 0',
      background: 'var(--ifm-background-surface-color, #ffffff)',
      borderRadius: '12px',
      padding: '32px',
      border: '1px solid var(--ifm-color-emphasis-200, #e3e5e7)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
    }}>
      {/* Main heading with decorative element */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '8px'
        }}>
          <div style={{
            width: '4px',
            height: '32px',
            backgroundColor: 'var(--ifm-color-primary, #2e8555)',
            borderRadius: '2px',
            marginRight: '16px'
          }} />
          <h2 style={{ 
            fontSize: '1.8rem',
            fontWeight: '700',
            margin: '0',
            background: 'linear-gradient(135deg, var(--ifm-color-primary, #2e8555), var(--ifm-color-primary-light, #33925d))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            {title}
          </h2>
        </div>
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, var(--ifm-color-primary, #2e8555) 0%, transparent 100%)',
          width: '100%',
          opacity: 0.3
        }} />
      </div>
      
      {/* Content container - clean card layout */}
      <div style={{ 
        lineHeight: '1.7'
      }}>
        {children}
      </div>
    </div>
  );
}