import { create } from 'zustand';

type PlaceSheetData = {
  formatted_address?: string;
  name?: string;
  geometry?: {
    location: {
      lat: number;
      lng: number;
    };
    viewport: {
      northeast: {
        lat: number;
        lng: number;
      };
      southwest: {
        lat: number;
        lng: number;
      };
    };
  };
  opening_hours?: {
    open_now: boolean;
    periods: {
      close: {
        day: number;
        time: string;
      };
      open: {
        day: number;
        time: string;
      };
    }[];
    weekday_text: string[];
  };
  photos?: {
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
  }[];
  rating?: number;
  reviews?: google.maps.places.PlaceReview[];
  types?: string[];
  url?: string;
  user_ratings_total?: number;
  website?: string;
  description: string;
};

type PlaceSheetStore = {
  open: boolean;
  data: PlaceSheetData | null;
  openSheet: (data: PlaceSheetData) => void;
  closeSheet: () => void;
};

export const usePlaceSheetStore = create<PlaceSheetStore>((set) => ({
  open: false,
  data: null,
  openSheet: (data: PlaceSheetData) =>
    set({
      open: true,
      data,
    }),
  closeSheet: () =>
    set({
      open: false,
      data: null,
    }),
}));
