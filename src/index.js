import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('input#search-box'),
    list: document.querySelector('.country-list'),
    info: document.querySelector('.country-info')
}
let inputValue = '';

refs.input.addEventListener('input', debounce(showCountries, DEBOUNCE_DELAY));

    
function showCountries() {
    inputValue = refs.input.value.trim();
    if (inputValue) {
        fetchCountries(inputValue).then(checkCountriesAmount);
    }
     refs.info.innerHTML = '';
    refs.list.innerHTML = '';
}


function checkCountriesAmount(countries) {
   

 if (countries.length > 10) {
   Notify.info('Too many matches found. Please enter a more specific name.')
    }
 if (countries.length >= 2 && countries.length <= 10) {
    return countriesList(countries);
    }
 if (countries.length === 1) {
    return createCountryCard(countries);
    }

}

function createCountryCard(country) {
    
    const markup = country.map(country => {
      
        return `<div class='country-info_header'><img src='${country.flags.svg}' width='50' height = '30'><h1 class='countries-header'>${country.name.official}</h1></div>
    <ul class='country-info_list'>
    <li><span class='country-info_text'>Capital:</span> ${country.capital}</li>
    <li><span class='country-info_text'>Population:</span> ${country.population}</li>
    <li><span class='country-info_text'>Languages:</span> ${Object.values(country.languages)}</li>
    </ul>`
    });
    
    refs.info.insertAdjacentHTML('beforeend', markup);
}

function countriesList(countries) {
 
    const markup = countries.map(country => {
        
        return `<li class='countries-item'><img src='${country.flags.svg}' width='50' height ='30'>
        <h2 class='countries-header'>${country.name.official}</h2>
        </li>`
    }).join('');
   
refs.list.insertAdjacentHTML('beforeend', markup);
    
}

