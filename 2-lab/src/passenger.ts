import { stringUnionToArray } from "./utils";

type PassengerType = "adult" | "child" | "discount";

const ALL_PASSENGER_TYPES = stringUnionToArray<PassengerType>()(
  "adult",
  "child",
  "discount"
);

class Passenger {
  private type: PassengerType;

  constructor(type: PassengerType) {
    this.type = type;
  }

  toString() {
    return `Passenger. Type: ${this.type}`;
  }
}

export { Passenger, PassengerType, ALL_PASSENGER_TYPES };
