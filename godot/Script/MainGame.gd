extends Node2D

var myTurn = false;

func _ready():
	#instance RandomBox
	var randomBox_resource = load("res://Screen/RandomBox.tscn")
	var randomBox = randomBox_resource.instance()
	add_child(randomBox)
	
func _instanceStartGame():
	var StartedGame_resource = load("res://Screen/StartedGame.tscn")
	var StartedGame = StartedGame_resource.instance()
	add_child(StartedGame)
	
