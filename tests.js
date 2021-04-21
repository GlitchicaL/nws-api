const NWS = require("./index");

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


    // Testing getForecast() method with 3 periods
    await NWS.getForecast(39.7456, -97.0892, 3).then(response => {
        console.log(response.length + " periods returned");
    }).catch(error => {
        console.log(error);
        console.log("\n*** ! FAILED ! ***");
    });

    console.log("\n---\n");


    // Testing getHourlyForecast() method with 24 periods
    await NWS.getHourlyForecast(39.7456, -97.0892, 24).then(response => {
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


    // This function has correct coordinates, however supplies an incorrect amount of periods
    await NWS.getForecast(39.7456, -97.0892, 16).catch(error => {
        console.log(error);
    });


    console.log("\n---\n");


    // This function has correct coordinates, however supplies an incorrect amount of periods
    await NWS.getHourlyForecast(39.7456, -97.0892, 184).catch(error => {
        console.log(error);
    });

    console.log("\n*** END OF INVALID TESTS ***\n");
}

//validTests();
//invalidTests();

