import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200">
      <div className="text-center max-w-2xl px-4">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Recruitment & Vendor Management Platform
        </h1>
        <p className="text-slate-600 mb-8">
          A powerful SaaS platform for managing recruitment processes, vendors,
          and candidate tracking. Login as a System Administrator, Client
          Administrator, or Recruiter to access your dashboard.
        </p>
        <div className="space-y-4">
          <Button
            size="lg"
            className="w-full md:w-auto"
            onClick={() => navigate("/login")}
          >
            Login to Dashboard
          </Button>

          <div className="pt-8 grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="bg-primary/10 rounded-full p-4 mb-3 mx-auto w-16 h-16 flex items-center justify-center">
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
                  className="text-primary"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M7 7h10" />
                  <path d="M7 12h5" />
                  <path d="M7 17h10" />
                </svg>
              </div>
              <h3 className="font-medium">System Admin</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Manage the entire platform
              </p>
            </div>
            <div>
              <div className="bg-primary/10 rounded-full p-4 mb-3 mx-auto w-16 h-16 flex items-center justify-center">
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
                  className="text-primary"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="font-medium">Client Admin</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Manage requirements and recruiters
              </p>
            </div>
            <div>
              <div className="bg-primary/10 rounded-full p-4 mb-3 mx-auto w-16 h-16 flex items-center justify-center">
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
                  className="text-primary"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="font-medium">Recruiter</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Submit candidates and earn rewards
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
