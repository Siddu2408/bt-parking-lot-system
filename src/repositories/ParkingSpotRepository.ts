import { ParkingSpot } from "../models/ParkingSpot";

export default class ParkingSpotRepository {
  private parkingSpots: ParkingSpot[];

  constructor(parkingSpots: ParkingSpot[]) {
    this.parkingSpots = parkingSpots;
  }

  async getByParkingLotId(parkingLotId: number): Promise<ParkingSpot[]> {
    return this.parkingSpots.filter(
      (parkingSpot) => parkingSpot.parkingLotId === parkingLotId
    );
  }

  async getById(spotId: number): Promise<ParkingSpot | null> {
    return (
      this.parkingSpots.find((parkingSpot) => parkingSpot.id === spotId) || null
    );
  }

  async update(parkingLotId: number, parkingSpot: ParkingSpot): Promise<void> {
    const index = this.parkingSpots.findIndex(
      (spot) => spot.id === parkingSpot.id && spot.parkingLotId === parkingLotId
    );
    if (index >= 0) {
      this.parkingSpots[index] = parkingSpot;
    }
  }
}
