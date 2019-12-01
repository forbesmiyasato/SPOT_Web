const router = require('express').Router();
let ParkingLot = require('../Models/ParkingLot');

//Get JSON data for all parking lots
router.route('/ParkingLot/All').get((req, res) => {
    ParkingLot.find()
        .then(location => res.json(location))
        .catch(err => res.status(400).json('Error:' + err));
});

//Get JSON data for one parkinglot
router.route('/ParkingLot/:id').get((req, res) => {
    ParkingLot.findById(req.params.id, function (err, ParkingLotFound) {
        if (err) {
            console.log(err);
        } else {
            res.json(ParkingLotFound);
        }
    })

})

//Add ParkingLot to databse
router.route('/ParkingLot/add').post((req, res) => {
    const Name = req.body.Name;
    const Description = req.body.Description;
    const Lng = req.body.Lng;
    const Lat = req.body.Lat;
    const TotalParkings = req.body.TotalParkings;
    const Image = req.body.Image;

    const NewParkingLot = new ParkingLot({
        Name,
        Description,
        Lng,
        Lat,
        TotalParkings,
        Image
    });

    NewParkingLot.save()
        .then(() => res.json('Location Added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;