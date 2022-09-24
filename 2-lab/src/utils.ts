function getRandomValue<T>(arr: Array<T>): T | undefined {
  return arr[Math.floor(Math.random() * arr.length)];
}

type ValueOf<T> = T[keyof T];

type NonEmptyArray<T> = [T, ...T[]];

type MustInclude<T, U extends T[]> = [T] extends [ValueOf<U>] ? U : never;

function stringUnionToArray<T>() {
  return <U extends NonEmptyArray<T>>(...elements: MustInclude<T, U>) =>
    elements;
}

export { getRandomValue, stringUnionToArray };
