"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingService = void 0;
const CarSize_1 = require("../enums/CarSize");
class ParkingService {
    constructor(parkingLotRepository, parkingSpotRepository) {
        this.parkingLotRepository = parkingLotRepository;
        this.parkingSpotRepository = parkingSpotRepository;
    }
    getAllParkingLots() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.parkingLotRepository.getAll();
        });
    }
    getParkingLotById(parkingLotId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.parkingLotRepository.getById(parkingLotId);
        });
    }
    findAvailableSpot(size, parkingLotId) {
        return __awaiter(this, void 0, void 0, function* () {
            const parkingLot = yield this.parkingLotRepository.getById(parkingLotId);
            if (!parkingLot) {
                throw new Error("Parking lot not found");
            }
            const parkingSpots = yield this.parkingSpotRepository.getByParkingLotId(parkingLotId);
            let availableSpot = null;
            if (size === CarSize_1.CarSize.SMALL) {
                availableSpot =
                    parkingSpots.find((spot) => spot.size === CarSize_1.CarSize.SMALL && !spot.isOccupied) ||
                        parkingSpots.find((spot) => spot.size === CarSize_1.CarSize.MEDIUM && !spot.isOccupied) ||
                        parkingSpots.find((spot) => spot.size === CarSize_1.CarSize.LARGE && !spot.isOccupied) ||
                        parkingSpots.find((spot) => spot.size === CarSize_1.CarSize.EXTRA_LARGE && !spot.isOccupied);
            }
            else if (size === CarSize_1.CarSize.MEDIUM) {
                availableSpot =
                    parkingSpots.find((spot) => spot.size === CarSize_1.CarSize.MEDIUM && !spot.isOccupied) ||
                        parkingSpots.find((spot) => spot.size === CarSize_1.CarSize.LARGE && !spot.isOccupied) ||
                        parkingSpots.find((spot) => spot.size === CarSize_1.CarSize.EXTRA_LARGE && !spot.isOccupied);
            }
            else if (size === "large") {
                availableSpot =
                    parkingSpots.find((spot) => spot.size === CarSize_1.CarSize.LARGE && !spot.isOccupied) ||
                        parkingSpots.find((spot) => spot.size === CarSize_1.CarSize.EXTRA_LARGE && !spot.isOccupied);
            }
            else if (size === CarSize_1.CarSize.EXTRA_LARGE) {
                availableSpot = parkingSpots.find((spot) => spot.size === CarSize_1.CarSize.EXTRA_LARGE && !spot.isOccupied);
            }
            if (availableSpot) {
                availableSpot.isOccupied = true;
                yield this.parkingSpotRepository.update(availableSpot);
                return availableSpot;
            }
            console.log("NO SLOT FOUND");
            return null;
        });
    }
    freeSpot(spotId) {
        return __awaiter(this, void 0, void 0, function* () {
            const parkingSpot = yield this.parkingSpotRepository.getById(spotId);
            if (!parkingSpot) {
                throw new Error("Parking spot not found");
            }
            parkingSpot.isOccupied = false;
            yield this.parkingSpotRepository.update(parkingSpot);
            return parkingSpot;
        });
    }
}
exports.ParkingService = ParkingService;
//# sourceMappingURL=ParkingService.js.map