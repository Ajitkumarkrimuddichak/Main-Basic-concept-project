const config = {
    cUrl: " https://api.countrystatecity.in/v1/countries",
    cKey: "R3NUdUE3RTdlbWt5ckF3WEJLMKFwQ0VJWDNUaThLUGdrU09VZEhuaA==",
    // wUrl: "http://api.openweathermap.org/data/2.5/",
    // wKey: "b3d134b205a02dd2324b79cea375c67e",
};

//get countery

const getCountries = async () =>{
    let apiEndPoint = config.cUrl;
    const response = await fetch(apiEndPoint,{
        headers:{"X-CSCAPI-KEY" : config.cKey},
    });
    if(response.status !=200){
        throw new Error(`Something want wrong status code: ${response.status}`);
    }
    const countries = await response.json();
    return countries;
};

const countriesListDropDown = document.querySelector("#countrylist");
const statelistListDropDown = document.querySelector("#statelist");
const citylistListDropDown = document.querySelector("#citylist");

document.addEventListener("DOMContentLoaded",async () => {
    const countries = await getCountries();
    console.log(countries);
    let countriesOptions = "";
    if(countries){
        countriesOptions += `<option value="">Country</option>`;
        countries.forEach((coutry) =>{
            countriesOptions += `<option value="${coutry.iso2}">${coutry.name}</option>`;
        });
        countriesListDropDown.innerHTML = countriesOptions;
    }
    
});