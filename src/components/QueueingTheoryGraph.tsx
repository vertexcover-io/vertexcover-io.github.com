import React from 'react';

interface DataPoint {
  utilization: number;
  waitTimeMultiplier: number;
}

const QueueingTheoryGraph: React.FC = () => {
  // Generate data points for M/M/1 queue
  // Wait time = 1/(μ - λ) = 1/(1 - ρ) where ρ is utilization
  // Normalized as multiple of service time
  const generateDataPoints = (): DataPoint[] => {
    const points: DataPoint[] = [];
    // Start from 0 and go up to 0.98 to avoid infinity
    for (let util = 0; util <= 0.98; util += 0.02) {
      const waitTimeMultiplier = 1 / (1 - util);
      points.push({ utilization: util, waitTimeMultiplier });
    }
    return points;
  };

  const data = generateDataPoints();
  const maxWaitTime = 25; // Fixed cap for readability

  // SVG dimensions
  const width = 600;
  const height = 400;
  const margin = { top: 40, right: 30, bottom: 60, left: 80 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  // Scale functions
  const xScale = (util: number) => (util * chartWidth);
  const yScale = (waitTime: number) => chartHeight - (waitTime / maxWaitTime * chartHeight);

  // Generate path for the curve
  const pathData = data
    .filter(d => d.waitTimeMultiplier <= maxWaitTime)
    .map((d, i) => {
      const x = xScale(d.utilization);
      const y = yScale(d.waitTimeMultiplier);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

  // Key utilization points to highlight
  const keyPoints = [
    { util: 0.5, label: '50%', color: '#10b981' },
    { util: 0.8, label: '80%', color: '#f59e0b' },
    { util: 0.95, label: '95%', color: '#ef4444' }
  ];

  return (
    <div className="my-8 p-6 bg-gray-50 rounded-lg">
      <h3 className="text-xl font-semibold mb-4 text-center">
        Queue Wait Time vs System Utilization
      </h3>
      
      <div className="flex justify-center">
        <svg width={width} height={height} className="border border-gray-200">
          {/* Chart area background */}
          <rect 
            x={margin.left} 
            y={margin.top} 
            width={chartWidth} 
            height={chartHeight} 
            fill="white" 
            stroke="#e5e7eb"
          />
          
          {/* Grid lines */}
          {[0, 0.2, 0.4, 0.6, 0.8, 1.0].map(util => (
            <line
              key={util}
              x1={margin.left + xScale(util)}
              y1={margin.top}
              x2={margin.left + xScale(util)}
              y2={margin.top + chartHeight}
              stroke="#f3f4f6"
              strokeDasharray="2,2"
            />
          ))}
          
          {[0, 5, 10, 15, 20, 25].map(waitTime => (
            <line
              key={waitTime}
              x1={margin.left}
              y1={margin.top + yScale(waitTime)}
              x2={margin.left + chartWidth}
              y2={margin.top + yScale(waitTime)}
              stroke="#f3f4f6"
              strokeDasharray="2,2"
            />
          ))}
          
          {/* Main curve */}
          <path
            d={pathData}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            transform={`translate(${margin.left}, ${margin.top})`}
          />
          
          {/* Key points */}
          {keyPoints.map(point => {
            const waitTime = 1 / (1 - point.util);
            const x = margin.left + xScale(point.util);
            const y = margin.top + yScale(waitTime);
            
            return (
              <g key={point.util}>
                <circle
                  cx={x}
                  cy={y}
                  r="6"
                  fill={point.color}
                  stroke="white"
                  strokeWidth="2"
                />
                <text
                  x={x}
                  y={y - 15}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="bold"
                  fill={point.color}
                >
                  {point.label}
                </text>
                <text
                  x={x}
                  y={y + 25}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#6b7280"
                >
                  {waitTime.toFixed(1)}x
                </text>
              </g>
            );
          })}
          
          {/* Axes */}
          <line
            x1={margin.left}
            y1={margin.top + chartHeight}
            x2={margin.left + chartWidth}
            y2={margin.top + chartHeight}
            stroke="#374151"
            strokeWidth="2"
          />
          <line
            x1={margin.left}
            y1={margin.top}
            x2={margin.left}
            y2={margin.top + chartHeight}
            stroke="#374151"
            strokeWidth="2"
          />
          
          {/* X-axis labels */}
          {[0, 0.2, 0.4, 0.6, 0.8, 1.0].map(util => (
            <text
              key={util}
              x={margin.left + xScale(util)}
              y={margin.top + chartHeight + 20}
              textAnchor="middle"
              fontSize="12"
              fill="#374151"
            >
              {(util * 100).toFixed(0)}%
            </text>
          ))}
          
          {/* Y-axis labels */}
          {[0, 5, 10, 15, 20, 25].map(waitTime => (
            <text
              key={waitTime}
              x={margin.left - 10}
              y={margin.top + yScale(waitTime) + 4}
              textAnchor="end"
              fontSize="12"
              fill="#374151"
            >
              {waitTime}x
            </text>
          ))}
          
          {/* Axis titles */}
          <text
            x={margin.left + chartWidth / 2}
            y={height - 10}
            textAnchor="middle"
            fontSize="14"
            fontWeight="bold"
            fill="#374151"
          >
            System Utilization (ρ = λ/μ)
          </text>
          
          <text
            x={20}
            y={margin.top + chartHeight / 2}
            textAnchor="middle"
            fontSize="14"
            fontWeight="bold"
            fill="#374151"
            transform={`rotate(-90, 20, ${margin.top + chartHeight / 2})`}
          >
            Wait Time (Multiple of Service Time)
          </text>
        </svg>
      </div>
      
      <div className="mt-8 bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl p-6 border border-slate-200">
        <div className="mb-6">
          <h4 className="text-xl font-bold text-slate-800 mb-2">Key Insight</h4>
          <p className="text-slate-600 leading-relaxed">
            As utilization increases, wait times grow <span className="font-bold text-red-600">exponentially</span>. 
            Keep GPU utilization below 80% for predictable performance.
          </p>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-green-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="font-semibold text-slate-800">50% utilization</span>
            </div>
            <span className="text-green-700 font-bold">2x wait time</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-amber-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="font-semibold text-slate-800">80% utilization</span>
            </div>
            <span className="text-amber-700 font-bold">5x wait time</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-red-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="font-semibold text-slate-800">95% utilization</span>
            </div>
            <span className="text-red-700 font-bold">20x wait time</span>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">💡</span>
            </div>
            <div>
              <p className="text-blue-900 font-semibold mb-1">Design Rule</p>
              <p className="text-blue-800 text-sm">Target 70-80% maximum utilization to maintain predictable performance during traffic spikes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueueingTheoryGraph;