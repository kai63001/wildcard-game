extends Node2D

# Moralis Server settings
export (String) var server_url = ""
export (String) var app_id = ""

# Signals emitting logged-in and logged-out for the Moralis
signal logged_in(user)
signal logged_out

# Moralis object
var moralis = JavaScript.get_interface("Moralis")
# Authenticated User
var current_user = null

# Callbacks
var _callback_login = JavaScript.create_callback(self, "_on_logged_in")
var _callback_logout = JavaScript.create_callback(self, "_on_logged_out")

func _ready():
	if OS.has_feature("JavaScript"):
		# Initialize the Moralis SDK
		var options = JavaScript.create_object("Object")
		options.serverUrl = server_url
		options.appId = app_id

		moralis.start(options)
		

	
func login():
	# Check if user already logged in
	current_user = moralis.User.current()
	
	if !current_user:
		moralis.authenticate().then(_callback_login)

	
func logout():
	print(moralis)
	moralis.User.logOut().then(_callback_logout)
	current_user = null
	
	
func _on_logged_in(args):
	current_user = args[0]
	#$Control/Label.text = "Logged in!\nETH Address: " + args[0].get("ethAddress")
	get_tree().change_scene("res://Screen/Main.tscn")
	
	
func _on_logged_out(args):
	current_user = null
	login()

func _on_TextureButton_pressed():
		logout()
		login()
