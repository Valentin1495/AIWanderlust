const replacePlusWithBlank = (place: string) => {
  const placeWithBlank = place.replace(/\+/g, ' ');

  return placeWithBlank;
};

export default replacePlusWithBlank;
