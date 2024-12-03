'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Clock } from 'lucide-react';
import Image from 'next/image';
import StarRatings from 'react-star-ratings';
import PopUp from './pop-up';
import { usePlaceSheetStore } from '@/hooks/use-place-details-store';
import {
  formatNumber,
  formatType,
  getImgSrc,
  translateDays,
} from '@/lib/utils';

type ItineraryAccordionProps = {
  itinerary: {
    date: string;
    course: {
      location: string;
      activity: string;
      description: string;
      place_id: string;
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
    }[];
  }[];
};

export default function ItineraryAccordion({
  itinerary,
}: ItineraryAccordionProps) {
  const { openSheet } = usePlaceSheetStore();

  return (
    <div className='mt-6 w-full'>
      <Accordion type='multiple' className='w-1/2 mx-auto min-w-[500px]'>
        {itinerary.map(({ date, course }, idx) => (
          <AccordionItem value={date} key={idx}>
            <AccordionTrigger className='text-xl font-semibold'>
              {date}
            </AccordionTrigger>
            <AccordionContent>
              {course.map(
                (
                  {
                    place_id,
                    activity,
                    location,
                    photos,
                    user_ratings_total,
                    rating,
                    types,
                    opening_hours,
                    formatted_address,
                    url,
                    website,
                    reviews,
                    name,
                    description,
                  },
                  idx
                ) => (
                  <div key={place_id}>
                    <div
                      className='rounded-md border border-gray-300 p-3 flex gap-3 cursor-pointer transition shadow-md hover:shadow-xl'
                      onClick={() =>
                        openSheet({
                          photos,
                          user_ratings_total,
                          rating,
                          types,
                          opening_hours,
                          reviews,
                          url,
                          website,
                          formatted_address,
                          name,
                          description,
                        })
                      }
                    >
                      {photos && (
                        <Image
                          src={getImgSrc(photos[0].photo_reference)}
                          alt={location}
                          width={120}
                          height={120}
                          className='object-cover aspect-square rounded-md'
                        />
                      )}
                      <div>
                        <h3 className='text-lg font-medium'>
                          {location} - {activity}
                        </h3>
                        {rating && (
                          <div className='space-x-2 flex'>
                            <span className='text-sm mt-0.5'>{rating}</span>

                            <div>
                              <StarRatings
                                rating={rating}
                                starRatedColor='#ffd500'
                                starDimension='16px'
                                starSpacing='2px'
                              />
                            </div>

                            <span className='text-sm mt-0.5'>
                              ({formatNumber(user_ratings_total)})
                            </span>
                          </div>
                        )}
                        <section className='my-2'>
                          {types &&
                            types.length &&
                            (types.length < 3
                              ? types.map((el, idx) => (
                                  <span key={idx}>
                                    {formatType(el) +
                                      `${idx < types.length - 1 ? ' & ' : ''}`}
                                  </span>
                                ))
                              : types
                                  .slice(0, 3)
                                  .map((el, idx) => (
                                    <span key={idx}>
                                      {formatType(el) +
                                        `${idx < 2 ? ' & ' : ''}`}
                                    </span>
                                  )))}
                        </section>
                        <PopUp
                          trigger={
                            <div className='flex items-center gap-1'>
                              <Clock
                                className='text-gray-500'
                                size={18}
                                strokeWidth={2.5}
                              />
                              {opening_hours?.open_now ? (
                                <span className='text-green-500 text-xs underline'>
                                  영업 중
                                </span>
                              ) : (
                                <span className='text-red-500 text-xs underline'>
                                  영업 종료
                                </span>
                              )}
                            </div>
                          }
                        >
                          {opening_hours ? (
                            <section className='space-y-1'>
                              {opening_hours.weekday_text.map((el, idx) => (
                                <p key={idx}>{translateDays(el)}</p>
                              ))}
                            </section>
                          ) : (
                            <p>영업 시간 미제공</p>
                          )}
                        </PopUp>
                      </div>
                    </div>
                    {idx < 2 && (
                      <div className='bg-gray-300 h-10 w-0.5 ml-16' />
                    )}
                  </div>
                )
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
