const deleteString = (place: string) => {
  return place.replace(/\%20/g, ' ');
};

export default deleteString;
