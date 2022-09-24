import { Builder } from "./builder";
import { Driver } from "./driver";
import { ALL_PASSENGER_TYPES, Passenger } from "./passenger";
import { getRandomValue } from "./utils";

class BusBuilder extends Builder {
  constructor() {
    super("bus");
  }

  createDriver(): void {
    this._transport.driver = new Driver("bus");
  }

  createPassengers(): void {
    this._transport.passengers = Array.from({ length: 30 }, (_, _a) => {
      let passengerType = getRandomValue(ALL_PASSENGER_TYPES);

      if (passengerType === undefined) {
        passengerType = "adult";
      }

      return new Passenger(passengerType);
    });
  }
}

export { BusBuilder };
