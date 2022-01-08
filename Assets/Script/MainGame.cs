using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Photon.Pun;
using Photon.Realtime;
using UnityEngine.UI;

public class MainGame : MonoBehaviourPunCallbacks
{
    public Text countMyText;
    public Text countEnemyText;
    public Text turnText;
    public GameObject WaitScreen;
    public GameObject GameScreen;
    private int playerID;

    private int _turn = 1;

    // count
    private int countMy = 0;
    private int countEnemy = 0;

    // HP
    private int myHP = 50;
    private int enemyHP = 50;

    // LOCK
    private bool[] playerLock = new bool[2];

    private bool gameStart = false;


    void Start()
    {
        RoomOptions roomOptions = new RoomOptions();
        roomOptions.IsVisible = false;
        roomOptions.MaxPlayers = 2;
        PhotonNetwork.JoinOrCreateRoom("romeo", roomOptions, TypedLobby.Default);
        playerLock[0] = false;
        playerLock[1] = false;
    }

    private void Update()
    {
        _waitPlayer();
    }

    private void _waitPlayer()
    {
        if (PhotonNetwork.PlayerList.Length == 2 && gameStart == false)
        {
            WaitScreen.SetActive(false);
            GameScreen.SetActive(true);
            _changeTurnText();
            playerID = PhotonNetwork.LocalPlayer.ActorNumber;
            gameStart = true;
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

    public void lockDraw()
    {
        Debug.Log("Locked : " + playerLock[0]);
        Debug.Log("Locked : " + playerLock[1]);
        if (PhotonNetwork.LocalPlayer.ActorNumber == _turn)
        {
            playerLock[PhotonNetwork.LocalPlayer.ActorNumber - 1] = true;
            base.photonView.RPC("_changeTurn", RpcTarget.All);
        }
    }

    private void _checkLock()
    {
        Debug.Log("Player ID : " + playerID);
        Debug.Log("Locked : " + playerLock);
        if (playerLock[PhotonNetwork.LocalPlayer.ActorNumber - 1] == true)
        {
            base.photonView.RPC("_changeTurn", RpcTarget.All);
        }
    }

    private void _changeTurnText()
    {
        Debug.Log("Player "+PhotonNetwork.LocalPlayer.ActorNumber + " Turn "+_turn);
        if (PhotonNetwork.LocalPlayer.ActorNumber == _turn)
        {
            turnText.text = "Your Turn";
            _checkLock();
        }
        else
        {
            turnText.text = "Turn Player " + _turn;
        }
    }

    [PunRPC]
    private void randomCard(int number)
    {
        if (_turn == PhotonNetwork.LocalPlayer.ActorNumber)
        {
            countMy += number;
        }else
        {
            countEnemy += number;
        }
        //Black Jack
        if (countMy == 12)
        {
            Debug.Log("My Black Jack");
        }else if(countEnemy == 12)
        {
            Debug.Log("Enemy Black Jack");
        }
        //Loser
        if (countMy > 12)
        {
            countMy = 0;
            Debug.Log("My Loser");
        }
        else if (countEnemy > 12)
        {
            countEnemy = 0;
            Debug.Log("Enemy Loser");
        }

        countMyText.text = countMy.ToString();
        countEnemyText.text = countEnemy.ToString();
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
        _changeTurnText();
    }


}
