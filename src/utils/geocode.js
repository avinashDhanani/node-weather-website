const request = require('request')

const geocode = (address, callback) => {
    const url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/-" +
      encodeURIComponent(address) +
      ".json?types=place%2Cpostcode%2Caddress&limit=1&access_token=pk.eyJ1IjoiYXZpZXh0cmExIiwiYSI6ImNreXd2bnM1NTBjazYzMG14N2tmNTVxY2IifQ.CMgsxqk1TK_OipRhr4A0aQ";

    request({url, json: true }, (error, {body}={}) => {
        if (error) {
          callback("Unable to connect to weather service!",undefined);
        } else if (
          body.message ||
          body.features.length == 0
        ) {
          callback("Unable to find location. Try anthor search!",undefined);
        } else {
           callback(undefined, {
                longitute: body.features[0].center[0],
                latitute: body.features[0].center[1],
                address: body.features[0].text,
            })
        }
    });
}

module.exports = geocode;