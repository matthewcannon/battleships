'use strict';

module.exports = function(res, moveNumber, columns, rows) {
    var columnPos = (Math.floor(Math.random() * columns.length - 1)) + 1
    var row = (Math.floor(Math.random() * rows)) + 1;
    res.send({
        type: "ATTACK",
        gridReference: columns[columnPos] + row
    });
    console.log('ATTACK on ' + columns[columnPos] + row);
};
