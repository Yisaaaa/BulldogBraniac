import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
