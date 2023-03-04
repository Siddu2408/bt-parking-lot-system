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
class ParkingSpotRepository {
    constructor(parkingSpots) {
        this.parkingSpots = parkingSpots;
    }
    getByParkingLotId(parkingLotId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.parkingSpots.filter((parkingSpot) => parkingSpot.parkingLotId === parkingLotId);
        });
    }
    getById(spotId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (this.parkingSpots.find((parkingSpot) => parkingSpot.id === spotId) || null);
        });
    }
    update(parkingLotId, parkingSpot) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.parkingSpots.findIndex((spot) => spot.id === parkingSpot.id && spot.parkingLotId === parkingLotId);
            if (index >= 0) {
                this.parkingSpots[index] = parkingSpot;
            }
        });
    }
}
exports.default = ParkingSpotRepository;
//# sourceMappingURL=ParkingSpotRepository.js.map