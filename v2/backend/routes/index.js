const router = require('express').Router();
let Data = require('../data');
const path = require('path');

//(Landing Page)
router.route('/').get((req, res) => {
   //If need data for landing page;
});

router.route('/:id').get((req, res) => {
    Data.findById(req.params.id)
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;