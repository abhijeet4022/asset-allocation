import React from 'react';

interface AllocationTableProps {
  allocations: { [key: string]: number };
  percentages: { [key: string]: number };
  totalAmount: number;
}

export const AllocationTable: React.FC<AllocationTableProps> = ({ 
  allocations, 
  percentages,
  totalAmount 
}) => {
  // Define fund colors for consistency
  const fundColors: { [key: string]: string } = {
    'Gold': 'text-yellow-600 dark:text-yellow-400',
    'Nifty 50': 'text-blue-600 dark:text-blue-400',
    'Flexi Cap': 'text-indigo-600 dark:text-indigo-400',
    'Mid Cap': 'text-purple-600 dark:text-purple-400',
    'Debt/Hybrid': 'text-green-600 dark:text-green-400',
  };
  
  const fundBgColors: { [key: string]: string } = {
    'Gold': 'bg-yellow-100 dark:bg-yellow-900/20',
    'Nifty 50': 'bg-blue-100 dark:bg-blue-900/20',
    'Flexi Cap': 'bg-indigo-100 dark:bg-indigo-900/20',
    'Mid Cap': 'bg-purple-100 dark:bg-purple-900/20',
    'Debt/Hybrid': 'bg-green-100 dark:bg-green-900/20',
  };

  const sumAllocations = Object.values(allocations).reduce((sum, value) => sum + value, 0);
  const actualTotal = sumAllocations || totalAmount;

  return (
    <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Fund Type
            </th>
            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Percentage
            </th>
            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Amount (₹)
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {Object.entries(allocations).map(([fund, amount]) => (
            <tr key={fund} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${fundBgColors[fund]}`}></div>
                  <span className={`font-medium ${fundColors[fund]}`}>{fund}</span>
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-right text-sm text-gray-700 dark:text-gray-300">
                {percentages[fund]}%
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium text-gray-900 dark:text-white">
                ₹{amount.toLocaleString()}
              </td>
            </tr>
          ))}
          <tr className="bg-gray-50 dark:bg-gray-700">
            <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Total
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium text-gray-900 dark:text-white">
              100%
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-bold text-gray-900 dark:text-white">
              ₹{actualTotal.toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};