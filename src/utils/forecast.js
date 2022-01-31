const request = require('request');

const forecast = ({longitute, latitute, address}={}, callback) => {
    const url =
      "http://api.weatherstack.com/current?access_key=f9d8f112aa5fc618350d21057ded00d4&query=" + encodeURIComponent(address);

    request({url, json: true }, (error, {body}={}) => {
      if (error) {
        callback("Unable to connect to weather service!",undefined);
      } else if (body.error) {
        callback("Unable to find location",undefined);
      } else {
          callback(undefined, {
            location: body.location.name + ", " + body.location.country,
            temperature:
              "temperature : " +
              body.current.temperature +
              ", wind speed : " +
              body.current.wind_speed +
              ", uv index : " +
              body.current.uv_index,
          });
      }
    });
}

module.exports = forecast