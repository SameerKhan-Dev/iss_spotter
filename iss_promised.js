
// get http requests library that can support promises
const request = require('request-promise-native');


/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */
const fetchMyIP = function() {
  // use request to fetch IP address from JSON API
  // use request library to reach out to web sever at destination

  let destination = "https://api.ipify.org?format=json";
  
  return request(destination);
  // ^ returns a promise, and result inside promise is sent to resolve function as a parameter. Note the result is in JSON format. b/c this is the http request.
};

const fetchCoordsByIP = function (ipBody) {

  // ip right now is in object format
  // extract ip value from the object and then use it to make the request
  // convert it to a regular object, and access the .ip value
  // ipBody is in object format: { "ip": " 22...."}
  
  const ip = JSON.parse(ipBody).ip;

  let destination = `https://freegeoip.app/json/${ip}`;
  return request(destination);
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coordsObject) {

  // coordsObject is in JSON format right now, need to parse it and then extract the useful latitude and longitude values

  let coords = JSON.parse(coordsObject);
  // set destination by extracting the latitude and longitude from the coordsObject
  //SSSSSconsole.log("here fam");
  const destination = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  
  //console.log("here fam2");
  return request(destination);

}


const nextISSTimesForMyLocation = function() {

  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((body) => {
  
    // response is a property of which is returned
    const parsedBody = JSON.parse(body);
    
    const flyOverTimes = parsedBody.response;
        
    return flyOverTimes;
    
  }).catch(() => {console.log(`Error! ${error.message} `)});


}

module.exports = {nextISSTimesForMyLocation };