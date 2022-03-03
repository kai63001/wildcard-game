extends Control

onready var timer = get_parent().get_parent().get_node("Timer")
onready var pb = get_node("TimerProgressBarEnemy")
onready var StartGame = get_parent().get_parent().get_node(".")
onready var ServerConnect = get_node("/root/Main/ServerConnect")

func _ready():
	timer.wait_time = 60

func _process(delta):
	if(!get_node("/root/Main/MainGame").myTurn):
		pb.value = timer.time_left
	else:
		pb.value = 60
		timer.wait_time = 60

func _on_StartGame_enemyCountChangeSignal(value):
	if(!get_node("/root/Main/MainGame").myTurn):
		timer.wait_time = 60
		pb.value = 60
		timer.start(60);
	else:
		timer.wait_time = 60
		pb.value = 60
		timer.stop(60);
