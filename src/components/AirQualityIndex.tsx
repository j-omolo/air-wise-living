
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { getAQICategoryColor } from '@/utils/airQualityData';
import { cn } from '@/lib/utils';

interface AirQualityIndexProps {
  aqi: number;
  category: 'good' | 'moderate' | 'unhealthy-sensitive' | 'unhealthy' | 'very-unhealthy' | 'hazardous';
  className?: string;
}

const AirQualityIndex = ({ aqi, category, className }: AirQualityIndexProps) => {
  const categoryColorClass = getAQICategoryColor(category);
  const progressValue = Math.min((aqi / 500) * 100, 100); // Normalize to 0-100%
  
  const getCategoryLabel = (category: string) => {
    switch(category) {
      case 'good': return 'Good';
      case 'moderate': return 'Moderate';
      case 'unhealthy-sensitive': return 'Unhealthy for Sensitive Groups';
      case 'unhealthy': return 'Unhealthy';
      case 'very-unhealthy': return 'Very Unhealthy';
      case 'hazardous': return 'Hazardous';
      default: return 'Unknown';
    }
  };

  return (
    <div className={cn("flex flex-col items-center justify-center p-4", className)}>
      <div className="relative w-48 h-48 flex items-center justify-center mb-6">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle 
            className="text-muted stroke-current"
            strokeWidth="10" 
            fill="transparent" 
            r="40" 
            cx="50" 
            cy="50" 
          />
          <circle 
            className={cn("stroke-current transition-all duration-500", {
              'text-aqi-good': category === 'good',
              'text-aqi-moderate': category === 'moderate',
              'text-aqi-unhealthy': category === 'unhealthy-sensitive',
              'text-aqi-bad': category === 'unhealthy',
              'text-aqi-veryBad': category === 'very-unhealthy',
              'text-aqi-hazardous': category === 'hazardous',
            })}
            strokeWidth="10" 
            strokeDasharray={`${progressValue * 2.51} 1000`} 
            fill="transparent" 
            r="40" 
            cx="50" 
            cy="50" 
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold">{aqi}</span>
          <span className="text-sm font-semibold mt-1">AQI</span>
        </div>
      </div>

      <div className={cn("px-5 py-2 rounded-full text-center font-medium text-sm", categoryColorClass)}>
        {getCategoryLabel(category)}
      </div>
      
      <div className="w-full mt-6">
        <Progress 
          value={progressValue} 
          className="h-3 bg-gray-200" 
          indicatorClassName={cn({
            'bg-aqi-good': category === 'good',
            'bg-aqi-moderate': category === 'moderate',
            'bg-aqi-unhealthy': category === 'unhealthy-sensitive',
            'bg-aqi-bad': category === 'unhealthy',
            'bg-aqi-veryBad': category === 'very-unhealthy',
            'bg-aqi-hazardous': category === 'hazardous',
          })}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0</span>
          <span>100</span>
          <span>200</span>
          <span>300</span>
          <span>500</span>
        </div>
      </div>
    </div>
  );
};

export default AirQualityIndex;
