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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface MagnitudeDistributionChartProps {
  earthquakes: any[];
  theme: string;
}

export const MagnitudeDistributionChart = ({
  earthquakes,
  theme,
}: MagnitudeDistributionChartProps) => {
  // Group earthquakes by magnitude ranges
  const magnitudeRanges = {
    "0-1": 0,
    "1-2": 0,
    "2-3": 0,
    "3-4": 0,
    "4-5": 0,
    "5+": 0,
  };

  earthquakes.forEach((earthquake: any) => {
    const mag = earthquake.properties.mag;
    if (mag < 1) magnitudeRanges["0-1"]++;
    else if (mag < 2) magnitudeRanges["1-2"]++;
    else if (mag < 3) magnitudeRanges["2-3"]++;
    else if (mag < 4) magnitudeRanges["3-4"]++;
    else if (mag < 5) magnitudeRanges["4-5"]++;
    else magnitudeRanges["5+"]++;
  });

  const chartData = {
    labels: Object.keys(magnitudeRanges),
    datasets: [
      {
        label: "Number of Earthquakes",
        data: Object.values(magnitudeRanges),
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
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
        titleColor: theme === "dark" ? "#f3f4f6" : "#374151",
        bodyColor: theme === "dark" ? "#f3f4f6" : "#374151",
        borderColor: theme === "dark" ? "#374151" : "#d1d5db",
        borderWidth: 1,
        callbacks: {
          label: (context: any) => `Count: ${context.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Magnitude Range",
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
          text: "Number of Earthquakes",
          color: theme === "dark" ? "#f3f4f6" : "#374151",
        },
        ticks: {
          color: theme === "dark" ? "#9ca3af" : "#6b7280",
          beginAtZero: true,
        },
        grid: {
          color: theme === "dark" ? "#374151" : "#e5e7eb",
        },
      },
    },
  };

  return (
    <div className="h-80 w-full">
      <Bar data={chartData} options={options} />
    </div>
  );
};
