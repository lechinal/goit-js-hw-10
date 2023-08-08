import axios from 'axios';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.getElementById('breed-select');
const loader = document.getElementById('loader');
const errorElement = document.getElementById('error');

function populateBreedSelect(breeds) {
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}

function handleBreedSelectChange() {
  const breedId = breedSelect.value;

  fetchCatByBreed(breedId)
    .then(catData => {
      console.log('Cat information:', catData);
    })
    .catch(error => {
      console.error('Error fetching cat information:', error);
    });
}

function initializePage() {
  fetchBreeds()
    .then(breeds => {
      populateBreedSelect(breeds);
    })
    .catch(error => {
      console.error('Error fetching cat breeds:', error);
    });
}

breedSelect.addEventListener('change', handleBreedSelectChange);

document.addEventListener('DOMContentLoaded', initializePage);

loader.style.display = 'none';

const showError = message => {
  Notiflix.Report.failure('Error', message, 'OK');
};
