import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import React from "react"; // Ensure React is explicitly imported
import Index from "./pages/Index";
import Login from "./pages/Login";
import SystemAdminDashboard from "./pages/SystemAdminDashboard";
import ClientAdminDashboard from "./pages/ClientAdminDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";

// System Admin Pages
import UserManagement from "./pages/system-admin/UserManagement";
import Recruiters from "./pages/system-admin/Recruiters";
import Clients from "./pages/system-admin/Clients";
import Requirements from "./pages/system-admin/Requirements";

// Recruiter Pages
import RecruiterRequirements from "./pages/recruiter/Requirements";
import RewardsEarnings from "./pages/recruiter/RewardsEarnings";

import NotFound from "./pages/NotFound";

// Create the QueryClient inside the component to ensure it's created during rendering
const App = () => {
  // Create a client
  const queryClient = React.useState(() => new QueryClient())[0];

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />

                {/* System Admin Routes */}
                <Route
                  path="/system-admin"
                  element={<SystemAdminDashboard />}
                />
                <Route
                  path="/system-admin/users"
                  element={<UserManagement />}
                />
                <Route
                  path="/system-admin/recruiters"
                  element={<Recruiters />}
                />
                <Route path="/system-admin/clients" element={<Clients />} />
                <Route
                  path="/system-admin/requirements"
                  element={<Requirements />}
                />

                {/* Client Admin Routes */}
                <Route
                  path="/client-admin"
                  element={<ClientAdminDashboard />}
                />

                {/* Recruiter Routes */}
                <Route path="/recruiter" element={<RecruiterDashboard />} />
                <Route
                  path="/recruiter/requirements"
                  element={<RecruiterRequirements />}
                />
                <Route
                  path="/recruiter/rewards"
                  element={<RewardsEarnings />}
                />

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
