import { Size } from "./size.ts";
import { Weight } from "./weight.ts";

class PlaneComposite implements Weight, Size {
  private parts: Array<Weight>;

  constructor() {
    this.parts = [];
  }

  add(weight: Weight) {
    this.parts.push(weight);
  }

  weight() {
    return this.parts.reduce((acc, next) => acc + next.weight(), 0);
  }

  size() {
    return this.parts.length;
  }
}

export { PlaneComposite };
