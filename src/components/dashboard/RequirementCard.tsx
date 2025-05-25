import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  InfoIcon,
  TimerIcon,
  UsersIcon,
  FileIcon,
  EyeOffIcon,
} from "lucide-react";

interface RequirementCardProps {
  id: string;
  title: string;
  clientName: string;
  status: "active" | "paused" | "completed";
  dueDate: string;
  activeRecruiters: number;
  submittedResources: number;
  isEndClientHidden?: boolean;
  onViewDetails?: () => void;
  onUploadResume?: () => void;
  isRecruiterView?: boolean;
  timeRemaining?: {
    days: number;
    hours: number;
  };
}

export function RequirementCard({
  id,
  title,
  clientName,
  status,
  dueDate,
  activeRecruiters,
  submittedResources,
  isEndClientHidden = false,
  onViewDetails,
  onUploadResume,
  isRecruiterView = false,
  timeRemaining,
}: RequirementCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <div className="flex items-center mt-1 text-sm text-muted-foreground">
              {isEndClientHidden ? (
                <div className="flex items-center gap-1">
                  <EyeOffIcon className="h-3.5 w-3.5" />
                  <span>End Client Hidden</span>
                </div>
              ) : (
                <span>{clientName}</span>
              )}
            </div>
          </div>
          <StatusBadge status={status} />
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Due Date</span>
            <span className="font-medium">{dueDate}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">
              Requirement ID
            </span>
            <span className="font-medium">{id}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3">
            <Metric
              icon={<UsersIcon className="h-3.5 w-3.5" />}
              value={activeRecruiters}
              label="Active Recruiters"
            />
            <Metric
              icon={<FileIcon className="h-3.5 w-3.5" />}
              value={submittedResources}
              label="Submissions"
            />
          </div>
        </div>

        {isRecruiterView && timeRemaining && (
          <div className="mt-4 flex items-center">
            <TimerIcon className="h-4 w-4 text-yellow-500 mr-2" />
            <div className="text-sm">
              <span className="font-semibold">
                {timeRemaining.days}d {timeRemaining.hours}h
              </span>{" "}
              remaining
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        <div className="flex gap-2 w-full">
          {isRecruiterView ? (
            <>
              <Button
                variant="outline"
                className="w-1/2"
                onClick={onViewDetails}
              >
                View Details
              </Button>
              <Button className="w-1/2" onClick={onUploadResume}>
                Upload Resume
              </Button>
            </>
          ) : (
            <Button className="w-full" onClick={onViewDetails}>
              View Details
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

function Metric({
  icon,
  value,
  label,
}: {
  icon: ReactNode;
  value: number;
  label: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1 cursor-help">
            {icon}
            <span className="font-medium">{value}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom">{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
