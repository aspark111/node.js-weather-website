const request = require('request')

const geocode = (address, callBack) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYXNwYXJrMTExIiwiYSI6ImNrbmRwMDhhZDFoZW0ybm1sbnE2bjJtbjAifQ.a_uk1bUCMMxm2jEbIcMKGw'
    request({url:url, json: true}, (error, response) => {
        if(error) {
            callBack('Unable to connect to location services')
        } else if(response.body.features.length == 0) {
            callBack('Unable to find location. Try another search.')
        } else {
            callBack(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })

}

module.exports = geocode
