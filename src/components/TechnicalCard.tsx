import React from 'react';

type CardType = 'implementation' | 'performance' | 'edge-case' | 'security' | 'architecture';

interface TechnicalCardProps {
  type: CardType;
  title: string;
  children: React.ReactNode;
  compact?: boolean;
}

const cardConfig = {
  implementation: {
    icon: '💾',
    label: 'Implementation Note',
    color: '#0969da',
    bgColor: 'rgba(9, 105, 218, 0.1)',
    borderColor: 'rgba(9, 105, 218, 0.3)'
  },
  performance: {
    icon: '⚡',
    label: 'Performance Insight',
    color: '#bf8700', 
    bgColor: 'rgba(191, 135, 0, 0.1)',
    borderColor: 'rgba(191, 135, 0, 0.3)'
  },
  'edge-case': {
    icon: '🐛',
    label: 'Edge Case',
    color: '#cf222e',
    bgColor: 'rgba(207, 34, 46, 0.1)', 
    borderColor: 'rgba(207, 34, 46, 0.3)'
  },
  security: {
    icon: '🔒',
    label: 'Security Note',
    color: '#8250df',
    bgColor: 'rgba(130, 80, 223, 0.1)',
    borderColor: 'rgba(130, 80, 223, 0.3)'
  },
  architecture: {
    icon: '🏗️',
    label: 'Architecture Detail',
    color: '#1a7f37',
    bgColor: 'rgba(26, 127, 55, 0.1)',
    borderColor: 'rgba(26, 127, 55, 0.3)'
  }
};

export default function TechnicalCard({ type, title, children, compact = false }: TechnicalCardProps) {
  const config = cardConfig[type];

  return (
    <div style={{
      backgroundColor: config.bgColor,
      border: `1px solid ${config.borderColor}`,
      borderRadius: '8px',
      padding: compact ? '12px 16px' : '16px 20px',
      margin: compact ? '12px 0' : '16px 0',
      borderLeft: `4px solid ${config.color}`,
      position: 'relative',
      transition: 'all 0.2s ease-in-out'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-1px)';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: compact ? '8px' : '12px'
      }}>
        <span style={{ 
          fontSize: compact ? '1rem' : '1.1rem',
          marginRight: '8px'
        }}>
          {config.icon}
        </span>
        <strong style={{
          color: config.color,
          fontSize: compact ? '0.9rem' : '1rem',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {config.label}: {title}
        </strong>
      </div>

      {/* Content */}
      <div style={{
        fontSize: compact ? '0.9rem' : '1rem',
        lineHeight: '1.6',
        color: 'var(--ifm-color-content, #1c1e21)'
      }}>
        {children}
      </div>
    </div>
  );
}