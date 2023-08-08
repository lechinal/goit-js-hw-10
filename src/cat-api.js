import axios from 'axios';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const apiKey =
  'live_BcTNHfTgNwZrQrqDMtw5tWokFGTdnFmSH4WDfWjwxT4lwL1y7LoSFYy6bFam1cj5';

axios.defaults.headers.common['x-api-key'] = apiKey;

export function fetchBreeds() {
  const errorElement = document.getElementById('error');
  errorElement.style.display = 'none';

  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching breeds:', error);
      errorElement.style.display = 'block';
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  const errorElement = document.getElementById('error');
  errorElement.style.display = 'none';

  const catInfoDiv = document.querySelector('.cat-info');
  catInfoDiv.style.display = 'none';

  const loader = document.querySelector('.loader');
  loader.style.display = 'block';

  const params = {
    breed_id: breedId,
  };

  return axios
    .get('https://api.thecatapi.com/v1/images/search', { params })
    .then(response => {
      loader.style.display = 'none';
      catInfoDiv.style.display = 'block';

      const catData = response.data[0];

      const catImage = document.createElement('img');
      catImage.src = catData.url;
      catImage.alt = 'Cat Image';
      catImage.classList.add('cat-image');
      catInfoDiv.innerHTML = '';
      catInfoDiv.appendChild(catImage);

      const breedName = document.createElement('p');
      breedName.textContent = catData.breeds[0].name;
      breedName.classList.add('breed-name');
      catInfoDiv.appendChild(breedName);

      const breedDescription = document.createElement('p');
      breedDescription.textContent = catData.breeds[0].description;
      breedDescription.classList.add('breed-description');
      catInfoDiv.appendChild(breedDescription);

      const breedTemperament = document.createElement('p');
      breedTemperament.textContent = catData.breeds[0].temperament;
      breedTemperament.classList.add('breed-temperament');
      catInfoDiv.appendChild(breedTemperament);

      return catData;
    })
    .catch(error => {
      console.error('Error fetching cat information:', error);

      loader.style.display = 'none';
      errorElement.style.display = 'block';
      throw error;
    });
}
