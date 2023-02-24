import { ParkingLot } from "../models/ParkingLot";

export default class ParkingLotRepository {
  private parkingLots: ParkingLot[];

  constructor(parkingLots: ParkingLot[]) {
    this.parkingLots = parkingLots;
  }

  async getAll(): Promise<ParkingLot[]> {
    return this.parkingLots;
  }

  async getById(parkingLotId: number): Promise<ParkingLot | null> {
    return (
      this.parkingLots.find((parkingLot) => parkingLot.id === parkingLotId) ||
      null
    );
  }
}
