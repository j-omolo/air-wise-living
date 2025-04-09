
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { PollutantData } from '@/utils/airQualityData';

interface PollutantLevelsProps {
  pollutants: PollutantData[];
  mainPollutant: string;
}

const PollutantLevels = ({ pollutants, mainPollutant }: PollutantLevelsProps) => {
  // Helper to normalize pollutant values to a 0-100 scale for visualization
  const getNormalizedValue = (pollutant: PollutantData): number => {
    // These are simplified normalization calculations
    // In a real app, these would be based on standard ranges for each pollutant
    switch (pollutant.name) {
      case 'PM2.5':
        return Math.min((pollutant.value / 250) * 100, 100);
      case 'PM10':
        return Math.min((pollutant.value / 430) * 100, 100);
      case 'O3':
        return Math.min((pollutant.value / 200) * 100, 100);
      case 'NO2':
        return Math.min((pollutant.value / 400) * 100, 100);
      case 'SO2':
        return Math.min((pollutant.value / 350) * 100, 100);
      case 'CO':
        return Math.min((pollutant.value / 15) * 100, 100);
      default:
        return 0;
    }
  };

  const getColorForLevel = (level: PollutantData['level']): string => {
    switch (level) {
      case 'low': return 'bg-aqi-good';
      case 'moderate': return 'bg-aqi-moderate';
      case 'high': return 'bg-aqi-unhealthy';
      case 'very high': return 'bg-aqi-bad';
      default: return 'bg-gray-300';
    }
  };

  const getFullPollutantName = (abbr: string): string => {
    switch (abbr) {
      case 'PM2.5': return 'Fine Particulate Matter (≤2.5μm)';
      case 'PM10': return 'Coarse Particulate Matter (≤10μm)';
      case 'O3': return 'Ozone';
      case 'NO2': return 'Nitrogen Dioxide';
      case 'SO2': return 'Sulfur Dioxide';
      case 'CO': return 'Carbon Monoxide';
      default: return abbr;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm text-gray-500 font-medium">Main Pollutant: <span className="text-primary font-semibold">{mainPollutant}</span></h3>
      
      <div className="space-y-3">
        {pollutants.map((pollutant) => {
          const normalizedValue = getNormalizedValue(pollutant);
          const colorClass = getColorForLevel(pollutant.level);
          
          return (
            <div key={pollutant.name} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium" title={getFullPollutantName(pollutant.name)}>
                  {pollutant.name}
                  {pollutant.name === mainPollutant && (
                    <span className="ml-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Main</span>
                  )}
                </span>
                <span className="text-gray-600">{pollutant.value} {pollutant.unit}</span>
              </div>
              <Progress 
                value={normalizedValue} 
                className="h-2 bg-gray-200" 
                indicatorClassName={colorClass}
              />
            </div>
          );
        })}
      </div>
      
      <div className="text-xs text-gray-500 pt-2">
        <p>Hover over pollutant codes to see full names</p>
      </div>
    </div>
  );
};

export default PollutantLevels;
