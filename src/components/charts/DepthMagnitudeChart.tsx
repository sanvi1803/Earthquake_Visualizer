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

// Register Chart.js modules required for scatter plots
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Props definition: earthquakes data array + theme (light/dark)
interface DepthMagnitudeChartProps {
  earthquakes: any[];
  theme: string;
}

export const DepthMagnitudeChart = ({
  earthquakes,
  theme,
}: DepthMagnitudeChartProps) => {
  //  Extract depth and magnitude for scatter plot
  // - x-axis: magnitude
  // - y-axis: depth (3rd value in coordinates array)
  const data = earthquakes.map((earthquake: any) => ({
    x: earthquake.properties.mag,
    y: earthquake.geometry.coordinates[2] || 0, // fallback to 0 if no depth
  }));

  //  Define dataset for the scatter chart
  const chartData = {
    datasets: [
      {
        label: "Earthquakes",
        data: data,
        // Point background color changes based on magnitude
        backgroundColor: earthquakes.map((earthquake: any) => {
          const mag = earthquake.properties.mag;
          if (mag >= 5) return "rgba(239, 68, 68, 0.7)"; // Red → High magnitude
          if (mag >= 3) return "rgba(245, 158, 11, 0.7)"; // Orange → Medium
          return "rgba(59, 130, 246, 0.7)"; // Blue → Low
        }),
        // Border color matches background but solid
        borderColor: earthquakes.map((earthquake: any) => {
          const mag = earthquake.properties.mag;
          if (mag >= 5) return "rgba(239, 68, 68, 1)";
          if (mag >= 3) return "rgba(245, 158, 11, 1)";
          return "rgba(59, 130, 246, 1)";
        }),
        borderWidth: 1,
        pointRadius: 4, // Default point size
        pointHoverRadius: 8, // Enlarges point on hover
      },
    ],
  };

  //  Chart options (responsiveness, theme styles, tooltips, scales)
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide legend since we only have one dataset
      },
      tooltip: {
        // Tooltip styling adapts to theme
        backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
        titleColor: theme === "dark" ? "#f3f4f6" : "#374151",
        bodyColor: theme === "dark" ? "#f3f4f6" : "#374151",
        borderColor: theme === "dark" ? "#374151" : "#d1d5db",
        borderWidth: 1,
        callbacks: {
          // Custom tooltip labels
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
        reverse: true, // Depth grows downward (geological convention)
      },
    },
  };

  return (
    <div className="h-80 w-full">
      {/* Scatter plot for Depth vs Magnitude */}
      <Scatter data={chartData} options={options} />
    </div>
  );
};
