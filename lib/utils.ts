import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPlace(place: string) {
  const comma = place.includes(',');
  const dash = place.includes('-');
  const indexOfComma = place.indexOf(',');
  const indexOfDash = place.indexOf('-');

  let formattedPlace = '';

  if (comma) {
    formattedPlace = place.slice(0, indexOfComma);
  } else if (dash) {
    formattedPlace = place.slice(0, indexOfDash - 1);
  } else {
    formattedPlace = place.slice(0, place.length);
  }

  return formattedPlace;
}
