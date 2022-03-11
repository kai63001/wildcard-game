extends Node2D
const KEY := "defaultkey"
onready var client := Nakama.create_client(KEY, "127.0.0.1", 7350, "http")
var session : NakamaSession
onready var socket := Nakama.create_socket_from(client)
var match_id
var matchmaker_ticket : NakamaRTAPI.MatchmakerTicket

func _ready():
	var lobby := get_parent().get_node(".");
	var custom_id = lobby.moralis.User.current().get("ethAddress")
	session = yield(client.authenticate_custom_async(custom_id), "completed")
	if session.is_exception():
		print("An error occured: %s" % session)
		return
	print("Successfully authenticated: %s" % session)
	_connect_to_server_async()
	socket.connect("received_matchmaker_matched", self, "_on_matchmaker_matched")
	socket.connect("received_match_state", self, "_on_match_state")


func _connect_to_server_async():
	print("_connect_to_server_async");
	var connected : NakamaAsyncResult = yield(socket.connect_async(session), "completed")
	if connected.is_exception():
		print("An error occured: %s" % connected)
		return
	print("Socket connected.")

func _on_PlayGame_pressed():
	var query = "*"
	var min_count = 2
	var max_count = 2
	matchmaker_ticket = yield(
	  socket.add_matchmaker_async(query, min_count, max_count),
	  "completed"
	)
	if matchmaker_ticket.is_exception():
		print("An error occured: %s" % matchmaker_ticket)
		return
	print("Got ticket: %s" % [matchmaker_ticket])

func _on_CancleFind_pressed():
	var removed : NakamaAsyncResult = yield(socket.remove_matchmaker_async(matchmaker_ticket.ticket), "completed")
	if removed.is_exception():
	  print("An error occured: %s" % removed)
	  return
	print("Removed from matchmaking %s" % [matchmaker_ticket.ticket])


func _on_matchmaker_matched(p_matched : NakamaRTAPI.MatchmakerMatched):
	print("Received MatchmakerMatched message: %s" % [p_matched])
	var joined_match : NakamaRTAPI.Match = yield(socket.join_matched_async(p_matched), "completed")
	if joined_match.is_exception():
		print("An error occured: %s" % joined_match)
		return
	print("Joined match: %s" % [joined_match])
	match_id = joined_match.match_id
	# Remove the UI
	var UI = get_parent().get_node("UI")
	UI.queue_free()
	# Loading a Game
	var game_resource = load("res://Screen/MainGame.tscn")
	var game = game_resource.instance()
	get_parent().add_child(game)
	

func _on_match_state(p_state : NakamaRTAPI.MatchData):
	print("Received match state with opcode %s" % [p_state.op_code])
	match p_state.op_code: 
		0: #randomBoxEnemyCallBack
			get_parent().get_node("MainGame").get_node("RandomBox").enemySelectd(int(p_state.data));
		1: #enemy count card number
			get_parent().get_node("MainGame").get_node("StartGame").enemyCountChange(int(p_state.data))
		2: #enemy Lock
			get_parent().get_node("MainGame").get_node("StartGame").enemyGetLocked()
		#Zone Enemy use NFT CARD
		101: #Enemy use NFT Attack
			get_parent().get_node("MainGame").get_node("StartGame").enemyAttack(int(p_state.data))
		102: #Enemy use NFT Health
			get_parent().get_node("MainGame").get_node("StartGame").enemyHealth(int(p_state.data))
		103: #Enemy use NFT Watcher
			get_parent().get_node("MainGame").get_node("StartGame").enemyWatcher(int(p_state.data))
		104: #Enemy use NFT Force Lock
			get_parent().get_node("MainGame").get_node("StartGame").enemyForceLock(int(p_state.data))
		105: #Enemy use NFT Shuffle
			get_parent().get_node("MainGame").get_node("StartGame").enemyShuffle(int(p_state.data))


func _sendStateData(code,data):
	socket.send_match_state_async(match_id, code, data)
	
func _leaveMath():
	socket.LeaveMatchAsync(match_id);
