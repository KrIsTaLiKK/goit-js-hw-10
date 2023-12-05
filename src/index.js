import API from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const catsContainer = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

getfetchBreeds();

function getfetchBreeds() {
  return API.fetchBreeds()
    .then(cats => {
      loader.style.display = 'none';
      breedSelect.classList.remove('is-hidden');

      renderBreedByIdCatsInSelect(cats);

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

function onSelectChange(e) {
  const breed = e.currentTarget.value;
  loader.style.display = 'flex';

  catsContainer.classList.add('is-hidden');
  API.fetchCatByBreed(breed)
    .then(breed => {
      renderCatsInfoOnPage(breed);
      loader.style.display = 'none';
    })
    .catch(error => {
      fetchError(error);
    });
}

function renderBreedByIdCatsInSelect(cats) {
  const markup =
    `<option data-placeholder="true" id="placeholder"></option>` +
    cats
      .map(({ id, name }) => {
        return `<option class="blue" value="${id}">${name}</option>`;
      })
      .join('');

  breedSelect.insertAdjacentHTML('afterbegin', markup);
}

function renderCatsInfoOnPage([breed]) {
  const { breeds } = breed;

  const markup = `<ul><li class='cat-item'><img src='${breed.url}' alt='${breeds[0].name}' width = '600px'><div class='container-text'><h2>${breeds[0].name}</h2><p class='cat-temper'><b>Temperament:</b> ${breeds[0].temperament}</p><p>${breeds[0].description}</p></div></li></ul>`;

  catsContainer.innerHTML = markup;
  catsContainer.classList.remove('is-hidden');
}

function fetchError(error) {
  loader.style.display = 'none';
  Notiflix.Report.failure(
    'Oops!',
    'Something went wrong! Try reloading the page!',
    'Okay'
  );
  throw new Error('Error');
}
