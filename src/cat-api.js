const BASE_URL = 'https://api.thecatapi.com/v1/';
const options = {
  headers: {
    'x-api-key':
      'live_4Gm0uHLGSR0wwS58BeCFHPpD5NYOKsg1TRlvlzbVZGzsM7RrOtLR7hVuJaGVpzZk',
  },
};

// Делаем запрос на бэкэнд, получаем ответ и распарсиваем данные
function fetchBreedsOptions() {
  return fetch(`${BASE_URL}breeds1`, options).then(response => {
    if (!response.ok) {
      throw new Error('Ошибка получения данных');
    }
    return response.json();
  });
}

function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL}images/search?&breed_ids=${breedId}`, options).then(
    response => {
      if (!response.ok) {
        throw new Error('Ошибка получения данных');
      }
      return response.json();
    }
  );
}

export default { fetchBreedsOptions, fetchCatByBreed };
