import { Driver } from "./driver.ts";
import { Passenger } from "./passenger.ts";

type TransportType = "bus" | "taxi";

class Transport {
  passengers: Array<Passenger>;
  driver: Driver | undefined;
  type: TransportType;

  constructor(type: TransportType) {
    this.passengers = [];
    this.driver = undefined;
    this.type = type;
  }

  toString() {
    const prefix = `Transport. Type: ${this.type}.\nWith driver: ${this.driver}\n With ${this.passengers.length} passengers\n`;
    const passengersInfo = this.passengers
      .map((passenger, index) => {
        return `Passenger #${index + 1}. Info: ${passenger} `;
      })
      .join("\n");

    return prefix + passengersInfo;
  }

  canDepart(): boolean {
    return this.driver !== undefined && this.passengers.length > 0;
  }
}

export { Transport, TransportType };
