extends TextureProgress


func _on_DrawCard_myCountValue(count):
	value = count * 8;


func _on_StartGame_enemyCountChangeSignal(count):
	value = count * 8;


func _on_Health_changeMyCountBar(count):
	value = count * 8;


func _on_Health_changeEnemyCountBar(count):
	value = count * 8;


func _on_TimerMy_myCountValue(count):
	value = count * 8;
