import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { RequirementCard } from "@/components/dashboard/RequirementCard";
import { TrustPoints } from "@/components/dashboard/TrustPoints";
import { SubmissionModal } from "@/components/dashboard/SubmissionModal";
import { RewardBadge } from "@/components/dashboard/RewardBadge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, CheckCircle, Clock, Search, Award } from "lucide-react";

export default function RecruiterDashboard() {
  const [selectedTab, setSelectedTab] = useState("active");
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState<{
    id: string;
    title: string;
    clientName: string;
  } | null>(null);

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
    },
    {
      id: "REQ-005",
      title: "UX Designer",
      clientName: "Creative Studios",
      status: "completed" as const,
      dueDate: "Jul 25, 2023",
      activeRecruiters: 6,
      submittedResources: 4,
      isEndClientHidden: true,
    },
  ];

  // Mock data for rewards
  const rewards = [
    {
      level: 1,
      name: "Bronze Recruiter",
      description: "Access to basic requirements",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-6"
        >
          <path d="M12 2v8" />
          <path d="m16 6-4 4-4-4" />
          <path d="M8 16a4 4 0 1 0 8 0" />
          <path d="M16 20H8" />
        </svg>
      ),
      isUnlocked: true,
    },
    {
      level: 2,
      name: "Silver Recruiter",
      description: "5% higher commission rate",
      icon: <Award className="size-6" />,
      isUnlocked: true,
    },
    {
      level: 3,
      name: "Gold Recruiter",
      description: "Priority requirement access",
      icon: <Award className="size-6" />,
      isUnlocked: false,
    },
    {
      level: 4,
      name: "Platinum Recruiter",
      description: "10% higher commission rate",
      icon: <Award className="size-6" />,
      isUnlocked: false,
    },
    {
      level: 5,
      name: "Diamond Recruiter",
      description: "VIP status and exclusive requirements",
      icon: <Award className="size-6" />,
      isUnlocked: false,
    },
  ];

  const handleViewRequirementDetails = (id: string) => {
    console.log("View requirement details:", id);
  };

  const handleUploadResume = (requirement: {
    id: string;
    title: string;
    clientName: string;
  }) => {
    setSelectedRequirement(requirement);
    setIsSubmissionModalOpen(true);
  };

  const handleSubmitCandidate = (data: any) => {
    console.log("Submitted candidate:", data);
    setIsSubmissionModalOpen(false);
  };

  return (
    <DashboardLayout
      userType="recruiter"
      userName="Michael Rodriguez"
      userInitials="MR"
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <DashboardCard
            title="Active Requirements"
            value={activeRequirements.length}
            icon={<FileText className="h-4 w-4" />}
          />
          <DashboardCard
            title="My Submissions"
            value={12}
            icon={<CheckCircle className="h-4 w-4" />}
            trend={{ value: 25, isPositive: true }}
          />
          <DashboardCard
            title="Avg. Response Time"
            value="4.2 hours"
            icon={<Clock className="h-4 w-4" />}
            trend={{ value: 10, isPositive: true }}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <div className="flex items-center justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="active">Active Requirements</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Search requirements..."
                    className="h-9 rounded-md border border-input bg-background px-8 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>

              <TabsContent value="active" className="space-y-4 mt-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  {activeRequirements.map((req) => (
                    <RequirementCard
                      key={req.id}
                      {...req}
                      isRecruiterView={true}
                      onViewDetails={() => handleViewRequirementDetails(req.id)}
                      onUploadResume={() =>
                        handleUploadResume({
                          id: req.id,
                          title: req.title,
                          clientName: req.clientName,
                        })
                      }
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="completed" className="space-y-4 mt-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  {completedRequirements.map((req) => (
                    <RequirementCard
                      key={req.id}
                      {...req}
                      isRecruiterView={true}
                      onViewDetails={() => handleViewRequirementDetails(req.id)}
                      onUploadResume={() =>
                        handleUploadResume({
                          id: req.id,
                          title: req.title,
                          clientName: req.clientName,
                        })
                      }
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <TrustPoints
              points={230}
              maxPoints={500}
              level={2}
              nextLevelPoints={70}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Rewards & Earnings</h3>
            <Button variant="outline" size="sm">
              View Earning Rules
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {rewards.map((reward) => (
              <RewardBadge
                key={reward.level}
                level={reward.level}
                name={reward.name}
                description={reward.description}
                icon={reward.icon}
                isUnlocked={reward.isUnlocked}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedRequirement && (
        <SubmissionModal
          isOpen={isSubmissionModalOpen}
          onClose={() => setIsSubmissionModalOpen(false)}
          requirementTitle={selectedRequirement.title}
          clientName={selectedRequirement.clientName}
          onSubmit={handleSubmitCandidate}
        />
      )}
    </DashboardLayout>
  );
}
