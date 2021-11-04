// weather.js HELPER CODE
// Make an HTTP GET Request to an API, parse the JSON response, and return a Javascrip object
async function makeAPIRequest(requestURL) {

    let response = await fetch(requestURL);

    if (response.ok) { // if HTTP-status is 200-299

        // Return the parsed JavaScript Object from the JSON data
        return response.json();

    } else {
        console.error("HTTP Error" + response.statusText)
        alert("HTTP-Error: " + response.status);
    }
}

function buttonClick() {
    var userName = document.getElementById("userName").value
    getAge(userName)
    console.log(userName)
}

function updateCardsWithForecast(forecast) {

    // Log our Forecast object
    console.log("Forecast: ")
    console.log(forecast)

    // Loop through the forecast
    for (var i = 0; i < 7; i++) {

        // Log which forecase item we are on
        console.log("Day " + i )
        console.log(forecast[i])

        // Update Name and Short Forecast
        var name = forecast[i].name
        var shortForecast = forecast[i].shortForecast
        document.getElementById( i ).innerHTML = name
        document.getElementById( i + "_forecast").innerHTML = shortForecast

        // Update Icon based on Short Forecast Text
        if (shortForecast.includes("Snow")) {
            document.getElementById(i + "_icon").className = "wi wi-day-snow"
        } else if (shortForecast.includes("Rain")) {
            document.getElementById(i + "_icon").className = "wi wi-day-rain"
        } else if (shortForecast.includes("Cloud")) {
            document.getElementById(i + "_icon").className = "wi wi-day-cloudy"
        } else if (shortForecast.includes("Clear")) {
            document.getElementById(i + "_icon").className = "wi wi-day-sunny"
        }
        else {
            document.getElementById(i + "_icon").className = "wi wi-day-sunny"
        }

    }


}

function getAge( userName ) {

    console.log("getting age of " + userName)

    var URL = "https://api.agify.io/?name=" + userName

    // Call Helper Function to make the API request and parse the JSON
    // Use JavaScript Promise to handle the response asynchronously 
    makeAPIRequest(URL).then(response => {

        // Log the full response
        console.log("Full Response: ")
        console.log(response)

        // Process the Important Weather Data
        // call updateCardsWithForecast function and pass response.properties.periods as a parameter
        //updateCardsWithForecast(response.properties.periods)

        console.log("finished making API request")
        //alert(userName + " is normally " + response.age + " years old")
        document.getElementById("age").innerHTML = response.age
    })
}
