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
      res.status(200).json(parkingLots);
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
        res.status(200).json(parkingLot);
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
        res.status(200).json(parkingSpot);
      } else {
        res.status(404).json({ message: "No available spots found" });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Invalid parking lot ID" });
    }
  }

  async freeSpot(req: Request, res: Response): Promise<void> {
    const { spotId, parkingLotId } = req.params;

    try {
      const parkingSpot = await this.parkingService.freeSpot(
        Number(parkingLotId),
        Number(spotId)
      );
      if (parkingSpot) {
        res.status(200).json({ message: "Parking spot freed successfully" });
      } else {
        res.status(404).json({ message: "Parking spot not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
