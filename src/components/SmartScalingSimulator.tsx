import React, { useState, useMemo } from 'react';

const SmartScalingSimulator: React.FC = () => {
  const [coldStartTime, setColdStartTime] = useState<number>(3); // In minutes
  const [queueLength, setQueueLength] = useState<number>(8);   // In video-minutes

  // --- Chart Constants ---
  const SVG_WIDTH = 520;
  const SVG_HEIGHT = 300;
  const PADDING = { top: 40, right: 20, bottom: 50, left: 60 };
  const PLOT_WIDTH = SVG_WIDTH - PADDING.left - PADDING.right;
  const PLOT_HEIGHT = SVG_HEIGHT - PADDING.top - PADDING.bottom;
  const MAX_QUEUE_MINUTES = 20;
  const MAX_TIME_TO_COMPLETE = 20;

  // --- Coordinate Calculation Helpers ---
  const getX = (minutes: number): number => PADDING.left + (minutes / MAX_QUEUE_MINUTES) * PLOT_WIDTH;
  const getY = (time: number): number => PADDING.top + PLOT_HEIGHT - (time / MAX_TIME_TO_COMPLETE) * PLOT_HEIGHT;

  // --- Core Logic Calculation ---
  const { timeToWait, timeToScale, decision, breakevenPoint } = useMemo(() => {
    // Scenario 1: Wait for the current GPU to finish
    const timeToWait = queueLength;
    
    // Scenario 2: Pay the cold start cost, then process with 2 GPUs
    // (Assuming current fleet size is 1 for simplicity)
    const timeToScale = coldStartTime + (queueLength / 2);

    // The decision logic
    const decision = timeToWait > timeToScale ? "SCALE NOW" : "WAIT";

    // Calculate the breakeven point where TimeToWait = TimeToScale
    // q = coldStartTime + q/2  =>  q/2 = coldStartTime  =>  q = 2 * coldStartTime
    const breakeven = 2 * coldStartTime;

    return { timeToWait, timeToScale, decision, breakevenPoint: breakeven };
  }, [queueLength, coldStartTime]);

  // --- Path Generators ---
  const waitPath = `M ${getX(0)} ${getY(0)} L ${getX(MAX_QUEUE_MINUTES)} ${getY(MAX_QUEUE_MINUTES)}`;
  const scalePath = `M ${getX(0)} ${getY(coldStartTime)} L ${getX(MAX_QUEUE_MINUTES)} ${getY(coldStartTime + MAX_QUEUE_MINUTES / 2)}`;

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 via-indigo-50 to-blue-50 p-4 md:p-8">
      <div className="relative max-w-6xl mx-auto">
        <div className="backdrop-blur-xl bg-white bg-opacity-40 rounded-3xl border border-white border-opacity-30 shadow-2xl p-4 md:p-8 mb-6 md:mb-8">
          
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2 text-center">
            The GPU Scaling Decision
          </h1>
          <p className="text-center text-gray-600 mb-8">When is a cold start worth the cost?</p>
          
          {/* Interactive Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 px-4">
            <div>
              <label htmlFor="cold-start-slider" className="block text-sm font-medium text-gray-700">GPU Cold Start Time: <span className="font-bold text-indigo-600">{coldStartTime} min</span></label>
              <input id="cold-start-slider" type="range" min="2" max="5" step="0.5" value={coldStartTime} onChange={(e) => setColdStartTime(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
            </div>
            <div>
              <label htmlFor="queue-length-slider" className="block text-sm font-medium text-gray-700">Queued Work: <span className="font-bold text-teal-600">{queueLength} video-minutes</span></label>
              <input id="queue-length-slider" type="range" min="0" max={MAX_QUEUE_MINUTES} step="1" value={queueLength} onChange={(e) => setQueueLength(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600" />
            </div>
          </div>
          
          <div className="flex flex-col gap-8">
            {/* Chart Section */}
            <div className="flex justify-center">
              <div className="relative z-10 flex-shrink-0">
                <svg width={SVG_WIDTH} height={SVG_HEIGHT} viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} className="min-w-[520px] md:min-w-0">
                  {/* Grid Lines */}
                  {/* Vertical grid lines */}
                  {[0, 5, 10, 15, 20].map(minutes => (
                    <line
                      key={`v-grid-${minutes}`}
                      x1={getX(minutes)}
                      y1={PADDING.top}
                      x2={getX(minutes)}
                      y2={PADDING.top + PLOT_HEIGHT}
                      stroke="#e5e7eb"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                    />
                  ))}
                  {/* Horizontal grid lines */}
                  {[0, 5, 10, 15, 20].map(time => (
                    <line
                      key={`h-grid-${time}`}
                      x1={PADDING.left}
                      y1={getY(time)}
                      x2={PADDING.left + PLOT_WIDTH}
                      y2={getY(time)}
                      stroke="#e5e7eb"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                    />
                  ))}
                  
                  {/* Main Axes */}
                  <line x1={PADDING.left} y1={PADDING.top + PLOT_HEIGHT} x2={PADDING.left + PLOT_WIDTH} y2={PADDING.top + PLOT_HEIGHT} stroke="#6b7280" strokeWidth="2" />
                  <line x1={PADDING.left} y1={PADDING.top} x2={PADDING.left} y2={PADDING.top + PLOT_HEIGHT} stroke="#6b7280" strokeWidth="2" />
                  
                  {/* X-axis tick marks and labels */}
                  {[0, 5, 10, 15, 20].map(minutes => (
                    <g key={`x-tick-${minutes}`}>
                      <line
                        x1={getX(minutes)}
                        y1={PADDING.top + PLOT_HEIGHT}
                        x2={getX(minutes)}
                        y2={PADDING.top + PLOT_HEIGHT + 5}
                        stroke="#6b7280"
                        strokeWidth="1"
                      />
                      <text
                        x={getX(minutes)}
                        y={PADDING.top + PLOT_HEIGHT + 18}
                        textAnchor="middle"
                        className="text-xs fill-gray-600 font-medium"
                      >
                        {minutes}
                      </text>
                    </g>
                  ))}
                  
                  {/* Y-axis tick marks and labels */}
                  {[0, 5, 10, 15, 20].map(time => (
                    <g key={`y-tick-${time}`}>
                      <line
                        x1={PADDING.left - 5}
                        y1={getY(time)}
                        x2={PADDING.left}
                        y2={getY(time)}
                        stroke="#6b7280"
                        strokeWidth="1"
                      />
                      <text
                        x={PADDING.left - 10}
                        y={getY(time) + 4}
                        textAnchor="end"
                        className="text-xs fill-gray-600 font-medium"
                      >
                        {time}
                      </text>
                    </g>
                  ))}
                  
                  {/* Breakeven vertical line */}
                  <line
                    x1={getX(breakevenPoint)}
                    y1={PADDING.top}
                    x2={getX(breakevenPoint)}
                    y2={PADDING.top + PLOT_HEIGHT}
                    stroke="#1e40af"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                  />
                  
                  {/* Paths */}
                  <path d={waitPath} stroke="#f59e0b" strokeWidth="3" fill="none" strokeDasharray="6 4" />
                  <path d={scalePath} stroke="#14b8a6" strokeWidth="3" fill="none" />
                  
                  {/* Breakeven Point */}
                  <circle cx={getX(breakevenPoint)} cy={getY(breakevenPoint)} r="6" fill="#1e40af" stroke="white" strokeWidth="2" />
                  <text x={getX(breakevenPoint)} y={getY(breakevenPoint) - 12} textAnchor="middle" className="text-xs font-bold fill-blue-800">Breakeven</text>
                  <text x={getX(breakevenPoint)} y={getY(breakevenPoint) + 20} textAnchor="middle" className="text-xs font-bold fill-blue-800">{breakevenPoint.toFixed(1)}</text>
                  
                  {/* Current Position Marker */}
                  <line x1={getX(queueLength)} y1={PADDING.top} x2={getX(queueLength)} y2={PADDING.top + PLOT_HEIGHT} stroke="#4f46e5" strokeWidth="2" strokeDasharray="3 3"/>
                  <circle cx={getX(queueLength)} cy={getY(timeToWait)} r="5" fill="#f59e0b" stroke="white" strokeWidth="2" />
                  <circle cx={getX(queueLength)} cy={getY(timeToScale)} r="5" fill="#14b8a6" stroke="white" strokeWidth="2" />

                  {/* Current position value labels */}
                  <text x={getX(queueLength)} y={PADDING.top - 8} textAnchor="middle" className="text-xs font-bold fill-indigo-700">{queueLength}</text>

                  {/* Axis Labels */}
                  <text x={PADDING.left + PLOT_WIDTH / 2} y={SVG_HEIGHT - 10} textAnchor="middle" className="text-sm font-medium fill-gray-600">Video-Minutes in Queue</text>
                  <text x={PADDING.left-45} y={PADDING.top + PLOT_HEIGHT/2} textAnchor="middle" transform={`rotate(-90 ${PADDING.left-45} ${PADDING.top + PLOT_HEIGHT/2})`} className="text-sm font-medium fill-gray-600">Time to Complete (min)</text>

                </svg>
              </div>
            </div>
            
            {/* Calculated Outcome - Horizontal Card */}
            <div className="max-w-4xl mx-auto w-full">
              <div className="p-6 bg-white/60 rounded-2xl border border-white/30 shadow-lg backdrop-blur-sm">
                <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Calculated Outcome</h3>
                
                {/* Time Comparison - Horizontal Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="flex items-center justify-between p-4 bg-amber-100/70 rounded-xl border border-amber-200/50">
                    <span className="font-medium text-amber-800 text-lg">Time if you WAIT:</span>
                    <span className="font-bold text-2xl text-amber-900">{timeToWait.toFixed(1)} min</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-teal-100/70 rounded-xl border border-teal-200/50">
                    <span className="font-medium text-teal-800 text-lg">Time if you SCALE:</span>
                    <span className="font-bold text-2xl text-teal-900">{timeToScale.toFixed(1)} min</span>
                  </div>
                </div>
                
                {/* Decision and Insight - Horizontal Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  {/* Decision Button */}
                  <div className="flex justify-center lg:justify-start">
                    <div className={`px-8 py-4 rounded-xl text-center shadow-md min-w-[200px] ${decision === 'WAIT' ? 'bg-gradient-to-r from-amber-500 to-amber-600' : 'bg-gradient-to-r from-teal-500 to-teal-600'}`}>
                      <span className="text-white font-bold text-2xl tracking-wider drop-shadow-sm">{decision}</span>
                    </div>
                  </div>
                  
                  {/* Key Insight */}
                  <div className="text-center lg:text-left">
                    <h4 className="font-semibold text-gray-700 flex items-center justify-center lg:justify-start gap-2 mb-3">
                      💡 Key Insight:
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">
                      It only makes sense to provision a new GPU when the queue length is more than <b className="text-indigo-700">twice the cold start time</b>.
                    </p>
                    <div className="inline-block p-3 bg-indigo-50/70 rounded-lg border border-indigo-200/50">
                      <p className="font-bold text-lg text-indigo-800">
                        Breakeven at {breakevenPoint.toFixed(1)} video-minutes
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Legend Panel - Bottom */}
            <div className="flex justify-center">
              <div className="p-4 bg-white/60 rounded-xl border border-white/30 shadow-md backdrop-blur-sm">
                <div className="flex items-center justify-center gap-8">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-amber-500 rounded border-2 border-amber-600"></div>
                    <span className="text-sm font-medium text-gray-700">Wait (Don't Scale)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-teal-500 rounded border-2 border-teal-600"></div>
                    <span className="text-sm font-medium text-gray-700">Scale Now</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartScalingSimulator;