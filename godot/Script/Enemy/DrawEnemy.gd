extends TextureButton

onready var StartGame = get_parent().get_parent().get_node(".")
onready var MainGame = get_parent().get_parent().get_parent().get_node(".")
onready var ServerConnect = get_node("/root/Main/ServerConnect")

onready var CardBack = load("res://Assets/CardDeck2.png")
onready var CardBackBorder = load("res://Assets/CardDeckBorder.png")
onready var CardBackLock = load("res://Assets/CardDeckLock.png")

func _process(delta):
	if(StartGame.enemyLock):
		texture_normal = CardBackLock
	elif(!MainGame.myTurn):
		texture_normal = CardBackBorder
	else:
		texture_normal = CardBack
