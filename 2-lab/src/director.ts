import { Builder } from "./builder.ts";
import { Transport } from "./transport.ts";

class Director {
  createTransport(builder: Builder): Transport {
    builder.reset();
    builder.createDriver();
    builder.createPassengers();

    return builder.transport();
  }
}

export { Director };
