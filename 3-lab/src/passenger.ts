import { generateRandomNumber, stringUnionToArray } from "./utils.ts";
import { Weight } from "./weight.ts";

type PassengerType =
  | "economyClass"
  | "businessClass"
  | "firstClass"
  | "pilot"
  | "stewardess";

type ClientPassengerType = Exclude<PassengerType, "pilot" | "stewardess">;

type AllowedWeight = {
  [t in PassengerType]: number;
};

const ALL_PASSENGER_TYPES = stringUnionToArray<PassengerType>()(
  "economyClass",
  "businessClass",
  "firstClass",
  "pilot",
  "stewardess"
);

const ALLOWED_WEIGHTS: AllowedWeight = {
  economyClass: 20,
  businessClass: 35,
  firstClass: Infinity,
  stewardess: 0,
  pilot: 0,
};

class Lugagge implements Weight {
  _weight: number;
  constructor(weight: number) {
    this._weight = weight;
  }
  weight() {
    return this._weight;
  }
}

class Passenger implements Weight {
  type: PassengerType;
  lugagge: Lugagge | undefined;

  constructor(type: PassengerType) {
    this.type = type;

    if (type === "pilot" || type === "stewardess") {
      this.lugagge = undefined;
    } else {
      this.lugagge = new Lugagge(generateRandomNumber(5, 61));
    }
  }

  weight() {
    return this.lugagge?.weight() || 0;
  }

  canBeBoarded(availableWeight: number): boolean {
    console.log(this.type, "\t", this.weight(), "\t", availableWeight);
    return (
      this.weight() <= ALLOWED_WEIGHTS[this.type] &&
      this.weight() <= availableWeight
    );
  }
}

export { Passenger, ALL_PASSENGER_TYPES };
export type { PassengerType, ClientPassengerType };
