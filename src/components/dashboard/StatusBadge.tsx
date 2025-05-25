import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusType =
  | "pending"
  | "active"
  | "completed"
  | "rejected"
  | "paused"
  | "applied"
  | "screened"
  | "interviewed"
  | "hired"
  | "passed"
  | "failed";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getVariant = () => {
    switch (status) {
      case "active":
      case "passed":
      case "hired":
        return "bg-green-100 text-green-800 border-green-200 hover:bg-green-200";
      case "pending":
      case "applied":
      case "screened":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200";
      case "rejected":
      case "failed":
        return "bg-red-100 text-red-800 border-red-200 hover:bg-red-200";
      case "paused":
        return "bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200";
      case "interviewed":
        return "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200";
    }
  };

  const getLabel = () => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <Badge
      variant="outline"
      className={cn("rounded-md font-medium", getVariant(), className)}
    >
      {getLabel()}
    </Badge>
  );
}
