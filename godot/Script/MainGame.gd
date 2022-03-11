extends Node2D

var myTurn = false;
var StartedGame;

onready var ServerConnect = get_node("/root/Main/ServerConnect")
onready var Main = get_node("/root/Main")

func _ready():
	#instance RandomBox
	var randomBox_resource = load("res://Screen/RandomBox.tscn")
	var randomBox = randomBox_resource.instance()
	add_child(randomBox)
	
func _instanceStartGame():
	var StartedGame_resource = load("res://Screen/StartedGame.tscn")
	StartedGame = StartedGame_resource.instance()
	add_child(StartedGame)
	
func endGame(who):
	StartedGame.queue_free()
	var EndGame_resource = load("res://Screen/EndGame.tscn")
	print("end Game")
	var endGameNode = EndGame_resource.instance()
	endGameNode.who = who;
	$BackGround/Panel.add_child(endGameNode)
	ServerConnect._leaveMath()
	yield(get_tree().create_timer(4.0), "timeout")
	endGameNode.queue_free()
	Main.showUI()
	
