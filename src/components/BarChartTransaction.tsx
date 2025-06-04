import type { CombinedAnalysisResult } from "@/types";
import { Bar, BarChart, CartesianGrid, Label, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "./ui/chart";

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
} satisfies ChartConfig

const BarChartTransaction = ({analysisResult} : {analysisResult: CombinedAnalysisResult['nikAnalysis']}) => {
  const provinceData = Object.entries(analysisResult.provinceCounts).map(([key, value]) => ({ name: key, value: value }));
  return (
    <ChartContainer config={chartConfig} className="mt-10 h-[400px] w-[500px] md:w-full">
      <BarChart
        accessibilityLayer
        data={provinceData}
        margin={{ top: 30, right: 20, bottom: 20, left: 20 }}
        barCategoryGap={20} // Increased gap for better visual separation
      >
        <CartesianGrid
          vertical={false}
          strokeDasharray="3 3" // Dashed grid lines
          stroke="#4A5568" // Darker grid lines for contrast
        />
        <XAxis
          dataKey="name"
          stroke="#CBD5E0" // Lighter stroke for axis line
          tickLine={false} // Remove tick lines
          axisLine={false} // Remove axis line
          tick={{ fill: "#E2E8F0", fontSize: 12 }} // White ticks
          angle={-25} // Angle the labels to prevent overlap
          textAnchor="end" // Anchor text at the end for angled labels
          height={80} // Give more space for angled labels
        >
          <Label
            value="Transaction by Province"
            offset={-5} // Adjust offset to position the label correctly
            position="insideBottom"
            style={{ fill: "#E2E8F0", fontSize: 16, fontWeight: "bold" }} // White, bold label
          />
        </XAxis>
        <YAxis
          stroke="#CBD5E0"
          tickLine={false}
          axisLine={false}
          tick={{ fill: "#E2E8F0", fontSize: 12 }}
          label={{
            value: "Number of Transactions",
            angle: -90,
            position: "insideLeft",
            style: { fill: "#E2E8F0", fontSize: 14, fontWeight: "bold" },
          }}
        />
        <Bar
          dataKey="value"
          fill="url(#colorValue)" // Use a gradient fill
          radius={[8, 8, 0, 0]} // Rounded top corners only
          label={{ position: "top", fill: "#E2E8F0", fontSize: 12 }} // Label on top of bars
          className="mb-2"
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent className="bg-gray-700 text-white border-gray-600 rounded-md shadow-lg" />
          } // Styled tooltip
        />

        {/* Define gradient for the bars */}
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#63B3ED" stopOpacity={0.8} />{" "}
            {/* Light blue */}
            <stop offset="95%" stopColor="#4299E1" stopOpacity={0.5} />{" "}
            {/* Darker blue */}
          </linearGradient>
        </defs>
      </BarChart>
    </ChartContainer>
  );
};

export default BarChartTransaction;
