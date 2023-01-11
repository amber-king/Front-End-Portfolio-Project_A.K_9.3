// The function that returns the users match address for desired location
const headerInfo = document.querySelector("form") //pulls information from the form section in HTML
const mainInfo = document.querySelector(".zipcode-detail") //pulls information from the main section in HTML
const newCity = document.querySelector(".place-name")
const newState = document.querySelector(".State")
const newCountry = document.querySelector(".Country")
const newZip = document.querySelector(".ZipCode")
const newCountryAbb = document.querySelector(".CountryAbb")
const resultInfo = []

// v-- eventlistener for the form section
headerInfo.addEventListener("submit", (event) => {
    event.preventDefault();
    const newLoc = event.target.location.value;
    foundAddress(newLoc)

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
            searchedCity.innerHTML = "City: "+ locationJSON.places[0]["place name"]
            card.append(searchedCity)

            const searchedState = document.createElement("p")
            searchedState.textContent = `State: ${locationJSON.places[0].state}`
            card.append(searchedState)


            const searchedCountry = document.createElement("p")
            searchedCountry.textContent = `Country: ${locationJSON.country}`
            card.append(searchedCountry)

            const searchedCountryAbb = document.createElement("p")
            searchedCountryAbb.textContent = "Country Abbreviation: " + locationJSON["country abbreviation"]
            card.append(searchedCountryAbb)


            const searchedZip = document.createElement("p")
            searchedZip.textContent = "Postal Code: " + locationJSON["post code"]
            card.append(searchedZip)

            //  v--Inserts City, State, Country, Zip Code information in
            const cityTitle = document.createElement('p')
            cityTitle.setAttribute("class", "card")

            newCity.append(cityTitle)

            const stateTitle = document.createElement('p')
            stateTitle.setAttribute("class", "card")
            newState.append(stateTitle)

            const countryTitle = document.createElement('p')
            countryTitle.setAttribute("class", "card")
            newCountry.append(countryTitle)

            const countryAbbTitle = document.createElement('p')
            countryAbbTitle.setAttribute("class", "card")
            newCountryAbb.append(countryTitle)

            const zipCodeTitle = document.createElement('p')
            zipCodeTitle.setAttribute("class", "card")
            zipCodeTitle.append(newZip)

            card.append(cityTitle, stateTitle, countryTitle, countryAbbTitle, newZip)
            mainInfo.append(card)
            resultInfo.push(locationJSON.places.value)



        })
        .catch((error) => alert("Invalid Input, Format must be as followed: Country/Zip Code or Country/State/City.Some information may be undefined if the location is found within different locations."))
}
