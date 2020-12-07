const { nextISSTimesForMyLocation } = require('./iss_promised.js');


// expected to return a promise
// each function being called is expected to return a promise
// can access the result from the promise in the .then function which takes in an anonymouse callback function
// ip is the result from calling the fetchMyIP function. By default it can be access in the .then.
// inside the .then you have to provide the callback function
/*
fetchMyIP().then((ipBody) => {

  // expected to return a promise 
  // inside then's callback function, latAndLong is the result from calling the fetchCoordsByIP function. i.e in the back the request library creates a new promise and returns it. The new promise once created is either
  // marked as resolved or reject , and .then waits for the resolve function to get executed to know its resolved -- something like that.
  // By default .then's callback function has a single parameter that is assumed to be result which is a single object that you are receiving etc. 
  fetchCoordsByIP(ipBody).then((latAndLongBody) => {
    // to access the results from the fetchCoordsByIP function use .then's callback function's generic parameter, which I labelled as latAndLong for this application.
    // result returned should be in raw JSON format.

    fetchISSFlyOverTimes(latAndLongBody).then( (flyOverTimesObject) => {

      console.log(flyOverTimesObject);
      /*
      const flyOverTimes = JSON.parse(flyOverTimesObject);
      printPassTimes()??
      */
      /*
    }).catch(() => { console.log("ERROR FAM!!!")});
    
  
  });

});
*/

const printPassTimes = function(flyOverTimes) {
  let results = "";
  for (let x = 0; x < flyOverTimes.length; x++){
    if (x !== flyOverTimes.length -1 ) {

      results += `Next pass at ${new Date(flyOverTimes[x].risetime * 1000)} for ${flyOverTimes[x].duration} seconds!\n`;

    } else {

      results += `Next pass at ${new Date(flyOverTimes[x].risetime * 1000)} for ${flyOverTimes[x].duration} seconds!`;
    }
    
  }
  console.log(results);
};

// Call 

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });

  
 //nextISSTimesForMyLocation();