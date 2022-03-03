extends Control

var xPos = 100;
var yPos = 100;

var choseBox = false;

var enemyPoint = 0;
var myPoint = 0;
var end = false;

func _ready():
	_initRandom();
		

func _initRandom():
	xPos = 100;
	yPos = 100;
	for n in 3:
		var randomBox_resource = load("res://Item/BoxItem.tscn")
		var randomBox = randomBox_resource.instance()
		randomBox.set_position(Vector2(xPos,yPos))
		get_node("RandomArea").add_child(randomBox)
		xPos += 200

func _clearRandomBox():
	if(enemyPoint == 0):
		$Label.text = "WAIT FOR ENEMY CHOOSE THE BOX";

func enemySelectd(num):
	enemyPoint = num;
	
func _process(delta):
	if(enemyPoint != 0 && myPoint != 0 && end == false):
		if(enemyPoint == myPoint):
			$Label.text = "CHOOSE THE BOX AGAIN";
			for n in get_node("RandomArea").get_children():
				get_node("RandomArea").remove_child(n)
				n.queue_free()
			choseBox = false
			enemyPoint = 0;
			myPoint = 0;
			_initRandom();
		elif(enemyPoint > myPoint):
			$Label.text = "ENEMY GOT "+String(enemyPoint) + " ENEMY WIN";
			end = true
			_nextChangeState();
		elif(enemyPoint < myPoint):
			$Label.text = "ENEMY GOT "+String(enemyPoint) + " YOU WIN";
			end = true
			get_node("/root/Main/MainGame").myTurn = true
			_nextChangeState();

func _nextChangeState():
	yield(get_tree().create_timer(2.0), "timeout")
	queue_free();
	get_node("/root/Main/MainGame")._instanceStartGame()
