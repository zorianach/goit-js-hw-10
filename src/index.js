import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';
import './css/styles.css';


const selectors = {
    breedSelect: document.querySelector('.breed-select'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    divCatInfo: document.querySelector('.cat-info'),
    
};
const { breedSelect, loader, error, divCatInfo } = selectors;

breedSelect.classList.add('is-hidden');
error.classList.add('is-hidden');
divCatInfo.classList.add('is-hidden');

let breedsOptions = [];

fetchBreeds()
.then(data => {
    loader.classList.replace('loader', 'is-hidden');
    breedsOptions = data;
// console.log(breedsOptions)

    breedsOptions.map(({id, name}) => {
        breedSelect.insertAdjacentHTML('beforeend', 
        `<option value="${id}">${name}</option>`)
    })
    // console.log(breedSelect); 
           
    new SlimSelect({
        select: '#breed-list'
    })
    breedSelect.classList.remove('is-hidden');
})
.catch(onFetchError);

breedSelect.addEventListener('change', onSelectBreed);

function onSelectBreed(event) {
    loader.classList.replace('is-hidden', 'loader');
//     breedSelect.classList.add('is-hidden');
    divCatInfo.classList.add('is-hidden');

    const breedId = event.currentTarget.value;

    fetchCatByBreed(breedId)
    .then(data => {
        console.log(data)
        loader.classList.replace('loader', 'is-hidden');
//         breedSelect.classList.remove('is-hidden');
        const { url, breeds } = data[0];
        
        divCatInfo.innerHTML = 
        `<div class="box-img">
        <img src="${url}" 
        alt="${breeds[0].name}" 
        width="400"/>
        </div>
        <div class="box">
        <h1>${breeds[0].name}</h1>
        <p>${breeds[0].description}</p>
        <p><span class="temperament-title">Temperament:</span> ${breeds[0].temperament}</p>
        </div>`
        divCatInfo.classList.remove('is-hidden');
        console.log(divCatInfo);
    })
    .catch(onFetchError);
};


function onFetchError() {
    loader.classList.replace('loader', 'is-hidden');

    Notify.failure('Oops! Something went wrong! Try reloading the page', {
        position: 'center-center',
        timeout: 5000,
        width: '400px',
        fontSize: '24px'
    });
};