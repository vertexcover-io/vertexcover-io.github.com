import React, { ReactNode } from 'react';

interface FlexibleNumberedListProps {
  children: ReactNode[];
  startNumber?: number;
}

export default function FlexibleNumberedList({ children, startNumber = 1 }: FlexibleNumberedListProps) {
  return (
    <ol 
      className="pl-5 my-4 leading-relaxed list-decimal list-outside"
      start={startNumber}
    >
      {children.map((child, index) => (
        <li key={index} className="mb-2 pl-2">
          {child}
        </li>
      ))}
    </ol>
  );
}