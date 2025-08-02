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

  // --- Chart Constants ---
  const SVG_WIDTH = 520;
  const SVG_HEIGHT = 280;
  const PADDING = { top: 40, right: 20, bottom: 40, left: 60 };
  
  const PLOT_WIDTH = SVG_WIDTH - PADDING.left - PADDING.right;
  const PLOT_HEIGHT = SVG_HEIGHT - PADDING.top - PADDING.bottom;
  
  const MIN_WAIT_TIME = 1;
  const MAX_WAIT_TIME = 20;

  const data: DataPoint[] = [
    { utilization: 0, waitTime: 1, label: '0%', color: '#10b981' },
    { utilization: 0.2, waitTime: 1.25, label: '20%', color: '#10b981' },
    { utilization: 0.5, waitTime: 2, label: '50%', color: '#10b981' },
    { utilization: 0.8, waitTime: 5, label: '80%', color: '#f59e0b' },
    { utilization: 0.95, waitTime: 20, label: '95%', color: '#ef4444' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // --- Coordinate Calculation Helpers ---
  const getX = (utilization: number): number => {
    return PADDING.left + utilization * PLOT_WIDTH;
  };

  const getY = (waitTime: number): number => {
    // Clamp the waitTime to prevent it from going outside the chart's vertical bounds
    const clampedWaitTime = Math.max(MIN_WAIT_TIME, Math.min(waitTime, MAX_WAIT_TIME));
    const percentage = (clampedWaitTime - MIN_WAIT_TIME) / (MAX_WAIT_TIME - MIN_WAIT_TIME);
    return PADDING.top + PLOT_HEIGHT - (percentage * PLOT_HEIGHT);
  };
  
  const createCurvePath = (): string => {
    let path = '';
    // Increase the number of points for a smoother curve
    for (let i = 0; i <= 100; i++) {
      const utilization = (i / 100) * 0.99; // Go up to 99% utilization
      const waitTime = 1 / (1 - utilization);
      
      const x = getX(utilization);
      const y = getY(waitTime);
      
      if (i === 0) {
        path += `M ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    }
    return path;
  };

  const getPointCoordinates = (utilization: number) => {
    const theoreticalWaitTime = 1 / (1 - Math.min(utilization, 0.99));
    return { x: getX(utilization), y: getY(theoreticalWaitTime) };
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
        <div className="backdrop-blur-xl bg-white bg-opacity-40 rounded-3xl border border-white border-opacity-30 shadow-2xl p-4 md:p-8 mb-6 md:mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-white opacity-30 via-transparent to-transparent opacity-50 rounded-3xl"></div>
          
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 md:mb-8 text-center relative z-10">
            Queue Wait Time vs. System Utilization
          </h1>

          <div className="relative z-10 flex justify-center overflow-x-auto">
            <svg width={SVG_WIDTH} height={SVG_HEIGHT} viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} className="min-w-[520px] md:min-w-0 w-full max-w-2xl">
              <defs>
                <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="70%" stopColor="#f59e0b" />
                  <stop offset="95%" stopColor="#ef4444" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
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
                  x1={getX(val)} y1={PADDING.top}
                  x2={getX(val)} y2={PADDING.top + PLOT_HEIGHT}
                  stroke="rgba(156, 163, 175, 0.2)" strokeWidth="1"
                />
              ))}
              
              {[1, 5, 10, 15, 20].map(val => (
                <line
                  key={`h-${val}`}
                  x1={PADDING.left} y1={getY(val)}
                  x2={PADDING.left + PLOT_WIDTH} y2={getY(val)}
                  stroke="rgba(156, 163, 175, 0.2)" strokeWidth="1"
                />
              ))}

              {/* Curve */}
              <path
                d={createCurvePath()}
                fill="none"
                stroke="url(#curveGradient)"
                strokeWidth="4"
                filter="url(#glow)"
                style={{
                  strokeDasharray: 1000,
                  strokeDashoffset: isAnimated ? 0 : 1000,
                  transition: 'stroke-dashoffset 2s ease-in-out'
                }}
              />

              {/* Data points */}
              {data.map((point, index) => {
                const coords = getPointCoordinates(point.utilization);
                const isHovered = hoveredPoint === index;
                
                return (
                  <g key={index} transform={`translate(${coords.x}, ${coords.y})`}>
                    <circle
                      r={isHovered ? 10 : 6} fill={point.color} stroke="white" strokeWidth="2"
                      className="cursor-pointer transition-all duration-300"
                      onMouseEnter={() => setHoveredPoint(index)} onMouseLeave={() => setHoveredPoint(null)}
                    />
                    <text
                      y={-18} fill="#374151" textAnchor="middle"
                      className="text-sm font-semibold pointer-events-none"
                    >
                      {point.label}
                    </text>
                    
                    {isHovered && (
                      <g className="pointer-events-none">
                        <rect x="-40" y="18" width="80" height="28" rx="5" fill="rgba(0,0,0,0.9)" />
                        <text x="0" y="37" fill="white" textAnchor="middle" className="text-xs font-bold">
                          ~{point.waitTime.toFixed(1)}x Wait
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* Axis labels */}
              <text x={PADDING.left + PLOT_WIDTH / 2} y={SVG_HEIGHT - 5} fill="#374151" textAnchor="middle" className="text-sm font-medium">
                System Utilization (ρ)
              </text>
              <text x={PADDING.left-50} y={PADDING.top + PLOT_HEIGHT / 2} fill="#374151" textAnchor="middle" className="text-sm font-medium" transform={`rotate(-90 ${PADDING.left-50} ${PADDING.top + PLOT_HEIGHT / 2})`}>
                Avg. Wait Time
              </text>

              {/* Y-axis labels */}
              {[1, 5, 10, 15, 20].map((val) => (
                <text
                  key={`label-y-${val}`}
                  x={PADDING.left - 8} y={getY(val) + 4}
                  fill="#6b7280" textAnchor="end" className="text-xs"
                >
                  {val}x
                </text>
              ))}

              {/* X-axis labels */}
              {[0, 0.2, 0.4, 0.6, 0.8, 1.0].map((val) => (
                <text
                  key={`label-x-${val}`}
                  x={getX(val)} y={PADDING.top + PLOT_HEIGHT + 15}
                  fill="#6b7280" textAnchor="middle" className="text-xs"
                >
                  {`${val * 100}%`}
                </text>
              ))}
            </svg>
          </div>
        </div>
        
        {/* Info Cards Row (Unchanged) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2 backdrop-blur-xl bg-white bg-opacity-40 rounded-2xl border border-white border-opacity-30 shadow-xl p-4 md:p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white opacity-20 via-transparent to-transparent opacity-30 rounded-2xl"></div>
            <div className="relative z-10">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Key Insight</h3>
              <p className="text-gray-700 mb-4 text-sm md:text-base">
                As system load (utilization) nears its maximum capacity (100%), the time a new task has to wait in the queue increases <span className="text-red-600 font-bold">exponentially</span>, not linearly.
              </p>
              <div className="space-y-2 md:space-y-3">
                {[
                  { level: 'Safe Zone (Under 80%)', time: 'Predictable & Fast', color: 'bg-emerald-500' },
                  { level: 'Danger Zone (80-95%)', time: 'Wait times skyrocket', color: 'bg-amber-500' },
                  { level: 'Collapse (Above 95%)', time: 'System becomes unstable', color: 'bg-red-500' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 backdrop-blur-sm bg-white bg-opacity-30 rounded-lg border border-white border-opacity-20">
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
          <div className="backdrop-blur-xl bg-white bg-opacity-40 rounded-2xl border border-white border-opacity-30 shadow-xl p-4 md:p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tl from-blue-500 opacity-10 via-transparent to-transparent opacity-50 rounded-2xl"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/80 flex items-center justify-center mr-3 border-2 border-white/50">
                  <span className="text-white font-bold text-xl">💡</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-800">Design Rule</h3>
              </div>
              <p className="text-gray-700 text-sm md:text-base">
                To maintain a stable and predictable system, design your auto-scaling and rate-limiting to keep average utilization below the <b className="text-blue-700">~80% "knee"</b> of the curve.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueueWaitChart;