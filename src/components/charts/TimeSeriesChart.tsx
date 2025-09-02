import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface TimeSeriesChartProps {
  earthquakes: any[];
  theme: string;
}

export const TimeSeriesChart = ({
  earthquakes,
  theme,
}: TimeSeriesChartProps) => {
  // Process data for time series
  const timeData = earthquakes.reduce((acc: any, earthquake: any) => {
    const date = new Date(earthquake.properties.time).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const dates = Object.keys(timeData).sort();
  const counts = dates.map((date) => timeData[date]);

  // Calculate moving average for trend line
  const movingAverage = counts.map((_, index) => {
    const start = Math.max(0, index - 2);
    const end = index + 1;
    const slice = counts.slice(start, end);
    return slice.reduce((sum, val) => sum + val, 0) / slice.length;
  });

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: "Daily Earthquakes",
        data: counts,
        borderColor: theme === "dark" ? "#60a5fa" : "#2563eb",
        backgroundColor:
          theme === "dark"
            ? "rgba(96, 165, 250, 0.1)"
            : "rgba(37, 99, 235, 0.1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
      },
      {
        label: "Moving Average (3-day)",
        data: movingAverage,
        borderColor: theme === "dark" ? "#f59e0b" : "#d97706",
        backgroundColor: "transparent",
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointRadius: 0,
        borderDash: [5, 5],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: theme === "dark" ? "#f3f4f6" : "#374151",
          usePointStyle: true,
          padding: 20,
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
        titleColor: theme === "dark" ? "#f3f4f6" : "#374151",
        bodyColor: theme === "dark" ? "#f3f4f6" : "#374151",
        borderColor: theme === "dark" ? "#374151" : "#d1d5db",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Date",
          color: theme === "dark" ? "#f3f4f6" : "#374151",
        },
        ticks: {
          color: theme === "dark" ? "#9ca3af" : "#6b7280",
          maxTicksLimit: 8,
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
    interaction: {
      mode: "nearest" as const,
      axis: "x" as const,
      intersect: false,
    },
    elements: {
      point: {
        hoverRadius: 8,
      },
    },
  };

  return (
    <div className="h-80 w-full">
      <Line data={chartData} options={options} />
    </div>
  );
};
