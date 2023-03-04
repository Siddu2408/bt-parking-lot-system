// ParkingController.test.ts

import { ParkingController } from "../src/controllers/ParkingController";
import { ParkingService } from "../src/services/ParkingService";
import ParkingLotRepository from "../src/repositories/ParkingLotRepository";
import ParkingSpotRepository from "../src/repositories/ParkingSpotRepository";
import { CarSize } from "../src/enums/CarSize";

const parkingLots = [
  {
    id: 1,
    name: "Lot 1",
    location: "Location 1",
    numFloors: 2,
    numSpotsPerFloor: { small: 10, medium: 10, large: 5, extraLarge: 3 },
  },
];

const parkingSpots = [
  {
    id: 1,
    parkingLotId: 1,
    floor: 1,
    row: 1,
    spotNumber: 1,
    size: "medium" as CarSize,
    isOccupied: false,
  },
  {
    id: 2,
    parkingLotId: 1,
    floor: 1,
    row: 1,
    spotNumber: 2,
    size: "small" as CarSize,
    isOccupied: false,
  },
];

describe("ParkingController", () => {
  let parkingController;

  beforeEach(() => {
    const parkingLotRepository = new ParkingLotRepository(parkingLots);
    const parkingSpotRepository = new ParkingSpotRepository(parkingSpots);

    const parkingService = new ParkingService(
      parkingLotRepository,
      parkingSpotRepository
    );
    parkingController = new ParkingController(parkingService);
  });

  describe("findAvailableSpot", () => {
    it("should return a list of available parking spots", async () => {
      const req = {
        params: {
          size: "medium",
          parkingLotId: "1",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await parkingController.findAvailableSpot(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        parkingLotId: 1,
        floor: 1,
        row: 1,
        spotNumber: 1,
        size: "medium",
        isOccupied: true,
      });
    });
  });

  describe("findAvailableParkingLot", () => {
    it("should return a list of available parking lots", async () => {
      const req = {
        params: {},
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await parkingController.getAllParkingLots(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        {
          id: 1,
          name: "Lot 1",
          location: "Location 1",
          numFloors: 2,
          numSpotsPerFloor: { small: 10, medium: 10, large: 5, extraLarge: 3 },
        },
      ]);
    });
  });

  describe("findAvailableParkingBytheParkingLotId", () => {
    it("should return a list of available parking lots queried by the parking laot ids", async () => {
      const req = {
        params: {
          parkingLotId: 1,
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await parkingController.getParkingLotById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        location: "Location 1",
        name: "Lot 1",
        numFloors: 2,
        numSpotsPerFloor: {
          extraLarge: 3,
          large: 5,
          medium: 10,
          small: 10,
        },
      });
    });
  });
});
