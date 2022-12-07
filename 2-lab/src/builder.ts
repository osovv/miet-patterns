import { Transport, TransportType } from "./transport.ts";

abstract class Builder {
  protected _transport: Transport;
  private transportType: TransportType;
  constructor(type: TransportType) {
    this.transportType = type;
    this._transport = new Transport(type);
  }
  public createDriver(): void {}
  public createPassengers(): void {}
  public transport(): Transport {
    return this._transport;
  }
  public reset() {
    this._transport = new Transport(this.transportType);
  }
}

export { Builder };
