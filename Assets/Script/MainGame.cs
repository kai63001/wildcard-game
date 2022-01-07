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
    private int playerID;

    private int _turn = 1;


    void Start()
    {
        RoomOptions roomOptions = new RoomOptions();
        roomOptions.IsVisible = false;
        roomOptions.MaxPlayers = 2;
        PhotonNetwork.JoinOrCreateRoom("romeo", roomOptions, TypedLobby.Default);
        playerID = PhotonNetwork.LocalPlayer.ActorNumber;
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
        Debug.Log(_turn);
        if (_turn == PhotonNetwork.LocalPlayer.ActorNumber)
        {
            base.photonView.RPC("randomCard", RpcTarget.All, Random.Range(1, 7));
            Debug.Log("Player ID : " + PhotonNetwork.LocalPlayer.ActorNumber);
            base.photonView.RPC("_changeTurn", RpcTarget.All);
        }
    }

    [PunRPC]
    private void randomCard(int number)
    {
        romeoText.text = number.ToString();
        Debug.Log(number.ToString());
    }

    [PunRPC]
    private void _changeTurn()
    {
        Debug.Log("Change Turn");
        if (_turn == 1)
        {
            _turn = 2;
        }
        else
        {
            _turn = 1;
        }
    }


}
