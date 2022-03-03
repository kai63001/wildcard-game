extends Control

var HP = 30;
onready var HPProgress = get_node("HealthProgress")
onready var StartGame = get_parent().get_parent().get_node(".")
onready var HPENEMYProgress = get_parent().get_parent().get_node("EnemyUI/Health/HealthProgress")
onready var HPENEMY = get_parent().get_parent().get_node("EnemyUI/Health")

signal changeMyCountBar(value)
signal changeEnemyCountBar(value)


func _ready():
	pass # Replace with function body.

func _on_DrawCard_myCountValue(count):
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
		var calHP = 12 - StartGame.enemyCount
		HPENEMY.HP -= calHP
		HPENEMYProgress.value = HPENEMY.HP
		StartGame.myCount = 0
		StartGame.enemyCount = 0
		emit_signal("changeMyCountBar",0)
		emit_signal("changeEnemyCountBar",0)


func _on_TimerMy_myCountValue(value):
	_on_DrawCard_myCountValue(value)
