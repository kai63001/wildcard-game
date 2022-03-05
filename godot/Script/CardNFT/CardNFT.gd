extends Node2D

var selected = false;
var mouse_offset

var NFTId = 1

onready var NFT = get_parent().get_parent().get_node(".")
onready var Mana = get_node("/root/Main/MainGame/StartGame/MyUI/mana")
onready var MainGame = get_node("/root/Main/MainGame")
onready var StartGame = get_node("/root/Main/MainGame/StartGame")
onready var ServerConnect = get_node("/root/Main/ServerConnect")

func _ready():
	var nftText = load("res://Assets/NFT/"+String(NFTId)+".png")
	$NFT.texture = nftText
	print(StartGame.NFTData[int(NFTId)])

func _physics_process(_delta):
	if(selected):
		floowMouse()
		
func floowMouse():
	position = get_global_mouse_position() + mouse_offset

func _callNFT():
	print(get_global_mouse_position().y + mouse_offset.y)
	if(get_global_mouse_position().y + mouse_offset.y < -120):
		NFT.cal()
		_checkNFT()

func _on_TextureButton_button_down():
	if(MainGame.myTurn):
		mouse_offset = position - get_global_mouse_position()
		selected = true
		NFT.selected = true

func _on_TextureButton_button_up():
	if(MainGame.myTurn):
		selected = false
		NFT.selected = false
		NFT.cal()
		_callNFT()

func _on_TextureButton_mouse_exited():
	selected = false
	NFT.selected = false
	NFT.cal()

func _on_TextureButton_focus_exited():
	selected = false
	NFT.selected = false
	NFT.cal()
	
func _checkNFT():
	print(StartGame.NFTData[1].Mana)
	if(Mana.mana > StartGame.NFTData[int(NFTId)].Mana && MainGame.myTurn):
		queue_free()
		NFT.cal()
		Mana.mana -= StartGame.NFTData[int(NFTId)].Mana
		sendNFTData(int(NFTId))
	else:
		NFT.cal()

func sendNFTData(id):
	match id:
		1:
			_attack(id)
		2:
			_health(id)
		3:
			_watcher(id)

func _attack(id):
	StartGame.get_node("EnemyUI/Health").HP -= 12
	ServerConnect._sendStateData(StartGame.NFTData[int(NFTId)].AttackID,String(id))	

func _health(id):
	StartGame.get_node("MyUI/Health").HP = clamp(StartGame.get_node("MyUI/Health").HP + 15,0,30)
	ServerConnect._sendStateData(StartGame.NFTData[int(NFTId)].AttackID,String(id))	

func _watcher(id):
	var drawCard = get_node("/root/Main/MainGame/StartGame/MyUI/DrawCard")
	drawCard._watcher()
	ServerConnect._sendStateData(StartGame.NFTData[int(NFTId)].AttackID,String(id))	
		
