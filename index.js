const axios = require("axios");
const BASE_URL = "https://api.weather.gov";

async function createURL(latitude, longitude) {
    let url = BASE_URL + `/points/${latitude},${longitude}`;
    return url;
}

async function fetchData(url, retrieveForecast = false) {
    let response = null;

    try {
        response = await axios.get(url); // Fetch the data

        // If we are retriving forecast data, return that specific data
        if (retrieveForecast) return response.data.properties.periods;

        // If we are NOT retriving forecast data (ex. getting the status of the server), return whatever response we get.
        return response;

    } // Any errors sent by the API (ex. 404 or 500 error) is handled in the catch block.
    catch (error) {
        return error.message;
    }
}

/***********************************************************/

// Return the status of the server

async function getStatus() {
    let data = await fetchData(BASE_URL);

    let response = {
        status: data.status,
        statusText: data.statusText
    }

    return response;
}

/***********************************************************/

// Return information about user location (city, state, etc.)

async function getLocationInfo(latitude, longitude) {
    let url = await createURL(latitude, longitude);

    let response = await fetchData(url);
    if (typeof response == 'string') throw new Error(response);

    let { data: { properties } } = response;
    return properties;
}


/***********************************************************/

// NOTE: The following two functions can take a periods parameter. This specifies how many forecast periods we'll return to the user.
// Ex. In the getHourlyForecast function, each period is 1 hour. The NWS API will return us a maximum of 156 forecast periods.
// So if the user wants to only get 24 forecast periods, the user can use something like this...
// getHourlyForecast(39.7456, -97.0892, 24);

// NOTE: This function will return 12 hour forecast periods (Approx. 7AM-7PM & 7PM-7AM EST). Generally the first 2 periods returned are the
// forecasts for the current day (Unless called after 7PM EST, then it's only 1 period). The first period may also not be a full 12 hours, 
// if called after 7AM/PM EST.

async function getForecast(latitude, longitude, periods = 14) {
    // By default, this endpoint will return 14 forecast periods. The caller of the function can pass a parameter of the
    // amount of periods they need. Before we make any calls to the API, lets make sure we are between the correct amount of periods.
    if ((periods > 14) || (periods <= 0)) throw new Error("Incorrect Amount of Periods");

    // Create the URL based on location coordinates. This will be used to fetch the forecast endpoint for this location.
    let url = await createURL(latitude, longitude);
    let response = null;

    // 1st fetch to retrieve coordinates data.
    response = await fetchData(url);
    if (typeof response == 'string') throw new Error(response); // If response is a string, throw an error.

    // 2nd fetch to retrieve the forecast
    response = await fetchData(response.data.properties.forecast, true);
    if (typeof response == 'string') throw new Error(response); // If response is a string, throw an error.

    // Return an array of the requested periods.
    return response.slice(0, periods);
}

/***********************************************************/

// NOTE: this function will return you the hourly forecast periods, the first period will be the current hour, so if you
// call this function at 5:30PM, the first period will be for the hour of 5:00PM-6:00PM.

async function getHourlyForecast(latitude, longitude, periods = 156) {
    if ((periods > 156) || (periods <= 0)) throw new Error("Incorrect Amount of Periods");

    let url = await createURL(latitude, longitude);
    let response = null;

    response = await fetchData(url);
    if (typeof response == 'string') throw new Error(response); // If response is a string, throw an error.

    response = await fetchData(response.data.properties.forecastHourly, true);
    if (typeof response == 'string') throw new Error(response); // If response is a string, throw an error.

    // Returns an array of objects.
    return response.slice(0, periods);
}

/***********************************************************/

module.exports = {
    getStatus,
    getLocationInfo,
    getForecast,
    getHourlyForecast
}