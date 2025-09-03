# 🌍 Earthquake Visualizer

An interactive web application to visualize and analyze **real-time global earthquake activity** using data from the **USGS Earthquake API**.  
It features an interactive map, advanced filtering, infinite scrolling lists, and rich chart visualizations for magnitude, depth, frequency, and geographic distribution.  
Built with **React, Redux, Leaflet, TailwindCSS, DaisyUI, Lucide React, and Chart.js**, with support for **dark/light themes**.



## ✨ Features

- 🌐 **Interactive Map**
  - Earthquake locations displayed with **Leaflet**.
  - Marker color and size reflect **magnitude**.
  - Click markers to view **details & external link** to USGS.

- 📊 **Charts & Analytics**
  - **Time Series Chart** – Earthquake frequency over time.
  - **Magnitude Distribution** – Histogram of magnitudes.
  - **Depth vs Magnitude** – Relation between depth and magnitude.
  - **Geographic Distribution** – Quakes grouped by region.

- 🎛️ **Advanced Filters**
  - Filter by **magnitude**, **location**, **magnitude range**.
  - Sort earthquakes dynamically.

- 📜 **Earthquake List**
  - Infinite scroll for browsing latest quakes.
  - Real-time fetch from **USGS API** with on-time updates.
  - Detailed earthquake info page.
  - Click on more details for detailed description.

- 🌗 **Dark / Light Mode**
  - Beautiful theme toggle with animated transitions using theme toggle button.
  - Lenis for smooth scrolling.

## 🛠️ Tech Stack

- **Frontend Framework**: [React.js](https://react.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/), [DaisyUI](https://daisyui.com/), [Lucide React](https://lucide.dev/)
- **Mapping**: [Leaflet](https://leafletjs.com/) + [React-Leaflet](https://react-leaflet.js.org/)
- **Charts**: [Chart.js](https://www.chartjs.org/)
- **API**: [USGS Earthquake API](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)
- **Lenis**:[Lenis](https://www.npmjs.com/package/lenis/v/1.1.14-dev.5)


## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/sanvi1803/Earthquake_Visualizer.git
cd Earthquake_Visualizer
```

## 2. Install dependencies
```bash
npm install
```

## 3. Set Up Environment Variables:

- Create a .env file in the root directory.
- Add the USGS API endpoint:
```bash
REACT_APP_USGS_API_URL=VITE_USGS_API_URL=https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson
```

## 3. Run the development server
```bash
npm run dev
```

## 4. Build for production
```bash
npm run build
```
## 📂 Project Structure
```bash
src/
 ├── components/
 │   ├── EarthquakeMap/       # Leaflet-based map visualization
 │   ├── ChartVisualization/  # Chart.js charts
 │   ├── ThemeToggle/         # Dark/Light mode toggle
 │   └── shared/              # Shared UI components
 ├── store/                   # Redux slices & store setup
 ├── context/                 # ThemeContext
 └── App.tsx                  # Main entry point
 ```
## 🎮 Usage

- Navigate: Use the header to switch between map (/visualizer), charts (/charts), statistics (/statistics), and filters (/adv-filters).
- Map Interaction: Click markers for popup details or open the modal for more info.
- List View: Scroll infinitely to load more quakes; apply filters via the filters page.
- Charts: Analyze trends on the Chart Visualization page.
- Theme Toggle: Click the sun/moon icon to switch themes with a smooth animation.

## 🌍 API Used

- Endpoint: [USGS All Day Earthquakes](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson)

- Provides real-time earthquake data in GeoJSON format.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to open a PR or issue to improve functionality, add charts, or enhance UI.
