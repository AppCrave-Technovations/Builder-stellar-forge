import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  Search,
  Building,
  MoreHorizontal,
  Edit,
  Trash,
  FileText,
  Users,
  ArrowUpRight,
  Plus,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function Clients() {
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for clients
  const clients = [
    {
      id: "CLI-001",
      name: "Acme Corporation",
      industry: "Technology",
      location: "New York, NY",
      activeRequirements: 5,
      assignedRecruiters: 12,
      status: "active",
      createdAt: "Jan 12, 2023",
      contactName: "John Smith",
      contactEmail: "john.smith@acmecorp.com",
      contactPhone: "(212) 555-1234",
    },
    {
      id: "CLI-002",
      name: "Tech Solutions Inc",
      industry: "Software Development",
      location: "San Francisco, CA",
      activeRequirements: 8,
      assignedRecruiters: 15,
      status: "active",
      createdAt: "Feb 3, 2023",
      contactName: "Emily Johnson",
      contactEmail: "emily@techsolutions.com",
      contactPhone: "(415) 555-6789",
    },
    {
      id: "CLI-003",
      name: "Innovate Ltd",
      industry: "Financial Services",
      location: "Chicago, IL",
      activeRequirements: 3,
      assignedRecruiters: 6,
      status: "active",
      createdAt: "Mar 15, 2023",
      contactName: "Michael Brown",
      contactEmail: "mbrown@innovateltd.com",
      contactPhone: "(312) 555-4321",
    },
    {
      id: "CLI-004",
      name: "Global Industries",
      industry: "Manufacturing",
      location: "Detroit, MI",
      activeRequirements: 0,
      assignedRecruiters: 0,
      status: "inactive",
      createdAt: "Apr 22, 2023",
      contactName: "Sarah Wilson",
      contactEmail: "swilson@globalind.com",
      contactPhone: "(313) 555-8765",
    },
    {
      id: "CLI-005",
      name: "DataCorp Analytics",
      industry: "Data Science",
      location: "Boston, MA",
      activeRequirements: 6,
      assignedRecruiters: 10,
      status: "active",
      createdAt: "May 10, 2023",
      contactName: "Robert Davis",
      contactEmail: "rdavis@datacorp.com",
      contactPhone: "(617) 555-2468",
    },
    {
      id: "CLI-006",
      name: "Creative Studios",
      industry: "Design & Media",
      location: "Los Angeles, CA",
      activeRequirements: 4,
      assignedRecruiters: 8,
      status: "active",
      createdAt: "Jun 18, 2023",
      contactName: "Lisa Chen",
      contactEmail: "lchen@creativestudios.com",
      contactPhone: "(213) 555-1357",
    },
    {
      id: "CLI-007",
      name: "Healthcare Partners",
      industry: "Healthcare",
      location: "Houston, TX",
      activeRequirements: 10,
      assignedRecruiters: 20,
      status: "active",
      createdAt: "Jul 7, 2023",
      contactName: "David Miller",
      contactEmail: "dmiller@healthcarepartners.com",
      contactPhone: "(832) 555-9753",
    },
  ];

  // Filter clients based on search query
  const filteredClients = clients.filter((client) => {
    return (
      searchQuery === "" ||
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Mock data for client requirements
  const clientRequirements = [
    {
      id: "REQ-001",
      title: "Senior React Developer",
      status: "active",
      dueDate: "Aug 15, 2023",
      assignedRecruiters: 8,
      submittedCandidates: 12,
      interviewedCandidates: 5,
      hiredCandidates: 0,
    },
    {
      id: "REQ-002",
      title: "DevOps Engineer",
      status: "active",
      dueDate: "Aug 20, 2023",
      assignedRecruiters: 6,
      submittedCandidates: 9,
      interviewedCandidates: 3,
      hiredCandidates: 1,
    },
    {
      id: "REQ-003",
      title: "UX Designer",
      status: "paused",
      dueDate: "Sep 1, 2023",
      assignedRecruiters: 4,
      submittedCandidates: 7,
      interviewedCandidates: 2,
      hiredCandidates: 0,
    },
    {
      id: "REQ-004",
      title: "Product Manager",
      status: "completed",
      dueDate: "Jul 30, 2023",
      assignedRecruiters: 5,
      submittedCandidates: 11,
      interviewedCandidates: 4,
      hiredCandidates: 1,
    },
  ];

  const handleViewDetails = (client: any) => {
    setSelectedClient(client);
    setIsViewDetailsOpen(true);
  };

  return (
    <DashboardLayout
      userType="system-admin"
      userName="Alex Johnson"
      userInitials="AJ"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Client Management</h1>
          <Button onClick={() => setIsAddClientOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Clients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {clients.length}
                <span className="text-xs text-muted-foreground ml-2">
                  (+3 this quarter)
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Active Clients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {clients.filter((c) => c.status === "active").length}
                <span className="text-xs text-green-500 ml-2">
                  (90% of total)
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Active Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                36
                <span className="text-xs text-green-500 ml-2">(+8)</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Assigned Recruiters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                71
                <span className="text-xs text-green-500 ml-2">(+15%)</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">All Clients</h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search clients..."
                className="pl-8 w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Sort by <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Name (A-Z)</DropdownMenuItem>
                <DropdownMenuItem>Most Active Requirements</DropdownMenuItem>
                <DropdownMenuItem>Recently Added</DropdownMenuItem>
                <DropdownMenuItem>Most Recruiters</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client Name</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">
                  Active Requirements
                </TableHead>
                <TableHead className="text-center">
                  Assigned Recruiters
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.industry}</TableCell>
                  <TableCell>{client.location}</TableCell>
                  <TableCell>
                    <StatusBadge
                      status={client.status as any}
                      className="capitalize"
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    {client.activeRequirements}
                  </TableCell>
                  <TableCell className="text-center">
                    {client.assignedRecruiters}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDetails(client)}
                    >
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Add Client Dialog */}
      <Dialog open={isAddClientOpen} onOpenChange={setIsAddClientOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Client</DialogTitle>
            <DialogDescription>
              Create a new client account in the system. You can add
              requirements and assign recruiters later.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <h3 className="text-sm font-medium">Client Information</h3>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="clientName">Client Name</Label>
                <Input id="clientName" placeholder="Acme Corporation" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input id="industry" placeholder="Technology" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="New York, NY" />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description about the client..."
                  rows={3}
                />
              </div>
            </div>

            <h3 className="text-sm font-medium mt-4">Primary Contact</h3>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="contactName">Contact Name</Label>
                <Input id="contactName" placeholder="John Smith" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="contactEmail">Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    placeholder="john@acmecorp.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contactPhone">Phone</Label>
                  <Input id="contactPhone" placeholder="(212) 555-1234" />
                </div>
              </div>
            </div>

            <h3 className="text-sm font-medium mt-4">Account Settings</h3>
            <div className="grid gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="createAdmin" />
                <Label htmlFor="createAdmin">
                  Create a client admin account for this contact
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="hideEndClient" />
                <Label htmlFor="hideEndClient">
                  Hide end-client name from recruiters by default
                </Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddClientOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddClientOpen(false)}>
              Create Client
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Client Details Dialog */}
      {selectedClient && (
        <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
          <DialogContent className="sm:max-w-[900px]">
            <DialogHeader>
              <DialogTitle>{selectedClient.name}</DialogTitle>
              <DialogDescription>
                Client details and active requirements
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="details">
              <TabsList className="w-full">
                <TabsTrigger value="details">Client Details</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="recruiters">
                  Assigned Recruiters
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Business Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="grid grid-cols-2 gap-1">
                        <div className="text-sm font-medium">Client ID:</div>
                        <div>{selectedClient.id}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <div className="text-sm font-medium">Industry:</div>
                        <div>{selectedClient.industry}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <div className="text-sm font-medium">Location:</div>
                        <div>{selectedClient.location}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <div className="text-sm font-medium">Status:</div>
                        <div>
                          <StatusBadge
                            status={selectedClient.status as any}
                            className="capitalize"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <div className="text-sm font-medium">Created On:</div>
                        <div>{selectedClient.createdAt}</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Contact Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="grid grid-cols-2 gap-1">
                        <div className="text-sm font-medium">Contact Name:</div>
                        <div>{selectedClient.contactName}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <div className="text-sm font-medium">Email:</div>
                        <div>{selectedClient.contactEmail}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <div className="text-sm font-medium">Phone:</div>
                        <div>{selectedClient.contactPhone}</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Client
                  </Button>
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Create Requirement
                  </Button>
                  <Button variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    Assign Recruiters
                  </Button>
                  {selectedClient.status === "active" ? (
                    <Button
                      variant="outline"
                      className="text-red-500 hover:text-red-700"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Deactivate Client
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="text-green-500 hover:text-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Activate Client
                    </Button>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="requirements" className="mt-6">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead className="text-center">
                          Recruiters
                        </TableHead>
                        <TableHead className="text-center">Submitted</TableHead>
                        <TableHead className="text-center">
                          Interviewed
                        </TableHead>
                        <TableHead className="text-center">Hired</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clientRequirements.map((req) => (
                        <TableRow key={req.id}>
                          <TableCell className="font-medium">
                            {req.title}
                          </TableCell>
                          <TableCell>
                            <StatusBadge
                              status={req.status as any}
                              className="capitalize"
                            />
                          </TableCell>
                          <TableCell>{req.dueDate}</TableCell>
                          <TableCell className="text-center">
                            {req.assignedRecruiters}
                          </TableCell>
                          <TableCell className="text-center">
                            {req.submittedCandidates}
                          </TableCell>
                          <TableCell className="text-center">
                            {req.interviewedCandidates}
                          </TableCell>
                          <TableCell className="text-center">
                            {req.hiredCandidates}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <ArrowUpRight className="h-4 w-4 mr-1" />
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="recruiters" className="mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium">
                    {selectedClient.assignedRecruiters} Recruiters Assigned
                  </h3>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Assign New Recruiters
                  </Button>
                </div>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Trust Score</TableHead>
                        <TableHead className="text-center">
                          Submissions
                        </TableHead>
                        <TableHead className="text-center">
                          Placements
                        </TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          John Smith
                        </TableCell>
                        <TableCell>john.smith@example.com</TableCell>
                        <TableCell>
                          <StatusBadge status="active" className="capitalize" />
                        </TableCell>
                        <TableCell>85</TableCell>
                        <TableCell className="text-center">12</TableCell>
                        <TableCell className="text-center">5</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Sara Johnson
                        </TableCell>
                        <TableCell>sara.johnson@example.com</TableCell>
                        <TableCell>
                          <StatusBadge status="active" className="capitalize" />
                        </TableCell>
                        <TableCell>92</TableCell>
                        <TableCell className="text-center">18</TableCell>
                        <TableCell className="text-center">7</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsViewDetailsOpen(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </DashboardLayout>
  );
}
