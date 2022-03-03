extends Control

var HP = 50;
onready var HPProgress = get_node("HealthProgress")
onready var StartGame = get_parent().get_parent().get_node(".")

signal changeMyCountBar(value)
signal changeEnemyCountBar(value)

func _ready():
	pass # Replace with function body.


func _on_StartGame_enemyCountChangeSignal(count):
	print("Enemy Count : %s " % count)
	if(count > 12):
		var calHP = count - 12
		HP -= calHP
		print(HP)
		HPProgress.value = HP
		StartGame.myCount = 0
		StartGame.enemyCount = 0
		emit_signal("changeMyCountBar",0)
		emit_signal("changeEnemyCountBar",0)
	elif(count == 12):
		StartGame.myCount = 0
		StartGame.enemyCount = 0
		emit_signal("changeMyCountBar",0)
		emit_signal("changeEnemyCountBar",0)
