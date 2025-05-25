import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { TrustPoints } from "@/components/dashboard/TrustPoints";
import { RewardBadge } from "@/components/dashboard/RewardBadge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  Award,
  DollarSign,
  Download,
  FileText,
  ArrowUpRight,
  BarChart3,
  Trophy,
  CircleDollarSign,
  BadgeCheck,
  ReceiptIcon,
  PiggyBank,
  TrendingUp,
  CalendarDays,
  HelpCircle,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function RewardsEarnings() {
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

  // Mock data for earnings
  const earningsHistory = [
    { month: "Jan", earnings: 1200 },
    { month: "Feb", earnings: 1800 },
    { month: "Mar", earnings: 1500 },
    { month: "Apr", earnings: 2200 },
    { month: "May", earnings: 2500 },
    { month: "Jun", earnings: 3000 },
  ];

  // Mock data for payouts
  const payouts = [
    {
      id: "PAY-001",
      date: "Jul 15, 2023",
      amount: 3000,
      status: "Paid",
      candidates: 3,
    },
    {
      id: "PAY-002",
      date: "Jun 15, 2023",
      amount: 2500,
      status: "Paid",
      candidates: 2,
    },
    {
      id: "PAY-003",
      date: "May 15, 2023",
      amount: 2200,
      status: "Paid",
      candidates: 2,
    },
    {
      id: "PAY-004",
      date: "Apr 15, 2023",
      amount: 1500,
      status: "Paid",
      candidates: 1,
    },
  ];

  // Mock data for pending earnings
  const pendingEarnings = [
    {
      candidateName: "John Smith",
      position: "Senior React Developer",
      client: "Acme Corp",
      submissionDate: "Jul 5, 2023",
      status: "Interviewed",
      potentialEarning: 1500,
      probability: 70,
    },
    {
      candidateName: "Jane Doe",
      position: "DevOps Engineer",
      client: "Tech Solutions",
      submissionDate: "Jul 12, 2023",
      status: "Screened",
      potentialEarning: 1200,
      probability: 40,
    },
  ];

  return (
    <DashboardLayout
      userType="recruiter"
      userName="Michael Rodriguez"
      userInitials="MR"
    >
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Rewards & Earnings</h1>
            <p className="text-muted-foreground">
              Track your performance, rewards, and earnings
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <ReceiptIcon className="h-4 w-4 mr-2" />
              View Invoices
            </Button>
            <Button>
              <HelpCircle className="h-4 w-4 mr-2" />
              Earning Rules
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$9,200</div>
              <p className="text-xs text-muted-foreground mt-1">
                Lifetime earnings
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,700</div>
              <p className="text-xs text-muted-foreground mt-1">
                From 2 candidates in progress
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Current Level
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Level 2</div>
              <p className="text-xs text-muted-foreground mt-1">
                Silver Recruiter
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Commission Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">25%</div>
              <p className="text-xs text-green-500 mt-1">+5% level bonus</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Earnings History</CardTitle>
                <CardDescription>
                  Your monthly earnings over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer
                    config={{
                      earnings: { color: "#10b981" },
                    }}
                  >
                    <LineChart data={earningsHistory}>
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
                        tickFormatter={(value) => `$${value}`}
                      />
                      <ChartTooltip>
                        <ChartTooltipContent />
                      </ChartTooltip>
                      <Line
                        type="monotone"
                        dataKey="earnings"
                        name="Earnings"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={{ r: 4, strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="pending">
              <TabsList className="w-full">
                <TabsTrigger value="pending">Pending Earnings</TabsTrigger>
                <TabsTrigger value="payouts">Payment History</TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Pending Earnings</CardTitle>
                    <CardDescription>
                      Earnings from candidates in the hiring process
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {pendingEarnings.length === 0 ? (
                      <div className="text-center p-6">
                        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                        <h3 className="text-lg font-medium">
                          No pending earnings
                        </h3>
                        <p className="text-muted-foreground mt-1">
                          Submit candidates to requirements to earn
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {pendingEarnings.map((earning, index) => (
                          <Card key={index}>
                            <CardContent className="p-4">
                              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                <div>
                                  <h4 className="font-medium">
                                    {earning.candidateName}
                                  </h4>
                                  <p className="text-sm text-muted-foreground">
                                    {earning.position} - {earning.client}
                                  </p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge
                                      variant="outline"
                                      className="bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200"
                                    >
                                      {earning.status}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">
                                      Submitted on {earning.submissionDate}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex flex-col items-end">
                                  <div className="text-lg font-bold">
                                    ${earning.potentialEarning.toLocaleString()}
                                  </div>
                                  <div className="flex items-center gap-1 text-xs">
                                    <TrendingUp className="h-3 w-3 text-green-500" />
                                    <span className="text-green-500">
                                      {earning.probability}% probability
                                    </span>
                                  </div>
                                  <div className="w-full mt-2 max-w-32">
                                    <Progress
                                      value={earning.probability}
                                      className="h-1.5"
                                    />
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payouts" className="mt-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Payment History</CardTitle>
                        <CardDescription>
                          Record of your previous payouts
                        </CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Payment ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Candidates</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Receipt</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {payouts.map((payout) => (
                          <TableRow key={payout.id}>
                            <TableCell className="font-medium">
                              {payout.id}
                            </TableCell>
                            <TableCell>{payout.date}</TableCell>
                            <TableCell>{payout.candidates}</TableCell>
                            <TableCell>
                              ${payout.amount.toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className="bg-green-100 text-green-800 border-green-200"
                              >
                                {payout.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                <ReceiptIcon className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <TrustPoints
              points={230}
              maxPoints={500}
              level={2}
              nextLevelPoints={70}
            />

            <Card>
              <CardHeader>
                <CardTitle>Reward Tiers</CardTitle>
                <CardDescription>
                  Unlock rewards as you level up
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Earning Rules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <BadgeCheck className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Base Commission</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        20% of candidate's first month salary for each
                        successful placement
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <Trophy className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Level Bonuses</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        +5% commission for each level above Bronze (Level 1)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <CalendarDays className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Payment Schedule</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Monthly payouts on the 15th for all placements from the
                        previous month
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <CircleDollarSign className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">
                        Bonus Opportunities
                      </h4>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <p className="text-xs text-muted-foreground mt-1 cursor-help underline decoration-dotted">
                              Special bonuses for urgent requirements and
                              hard-to-fill positions
                            </p>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-sm">
                            <p>
                              Urgent requirements are marked with a timer icon.
                              Hard-to-fill positions are typically those open
                              for 30+ days or requiring specialized skills.
                              These may offer up to 10% additional commission.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full" size="sm">
                  <ArrowUpRight className="h-4 w-4 mr-2" />
                  View Full Earning Policy
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
