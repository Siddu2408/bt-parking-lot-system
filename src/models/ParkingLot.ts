export interface ParkingLot {
  id: number;
  name: string;
  location: string;
  numFloors: number;
  numSpotsPerFloor: {
    small: number;
    medium: number;
    large: number;
    extraLarge: number;
  };
}
