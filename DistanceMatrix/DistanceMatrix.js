const distance = require('google-distance-matrix');

// const origins = ['13.9354695,100.383479']
// const destinations = ['13.9354695,101.383479'];

function DistanceMatrix(origins, destinations) {
    return new Promise((resolve, reject) => {
        distance.key(process.env.MAP_KEY);
        distance.units('imperial');
        distance.matrix(origins, destinations, function (err, distances) {
            if (err) {
                return console.log(err);
            }
            if (!distances) {
                return console.log('no distances');
            }
            if (distances.status == 'OK') {
                const Places = []
                for (let j = 0; j < destinations.length; j++) {
                    const origin = distances.origin_addresses;
                    const destination = distances.destination_addresses[j];
                    if (distances.rows[0].elements[j].status == 'OK') {
                        const distance = distances.rows[0].elements[j].distance.text;
                        // distance = distance * 1.609344 //convert to km
                        console.log('Distance from ' + origin + ' to ' + destination + ' is ' + distance);
                        Places.push(distance)
                    } else {
                        console.log(destination + ' is not reachable by land from ' + origin);
                    }
                }
                console.log("Distances of Places: ", Places)
                resolve(Places)
            }
        });
    })
}
module.exports = DistanceMatrix