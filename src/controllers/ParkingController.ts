import { Request, Response } from "express";
import { CarSize } from "../enums/CarSize";
import { ParkingService } from "../services/ParkingService";

export class ParkingController {
  private parkingService: ParkingService;

  constructor(parkingService: ParkingService) {
    this.parkingService = parkingService;
  }

  async getAllParkingLots(req: Request, res: Response): Promise<void> {
    try {
      const parkingLots = await this.parkingService.getAllParkingLots();
      res.json(parkingLots);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getParkingLotById(req: Request, res: Response): Promise<void> {
    const { parkingLotId } = req.params;

    try {
      const parkingLot = await this.parkingService.getParkingLotById(
        Number(parkingLotId)
      );
      if (parkingLot) {
        res.json(parkingLot);
      } else {
        res.status(404).json({ message: "Parking lot not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async findAvailableSpot(req: Request, res: Response): Promise<void> {
    const { size, parkingLotId } = req.params;

    try {
      const parkingSpot = await this.parkingService.findAvailableSpot(
        size as CarSize,
        Number(parkingLotId)
      );
      if (parkingSpot) {
        res.json(parkingSpot);
      } else {
        res.status(404).json({ message: "No available spots found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async freeSpot(req: Request, res: Response): Promise<void> {
    const { spotId } = req.params;

    try {
      const parkingSpot = await this.parkingService.freeSpot(Number(spotId));
      if (parkingSpot) {
        res.json(parkingSpot);
      } else {
        res.status(404).json({ message: "Parking spot not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
