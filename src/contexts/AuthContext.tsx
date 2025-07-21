import React, { createContext, useContext, useState, useEffect } from "react";

type UserRole = "visitor" | "agent" | "admin" | "super_admin";

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role?: UserRole) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (roles: UserRole[]) => boolean;
  updateUserRole: (userId: string, newRole: UserRole) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Demo users for testing
const DEMO_USERS: User[] = [
  {
    id: "1",
    email: "visitor@demo.com",
    name: "Demo Visitor",
    role: "visitor",
  },
  {
    id: "2",
    email: "agent@demo.com",
    name: "Demo Agent",
    role: "agent",
  },
  {
    id: "3",
    email: "admin@demo.com",
    name: "Demo Admin",
    role: "admin",
  },
  {
    id: "4",
    email: "superadmin@demo.com",
    name: "Demo Super Admin",
    role: "super_admin",
  },
];

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored auth data on mount
    const storedUser = localStorage.getItem("auth_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("auth_user");
      }
    }
  }, []);

  const login = async (
    email: string,
    password: string,
    role?: UserRole,
  ): Promise<boolean> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For demo purposes, find user by email or use provided role
    let foundUser = DEMO_USERS.find((u) => u.email === email);

    if (!foundUser && role) {
      // Create a new user with the provided role for demo
      foundUser = {
        id: Date.now().toString(),
        email,
        name: email.split("@")[0],
        role,
      };
    }

    if (foundUser) {
      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem("auth_user", JSON.stringify(foundUser));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("auth_user");
  };

  const hasRole = (roles: UserRole[]): boolean => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  const updateUserRole = async (
    userId: string,
    newRole: UserRole,
  ): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // In a real app, this would update the database
    // For demo, we'll just update if it's the current user
    if (user && user.id === userId) {
      const updatedUser = { ...user, role: newRole };
      setUser(updatedUser);
      localStorage.setItem("auth_user", JSON.stringify(updatedUser));
    }

    return true;
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated,
    hasRole,
    updateUserRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
