
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, sampleUsers } from '@/utils/airQualityData';
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
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

  // Register function - in a real app this would create a user in a secure backend
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Check if email is already in use
    const emailExists = sampleUsers.some(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (emailExists) {
      toast({
        title: "Registration failed",
        description: "This email is already in use.",
        variant: "destructive",
      });
      
      return false;
    }
    
    // In a real app, you would hash the password and store the user in a database
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: 'user', // Default role is user
      preferences: {
        favoriteLocations: [],
        healthConditions: [],
        notifications: false
      }
    };
    
    // Update our sample users array (in a real app, this would be a database insert)
    // Note: This is just for demo purposes. In a real app, this would persist to a database.
    sampleUsers.push(newUser);
    
    // Auto-login the new user
    setUser(newUser);
    localStorage.setItem('airwise_user', JSON.stringify(newUser));
    
    toast({
      title: "Registration successful",
      description: `Welcome to AirWise, ${name}!`,
    });
    
    return true;
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
    register,
    isAuthenticated,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
