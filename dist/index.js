"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.ts
const express_1 = __importDefault(require("express"));
const ParkingController_1 = require("./src/controllers/ParkingController");
const ParkingService_1 = require("./src/services/ParkingService");
const ParkingLotRepository_1 = __importDefault(require("./src/repositories/ParkingLotRepository"));
const ParkingSpotRepository_1 = __importDefault(require("./src/repositories/ParkingSpotRepository"));
const CarSize_1 = require("./src/enums/CarSize");
//DB connection needs to be implemented
const parkingLots = [
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
const parkingSpots = [
    {
        id: 1,
        parkingLotId: 1,
        floor: 1,
        row: 1,
        spotNumber: 1,
        size: CarSize_1.CarSize.MEDIUM,
        isOccupied: false,
    },
    {
        id: 2,
        parkingLotId: 1,
        floor: 1,
        row: 1,
        spotNumber: 2,
        size: CarSize_1.CarSize.SMALL,
        isOccupied: false,
    },
    {
        id: 3,
        parkingLotId: 1,
        floor: 1,
        row: 1,
        spotNumber: 3,
        size: CarSize_1.CarSize.MEDIUM,
        isOccupied: false,
    },
    {
        id: 4,
        parkingLotId: 1,
        floor: 1,
        row: 1,
        spotNumber: 4,
        size: CarSize_1.CarSize.MEDIUM,
        isOccupied: false,
    },
    {
        id: 5,
        parkingLotId: 1,
        floor: 1,
        row: 1,
        spotNumber: 5,
        size: CarSize_1.CarSize.LARGE,
        isOccupied: true,
    },
    {
        id: 6,
        parkingLotId: 1,
        floor: 1,
        row: 1,
        spotNumber: 6,
        size: CarSize_1.CarSize.LARGE,
        isOccupied: false,
    },
    {
        id: 7,
        parkingLotId: 1,
        floor: 1,
        row: 1,
        spotNumber: 7,
        size: CarSize_1.CarSize.EXTRA_LARGE,
        isOccupied: false,
    },
    {
        id: 8,
        parkingLotId: 1,
        floor: 1,
        row: 1,
        spotNumber: 8,
        size: CarSize_1.CarSize.EXTRA_LARGE,
        isOccupied: false,
    },
    // more spots...
];
// Use the parkingLotRepository instance here
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
const parkingLotRepository = new ParkingLotRepository_1.default(parkingLots);
const parkingSpotRepository = new ParkingSpotRepository_1.default(parkingSpots);
const parkingService = new ParkingService_1.ParkingService(parkingLotRepository, parkingSpotRepository);
const parkingController = new ParkingController_1.ParkingController(parkingService);
app.get("/parking-lots", parkingController.getAllParkingLots.bind(parkingController));
app.get("/parking-lots/:parkingLotId", parkingController.getParkingLotById.bind(parkingController));
app.get("/parking-spots/:size/:parkingLotId", parkingController.findAvailableSpot.bind(parkingController));
app.put("/parking-spots/:parkingLotId/:spotId", parkingController.freeSpot.bind(parkingController));
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
//# sourceMappingURL=index.js.map