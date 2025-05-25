import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import {
  RequirementTable,
  AssignedRecruiterTable,
} from "@/components/dashboard/DashboardTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Briefcase, FileText, AlertCircle } from "lucide-react";

export default function SystemAdminDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview");

  // Mock data for requirements
  const requirements = [
    {
      id: "REQ-001",
      title: "Senior React Developer",
      clientName: "Acme Corp",
      status: "active" as const,
      dueDate: "Aug 15, 2023",
      activeRecruiters: 12,
      submittedResources: 8,
    },
    {
      id: "REQ-002",
      title: "DevOps Engineer",
      clientName: "Tech Solutions",
      status: "active" as const,
      dueDate: "Aug 20, 2023",
      activeRecruiters: 8,
      submittedResources: 5,
    },
    {
      id: "REQ-003",
      title: "Product Manager",
      clientName: "Innovate Inc",
      status: "paused" as const,
      dueDate: "Sep 1, 2023",
      activeRecruiters: 5,
      submittedResources: 2,
    },
    {
      id: "REQ-004",
      title: "Data Scientist",
      clientName: "DataCorp",
      status: "completed" as const,
      dueDate: "Jul 30, 2023",
      activeRecruiters: 10,
      submittedResources: 15,
    },
    {
      id: "REQ-005",
      title: "UX Designer",
      clientName: "Creative Studios",
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
    {
      id: "REC-004",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      status: "pending" as const,
      submissions: 0,
      trustScore: 50,
    },
    {
      id: "REC-005",
      name: "Robert Wilson",
      email: "robert.wilson@example.com",
      status: "active" as const,
      submissions: 10,
      trustScore: 78,
    },
  ];

  const handleViewRequirementDetails = (id: string) => {
    console.log("View requirement details:", id);
  };

  const handleViewRecruiterDetails = (id: string) => {
    console.log("View recruiter details:", id);
  };

  return (
    <DashboardLayout
      userType="system-admin"
      userName="Alex Johnson"
      userInitials="AJ"
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            title="Total Clients"
            value={24}
            icon={<Briefcase className="h-4 w-4" />}
            trend={{ value: 12, isPositive: true }}
          />
          <DashboardCard
            title="Total Recruiters"
            value={86}
            icon={<Users className="h-4 w-4" />}
            trend={{ value: 8, isPositive: true }}
          />
          <DashboardCard
            title="Active Requirements"
            value={32}
            icon={<FileText className="h-4 w-4" />}
            trend={{ value: 5, isPositive: true }}
          />
          <DashboardCard
            title="Urgent Requirements"
            value={7}
            icon={<AlertCircle className="h-4 w-4" />}
            trend={{ value: 2, isPositive: false }}
          />
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="recruiters">Recruiters</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-medium mb-4">
                  Recent Requirements
                </h3>
                <RequirementTable
                  requirements={requirements.slice(0, 3)}
                  onViewDetails={handleViewRequirementDetails}
                />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4">Top Recruiters</h3>
                <AssignedRecruiterTable
                  recruiters={recruiters
                    .filter((r) => r.status === "active")
                    .slice(0, 3)}
                  onViewRecruiter={handleViewRecruiterDetails}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="requirements" className="space-y-4 mt-6">
            <h3 className="text-lg font-medium mb-4">All Requirements</h3>
            <RequirementTable
              requirements={requirements}
              onViewDetails={handleViewRequirementDetails}
            />
          </TabsContent>

          <TabsContent value="recruiters" className="space-y-4 mt-6">
            <h3 className="text-lg font-medium mb-4">All Recruiters</h3>
            <AssignedRecruiterTable
              recruiters={recruiters}
              onViewRecruiter={handleViewRecruiterDetails}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
