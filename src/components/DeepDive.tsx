import React, { useState } from 'react';

interface DeepDiveProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export default function DeepDive({ title, children, defaultExpanded = false }: DeepDiveProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div style={{
      backgroundColor: 'var(--ifm-background-surface-color, #ffffff)',
      border: '1px solid var(--ifm-color-emphasis-300, #d0d7de)',
      borderRadius: '12px',
      margin: '20px 0',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      transition: 'all 0.2s ease-in-out'
    }}>
      {/* Header/Toggle Button */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          backgroundColor: 'var(--ifm-color-emphasis-100, #f6f8fa)',
          padding: '16px 20px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: isExpanded ? '1px solid var(--ifm-color-emphasis-200, #e3e5e7)' : 'none',
          transition: 'background-color 0.2s ease-in-out',
          userSelect: 'none'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--ifm-color-emphasis-200, #e3e5e7)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--ifm-color-emphasis-100, #f6f8fa)';
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ 
            fontSize: '1.2rem',
            marginRight: '8px'
          }}>
            🔍
          </span>
          <strong style={{ 
            color: 'var(--ifm-color-primary, #2e8555)',
            fontSize: '1.1rem',
            fontWeight: '600'
          }}>
            Deep Dive: {title}
          </strong>
        </div>
        <div style={{
          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease-in-out',
          fontSize: '1.2rem',
          color: 'var(--ifm-color-emphasis-600, #656d76)'
        }}>
          ▼
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div style={{
          padding: '20px 24px',
          fontSize: '1rem',
          lineHeight: '1.7',
          color: 'var(--ifm-color-content, #1c1e21)',
          animation: 'fadeIn 0.3s ease-in-out'
        }}>
          {children}
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `
      }} />
    </div>
  );
}