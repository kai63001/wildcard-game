extends Node2D
export (String) var server_url = ""
export (String) var app_id = ""

var moralis = JavaScript.get_interface("Moralis")


func _ready():
	$Control/Address/Label.text = moralis.User.current().get("ethAddress").substr(0,6)+"..."
	pass

func _on_Exit_pressed():
	get_tree().change_scene("res://Screen/Login.tscn")
