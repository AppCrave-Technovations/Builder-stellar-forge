import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface ResourceFunnelProps {
  data: {
    stage: string;
    count: number;
    color: string;
  }[];
  title?: string;
}

export function ResourceFunnel({
  data,
  title = "Resource Funnel",
}: ResourceFunnelProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ChartContainer
            config={{
              applied: { label: "Applied" },
              screened: { label: "Screened" },
              interviewed: { label: "Interviewed" },
              hired: { label: "Hired" },
              rejected: { label: "Rejected" },
            }}
          >
            <BarChart data={data} layout="vertical">
              <XAxis type="number" hide />
              <YAxis
                dataKey="stage"
                type="category"
                scale="band"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                width={100}
              />
              <ChartTooltip>
                <ChartTooltipContent />
              </ChartTooltip>
              <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={20}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex items-center">
            <div className="flex flex-col">
              <div className="text-xs text-muted-foreground mb-1">
                Conversion Rate
              </div>
              <div className="text-lg font-bold">42%</div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex flex-col">
              <div className="text-xs text-muted-foreground mb-1">
                Avg. Time to Hire
              </div>
              <div className="text-lg font-bold">12 days</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
