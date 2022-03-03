extends Control

var HP = 30;
onready var HPProgress = get_node("HealthProgress")
onready var StartGame = get_parent().get_parent().get_node(".")
onready var HPENEMYProgress = get_parent().get_parent().get_node("EnemyUI/Health/HealthProgress")
onready var HPENEMY = get_parent().get_parent().get_node("EnemyUI/Health")
onready var CameraMain =  get_node("/root/Main/Camera2D")

signal changeMyCountBar(value)
signal changeEnemyCountBar(value)

func _process(delta):
	$Label.text = String(HP)

func _on_DrawCard_myCountValue(count):
	if(count > 12):
		var calHP = count - 12
		HP -= calHP
		print(HP)
		CameraMain.isShake = true
		HPProgress.value = HP
		StartGame.myCount = 0
		StartGame.enemyCount = 0
		StartGame.lock = false
		StartGame.enemyLock = false
		emit_signal("changeMyCountBar",0)
		emit_signal("changeEnemyCountBar",0)
	elif(count == 12):
		var calHP = 12 - StartGame.enemyCount
		HPENEMY.HP -= calHP
		HPENEMYProgress.value = HPENEMY.HP
		StartGame.myCount = 0
		StartGame.enemyCount = 0
		StartGame.lock = false
		StartGame.enemyLock = false
		emit_signal("changeMyCountBar",0)
		emit_signal("changeEnemyCountBar",0)
	elif(StartGame.lock == true && StartGame.enemyLock == true):
		if(StartGame.enemyCount > StartGame.myCount):
			var calHP = StartGame.enemyCount - StartGame.myCount
			HP -= calHP
			CameraMain.isShake = true			
			HPProgress.value = HP
		elif(StartGame.enemyCount < StartGame.myCount):
			var calHP = StartGame.myCount - StartGame.enemyCount
			HPENEMY.HP -= calHP
			HPENEMYProgress.value = HPENEMY.HP
		StartGame.myCount = 0
		StartGame.enemyCount = 0
		StartGame.lock = false
		StartGame.enemyLock = false
		emit_signal("changeMyCountBar",0)
		emit_signal("changeEnemyCountBar",0)
	$Label.text = String(HP)


func _on_TimerMy_myCountValue(value):
	_on_DrawCard_myCountValue(value)


func _on_Lock_lock():
	_on_DrawCard_myCountValue(StartGame.myCount)
