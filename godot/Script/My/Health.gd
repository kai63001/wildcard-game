extends Control

var HP = 50;
onready var HPProgress = get_node("HealthProgress")
onready var StartGame = get_parent().get_parent().get_node(".")

signal changeMyCountBar(value)

func _ready():
	pass # Replace with function body.

func _on_DrawCard_myCountValue(count):
	if(count > 12):
		var calHP = count - 12
		HP -= calHP
		print(HP)
		HPProgress.value = HP
		StartGame.myCount = 0
		emit_signal("changeMyCountBar",StartGame.myCount)
