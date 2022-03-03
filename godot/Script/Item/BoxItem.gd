extends Sprite

onready var player = get_node("AnimationPlayer")
onready var button = get_node("TextureButton")
var num = 0

func _on_TextureButton_pressed():
	var node = get_node("../../.")
	print(node.choseBox)
	if(node.choseBox == false):
		node.choseBox = true
		player.play("ItemShake");
		yield(get_tree().create_timer(2.0), "timeout")
		var rng = RandomNumberGenerator.new()
		rng.randomize()
		num = rng.randi_range(0, 9)
		print(num)
		var number_resourc = load("res://Item/Number/"+String(num)+".png")
		button.texture_normal = number_resourc
		player.stop();
		node._clearRandomBox();
		node.myPoint = num;
		var server = get_node("/root/Main/ServerConnect")
		server._sendStateData(0,String(num))

