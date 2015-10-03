var Grid = require("../model/grid");

describe("it", function() {

   it("bla", function() {
       var grid = new Grid("B2");

       var positionForAttack = grid.getPositionForAttack();

       expect(positionForAttack).toEqual(["A1"]);
   });

   it("bla", function() {
       var grid = new Grid("B2");
       grid.setPosition("B1", "incomplete ship");

       var positionForAttack = grid.getPositionForAttack();

       expect(positionForAttack).toEqual(["A1", "A2", "B2"]);
   });


});