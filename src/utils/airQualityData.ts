
// This file contains mock air quality data and related utilities for the app
// In a real application, this would be replaced with API calls to air quality services

export interface PollutantData {
  name: string;
  value: number;
  unit: string;
  level: 'low' | 'moderate' | 'high' | 'very high';
}

export interface AirQualityData {
  aqi: number;
  location: string;
  timestamp: string;
  mainPollutant: string;
  pollutants: PollutantData[];
  healthImplications: string;
  recommendations: string;
  category: 'good' | 'moderate' | 'unhealthy-sensitive' | 'unhealthy' | 'very-unhealthy' | 'hazardous';
}

// Function to determine the quality category based on AQI value
export const getAQICategory = (aqi: number): AirQualityData['category'] => {
  if (aqi <= 50) return 'good';
  if (aqi <= 100) return 'moderate';
  if (aqi <= 150) return 'unhealthy-sensitive';
  if (aqi <= 200) return 'unhealthy';
  if (aqi <= 300) return 'very-unhealthy';
  return 'hazardous';
};

// Function to get tailwind color class based on AQI category
export const getAQICategoryColor = (category: AirQualityData['category']): string => {
  switch (category) {
    case 'good': return 'bg-aqi-good text-white';
    case 'moderate': return 'bg-aqi-moderate text-black';
    case 'unhealthy-sensitive': return 'bg-aqi-unhealthy text-white';
    case 'unhealthy': return 'bg-aqi-bad text-white';
    case 'very-unhealthy': return 'bg-aqi-veryBad text-white';
    case 'hazardous': return 'bg-aqi-hazardous text-white';
    default: return 'bg-gray-200 text-gray-800';
  }
};

// Function to get health implications based on AQI category
export const getHealthImplications = (category: AirQualityData['category']): string => {
  switch (category) {
    case 'good':
      return 'Air quality is considered satisfactory, and air pollution poses little or no risk.';
    case 'moderate':
      return 'Air quality is acceptable; however, there may be a moderate health concern for a very small number of people.';
    case 'unhealthy-sensitive':
      return 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.';
    case 'unhealthy':
      return 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.';
    case 'very-unhealthy':
      return 'Health warnings of emergency conditions. The entire population is more likely to be affected.';
    case 'hazardous':
      return 'Health alert: everyone may experience more serious health effects.';
    default:
      return 'Unable to determine health implications based on current data.';
  }
};

// Function to get recommendations based on AQI category
export const getRecommendations = (category: AirQualityData['category']): string => {
  switch (category) {
    case 'good':
      return 'Enjoy outdoor activities and open windows to circulate fresh air.';
    case 'moderate':
      return 'Consider limiting prolonged outdoor exertion if you are sensitive to air pollution.';
    case 'unhealthy-sensitive':
      return 'People with respiratory or heart disease, the elderly and children should limit prolonged outdoor exertion.';
    case 'unhealthy':
      return 'Avoid prolonged or heavy outdoor exertion. Move activities indoors or reschedule to a time when the air quality is better.';
    case 'very-unhealthy':
      return 'Everyone should avoid all outdoor physical activity. Stay indoors, close windows and use purifiers if available.';
    case 'hazardous':
      return 'Remain indoors and keep activity levels low. Seal windows and doors. Use air purifiers if available.';
    default:
      return 'Exercise caution and monitor air quality updates.';
  }
};

// Sample air quality data
export const sampleAirQualityData: AirQualityData = {
  aqi: 48,
  location: 'San Francisco, CA',
  timestamp: new Date().toLocaleString(),
  mainPollutant: 'PM2.5',
  category: 'good',
  healthImplications: 'Air quality is considered satisfactory, and air pollution poses little or no risk.',
  recommendations: 'Enjoy outdoor activities and open windows to circulate fresh air.',
  pollutants: [
    { name: 'PM2.5', value: 11.2, unit: 'μg/m³', level: 'low' },
    { name: 'PM10', value: 20.1, unit: 'μg/m³', level: 'low' },
    { name: 'O3', value: 38, unit: 'ppb', level: 'low' },
    { name: 'NO2', value: 12, unit: 'ppb', level: 'low' },
    { name: 'SO2', value: 2, unit: 'ppb', level: 'low' },
    { name: 'CO', value: 0.2, unit: 'ppm', level: 'low' },
  ],
};

// Sample available locations
export const availableLocations = [
  'San Francisco, CA',
  'New York, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Miami, FL',
  'Seattle, WA',
  'Denver, CO',
  'Austin, TX',
  'Boston, MA',
  'Portland, OR',
];

// Sample air quality data for different locations
export const airQualityByLocation: Record<string, AirQualityData> = {
  'San Francisco, CA': {
    ...sampleAirQualityData,
    location: 'San Francisco, CA',
    aqi: 48,
    category: 'good',
  },
  'New York, NY': {
    ...sampleAirQualityData,
    location: 'New York, NY',
    aqi: 89,
    category: 'moderate',
    mainPollutant: 'PM2.5',
    healthImplications: getHealthImplications('moderate'),
    recommendations: getRecommendations('moderate'),
    pollutants: [
      { name: 'PM2.5', value: 28.4, unit: 'μg/m³', level: 'moderate' },
      { name: 'PM10', value: 45.7, unit: 'μg/m³', level: 'moderate' },
      { name: 'O3', value: 62, unit: 'ppb', level: 'moderate' },
      { name: 'NO2', value: 38, unit: 'ppb', level: 'moderate' },
      { name: 'SO2', value: 5, unit: 'ppb', level: 'low' },
      { name: 'CO', value: 0.5, unit: 'ppm', level: 'low' },
    ],
  },
  'Los Angeles, CA': {
    ...sampleAirQualityData,
    location: 'Los Angeles, CA',
    aqi: 125,
    category: 'unhealthy-sensitive',
    mainPollutant: 'O3',
    healthImplications: getHealthImplications('unhealthy-sensitive'),
    recommendations: getRecommendations('unhealthy-sensitive'),
    pollutants: [
      { name: 'PM2.5', value: 35.9, unit: 'μg/m³', level: 'moderate' },
      { name: 'PM10', value: 68.3, unit: 'μg/m³', level: 'moderate' },
      { name: 'O3', value: 98, unit: 'ppb', level: 'high' },
      { name: 'NO2', value: 42, unit: 'ppb', level: 'moderate' },
      { name: 'SO2', value: 7, unit: 'ppb', level: 'low' },
      { name: 'CO', value: 1.2, unit: 'ppm', level: 'moderate' },
    ],
  },
  'Chicago, IL': {
    ...sampleAirQualityData,
    location: 'Chicago, IL',
    aqi: 73,
    category: 'moderate',
    mainPollutant: 'PM10',
    healthImplications: getHealthImplications('moderate'),
    recommendations: getRecommendations('moderate'),
  },
  'Miami, FL': {
    ...sampleAirQualityData,
    location: 'Miami, FL',
    aqi: 42,
    category: 'good',
  },
  'Seattle, WA': {
    ...sampleAirQualityData,
    location: 'Seattle, WA',
    aqi: 38,
    category: 'good',
  },
  'Denver, CO': {
    ...sampleAirQualityData,
    location: 'Denver, CO',
    aqi: 58,
    category: 'moderate',
    mainPollutant: 'PM2.5',
    healthImplications: getHealthImplications('moderate'),
    recommendations: getRecommendations('moderate'),
  },
  'Austin, TX': {
    ...sampleAirQualityData,
    location: 'Austin, TX',
    aqi: 45,
    category: 'good',
  },
  'Boston, MA': {
    ...sampleAirQualityData,
    location: 'Boston, MA',
    aqi: 51,
    category: 'moderate',
    mainPollutant: 'O3',
    healthImplications: getHealthImplications('moderate'),
    recommendations: getRecommendations('moderate'),
  },
  'Portland, OR': {
    ...sampleAirQualityData,
    location: 'Portland, OR',
    aqi: 180,
    category: 'unhealthy',
    mainPollutant: 'PM2.5',
    healthImplications: getHealthImplications('unhealthy'),
    recommendations: getRecommendations('unhealthy'),
    pollutants: [
      { name: 'PM2.5', value: 88.2, unit: 'μg/m³', level: 'high' },
      { name: 'PM10', value: 120.5, unit: 'μg/m³', level: 'high' },
      { name: 'O3', value: 71, unit: 'ppb', level: 'moderate' },
      { name: 'NO2', value: 38, unit: 'ppb', level: 'moderate' },
      { name: 'SO2', value: 12, unit: 'ppb', level: 'moderate' },
      { name: 'CO', value: 1.8, unit: 'ppm', level: 'moderate' },
    ],
  },
};
