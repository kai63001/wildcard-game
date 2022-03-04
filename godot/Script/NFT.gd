extends Control

onready var animation = get_node("AnimationPlayer")
var moveNFT = false
var played = false
var MaxMyNftSize


func _ready():
	animation.play("moveNFT")
	played = true
	MaxMyNftSize = 5

func _input(event):
	if event is InputEventMouseButton:
		print("Mouse Click/Unclick at: ", event.position)
	elif event is InputEventMouseMotion:
		_getMoveNFT(event.position)
		_moveNFT()
		
func _physics_process(delta):
	#calu resiponsive card
	var data = ((MaxMyNftSize - self.get_node("Card").get_children().size())  * (130 / 2)) - 40
	for _i in self.get_node("Card").get_children():
		_i.set_position(Vector2(data , 0))
		data += 130

func _getMoveNFT(p):
	if(!moveNFT):
		if((p.x > 300 && p.x < 700) && (p.y > 555)):
			moveNFT = true
	else:
		if(p.y < 330 || (p.x < 300) || (p.x > 700)):
			moveNFT = false

func _moveNFT():
	if(moveNFT && !played):
		animation.play("moveNFT")
		played = true
	elif(!moveNFT && played):
		animation.stop()
		played = false
		animation.play("moveNFTback")		

