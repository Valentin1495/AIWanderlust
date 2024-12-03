import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type Itinerary = {
  date: string;
  course: {
    location: string;
    activity: string;
    formatted_address?: string;
    name?: string;
    geometry?: google.maps.places.PlaceGeometry;
    icon?: string;
    opening_hours?: google.maps.places.PlaceOpeningHours;
    photos?: google.maps.places.PlacePhoto[];
    place_id?: string;
    rating?: number;
    reviews?: google.maps.places.PlaceReview[];
    types?: string[];
    url?: string;
    user_ratings_total?: number;
    website?: string;
  }[];
}[];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPlace(place: string) {
  const comma = place.includes(',');
  const indexOfComma = place.indexOf(',');

  let formattedPlace = '';

  if (comma) {
    formattedPlace = place.slice(0, indexOfComma);
  } else {
    formattedPlace = place.slice(0, place.length);
  }

  return formattedPlace;
}

const fetchPlaceId = async (placeName: string): Promise<string> => {
  const searchUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
    placeName
  )}&inputtype=textquery&fields=place_id&key=${
    process.env.NEXT_PUBLIC_GOOGLE_API_KEY
  }`;

  const response = await fetch(searchUrl);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  if (data.candidates && data.candidates.length > 0) {
    return data.candidates[0].place_id; // 첫 번째 후보의 place_id 반환
  } else {
    throw new Error(`No place found for "${placeName}"`);
  }
};

export const fetchPlaceDetails = async (placeId: string) => {
  const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,geometry,rating,user_ratings_total,reviews,photos,website,url,types&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;

  const response = await fetch(detailsUrl);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();

  return data;
};

export const addPlaceDetailsToItinerary = async (itinerary: Itinerary) => {
  for (const date of itinerary) {
    for (const course of date.course) {
      try {
        const placeId = await fetchPlaceId(course.location);
        const placeDetails = await fetchPlaceDetails(placeId);

        // 사진 URL 및 기타 세부정보 추가
        if (placeDetails.result) {
          const {
            formatted_address,
            geometry,
            name,
            photos,
            rating,
            reviews,
            types,
            url,
            user_ratings_total,
            website,
            opening_hours,
          } = placeDetails.result;
          course['photos'] = photos;
          course['formatted_address'] = formatted_address;
          course['rating'] = rating;
          course['geometry'] = geometry;
          course['name'] = name;
          course['opening_hours'] = opening_hours;
          course['place_id'] = placeId;
          course['reviews'] = reviews;
          course['types'] = types;
          course['url'] = url;
          course['website'] = website;
          course['user_ratings_total'] = user_ratings_total;
        } else {
          console.warn(`No details found for ${course.location}`);
        }
      } catch (error) {
        console.error(`Error fetching details for ${course.location}:`, error);
      }
    }
  }

  return itinerary;
};

export const getImgSrc = (photo_reference: string) =>
  `https://maps.googleapis.com/maps/api/place/photo?maxwidth=540&photo_reference=${photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;

export const formatNumber = (num?: number) => {
  if (!num) return null;

  return new Intl.NumberFormat().format(num);
};

export const formatType = (str?: string) => {
  if (!str) return null;

  return str.replace(/_/g, ' ');
};

export const translateDays = (input: string) => {
  const days: Record<string, string> = {
    Monday: '월요일',
    Tuesday: '화요일',
    Wednesday: '수요일',
    Thursday: '목요일',
    Friday: '금요일',
    Saturday: '토요일',
    Sunday: '일요일',
  };

  return input.replace(
    /\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b/g,
    (match) => days[match]
  );
};
