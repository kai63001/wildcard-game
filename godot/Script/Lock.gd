extends Control

onready var shield = load("res://Assets/Lock/shield.png")
onready var sword = load("res://Assets/Lock/sword.png")
onready var shield_hover = load("res://Assets/Lock/shield_hover.png")
onready var sword_hover = load("res://Assets/Lock/sword_hover.png")
onready var LockButton = get_node("TextureButton")
onready var StartGame = get_parent().get_parent().get_node(".")


func _process(delta):
	if StartGame.myCount > StartGame.enemyCount:
		LockButton.texture_normal = sword
		LockButton.texture_hover = sword_hover
	else:
		LockButton.texture_normal = shield
		LockButton.texture_hover = shield_hover
