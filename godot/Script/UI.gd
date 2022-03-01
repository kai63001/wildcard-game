extends Control

var findMatch = false;

func _on_PlayGame_pressed():
	var node = get_node("/root/Main/ServerConnect")
	if(findMatch == true):
		node._on_CancleFind_pressed()
		findMatch = false;
		$PlayGame/Label.text = "Find Match";
	else:
		node._on_PlayGame_pressed()
		findMatch = true;
		$PlayGame/Label.text = "Cancel";
