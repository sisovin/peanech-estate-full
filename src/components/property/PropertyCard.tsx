import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Share2, MapPin, Bed, Bath, Maximize } from "lucide-react";

interface PropertyCardProps {
  id?: string;
  title?: string;
  price?: number;
  location?: string;
  image?: string;
  bedrooms?: number;
  bathrooms?: number;
  squareFootage?: number;
  featured?: boolean;
  onBooking?: (id: string) => void;
  onFavorite?: (id: string) => void;
  onShare?: (id: string) => void;
}

const PropertyCard = ({
  id = "1",
  title = "Modern Luxury Villa",
  price = 1250000,
  location = "Beverly Hills, CA",
  image = "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
  bedrooms = 4,
  bathrooms = 3,
  squareFootage = 2800,
  featured = false,
  onBooking = () => {},
  onFavorite = () => {},
  onShare = () => {},
}: PropertyCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full flex flex-col bg-card border-border hover:shadow-lg transition-shadow duration-300">
        <div className="relative">
          {/* Property Image */}
          <div className="aspect-[4/3] overflow-hidden bg-muted">
            <img
              src={image}
              alt={title}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Featured Badge */}
          {featured && (
            <div className="absolute top-3 left-3">
              <Badge
                variant="default"
                className="bg-primary text-primary-foreground font-semibold"
              >
                Featured
              </Badge>
            </div>
          )}

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex space-x-2">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
              onClick={() => onFavorite(id)}
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
              onClick={() => onShare(id)}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Price Tag */}
          <div className="absolute bottom-3 left-3">
            <Badge
              variant="secondary"
              className="text-lg font-bold px-3 py-1 bg-background/80 backdrop-blur-sm border border-border"
            >
              ${price.toLocaleString()}
            </Badge>
          </div>
        </div>

        <CardContent className="flex-grow pt-6">
          <h3 className="text-xl font-semibold mb-2 line-clamp-1">{title}</h3>
          <div className="flex items-center text-muted-foreground mb-4">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm line-clamp-1">{location}</span>
          </div>

          {/* Property Features */}
          <div className="grid grid-cols-3 gap-2">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">{bedrooms} Beds</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">{bathrooms} Baths</span>
            </div>
            <div className="flex items-center">
              <Maximize className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">{squareFootage} sqft</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-0 pb-4">
          <Button className="w-full" onClick={() => onBooking(id)}>
            Book Viewing
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PropertyCard;
