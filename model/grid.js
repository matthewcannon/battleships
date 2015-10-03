var _ = require('lodash');

module.exports = function (gridSize) {
    var self = this;

    var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
        'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    var columnSize = alphabet.indexOf(gridSize.slice(0, 1)) + 1;
    var rowSize = parseInt(gridSize.slice(1, gridSize.length));

    var grid = {};

    _.each(alphabet.slice(0, columnSize), function (column) {
        for (i = 1; i < rowSize + 1; i++) {
            var position = column.toString() + i;
            grid[position] = "not discovered";
        }
    });

    self.getPosition = function (position) {
        return grid[position];
    };

    self.setPosition = function (position, information) {
        grid[position] = information;
    };

    self.columns = function () {
        return alphabet.slice(0, columnSize);
    };

    self.rowSize = function () {
        return rowSize;
    };

    self.getPositionForAttack = function () {
        var candidatePositions = [];

        var incompletePositionsForShips = [];

        if(Math.random() < 0.1) {
            incompletePositionsForShips = _.findLast(Object.keys(grid), function (position) {
                return grid[position] == "incomplete ship";
            });
        }

        if (incompletePositionsForShips != undefined && incompletePositionsForShips.length > 0) {

            candidatePositions.push(self.findAvailable(incompletePositionsForShips));

            if(candidatePositions.length > 0) {

                return _.first(_.flatten(candidatePositions));
            } else {
                return _.first(Object.keys(grid), function (pos) {
                    return grid[pos] == "not discovered";
                });
            }

        } else {
            var first = _.first(Object.keys(grid), function (pos) {
                return grid[pos] == "not discovered";
            });

            candidatePositions.push(first);
            return _.first(candidatePositions);
        }
    };

    self.findAvailable = function (position) {
        var originalPosition = position;
        var positionInColumns = self.columns().indexOf(position.slice(0, 1));

        var rowNumber = parseInt(originalPosition.substr(1, 3));

        var availablePositions = [];

        if (positionInColumns > 0) {
            availablePositions.push(self.columns()[positionInColumns - 1] + rowNumber);
        }

        if (positionInColumns < self.columns().length -1) {
            availablePositions.push(self.columns()[positionInColumns + 1] + rowNumber);
        }

        if(rowNumber > 1) {
            availablePositions.push(self.columns()[positionInColumns] + (rowNumber - 1).toString());
        }

        if (rowNumber < rowSize) {
            availablePositions.push(self.columns()[positionInColumns] + (rowNumber + 1).toString());
        }

        return _.filter(availablePositions, function(position) {
            return grid[position] == "not discovered";
        });
    };

    self.grid = grid;

    return self;
};
