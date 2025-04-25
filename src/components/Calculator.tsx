import React, { useState, useEffect } from 'react';
import { AllocationTable } from './AllocationTable';
import { AllocationChart } from './AllocationChart';
import { ageBasedAllocation } from '../data/allocationData';

export const Calculator: React.FC = () => {
  const [ageRange, setAgeRange] = useState<string>('25-30');
  const [totalAmount, setTotalAmount] = useState<number>(10000);
  const [allocations, setAllocations] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    calculateAllocations();
  }, [ageRange, totalAmount]);

  const calculateAllocations = () => {
    const percentages = ageBasedAllocation[ageRange];
    if (!percentages) return;

    const calculatedAllocations: { [key: string]: number } = {};
    
    Object.entries(percentages).forEach(([fund, percentage]) => {
      calculatedAllocations[fund] = Math.round((percentage / 100) * totalAmount);
    });

    setAllocations(calculatedAllocations);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setTotalAmount(value);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Investment Details
            </h2>
            
            <div className="mb-4">
              <label 
                htmlFor="age-range" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Age Range
              </label>
              <select
                id="age-range"
                value={ageRange}
                onChange={(e) => setAgeRange(e.target.value)}
                className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                {Object.keys(ageBasedAllocation).map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label 
                htmlFor="total-amount" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Total SIP Amount (₹)
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 dark:text-gray-400">₹</span>
                </div>
                <input
                  type="number"
                  id="total-amount"
                  value={totalAmount}
                  onChange={handleAmountChange}
                  min="0"
                  step="1000"
                  className="block w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Recommended Allocation
            </h2>
            <AllocationTable 
              allocations={allocations} 
              percentages={ageBasedAllocation[ageRange]} 
              totalAmount={totalAmount} 
            />
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Allocation Breakdown
          </h2>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 h-80">
            <AllocationChart 
              allocations={allocations} 
              percentages={ageBasedAllocation[ageRange]} 
            />
          </div>
          
          <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
            <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-2">
              Investment Strategy Insights
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-400">
              For age {ageRange}, our recommended strategy focuses on 
              {ageRange.startsWith('2') || ageRange.startsWith('3') 
                ? ' growth through higher equity allocation.' 
                : ageRange.startsWith('4') || ageRange.startsWith('5') 
                  ? ' balanced growth with moderate risk.' 
                  : ' capital preservation with reduced volatility.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};