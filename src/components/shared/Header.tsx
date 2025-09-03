import { Globe, Filter, BarChart3, PieChart } from "lucide-react";
import ThemeToggleButton from "../ui/ThemeToggleButton";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const currentPage = location.pathname.substring(1) || "visualizer";

  const navItems = [
    {
      id: "visualizer",
      label: "Earthquake Visualizer",
      icon: Globe,
      path: "/visualizer",
    },
    {
      id: "adv-filters",
      label: "Advanced Filters",
      icon: Filter,
      path: "/adv-filters",
    },
    {
      id: "charts",
      label: "Chart Visualization",
      icon: PieChart,
      path: "/charts",
    },
    {
      id: "statistics",
      label: "Statistics Dashboard",
      icon: BarChart3,
      path: "/statistics",
    },
  ];

  return (
    <header className="bg-gradient-to-r from-white via-gray-50 to-white rounded-bl-2xl rounded-br-2xl md:rounded-none dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between h-16">
          {/* Left Side - Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo/Title */}
            <div className="flex items-center space-x-.5">
              <img
                src="/Earthquake_Visualizer_NoBg.png"
                alt=""
                className="h-15"
              />
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                Seismovis
              </h1>
            </div>

            {/* Desktop Navigation */}
            {/* Hidden on small screens */}
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`cursor-pointer flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      currentPage === item.id
                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <Icon className="size-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Side - Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggleButton />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
            >
              <svg
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 rounded-bl-lg ">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      currentPage === item.id
                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <Icon className="size-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
