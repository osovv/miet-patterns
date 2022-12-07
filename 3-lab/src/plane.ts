import { PlaneComposite } from "./composite.ts";
import { Passenger, PassengerType } from "./passenger.ts";
import { generateRandomNumber } from "./utils.ts";

const PASSENGER_LIMITS: { [t in PassengerType]: number } = {
  pilot: 2,
  stewardess: 6,
  firstClass: 10,
  businessClass: 20,
  economyClass: 150,
};

type PassengersTable = {
  [t in PassengerType]: PlaneComposite;
};

class Plane extends PlaneComposite {
  private pilots: PlaneComposite;
  private stewardesses: PlaneComposite;
  private firstClass: PlaneComposite;
  private businessClass: PlaneComposite;
  private economyClass: PlaneComposite;
  private maxWeight: number;
  private passengerTable: PassengersTable;

  constructor(maxWeight: number, fill = true) {
    super();
    this.pilots = new PlaneComposite();
    this.stewardesses = new PlaneComposite();
    this.firstClass = new PlaneComposite();
    this.businessClass = new PlaneComposite();
    this.economyClass = new PlaneComposite();
    this.maxWeight = maxWeight;

    this.passengerTable = {
      pilot: this.pilots,
      stewardess: this.stewardesses,
      firstClass: this.firstClass,
      businessClass: this.businessClass,
      economyClass: this.economyClass,
    };

    this.add(this.pilots);
    this.add(this.stewardesses);
    this.add(this.firstClass);
    this.add(this.businessClass);
    this.add(this.economyClass);

    if (fill) {
      for (let i = 0; i < 2; i++) {
        this.board(new Passenger("pilot"));
      }
      for (let i = 0; i < 6; i++) {
        this.board(new Passenger("stewardess"));
      }

      for (let i = 0; i < generateRandomNumber(3, 10); i++) {
        this.board(new Passenger("firstClass"));
      }

      for (let i = 0; i < generateRandomNumber(10, 20); i++) {
        this.board(new Passenger("businessClass"));
      }

      for (let i = 0; i < generateRandomNumber(80, 150); i++) {
        this.board(new Passenger("economyClass"));
      }
    }
  }

  board(passenger: Passenger): boolean {
    const canBeBoarded = this.canBeBoarded(passenger);

    if (canBeBoarded) {
      switch (passenger.type) {
        case "firstClass":
          this.firstClass.add(passenger);
          break;
        case "businessClass":
          this.businessClass.add(passenger);
          break;
        case "economyClass":
          this.economyClass.add(passenger);
          break;
        case "pilot":
        case "stewardess":
          break;
      }
      return true;
    } else {
      return false;
    }
  }

  private canBeBoarded(passenger: Passenger): boolean {
    return (
      this.canBeBoardedByRemainingSeats(passenger) &&
      this.canBeBoardedByWeight(passenger)
    );
  }

  private canBeBoardedByWeight(passenger: Passenger): boolean {
    return passenger.canBeBoarded(this.availableWeight());
  }

  private canBeBoardedByRemainingSeats(passenger: Passenger): boolean {
    const klass = this.passengerTable[passenger.type];

    const availableSeats = PASSENGER_LIMITS[passenger.type] - klass.size();

    return availableSeats > 0;
  }

  public availableWeight() {
    return this.maxWeight - this.weight();
  }
}

export { Plane };
