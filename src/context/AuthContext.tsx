
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, sampleUsers } from '@/utils/airQualityData';
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  
  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('airwise_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('airwise_user');
      }
    }
  }, []);

  // Login function - in a real app this would verify against a secure backend
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simple mock authentication
    const foundUser = sampleUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    // In a real app, you would hash and verify the password
    if (foundUser && password === 'password') {
      setUser(foundUser);
      localStorage.setItem('airwise_user', JSON.stringify(foundUser));
      
      toast({
        title: "Logged in successfully",
        description: `Welcome back, ${foundUser.name}!`,
      });
      
      return true;
    }
    
    toast({
      title: "Login failed",
      description: "Invalid email or password. Try admin@airwise.com / password",
      variant: "destructive",
    });
    
    return false;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('airwise_user');
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const isAuthenticated = user !== null;
  const isAdmin = user?.role === 'admin';

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
