// The function that returns the users match address for desired location --v
// All the variables used--v
const headerInfo = document.querySelector("form") //pulls information from the form section in HTML
const mainInfo = document.querySelector(".zipcode-detail") //pulls information from the main section in HTML
const newCity = document.querySelector(".place-name") //pulls information for the city name
const newState = document.querySelector(".State") // pulls information for the state name
const newCountry = document.querySelector(".Country") // pulls information for the country name
const newZip = document.querySelector(".ZipCode") // pulls information for the zip code/postal-code
const newCountryAbb = document.querySelector(".CountryAbb") // pulls information for the country abbreviation
const newStateAbb = document.querySelector(".StateAbb") // pulls information for the state abbreviation
const resultInfo = []

// v-- eventlistener for the form section
headerInfo.addEventListener("submit", (event) => {
    event.preventDefault();
    const newLoc = event.target.location.value;
    foundAddress(newLoc)

})
// v--- function to call city,state,country,zip code,state abbreviation and country abbreviation 
//appends the return informastion to card
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

            // city information element created & appeneds to card--v
            const searchedCity = document.createElement("p")
            searchedCity.innerHTML = "City: " + locationJSON.places[0]["place name"]
            card.append(searchedCity)

            // state information element created & appended to card --v
            const searchedState = document.createElement("p")
            searchedState.textContent = `State: ${locationJSON.places[0].state}`
            card.append(searchedState)

            // country infromation element created & appended to card --v
            const searchedCountry = document.createElement("p")
            searchedCountry.textContent = `Country: ${locationJSON.country}`
            card.append(searchedCountry)

            // state abbreivation information element created & appended to card --v
            const searchedStateAbb = document.createElement("p")
            searchedStateAbb.textContent = "State Abbreviation: " + locationJSON["state abbreviation"]
            card.append(searchedStateAbb)

            // country abbreivation information element created & appended to card --v
            const searchedCountryAbb = document.createElement("p")
            searchedCountryAbb.textContent = "Country Abbreviation: " + locationJSON["country abbreviation"]
            card.append(searchedCountryAbb)

            // zip code information element created & appended to card --v
            const searchedZip = document.createElement("p")
            searchedZip.textContent = "Postal Code: " + locationJSON["post code"]
            card.append(searchedZip)


            // city card info set to matching made vairable --v
            const cityTitle = document.createElement('p')
            cityTitle.setAttribute("class", "card")
            newCity.append(cityTitle)

            // state card info set to matching made variable --v
            const stateTitle = document.createElement('p')
            stateTitle.setAttribute("class", "card")
            newState.append(stateTitle)

            // country card info set to matching made variable --v
            const countryTitle = document.createElement('p')
            countryTitle.setAttribute("class", "card")
            newCountry.append(countryTitle)

            //state abbreivation card info set to matching made variable --v
            const stateAbbTitle = document.createElement('p')
            stateAbbTitle.setAttribute("class", "card")
            newStateAbb.append(stateAbbTitle)

            // country abbreivation card info set to matching made variable --v
            const countryAbbTitle = document.createElement('p')
            countryAbbTitle.setAttribute("class", "card")
            newCountryAbb.append(countryTitle)

            // zipcode card info set to matching made variable --v
            const zipCodeTitle = document.createElement('p')
            zipCodeTitle.setAttribute("class", "card")
            zipCodeTitle.append(newZip)

            card.append(cityTitle, stateTitle, countryTitle, stateAbbTitle, countryAbbTitle, newZip) //append all the made variables to card
            mainInfo.append(card) // appending card info to the main section in the HTML
            resultInfo.push(locationJSON.places.value) // append the results of the users input to the data array



        })
        //error alert is a pop up window in broswer to inform user of how to type in the input properly to return the closes matching data 
        .catch((error) => alert("Invalid Input, Format must be as followed: Country/Zip Code or Country/State/City.Some information may be undefined if the city is found within different states or countries."))
}

//calls the standard info to the load page
foundAddress("US/11238")