import type { CombinedAnalysisResult } from "@/types";
import { Cell, Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "./ui/chart";

const chartConfig = {
  gender: {
    label: "Gender",
  },
  male: {
    label: "Male",
    color: "hsl(var(--chart-1))",
  },
  female: {
    label: "Female",
    color: "hsl(var(--chart-1))",
  },
  unknown: {
    label: "Unknown",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;
const PIE_COLORS = ["#63B3ED", "#F687B3", "#A0AEC0"];
const PieGenderChart = ({
  analysisResult,
}: {
  analysisResult: CombinedAnalysisResult["nikAnalysis"];
}) => {
  const genderData = [
    {
      name: "Male",
      value: analysisResult.genderCounts.male,
      fill: "hsl(210 80% 60%)",
    },
    {
      name: "Female",
      value: analysisResult.genderCounts.female,
      fill: "hsl(340 80% 60%)",
    },
    {
      name: "Unknown",
      value: analysisResult.genderCounts.unknown,
      fill: "hsl(240 5% 60%)",
    },
  ];

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[300px] w-full" // Increased max-height for better visibility
    >
      <PieChart>
        <Pie
          data={genderData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          innerRadius={80}
          paddingAngle={5}
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {genderData.map((_entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={PIE_COLORS[index % PIE_COLORS.length]}
            />
          ))}
        </Pie>
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent className="bg-gray-700 text-white border-gray-600 rounded-md shadow-lg" />
          }
        />
      </PieChart>
    </ChartContainer>
  );
};

export default PieGenderChart;
