import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Plus,
  Edit,
  Trash2,
  Users,
  BarChart3,
  Settings,
  Home,
  MapPin,
  DollarSign,
  Bed,
  Bath,
  Square,
  Save,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: "house" | "apartment" | "condo" | "townhouse";
  status: "available" | "sold" | "pending";
  images: string[];
  createdAt: string;
}

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [properties, setProperties] = useState<Property[]>([
    {
      id: "1",
      title: "Modern Downtown Apartment",
      description: "Beautiful modern apartment in the heart of downtown",
      price: 450000,
      location: "Downtown, City Center",
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      type: "apartment",
      status: "available",
      images: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      ],
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      title: "Luxury Family Home",
      description: "Spacious family home with garden and garage",
      price: 750000,
      location: "Suburban Heights",
      bedrooms: 4,
      bathrooms: 3,
      area: 2500,
      type: "house",
      status: "available",
      images: [
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
      ],
      createdAt: "2024-01-10",
    },
  ]);

  const [isAddingProperty, setIsAddingProperty] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [activeTab, setActiveTab] = useState("properties");

  const [newProperty, setNewProperty] = useState<Partial<Property>>({
    title: "",
    description: "",
    price: 0,
    location: "",
    bedrooms: 1,
    bathrooms: 1,
    area: 0,
    type: "apartment",
    status: "available",
    images: [],
  });

  const handleAddProperty = () => {
    if (newProperty.title && newProperty.price && newProperty.location) {
      const property: Property = {
        id: Date.now().toString(),
        title: newProperty.title!,
        description: newProperty.description || "",
        price: newProperty.price!,
        location: newProperty.location!,
        bedrooms: newProperty.bedrooms || 1,
        bathrooms: newProperty.bathrooms || 1,
        area: newProperty.area || 0,
        type: newProperty.type || "apartment",
        status: newProperty.status || "available",
        images: newProperty.images || [],
        createdAt: new Date().toISOString().split("T")[0],
      };

      setProperties([...properties, property]);
      setNewProperty({
        title: "",
        description: "",
        price: 0,
        location: "",
        bedrooms: 1,
        bathrooms: 1,
        area: 0,
        type: "apartment",
        status: "available",
        images: [],
      });
      setIsAddingProperty(false);
    }
  };

  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
    setNewProperty(property);
  };

  const handleUpdateProperty = () => {
    if (
      editingProperty &&
      newProperty.title &&
      newProperty.price &&
      newProperty.location
    ) {
      const updatedProperties = properties.map((p) =>
        p.id === editingProperty.id
          ? { ...editingProperty, ...newProperty }
          : p,
      );
      setProperties(updatedProperties);
      setEditingProperty(null);
      setNewProperty({
        title: "",
        description: "",
        price: 0,
        location: "",
        bedrooms: 1,
        bathrooms: 1,
        area: 0,
        type: "apartment",
        status: "available",
        images: [],
      });
    }
  };

  const handleDeleteProperty = (id: string) => {
    setProperties(properties.filter((p) => p.id !== id));
  };

  const stats = {
    totalProperties: properties.length,
    availableProperties: properties.filter((p) => p.status === "available")
      .length,
    soldProperties: properties.filter((p) => p.status === "sold").length,
    pendingProperties: properties.filter((p) => p.status === "pending").length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">
                Welcome back, {user?.name} ({user?.role})
              </p>
            </div>
            <Button onClick={logout} variant="outline">
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="properties" className="flex items-center gap-2">
              <Building2 size={16} />
              Properties
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 size={16} />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users size={16} />
              Users
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings size={16} />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Properties Tab */}
          <TabsContent value="properties" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Properties
                  </CardTitle>
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.totalProperties}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Available
                  </CardTitle>
                  <Home className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {stats.availableProperties}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sold</CardTitle>
                  <DollarSign className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {stats.soldProperties}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending</CardTitle>
                  <Building2 className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">
                    {stats.pendingProperties}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Add Property Button */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Property Management</h2>
              <Dialog
                open={isAddingProperty}
                onOpenChange={setIsAddingProperty}
              >
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus size={16} />
                    Add Property
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Property</DialogTitle>
                    <DialogDescription>
                      Fill in the details to add a new property to the system.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={newProperty.title || ""}
                        onChange={(e) =>
                          setNewProperty({
                            ...newProperty,
                            title: e.target.value,
                          })
                        }
                        placeholder="Property title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Price ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        value={newProperty.price || ""}
                        onChange={(e) =>
                          setNewProperty({
                            ...newProperty,
                            price: parseInt(e.target.value) || 0,
                          })
                        }
                        placeholder="450000"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={newProperty.location || ""}
                        onChange={(e) =>
                          setNewProperty({
                            ...newProperty,
                            location: e.target.value,
                          })
                        }
                        placeholder="Downtown, City Center"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bedrooms">Bedrooms</Label>
                      <Input
                        id="bedrooms"
                        type="number"
                        value={newProperty.bedrooms || ""}
                        onChange={(e) =>
                          setNewProperty({
                            ...newProperty,
                            bedrooms: parseInt(e.target.value) || 1,
                          })
                        }
                        placeholder="2"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bathrooms">Bathrooms</Label>
                      <Input
                        id="bathrooms"
                        type="number"
                        value={newProperty.bathrooms || ""}
                        onChange={(e) =>
                          setNewProperty({
                            ...newProperty,
                            bathrooms: parseInt(e.target.value) || 1,
                          })
                        }
                        placeholder="2"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="area">Area (sq ft)</Label>
                      <Input
                        id="area"
                        type="number"
                        value={newProperty.area || ""}
                        onChange={(e) =>
                          setNewProperty({
                            ...newProperty,
                            area: parseInt(e.target.value) || 0,
                          })
                        }
                        placeholder="1200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Property Type</Label>
                      <Select
                        value={newProperty.type}
                        onValueChange={(value) =>
                          setNewProperty({
                            ...newProperty,
                            type: value as Property["type"],
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="condo">Condo</SelectItem>
                          <SelectItem value="townhouse">Townhouse</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newProperty.description || ""}
                        onChange={(e) =>
                          setNewProperty({
                            ...newProperty,
                            description: e.target.value,
                          })
                        }
                        placeholder="Property description..."
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsAddingProperty(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleAddProperty}>
                      <Save size={16} className="mr-2" />
                      Add Property
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Properties Table */}
            <Card>
              <CardHeader>
                <CardTitle>All Properties</CardTitle>
                <CardDescription>
                  Manage all properties in the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {properties.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell className="font-medium">
                          {property.title}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin
                              size={14}
                              className="text-muted-foreground"
                            />
                            {property.location}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <DollarSign
                              size={14}
                              className="text-muted-foreground"
                            />
                            {property.price.toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell className="capitalize">
                          {property.type}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              property.status === "available"
                                ? "default"
                                : property.status === "sold"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {property.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Bed size={14} />
                              {property.bedrooms}
                            </div>
                            <div className="flex items-center gap-1">
                              <Bath size={14} />
                              {property.bathrooms}
                            </div>
                            <div className="flex items-center gap-1">
                              <Square size={14} />
                              {property.area} sq ft
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditProperty(property)}
                            >
                              <Edit size={14} />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteProperty(property.id)}
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                  <CardDescription>
                    Property sales and revenue data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    $
                    {properties
                      .filter((p) => p.status === "sold")
                      .reduce((sum, p) => sum + p.price, 0)
                      .toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Total revenue from sold properties
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Average Price</CardTitle>
                  <CardDescription>Average property price</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    $
                    {Math.round(
                      properties.reduce((sum, p) => sum + p.price, 0) /
                        properties.length,
                    ).toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Across all properties
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Property Types</CardTitle>
                  <CardDescription>Distribution by type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {["apartment", "house", "condo", "townhouse"].map(
                      (type) => {
                        const count = properties.filter(
                          (p) => p.type === type,
                        ).length;
                        return (
                          <div key={type} className="flex justify-between">
                            <span className="capitalize">{type}</span>
                            <span className="font-medium">{count}</span>
                          </div>
                        );
                      },
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage user accounts and roles (Super Admin feature)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users
                    size={48}
                    className="mx-auto text-muted-foreground mb-4"
                  />
                  <p className="text-muted-foreground">
                    User management features are available for Super Admins
                    only.
                  </p>
                  {user?.role !== "super_admin" && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Contact a Super Admin to manage user roles.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard Settings</CardTitle>
                <CardDescription>
                  Configure your dashboard preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Current Role</Label>
                    <div className="mt-1">
                      <Badge variant="outline" className="capitalize">
                        {user?.role?.replace("_", " ")}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label>Account Email</Label>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {user?.email}
                    </div>
                  </div>
                  <div>
                    <Label>Account Name</Label>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {user?.name}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Property Dialog */}
      <Dialog
        open={!!editingProperty}
        onOpenChange={(open) => !open && setEditingProperty(null)}
      >
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Property</DialogTitle>
            <DialogDescription>Update the property details.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={newProperty.title || ""}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, title: e.target.value })
                }
                placeholder="Property title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-price">Price ($)</Label>
              <Input
                id="edit-price"
                type="number"
                value={newProperty.price || ""}
                onChange={(e) =>
                  setNewProperty({
                    ...newProperty,
                    price: parseInt(e.target.value) || 0,
                  })
                }
                placeholder="450000"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="edit-location">Location</Label>
              <Input
                id="edit-location"
                value={newProperty.location || ""}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, location: e.target.value })
                }
                placeholder="Downtown, City Center"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-bedrooms">Bedrooms</Label>
              <Input
                id="edit-bedrooms"
                type="number"
                value={newProperty.bedrooms || ""}
                onChange={(e) =>
                  setNewProperty({
                    ...newProperty,
                    bedrooms: parseInt(e.target.value) || 1,
                  })
                }
                placeholder="2"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-bathrooms">Bathrooms</Label>
              <Input
                id="edit-bathrooms"
                type="number"
                value={newProperty.bathrooms || ""}
                onChange={(e) =>
                  setNewProperty({
                    ...newProperty,
                    bathrooms: parseInt(e.target.value) || 1,
                  })
                }
                placeholder="2"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-area">Area (sq ft)</Label>
              <Input
                id="edit-area"
                type="number"
                value={newProperty.area || ""}
                onChange={(e) =>
                  setNewProperty({
                    ...newProperty,
                    area: parseInt(e.target.value) || 0,
                  })
                }
                placeholder="1200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-type">Property Type</Label>
              <Select
                value={newProperty.type}
                onValueChange={(value) =>
                  setNewProperty({
                    ...newProperty,
                    type: value as Property["type"],
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select
                value={newProperty.status}
                onValueChange={(value) =>
                  setNewProperty({
                    ...newProperty,
                    status: value as Property["status"],
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={newProperty.description || ""}
                onChange={(e) =>
                  setNewProperty({
                    ...newProperty,
                    description: e.target.value,
                  })
                }
                placeholder="Property description..."
                rows={3}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setEditingProperty(null)}>
              <X size={16} className="mr-2" />
              Cancel
            </Button>
            <Button onClick={handleUpdateProperty}>
              <Save size={16} className="mr-2" />
              Update Property
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
