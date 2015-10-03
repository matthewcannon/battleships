var express = require('express');
var router = express.Router();
var _ = require('lodash');
var attackMove = require('../lib/attackMove');
var start, ships, moveNumber;
var ugly = ['A1', 'B1', 'C1', 'D1', 'E1'];
var columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];
var rows;
var Grid = require('../model/grid');

var opponentsGrid, ourGrid;

router.post('/START', function (req, res, next) {
    start = req.body;
    ships = start.ships;
    rows = start.gridSize.substr(1, 3);

    opponentsGrid = new Grid(start.gridSize);
    ourGrid = new Grid(start.gridSize);

    moveNumber = 0;

    res.status(200);
    res.send('');
});

router.get('/PLACE', function (req, res, next) {
    var shipPosition = {
        gridReference: ugly[0],
        orientation: 'horizontal'
    };

    ugly.splice(0, 1);

    res.status(200);
    res.send(shipPosition);
});

router.get('/MOVE', function (req, res, next) {
    console.log(moveNumber);

    attackMove(res, moveNumber, opponentsGrid.columns(), opponentsGrid.rowSize());

    ++moveNumber;

    res.status(200);
});

router.post('/PLACE', function (req, res, next) {
    var placeInfo = req.body;

    _.each(placeInfo.gridReferences, function (reference) {
        ourGrid.setPosition(reference, "ship");
    });

    res.status(200);
});

router.post('/HIT', function (req, res, next) {
    var attackInformation = req.body;

    if (attackInformation.attacker == 'titanic') {
        opponentsGrid.setPosition(attackInformation.gridReference, "incomplete ship");
    } else {
        ourGrid.setPosition(attackInformation.gridReference, "incomplete ship");
    }

    res.status(200);
    res.send('');
});

router.post('/MISS', function (req, res, next) {
    var attackInformation = req.body;

    if (attackInformation.attacker == 'titanic') {
        opponentsGrid.setPosition(attackInformation.gridReference, "missed");
    } else {
        ourGrid.setPosition(attackInformation.gridReference, "missed");
    }

    res.status(200);
    res.send('');

});

router.post('/SCAN', function (req, res, next) {
    var attackInformation = req.body;

    _.each(attackInformation.gridReferences, function (reference) {
        opponentsGrid.setPosition(reference, "mine");
    });

    res.status(200);
    res.send('');
});

router.post('/HIT_MINE', function (req, res, next) {
    var attackInformation = req.body;

    if (attackInformation.attacker == 'titanic') {
        opponentsGrid.setPosition(attackInformation.gridReference, "mine");
    } else {
        ourGrid.setPosition(attackInformation.gridReference, "mine");
    }

    res.status(200);
    res.send('');
});

module.exports = router;
