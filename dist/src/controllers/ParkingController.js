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
exports.ParkingController = void 0;
class ParkingController {
    constructor(parkingService) {
        this.parkingService = parkingService;
    }
    getAllParkingLots(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parkingLots = yield this.parkingService.getAllParkingLots();
                res.status(200).json(parkingLots);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    getParkingLotById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { parkingLotId } = req.params;
            try {
                const parkingLot = yield this.parkingService.getParkingLotById(Number(parkingLotId));
                if (parkingLot) {
                    res.status(200).json(parkingLot);
                }
                else {
                    res.status(404).json({ message: "Parking lot not found" });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    findAvailableSpot(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { size, parkingLotId } = req.params;
            try {
                const parkingSpot = yield this.parkingService.findAvailableSpot(size, Number(parkingLotId));
                if (parkingSpot) {
                    res.status(200).json(parkingSpot);
                }
                else {
                    res.status(404).json({ message: "No available spots found" });
                }
            }
            catch (error) {
                console.error(error);
                res.status(400).json({ error: "Invalid parking lot ID" });
            }
        });
    }
    freeSpot(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { spotId, parkingLotId } = req.params;
            try {
                const parkingSpot = yield this.parkingService.freeSpot(Number(parkingLotId), Number(spotId));
                if (parkingSpot) {
                    res.json(parkingSpot);
                }
                else {
                    res.status(404).json({ message: "Parking spot not found" });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
}
exports.ParkingController = ParkingController;
//# sourceMappingURL=ParkingController.js.map