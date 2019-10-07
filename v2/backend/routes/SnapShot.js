const router = require('express').Router();
let ParkingLot = require('../Models/ParkingLot');
let SnapShot = require('../Models/SnapShot');

//Add snapshot to a parking lot
router.route('/ParkingLot/:id/AddSnapShot').post((req, res) => {
    const OpenParkings = req.body.OpenParkings;
    const ID = req.params.id;
    ParkingLot.findById(ID, function (err, foundParkingLot) {
        if (err) {
            console.log(err)
        } else {
            const NewSnapShot = new SnapShot({
                OpenParkings
            });

            NewSnapShot.save()
                .then(() => res.json('SnapShot Added'))
                .catch(err => res.status(400).json('Error: ' + err));

            foundParkingLot.SnapShots.push(NewSnapShot);
            foundParkingLot.save();
        }
    })
});

//Get snapshots id from parking lot
router.route('/ParkingLot/:id/SnapShots').get((req, res) => {
    ParkingLot.findById(req.params.id, function (err, ParkingLotFound) {
        if (err) {
            console.log(err);
        } else {
            //for (var i = 0; i < ParkingLotFound.SnapShots.length; i++) {
            //    res.json(ParkingLotFound.SnapShots[i]);
            //}
            res.json(ParkingLotFound.SnapShots);
        }
    })
})

//Get latest snapshot data(OpenParkings) from parkinglot
router.route('/ParkingLot/:id/SnapShots/latest').get((req, res) => {
    ParkingLot.findById(req.params.id, function (err, ParkingLotFound) {
        if (err) {
            console.log(err);
        } else {
            SnapShot.findById(ParkingLotFound.SnapShots[0], function (err, SnapShotFound) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(SnapShotFound.OpenParkings);
                };
            })
        };
    })
})

//Get all snapshot data from parking lot
router.route('/ParkingLot/:id/SnapShots/All').get((req, res) => {
    var SnapShotsArray = [];
    var count = 0;
    ParkingLot.findById(req.params.id, function (err, ParkingLotFound) {
        if (err) {
            console.log(err);
        } else {
            //for (var i = 0; i < ParkingLotFound.SnapShots.length; i++) {
            //    SnapShot.findById(ParkingLotFound.SnapShots[i], function (err, SnapShotFound) {
            //        if (err) {
            //            console.log(err);
            //        } else {
            //            SnapShotsArray.push(SnapShotFound);
            //        };
            //    })
            //}
            ParkingLotFound.SnapShots.forEach(function (snapshot) {
                SnapShot.findById(snapshot, function (err, SnapShotFound) {
                    if (err) {
                        console.log(err);
                    } else {
                        SnapShotsArray.push(SnapShotFound)
                        count++;
                        if (count === ParkingLotFound.SnapShots.length) {
                            res.json(SnapShotsArray);
                        }
                    }
                })
            })
        }
    })
})

module.exports = router;