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
        RoomOptions roomOptions = new RoomOptions();
        roomOptions.IsVisible = false;
        roomOptions.MaxPlayers = 2;
        PhotonNetwork.JoinOrCreateRoom("romeo", roomOptions, TypedLobby.Default);
    }

    public void draw()
    {
        // var output = JsonUtility.ToJson(PhotonNetwork.CurrentRoom, true);
        // Debug.Log(PhotonNetwork.CurrentRoom.Players.ElementAt(0));
        base.photonView.RPC("counter", RpcTarget.All, true);

        Debug.Log(count);
    }



    [PunRPC]
    private void counter(bool test)
    {
        count++;
        romeoText.text = count.ToString();
        Debug.Log("Count");
        //PhotonNetwork.RaiseEvent(count, count +1,RaiseEventOptions.Default, SendOptions.SendReliable);
    }


}
