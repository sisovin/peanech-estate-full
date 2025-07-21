import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Moon,
  Sun,
  Menu,
  X,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  User,
  Shield,
  Settings,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/auth/AuthModal";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({
  children = <div>Page content</div>,
}: MainLayoutProps) => {
  const { user, isAuthenticated, logout, hasRole } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // In a real implementation, we would update the document class and localStorage here
  };

  const handleAuthClick = () => {
    setShowAuthModal(true);
  };

  return (
    <div className={`min-h-screen bg-background ${darkMode ? "dark" : ""}`}>
      {/* Topbar */}
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm">
              <Phone className="h-4 w-4 mr-1" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center text-sm">
              <Mail className="h-4 w-4 mr-1" />
              <span>info@peanechestate.com</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <a href="#" aria-label="Facebook">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Twitter">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Instagram">
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-40">
        <div className="container mx-auto py-4 px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
              >
                PeanechEstate
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className="text-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                to="/properties"
                className="text-foreground hover:text-primary transition-colors"
              >
                Properties
              </Link>
              <Link
                to="/agents"
                className="text-foreground hover:text-primary transition-colors"
              >
                Agents
              </Link>
              <Link
                to="/pricing"
                className="text-foreground hover:text-primary transition-colors"
              >
                Pricing
              </Link>
              <Link
                to="/contact"
                className="text-foreground hover:text-primary transition-colors"
              >
                Contact
              </Link>
              {hasRole(["admin", "super_admin"]) && (
                <Link
                  to="/admin"
                  className="text-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  <Shield size={16} />
                  Admin
                </Link>
              )}
              {hasRole(["super_admin"]) && (
                <Link
                  to="/super-admin"
                  className="text-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  <Settings size={16} />
                  Super Admin
                </Link>
              )}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                aria-label={
                  darkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {darkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>

              {/* Authentication */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
                      alt={user?.name}
                    />
                    <AvatarFallback>
                      {user?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("") || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block">
                    <Button variant="ghost" size="sm" onClick={logout}>
                      Logout
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="hidden md:block">
                  <Button onClick={handleAuthClick} variant="default">
                    Sign In
                  </Button>
                </div>
              )}

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col h-full">
                    <div className="flex-1 py-6">
                      <div className="mb-8 flex items-center">
                        <div className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                          PeanechEstate
                        </div>
                      </div>
                      <nav className="flex flex-col space-y-4">
                        <Link
                          to="/"
                          className="text-foreground hover:text-primary transition-colors py-2"
                        >
                          Home
                        </Link>
                        <Link
                          to="/properties"
                          className="text-foreground hover:text-primary transition-colors py-2"
                        >
                          Properties
                        </Link>
                        <Link
                          to="/agents"
                          className="text-foreground hover:text-primary transition-colors py-2"
                        >
                          Agents
                        </Link>
                        <Link
                          to="/pricing"
                          className="text-foreground hover:text-primary transition-colors py-2"
                        >
                          Pricing
                        </Link>
                        <Link
                          to="/contact"
                          className="text-foreground hover:text-primary transition-colors py-2"
                        >
                          Contact
                        </Link>
                        {hasRole(["admin", "super_admin"]) && (
                          <Link
                            to="/admin"
                            className="text-foreground hover:text-primary transition-colors py-2 flex items-center gap-2"
                          >
                            <Shield size={16} />
                            Admin Dashboard
                          </Link>
                        )}
                        {hasRole(["super_admin"]) && (
                          <Link
                            to="/super-admin"
                            className="text-foreground hover:text-primary transition-colors py-2 flex items-center gap-2"
                          >
                            <Settings size={16} />
                            Super Admin
                          </Link>
                        )}
                      </nav>
                    </div>
                    <div className="py-6 border-t">
                      {!isAuthenticated && (
                        <Button onClick={handleAuthClick} className="w-full">
                          Sign In
                        </Button>
                      )}
                      {isAuthenticated && (
                        <div className="space-y-4">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarImage
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
                                alt={user?.name}
                              />
                              <AvatarFallback>
                                {user?.name
                                  ?.split(" ")
                                  .map((n) => n[0])
                                  .join("") || "U"}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">
                                {user?.name}
                              </p>
                              <p className="text-xs text-muted-foreground capitalize">
                                {user?.role?.replace("_", " ")}
                              </p>
                            </div>
                          </div>
                          <Button
                            onClick={logout}
                            variant="outline"
                            className="w-full"
                          >
                            Logout
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">PeanechEstate</h3>
              <p className="text-muted-foreground">
                A modern, AI-powered real estate platform with a futuristic
                design featuring animated gradients and comprehensive property
                listings.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/properties"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Properties
                  </Link>
                </li>
                <li>
                  <Link
                    to="/agents"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Agents
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pricing"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" /> +1 (555) 123-4567
                </li>
                <li className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" /> info@peanechestate.com
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} PeanechEstate. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onOpenChange={setShowAuthModal} />
    </div>
  );
};

export default MainLayout;
