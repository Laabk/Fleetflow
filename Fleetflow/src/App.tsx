
import { useState } from "react";
import type { ReactNode } from "react";
import Vehicles from "./pages/Vehicles";

import {
  LayoutDashboard,
  Truck,
  Users,
  Map,
  Fuel,
  Wrench,
  Settings,
  Search,
  Bell,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  CircleCheck,
  Clock,
  AlertTriangle,
} from "lucide-react";

const vehicles = [
  {
    id: "GT-4821-24",
    name: "Mercedes-Benz Actros",
    driver: "Kwame Mensah",
    route: "Tema → Kumasi",
    status: "On Trip",
    fuel: "78%",
  },
  {
    id: "GT-1039-23",
    name: "MAN TGX",
    driver: "Samuel Asare",
    route: "Accra → Takoradi",
    status: "On Trip",
    fuel: "64%",
  },
  {
    id: "GT-2290-22",
    name: "Toyota Hilux",
    driver: "Michael Owusu",
    route: "Accra Central",
    status: "Available",
    fuel: "91%",
  },
  {
    id: "GT-7741-21",
    name: "Volvo FH",
    driver: "Daniel Boateng",
    route: "Maintenance Bay",
    status: "Maintenance",
    fuel: "32%",
  },
];

function App() {
  const [currentPage, setCurrentPage] = useState("Dashboard");

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">
            <Truck size={24} />
          </div>

          <div>
            <h2>FleetFlow</h2>
            <span>Fleet Management</span>
          </div>
        </div>

        <div className="menu-label">MAIN MENU</div>

        <nav>
          <button
            type="button"
            className={`nav-item ${
              currentPage === "Dashboard" ? "active" : ""
            }`}
            onClick={() => setCurrentPage("Dashboard")}
          >
            <LayoutDashboard size={19} />
            Dashboard
          </button>

          <button
            type="button"
            className={`nav-item ${
              currentPage === "Vehicles" ? "active" : ""
            }`}
            onClick={() => setCurrentPage("Vehicles")}
          >
            <Truck size={19} />
            Vehicles
          </button>

          <a className="nav-item" href="#">
            <Users size={19} />
            Drivers
          </a>

          <a className="nav-item" href="#">
            <Map size={19} />
            Trips
          </a>

          <a className="nav-item" href="#">
            <Fuel size={19} />
            Fuel
          </a>

          <a className="nav-item" href="#">
            <Wrench size={19} />
            Maintenance
          </a>
        </nav>

        <div className="sidebar-bottom">
          <a className="nav-item" href="#">
            <Settings size={19} />
            Settings
          </a>

          <div className="profile">
            <div className="avatar">DL</div>

            <div>
              <strong>Fleet Administrator</strong>
              <span>Administrator</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>
              {currentPage === "Dashboard"
                ? "Dashboard"
                : "Vehicle Management"}
            </h1>

            <p>
              {currentPage === "Dashboard"
                ? "Welcome back! Here's what's happening with your fleet."
                : "Manage and monitor your fleet vehicles."}
            </p>
          </div>

          <div className="top-actions">
            <button className="icon-button">
              <Bell size={19} />
              <span className="notification-dot"></span>
            </button>

            <button className="add-trip-button">
              <Plus size={18} />
              Create Trip
            </button>
          </div>
        </header>

        {currentPage === "Dashboard" ? (
          <>
            <section className="stats-grid">
              <StatCard
                title="Total Vehicles"
                value="48"
                change="+4.2%"
                description="vs last month"
                icon={<Truck size={20} />}
                positive
              />

              <StatCard
                title="Active Trips"
                value="16"
                change="+2"
                description="since yesterday"
                icon={<Map size={20} />}
                positive
              />

              <StatCard
                title="Available Vehicles"
                value="23"
                change="-3"
                description="vs yesterday"
                icon={<CircleCheck size={20} />}
              />

              <StatCard
                title="Maintenance"
                value="5"
                change="+1"
                description="requires attention"
                icon={<Wrench size={20} />}
                warning
              />
            </section>

            <section className="content-grid">
              <div className="panel fleet-panel">
                <div className="panel-header">
                  <div>
                    <h2>Fleet Overview</h2>
                    <p>Monitor your vehicles and their current status.</p>
                  </div>

                  <button
                    className="view-all"
                    onClick={() => setCurrentPage("Vehicles")}
                  >
                    View all
                  </button>
                </div>

                <div className="table-toolbar">
                  <div className="search-box">
                    <Search size={17} />
                    <input placeholder="Search vehicles..." />
                  </div>

                  <button className="filter-button">
                    All Vehicles
                  </button>
                </div>

                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>VEHICLE</th>
                        <th>DRIVER</th>
                        <th>ROUTE</th>
                        <th>STATUS</th>
                        <th>FUEL</th>
                      </tr>
                    </thead>

                    <tbody>
                      {vehicles.map((vehicle) => (
                        <tr key={vehicle.id}>
                          <td>
                            <strong>{vehicle.name}</strong>
                            <span className="vehicle-id">
                              {vehicle.id}
                            </span>
                          </td>

                          <td>{vehicle.driver}</td>
                          <td>{vehicle.route}</td>

                          <td>
                            <StatusBadge status={vehicle.status} />
                          </td>

                          <td>
                            <div className="fuel-cell">
                              <div className="fuel-bar">
                                <div
                                  className="fuel-fill"
                                  style={{ width: vehicle.fuel }}
                                />
                              </div>

                              <span>{vehicle.fuel}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="panel activity-panel">
                <div className="panel-header">
                  <div>
                    <h2>Recent Activity</h2>
                    <p>Latest fleet operations</p>
                  </div>
                </div>

                <div className="activity-list">
                  <Activity
                    icon={<CircleCheck size={17} />}
                    title="Trip completed"
                    description="GT-4821-24 completed Tema → Kumasi"
                    time="10 minutes ago"
                    type="success"
                  />

                  <Activity
                    icon={<Wrench size={17} />}
                    title="Maintenance scheduled"
                    description="Volvo FH scheduled for servicing"
                    time="35 minutes ago"
                    type="warning"
                  />

                  <Activity
                    icon={<Users size={17} />}
                    title="Driver assigned"
                    description="Michael Owusu assigned to GT-2290-22"
                    time="1 hour ago"
                    type="info"
                  />

                  <Activity
                    icon={<Fuel size={17} />}
                    title="Fuel recorded"
                    description="120 litres recorded for GT-1039-23"
                    time="2 hours ago"
                    type="info"
                  />
                </div>
              </div>
            </section>

            <section className="bottom-grid">
              <div className="panel">
                <div className="panel-header">
                  <div>
                    <h2>Operational Summary</h2>
                    <p>Today's fleet performance</p>
                  </div>
                </div>

                <div className="summary-items">
                  <SummaryItem
                    icon={<CircleCheck size={18} />}
                    label="Completed Trips"
                    value="12"
                    color="green"
                  />

                  <SummaryItem
                    icon={<Clock size={18} />}
                    label="Ongoing Trips"
                    value="16"
                    color="blue"
                  />

                  <SummaryItem
                    icon={<AlertTriangle size={18} />}
                    label="Delayed Trips"
                    value="3"
                    color="orange"
                  />
                </div>
              </div>

              <div className="panel">
                <div className="panel-header">
                  <div>
                    <h2>Quick Actions</h2>
                    <p>Common operations</p>
                  </div>
                </div>

                <div className="quick-actions">
                  <button onClick={() => setCurrentPage("Vehicles")}>
                    <Plus size={18} />
                    Add Vehicle
                  </button>

                  <button>
                    <Users size={18} />
                    Register Driver
                  </button>

                  <button>
                    <Map size={18} />
                    Create Trip
                  </button>

                  <button>
                    <Wrench size={18} />
                    Schedule Maintenance
                  </button>
                </div>
              </div>
            </section>

            <footer>
              FleetFlow Fleet Management System · Version 0.1.0
            </footer>
          </>
        ) : (
          <Vehicles />
        )}
      </main>
    </div>
  );
}

function StatCard({
  title,
  value,
  change,
  description,
  icon,
  positive,
  warning,
}: {
  title: string;
  value: string;
  change: string;
  description: string;
  icon: ReactNode;
  positive?: boolean;
  warning?: boolean;
}) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <span>{title}</span>

        <div className={`stat-icon ${warning ? "warning" : ""}`}>
          {icon}
        </div>
      </div>

      <div className="stat-value">{value}</div>

      <div className="stat-change">
        <span className={positive ? "positive" : warning ? "negative" : ""}>
          {positive && <ArrowUpRight size={15} />}
          {warning && <ArrowDownRight size={15} />}
          {change}
        </span>

        <span>{description}</span>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const className = status.toLowerCase().replace(" ", "-");

  return (
    <span className={`status-badge ${className}`}>
      {status}
    </span>
  );
}

function Activity({
  icon,
  title,
  description,
  time,
  type,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  time: string;
  type: string;
}) {
  return (
    <div className="activity-item">
      <div className={`activity-icon ${type}`}>
        {icon}
      </div>

      <div className="activity-details">
        <strong>{title}</strong>
        <p>{description}</p>
        <span>{time}</span>
      </div>
    </div>
  );
}

function SummaryItem({
  icon,
  label,
  value,
  color,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="summary-item">
      <div className={`summary-icon ${color}`}>
        {icon}
      </div>

      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default App;