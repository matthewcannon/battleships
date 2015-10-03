var express = require('express');
var router = express.Router();
var _ = require('lodash');

var start, ships, moveNumber;

var ugly = ['A1', 'B1', 'C1', 'D1', 'E1'];
var columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];

router.post('/START', function(req, res, next) {
    start = req.body;
    ships = start.ships;

    _.each(ships, function(ship) {
        console.log(ship);
    });

    moveNumber = 0;

    res.status(200);
    res.send('');
});

router.get('/PLACE', function(req, res, next) {
    var shipPosition = {
        gridReference: ugly[0],
        orientation: 'horizontal'
    }

    ugly.splice(0, 1);

    res.status(200);
    res.send(shipPosition);
});

router.get('/MOVE', function(req, res, next) {
    var columnPos = moveNumber % columns.length;
    res.send({
        type: "ATTACK",
        gridReference: columns[columnPos] + "1"
    });
    console.log(moveNumber);

    res.status(200);
    ++moveNumber;
});

router.post('/PLACE', function(req, res, next) {
    console.log(req.body);

    res.status(200);
});

router.post('/HIT', function(req, res, next) {
    console.log(req.body);

    res.status(200);
    res.send('');
});

router.post('/MISS', function(req, res, next) {
    console.log(req.body);

    res.status(200);
    res.send('');

});

router.post('/SCAN', function(req, res, next) {
    console.log(req.body);

    res.status(200);
    res.send('');
});

router.post('/HIT_MINE', function(req, res, next) {
    console.log(req.body);

    res.status(200);
    res.send('');
});

module.exports = router;
