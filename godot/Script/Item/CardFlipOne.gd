extends TextureRect

onready var ap: AnimationPlayer = $AnimationPlayer
var is_face_up = false
var front_texture: Texture
export var back_texture: Texture
var cardNumber = 1;
var watcher = false
var runned = false
func _ready():
	set_texture()
	flip();
	
func set_texture(a_texture = null):
	front_texture = load("res://Assets/CardNumber/Card"+String(cardNumber)+".png")
	if a_texture == null:
		texture = front_texture if is_face_up else back_texture
	else:
		texture = a_texture

func flip_texture():
	is_face_up = !is_face_up
	set_texture()
	
func flip():
	ap.play("flip")


func _on_TextureButton_pressed():
	#$".".flip()
	pass
	
func _on_AnimationPlayer_animation_finished(anim_name):
	if(anim_name == "flip" && !runned):
		if(!watcher):
			ap.play("moveCard");
		else:
			yield(get_tree().create_timer(2.0), "timeout")
			runned = true
			ap.play("flip")
			yield(get_tree().create_timer(0.2), "timeout")
			queue_free()
