import React from 'react';

export interface ComparisonColumn {
  text: string;
  score: 'good' | 'medium' | 'poor';
}

export interface ComparisonRow {
  feature: string;
  [key: string]: string | ComparisonColumn;
}

export interface ComparisonTableProps {
  data: ComparisonRow[];
  columns: string[];
  columnHeaders: string[];
}

const getBackgroundColor = (score: 'good' | 'medium' | 'poor'): string => {
  switch (score) {
    case 'good': return 'var(--comparison-good)';
    case 'medium': return 'var(--comparison-medium)';
    case 'poor': return 'var(--comparison-poor)';
  }
};

export default function ComparisonTable({ data, columns, columnHeaders }: ComparisonTableProps) {
  return (
    <div style={{ overflowX: 'auto', margin: '20px 0' }}>
      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        fontSize: '14px',
        border: '1px solid var(--comparison-border)'
      }}>
        <thead>
          <tr style={{ backgroundColor: 'var(--comparison-header-bg)' }}>
            <th style={{ 
              padding: '12px', 
              textAlign: 'left', 
              borderBottom: '2px solid var(--comparison-border)',
              fontWeight: 'bold'
            }}>
              Feature
            </th>
            {columnHeaders.map((header, index) => (
              <th key={index} style={{ 
                padding: '12px', 
                textAlign: 'left', 
                borderBottom: '2px solid var(--comparison-border)',
                fontWeight: 'bold'
              }}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td style={{ 
                padding: '12px', 
                borderBottom: '1px solid var(--comparison-border)',
                fontWeight: 'bold'
              }}>
                {row.feature}
              </td>
              {columns.map((column, colIndex) => {
                const cellData = row[column] as ComparisonColumn;
                return (
                  <td key={colIndex} style={{ 
                    padding: '12px', 
                    borderBottom: '1px solid var(--comparison-border)',
                    backgroundColor: getBackgroundColor(cellData.score)
                  }}>
                    {cellData.text}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}