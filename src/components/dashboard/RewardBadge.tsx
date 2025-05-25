import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RewardBadgeProps {
  level: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  isUnlocked: boolean;
  className?: string;
}

export function RewardBadge({
  level,
  name,
  description,
  icon,
  isUnlocked,
  className,
}: RewardBadgeProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "flex flex-col items-center justify-center p-4 rounded-lg transition-all",
              isUnlocked
                ? "bg-primary/10 border border-primary/20 text-primary shadow-sm"
                : "bg-muted/40 border border-muted/20 text-muted-foreground/60",
              className,
            )}
          >
            <div className="text-xs font-medium mb-2">Level {level}</div>
            <div
              className={cn(
                "size-12 rounded-full flex items-center justify-center mb-2",
                isUnlocked ? "bg-primary/20" : "bg-muted",
              )}
            >
              {icon}
            </div>
            <div className="text-sm font-semibold">{name}</div>
            {!isUnlocked && (
              <div className="mt-1 text-xs bg-muted-foreground/20 px-2 py-0.5 rounded-full">
                Locked
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[200px]">
          <div>
            <div className="font-semibold">{name}</div>
            <div className="text-xs mt-1">{description}</div>
            {!isUnlocked && (
              <div className="text-xs mt-1 font-medium">
                Unlocks at Level {level}
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
