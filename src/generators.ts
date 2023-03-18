import { rnd } from "./ineternal-state";

const weighted = <T>(...weights: [weigth: number, value: () => T][]) => {
  const totalWeight = weights.reduce((acc, [weight]) => acc + weight, 0);
  const rndValue = rnd() * totalWeight;
  let acc = 0;
  for (const [weight, value] of weights) {
    acc += weight;
    if (rndValue < acc) {
      return value();
    }
  }
  throw new Error("Unreachable");
};

const numberBetween = (min: number, max: number) => {
  return weighted(
    [1, () => min],
    [1, () => max],
    [1000, () => min + (max - min) * rnd()]
  );
};

export const char = () => {
  const maxNum = weighted([1, () => 255], [1, () => 65535]);
  const charCode = numberBetween(0, maxNum + 1);
  return String.fromCharCode(charCode);
};

export const string = () => {
  const length = numberBetween(0, Math.pow(2, 10));
  let result = "";
  for (let i = 0; i < length; i++) {
    result += char();
  }
  return result;
};

export const urlparams = (params: Record<string, string>) =>
  new URLSearchParams(params);
