
const {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes , nextISSTimesForMyLocation} = require('./iss.js');


/*
fetchMyIP((error, ip) => {

  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  // if no error console.log it worked....

  console.log('It worked! Returned IP:' , ip);


});
*/
/*
fetchCoordsByIP("24.52.254.209", (error, data) => {

  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned Coords:' , data);
});
*/
/*
let coords = {latitude: 49 , longitude: -78};

fetchISSFlyOverTimes(coords, (error, data) => {

  if (error) {
    console.log("It didn't work!" , error);
    return null;
  }
  console.log('It worked! Fly-over times are:' , data);
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









nextISSTimesForMyLocation((error, passTimes) => {

  if (error) {
    return console.log("It didn't work!", error);
    
  } 

  printPassTimes(passTimes);

});