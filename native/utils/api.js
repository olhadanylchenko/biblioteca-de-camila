export const fetchFromApi = async (route, options) => {
  return await fetch(`https://cami-api.herokuapp.com${route}`, options);
};
