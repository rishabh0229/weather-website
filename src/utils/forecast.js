const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3b2df33b9674dd66a814775bce998006&query=' + latitude + ',' + longitude + ''

    request({ url, json: true }, (error, { body }) => {
        console.log("body", body.current.weather_descriptions)
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature)
        }
    })
}

module.exports = forecast