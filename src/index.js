import './css/styles.css';


const DEBOUNCE_DELAY = 300;

refs = {
    countryInput : document.querySelector('#search-box'),
    countryList : document.querySelector('.country-list'),
    countryInfo : document.querySelector('.country-info'),
}


function makeInputCountry(e) {
    e.preventDefult()

    const name = refs.countryInput.value()
    
    
}

function makeInfoCountry(countries) {
    return countries.map(({ name, flags }) =>{
        return `<ul class="country-list__list">
        <li class="country-list__item">
        <img class="country-list__flag" src="${flags.svg}" alt="Flag ${name.official}" width=40px heigth=30px>
        <h2 class="country-list_name">${name.official}</h2>
        </li> 
        </ul>`
    }).join('')
}

function makeListCountry(countries) {
    return countries.map(({ capital, population, languages }) => {
        return `<ul class="country-info__list"
                    <li class="country-info__item"><p><b>Capital: </b>${capital}</p></li>
                    <li class="country-info__item"><p><b>Population: </b>${population}</p></li>
                    <li class="country-info__item"><p><b>Languages: </b>${Object.values(languages).join(', ')}</p></li>
                </ul>`
    }).join('')

}
function renderCountry(country) {
    const markupInfo = makeInfoCountry(country)
    refs.countryInfo.innerHTML = markupInfo
    const markupList = makeListCountry(country)
    refs.countryList.innerHTML = markupList
    
}



fetch('https://restcountries.com/v3.1/name/Ukraine').then(response => {
    return response.json()
})
.then(renderCountry)
.catch(erorr => {
    console.log(erorr)
}); 