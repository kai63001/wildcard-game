extends Node2D

onready var animation = get_node("AnimationPlayer")
var moveNFT = false
var played = false
var MaxMyNftSize
var selected = false
onready var Main = get_node("/root/Main")

func _ready():
	animation.play("moveNFT")
	played = true
	MaxMyNftSize = 5
	_generateNFT()
	cal()
	
func _generateNFT():
	var CardNFT = load("res://Screen/CardNFT/CardNFT.tscn")
	for i in Main.myNFT:
		var card = CardNFT.instance()
		card.NFTId = i
		get_node("Card").add_child(card)

func _input(event):
	if event is InputEventMouseButton:
		print("Mouse Click/Unclick at: ", event.position)
	elif event is InputEventMouseMotion:
		_getMoveNFT(event.position)
		_moveNFT()
		cal()
		
func cal():
	#calu resiponsive card
	var data = ((MaxMyNftSize - self.get_node("Card").get_children().size())  * (130 / 2)) - 40
	for _i in self.get_node("Card").get_children():
		_i.set_position(Vector2(data , 0))
		data += 130

func _getMoveNFT(p):
	if(!moveNFT):
		if((p.x > 300 && p.x < 800) && (p.y > 555)):
			moveNFT = true
	else:
		if((p.y < 330 || (p.x < 300) || (p.x > 800)) && !selected):
			moveNFT = false

func _moveNFT():
	if(moveNFT && !played):
		animation.play("moveNFT")
		played = true
		cal()
	elif(!moveNFT && played):
		cal()
		animation.stop()
		played = false
		animation.play("moveNFTback")

