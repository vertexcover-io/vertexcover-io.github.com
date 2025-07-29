import React from "react";

interface CalendlyButtonProps {
  url: string;
  text: string;
  description?: string;
}

/**
 * Fancy Calendly CTA button component
 */
const CalendlyButton: React.FC<CalendlyButtonProps> = ({ url, text, description }) => {
  return (
    <div style={{
      textAlign: 'center',
      margin: '2em 0',
      padding: '1.5em',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '12px',
      boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
      transform: 'translateY(0)',
      transition: 'all 0.3s ease'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 12px 40px rgba(102, 126, 234, 0.4)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 8px 32px rgba(102, 126, 234, 0.3)';
    }}>
      <a 
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          background: 'white',
          color: '#4c51bf',
          padding: '16px 32px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '1.1em',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
        }}
      >
        {text}
      </a>
      {description && (
        <p style={{
          color: 'white',
          margin: '1em 0 0 0',
          fontSize: '0.95em',
          opacity: 0.9
        }}>
          {description}
        </p>
      )}
    </div>
  );
};

export default CalendlyButton;