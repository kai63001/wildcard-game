extends Control

onready var timer = get_node("Timer")
onready var pb = get_node("TimerProgressBar")

func _ready():
	timer.wait_time = pb.value
	print(timer.wait_time)

func _process(delta):
	pb.value = timer.time_left
