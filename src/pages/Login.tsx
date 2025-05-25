import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (role: string) => {
    setIsLoading(true);

    // Simulate login
    setTimeout(() => {
      setIsLoading(false);

      // Navigate based on role
      if (role === "system-admin") {
        navigate("/system-admin");
      } else if (role === "client-admin") {
        navigate("/client-admin");
      } else if (role === "recruiter") {
        navigate("/recruiter");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Recruitment Platform</h1>
          <p className="text-slate-500">Sign in to your account</p>
        </div>

        <Tabs defaultValue="system-admin" className="w-full">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="system-admin">System Admin</TabsTrigger>
            <TabsTrigger value="client-admin">Client Admin</TabsTrigger>
            <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
          </TabsList>

          {["system-admin", "client-admin", "recruiter"].map((role) => (
            <TabsContent key={role} value={role}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    {role === "system-admin"
                      ? "System Administrator"
                      : role === "client-admin"
                        ? "Client Administrator"
                        : "Recruiter"}{" "}
                    Login
                  </CardTitle>
                  <CardDescription>
                    Enter your credentials to access your{" "}
                    {role.replace("-", " ")} dashboard.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`${role}-email`}>Email</Label>
                    <Input
                      id={`${role}-email`}
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`${role}-password`}>Password</Label>
                      <a
                        href="#"
                        className="text-xs text-primary hover:underline"
                        onClick={(e) => e.preventDefault()}
                      >
                        Forgot password?
                      </a>
                    </div>
                    <Input
                      id={`${role}-password`}
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={() => handleLogin(role)}
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
