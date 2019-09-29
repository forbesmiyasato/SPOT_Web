const router = require('express').Router();
let Parkinglot = require('../Models/ParkingLot');
let Location = require('../Models/Location');

router.route('/Location/:id/').get((req, res) => {
    Parkinglot.findById(req.params.id)
        .then(parking => res.json(parking))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/Location/:id/Parking/add').post((req, res) => {
    const Name = req.body.Name;
    const Parkings = req.body.Parkings;
    const Lat = req.body.Lat;
    const Lng = req.body.Lng;
    Location.findById(req.params.id, function (err, location) {
        if (err) {
            console.log(err)
        } else {
            const newParkingLot = new Parkinglot({
                Name,
                Parkings,
                Lat,
                Lng
            });

            newParkingLot.save()
                .then(() => res.json('Parking Added'))
                .catch(err => res.status(400).json('Error: ' + err));

            location.ParkingLots.push(newParkingLot);
            location.save();
        }
    })
});

router.route('/:id').get((req, res) => {
    Parkinglot.findById(req.params.id)
        .then(location => res.json(location))
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;