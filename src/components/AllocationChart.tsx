import React, { useEffect, useRef } from 'react';

interface AllocationChartProps {
  allocations: { [key: string]: number };
  percentages: { [key: string]: number };
}

export const AllocationChart: React.FC<AllocationChartProps> = ({ 
  allocations, 
  percentages 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Fund colors for the pie chart (matching with table)
  const fundColors: { [key: string]: string } = {
    'Gold': '#d97706', // yellow-600
    'Nifty 50': '#2563eb', // blue-600
    'Flexi Cap': '#4f46e5', // indigo-600
    'Mid Cap': '#9333ea', // purple-600
    'Debt/Hybrid': '#16a34a', // green-600
  };

  useEffect(() => {
    if (!canvasRef.current || Object.keys(allocations).length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculate the center and radius
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.8;
    
    // Calculate the total amount
    const total = Object.values(allocations).reduce((sum, value) => sum + value, 0);
    
    // Draw the pie chart
    let startAngle = -0.5 * Math.PI; // Start at the top
    
    Object.entries(allocations).forEach(([fund, amount]) => {
      const sliceAngle = (amount / total) * (2 * Math.PI);
      
      // Draw the slice
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      
      // Fill the slice
      ctx.fillStyle = fundColors[fund];
      ctx.fill();
      
      // Add a white border
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();
      
      // Calculate the position for the label
      const labelRadius = radius * 0.7;
      const labelAngle = startAngle + (sliceAngle / 2);
      const labelX = centerX + Math.cos(labelAngle) * labelRadius;
      const labelY = centerY + Math.sin(labelAngle) * labelRadius;
      
      // Only display label if the slice is big enough
      if (sliceAngle > 0.2) {
        // Draw the label
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${percentages[fund]}%`, labelX, labelY);
      }
      
      // Update the starting angle for the next slice
      startAngle += sliceAngle;
    });
    
    // Draw a legend
    const legendX = 20;
    let legendY = canvas.height - 20 - (Object.keys(allocations).length * 20);
    
    Object.entries(allocations).forEach(([fund, _]) => {
      // Draw the color box
      ctx.fillStyle = fundColors[fund];
      ctx.fillRect(legendX, legendY, 15, 15);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.strokeRect(legendX, legendY, 15, 15);
      
      // Draw the label
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-text');
      ctx.font = '12px Arial';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(fund, legendX + 25, legendY + 7.5);
      
      legendY += 20;
    });
  }, [allocations, percentages]);
  
  return (
    <div className="h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        className="max-w-full max-h-full"
      ></canvas>
    </div>
  );
};