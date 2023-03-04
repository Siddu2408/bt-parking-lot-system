import { CarSize } from "../enums/CarSize";
import { ParkingLot } from "../models/ParkingLot";
import { ParkingSpot } from "../models/ParkingSpot";
import ParkingLotRepository from "../repositories/ParkingLotRepository";
import ParkingSpotRepository from "../repositories/ParkingSpotRepository";

export class ParkingService {
  private parkingLotRepository: ParkingLotRepository;
  private parkingSpotRepository: ParkingSpotRepository;

  constructor(
    parkingLotRepository: ParkingLotRepository,
    parkingSpotRepository: ParkingSpotRepository
  ) {
    this.parkingLotRepository = parkingLotRepository;
    this.parkingSpotRepository = parkingSpotRepository;
  }

  async getAllParkingLots(): Promise<ParkingLot[]> {
    return this.parkingLotRepository.getAll();
  }

  async getParkingLotById(parkingLotId: number): Promise<ParkingLot | null> {
    return this.parkingLotRepository.getById(parkingLotId);
  }

  async findAvailableSpot(
    size: CarSize,
    parkingLotId: number
  ): Promise<ParkingSpot | null> {
    const parkingLot = await this.parkingLotRepository.getById(parkingLotId);
    if (!parkingLot) {
      throw new Error("Parking lot not found");
    }

    const parkingSpots = await this.parkingSpotRepository.getByParkingLotId(
      parkingLotId
    );

    let availableSpot: ParkingSpot | null = null;

    if (size === CarSize.SMALL) {
      availableSpot =
        parkingSpots.find(
          (spot) => spot.size === CarSize.SMALL && !spot.isOccupied
        ) ||
        parkingSpots.find(
          (spot) => spot.size === CarSize.MEDIUM && !spot.isOccupied
        ) ||
        parkingSpots.find(
          (spot) => spot.size === CarSize.LARGE && !spot.isOccupied
        ) ||
        parkingSpots.find(
          (spot) => spot.size === CarSize.EXTRA_LARGE && !spot.isOccupied
        );
    } else if (size === CarSize.MEDIUM) {
      availableSpot =
        parkingSpots.find(
          (spot) => spot.size === CarSize.MEDIUM && !spot.isOccupied
        ) ||
        parkingSpots.find(
          (spot) => spot.size === CarSize.LARGE && !spot.isOccupied
        ) ||
        parkingSpots.find(
          (spot) => spot.size === CarSize.EXTRA_LARGE && !spot.isOccupied
        );
    } else if (size === "large") {
      availableSpot =
        parkingSpots.find(
          (spot) => spot.size === CarSize.LARGE && !spot.isOccupied
        ) ||
        parkingSpots.find(
          (spot) => spot.size === CarSize.EXTRA_LARGE && !spot.isOccupied
        );
    } else if (size === CarSize.EXTRA_LARGE) {
      availableSpot = parkingSpots.find(
        (spot) => spot.size === CarSize.EXTRA_LARGE && !spot.isOccupied
      );
    }

    if (availableSpot) {
      availableSpot.isOccupied = true;
      await this.parkingSpotRepository.update(parkingLotId, availableSpot);
      return availableSpot;
    }

    console.log("NO SLOT FOUND");
    return null;
  }

  async freeSpot(
    parkingLotId: number,
    spotId: number
  ): Promise<ParkingSpot | null> {
    const parkingSpot = await this.parkingSpotRepository.getById(spotId);
    if (!parkingSpot) {
      throw new Error("Parking spot not found");
    }

    parkingSpot.isOccupied = false;
    await this.parkingSpotRepository.update(parkingLotId, parkingSpot);

    return parkingSpot;
  }
}
