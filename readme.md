# Weather App Lab TODOs

## ✅ Weather Icons

Weather Icons are from a third-party local library that can be downloaded here: https://erikflowers.github.io/weather-icons/

Move the CSS and FONT folders into your Project Folder, then add a link to the weather-icons.css stylesheet in index.html

Replace each Card's IMG Element with a Weather Icon:

    <i class="wi wi-night-snow" id="0_icon"></i>
    <i class="wi wi-night-rain" id="1_icon"></i>
    <i class="wi wi-night-cloudy" id="2_icon"></i>
    <i class="wi wi-night-sunny" id="3_icon"></i>


## ✅ Add Unique IDs to HTML Elements

Add Unique Ids to Each Card's Title (0), Text (0_forecast), and Icon (0_icon). 

    <div class="card">
        <i class="wi wi-night-sleet" id="0_icon"></i>
        <div class="card-body">
            <h4 class="card-title" id="0">Title</h4>
            <p class="card-text" id="0_forecast">Text</p>
        </div>
    </div>

## ✅ Add Some Custom CSS 

Add a new Style.css File. Give the HTML Cards and Icons some spacing

    .container .card {
        text-align:center;
        margin: 20px;
    }

    i {
        font-size: 4rem;
        padding:50px;
    }


## ✅ Get Weather API Forecast for Grand Junction in JSON Format

Open the following URL in a Browser and examine the format of the data.
When you open this URL, your Browser is sending a GET Request to this API Endpoint.

    https://api.weather.gov/gridpoints/GJT/95,101/forecast


## ✅ Now Make the Same API Request, but from JavaScript

Create a new weather.js file and add this Helper Code to makeAPI Requests

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



## ✅ Add a function to get the Forecast from the API Endpoint.

    function getForecast() {
        
        console.log("getting forecast...")
        
        var forecastURL = "https://api.weather.gov/gridpoints/GJT/95,101/forecast"

        // Call Helper Function to make the API request and parse the JSON
        // Use JavaScript Promise to handle the response asynchronously 
        
        makeAPIRequest(forecastURL).then( response => {
            console.log(response)

            // Process the Important Weather Data
            updateCardsWithForecast(response.properties.periods)
        })
    }

## ✅ Create a Function to Process the Weather Data

    function updateCardsWithForecast( forecast ) {
        for (let i=0; i<7; i++) {
            {
                // Update Title / Name
                let name = forecast[i].name
                document.getElementById(i).innerHTML = name

                // Update Forecast
                let shortForecast = forecast[i].shortForecast
                document.getElementById(i+"_forecast").innerHTML = shortForecast

                // Update Icon
            }
        }
    }

## ✅ Update Each Card's Icon Based on Forecast Text ( inside the loop )

    if ( shortForecast.includes("Snow") ) {
        document.getElementById(i+"_icon").className = "wi wi-day-snow"
    } else if( shortForecast.includes("Rain") ) {
        document.getElementById(i+"_icon").className = "wi wi-day-rain"
    } else if( shortForecast.includes("Cloud") ) {
        document.getElementById(i+"_icon").className = "wi wi-day-cloudy"
    } else {
        document.getElementById(i+"_icon").className = "wi wi-day-sunny"
    }

## ☐ Get the User's Browser GeoLocation and Call a Callback when Complete

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(updateCoordinatePosition);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

## ☐ Define a Callback Function to Set Lat / Long 

    function updateCoordinatePosition(position) {
        
        
        // Update Location Coordinates
        lat = position.coords.latitude
        long = position.coords.longitude
        
        let locationMsg = "Lat: " + position.coords.latitude + "\nLong: " + position.coords.longitude; 
        console.log(locationMsg);
        document.getElementById("location").innerHTML = locationMsg;    

        getForecastURL()

    }

## ☐ Get the correct Forecast URL / Weather Station for User's Provided Lat/Long 

    // Gets Forecast URL from Weather API using Lat/Long
    function getForecastURL() {
        console.log("getting nearby weather station's forecast url...")
        makeAPIRequest('https://api.weather.gov/points/' + lat + ',' + long).then( response => {
            console.log(response.properties)
            locationCode = response.properties.cwa;
            forecastURL = response.properties.forecast;
            document.getElementById("locationCode").innerHTML = locationCode;  
            getForecast()  
        })
    }