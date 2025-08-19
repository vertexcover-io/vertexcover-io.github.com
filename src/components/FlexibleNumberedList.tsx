import React, { ReactNode } from 'react';

interface FlexibleNumberedListProps {
  children: ReactNode[];
  startNumber?: number;
}

export default function FlexibleNumberedList({ children, startNumber = 1 }: FlexibleNumberedListProps) {
  return (
    <ol style={{ 
      paddingLeft: '20px',
      margin: '16px 0',
      lineHeight: '1.6',
      listStyle: 'decimal',
      listStyleType: 'decimal',
      listStylePosition: 'outside'
    }} start={startNumber}>
      {children.map((child, index) => (
        <li key={index} style={{ 
          marginBottom: '8px',
          paddingLeft: '8px',
          display: 'list-item'
        }}>
          {child}
        </li>
      ))}
    </ol>
  );
}