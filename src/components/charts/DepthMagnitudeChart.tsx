import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DepthMagnitudeChartProps {
  earthquakes: any[];
  theme: string;
}

export const DepthMagnitudeChart = ({
  earthquakes,
  theme,
}: DepthMagnitudeChartProps) => {
  // Extract depth and magnitude data
  const data = earthquakes.map((earthquake: any) => ({
    x: earthquake.properties.mag,
    y: earthquake.geometry.coordinates[2] || 0, // Depth is the 3rd coordinate
  }));

  const chartData = {
    datasets: [
      {
        label: "Earthquakes",
        data: data,
        backgroundColor: earthquakes.map((earthquake: any) => {
          const mag = earthquake.properties.mag;
          if (mag >= 5) return "rgba(239, 68, 68, 0.7)"; // Red for high magnitude
          if (mag >= 3) return "rgba(245, 158, 11, 0.7)"; // Orange for medium
          return "rgba(59, 130, 246, 0.7)"; // Blue for low magnitude
        }),
        borderColor: earthquakes.map((earthquake: any) => {
          const mag = earthquake.properties.mag;
          if (mag >= 5) return "rgba(239, 68, 68, 1)";
          if (mag >= 3) return "rgba(245, 158, 11, 1)";
          return "rgba(59, 130, 246, 1)";
        }),
        borderWidth: 1,
        pointRadius: 4,
        pointHoverRadius: 8,
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
          label: (context: any) => [
            `Magnitude: ${context.parsed.x}`,
            `Depth: ${context.parsed.y} km`,
          ],
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Magnitude",
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
          text: "Depth (km)",
          color: theme === "dark" ? "#f3f4f6" : "#374151",
        },
        ticks: {
          color: theme === "dark" ? "#9ca3af" : "#6b7280",
        },
        grid: {
          color: theme === "dark" ? "#374151" : "#e5e7eb",
        },
        reverse: true, // Depth increases downward
      },
    },
  };

  return (
    <div className="h-80 w-full">
      <Scatter data={chartData} options={options} />
    </div>
  );
};
