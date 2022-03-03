extends Node2D

var cardNumber = [1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,5,5,5,5,5,5,6,6,6,6];
#var cardNumber = [6,6,6,6,6,6,6,6,6,6];
var myCount = 0;
var enemyCount = 0;
onready var MainGame = get_parent().get_node(".")
onready var ServerConnect = get_node("/root/Main/ServerConnect")

var lock = false;
var enemyLock = false;

signal enemyCountChangeSignal(value)

func _ready():
	_randomCardNumber();
	_checkMyTurn();

func _randomCardNumber():
	randomize()
	cardNumber.shuffle()
	print(cardNumber)

func _checkMyTurn():
	$Timer.start()
	
func changeTurn():
	print("change turn");
	MainGame.myTurn = !MainGame.myTurn
	
#Enemy Zone
func enemyCountChange(count):
	enemyCount = count
	emit_signal("enemyCountChangeSignal",count)
	changeTurn()
	
func enemyGetLocked():
	enemyLock = true
	emit_signal("enemyCountChangeSignal",enemyCount)
	changeTurn()
