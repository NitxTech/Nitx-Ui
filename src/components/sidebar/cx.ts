import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Local copy of the app's `cn` so `core/` has no `@/` imports.
export const cx = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
