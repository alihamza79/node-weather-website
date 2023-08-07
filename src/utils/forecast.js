const request = require("postman-request");

const forecast = (longitude, latitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=7d14bc5aeddf2c72b39422dd1132d916&query=" +
    longitude +
    "," +
    latitude;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find Location.", undefined);
    } else {
      callback(
        undefined,
        `It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.`
      );
    }
  });
};

module.exports = forecast;
