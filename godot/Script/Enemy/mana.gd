extends Control

var mana = 20

func _ready():
	pass # Replace with function body.

func _physics_process(delta):
	$Label.text = String(mana)
	$ManaProgress.value = mana

func _on_Health_endTurnMana():
	mana = clamp(mana + 3,0,20)
