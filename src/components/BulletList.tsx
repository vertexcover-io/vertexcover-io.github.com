import React from 'react';

interface BulletListProps {
  items: (string | React.ReactNode)[];
}

export default function BulletList({ items }: BulletListProps) {
  return (
    <ul style={{ 
      paddingLeft: '20px',
      margin: '16px 0',
      lineHeight: '1.6',
      listStyle: 'disc',
      listStyleType: 'disc',
      listStylePosition: 'outside'
    }}>
      {items.map((item, index) => (
        <li key={index} style={{ 
          marginBottom: '8px',
          paddingLeft: '8px',
          display: 'list-item'
        }}>
          {item}
        </li>
      ))}
    </ul>
  );
}