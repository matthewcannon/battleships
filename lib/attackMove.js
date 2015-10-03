'use strict';

module.exports = function(res, moveNumber, grid) {
    var column = grid.columns()[(Math.floor(Math.random() * grid.columns().length - 1)) + 1];
    var row = (Math.floor(Math.random() * grid.rowSize())) + 1;

    grid.findAvailable(column + row);

    res.send({
        type: "ATTACK",
        gridReference: column + row
    });

    console.log('ATTACK on ' + column + row);
};
