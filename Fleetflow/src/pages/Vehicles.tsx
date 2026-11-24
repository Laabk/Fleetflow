
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { initialVehicles } from "../data/vehicles";
import type { Vehicle, VehicleStatus } from "../types/vehicle";

const STORAGE_KEY = "fleetflow_vehicles";

function getSavedVehicles(): Vehicle[] {
  try {
    const savedVehicles = localStorage.getItem(STORAGE_KEY);

    if (savedVehicles) {
      return JSON.parse(savedVehicles) as Vehicle[];
    }

    return initialVehicles;
  } catch {
    return initialVehicles;
  }
}

function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(getSavedVehicles);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [registrationNumber, setRegistrationNumber] = useState("");
  const [model, setModel] = useState("");
  const [driver, setDriver] = useState("");
  const [fuelCapacity, setFuelCapacity] = useState("");
  const [status, setStatus] = useState<VehicleStatus>("Available");

  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
  }, [vehicles]);

  const totalVehicles = vehicles.length;

  const availableVehicles = vehicles.filter(
    (vehicle) => vehicle.status === "Available"
  ).length;

  const vehiclesOnTrip = vehicles.filter(
    (vehicle) => vehicle.status === "On Trip"
  ).length;

  const vehiclesInMaintenance = vehicles.filter(
    (vehicle) => vehicle.status === "Maintenance"
  ).length;

  const filteredVehicles = vehicles.filter((vehicle) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      vehicle.registrationNumber.toLowerCase().includes(search) ||
      vehicle.model.toLowerCase().includes(search) ||
      vehicle.driver.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "All" || vehicle.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  function resetForm() {
    setRegistrationNumber("");
    setModel("");
    setDriver("");
    setFuelCapacity("");
    setStatus("Available");
    setEditingId(null);
    setError("");
    setShowForm(false);
  }

  function handleEditVehicle(vehicle: Vehicle) {
    setEditingId(vehicle.id);
    setRegistrationNumber(vehicle.registrationNumber);
    setModel(vehicle.model);
    setDriver(vehicle.driver);
    setFuelCapacity(String(vehicle.fuelCapacity));
    setStatus(vehicle.status);
    setError("");
    setShowForm(true);
  }

  function handleDeleteVehicle(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this vehicle?"
    );

    if (!confirmed) return;

    setVehicles((previousVehicles) =>
      previousVehicles.filter((vehicle) => vehicle.id !== id)
    );
  }

  function handleSaveVehicle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const cleanRegistration = registrationNumber.trim().toUpperCase();
    const cleanModel = model.trim();
    const cleanDriver = driver.trim();
    const capacity = Number(fuelCapacity);

    if (!cleanRegistration || !cleanModel || !cleanDriver) {
      setError("Please complete all fields.");
      return;
    }

    if (!Number.isFinite(capacity) || capacity <= 0) {
      setError("Fuel capacity must be a positive number.");
      return;
    }

    const duplicate = vehicles.some(
      (vehicle) =>
        vehicle.registrationNumber.toUpperCase() === cleanRegistration &&
        vehicle.id !== editingId
    );

    if (duplicate) {
      setError("This registration number already exists.");
      return;
    }

    if (editingId) {
      setVehicles((previousVehicles) =>
        previousVehicles.map((vehicle) =>
          vehicle.id === editingId
            ? {
                ...vehicle,
                registrationNumber: cleanRegistration,
                model: cleanModel,
                driver: cleanDriver,
                fuelCapacity: capacity,
                currentFuel: Math.min(vehicle.currentFuel, capacity),
                status,
              }
            : vehicle
        )
      );
    } else {
      const newVehicle: Vehicle = {
        id: crypto.randomUUID(),
        registrationNumber: cleanRegistration,
        model: cleanModel,
        driver: cleanDriver,
        fuelCapacity: capacity,
        currentFuel: capacity,
        status,
        createdAt: new Date().toISOString(),
      };

      setVehicles((previousVehicles) => [
        ...previousVehicles,
        newVehicle,
      ]);
    }

    resetForm();
  }

  return (
    <div className="vehicles-page">
      <div className="vehicles-header">
        <div>
          <h1>Vehicle Management</h1>
          <p>Manage and monitor your fleet vehicles.</p>
        </div>

        <button
          type="button"
          className="add-vehicle-btn"
          onClick={() => {
            if (showForm) {
              resetForm();
            } else {
              setEditingId(null);
              setError("");
              setShowForm(true);
            }
          }}
        >
          {showForm ? "Cancel" : "+ Add Vehicle"}
        </button>
      </div>

      {showForm && (
        <form className="vehicle-form" onSubmit={handleSaveVehicle}>
          <h2>{editingId ? "Edit Vehicle" : "Register New Vehicle"}</h2>

          {error && <p className="form-error">{error}</p>}

          <div className="form-grid">
            <div>
              <label>Registration Number</label>
              <input
                value={registrationNumber}
                onChange={(event) => setRegistrationNumber(event.target.value)}
                placeholder="e.g. GT-1234-26"
                required
              />
            </div>

            <div>
              <label>Vehicle Make / Model</label>
              <input
                value={model}
                onChange={(event) => setModel(event.target.value)}
                placeholder="e.g. Toyota Hilux"
                required
              />
            </div>

            <div>
              <label>Assigned Driver</label>
              <input
                value={driver}
                onChange={(event) => setDriver(event.target.value)}
                placeholder="Enter driver's name"
                required
              />
            </div>

            <div>
              <label>Fuel Capacity (Litres)</label>
              <input
                type="number"
                min="1"
                value={fuelCapacity}
                onChange={(event) => setFuelCapacity(event.target.value)}
                placeholder="e.g. 400"
                required
              />
            </div>

            <div>
              <label>Vehicle Status</label>
              <select
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as VehicleStatus)
                }
              >
                <option value="Available">Available</option>
                <option value="On Trip">On Trip</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="add-vehicle-btn">
              {editingId ? "Update Vehicle" : "Save Vehicle"}
            </button>

            <button type="button" onClick={resetForm}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="vehicle-stats">
        <div className="vehicle-stat-card">
          <h3>Total Vehicles</h3>
          <h2>{totalVehicles}</h2>
        </div>

        <div className="vehicle-stat-card">
          <h3>Available</h3>
          <h2>{availableVehicles}</h2>
        </div>

        <div className="vehicle-stat-card">
          <h3>On Trip</h3>
          <h2>{vehiclesOnTrip}</h2>
        </div>

        <div className="vehicle-stat-card">
          <h3>Maintenance</h3>
          <h2>{vehiclesInMaintenance}</h2>
        </div>
      </div>

      <div className="vehicles-table-container">
        <h2>Registered Vehicles</h2>

        <div className="vehicles-toolbar">
          <input
            type="search"
            placeholder="Search registration, model or driver..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Available">Available</option>
            <option value="On Trip">On Trip</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>

        <table className="vehicles-table">
          <thead>
            <tr>
              <th>Registration</th>
              <th>Vehicle Model</th>
              <th>Driver</th>
              <th>Fuel</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td>{vehicle.registrationNumber}</td>
                  <td>{vehicle.model}</td>
                  <td>{vehicle.driver}</td>
                  <td>
                    {vehicle.currentFuel} / {vehicle.fuelCapacity} L
                  </td>
                  <td>{vehicle.status}</td>
                  <td>
                    <button
  type="button"
  onClick={() => {
    alert("Edit button clicked!");
    handleEditVehicle(vehicle);
  }}
>
  Edit
</button>
                    <button
                      type="button"
                      onClick={() => handleDeleteVehicle(vehicle.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>No matching vehicles found.</td>
              </tr>
            )}
          </tbody>
        </table>

        <p className="vehicle-count">
          Showing {filteredVehicles.length} of {totalVehicles} vehicles
        </p>
      </div>
    </div>
  );
}

export default Vehicles;
