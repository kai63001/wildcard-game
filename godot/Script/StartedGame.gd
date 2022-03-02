extends Node2D

var cardNumber = [1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,5,5,5,5,5,5,6,6,6,6];
var myCount = 0;
onready var MainGame = get_parent().get_node(".")

func _ready():
	_randomCardNumber();
	_checkMyTurn();

func _randomCardNumber():
	randomize()
	cardNumber.shuffle()
	print(cardNumber)

func _checkMyTurn():
	if(MainGame.myTurn):
		$MyUI/Timer/Timer.start()
