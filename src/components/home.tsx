import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  Building2,
  Users,
  Mail,
  ChevronRight,
  Star,
  ArrowRight,
} from "lucide-react";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import PropertyGrid from "./property/PropertyGrid";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <div className="container mx-auto px-4 py-24 sm:py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Find Your <span className="text-primary">Dream Property</span>{" "}
              With AI-Powered Search
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover the perfect home with our advanced AI technology that
              understands your preferences and finds your ideal match.
            </p>
            <div className="bg-card rounded-xl p-4 shadow-lg border border-border">
              <Tabs defaultValue="buy" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="buy">Buy</TabsTrigger>
                  <TabsTrigger value="rent">Rent</TabsTrigger>
                  <TabsTrigger value="sell">Sell</TabsTrigger>
                </TabsList>
                <TabsContent value="buy" className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex-1">
                      <Input
                        placeholder="Enter location, property type, or keywords"
                        className="w-full"
                      />
                    </div>
                    <Button className="gap-2">
                      <Search size={18} />
                      Search Properties
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="rent" className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex-1">
                      <Input
                        placeholder="Enter location or property type to rent"
                        className="w-full"
                      />
                    </div>
                    <Button className="gap-2">
                      <Search size={18} />
                      Find Rentals
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="sell" className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex-1">
                      <Input
                        placeholder="Enter your property address"
                        className="w-full"
                      />
                    </div>
                    <Button className="gap-2">
                      <Search size={18} />
                      Get Estimate
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Properties</h2>
              <p className="text-muted-foreground">
                Explore our handpicked selection of premium properties
              </p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0">
              View All Properties <ChevronRight size={16} className="ml-2" />
            </Button>
          </div>

          <PropertyGrid />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">
              Why Choose PeanechEstate
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform combines cutting-edge technology with expert real
              estate knowledge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border border-border">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Search size={24} className="text-primary" />
                </div>
                <CardTitle>AI-Powered Search</CardTitle>
                <CardDescription>
                  Our advanced algorithms learn your preferences to find your
                  perfect match
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Using machine learning to analyze thousands of properties and
                  match them to your specific needs and preferences.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Building2 size={24} className="text-primary" />
                </div>
                <CardTitle>Premium Properties</CardTitle>
                <CardDescription>
                  Exclusive access to high-quality listings not available
                  elsewhere
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our partnerships with top developers and agents ensure you get
                  access to the best properties on the market.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users size={24} className="text-primary" />
                </div>
                <CardTitle>Expert Agents</CardTitle>
                <CardDescription>
                  Connect with professional agents who know the market inside
                  out
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our vetted network of real estate professionals provides
                  personalized guidance throughout your journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Agent Profiles */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Meet Our Top Agents</h2>
              <p className="text-muted-foreground">
                Professional experts ready to help you find your dream property
              </p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0">
              View All Agents <ChevronRight size={16} className="ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((agent) => (
              <Card
                key={agent}
                className="border border-border overflow-hidden"
              >
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80&auto=format&fit=crop&crop=faces&${agent}`}
                    alt={`Agent ${agent}`}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Sarah Johnson</CardTitle>
                    <div className="flex items-center">
                      <Star
                        size={16}
                        className="text-yellow-500 fill-yellow-500"
                      />
                      <span className="ml-1 text-sm">4.9</span>
                    </div>
                  </div>
                  <CardDescription>Luxury Property Specialist</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                  <Button size="sm">Contact</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-card border border-border rounded-xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                <p className="text-muted-foreground mb-6">
                  Subscribe to our newsletter to receive the latest property
                  listings, market insights, and exclusive offers.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <Input placeholder="Enter your email" type="email" />
                  </div>
                  <Button className="gap-2">
                    <Mail size={18} />
                    Subscribe
                  </Button>
                </div>
              </div>
              <div className="hidden md:block">
                <motion.div
                  className="bg-gradient-to-r from-primary/20 to-primary/5 rounded-xl p-8 h-full"
                  animate={{
                    boxShadow: [
                      "0 0 0 rgba(0,0,0,0)",
                      "0 0 20px rgba(124,58,237,0.3)",
                      "0 0 0 rgba(0,0,0,0)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <div className="flex flex-col items-center justify-center h-full space-y-4">
                    <Mail size={48} className="text-primary" />
                    <p className="text-center font-medium">
                      Get notified about new properties that match your criteria
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Choose Your Plan</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select the subscription that best fits your real estate needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <Card className="border border-border relative overflow-hidden">
              <div className="absolute top-0 right-0 left-0 h-1 bg-blue-500"></div>
              <CardHeader>
                <CardTitle>Basic</CardTitle>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$19</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <CardDescription className="mt-4">
                  Perfect for individuals looking for their first home
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Basic property search",
                    "Email alerts",
                    "Save up to 10 favorites",
                    "Limited market insights",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center mr-3">
                        <ChevronRight size={14} className="text-blue-500" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">
                  Get Started
                </Button>
              </CardFooter>
            </Card>

            {/* Premium Plan */}
            <Card className="border border-primary relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 left-0 h-1 bg-primary"></div>
              <Badge className="absolute top-4 right-4">Popular</Badge>
              <CardHeader>
                <CardTitle>Premium</CardTitle>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$49</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <CardDescription className="mt-4">
                  Ideal for serious home buyers and investors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Advanced AI property matching",
                    "Unlimited saved properties",
                    "Priority booking for viewings",
                    "Full market analytics",
                    "Direct agent contact",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <ChevronRight size={14} className="text-primary" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Subscribe Now</Button>
              </CardFooter>
            </Card>

            {/* Luxury Plan */}
            <Card className="border border-border relative overflow-hidden">
              <div className="absolute top-0 right-0 left-0 h-1 bg-purple-500"></div>
              <CardHeader>
                <CardTitle>Luxury</CardTitle>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <CardDescription className="mt-4">
                  For premium clients seeking exclusive properties
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "All Premium features",
                    "VIP property previews",
                    "Dedicated luxury agent",
                    "Off-market listings access",
                    "Personalized investment advice",
                    "Concierge services",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <div className="h-5 w-5 rounded-full bg-purple-500/10 flex items-center justify-center mr-3">
                        <ChevronRight size={14} className="text-purple-500" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">
                  Contact Sales
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">What Our Clients Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from people who found their dream homes with PeanechEstate
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((testimonial) => (
              <Card key={testimonial} className="border border-border">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=testimonial${testimonial}`}
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">Client Name</CardTitle>
                      <CardDescription>Homeowner</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className="text-yellow-500 fill-yellow-500 mr-1"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    "PeanechEstate made finding our dream home so easy. The AI
                    recommendations were spot on, and our agent was incredibly
                    helpful throughout the entire process."
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline" className="gap-2">
              Read More Testimonials
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Find Your Dream Property?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of satisfied clients who found their perfect home
              with PeanechEstate
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                Get Started
                <ArrowRight size={16} />
              </Button>
              <Button size="lg" variant="outline">
                Contact an Agent
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
