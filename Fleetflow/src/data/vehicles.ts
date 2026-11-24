
import type { Vehicle } from "../types/vehicle";

export const initialVehicles: Vehicle[] = [
  {
    id: "1",
    registrationNumber: "GT-4821-24",
    model: "Mercedes-Benz Actros",
    driver: "Kwame Mensah",
    fuelCapacity: 400,
    currentFuel: 312,
    status: "On Trip",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    registrationNumber: "GT-1039-23",
    model: "MAN TGX",
    driver: "Samuel Asare",
    fuelCapacity: 350,
    currentFuel: 224,
    status: "On Trip",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    registrationNumber: "GT-2290-22",
    model: "Toyota Hilux",
    driver: "Michael Owusu",
    fuelCapacity: 80,
    currentFuel: 73,
    status: "Available",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    registrationNumber: "GT-7741-21",
    model: "Volvo FH",
    driver: "Daniel Boateng",
    fuelCapacity: 400,
    currentFuel: 128,
    status: "Maintenance",
    createdAt: new Date().toISOString(),
  },
];
