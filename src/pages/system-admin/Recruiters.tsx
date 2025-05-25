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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  ChevronDown,
  Search,
  UserPlus,
  MoreHorizontal,
  Edit,
  Trash,
  Shield,
  ArrowUpRight,
  BarChart3,
  Users,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function Recruiters() {
  const [isAddRecruiterOpen, setIsAddRecruiterOpen] = useState(false);
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecruiter, setSelectedRecruiter] = useState<any>(null);

  // Mock data for recruiters
  const recruiters = [
    {
      id: "REC-001",
      name: "John Smith",
      email: "john.smith@example.com",
      status: "active",
      submittedCandidates: 32,
      hiredCandidates: 12,
      trustScore: 85,
      lastActive: "2 hours ago",
      createdAt: "Jan 12, 2023",
      level: 3,
    },
    {
      id: "REC-002",
      name: "Sara Johnson",
      email: "sara.johnson@example.com",
      status: "active",
      submittedCandidates: 45,
      hiredCandidates: 18,
      trustScore: 92,
      lastActive: "1 day ago",
      createdAt: "Feb 3, 2023",
      level: 4,
    },
    {
      id: "REC-003",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      status: "inactive",
      submittedCandidates: 8,
      hiredCandidates: 2,
      trustScore: 60,
      lastActive: "3 weeks ago",
      createdAt: "Mar 15, 2023",
      level: 1,
    },
    {
      id: "REC-004",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      status: "pending",
      submittedCandidates: 0,
      hiredCandidates: 0,
      trustScore: 50,
      lastActive: "Never",
      createdAt: "Apr 22, 2023",
      level: 1,
    },
    {
      id: "REC-005",
      name: "Robert Wilson",
      email: "robert.wilson@example.com",
      status: "active",
      submittedCandidates: 28,
      hiredCandidates: 9,
      trustScore: 78,
      lastActive: "12 hours ago",
      createdAt: "May 10, 2023",
      level: 2,
    },
    {
      id: "REC-006",
      name: "Lisa Thompson",
      email: "lisa.thompson@example.com",
      status: "active",
      submittedCandidates: 60,
      hiredCandidates: 25,
      trustScore: 95,
      lastActive: "3 hours ago",
      createdAt: "Jun 18, 2023",
      level: 5,
    },
    {
      id: "REC-007",
      name: "David Clark",
      email: "david.clark@example.com",
      status: "active",
      submittedCandidates: 15,
      hiredCandidates: 4,
      trustScore: 70,
      lastActive: "2 days ago",
      createdAt: "Jul 7, 2023",
      level: 2,
    },
    {
      id: "REC-008",
      name: "Jennifer Lee",
      email: "jennifer.lee@example.com",
      status: "active",
      submittedCandidates: 22,
      hiredCandidates: 7,
      trustScore: 75,
      lastActive: "6 hours ago",
      createdAt: "Aug 29, 2023",
      level: 2,
    },
  ];

  // Filter recruiters based on selected tab and search query
  const filteredRecruiters = recruiters.filter((recruiter) => {
    const matchesTab =
      selectedTab === "all" ||
      (selectedTab === "active" && recruiter.status === "active") ||
      (selectedTab === "inactive" &&
        (recruiter.status === "inactive" || recruiter.status === "pending"));

    const matchesSearch =
      searchQuery === "" ||
      recruiter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recruiter.email.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  // Mock performance data for the selected recruiter
  const performanceData = [
    { month: "Jan", submissions: 8, hires: 3 },
    { month: "Feb", submissions: 12, hires: 5 },
    { month: "Mar", submissions: 10, hires: 4 },
    { month: "Apr", submissions: 15, hires: 6 },
    { month: "May", submissions: 18, hires: 7 },
    { month: "Jun", submissions: 20, hires: 8 },
  ];

  const handleViewDetails = (recruiter: any) => {
    setSelectedRecruiter(recruiter);
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
          <h1 className="text-2xl font-bold">Recruiters Management</h1>
          <Button onClick={() => setIsAddRecruiterOpen(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Recruiter
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Recruiters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {recruiters.length}
                <span className="text-xs text-muted-foreground ml-2">
                  (+12% this month)
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Active Recruiters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {recruiters.filter((r) => r.status === "active").length}
                <span className="text-xs text-green-500 ml-2">
                  (85% of total)
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. Trust Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                78
                <span className="text-xs text-green-500 ml-2">(+5 pts)</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Placements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                77
                <span className="text-xs text-green-500 ml-2">(+15%)</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">All Recruiters</TabsTrigger>
              <TabsTrigger value="active">Active Recruiters</TabsTrigger>
              <TabsTrigger value="inactive">Inactive/Pending</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search recruiters..."
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
                  <DropdownMenuItem>Trust Score (High-Low)</DropdownMenuItem>
                  <DropdownMenuItem>Placements (High-Low)</DropdownMenuItem>
                  <DropdownMenuItem>Recently Active</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <TabsContent value="all" className="space-y-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Trust Score</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Submissions</TableHead>
                    <TableHead>Placements</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecruiters.map((recruiter) => (
                    <TableRow key={recruiter.id}>
                      <TableCell className="font-medium">
                        {recruiter.name}
                      </TableCell>
                      <TableCell>{recruiter.email}</TableCell>
                      <TableCell>
                        <StatusBadge
                          status={recruiter.status as any}
                          className="capitalize"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-24">
                            <Progress
                              value={recruiter.trustScore}
                              className="h-2"
                            />
                          </div>
                          <span>{recruiter.trustScore}</span>
                        </div>
                      </TableCell>
                      <TableCell>Level {recruiter.level}</TableCell>
                      <TableCell>{recruiter.submittedCandidates}</TableCell>
                      <TableCell>{recruiter.hiredCandidates}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(recruiter)}
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
            {/* Similar table for active recruiters only */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Trust Score</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Submissions</TableHead>
                    <TableHead>Placements</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecruiters.map((recruiter) => (
                    <TableRow key={recruiter.id}>
                      <TableCell className="font-medium">
                        {recruiter.name}
                      </TableCell>
                      <TableCell>{recruiter.email}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-24">
                            <Progress
                              value={recruiter.trustScore}
                              className="h-2"
                            />
                          </div>
                          <span>{recruiter.trustScore}</span>
                        </div>
                      </TableCell>
                      <TableCell>Level {recruiter.level}</TableCell>
                      <TableCell>{recruiter.submittedCandidates}</TableCell>
                      <TableCell>{recruiter.hiredCandidates}</TableCell>
                      <TableCell>{recruiter.lastActive}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(recruiter)}
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

          <TabsContent value="inactive" className="space-y-4">
            {/* Similar table for inactive recruiters */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Trust Score</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Created Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecruiters.map((recruiter) => (
                    <TableRow key={recruiter.id}>
                      <TableCell className="font-medium">
                        {recruiter.name}
                      </TableCell>
                      <TableCell>{recruiter.email}</TableCell>
                      <TableCell>
                        <StatusBadge
                          status={recruiter.status as any}
                          className="capitalize"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-24">
                            <Progress
                              value={recruiter.trustScore}
                              className="h-2"
                            />
                          </div>
                          <span>{recruiter.trustScore}</span>
                        </div>
                      </TableCell>
                      <TableCell>{recruiter.lastActive}</TableCell>
                      <TableCell>{recruiter.createdAt}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Shield className="h-4 w-4 mr-2" /> Activate
                              Account
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Trash className="h-4 w-4 mr-2" /> Delete Account
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Recruiter Dialog */}
      <Dialog open={isAddRecruiterOpen} onOpenChange={setIsAddRecruiterOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Recruiter</DialogTitle>
            <DialogDescription>
              Create a new recruiter account. They will receive an email to set
              up their password.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Phone (Optional)</Label>
              <Input id="phone" type="tel" placeholder="(123) 456-7890" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="client">Assign to Client (Optional)</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="acme">Acme Corp</SelectItem>
                  <SelectItem value="tech-solutions">Tech Solutions</SelectItem>
                  <SelectItem value="innovate">Innovate Inc</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="initialTrust">
                Initial Trust Score (Optional)
              </Label>
              <Input
                id="initialTrust"
                type="number"
                placeholder="50"
                min="0"
                max="100"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Default is 50 if left blank
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddRecruiterOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setIsAddRecruiterOpen(false)}>
              Create Recruiter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Recruiter Details Dialog */}
      {selectedRecruiter && (
        <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
          <DialogContent className="sm:max-w-[900px]">
            <DialogHeader>
              <DialogTitle>Recruiter Details</DialogTitle>
              <DialogDescription>
                Detailed information about {selectedRecruiter.name}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Trust Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-2">
                      <div className="text-2xl font-bold">
                        {selectedRecruiter.trustScore}/100
                      </div>
                      <Progress
                        value={selectedRecruiter.trustScore}
                        className="h-2"
                      />
                      <div className="text-xs text-muted-foreground">
                        Level {selectedRecruiter.level} Recruiter
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Submissions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {selectedRecruiter.submittedCandidates}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {selectedRecruiter.status === "active"
                        ? "Active recruiter"
                        : "Inactive recruiter"}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Placement Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {Math.round(
                        (selectedRecruiter.hiredCandidates /
                          selectedRecruiter.submittedCandidates) *
                          100,
                      ) || 0}
                      %
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {selectedRecruiter.hiredCandidates} successful placements
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Performance History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ChartContainer
                        config={{
                          submissions: { color: "#4f46e5" },
                          hires: { color: "#10b981" },
                        }}
                      >
                        <BarChart data={performanceData}>
                          <XAxis
                            dataKey="month"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                          />
                          <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                          />
                          <ChartTooltip>
                            <ChartTooltipContent />
                          </ChartTooltip>
                          <Bar
                            dataKey="submissions"
                            name="Submissions"
                            fill="#4f46e5"
                            radius={[4, 4, 0, 0]}
                          />
                          <Bar
                            dataKey="hires"
                            name="Hires"
                            fill="#10b981"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="grid grid-cols-2 gap-1">
                      <div className="text-sm font-medium">Full Name:</div>
                      <div>{selectedRecruiter.name}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <div className="text-sm font-medium">Email:</div>
                      <div>{selectedRecruiter.email}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <div className="text-sm font-medium">Status:</div>
                      <div>
                        <StatusBadge
                          status={selectedRecruiter.status as any}
                          className="capitalize"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <div className="text-sm font-medium">Last Active:</div>
                      <div>{selectedRecruiter.lastActive}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <div className="text-sm font-medium">
                        Account Created:
                      </div>
                      <div>{selectedRecruiter.createdAt}</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-2">
                        <div className="min-w-[24px] mt-0.5">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            Candidate submission accepted
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Senior React Developer position - 2 hours ago
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="min-w-[24px] mt-0.5">
                          <Users className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            Added to new requirement
                          </p>
                          <p className="text-xs text-muted-foreground">
                            DevOps Engineer position - 1 day ago
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="min-w-[24px] mt-0.5">
                          <XCircle className="h-5 w-5 text-red-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            Candidate submission rejected
                          </p>
                          <p className="text-xs text-muted-foreground">
                            UX Designer position - 3 days ago
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsViewDetailsOpen(false)}
              >
                Close
              </Button>
              <Button variant="outline">Edit Details</Button>
              <Button>Message Recruiter</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </DashboardLayout>
  );
}
