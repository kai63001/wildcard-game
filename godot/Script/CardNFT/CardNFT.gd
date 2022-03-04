extends Node2D

var selected = false;
var mouse_offset

var NFTId = 2

onready var NFT = get_parent().get_parent().get_node(".")

func _ready():
	var nftText = load("res://Assets/NFT/"+String(NFTId)+".png")
	$NFT.texture = nftText

func _physics_process(_delta):
	if(selected):
		floowMouse()
		
func floowMouse():
	position = get_global_mouse_position() + mouse_offset

func _callNFT():
	print(get_global_mouse_position().y + mouse_offset.y)
	if(get_global_mouse_position().y + mouse_offset.y < -120):
		queue_free()
		NFT.cal()

func _on_TextureButton_button_down():
	mouse_offset = position - get_global_mouse_position()
	selected = true
	NFT.selected = true

func _on_TextureButton_button_up():
	selected = false
	NFT.selected = false
	NFT.cal()
	_callNFT()

func _on_TextureButton_mouse_exited():
	selected = false
	NFT.selected = false
	NFT.cal()


func _on_TextureButton_focus_exited():
	selected = false
	NFT.selected = false
	NFT.cal()
