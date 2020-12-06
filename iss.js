// get access to require library
const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  // use request library to reach out to web sever at destination

  let destination = "https://api.ipify.org?format=json";
  request(destination, (error, response, body) => {

    // if error (i.e ip address/body is null then send error to callback function)
    if (error) {
      return callback(error,null);
      
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {

      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;

    }
    
    // no error so callback function
    // convert ipAddress from JSON format to normal object syntax using JSON.parse();
    const ip = JSON.parse(body).ip;
    // call the callback function
    callback(null,ip);
    

  });

};

// our next function fetchCoordsByIP will be one that takes in an IP address and returns the latitude and longitude for it.
/*

  - Define the fetchCoordsByIP function in iss.js.
  - It should take in two arguments, ip(string) and callback.
  - Add it to the object properties being exported from iss.js.
  - It can have an empty body and do nothing, for now.

*/
const fetchCoordsByIP = function(ip, callback) {
  
  let destination = `https://freegeoip.app/json/${ip}`;

  request(destination, (error, response, body) => {
    
    //console.log("body returned is :", body);
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    }
    
    // parse data
    const data = JSON.parse(body);
    // extra lat and long and save into object
    const latAndLong = {};
    latAndLong.latitude = data.latitude;
    latAndLong.longitude = data.longitude;
    callback(null, latAndLong);
    
  });
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
const fetchISSFlyOverTimes = function(coords, callback) {

  const destination = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(destination, (error, response, body) => {
    
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching flying times for: ${body}`), null);
      return;
    }
    
    // parse data
    const data = JSON.parse(body);
    // extra lat and long and save into object
    const flyOverTimes = data.response;
    callback(null, flyOverTimes);
    /*
    const latAndLong = {};
    latAndLong.latitude = data.latitude;
    latAndLong.longitude = data.longitude;
    callback(null, latAndLong);
    */
  });

};


// iss.js 

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback wrror, ip) ith an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 
const nextISSTimesForMyLocation = function(callback) {
  // empty for now
    
  // we want to implement asynchronous calls through
  // callback is the fetchCoordsByIP function 
    fetchMyIP((error, ip) => {
      if (error) {
      
        return callback(error, null);
      } 
      fetchCoordsByIP(ip, (error, latAndLong)=> {
        if (error) {
          return callback(error, null); 
            
        }   
        fetchISSFlyOverTimes(latAndLong, (error,flyOverTimes) => {
          if (error) {
            return callback(error, null);
            
          } 
          callback(error, flyOverTimes);
        
        });
      
      });
      
    });

}



module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation};