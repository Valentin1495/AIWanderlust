const formatNumOfPeople = (numOfPeople: string) => {
  let formattedNumOfPeople = '';

  switch (numOfPeople) {
    case 'Going+Solo':
      formattedNumOfPeople = '';
      break;
    case 'Friends':
      formattedNumOfPeople = 'for a group of friends';
      break;
    case 'Partner':
      formattedNumOfPeople = 'with your partner';
      break;
    case 'Family':
      formattedNumOfPeople = 'for a family';
      break;
    default:
      break;
  }

  return formattedNumOfPeople;
};

export default formatNumOfPeople;
