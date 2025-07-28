import React from 'react';

const MultiQueueSystem: React.FC = () => {
  const queues = [
    { name: "Q1", type: "Real-Time", customer: "B2C", jobs: 12, wait: "5s", gpu: "30%", color: "#10b981" },
    { name: "Q2", type: "Standard", customer: "B2B-SM", jobs: 45, wait: "3m", gpu: "50%", color: "#f59e0b" },
    { name: "Q3", type: "Batch", customer: "B2B-LG", jobs: 1250, wait: "2h", gpu: "20%", color: "#ef4444" }
  ];

  return (
    <div className="w-full my-6 flex justify-center">
      {/* Compact Table */}
      <div className="backdrop-blur-sm bg-white/30 rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50/50">
            <tr className="border-b border-gray-200">
              <th className="text-left p-3 font-semibold text-gray-700">Queue</th>
              <th className="text-left p-3 font-semibold text-gray-700">Type</th>
              <th className="text-left p-3 font-semibold text-gray-700">Customer</th>
              <th className="text-right p-3 font-semibold text-gray-700">Jobs</th>
              <th className="text-right p-3 font-semibold text-gray-700">Wait</th>
              <th className="text-right p-3 font-semibold text-gray-700">GPU</th>
              <th className="text-center p-3 font-semibold text-gray-700">Load</th>
            </tr>
          </thead>
          <tbody>
            {queues.map((q, i) => (
              <tr key={i} className="border-b border-gray-100 hover:bg-white/20 transition-colors">
                <td className="p-3">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: q.color }}></div>
                    <span className="font-medium text-gray-800">{q.name}</span>
                  </div>
                </td>
                <td className="p-3 text-gray-700">{q.type}</td>
                <td className="p-3 text-gray-700">{q.customer}</td>
                <td className="p-3 text-right font-mono text-gray-800">{q.jobs}</td>
                <td className="p-3 text-right font-mono text-gray-800">{q.wait}</td>
                <td className="p-3 text-right font-mono text-gray-800">{q.gpu}</td>
                <td className="p-3">
                  <div className="w-12 h-2 bg-gray-200 rounded-full mx-auto">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        backgroundColor: q.color, 
                        width: q.gpu 
                      }}
                    ></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Processing Flow */}
        <div className="bg-gray-50/30 p-3 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-600">
            <span>GPU Worker Priority:</span>
            {queues.map((q, i) => (
              <React.Fragment key={i}>
                <div className="flex items-center">
                  <div 
                    className="w-2 h-2 rounded-full mr-1" 
                    style={{ backgroundColor: q.color }}
                  ></div>
                  <span>{q.name}</span>
                </div>
                {i < queues.length - 1 && <span>→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiQueueSystem;