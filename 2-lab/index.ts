import { BusBuilder } from "./src/bus_builder";
import { Director } from "./src/director";
import { TaxiBuilder } from "./src/taxi_driver";

function main() {
  const director = new Director();
  const busBuilder = new BusBuilder();
  const taxiBuilder = new TaxiBuilder();

  const bus = director.createTransport(busBuilder);
  const taxi = director.createTransport(taxiBuilder);

  console.log("===============");
  console.log("Bus");
  console.log(bus);
  console.log("Bus can depart?", bus.canDepart());
  console.log("===============");
  console.log("Taxi");
  console.log(taxi);
  console.log("Taxi can depart?", taxi.canDepart());
  console.log("===============");
}

main();
