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

// Register Chart.js components to enable the line chart functionality
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
  earthquakes: any[]; // Array of earthquake data objects from the USGS API
  theme: string; // Current theme ('dark' or 'light') from the ThemeContext
}

export const TimeSeriesChart = ({
  earthquakes,
  theme,
}: TimeSeriesChartProps) => {
  // Process earthquake data to count occurrences per date
  const timeData = earthquakes.reduce((acc: any, earthquake: any) => {
    const date = new Date(earthquake.properties.time).toLocaleDateString(); // Convert timestamp to readable date
    acc[date] = (acc[date] || 0) + 1; // Increment count for each date or initialize to 1
    return acc;
  }, {});

  // Extract sorted dates and corresponding earthquake counts for the chart
  const dates = Object.keys(timeData).sort(); // Sort dates chronologically
  const counts = dates.map((date) => timeData[date]); // Map counts to their respective dates

  // Calculate a 3-day moving average for a trend line
  const movingAverage = counts.map((_, index) => {
    const start = Math.max(0, index - 2); // Start index for 3-day window (avoid negative)
    const end = index + 1; // End index for 3-day window
    const slice = counts.slice(start, end); // Get the 3-day slice of data
    return slice.reduce((sum, val) => sum + val, 0) / slice.length; // Average the slice
  });

  // Define the chart data structure with two datasets: daily counts and moving average
  const chartData = {
    labels: dates, // X-axis labels (dates)
    datasets: [
      {
        label: "Daily Earthquakes", // Label for the main data line
        data: counts, // Daily earthquake counts
        borderColor: theme === "dark" ? "#60a5fa" : "#2563eb", // Dynamic color based on theme
        backgroundColor:
          theme === "dark"
            ? "rgba(96, 165, 250, 0.1)" // Light fill for dark theme
            : "rgba(37, 99, 235, 0.1)", // Light fill for light theme
        borderWidth: 2, // Line thickness
        fill: true, // Fill area under the line
        tension: 0.4, // Smoothness of the line curve
        pointRadius: 3, // Size of data points
        pointHoverRadius: 6, // Size of points on hover
      },
      {
        label: "Moving Average (3-day)", // Label for the trend line
        data: movingAverage, // 3-day moving average data
        borderColor: theme === "dark" ? "#f59e0b" : "#d97706", // Dynamic color for trend line
        backgroundColor: "transparent", // No fill for the trend line
        borderWidth: 2, // Line thickness
        fill: false, // No fill under the trend line
        tension: 0.4, // Smoothness of the trend line
        pointRadius: 0, // No visible points
        borderDash: [5, 5], // Dashed style for the trend line
      },
    ],
  };

  // Configure chart options for appearance and interactivity
  const options = {
    responsive: true, // Adjust chart size to container
    maintainAspectRatio: false, // Allow custom height/width
    plugins: {
      legend: {
        position: "top" as const, // Position of the legend
        labels: {
          color: theme === "dark" ? "#f3f4f6" : "#374151", // Dynamic text color
          usePointStyle: true, // Use circular points in legend
          padding: 20, // Space between legend items
        },
      },
      title: {
        display: false, // Hide the chart title
      },
      tooltip: {
        mode: "index" as const, // Show tooltips for all datasets at the hovered x-value
        intersect: false, // Show tooltip even if not directly over a point
        backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff", // Dynamic background
        titleColor: theme === "dark" ? "#f3f4f6" : "#374151", // Dynamic title color
        bodyColor: theme === "dark" ? "#f3f4f6" : "#374151", // Dynamic body color
        borderColor: theme === "dark" ? "#374151" : "#d1d5db", // Dynamic border color
        borderWidth: 1, // Tooltip border thickness
      },
    },
    scales: {
      x: {
        display: true, // Show x-axis
        title: {
          display: true, // Show x-axis title
          text: "Date", // Label for x-axis
          color: theme === "dark" ? "#f3f4f6" : "#374151", // Dynamic title color
        },
        ticks: {
          color: theme === "dark" ? "#9ca3af" : "#6b7280", // Dynamic tick color
          maxTicksLimit: 8, // Limit the number of ticks for readability
        },
        grid: {
          color: theme === "dark" ? "#374151" : "#e5e7eb", // Dynamic grid color
        },
      },
      y: {
        display: true, // Show y-axis
        title: {
          display: true, // Show y-axis title
          text: "Number of Earthquakes", // Label for y-axis
          color: theme === "dark" ? "#f3f4f6" : "#374151", // Dynamic title color
        },
        ticks: {
          color: theme === "dark" ? "#9ca3af" : "#6b7280", // Dynamic tick color
          beginAtZero: true, // Start y-axis at 0
        },
        grid: {
          color: theme === "dark" ? "#374151" : "#e5e7eb", // Dynamic grid color
        },
      },
    },
    interaction: {
      mode: "nearest" as const, // Highlight nearest data point on hover
      axis: "x" as const, // Align interaction along x-axis
      intersect: false, // Show interaction even if not directly over a point
    },
    elements: {
      point: {
        hoverRadius: 8, // Increase point size on hover
      },
    },
  };

  // Render the chart within a responsive container
  return (
    <div className="h-80 w-full"> {/* Fixed height and full width container */}
      <Line data={chartData} options={options} /> {/* Render the line chart */}
    </div>
  );
};