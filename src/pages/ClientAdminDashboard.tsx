import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import {
  RequirementTable,
  AssignedRecruiterTable,
} from "@/components/dashboard/DashboardTable";
import { ResourceFunnel } from "@/components/dashboard/ResourceFunnel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Users, Timer, CheckCircle } from "lucide-react";

export default function ClientAdminDashboard() {
  const [selectedTab, setSelectedTab] = useState("requirements");

  // Mock data for requirements
  const requirements = [
    {
      id: "REQ-001",
      title: "Senior React Developer",
      clientName: "Internal Team",
      status: "active" as const,
      dueDate: "Aug 15, 2023",
      activeRecruiters: 12,
      submittedResources: 8,
    },
    {
      id: "REQ-002",
      title: "DevOps Engineer",
      clientName: "Internal Team",
      status: "active" as const,
      dueDate: "Aug 20, 2023",
      activeRecruiters: 8,
      submittedResources: 5,
    },
    {
      id: "REQ-003",
      title: "Product Manager",
      clientName: "Internal Team",
      status: "paused" as const,
      dueDate: "Sep 1, 2023",
      activeRecruiters: 5,
      submittedResources: 2,
    },
    {
      id: "REQ-004",
      title: "Data Scientist",
      clientName: "Internal Team",
      status: "completed" as const,
      dueDate: "Jul 30, 2023",
      activeRecruiters: 10,
      submittedResources: 15,
    },
    {
      id: "REQ-005",
      title: "UX Designer",
      clientName: "Internal Team",
      status: "active" as const,
      dueDate: "Aug 25, 2023",
      activeRecruiters: 6,
      submittedResources: 4,
    },
  ];

  // Mock data for recruiters
  const recruiters = [
    {
      id: "REC-001",
      name: "John Smith",
      email: "john.smith@example.com",
      status: "active" as const,
      submissions: 12,
      trustScore: 85,
    },
    {
      id: "REC-002",
      name: "Sara Johnson",
      email: "sara.johnson@example.com",
      status: "active" as const,
      submissions: 18,
      trustScore: 92,
    },
    {
      id: "REC-003",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      status: "inactive" as const,
      submissions: 4,
      trustScore: 60,
    },
  ];

  // Mock data for resource funnel
  const resourceFunnelData = [
    { stage: "Applied", count: 45, color: "#4338ca" },
    { stage: "Screened", count: 32, color: "#6366f1" },
    { stage: "Interviewed", count: 18, color: "#8b5cf6" },
    { stage: "Hired", count: 8, color: "#10b981" },
    { stage: "Rejected", count: 24, color: "#ef4444" },
  ];

  const handleViewRequirementDetails = (id: string) => {
    console.log("View requirement details:", id);
  };

  const handleViewRecruiterDetails = (id: string) => {
    console.log("View recruiter details:", id);
  };

  return (
    <DashboardLayout
      userType="client-admin"
      userName="Sarah Miller"
      userInitials="SM"
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            title="Active Requirements"
            value={8}
            icon={<FileText className="h-4 w-4" />}
            trend={{ value: 2, isPositive: true }}
          />
          <DashboardCard
            title="Assigned Recruiters"
            value={24}
            icon={<Users className="h-4 w-4" />}
            trend={{ value: 5, isPositive: true }}
          />
          <DashboardCard
            title="Pending Requirements"
            value={3}
            icon={<Timer className="h-4 w-4" />}
            trend={{ value: 1, isPositive: false }}
          />
          <DashboardCard
            title="Filled Positions"
            value={12}
            icon={<CheckCircle className="h-4 w-4" />}
            trend={{ value: 20, isPositive: true }}
          />
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="recruiters">Recruiters</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="requirements" className="space-y-4 mt-6">
            <h3 className="text-lg font-medium mb-4">All Requirements</h3>
            <RequirementTable
              requirements={requirements}
              onViewDetails={handleViewRequirementDetails}
            />
          </TabsContent>

          <TabsContent value="recruiters" className="space-y-4 mt-6">
            <h3 className="text-lg font-medium mb-4">Assigned Recruiters</h3>
            <AssignedRecruiterTable
              recruiters={recruiters}
              onViewRecruiter={handleViewRecruiterDetails}
            />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4 mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-medium mb-4">Resource Funnel</h3>
                <ResourceFunnel data={resourceFunnelData} />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4">Requirement Status</h3>
                <div className="grid gap-4 grid-cols-2">
                  <DashboardCard
                    title="Avg. Time to Fill"
                    value="18 days"
                    trend={{ value: 12, isPositive: true }}
                  />
                  <DashboardCard
                    title="Submission Rate"
                    value="86%"
                    trend={{ value: 3, isPositive: true }}
                  />
                  <DashboardCard
                    title="Interview Rate"
                    value="45%"
                    trend={{ value: 5, isPositive: false }}
                  />
                  <DashboardCard
                    title="Offer Acceptance"
                    value="78%"
                    trend={{ value: 8, isPositive: true }}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
