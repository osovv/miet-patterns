function generateRandomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

type ValueOf<T> = T[keyof T];

type NonEmptyArray<T> = [T, ...T[]];

type MustInclude<T, U extends T[]> = [T] extends [ValueOf<U>] ? U : never;

function stringUnionToArray<T>() {
  return <U extends NonEmptyArray<T>>(...elements: MustInclude<T, U>) =>
    elements;
}

export { generateRandomNumber, stringUnionToArray };
