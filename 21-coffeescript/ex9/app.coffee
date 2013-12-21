class Human
  constructor: (@legs = 2) ->
  growLeg: ->
    @legs++


class Horse extends Human

human = new Human
horse = new Horse

console.log("Horse has #{horse.legs}");

horse.growLeg()
horse.growLeg()

console.log("Horse now has #{horse.legs}");
