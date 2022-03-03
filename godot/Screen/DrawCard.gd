extends TextureButton

signal myCountValue(count)

onready var StartGame = get_parent().get_parent().get_node(".")
onready var MainGame = get_parent().get_parent().get_parent().get_node(".")
onready var ServerConnect = get_node("/root/Main/ServerConnect")

onready var CardBack = load("res://Assets/CardDeck.png")
onready var CardBackBorder = load("res://Assets/CardDeckBorder.png")

func _on_DrawCard_pressed():
	if(MainGame.myTurn):
		var CardFlip_resource = load("res://Item/CardFlip/CardFlipOne.tscn")
		var CardFlip = CardFlip_resource.instance()
		CardFlip.set_position(Vector2(10,0))
		$".".add_child(CardFlip);
		$".".get_child($".".get_child_count()-1).cardNumber = StartGame.cardNumber[0]
		StartGame.myCount += StartGame.cardNumber[0];
		StartGame.cardNumber.remove(0)
		StartGame.changeTurn()
		ServerConnect._sendStateData(1,String(StartGame.myCount))
		emit_signal("myCountValue",StartGame.myCount)

func _process(delta):
	if(MainGame.myTurn):
		texture_normal = CardBackBorder
	else:
		texture_normal = CardBack
