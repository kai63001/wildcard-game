extends TextureButton

signal myCountValue(count)

onready var StartGame = get_parent().get_parent().get_node(".")
onready var MainGame = get_parent().get_parent().get_parent().get_node(".")
onready var ServerConnect = get_node("/root/Main/ServerConnect")

onready var CardBack = load("res://Assets/CardDeck2.png")
onready var CardBackBorder = load("res://Assets/CardDeckBorder.png")
onready var CardBackLock = load("res://Assets/CardDeckLock.png")

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
	_countCardNumber()
	if(StartGame.lock):
		texture_normal = CardBackLock
	elif(MainGame.myTurn):
		texture_normal = CardBackBorder
	else:
		texture_normal = CardBack

func _countCardNumber():
	if(StartGame.lock):
		$Label.hide()
	else:
		$Label.show()
		$Label.text = String(len(StartGame.cardNumber))
		
func _watcher():
	var CardFlip_resource = load("res://Item/CardFlip/CardFlipOne.tscn")
	var CardFlip = CardFlip_resource.instance()
	CardFlip.set_position(Vector2(10,0))
	$".".add_child(CardFlip);
	$".".get_child($".".get_child_count()-1).cardNumber = StartGame.cardNumber[0]
	$".".get_child($".".get_child_count()-1).watcher = true
	
func shuffle():
	$AnimationPlayer.play("shuffle")
	yield(get_tree().create_timer(0.5), "timeout")
	$AnimationPlayer.play("shuffle")
	yield(get_tree().create_timer(0.5), "timeout")	
	randomize()
	StartGame.cardNumber.shuffle()
