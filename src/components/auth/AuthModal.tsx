import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Mail, Lock, User, Github, Linkedin } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";

interface AuthModalProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultTab?: "login" | "register";
}

const AuthModal = ({
  isOpen = true,
  onOpenChange,
  defaultTab = "login",
}: AuthModalProps) => {
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState<"login" | "register">(defaultTab);
  const [role, setRole] = useState<
    "visitor" | "agent" | "admin" | "super_admin"
  >("visitor");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const success = await login(
        formData.email,
        formData.password,
        activeTab === "register" ? role : undefined,
      );
      if (success) {
        onOpenChange?.(false);
        setFormData({ email: "", password: "", name: "" });
      } else {
        setError("Authentication failed. Please check your credentials.");
      }
    } catch (error) {
      setError("An error occurred during authentication.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (
    demoRole: "visitor" | "agent" | "admin" | "super_admin",
  ) => {
    setIsLoading(true);
    setError(null);

    const demoCredentials = {
      visitor: { email: "visitor@demo.com", password: "demo123" },
      agent: { email: "agent@demo.com", password: "demo123" },
      admin: { email: "admin@demo.com", password: "demo123" },
      super_admin: { email: "superadmin@demo.com", password: "demo123" },
    };

    try {
      const creds = demoCredentials[demoRole];
      const success = await login(creds.email, creds.password);
      if (success) {
        onOpenChange?.(false);
      } else {
        setError("Demo login failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred during demo login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-background border border-gray-800 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              PeanechEstate
            </span>
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Access your account or create a new one
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs
          defaultValue={activeTab}
          onValueChange={(value) => setActiveTab(value as "login" | "register")}
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>

            <div className="relative my-4">
              <Separator />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-background px-2 text-xs text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" type="button" className="w-full">
                <Github className="mr-2 h-4 w-4" />
                Github
              </Button>
              <Button variant="outline" type="button" className="w-full">
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </Button>
            </div>

            <div className="mt-6 space-y-2">
              <p className="text-sm text-center font-medium">Demo Accounts</p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleDemoLogin("visitor")}
                  disabled={isLoading}
                >
                  Visitor
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleDemoLogin("agent")}
                  disabled={isLoading}
                >
                  Agent
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleDemoLogin("admin")}
                  disabled={isLoading}
                >
                  Admin
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleDemoLogin("super_admin")}
                  disabled={isLoading}
                >
                  Super Admin
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="John Doe"
                    className="pl-10"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Account Type</Label>
                <RadioGroup
                  defaultValue={role}
                  onValueChange={(value) =>
                    setRole(
                      value as "visitor" | "agent" | "admin" | "super_admin",
                    )
                  }
                  className="grid grid-cols-2 gap-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="visitor" id="visitor" />
                    <Label htmlFor="visitor" className="cursor-pointer">
                      Visitor
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="agent" id="agent" />
                    <Label htmlFor="agent" className="cursor-pointer">
                      Agent
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="admin" id="admin" />
                    <Label htmlFor="admin" className="cursor-pointer">
                      Admin
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="super_admin" id="super_admin" />
                    <Label htmlFor="super_admin" className="cursor-pointer">
                      Super Admin
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="relative my-4">
              <Separator />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-background px-2 text-xs text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" type="button" className="w-full">
                <Github className="mr-2 h-4 w-4" />
                Github
              </Button>
              <Button variant="outline" type="button" className="w-full">
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
