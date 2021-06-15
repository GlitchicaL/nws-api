# NWS API
NWS API is an API wrapper for the API provided by the National Weather Service.<br> 
The API provides forecasts, alerts, and other weather related data based on location (coordinates, or forecast grids).

More information on the National Weather Service API can be found [here](https://www.weather.gov/documentation/services-web-api?prevfmt=application%2Fcap%2Bxml&prevopt=id%3DNWS-IDP-PROD-4105466).

## Installation
`npm install nws-api-wrapper`

## Implementation

`const NWS = require('nws-api-wrapper');`

## Functions & Examples
### getStatus();
`NWS.getStatus();`

#### Description & Notes:
This function returns the status of the API using the base URL https://api.weather.gov

---

### getLocationInfo();
`NWS.getLocationInfo(<latitude>, <longitude>);`

#### Description & Notes:
This function requires 2 parameters (latitude, and longitude), and will return an object of data about the coordinates such as grid coordinates, 
forecast links, and even the relative city, and state.

---

### getForecast();
`NWS.getForecast(<latitude>, <longitude>, <periods>);`

#### Usage Example:
```
try {
    let response = await NWS.getForecast(39.7456, -97.0892, 3);
    // Handle response here.
}
catch (error) {
    // Handle error here.
}
```

#### Description & Notes:
This function has 3 parameters total, the first 2 (latitude, and longitude) are required, while the 3rd parameter (periods) is optional. The 3rd parameter if supplied must be a number between 1-14 otherwise an error will be thrown. If the period parameter is not supplied, the function will return all 14 periods.

This function will return an array of up to 14 forecast periods (each period will be an object). Each period is about a 12 hour timeframe (7AM-7PM & 7PM-7AM EST). If the function is called at 3PM EST, the first period won’t be a full 12 hours, instead that timeframe will be 3PM-7PM EST.

---

### getHourlyForecast();
`NWS.getHourlyForecast(<latitude>, <longitude>, <periods>);`

#### Usage Example:
```
try {
    let response = await NWS.getHourlyForecast(39.7456, -97.0892, 24);
    // Handle response here.
}
catch (error) {
    // Handle error here.
}
```

#### Description & Notes:
This function has 3 parameters total, the first 2 (latitude, and longitude) are required, while the 3rd parameter (periods) is optional. The 3rd parameter if supplied must be a number between 1-156, otherwise an error will be thrown. If the period parameter is not supplied, the function will return all 156 periods.

Similar to the `getForecast();` function, this will return an array of forecast periods (each period will be an object). Each period is 1 hour, with the exception of the first period if called after
the beginning of an hour.

---