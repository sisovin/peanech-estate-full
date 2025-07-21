import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import PropertyCard from "./PropertyCard";

interface PropertyGridProps {
  properties?: Property[];
  isLoading?: boolean;
}

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  imageUrl: string;
  featured?: boolean;
  type: string;
}

const PropertyGrid: React.FC<PropertyGridProps> = ({
  properties = [
    {
      id: "1",
      title: "Modern Luxury Villa",
      price: 1250000,
      location: "Beverly Hills, CA",
      bedrooms: 5,
      bathrooms: 4,
      squareFootage: 3500,
      imageUrl:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      featured: true,
      type: "Villa",
    },
    {
      id: "2",
      title: "Downtown Penthouse",
      price: 950000,
      location: "Manhattan, NY",
      bedrooms: 3,
      bathrooms: 2,
      squareFootage: 2200,
      imageUrl:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      featured: true,
      type: "Apartment",
    },
    {
      id: "3",
      title: "Seaside Cottage",
      price: 750000,
      location: "Malibu, CA",
      bedrooms: 2,
      bathrooms: 2,
      squareFootage: 1800,
      imageUrl:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      type: "House",
    },
    {
      id: "4",
      title: "Urban Loft",
      price: 650000,
      location: "Chicago, IL",
      bedrooms: 1,
      bathrooms: 1,
      squareFootage: 1200,
      imageUrl:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      type: "Loft",
    },
    {
      id: "5",
      title: "Country Estate",
      price: 1850000,
      location: "Aspen, CO",
      bedrooms: 6,
      bathrooms: 5,
      squareFootage: 4500,
      imageUrl:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      featured: true,
      type: "Estate",
    },
    {
      id: "6",
      title: "Waterfront Condo",
      price: 850000,
      location: "Miami, FL",
      bedrooms: 2,
      bathrooms: 2,
      squareFootage: 1600,
      imageUrl:
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
      type: "Condo",
    },
  ],
  isLoading = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 2000000]);
  const [propertyType, setPropertyType] = useState<string>("all");
  const [bedroomCount, setBedroomCount] = useState<string>("any");
  const [showFilters, setShowFilters] = useState(false);

  // Filter properties based on search and filters
  const filteredProperties = properties.filter((property) => {
    // Search term filter
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());

    // Price range filter
    const matchesPrice =
      property.price >= priceRange[0] && property.price <= priceRange[1];

    // Property type filter
    const matchesType =
      propertyType === "all" || property.type === propertyType;

    // Bedroom count filter
    const matchesBedrooms =
      bedroomCount === "any" ||
      (bedroomCount === "4+"
        ? property.bedrooms >= 4
        : property.bedrooms === parseInt(bedroomCount));

    return matchesSearch && matchesPrice && matchesType && matchesBedrooms;
  });

  const propertyTypes = [
    "all",
    "House",
    "Apartment",
    "Condo",
    "Villa",
    "Loft",
    "Estate",
  ];
  const bedroomOptions = ["any", "1", "2", "3", "4+"];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="w-full bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h2 className="text-3xl font-bold mb-2">Featured Properties</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties across the
            country. Find your dream home with our comprehensive listings.
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Search by location or property name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
              {showFilters ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-card border rounded-lg p-4 mb-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Price Range
                  </label>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 2000000]}
                      max={2000000}
                      step={50000}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mb-2"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Property Type
                  </label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type === "all" ? "All Types" : type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Bedrooms
                  </label>
                  <Select value={bedroomCount} onValueChange={setBedroomCount}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      {bedroomOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option === "any" ? "Any" : option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Property Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-[450px] rounded-xl bg-muted animate-pulse"
              />
            ))}
          </div>
        ) : filteredProperties.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No properties found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria
            </p>
          </div>
        )}

        {/* Show more button */}
        {filteredProperties.length > 0 && (
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              Load More Properties
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyGrid;
