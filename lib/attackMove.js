'use strict';

module.exports = function(res, moveNumber, grid) {
    var positionToAttack = grid.getPositionForAttack();

    res.send({
        type: "ATTACK",
        gridReference: positionToAttack
    });

    console.log('ATTACK on ' + positionToAttack);
};
