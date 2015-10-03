var _ = require('lodash');

module.exports = function(gridSize) {
    var self = this;

    var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
        'O', 'P', 'Q', 'R', 'S', 'T', 'U','V', 'W', 'X', 'Y', 'Z'];

    var columnSize = alphabet.indexOf(gridSize.slice(0,1)) + 1;
    var rowSize = parseInt(gridSize.slice(1, gridSize.length));

    var grid = {};

    _.each(alphabet.slice(0, columnSize), function(column) {
        for (i = 1; i < rowSize + 1; i++) {
            var position = column.toString() + i;
            grid[position] = "not discovered";
        }
    });

    self.getPosition = function(position) {
        return grid[position];
    };

    self.setPosition = function(position, information) {
        grid[position] = information;
    };

    self.columns = function() {
        return alphabet.slice(0, columnSize);
    };

    self.rowSize = function() {
        return rowSize;
    };

    self.findAvailable = function(position) {
        var positionInColumns = self.columns().indexOf(position.slice(0,1));
        var rowNumber = parseInt(position.slice(1, position.length));

        var availablePosition = [];

        if (positionInColumns >= 0) {
            availablePosition.push(self.columns()[positionInColumns - 1].toString() + rowNumber);
        }

        if (positionInColumns < self.columns().length) {
            availablePosition.push(self.columns()[positionInColumns + 1].toString() + rowNumber);
        }
        //
        //if(rowNumber > 1) {
        //    availablePosition.push(self.columns())
        //}
    };

    return self;
};