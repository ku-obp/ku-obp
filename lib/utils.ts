import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const makeUpper = (string: string) => {
  if (string === undefined || string === null) {
    return string;
  }
  return string
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("-");
};

export const arrayRange = (start: number, stop: number, step: number = 1) =>
    Array.from(
        { length: (stop - start) / step + 1 },
        (value, index) => start + index * step
);

export function getSingleString(gn: string | string[]) {
  if(typeof gn === "string") {
    return gn
  } else {
    return gn[0]
  }
}

export function divmod(x: number, y: number) {
  return {
      quotient: Math.floor(y/x),
      remainder: y % x
  }
}