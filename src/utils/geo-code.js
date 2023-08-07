const request = require("postman-request");
const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiaGFtemE3OTkiLCJhIjoiY2xrdmZ2anV5MGh5ejNncGl5bTBkcG93ayJ9.RqaygdCmHwoIMkvmIMx7mw&limit=1";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find Location", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        place: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
