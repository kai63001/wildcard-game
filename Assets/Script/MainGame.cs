using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Photon.Pun;
using Photon.Realtime;
using UnityEngine.UI;

public class MainGame : MonoBehaviourPunCallbacks
{
    public Text romeoText;
    public GameObject WaitScreen;
    public GameObject GameScreen;


    void Start()
    {
        RoomOptions roomOptions = new RoomOptions();
        roomOptions.IsVisible = false;
        roomOptions.MaxPlayers = 2;
        PhotonNetwork.JoinOrCreateRoom("romeo", roomOptions, TypedLobby.Default);
    }

    private void Update()
    {
        _waitPlayer();
    }

    private void _waitPlayer()
    {
        if (PhotonNetwork.PlayerList.Length == 2)
        {
            WaitScreen.SetActive(false);
            GameScreen.SetActive(true);
        }
    }

    public void draw()
    {
        base.photonView.RPC("randomCard", RpcTarget.All, Random.Range(1, 7));
    }

    [PunRPC]
    private void randomCard(int number)
    {
        romeoText.text = number.ToString();
        Debug.Log(number.ToString());
    }

}
