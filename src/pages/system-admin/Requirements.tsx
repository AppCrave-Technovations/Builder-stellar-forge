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
import { ResourceFunnel } from "@/components/dashboard/ResourceFunnel";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  FileText,
  MoreHorizontal,
  Edit,
  Clock,
  Users,
  ArrowUpRight,
  Plus,
  PauseCircle,
  PlayCircle,
  CheckCircle,
  Calendar,
  Briefcase,
  EyeOff,
} from "lucide-react";

export default function Requirements() {
  const [isAddRequirementOpen, setIsAddRequirementOpen] = useState(false);
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState<any>(null);
  const [selectedTab, setSelectedTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for requirements
  const requirements = [
    {
      id: "REQ-001",
      title: "Senior React Developer",
      clientName: "Acme Corp",
      status: "active",
      dueDate: "Aug 15, 2023",
      createdAt: "Jul 1, 2023",
      location: "New York, NY (Remote)",
      activeRecruiters: 12,
      submittedCandidates: 18,
      interviewedCandidates: 6,
      hiredCandidates: 0,
      isEndClientHidden: false,
      description:
        "Looking for a senior React developer with 5+ years of experience in building modern web applications...",
      skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
      minYearsExperience: 5,
      maxSalary: "$150,000",
    },
    {
      id: "REQ-002",
      title: "DevOps Engineer",
      clientName: "Tech Solutions",
      status: "active",
      dueDate: "Aug 20, 2023",
      createdAt: "Jul 5, 2023",
      location: "San Francisco, CA (Hybrid)",
      activeRecruiters: 8,
      submittedCandidates: 12,
      interviewedCandidates: 4,
      hiredCandidates: 1,
      isEndClientHidden: true,
      description:
        "Seeking a DevOps engineer with strong experience in containerization, CI/CD pipelines, and cloud infrastructure...",
      skills: ["Docker", "Kubernetes", "AWS", "Jenkins", "Terraform"],
      minYearsExperience: 3,
      maxSalary: "$140,000",
    },
    {
      id: "REQ-003",
      title: "Product Manager",
      clientName: "Innovate Inc",
      status: "paused",
      dueDate: "Sep 1, 2023",
      createdAt: "Jul 10, 2023",
      location: "Chicago, IL (On-site)",
      activeRecruiters: 5,
      submittedCandidates: 7,
      interviewedCandidates: 2,
      hiredCandidates: 0,
      isEndClientHidden: false,
      description:
        "Looking for an experienced product manager to lead our new SaaS product development...",
      skills: [
        "Product Strategy",
        "Agile",
        "User Research",
        "Roadmapping",
        "Analytics",
      ],
      minYearsExperience: 4,
      maxSalary: "$130,000",
    },
    {
      id: "REQ-004",
      title: "Data Scientist",
      clientName: "DataCorp",
      status: "completed",
      dueDate: "Jul 30, 2023",
      createdAt: "Jun 15, 2023",
      location: "Remote",
      activeRecruiters: 10,
      submittedCandidates: 15,
      interviewedCandidates: 5,
      hiredCandidates: 2,
      isEndClientHidden: false,
      description:
        "Seeking a data scientist with experience in machine learning models and big data processing...",
      skills: [
        "Python",
        "Machine Learning",
        "SQL",
        "TensorFlow",
        "Data Visualization",
      ],
      minYearsExperience: 3,
      maxSalary: "$145,000",
    },
    {
      id: "REQ-005",
      title: "UX Designer",
      clientName: "Creative Studios",
      status: "active",
      dueDate: "Aug 25, 2023",
      createdAt: "Jul 12, 2023",
      location: "Los Angeles, CA (Hybrid)",
      activeRecruiters: 6,
      submittedCandidates: 9,
      interviewedCandidates: 3,
      hiredCandidates: 0,
      isEndClientHidden: true,
      description:
        "Looking for a UX designer with a strong portfolio and experience in creating user-centered designs...",
      skills: [
        "Figma",
        "User Research",
        "Wireframing",
        "Prototyping",
        "UI Design",
      ],
      minYearsExperience: 2,
      maxSalary: "$120,000",
    },
  ];

  // Filter requirements based on selected tab and search query
  const filteredRequirements = requirements.filter((req) => {
    const matchesTab =
      selectedTab === "all" ||
      (selectedTab === "active" && req.status === "active") ||
      (selectedTab === "paused" && req.status === "paused") ||
      (selectedTab === "completed" && req.status === "completed");

    const matchesSearch =
      searchQuery === "" ||
      req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.id.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  // Mock resource funnel data for the selected requirement
  const resourceFunnelData = [
    { stage: "Applied", count: 18, color: "#4f46e5" },
    { stage: "Screened", count: 12, color: "#6366f1" },
    { stage: "Interviewed", count: 6, color: "#8b5cf6" },
    { stage: "Hired", count: 0, color: "#10b981" },
    { stage: "Rejected", count: 12, color: "#ef4444" },
  ];

  const handleViewDetails = (requirement: any) => {
    setSelectedRequirement(requirement);
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
          <h1 className="text-2xl font-bold">Requirements Management</h1>
          <Button onClick={() => setIsAddRequirementOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Requirement
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{requirements.length}</div>
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
                {requirements.filter((r) => r.status === "active").length}
                <span className="text-xs text-green-500 ml-2">
                  (60% of total)
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. Time to Fill
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                18 days
                <span className="text-xs text-green-500 ml-2">(-2 days)</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Candidates Hired
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                3
                <span className="text-xs text-green-500 ml-2">
                  (this month)
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">All Requirements</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="paused">Paused</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search requirements..."
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
                  <DropdownMenuItem>Title (A-Z)</DropdownMenuItem>
                  <DropdownMenuItem>Due Date (Earliest)</DropdownMenuItem>
                  <DropdownMenuItem>Most Candidates</DropdownMenuItem>
                  <DropdownMenuItem>Recently Added</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <TabsContent value="all" className="space-y-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-center">Recruiters</TableHead>
                    <TableHead className="text-center">Candidates</TableHead>
                    <TableHead className="text-center">Hired</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequirements.map((req) => (
                    <TableRow key={req.id}>
                      <TableCell className="font-medium">
                        {req.title}
                        {req.isEndClientHidden && (
                          <EyeOff className="inline-block ml-1 h-3.5 w-3.5 text-gray-400" />
                        )}
                      </TableCell>
                      <TableCell>{req.clientName}</TableCell>
                      <TableCell>
                        <StatusBadge
                          status={req.status as any}
                          className="capitalize"
                        />
                      </TableCell>
                      <TableCell>{req.dueDate}</TableCell>
                      <TableCell className="text-center">
                        {req.activeRecruiters}
                      </TableCell>
                      <TableCell className="text-center">
                        {req.submittedCandidates}
                      </TableCell>
                      <TableCell className="text-center">
                        {req.hiredCandidates}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(req)}
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
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            {/* Similar table for active requirements only */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-center">Recruiters</TableHead>
                    <TableHead className="text-center">Candidates</TableHead>
                    <TableHead className="text-center">Interviewed</TableHead>
                    <TableHead className="text-center">Hired</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequirements.map((req) => (
                    <TableRow key={req.id}>
                      <TableCell className="font-medium">
                        {req.title}
                        {req.isEndClientHidden && (
                          <EyeOff className="inline-block ml-1 h-3.5 w-3.5 text-gray-400" />
                        )}
                      </TableCell>
                      <TableCell>{req.clientName}</TableCell>
                      <TableCell>{req.dueDate}</TableCell>
                      <TableCell className="text-center">
                        {req.activeRecruiters}
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
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(req)}
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
          </TabsContent>

          <TabsContent value="paused" className="space-y-4">
            {/* Similar table for paused requirements */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Paused Since</TableHead>
                    <TableHead className="text-center">Candidates</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequirements.map((req) => (
                    <TableRow key={req.id}>
                      <TableCell className="font-medium">{req.title}</TableCell>
                      <TableCell>{req.clientName}</TableCell>
                      <TableCell>{req.dueDate}</TableCell>
                      <TableCell>Jul 15, 2023</TableCell>
                      <TableCell className="text-center">
                        {req.submittedCandidates}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDetails(req)}
                          >
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                            Details
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-500 hover:text-green-700"
                          >
                            <PlayCircle className="h-4 w-4 mr-1" />
                            Resume
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {/* Similar table for completed requirements */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Completed Date</TableHead>
                    <TableHead className="text-center">
                      Total Candidates
                    </TableHead>
                    <TableHead className="text-center">Hired</TableHead>
                    <TableHead className="text-center">Days to Fill</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequirements.map((req) => (
                    <TableRow key={req.id}>
                      <TableCell className="font-medium">{req.title}</TableCell>
                      <TableCell>{req.clientName}</TableCell>
                      <TableCell>Jul 28, 2023</TableCell>
                      <TableCell className="text-center">
                        {req.submittedCandidates}
                      </TableCell>
                      <TableCell className="text-center">
                        {req.hiredCandidates}
                      </TableCell>
                      <TableCell className="text-center">22</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDetails(req)}
                          >
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                            Details
                          </Button>
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-1" />
                            Clone
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Requirement Dialog */}
      <Dialog
        open={isAddRequirementOpen}
        onOpenChange={setIsAddRequirementOpen}
      >
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Create New Requirement</DialogTitle>
            <DialogDescription>
              Create a new job requirement to be filled by recruiters.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <h3 className="text-sm font-medium">Basic Information</h3>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Requirement Title</Label>
                <Input id="title" placeholder="Senior React Developer" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="client">Client</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="acme">Acme Corp</SelectItem>
                      <SelectItem value="tech-solutions">
                        Tech Solutions
                      </SelectItem>
                      <SelectItem value="innovate">Innovate Inc</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input id="dueDate" type="date" />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="New York, NY (Remote)" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  placeholder="Detailed job description..."
                  rows={4}
                />
              </div>
            </div>

            <h3 className="text-sm font-medium mt-4">Requirements</h3>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="skills">
                  Required Skills (comma-separated)
                </Label>
                <Input
                  id="skills"
                  placeholder="React, TypeScript, Node.js, AWS"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="experience">
                    Minimum Years of Experience
                  </Label>
                  <Input
                    id="experience"
                    type="number"
                    min="0"
                    placeholder="3"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="salary">Maximum Salary</Label>
                  <Input id="salary" placeholder="$120,000" />
                </div>
              </div>
            </div>

            <h3 className="text-sm font-medium mt-4">Settings</h3>
            <div className="grid gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="hideEndClient" />
                <Label htmlFor="hideEndClient">
                  Hide end-client name from recruiters
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="urgent" />
                <Label htmlFor="urgent">Mark as urgent requirement</Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddRequirementOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setIsAddRequirementOpen(false)}>
              Create Requirement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Requirement Details Dialog */}
      {selectedRequirement && (
        <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
          <DialogContent className="sm:max-w-[900px]">
            <DialogHeader>
              <DialogTitle>{selectedRequirement.title}</DialogTitle>
              <DialogDescription>
                Requirement ID: {selectedRequirement.id} | Client:{" "}
                {selectedRequirement.clientName}
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="overview">
              <TabsList className="w-full">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="candidates">Candidates</TabsTrigger>
                <TabsTrigger value="recruiters">Recruiters</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6 space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <StatusBadge
                          status={selectedRequirement.status as any}
                          className="capitalize"
                        />
                        <span className="text-sm text-muted-foreground">
                          {selectedRequirement.status === "active"
                            ? "Open for submissions"
                            : selectedRequirement.status === "paused"
                              ? "Temporarily paused"
                              : "Requirement filled"}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Timeline
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">
                            Created:
                          </span>
                          <span className="text-xs">
                            {selectedRequirement.createdAt}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">
                            Due By:
                          </span>
                          <span className="text-xs">
                            {selectedRequirement.dueDate}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Candidates
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">
                            Submitted:
                          </span>
                          <span className="text-xs">
                            {selectedRequirement.submittedCandidates}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">
                            Interviewed:
                          </span>
                          <span className="text-xs">
                            {selectedRequirement.interviewedCandidates}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">
                            Hired:
                          </span>
                          <span className="text-xs">
                            {selectedRequirement.hiredCandidates}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Requirement Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">Description</h4>
                        <p className="text-sm">
                          {selectedRequirement.description}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">
                          Required Skills
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedRequirement.skills.map((skill: string) => (
                            <span
                              key={skill}
                              className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-secondary text-secondary-foreground"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-semibold">
                            Experience Required
                          </h4>
                          <p className="text-sm">
                            {selectedRequirement.minYearsExperience}+ years
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold">
                            Maximum Salary
                          </h4>
                          <p className="text-sm">
                            {selectedRequirement.maxSalary}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {selectedRequirement.clientName}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {selectedRequirement.dueDate}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Resource Funnel</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResourceFunnel data={resourceFunnelData} />
                    </CardContent>
                  </Card>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Requirement
                  </Button>
                  <Button variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Recruiters
                  </Button>
                  {selectedRequirement.status === "active" ? (
                    <Button
                      variant="outline"
                      className="text-amber-500 hover:text-amber-700"
                    >
                      <PauseCircle className="h-4 w-4 mr-2" />
                      Pause Requirement
                    </Button>
                  ) : selectedRequirement.status === "paused" ? (
                    <Button
                      variant="outline"
                      className="text-green-500 hover:text-green-700"
                    >
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Resume Requirement
                    </Button>
                  ) : (
                    <Button variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Clone Requirement
                    </Button>
                  )}
                  {selectedRequirement.status !== "completed" && (
                    <Button
                      variant="outline"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark as Completed
                    </Button>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="candidates" className="mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium">
                    {selectedRequirement.submittedCandidates} Candidates
                    Submitted
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search candidates..."
                        className="pl-8 w-[200px]"
                      />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          Filter <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>All Candidates</DropdownMenuItem>
                        <DropdownMenuItem>Screened</DropdownMenuItem>
                        <DropdownMenuItem>Interviewed</DropdownMenuItem>
                        <DropdownMenuItem>Hired</DropdownMenuItem>
                        <DropdownMenuItem>Rejected</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Recruiter</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Submitted On</TableHead>
                        <TableHead>Last Updated</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">John Doe</TableCell>
                        <TableCell>Sara Johnson</TableCell>
                        <TableCell>
                          <StatusBadge
                            status="screened"
                            className="capitalize"
                          />
                        </TableCell>
                        <TableCell>Jul 15, 2023</TableCell>
                        <TableCell>Jul 18, 2023</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Jane Smith
                        </TableCell>
                        <TableCell>John Smith</TableCell>
                        <TableCell>
                          <StatusBadge
                            status="interviewed"
                            className="capitalize"
                          />
                        </TableCell>
                        <TableCell>Jul 12, 2023</TableCell>
                        <TableCell>Jul 20, 2023</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Michael Brown
                        </TableCell>
                        <TableCell>Lisa Thompson</TableCell>
                        <TableCell>
                          <StatusBadge
                            status="applied"
                            className="capitalize"
                          />
                        </TableCell>
                        <TableCell>Jul 18, 2023</TableCell>
                        <TableCell>Jul 18, 2023</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="recruiters" className="mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium">
                    {selectedRequirement.activeRecruiters} Recruiters Assigned
                  </h3>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Assign Recruiters
                  </Button>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Trust Score</TableHead>
                        <TableHead className="text-center">
                          Submissions
                        </TableHead>
                        <TableHead className="text-center">
                          Candidates Hired
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
                        <TableCell>85</TableCell>
                        <TableCell className="text-center">5</TableCell>
                        <TableCell className="text-center">0</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Sara Johnson
                        </TableCell>
                        <TableCell>sara.johnson@example.com</TableCell>
                        <TableCell>92</TableCell>
                        <TableCell className="text-center">7</TableCell>
                        <TableCell className="text-center">1</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View Details
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
