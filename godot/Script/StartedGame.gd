extends Node2D

var cardNumber = [1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,6,6,6,6,6,6,6,6];
#var cardNumber = [6,6,6,6,6,6,6,6,6,6];
var myCount = 0;
var enemyCount = 0;
onready var MainGame = get_parent().get_node(".")
onready var ServerConnect = get_node("/root/Main/ServerConnect")

var NFTData = {
	1:{
		"AttackID":101,
		"Name":"Sword",
		"Mana": 5
	},
	2:{
		"AttackID":102,
		"Name":"Health",
		"Mana": 8
	},
	3:{
		"AttackID":103,
		"Name":"Watcher",
		"Mana": 6
	},
	4:{
		"AttackID":104,
		"Name":"Lock",
		"Mana": 7
	},
	5:{
		"AttackID":105,
		"Name":"Shuffle",
		"Mana": 12
	}
}

var lock = false;
var enemyLock = false;

signal enemyCountChangeSignal(value)
signal syncTime(value)

func _ready():
	_randomCardNumber();
	_checkMyTurn();
	
func _process(delta):
	if(lock && !enemyLock):
		MainGame.myTurn = false
	elif(enemyLock):
		MainGame.myTurn = true
	_labelCountBar()

func _labelCountBar():
	get_node("MyUI/CountBar/Label").text = String(myCount)
	get_node("EnemyUI/CountBar/Label").text = String(enemyCount)

func _randomCardNumber():
	randomize()
	cardNumber.shuffle()
	print(cardNumber)

func _checkMyTurn():
	$Timer.start(60)
	
func changeTurn():
	print("change turn");
	MainGame.myTurn = !MainGame.myTurn
	$Timer.start(60)
	
#Enemy Zone
func enemyCountChange(count):
	enemyCount = count
	emit_signal("enemyCountChangeSignal",count)
	changeTurn()
	
func enemyGetLocked():
	enemyLock = true
	emit_signal("enemyCountChangeSignal",enemyCount)
	changeTurn()
