extends Node2D

var selected = false;
var mouse_offset
var mana = false

onready var NFT = get_parent().get_parent().get_node(".") 

func _physics_process(_delta):
	if(selected):
		floowMouse()
		
func floowMouse():
	position = get_global_mouse_position() + mouse_offset



func _on_Area2D_input_event(_viewport, event, _shape_idx):
	if event is InputEventMouseButton and event.button_index == BUTTON_LEFT:
		if event.pressed:
			print("press")
			mouse_offset = position - get_global_mouse_position()
			selected = true
			NFT.selected = true
		else:
			selected = false
			NFT.selected = false
			NFT.cal()


func _on_Area2D_mouse_exited():
	selected = false
	NFT.selected = false
	NFT.cal()
