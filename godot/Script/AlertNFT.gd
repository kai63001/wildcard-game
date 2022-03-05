extends Control

var nftId = 1

func _ready():
	$AnimationPlayer.play("flipNFT")

func nftCardChange():
	var nft = load("res://Assets/NFT/"+String(nftId)+".png")
	$TextureRect.texture = nft


func _on_AnimationPlayer_animation_finished(anim_name):
	queue_free()
