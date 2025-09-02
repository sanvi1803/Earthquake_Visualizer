import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface GeographicDistributionChartProps {
  earthquakes: any[];
  theme: string;
}

export const GeographicDistributionChart = ({
  earthquakes,
  theme,
}: GeographicDistributionChartProps) => {
  // Group earthquakes by country/region
  const geographicData = earthquakes.reduce((acc: any, earthquake: any) => {
    const place = earthquake.properties.place;
    const country = place.split(",").pop()?.trim() || "Unknown";
    acc[country] = (acc[country] || 0) + 1;
    return acc;
  }, {});

  // Sort by count and take top 10
  const sortedData = Object.entries(geographicData)
    .sort(([, a]: any, [, b]: any) => b - a)
    .slice(0, 10);

  const labels = sortedData.map(([country]) => country);
  const counts = sortedData.map(([, count]) => count);

  const chartData = {
    labels,
    datasets: [
      {
        data: counts,
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)", // Blue
          "rgba(34, 197, 94, 0.8)", // Green
          "rgba(251, 191, 36, 0.8)", // Yellow
          "rgba(245, 158, 11, 0.8)", // Orange
          "rgba(239, 68, 68, 0.8)", // Red
          "rgba(147, 51, 234, 0.8)", // Purple
          "rgba(236, 72, 153, 0.8)", // Pink
          "rgba(16, 185, 129, 0.8)", // Emerald
          "rgba(249, 115, 22, 0.8)", // Orange
          "rgba(139, 92, 246, 0.8)", // Violet
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(34, 197, 94, 1)",
          "rgba(251, 191, 36, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(147, 51, 234, 1)",
          "rgba(236, 72, 153, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(249, 115, 22, 1)",
          "rgba(139, 92, 246, 1)",
        ],
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          color: theme === "dark" ? "#f3f4f6" : "#374151",
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
        titleColor: theme === "dark" ? "#f3f4f6" : "#374151",
        bodyColor: theme === "dark" ? "#f3f4f6" : "#374151",
        borderColor: theme === "dark" ? "#374151" : "#d1d5db",
        borderWidth: 1,
        callbacks: {
          label: (context: any) => {
            const total = context.dataset.data.reduce(
              (a: number, b: number) => a + b,
              0
            );
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: ${context.parsed} (${percentage}%)`;
          },
        },
      },
    },
    cutout: "40%",
  };

  return (
    <div className="h-80 w-full">
      <Doughnut data={chartData} options={options} />
    </div>
  );
};
