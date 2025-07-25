import React, { useState, useEffect } from 'react';

interface DataPoint {
  utilization: number;
  waitTime: number;
  label: string;
  color: string;
}

const QueueWaitChart: React.FC = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const data: DataPoint[] = [
    { utilization: 0, waitTime: 1, label: '0', color: '#10b981' },
    { utilization: 0.2, waitTime: 1.25, label: '0.2', color: '#10b981' },
    { utilization: 0.5, waitTime: 2, label: '0.5', color: '#10b981' },
    { utilization: 0.8, waitTime: 5, label: '0.8', color: '#f59e0b' },
    { utilization: 0.95, waitTime: 20, label: '0.95', color: '#ef4444' }
  ];

  useEffect(() => {
    setTimeout(() => setIsAnimated(true), 300);
  }, []);

  const createCurvePath = () => {
    const width = 400;
    const height = 200;
    const padding = 60;
    
    // Create exponential curve: y = 1/(1-x) where x is utilization (0-0.99)
    // Y-axis should be positioned between 1x and 20x wait times
    let path = '';
    for (let i = 0; i <= 99; i++) {
      const utilization = i / 100; // 0 to 0.99
      const rho = Math.min(utilization, 0.99); // Prevent division by zero
      const waitTime = 1 / (1 - rho); // Exponential formula
      
      const x = padding + utilization * (width - 2 * padding);
      // Linear scale from 1 to 20: map waitTime directly to chart coordinates
      const y = height - padding - ((waitTime - 1) / 19) * (height - 2 * padding);
      
      if (i === 0) {
        path += `M ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    }
    
    return path;
  };

  const getPointCoordinates = (utilization: number, waitTime: number) => {
    const width = 400;
    const height = 200;
    const padding = 60;
    
    const x = padding + utilization * (width - 2 * padding);
    
    // Calculate theoretical wait time based on utilization (like the curve does)
    const rho = Math.min(utilization, 0.99);
    const theoreticalWaitTime = 1 / (1 - rho);
    
    // Linear scale from 1 to 20: map waitTime directly to chart coordinates
    const y = height - padding - ((theoreticalWaitTime - 1) / 19) * (height - 2 * padding);
    
    return { x, y };
  }; 
  
  return (
    <div className="w-full bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-4 md:p-8">
      {/* Ambient background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-10 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-500"></div>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Main Chart Container */}
        <div className="backdrop-blur-xl bg-white/40 rounded-3xl border border-white/30 shadow-2xl p-4 md:p-8 mb-6 md:mb-8 relative overflow-hidden">
          {/* Glass reflection effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent opacity-50 rounded-3xl"></div>
          
          {/* Title */}
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 md:mb-8 text-center relative z-10">
            Queue Wait Time vs System Utilization
          </h1>

          {/* Chart SVG */}
          <div className="relative z-10 flex justify-center overflow-x-auto">
            <svg width="520" height="280" viewBox="0 0 520 280" className="min-w-[520px] md:min-w-0 w-full max-w-2xl">
              {/* Grid lines */}
              <defs>
                <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/> 
                  </feMerge>
                </filter>
              </defs>

              {/* Grid */}
              {[0, 0.2, 0.4, 0.6, 0.8, 1.0].map(val => (
                <line
                  key={`v-${val}`}
                  x1={60 + val * 400}
                  y1={40}
                  x2={60 + val * 400}
                  y2={240}
                  stroke="rgba(100,100,100,0.2)"
                  strokeWidth="1"
                />
              ))}
              
              {[1, 2, 5, 10, 20].map((val, index) => (
                <line
                  key={`h-${val}`}
                  x1={60}
                  y1={240 - ((val - 1) / 19) * 200}
                  x2={460}
                  y2={240 - ((val - 1) / 19) * 200}
                  stroke="rgba(100,100,100,0.2)"
                  strokeWidth="1"
                />
              ))}

              {/* Curve */}
              <path
                d={createCurvePath()}
                fill="none"
                stroke="url(#curveGradient)"
                strokeWidth="4"
                filter="url(#glow)"
                className={`${isAnimated ? 'animate-pulse' : ''}`}
                style={{
                  strokeDasharray: isAnimated ? 'none' : '1000',
                  strokeDashoffset: isAnimated ? '0' : '1000',
                  transition: 'stroke-dashoffset 2s ease-in-out'
                }}
              />

              {/* Data points */}
              {data.map((point, index) => {
                const coords = getPointCoordinates(point.utilization, point.waitTime);
                const isHovered = hoveredPoint === index;
                
                return (
                  <g key={index}>
                    <circle
                      cx={coords.x}
                      cy={coords.y}
                      r={isHovered ? 10 : 6}
                      fill={point.color}
                      stroke="white"
                      strokeWidth="2"
                      filter="url(#glow)"
                      className="cursor-pointer transition-all duration-300"
                      onMouseEnter={() => setHoveredPoint(index)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                    <circle
                      cx={coords.x}
                      cy={coords.y}
                      r={isHovered ? 16 : 12}
                      fill="none"
                      stroke={point.color}
                      strokeWidth="2"
                      opacity={isHovered ? 0.4 : 0.2}
                      className="animate-ping"
                    />
                    
                    {/* Labels */}
                    <text
                      x={coords.x}
                      y={coords.y - 18}
                      fill="#374151"
                      textAnchor="middle"
                      className="text-sm font-semibold"
                    >
                      {point.label}
                    </text>
                    
                    {isHovered && (
                      <g>
                        <rect
                          x={coords.x - 25}
                          y={coords.y + 15}
                          width="50"
                          height="25"
                          rx="5"
                          fill="rgba(0,0,0,0.9)"
                          stroke="rgba(100,100,100,0.5)"
                          strokeWidth="1"
                        />
                        <text
                          x={coords.x}
                          y={coords.y + 32}
                          fill="white"
                          textAnchor="middle"
                          className="text-xs"
                        >
                          {point.waitTime}x wait time
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* Axis labels */}
              <text x={260} y={270} fill="#374151" textAnchor="middle" className="text-sm font-medium">
                System Utilization (ρ = λ/μ)
              </text>
              <text x={25} y={140} fill="#374151" textAnchor="middle" className="text-sm font-medium" transform="rotate(-90 25 140)">
                Wait Time (Multiple of Service Time)
              </text>

              {/* Y-axis labels */}
              {[1, 2, 5, 10, 20].map((val) => (
                <text
                  key={val}
                  x={50}
                  y={244 - ((val - 1) / 19) * 200}
                  fill="#6b7280"
                  textAnchor="end"
                  className="text-xs"
                >
                  {val}x
                </text>
              ))}

              {/* X-axis labels */}
              {[0, 0.2, 0.4, 0.6, 0.8, 1.0].map((val) => (
                <text
                  key={val}
                  x={60 + val * 400}
                  y={255}
                  fill="#6b7280"
                  textAnchor="middle"
                  className="text-xs"
                >
                  {val}
                </text>
              ))}
            </svg>
          </div>
        </div>

        {/* Info Cards Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Key Insight */}
          <div className="lg:col-span-2 backdrop-blur-xl bg-white/40 rounded-2xl border border-white/30 shadow-xl p-4 md:p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-30 rounded-2xl"></div>
            <div className="relative z-10">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Key Insight</h3>
              <p className="text-gray-700 mb-4 text-sm md:text-base">
                As utilization increases, wait times grow <span className="text-red-600 font-bold">exponentially</span>. 
                Keep CPU utilization below <span className="text-emerald-600 font-bold">0.8</span> for predictable performance.
              </p>
              
              {/* Performance indicators */}
              <div className="space-y-2 md:space-y-3">
                {[
                  { level: '0.5 utilization', time: '2x wait time', color: 'bg-emerald-500' },
                  { level: '0.8 utilization', time: '5x wait time', color: 'bg-amber-500' },
                  { level: '0.95 utilization', time: '20x wait time', color: 'bg-red-500' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 backdrop-blur-sm bg-white/30 rounded-lg border border-white/20">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${item.color} mr-3`}></div>
                      <span className="text-gray-800 text-sm md:text-base">{item.level}</span>
                    </div>
                    <span className="text-gray-600 font-medium text-sm md:text-base">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Design Rule */}
          <div className="backdrop-blur-xl bg-white/40 rounded-2xl border border-white/30 shadow-xl p-4 md:p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/10 via-transparent to-transparent opacity-50 rounded-2xl"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">💡</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-800">Design Rule</h3>
              </div>
              <p className="text-gray-700 text-sm md:text-base">
                Target <span className="text-blue-600 font-bold">0.7-0.8</span> maximum utilization to maintain predictable performance during traffic spikes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueueWaitChart;