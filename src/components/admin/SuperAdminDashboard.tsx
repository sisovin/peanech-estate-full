import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Shield,
  Edit,
  Save,
  X,
  UserCheck,
  UserX,
  Crown,
  Settings,
  BarChart3,
  Building2,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";

type UserRole = "visitor" | "agent" | "admin" | "super_admin";

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
  lastLogin: string;
  status: "active" | "inactive" | "suspended";
}

const SuperAdminDashboard = () => {
  const { user, logout, updateUserRole } = useAuth();
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      email: "visitor@demo.com",
      name: "Demo Visitor",
      role: "visitor",
      createdAt: "2024-01-15",
      lastLogin: "2024-01-20",
      status: "active",
    },
    {
      id: "2",
      email: "agent@demo.com",
      name: "Demo Agent",
      role: "agent",
      createdAt: "2024-01-10",
      lastLogin: "2024-01-19",
      status: "active",
    },
    {
      id: "3",
      email: "admin@demo.com",
      name: "Demo Admin",
      role: "admin",
      createdAt: "2024-01-05",
      lastLogin: "2024-01-21",
      status: "active",
    },
    {
      id: "4",
      email: "superadmin@demo.com",
      name: "Demo Super Admin",
      role: "super_admin",
      createdAt: "2024-01-01",
      lastLogin: "2024-01-21",
      status: "active",
    },
    {
      id: "5",
      email: "john.doe@example.com",
      name: "John Doe",
      role: "visitor",
      createdAt: "2024-01-18",
      lastLogin: "2024-01-20",
      status: "active",
    },
  ]);

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newRole, setNewRole] = useState<UserRole>("visitor");
  const [activeTab, setActiveTab] = useState("users");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setNewRole(user.role);
  };

  const handleUpdateUserRole = async () => {
    if (editingUser && newRole !== editingUser.role) {
      setIsUpdating(true);

      try {
        await updateUserRole(editingUser.id, newRole);

        // Update local state
        setUsers(
          users.map((u) =>
            u.id === editingUser.id ? { ...u, role: newRole } : u,
          ),
        );

        setEditingUser(null);
      } catch (error) {
        console.error("Failed to update user role:", error);
      } finally {
        setIsUpdating(false);
      }
    } else {
      setEditingUser(null);
    }
  };

  const handleToggleUserStatus = (userId: string) => {
    setUsers(
      users.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === "active" ? "suspended" : "active" }
          : u,
      ),
    );
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case "super_admin":
        return <Crown size={16} className="text-purple-600" />;
      case "admin":
        return <Shield size={16} className="text-blue-600" />;
      case "agent":
        return <UserCheck size={16} className="text-green-600" />;
      default:
        return <Users size={16} className="text-gray-600" />;
    }
  };

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case "super_admin":
        return "default";
      case "admin":
        return "secondary";
      case "agent":
        return "outline";
      default:
        return "outline";
    }
  };

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter((u) => u.status === "active").length,
    admins: users.filter((u) => u.role === "admin" || u.role === "super_admin")
      .length,
    agents: users.filter((u) => u.role === "agent").length,
    visitors: users.filter((u) => u.role === "visitor").length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Super Admin Dashboard
              </h1>
              <p className="text-muted-foreground">
                Welcome back, {user?.name} ({user?.role?.replace("_", " ")})
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
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users size={16} />
              User Management
            </TabsTrigger>
            <TabsTrigger value="roles" className="flex items-center gap-2">
              <Shield size={16} />
              Role Analytics
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Settings size={16} />
              System Settings
            </TabsTrigger>
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 size={16} />
              Overview
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Users
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsers}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Users
                  </CardTitle>
                  <UserCheck className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {stats.activeUsers}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Admins</CardTitle>
                  <Shield className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {stats.admins}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Agents</CardTitle>
                  <Building2 className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {stats.agents}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Visitors
                  </CardTitle>
                  <Users className="h-4 w-4 text-gray-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-600">
                    {stats.visitors}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Users Table */}
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage user accounts, roles, and permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                                alt={user.name}
                              />
                              <AvatarFallback>
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getRoleIcon(user.role)}
                            <Badge
                              variant={getRoleBadgeVariant(user.role)}
                              className="capitalize"
                            >
                              {user.role.replace("_", " ")}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.status === "active"
                                ? "default"
                                : user.status === "suspended"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.createdAt}</TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditUser(user)}
                            >
                              <Edit size={14} />
                            </Button>
                            <Button
                              size="sm"
                              variant={
                                user.status === "active"
                                  ? "destructive"
                                  : "default"
                              }
                              onClick={() => handleToggleUserStatus(user.id)}
                            >
                              {user.status === "active" ? (
                                <UserX size={14} />
                              ) : (
                                <UserCheck size={14} />
                              )}
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

          {/* Role Analytics Tab */}
          <TabsContent value="roles">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="text-purple-600" size={20} />
                    Super Admins
                  </CardTitle>
                  <CardDescription>
                    System administrators with full access
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">
                    {users.filter((u) => u.role === "super_admin").length}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Can manage all users and system settings
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="text-blue-600" size={20} />
                    Admins
                  </CardTitle>
                  <CardDescription>
                    Property and content administrators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {users.filter((u) => u.role === "admin").length}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Can manage properties and content
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="text-green-600" size={20} />
                    Agents
                  </CardTitle>
                  <CardDescription>
                    Real estate agents and brokers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {users.filter((u) => u.role === "agent").length}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Can manage their own listings
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="text-gray-600" size={20} />
                    Visitors
                  </CardTitle>
                  <CardDescription>Regular platform users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-600">
                    {users.filter((u) => u.role === "visitor").length}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Can browse and search properties
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Settings Tab */}
          <TabsContent value="system">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                  <CardDescription>
                    Configure global platform settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label>Platform Name</Label>
                      <Input value="PeanechEstate" readOnly className="mt-1" />
                    </div>
                    <div>
                      <Label>Default User Role</Label>
                      <Select defaultValue="visitor">
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="visitor">Visitor</SelectItem>
                          <SelectItem value="agent">Agent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full">Save Settings</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage security and access controls
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Two-Factor Authentication</Label>
                      <Badge variant="outline">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Session Timeout</Label>
                      <span className="text-sm text-muted-foreground">
                        24 hours
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Password Policy</Label>
                      <Badge variant="default">Strong</Badge>
                    </div>
                    <Button variant="outline" className="w-full">
                      Configure Security
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                  <CardDescription>Overall platform status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Database</span>
                      <Badge variant="default">Healthy</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>API Services</span>
                      <Badge variant="default">Online</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Storage</span>
                      <Badge variant="default">Available</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest system events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>New user registration</span>
                      <span className="text-muted-foreground">2 min ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Property added</span>
                      <span className="text-muted-foreground">1 hour ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Role updated</span>
                      <span className="text-muted-foreground">3 hours ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Users size={16} className="mr-2" />
                      Export User Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Shield size={16} className="mr-2" />
                      Backup System
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings size={16} className="mr-2" />
                      System Maintenance
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit User Role Dialog */}
      <Dialog
        open={!!editingUser}
        onOpenChange={(open) => !open && setEditingUser(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User Role</DialogTitle>
            <DialogDescription>
              Change the role for {editingUser?.name} ({editingUser?.email})
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Current Role</Label>
              <div className="flex items-center gap-2">
                {editingUser && getRoleIcon(editingUser.role)}
                <Badge
                  variant={
                    editingUser
                      ? getRoleBadgeVariant(editingUser.role)
                      : "outline"
                  }
                  className="capitalize"
                >
                  {editingUser?.role.replace("_", " ")}
                </Badge>
              </div>
            </div>
            <div className="space-y-2">
              <Label>New Role</Label>
              <Select
                value={newRole}
                onValueChange={(value) => setNewRole(value as UserRole)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="visitor">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-gray-600" />
                      Visitor
                    </div>
                  </SelectItem>
                  <SelectItem value="agent">
                    <div className="flex items-center gap-2">
                      <UserCheck size={16} className="text-green-600" />
                      Agent
                    </div>
                  </SelectItem>
                  <SelectItem value="admin">
                    <div className="flex items-center gap-2">
                      <Shield size={16} className="text-blue-600" />
                      Admin
                    </div>
                  </SelectItem>
                  <SelectItem value="super_admin">
                    <div className="flex items-center gap-2">
                      <Crown size={16} className="text-purple-600" />
                      Super Admin
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setEditingUser(null)}>
              <X size={16} className="mr-2" />
              Cancel
            </Button>
            <Button onClick={handleUpdateUserRole} disabled={isUpdating}>
              <Save size={16} className="mr-2" />
              {isUpdating ? "Updating..." : "Update Role"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SuperAdminDashboard;
