extends TextureButton



func _ready():
	mouse_default_cursor_shape = Control.CURSOR_POINTING_HAND
	connect("button_down",self,"drag")
	connect("button_up",self,"drop")

func drag():
	queue_free()
	print("drag")

func drop():
	print("drop")
