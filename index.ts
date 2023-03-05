// app.ts
import express from "express";
import { ParkingController } from "./src/controllers/ParkingController";
import { ParkingService } from "./src/services/ParkingService";
import ParkingLotRepository from "./src/repositories/ParkingLotRepository";
import ParkingSpotRepository from "./src/repositories/ParkingSpotRepository";

import { ParkingLot } from "./src/models/ParkingLot";
import { ParkingSpot } from "./src/models/ParkingSpot";
import { CarSize } from "./src/enums/CarSize";

//DB connection needs to be implemented
const parkingLots: ParkingLot[] = [
  {
    id: 1,
    name: "Lot 1",
    location: "Location 1",
    numFloors: 2,
    numSpotsPerFloor: { small: 10, medium: 10, large: 5, extraLarge: 3 },
  },
  {
    id: 2,
    name: "Lot 2",
    location: "Location 2",
    numFloors: 1,
    numSpotsPerFloor: { small: 5, medium: 5, large: 3, extraLarge: 1 },
  },
  {
    id: 3,
    name: "Lot 3",
    location: "Location 3",
    numFloors: 3,
    numSpotsPerFloor: { small: 20, medium: 20, large: 10, extraLarge: 5 },
  },
];

const parkingSpots: ParkingSpot[] = [
  {
    id: 1,
    parkingLotId: 1,
    floor: 1,
    row: 1,
    spotNumber: 1,
    size: CarSize.MEDIUM,
    isOccupied: false,
  },
  {
    id: 2,
    parkingLotId: 1,
    floor: 1,
    row: 1,
    spotNumber: 2,
    size: CarSize.SMALL,
    isOccupied: false,
  },
  {
    id: 3,
    parkingLotId: 1,
    floor: 1,
    row: 1,
    spotNumber: 3,
    size: CarSize.MEDIUM,
    isOccupied: false,
  },
  {
    id: 4,
    parkingLotId: 1,
    floor: 1,
    row: 1,
    spotNumber: 4,
    size: CarSize.MEDIUM,
    isOccupied: false,
  },
  {
    id: 5,
    parkingLotId: 1,
    floor: 1,
    row: 1,
    spotNumber: 5,
    size: CarSize.LARGE,
    isOccupied: true,
  },
  {
    id: 6,
    parkingLotId: 1,
    floor: 1,
    row: 1,
    spotNumber: 6,
    size: CarSize.LARGE,
    isOccupied: false,
  },
  {
    id: 7,
    parkingLotId: 1,
    floor: 1,
    row: 1,
    spotNumber: 7,
    size: CarSize.EXTRA_LARGE,
    isOccupied: false,
  },
  {
    id: 8,
    parkingLotId: 1,
    floor: 1,
    row: 1,
    spotNumber: 8,
    size: CarSize.EXTRA_LARGE,
    isOccupied: false,
  },
  // more spots...
];

// Use the parkingLotRepository instance here

const app = express();
const PORT = 3000;
const cors = require("cors");

app.use(
  cors({
    origin: [
      "https://bt-react-parking-lot.vercel.app",
      "http://localhost:5173",
    ],
  })
);

app.use(express.json());

const parkingLotRepository = new ParkingLotRepository(parkingLots);
const parkingSpotRepository = new ParkingSpotRepository(parkingSpots);

const parkingService = new ParkingService(
  parkingLotRepository,
  parkingSpotRepository
);
const parkingController = new ParkingController(parkingService);

app.get(
  "/parking-lots",
  parkingController.getAllParkingLots.bind(parkingController)
);
app.get(
  "/parking-lots/:parkingLotId",
  parkingController.getParkingLotById.bind(parkingController)
);
app.get(
  "/parking-spots/:size/:parkingLotId",
  parkingController.findAvailableSpot.bind(parkingController)
);
app.put(
  "/parking-spots/:parkingLotId/:spotId",
  parkingController.freeSpot.bind(parkingController)
);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
