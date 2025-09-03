import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the chart components needed for Bar charts
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Props definition: earthquake dataset + theme (light/dark)
interface MagnitudeDistributionChartProps {
  earthquakes: any[];
  theme: string;
}

export const MagnitudeDistributionChart = ({
  earthquakes,
  theme,
}: MagnitudeDistributionChartProps) => {
  //   Initialize magnitude ranges (buckets)
  // Each key stores how many earthquakes fall in that range
  const magnitudeRanges = {
    "0-1": 0,
    "1-2": 0,
    "2-3": 0,
    "3-4": 0,
    "4-5": 0,
    "5+": 0,
  };

  //   Loop through each earthquake and increment the right bucket
  earthquakes.forEach((earthquake: any) => {
    const mag = earthquake.properties.mag;
    if (mag < 1) magnitudeRanges["0-1"]++;
    else if (mag < 2) magnitudeRanges["1-2"]++;
    else if (mag < 3) magnitudeRanges["2-3"]++;
    else if (mag < 4) magnitudeRanges["3-4"]++;
    else if (mag < 5) magnitudeRanges["4-5"]++;
    else magnitudeRanges["5+"]++;
  });

  //   Prepare chart dataset from grouped values
  const chartData = {
    labels: Object.keys(magnitudeRanges), // x-axis → magnitude ranges
    datasets: [
      {
        label: "Number of Earthquakes",
        data: Object.values(magnitudeRanges), // y-axis → count in each range
        // Different colors for each bar to visually separate ranges
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)", // Blue
          "rgba(34, 197, 94, 0.8)", // Green
          "rgba(251, 191, 36, 0.8)", // Yellow
          "rgba(245, 158, 11, 0.8)", // Orange
          "rgba(239, 68, 68, 0.8)", // Red
          "rgba(147, 51, 234, 0.8)", // Purple
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(34, 197, 94, 1)",
          "rgba(251, 191, 36, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(147, 51, 234, 1)",
        ],
        borderWidth: 2,
        borderRadius: 8, // Rounded corners for bars
        borderSkipped: false, // Ensures full rounded bars
      },
    ],
  };

  //   Chart options: responsiveness, theming, tooltips, axis labels
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide legend since it's self-explanatory
      },
      tooltip: {
        // Tooltip adapts colors to theme
        backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
        titleColor: theme === "dark" ? "#f3f4f6" : "#374151",
        bodyColor: theme === "dark" ? "#f3f4f6" : "#374151",
        borderColor: theme === "dark" ? "#374151" : "#d1d5db",
        borderWidth: 1,
        callbacks: {
          // Custom tooltip: shows count instead of raw value
          label: (context: any) => `Count: ${context.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Magnitude Range", // Label for X-axis
          color: theme === "dark" ? "#f3f4f6" : "#374151",
        },
        ticks: {
          color: theme === "dark" ? "#9ca3af" : "#6b7280",
        },
        grid: {
          color: theme === "dark" ? "#374151" : "#e5e7eb",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Number of Earthquakes", // Label for Y-axis
          color: theme === "dark" ? "#f3f4f6" : "#374151",
        },
        ticks: {
          color: theme === "dark" ? "#9ca3af" : "#6b7280",
          beginAtZero: true, // Ensure axis starts at 0
        },
        grid: {
          color: theme === "dark" ? "#374151" : "#e5e7eb",
        },
      },
    },
  };

  return (
    <div className="h-80 w-full">
      {/* Render bar chart with data and options */}
      <Bar data={chartData} options={options} />
    </div>
  );
};
