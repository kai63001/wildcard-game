extends Control

var xPos = 100;
var yPos = 0;

var choseBox = false;

func _ready():
	xPos = (get_viewport_rect().size.x / 2) - 200
	yPos = get_viewport_rect().size.y / 2
	for n in 3:
		var randomBox_resource = load("res://Item/BoxItem.tscn")
		var randomBox = randomBox_resource.instance()
		randomBox.set_position(Vector2(xPos,yPos))
		add_child(randomBox)
		xPos += 200
		
func _clearRandomBox():
	for n in [0,2,3]:
		if(n == 0):
			if(get_node("BoxItem").num == 0):
				get_node("BoxItem").queue_free()
		elif(get_node("@BoxItem@"+String(n)).num == 0):
			get_node("@BoxItem@"+String(n)).queue_free()
