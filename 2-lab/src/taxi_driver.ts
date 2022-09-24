import { Builder } from "./builder";
import { Driver } from "./driver";
import { ALL_PASSENGER_TYPES, Passenger } from "./passenger";
import { getRandomValue } from "./utils";

class TaxiBuilder extends Builder {
  constructor() {
    super("taxi");
  }

  createDriver(): void {
    this._transport.driver = new Driver("taxi");
  }

  createPassengers(): void {
    this._transport.passengers = Array.from({ length: 4 }, (_, index) => {
      let passengerType = getRandomValue(ALL_PASSENGER_TYPES);

      if (passengerType === undefined) {
        passengerType = "adult";
      }

      return new Passenger(passengerType);
    });
  }
}

export { TaxiBuilder };
