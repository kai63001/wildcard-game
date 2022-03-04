extends Control

onready var animation = get_node("AnimationPlayer")
var moveNFT = false
var played = false

func _ready():
	pass # Replace with function body.



func _input(event):
	if event is InputEventMouseButton:
		print("Mouse Click/Unclick at: ", event.position)
	elif event is InputEventMouseMotion:
		print("Mouse Motion at: ", event.position)
		_getMoveNFT(event.position)
		_moveNFT()

func _getMoveNFT(p):
	print(p)
	if(!moveNFT):
		if((p.x > 300 && p.x < 700) && (p.y > 555)):
			moveNFT = true
	else:
		if(p.y < 330 || (p.x < 300) || (p.x > 700)):
			moveNFT = false
			print("FALSE")

func _moveNFT():
	if(moveNFT && !played):
		animation.play("moveNFT")
		played = true
	elif(!moveNFT && played):
		animation.stop()
		played = false
		animation.play("moveNFTback")		
