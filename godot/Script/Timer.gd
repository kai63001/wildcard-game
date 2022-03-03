extends Control

onready var timer = get_parent().get_parent().get_node("Timer")
onready var pb = get_node("TimerProgressBarMy")
onready var StartGame = get_parent().get_parent().get_node(".")
onready var ServerConnect = get_node("/root/Main/ServerConnect")
onready var pbEnemy = get_parent().get_parent().get_node("EnemyUI/TimerEnemy/TimerProgressBarEnemy")

func _ready():
	timer.wait_time = 60

func _process(delta):
	if(get_node("/root/Main/MainGame").myTurn):
		pb.value = timer.time_left


func _on_Timer_timeout():
	if(get_node("/root/Main/MainGame").myTurn):
		StartGame.changeTurn()
		ServerConnect._sendStateData(1,String(StartGame.myCount))
		timer.wait_time = 60
		pb.value = 60
		pbEnemy.value = 60

func _on_DrawCard_myCountValue(count):
	if(get_node("/root/Main/MainGame").myTurn):
		timer.start(60);
		pb.value = 60
