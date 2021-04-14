const request = require('request')

const forecast = (latitude, longitude, callBack) => {
    const url = 'http://api.weatherstack.com/current?access_key=4419929291823459a1d8953bfc690c35&query=' + latitude + ',' + longitude  + '&units=f'

    request({url: url, json: true}, (error, response) => {
        if (error) {
            callBack('Unable to connect to weather services', undefined)
        } else if( response.body.error) {
            callBack('Unable to find location', undefined)
        } else { 
            callBack(undefined, 'It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + " degrees out")
        }
    })

}

module.exports = forecast