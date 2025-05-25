import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { RequirementCard } from "@/components/dashboard/RequirementCard";
import { SubmissionModal } from "@/components/dashboard/SubmissionModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Filter,
  FileText,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  BriefcaseIcon,
  MapPin,
  Calendar,
  DollarSign,
  Briefcase,
} from "lucide-react";

export default function RecruiterRequirements() {
  const [selectedTab, setSelectedTab] = useState("active");
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [isRequirementDetailsOpen, setIsRequirementDetailsOpen] =
    useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSkill, setFilterSkill] = useState("all");

  // Mock data for requirements
  const activeRequirements = [
    {
      id: "REQ-001",
      title: "Senior React Developer",
      clientName: "Acme Corp",
      status: "active" as const,
      dueDate: "Aug 15, 2023",
      activeRecruiters: 12,
      submittedResources: 8,
      isEndClientHidden: false,
      timeRemaining: {
        days: 4,
        hours: 12,
      },
      location: "New York, NY (Remote)",
      skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
      experience: "5+ years",
      salary: "Up to $150,000",
      description:
        "Looking for a senior React developer with 5+ years of experience in building modern web applications with TypeScript and GraphQL. The candidate should have experience with AWS services and be able to mentor junior developers.",
      insightsData: {
        activeRecruiters: 12,
        submittedCandidates: 8,
        stageBreakdown: {
          applied: 8,
          screened: 5,
          interviewed: 2,
          hired: 0,
          rejected: 3,
        },
      },
    },
    {
      id: "REQ-002",
      title: "DevOps Engineer",
      clientName: "Tech Solutions",
      status: "active" as const,
      dueDate: "Aug 20, 2023",
      activeRecruiters: 8,
      submittedResources: 5,
      isEndClientHidden: true,
      timeRemaining: {
        days: 9,
        hours: 6,
      },
      location: "San Francisco, CA (Hybrid)",
      skills: ["Docker", "Kubernetes", "AWS", "Jenkins", "Terraform"],
      experience: "3+ years",
      salary: "Up to $140,000",
      description:
        "Seeking a DevOps engineer with strong experience in containerization, CI/CD pipelines, and cloud infrastructure. The ideal candidate will have hands-on experience with Docker, Kubernetes, and AWS.",
      insightsData: {
        activeRecruiters: 8,
        submittedCandidates: 5,
        stageBreakdown: {
          applied: 5,
          screened: 3,
          interviewed: 1,
          hired: 0,
          rejected: 2,
        },
      },
    },
    {
      id: "REQ-003",
      title: "Product Manager",
      clientName: "Innovate Inc",
      status: "active" as const,
      dueDate: "Sep 1, 2023",
      activeRecruiters: 5,
      submittedResources: 2,
      isEndClientHidden: false,
      timeRemaining: {
        days: 21,
        hours: 0,
      },
      location: "Chicago, IL (On-site)",
      skills: [
        "Product Strategy",
        "Agile",
        "User Research",
        "Roadmapping",
        "Analytics",
      ],
      experience: "4+ years",
      salary: "Up to $130,000",
      description:
        "Looking for an experienced product manager to lead our new SaaS product development. The ideal candidate will have experience in B2B software products, Agile methodologies, and a track record of successful product launches.",
      insightsData: {
        activeRecruiters: 5,
        submittedCandidates: 2,
        stageBreakdown: {
          applied: 2,
          screened: 1,
          interviewed: 0,
          hired: 0,
          rejected: 1,
        },
      },
    },
    {
      id: "REQ-005",
      title: "UX Designer",
      clientName: "Creative Studios",
      status: "active" as const,
      dueDate: "Aug 25, 2023",
      activeRecruiters: 6,
      submittedResources: 4,
      isEndClientHidden: true,
      timeRemaining: {
        days: 14,
        hours: 8,
      },
      location: "Los Angeles, CA (Hybrid)",
      skills: [
        "Figma",
        "User Research",
        "Wireframing",
        "Prototyping",
        "UI Design",
      ],
      experience: "2+ years",
      salary: "Up to $120,000",
      description:
        "Looking for a UX designer with a strong portfolio and experience in creating user-centered designs. The candidate should be proficient in Figma and have experience conducting user research and creating wireframes and prototypes.",
      insightsData: {
        activeRecruiters: 6,
        submittedCandidates: 4,
        stageBreakdown: {
          applied: 4,
          screened: 2,
          interviewed: 1,
          hired: 0,
          rejected: 1,
        },
      },
    },
  ];

  const completedRequirements = [
    {
      id: "REQ-004",
      title: "Data Scientist",
      clientName: "DataCorp",
      status: "completed" as const,
      dueDate: "Jul 30, 2023",
      activeRecruiters: 10,
      submittedResources: 15,
      isEndClientHidden: false,
      location: "Remote",
      skills: [
        "Python",
        "Machine Learning",
        "SQL",
        "TensorFlow",
        "Data Visualization",
      ],
      experience: "3+ years",
      salary: "Up to $145,000",
      description:
        "Seeking a data scientist with experience in machine learning models and big data processing. The candidate should be proficient in Python, SQL, and have experience with TensorFlow.",
      insightsData: {
        activeRecruiters: 10,
        submittedCandidates: 15,
        stageBreakdown: {
          applied: 15,
          screened: 10,
          interviewed: 5,
          hired: 2,
          rejected: 8,
        },
      },
    },
  ];

  // Filter requirements based on search query and filter
  const filteredActiveRequirements = activeRequirements.filter((req) => {
    const matchesSearch =
      searchQuery === "" ||
      req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesSkill =
      filterSkill === "all" ||
      req.skills.some(
        (skill) => skill.toLowerCase() === filterSkill.toLowerCase(),
      );

    return matchesSearch && matchesSkill;
  });

  const handleViewRequirementDetails = (requirement: any) => {
    setSelectedRequirement(requirement);
    setIsRequirementDetailsOpen(true);
  };

  const handleUploadResume = (requirement: any) => {
    setSelectedRequirement(requirement);
    setIsSubmissionModalOpen(true);
  };

  const handleSubmitCandidate = (data: any) => {
    console.log("Submitted candidate:", data);
    setIsSubmissionModalOpen(false);
  };

  // Get all unique skills from requirements
  const allSkills = [
    ...new Set(
      [...activeRequirements, ...completedRequirements].flatMap(
        (req) => req.skills,
      ),
    ),
  ].sort();

  return (
    <DashboardLayout
      userType="recruiter"
      userName="Michael Rodriguez"
      userInitials="MR"
    >
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Requirements</h1>
            <p className="text-muted-foreground">
              View and apply to open requirements
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, skills, client..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterSkill} onValueChange={setFilterSkill}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Filter by skill" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Skills</SelectItem>
                {allSkills.map((skill) => (
                  <SelectItem key={skill} value={skill.toLowerCase()}>
                    {skill}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList>
                <TabsTrigger value="active">Active Requirements</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="applied">My Applications</TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="space-y-4 mt-6">
                {filteredActiveRequirements.length === 0 ? (
                  <div className="text-center p-8 border rounded-lg bg-muted/20">
                    <SearchIcon className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <h3 className="text-lg font-medium">
                      No matching requirements
                    </h3>
                    <p className="text-muted-foreground mt-1">
                      Try adjusting your search or filters
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                    {filteredActiveRequirements.map((req) => (
                      <RequirementCard
                        key={req.id}
                        {...req}
                        isRecruiterView={true}
                        onViewDetails={() => handleViewRequirementDetails(req)}
                        onUploadResume={() => handleUploadResume(req)}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="completed" className="space-y-4 mt-6">
                <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                  {completedRequirements.map((req) => (
                    <RequirementCard
                      key={req.id}
                      {...req}
                      isRecruiterView={true}
                      onViewDetails={() => handleViewRequirementDetails(req)}
                      onUploadResume={() => handleUploadResume(req)}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="applied" className="space-y-4 mt-6">
                <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                  {/* Here we would show requirements the recruiter has submitted candidates for */}
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div>
                          <CardTitle>Senior React Developer</CardTitle>
                          <CardDescription>Acme Corp</CardDescription>
                        </div>
                        <StatusBadge status="active" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Your submissions:
                          </span>
                          <span className="font-medium">2 candidates</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>John Smith</span>
                            <StatusBadge
                              status="interviewed"
                              className="text-xs py-0"
                            />
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>Jane Doe</span>
                            <StatusBadge
                              status="screened"
                              className="text-xs py-0"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">My Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Active Requirements:
                    </span>
                    <span className="font-medium">
                      {activeRequirements.length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      My Applications:
                    </span>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Candidates Submitted:
                    </span>
                    <span className="font-medium">5</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Candidates Hired:
                    </span>
                    <span className="font-medium">1</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Success Rate:</span>
                    <span className="font-medium text-green-600">20%</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">
                        Industry Average:
                      </span>
                      <span>15%</span>
                    </div>
                    <Progress value={20} className="h-1" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hot Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {activeRequirements.slice(0, 3).map((req) => (
                    <div
                      key={req.id}
                      className="flex justify-between items-start"
                    >
                      <div>
                        <h4 className="text-sm font-medium">{req.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {req.isEndClientHidden ? (
                            <span className="flex items-center gap-1">
                              <EyeOff className="h-3 w-3" />
                              Hidden Client
                            </span>
                          ) : (
                            req.clientName
                          )}
                        </p>
                      </div>
                      <div className="flex items-center text-amber-500 text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>
                          {req.timeRemaining.days}d {req.timeRemaining.hours}h
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  size="sm"
                  onClick={() => setSelectedTab("active")}
                >
                  View All Requirements
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">In-Demand Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {allSkills.slice(0, 10).map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 cursor-pointer"
                      onClick={() => setFilterSkill(skill.toLowerCase())}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Submission Modal */}
      {selectedRequirement && (
        <SubmissionModal
          isOpen={isSubmissionModalOpen}
          onClose={() => setIsSubmissionModalOpen(false)}
          requirementTitle={selectedRequirement.title}
          clientName={
            selectedRequirement.isEndClientHidden
              ? "Hidden Client"
              : selectedRequirement.clientName
          }
          onSubmit={handleSubmitCandidate}
        />
      )}

      {/* Requirement Details Dialog */}
      {selectedRequirement && (
        <Dialog
          open={isRequirementDetailsOpen}
          onOpenChange={setIsRequirementDetailsOpen}
        >
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>{selectedRequirement.title}</DialogTitle>
              <DialogDescription>
                {selectedRequirement.isEndClientHidden ? (
                  <div className="flex items-center gap-1">
                    <EyeOff className="h-3.5 w-3.5" />
                    <span>End Client Hidden</span>
                  </div>
                ) : (
                  selectedRequirement.clientName
                )}
                {" - "}
                {selectedRequirement.id}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedRequirement.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Due: {selectedRequirement.dueDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedRequirement.experience}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedRequirement.salary}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Job Description</h3>
                <p className="text-sm">{selectedRequirement.description}</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Required Skills</h3>
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

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Requirement Insights</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-muted/30 p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-sm mb-1">
                      <Users className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">Recruiters</span>
                    </div>
                    <p className="text-2xl font-bold">
                      {selectedRequirement.insightsData.activeRecruiters}
                    </p>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-sm mb-1">
                      <FileText className="h-4 w-4 text-purple-500" />
                      <span className="font-medium">Submissions</span>
                    </div>
                    <p className="text-2xl font-bold">
                      {selectedRequirement.insightsData.submittedCandidates}
                    </p>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-sm mb-1">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="font-medium">Hired</span>
                    </div>
                    <p className="text-2xl font-bold">
                      {selectedRequirement.insightsData.stageBreakdown.hired}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">
                  Candidate Stage Breakdown
                </h3>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Applied</span>
                      <span>
                        {
                          selectedRequirement.insightsData.stageBreakdown
                            .applied
                        }{" "}
                        candidates
                      </span>
                    </div>
                    <Progress
                      value={
                        (selectedRequirement.insightsData.stageBreakdown
                          .applied /
                          selectedRequirement.insightsData
                            .submittedCandidates) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Screened</span>
                      <span>
                        {
                          selectedRequirement.insightsData.stageBreakdown
                            .screened
                        }{" "}
                        candidates
                      </span>
                    </div>
                    <Progress
                      value={
                        (selectedRequirement.insightsData.stageBreakdown
                          .screened /
                          selectedRequirement.insightsData
                            .submittedCandidates) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Interviewed</span>
                      <span>
                        {
                          selectedRequirement.insightsData.stageBreakdown
                            .interviewed
                        }{" "}
                        candidates
                      </span>
                    </div>
                    <Progress
                      value={
                        (selectedRequirement.insightsData.stageBreakdown
                          .interviewed /
                          selectedRequirement.insightsData
                            .submittedCandidates) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Hired</span>
                      <span>
                        {selectedRequirement.insightsData.stageBreakdown.hired}{" "}
                        candidates
                      </span>
                    </div>
                    <Progress
                      value={
                        (selectedRequirement.insightsData.stageBreakdown.hired /
                          selectedRequirement.insightsData
                            .submittedCandidates) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  onClick={() => {
                    setIsRequirementDetailsOpen(false);
                    handleUploadResume(selectedRequirement);
                  }}
                >
                  Submit Candidate
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsRequirementDetailsOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </DashboardLayout>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
