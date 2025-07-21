import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Lock } from "lucide-react";

type UserRole = "visitor" | "agent" | "admin" | "super_admin";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallback?: React.ReactNode;
}

const ProtectedRoute = ({
  children,
  allowedRoles,
  fallback,
}: ProtectedRouteProps) => {
  const { user, isAuthenticated, hasRole } = useAuth();

  if (!isAuthenticated) {
    return (
      fallback || (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Authentication Required</CardTitle>
              <CardDescription>
                You need to be logged in to access this page.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                onClick={() => (window.location.href = "/")}
              >
                Go to Login
              </Button>
            </CardContent>
          </Card>
        </div>
      )
    );
  }

  if (!hasRole(allowedRoles)) {
    return (
      fallback || (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-destructive" />
              </div>
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>
                You don't have permission to access this page. Required roles:{" "}
                {allowedRoles.join(", ")}. Your current role: {user?.role}.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => (window.location.href = "/")}
              >
                Go Back Home
              </Button>
            </CardContent>
          </Card>
        </div>
      )
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
