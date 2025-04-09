
import React, { useState } from 'react';
import { airQualityByLocation, sampleAirQualityData } from '@/utils/airQualityData';
import AirQualityIndex from '@/components/AirQualityIndex';
import PollutantLevels from '@/components/PollutantLevels';
import HealthRecommendations from '@/components/HealthRecommendations';
import DashboardCard from '@/components/DashboardCard';
import LocationSelector from '@/components/LocationSelector';
import AdminDashboard from '@/components/AdminDashboard';
import { useAuth } from '@/context/AuthContext';
import { Cloud, LogOut, RefreshCw, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState(sampleAirQualityData.location);
  const [refreshing, setRefreshing] = useState(false);
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  // If user is not authenticated, redirect to login
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  // Get the air quality data for the selected location
  const airQualityData = airQualityByLocation[selectedLocation] || sampleAirQualityData;
  
  // Handler for refreshing data
  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white/70 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="container mx-auto py-4 px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center">
            <Cloud className="h-8 w-8 text-blue-500 mr-3" />
            <h1 className="text-2xl font-bold text-gray-800">Air<span className="text-blue-500">Wise</span> Living</h1>
          </div>
          
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="flex-grow sm:flex-grow-0 sm:w-60">
              <LocationSelector 
                selectedLocation={selectedLocation}
                onLocationChange={setSelectedLocation}
              />
            </div>
            <Button 
              size="icon" 
              variant="outline" 
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{user?.name}</span>
                    <span className="text-xs text-muted-foreground">{user?.email}</span>
                    <span className="text-xs px-1 mt-1 rounded bg-blue-100 text-blue-800 inline-block w-fit">
                      {user?.role === 'admin' ? 'Admin' : 'User'}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => alert('Account settings would go here')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-6 px-4 sm:px-6">
        <div className="mb-8">
          <h2 className="text-lg text-gray-600 mb-1">Current Air Quality</h2>
          <div className="text-sm text-gray-500">
            Last updated: {airQualityData.timestamp}
          </div>
        </div>

        {/* Admin Dashboard - Only visible to admins */}
        {isAdmin && (
          <div className="mb-10">
            <AdminDashboard />
            <div className="border-t border-gray-200 my-10"></div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Air Quality Index Card */}
          <DashboardCard 
            title="Air Quality Index" 
            description="Based on US EPA standards"
            className="bg-white/60 backdrop-blur-sm"
          >
            <AirQualityIndex 
              aqi={airQualityData.aqi} 
              category={airQualityData.category}
            />
          </DashboardCard>

          {/* Pollutant Levels Card */}
          <DashboardCard 
            title="Pollutant Levels" 
            description="Current concentrations"
            className="bg-white/60 backdrop-blur-sm"
          >
            <PollutantLevels 
              pollutants={airQualityData.pollutants}
              mainPollutant={airQualityData.mainPollutant}
            />
          </DashboardCard>

          {/* Health Recommendations Card */}
          <DashboardCard 
            title="Health & Safety" 
            description="Precautions & recommendations"
            className="bg-white/60 backdrop-blur-sm md:col-span-2 lg:col-span-1"
          >
            <HealthRecommendations 
              aqi={airQualityData.aqi}
              healthImplications={airQualityData.healthImplications}
              recommendations={airQualityData.recommendations}
              category={airQualityData.category}
            />
          </DashboardCard>
        </div>

        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>Air quality data is simulated for demonstration purposes.</p>
          <p className="mt-1">© 2025 AirWise Living. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
