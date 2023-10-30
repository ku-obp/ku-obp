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
