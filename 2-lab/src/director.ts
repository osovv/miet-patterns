import { Builder } from "./builder";
import { Transport } from "./transport";

class Director {
  createTransport(builder: Builder): Transport {
    builder.reset();
    builder.createDriver();
    builder.createPassengers();

    return builder.transport();
  }
}

export { Director };
