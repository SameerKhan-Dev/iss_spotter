
const {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes} = require('./iss.js');


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