import React from 'react';

interface TLDRProps {
  children: React.ReactNode;
}

export default function TLDR({ children }: TLDRProps) {
  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      border: '1px solid #dee2e6',
      borderRadius: '8px',
      padding: '16px',
      margin: '20px 0',
      borderLeft: '4px solid #007bff'
    }}>
      <strong style={{ color: '#007bff', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        TL;DR:
      </strong>
      <div style={{ marginTop: '8px' }}>
        {children}
      </div>
    </div>
  );
}