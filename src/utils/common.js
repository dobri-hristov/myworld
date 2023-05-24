export const formatNumber = (number, options = {}) => {
  return (+number).toLocaleString(undefined, {
    useGrouping: true,
    ...options,
  });
};

export const generateWikiLink = (place) => {
  return `https://en.wikipedia.org/wiki/${place}`;
};

export const generateGoogleMapsLink = (city, country) => {
  return `https://www.google.com/maps/place/${city}+${country}`;
};
