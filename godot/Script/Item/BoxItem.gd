extends Sprite

onready var player = get_node("AnimationPlayer")
var num = 0

func _on_TextureButton_pressed():
	var node = get_node("../.")
	print(node.choseBox)
	if(node.choseBox == false):
		node.choseBox = true
		player.play("ItemShake");
		yield(get_tree().create_timer(2.0), "timeout")
		get_node("TextureButton").queue_free()
		var rng = RandomNumberGenerator.new()
		rng.randomize()
		num = rng.randi_range(1, 6)
		print(num)
		var number_resourc = load("res://Item/Number/"+String(num)+".tscn")
		var number = number_resourc.instance()
		add_child(number)
		player.stop();
		node._clearRandomBox();

