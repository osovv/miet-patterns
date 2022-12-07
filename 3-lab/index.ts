import { Plane } from "./src/plane.ts";

function main() {
  const plane = new Plane(1000);
  console.log(plane.availableWeight());
}

main();
