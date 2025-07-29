import React from 'react';

interface NumberedListProps {
  items: string[];
  startNumber?: number;
}

export default function NumberedList({ items, startNumber = 1 }: NumberedListProps) {
  return (
    <ol style={{ 
      paddingLeft: '20px',
      margin: '16px 0',
      lineHeight: '1.6',
      listStyle: 'decimal',
      listStyleType: 'decimal',
      listStylePosition: 'outside'
    }} start={startNumber}>
      {items.map((item, index) => (
        <li key={index} style={{ 
          marginBottom: '8px',
          paddingLeft: '8px',
          display: 'list-item'
        }}>
          {item}
        </li>
      ))}
    </ol>
  );
}