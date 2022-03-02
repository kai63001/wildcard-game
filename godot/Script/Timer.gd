extends Control

onready var timer = get_node("Timer")
onready var pb = get_node("TimerProgressBar")
onready var StartGame = get_parent().get_parent().get_node(".")

func _ready():
	timer.wait_time = pb.value
	print(timer.wait_time)

func _process(delta):
	if(get_node("/root/Main/MainGame").myTurn):
		pb.value = timer.time_left


func _on_Timer_timeout():
	StartGame.changeTurn()
