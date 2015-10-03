var Grid = require("../model/grid");

describe("it", function() {

   it("bla", function() {
       var grid = new Grid("B2");

       var positionForAttack = grid.getPositionForAttack();

       expect(positionForAttack).toEqual(["A1"]);
   });

   it("with incomplete ship", function() {
       var grid = new Grid("B2");
       grid.setPosition("B1", "incomplete ship");

       var positionForAttack = grid.getPositionForAttack();

       expect(positionForAttack).toEqual(["A1", "B2"]);
   });

   it("with other incomplete ship", function() {
       var grid = new Grid("B2");
       grid.setPosition("A2", "incomplete ship");

       var positionForAttack = grid.getPositionForAttack();

       expect(positionForAttack).toEqual(["B2", "A1"]);
   });

   it("with mines", function() {
       var grid = new Grid("B2");
       grid.setPosition("A2", "incomplete ship");
       grid.setPosition("A1", "mine")

       var positionForAttack = grid.getPositionForAttack();

       expect(positionForAttack).toEqual(["B2"]);
   });


});