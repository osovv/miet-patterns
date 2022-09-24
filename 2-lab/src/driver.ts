type DriverType = "bus" | "taxi";

class Driver {
  private type: DriverType;
  constructor(type: DriverType) {
    this.type = type;
  }

  toString() {
    return `Driver. Type: ${this.type}`;
  }
}

export { Driver, DriverType };
