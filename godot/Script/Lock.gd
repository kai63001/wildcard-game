extends Control

onready var shield = load("res://Assets/Lock/shield.png")
onready var sword = load("res://Assets/Lock/sword.png")
onready var shield_hover = load("res://Assets/Lock/shield_hover.png")
onready var sword_hover = load("res://Assets/Lock/sword_hover.png")
onready var LockButton = get_node("TextureButton")
onready var StartGame = get_parent().get_parent().get_node(".")
onready var ServerConnect = get_node("/root/Main/ServerConnect")
onready var MainGame = get_parent().get_parent().get_parent().get_node(".")

signal lock()

func _process(delta):
	if StartGame.myCount > StartGame.enemyCount:
		LockButton.texture_normal = sword
		LockButton.texture_hover = sword_hover
	else:
		LockButton.texture_normal = shield
		LockButton.texture_hover = shield_hover


func _on_TextureButton_pressed():
	if(MainGame.myTurn):
		StartGame.lock = true
		StartGame.changeTurn()
		ServerConnect._sendStateData(2,String("lock"))
		emit_signal("lock")
