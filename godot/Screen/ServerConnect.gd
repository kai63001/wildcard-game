extends Node2D

const KEY := "defaultkey"

var client := Nakama.create_client(KEY, "127.0.0.1", 7350, "http")
var session : NakamaSession
func _ready():
	var custom_id = "some-custom-id"
	var session : NakamaSession = yield(client.authenticate_custom_async(custom_id), "completed")
	if session.is_exception():
		print("An error occured: %s" % session)
		return
	print("Successfully authenticated: %s" % session)
