
export type VehicleStatus =
  | "Available"
  | "On Trip"
  | "Maintenance";

export interface Vehicle {
  id: string;
  registrationNumber: string;
  model: string;
  driver: string;
  fuelCapacity: number;
  currentFuel: number;
  status: VehicleStatus;
  createdAt: string;
}
