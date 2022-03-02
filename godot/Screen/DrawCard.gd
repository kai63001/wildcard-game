extends TextureButton

func _on_DrawCard_pressed():
	var CardFlip_resource = load("res://Item/CardFlip/CardFlipOne.tscn")
	var CardFlip = CardFlip_resource.instance()
	CardFlip.set_position(Vector2(10,0))
	var card = $".".add_child(CardFlip);
