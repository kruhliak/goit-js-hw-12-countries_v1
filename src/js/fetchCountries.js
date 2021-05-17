import axios from 'axios';

axios.defaults.baseURL = 'https://restcountries.eu/rest/v2';

export const fetchCountries = searchQuery => {
  return axios.get(`/name/${searchQuery}`).then(response => response.data);
};
