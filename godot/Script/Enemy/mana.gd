extends Control

var mana = 20

func _ready():
	pass # Replace with function body.

func _physics_process(delta):
	$Label.text = String(mana)
	$ManaProgress.value = mana


# Called every frame. 'delta' is the elapsed time since the previous frame.
#func _process(delta):
#	pass
