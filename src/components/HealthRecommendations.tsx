
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getAQICategory } from '@/utils/airQualityData';
import { cn } from '@/lib/utils';
import { AlertCircle, ShieldCheck, CloudFog, Wind } from "lucide-react";

interface HealthRecommendationsProps {
  aqi: number;
  healthImplications: string;
  recommendations: string;
  category: 'good' | 'moderate' | 'unhealthy-sensitive' | 'unhealthy' | 'very-unhealthy' | 'hazardous';
}

const HealthRecommendations = ({ 
  aqi, 
  healthImplications, 
  recommendations,
  category
}: HealthRecommendationsProps) => {
  
  // Get appropriate icon based on air quality
  const getIcon = () => {
    switch (category) {
      case 'good':
        return <ShieldCheck className="h-5 w-5 text-aqi-good" />;
      case 'moderate':
        return <Wind className="h-5 w-5 text-aqi-moderate" />;
      case 'unhealthy-sensitive':
      case 'unhealthy':
        return <CloudFog className="h-5 w-5 text-aqi-unhealthy" />;
      case 'very-unhealthy':
      case 'hazardous':
        return <AlertCircle className="h-5 w-5 text-aqi-hazardous" />;
      default:
        return <AlertCircle className="h-5 w-5" />;
    }
  };

  // Define background color based on AQI category
  const getBgColor = () => {
    switch (category) {
      case 'good':
        return 'border-l-aqi-good bg-aqi-good/5';
      case 'moderate':
        return 'border-l-aqi-moderate bg-aqi-moderate/5';
      case 'unhealthy-sensitive':
        return 'border-l-aqi-unhealthy bg-aqi-unhealthy/5';
      case 'unhealthy':
        return 'border-l-aqi-bad bg-aqi-bad/5';
      case 'very-unhealthy':
      case 'hazardous':
        return 'border-l-aqi-hazardous bg-aqi-hazardous/5';
      default:
        return 'border-l-gray-400 bg-gray-50';
    }
  };

  return (
    <div className="space-y-4">
      <Alert className={cn("border-l-4", getBgColor())}>
        <div className="flex gap-3">
          {getIcon()}
          <div>
            <AlertTitle className="text-base font-medium mb-1">Health Implications</AlertTitle>
            <AlertDescription className="text-sm">{healthImplications}</AlertDescription>
          </div>
        </div>
      </Alert>

      <Alert className={cn("border-l-4", getBgColor())}>
        <div className="flex gap-3">
          {getIcon()}
          <div>
            <AlertTitle className="text-base font-medium mb-1">Recommendations</AlertTitle>
            <AlertDescription className="text-sm">{recommendations}</AlertDescription>
          </div>
        </div>
      </Alert>
    </div>
  );
};

export default HealthRecommendations;
