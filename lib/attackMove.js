'use strict';

module.exports = function(res, moveNumber, grid) {
        // var column = grid.columns()[(Math.floor(Math.random() * grid.columns().length - 1)) + 1];
        // var row = (Math.floor(Math.random() * grid.rowSize())) + 1;
        // var positionToAttack = column + row;
    var positionToAttack = grid.getPositionForAttack();

    res.send({
        type: "ATTACK",
        gridReference: positionToAttack
    });

    console.log('ATTACK on ' + positionToAttack);
};
