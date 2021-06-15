const NWS = require("./index");

let latitude = '39.7456' // Kansas City, MO
let longitude = '-97.0892'

async function validTests() {
    console.log("\n*** BEGINNING VALID TESTS ***\n");

    // Testing API server status
    await NWS.getStatus().then(response => {

        console.log(response);

    }).catch(error => {

        console.log(error);
        console.log("\n*** ! FAILED ! ***");

    });


    console.log("\n---\n");

    await NWS.getLocationInfo(latitude, longitude).then(response => {

        let { relativeLocation } = response
        console.log(`Location: ${relativeLocation.properties.city}, ${relativeLocation.properties.state}`);

    }).catch(error => {

        console.log(error);
        console.log("\n*** ! FAILED ! ***");

    });

    console.log("\n---\n");

    // Testing getForecast() method with 3 periods
    await NWS.getForecast(latitude, longitude, 3).then(response => {

        console.log(response.length + " periods returned");

    }).catch(error => {

        console.log(error);
        console.log("\n*** ! FAILED ! ***");

    });

    console.log("\n---\n");


    // Testing getHourlyForecast() method with 24 periods
    await NWS.getHourlyForecast(latitude, longitude, 24).then(response => {

        console.log(response.length + " periods returned");

    }).catch(error => {

        console.log(error);
        console.log("\n*** ! FAILED ! ***");

    })

    console.log("\n*** END OF VALID TESTS ***\n");
}

/*** INCORRECT FUNCTION TESTS ***/
async function invalidTests() {
    console.log("\n*** BEGINNING INVALID TESTS ***\n");

    // This function has incorrect coordinates, and should throw a 404 error
    await NWS.getForecast(1000, 1000, 2).catch(error => {
        console.log(error);
    });


    console.log("\n---\n");


    // This function has incorrect coordinates, and should throw a 404 error
    await NWS.getLocationInfo(1000, 1000).catch(error => {
        console.log(error);
    });


    console.log("\n---\n");


    // This function has correct coordinates, however supplies an incorrect amount of periods
    await NWS.getForecast(latitude, longitude, 16).catch(error => {
        console.log(error);
    });


    console.log("\n---\n");


    // This function has correct coordinates, however supplies an incorrect amount of periods
    await NWS.getHourlyForecast(latitude, longitude, 184).catch(error => {
        console.log(error);
    });

    console.log("\n*** END OF INVALID TESTS ***\n");
}

//validTests();
//invalidTests();

