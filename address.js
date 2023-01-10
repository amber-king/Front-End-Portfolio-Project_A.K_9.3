// The function that returns the users match address for desired location
const headerInfo = document.querySelector("form") //pulls information from the form section in HTML
const mainInfo = document.querySelector("main") //pulls information from the main section in HTML
const newCity = document.querySelector(".place-name")
const newState = document.querySelector(".State")
const newCountry = document.querySelector(".Country")
const newZip = document.querySelector(".ZipCode")
const resultInfo = []

// v-- eventlistener for the form section
headerInfo.addEventListener("submit", (event) => {
    event.preventDefault();
    // const newLoc = (event.target.location.value);
    // foundAddress(newLoc)
    // headerInfo.reset();
// mainInfo.style.display = "none"
// refreshPG.style.display = "none"
})
// v--- function to call city,state,country,zip code & append to card
function foundAddress(newLoc) {

    // v--deletes previous information as you search new locations
    const refreshPG = document.querySelectorAll(".card")
    if (refreshPG.length > 0) {
        for (let i = 0; i < refreshPG.length; i++)
            refreshPG[i].remove()

    }

    // v--- pulls information from the API into the header section of the form
    const baseURL = `https://www.zippopotam.us/${newLoc}?format=j1`
    fetch(`${baseURL}`)
        .then((location) => location.json())
        .then((locationJSON) => {

            // v--- creates element for search engine & sets card to desired info
            const card = document.createElement("section")
            card.setAttribute("class", "card")

            // v-- created elements for City,State,Country,Zip Code Information when searched
            const searchedCity = document.createElement("p")
            searchedCity.innerHTML = `City: ${locationJSON.places[0].value}`
            card.append(searchedCity)

            const searchedState = document.createElement("p")
            searchedState.textContent = `Country: ${locationJSON.places[2].value}`
            card.append(searchedState)

            const searchedCountry = document.createElement("p")
            searchedCountry.textContent = `Country: ${locationJSON.country[0].value}`
            card.append(searchedCountry)

            const searchedZip = document.createElement("p")
            searchedZip.textContent = `Country: ${locationJSON.post + code.value} `
            card.append(searchedZip)

            //  v--Inserts City, State, Country, Zip Code information in
            const cityTitle = document.createElement('p')
            cityTitle.setAttribute("class", "card")
            cityTitle.textContent = "City"
            newCity.append(cityTitle)

            const stateTitle = document.createElement('p')
            stateTitle.setAttribute("class", "card")
            stateTitle.textContent = "State"
            newState.append(stateTitle)

            const countryTitle = document.createElement('p')
            countryTitle.setAttribute("class", "card")
            countryTitle.textContent = "Country"
            newCountry.append(countryTitle)

            const zipCodeTitle = document.createElement('p')
            zipCodeTitle.setAttribute("class", "card")
            zipCodeTitle.textContent = "ZipCode"
            zipCodeTitle.append(newZip)

            card.append(cityTitle, stateTitle, countryTitle, newZip)
            mainInfo.append(card)
            resultInfo.push(locationJSON.places.value)



        })
        .catch()
}
