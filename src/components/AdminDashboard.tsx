
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DashboardCard from './DashboardCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BarChart3, RefreshCw, Users, AlertTriangle, Map } from 'lucide-react';
import { airQualityByLocation, availableLocations } from '@/utils/airQualityData';

const AdminDashboard: React.FC = () => {
  const [newLocationName, setNewLocationName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  // Prepare data for the AQI comparison chart
  const chartData = Object.entries(airQualityByLocation).map(([location, data]) => ({
    location: location.split(',')[0], // Just take the city name for brevity
    aqi: data.aqi,
    category: data.category,
  }));

  // Sort locations by AQI (worst first)
  const sortedLocations = [...chartData].sort((a, b) => b.aqi - a.aqi);

  // High pollution alerts
  const highPollutionLocations = sortedLocations
    .filter(loc => loc.aqi > 100)
    .slice(0, 5);

  // Color mapping for AQI categories
  const getCategoryColor = (category: string): string => {
    switch(category) {
      case 'good': return '#22C55E';
      case 'moderate': return '#FACC15';
      case 'unhealthy-sensitive': return '#FB923C';
      case 'unhealthy': return '#EF4444';
      case 'very-unhealthy': return '#9F1239';
      case 'hazardous': return '#7F1D1D';
      default: return '#8884d8';
    }
  };

  const handleAddLocation = () => {
    // In a real app, this would add a new location to the database
    alert(`In a real application, a new location "${newLocationName}" would be added to the system.`);
    setNewLocationName('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <DashboardCard 
          title="Monitoring Locations" 
          description="Total locations tracked"
          className="bg-white/60 backdrop-blur-sm"
        >
          <div className="flex items-center">
            <Map className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <div className="text-3xl font-bold">{availableLocations.length}</div>
              <div className="text-sm text-gray-500">Locations monitored</div>
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard 
          title="High Alert Areas" 
          description="Locations with unhealthy air"
          className="bg-white/60 backdrop-blur-sm"
        >
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-orange-500 mr-3" />
            <div>
              <div className="text-3xl font-bold">{highPollutionLocations.length}</div>
              <div className="text-sm text-gray-500">High pollution alerts</div>
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard 
          title="Active Users" 
          description="Users currently online"
          className="bg-white/60 backdrop-blur-sm"
        >
          <div className="flex items-center">
            <Users className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <div className="text-3xl font-bold">24</div>
              <div className="text-sm text-gray-500">Active users</div>
            </div>
          </div>
        </DashboardCard>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard
          title="Air Quality Index Comparison"
          description="Compare AQI across all monitored locations"
          className="bg-white/60 backdrop-blur-sm lg:col-span-2"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="location" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="aqi" name="Air Quality Index">
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getCategoryColor(entry.category)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>
        
        <DashboardCard
          title="Manage Locations"
          description="Add or edit monitoring locations"
          className="bg-white/60 backdrop-blur-sm"
        >
          <div className="space-y-4">
            {isAdding ? (
              <div className="flex gap-2">
                <Input
                  placeholder="New location name"
                  value={newLocationName}
                  onChange={(e) => setNewLocationName(e.target.value)}
                />
                <Button onClick={handleAddLocation} disabled={!newLocationName}>
                  Add
                </Button>
                <Button variant="outline" onClick={() => setIsAdding(false)}>
                  Cancel
                </Button>
              </div>
            ) : (
              <Button onClick={() => setIsAdding(true)}>
                Add New Location
              </Button>
            )}
            
            <ScrollArea className="h-60">
              <div className="space-y-2">
                {availableLocations.map((location) => (
                  <div key={location} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>{location}</span>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </DashboardCard>
        
        <DashboardCard
          title="Critical Alerts"
          description="Locations with unhealthy air quality"
          className="bg-white/60 backdrop-blur-sm"
        >
          <ScrollArea className="h-60">
            <div className="space-y-3">
              {highPollutionLocations.map((location) => (
                <div 
                  key={location.location} 
                  className="p-3 rounded border-l-4 border-red-500 bg-red-50"
                >
                  <div className="font-medium">{location.location}</div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">AQI: {location.aqi}</span>
                    <Button size="sm" variant="outline">
                      <AlertTriangle className="h-4 w-4 mr-1 text-red-500" />
                      Send Alert
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DashboardCard>
      </div>
    </div>
  );
};

export default AdminDashboard;
