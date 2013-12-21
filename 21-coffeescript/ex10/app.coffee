class Robot
  makingTea: ->
    console.log 'I am making tea.'

class Marvin extends Robot
  makingTea: ->
    console.log 'I am Marvin.'
    super

  robot = new Robot
  robot.makingTea()

  marvin = new Marvin
  marvin.makingTea()