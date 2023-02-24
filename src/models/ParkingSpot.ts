import { CarSize } from "../enums/CarSize";

export interface ParkingSpot {
  id: number;
  parkingLotId: number;
  floor: number;
  row: number;
  spotNumber: number;
  size: CarSize;
  isOccupied: boolean;
}
