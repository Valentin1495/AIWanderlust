const extractAttractions = (attractionsString: string) => {
  // Use regular expression to extract only the names of attractions
  const attractionRegex = /\d+\.\s+([^\n:]+)/g;
  const attractionsArray = [];
  let match;

  while ((match = attractionRegex.exec(attractionsString))) {
    attractionsArray.push(match[1]);
  }

  const namesArray = attractionsArray.map((el) => el.slice(2));

  return namesArray;
};

export default extractAttractions;
