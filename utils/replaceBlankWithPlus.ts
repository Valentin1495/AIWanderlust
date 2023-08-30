const replaceBlankWithPlus = (place: string) => {
  const placeWithPlus = place.split(' ').join('+');

  return placeWithPlus;
};

export default replaceBlankWithPlus;
