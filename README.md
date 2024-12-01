# Avify
## Overview

Avify is a React-based project designed to showcase components and data visualization using modern libraries and tools. It incorporates charts, gauges, and interactive elements styled with Material-UI and TailwindCSS. The project is built with TypeScript and Webpack, ensuring a modular and type-safe development environment.

## Features

* **React Components:** Modular design with reusable components like charts, gauges, and sidebars.
* **Data Visualization:** Integration with chart.js and react-gauge-chart for dynamic visualizations.
* **Material-UI:** Enhanced user interface with Material-UI components.
* **Testing:** Comprehensive testing using Jest and Testing Library.
* **Styling:** TailwindCSS for modern, responsive designs.

## Prerequisites

* **Node.js:** Ensure Node.js (>=16.x) is installed on your system.
* **Package Manager:** npm.

## Installation

1. Clone the repository:

   ```
   git clone <repository_url>
   cd avify
   ```
2. Install dependencies:
   ```
   npm install
   ```

## Usage
## Development Server

Start the development server:
   ```
   npm start
   ```
The app will run on http://localhost:8080 by default.

## Testing

Run the test suite to ensure all components and logic are working as expected:

   ```
   npm test
   ```

## Project Structure
* **src/components/:** Contains reusable React components, each with its corresponding test file.
  * **chart/:** Chart component using chart.js.
  * **Data/:** Data component using datagrid.
  * **Footer/:** Footercomponent.
  * **Gauge/:** Gauge component for visual metrics.
  * **Navbar/:** Navbar Component.
  * **Sidebar/:** Navigation and layout components.
* **jest.setup.ts:** Jest configuration for enhanced testing.
* **tailwind.config.js:** TailwindCSS configuration for custom styling.
* **webpack.config.js:** Webpack configuration for bundling and development server.

## Key Technologies
## Frontend
* React: UI components.
* Material-UI: UI enhancements.
* Chart.js: Data visualization.
## Build & Styling
* Webpack: Module bundling.
* TailwindCSS: Styling.
## Testing
* Jest: Unit and integration testing.
* React Testing Library: DOM testing utilities.