extends Node2D

var cardNumber = [];
var myCount = 0;

func _ready():
	_randomCardNumber();

func _on_DrawCard_pressed():
	print("test")

func _randomCardNumber():
	for i in 41:
		var rng = RandomNumberGenerator.new()
		rng.randomize()
		var num = rng.randi_range(1, 6)
		cardNumber.append(num)
