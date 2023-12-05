import API from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const catsContainer = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

getfetchBreeds();

// Получаем массив пород котов
function getfetchBreeds() {
  return API.fetchBreedsOptions()
    .then(cats => {
      loader.style.display = 'none';
      breedSelect.classList.remove('is-hidden');
      renderBreedByIdCatsInOption(cats);
      new SlimSelect({
        select: breedSelect,
        settings: {
          placeholderText: 'Choose a cat',
        },
      });
    })
    .catch(error => {
      fetchError(error);
    });
}

breedSelect.addEventListener('change', onSelectChange);

// Функция, которая при выборе option выдает инфу о котах
function onSelectChange(e) {
  const breed = e.currentTarget.value;
  loader.style.display = 'block';

  catsContainer.classList.add('is-hidden');
  API.fetchCatByBreed(breed)
    .then(cat => {
      renderCatsInfo(cat);
      loader.style.display = 'none';
    })
    .catch(error => {
      fetchError(error);
    });
}

// Делаем функцию, кот рендерит option в select
function renderBreedByIdCatsInOption(cats) {
  const markup =
    `<option data-placeholder="true" id="placeholder"></option>` +
    cats
      .map(({ id, name }) => {
        return `<option class="blue" value="${id}">${name}</option>`;
      })
      .join('');

  breedSelect.insertAdjacentHTML('afterbegin', markup);
}

// Делаем функцию, кот рендерит описание котов при выборе option
function renderCatsInfo(breed) {
  const markup = `<ul><li class='cat-item'><img src='${breed[0].url}' width = '600px'><div class='container-text'><h2>${breed[0].breeds[0].name}</h2><p class='cat-temper'><b>Temperament:</b> ${breed[0].breeds[0].temperament}</p><p>${breed[0].breeds[0].description}</p></div></li></ul>`;

  catsContainer.innerHTML = markup;
  catsContainer.classList.remove('is-hidden');
  loader.style.display = 'none';
}

function fetchError(error) {
  loader.style.display = 'none';
  Notiflix.Report.failure(
    'Oops!',
    'Something went wrong! Try reloading the page!',
    'Okay'
  );
}
