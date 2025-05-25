import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";

interface TrustPointsProps {
  points: number;
  maxPoints: number;
  level: number;
  nextLevelPoints: number;
}

export function TrustPoints({
  points,
  maxPoints,
  level,
  nextLevelPoints,
}: TrustPointsProps) {
  const percentage = Math.min(Math.round((points / maxPoints) * 100), 100);
  const levelProgress = Math.round(((points - (level - 1) * 100) / 100) * 100);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold flex items-center gap-1">
          Trust Points
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <p>
                  Trust points are earned by successfully submitting quality
                  candidates that pass screening and interviews. Higher points
                  give you access to more requirements and higher earnings.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </h3>
        <div className="flex items-center">
          <div className="bg-primary/10 text-primary text-xs font-medium px-2 py-0.5 rounded">
            Level {level}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-1">
        <div className="text-xl font-bold">{points}</div>
        <div className="text-sm text-muted-foreground">/ {maxPoints}</div>
      </div>

      <Progress value={percentage} className="h-2 mb-2" />

      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{points} points</span>
        <span>
          {nextLevelPoints} points to Level {level + 1}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-5 gap-1">
        {[1, 2, 3, 4, 5].map((badgeLevel) => (
          <div
            key={badgeLevel}
            className={`flex flex-col items-center ${
              badgeLevel <= level ? "text-primary" : "text-muted-foreground/40"
            }`}
          >
            <div
              className={`size-8 rounded-full flex items-center justify-center ${
                badgeLevel <= level ? "bg-primary/20" : "bg-muted"
              }`}
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
                className="size-4"
              >
                <path d="M12 2v8" />
                <path d="m16 6-4 4-4-4" />
                <path d="M8 16a4 4 0 1 0 8 0" />
                <path d="M16 20H8" />
              </svg>
            </div>
            <span className="text-xs mt-1">L{badgeLevel}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
