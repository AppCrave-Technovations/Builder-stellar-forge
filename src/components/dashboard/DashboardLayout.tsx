import { ReactNode } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Users,
  Briefcase,
  FileText,
  Home,
  User,
  LogOut,
  Settings,
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
  userType: "system-admin" | "client-admin" | "recruiter";
  userName: string;
  userInitials: string;
  userAvatar?: string;
}

export function DashboardLayout({
  children,
  userType,
  userName,
  userInitials,
  userAvatar,
}: DashboardLayoutProps) {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader className="border-b border-border pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar>
                  {userAvatar ? (
                    <AvatarImage src={userAvatar} alt={userName} />
                  ) : (
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  )}
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{userName}</span>
                  <span className="text-xs text-muted-foreground">
                    {userType === "system-admin"
                      ? "System Administrator"
                      : userType === "client-admin"
                        ? "Client Administrator"
                        : "Recruiter"}
                  </span>
                </div>
              </div>
              <SidebarTrigger />
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Dashboard"
                  isActive={window.location.pathname === `/${userType}`}
                  onClick={() => (window.location.href = `/${userType}`)}
                >
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {userType === "system-admin" && (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      tooltip="User Management"
                      isActive={
                        window.location.pathname === "/system-admin/users"
                      }
                      onClick={() =>
                        (window.location.href = "/system-admin/users")
                      }
                    >
                      <User className="h-4 w-4" />
                      <span>User Management</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      tooltip="Recruiters"
                      isActive={
                        window.location.pathname === "/system-admin/recruiters"
                      }
                      onClick={() =>
                        (window.location.href = "/system-admin/recruiters")
                      }
                    >
                      <Users className="h-4 w-4" />
                      <span>Recruiters</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      tooltip="Clients"
                      isActive={
                        window.location.pathname === "/system-admin/clients"
                      }
                      onClick={() =>
                        (window.location.href = "/system-admin/clients")
                      }
                    >
                      <Briefcase className="h-4 w-4" />
                      <span>Clients</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}

              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Requirements"
                  isActive={
                    window.location.pathname === `/system-admin/requirements` ||
                    window.location.pathname === `/recruiter/requirements`
                  }
                  onClick={() =>
                    (window.location.href = `/${userType === "system-admin" ? "system-admin/requirements" : "recruiter/requirements"}`)
                  }
                >
                  <FileText className="h-4 w-4" />
                  <span>Requirements</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {userType === "recruiter" && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip="Rewards"
                    isActive={window.location.pathname === "/recruiter/rewards"}
                    onClick={() =>
                      (window.location.href = "/recruiter/rewards")
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M12 2v8" />
                      <path d="m16 6-4 4-4-4" />
                      <path d="M8 16a4 4 0 1 0 8 0" />
                      <path d="M16 20H8" />
                    </svg>
                    <span>Rewards & Earnings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarContent>

          <div className="mt-auto p-4 border-t border-border">
            <div className="flex items-center justify-between">
              <SidebarMenuButton tooltip="Settings">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </SidebarMenuButton>
              <SidebarMenuButton tooltip="Log Out">
                <LogOut className="h-4 w-4" />
                <span>Log Out</span>
              </SidebarMenuButton>
              <ModeToggle />
            </div>
          </div>
        </Sidebar>

        <SidebarInset>
          <div className="container p-4 md:p-6 mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl md:text-3xl font-bold">
                {userType === "system-admin"
                  ? "System Admin Dashboard"
                  : userType === "client-admin"
                    ? "Client Admin Dashboard"
                    : "Recruiter Dashboard"}
              </h1>
            </div>
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
