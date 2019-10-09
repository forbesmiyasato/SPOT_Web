const router = require('express').Router();
let Distance = require('google-distance-matrix');

//Add snapshot to a parking lot
router.route('/distancematrix/:originLat/:originLng/:DestLat/:DestLng').get((req, res) => {
    var origin = [`${req.params.originLat},${req.params.originLng}`];
    var destination = [`${req.params.DestLat},${req.params.DestLng}`];

    Distance.key(process.env.GOOGLE_MAP_API_KEY);
    Distance.matrix(origin, destination, function (err, result) {
        if (!err) {
            var distancematrix = {
                distance: (parseFloat(result.rows[0].elements[0].distance.text) * 0.621371).toFixed(2),
                duration: (result.rows[0].elements[0].duration.text).substr(0, (result.rows[0].elements[0].duration.text).indexOf(' ')),
                unit: (result.rows[0].elements[0].duration.text).substr((result.rows[0].elements[0].duration.text).indexOf(' ') + 1)
            }
            res.json(distancematrix);
        }
    })
});

module.exports = router;