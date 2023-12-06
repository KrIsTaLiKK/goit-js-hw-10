import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_4Gm0uHLGSR0wwS58BeCFHPpD5NYOKsg1TRlvlzbVZGzsM7RrOtLR7hVuJaGVpzZk';

const BASE_URL = 'https://api.thecatapi.com/v1/';

export function fetchBreeds() {
  return axios.get(`${BASE_URL}breeds`).then(response => {
    return response.data;
  });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}images/search?&breed_ids=${breedId}`)
    .then(response => {
      return response.data;
    });
}
