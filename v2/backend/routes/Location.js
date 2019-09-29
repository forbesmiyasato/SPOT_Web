const router = require('express').Router();
let Location = require('../Models/Location');

router.route('/Location').get((req, res) => {
    Location.find()
        .then(location => res.json(location))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/Location/:id/check').get((req, res) => {
    //console.log(req.params.id);
    //res.json ("1000");
    //Location.findById(req.params.id)
    //    .then(location => res.json(location))
    //    .catch(err => res.status(400).json('Error: ' + err));
    Location.findById(req.params.id, function (err, location) {
        if (err) {
            console.log(err);
        } else {
            res.json(location);
        }
    })

})

router.route('/Location/add').post((req, res) => {
    const Name = req.body.Name;

    const newLocation = new Location({
        Name
    });

    newLocation.save()
        .then(() => res.json('Location Added'))
        .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;