using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Photon.Pun;
using Photon.Realtime;
using UnityEngine.UI;
public class MainGame : MonoBehaviourPunCallbacks
{
    public Text romeoText;
    private int count = 0;

    void Start()
    {
        PhotonNetwork.ConnectUsingSettings();
        romeoText.text = "Get Start";
    }

    void Update()
    {

    }

    public override void OnConnectedToMaster()
    {
        Debug.Log("OnConnectedToMaster() was called by PUN.");
        RoomOptions roomOptions = new RoomOptions();
        roomOptions.IsVisible = false;
        roomOptions.MaxPlayers = 4;
        PhotonNetwork.JoinOrCreateRoom("romeo", roomOptions, TypedLobby.Default);
    }


    public void draw()
    {
        // var output = JsonUtility.ToJson(PhotonNetwork.CurrentRoom, true);
        // Debug.Log(PhotonNetwork.CurrentRoom.Players.ElementAt(0));
        if (photonView.IsMine)
        {
            counter(true);
        }
        else
        {
            base.photonView.RPC("counter", RpcTarget.All, true);
            //photonView.RPC("AddFive", photonView.Controller);
        }

        Debug.Log(count);
    }

    [PunRPC]
    private void counter(bool test)
    {
        count++;
        romeoText.text = count.ToString();
        Debug.Log("Count");
    }

}
