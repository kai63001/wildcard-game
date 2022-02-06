using System;
using System.Collections.Generic;
using System.Linq;
using Photon.Pun;
using Photon.Realtime;
using UnityEngine;
using UnityEngine.UI;

using Random = UnityEngine.Random;

public class MainGame : MonoBehaviourPunCallbacks
{
    public Text countMyText;

    public Text countEnemyText;

    public Text turnText;

    public Text countMyDrawCard;

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

    public Text myHPText;

    public Text enemyHPText;

    // LOCK
    private bool[] playerLock = new bool[2];

    private bool gameStart = false;

    //Card
    public int[][] playerCard = new int[2][];

    //NFT CARD
    public string[][] nftCard = new string[2][];

    void Start()
    {
        RoomOptions roomOptions = new RoomOptions();
        roomOptions.IsVisible = false;
        roomOptions.MaxPlayers = 2;
        PhotonNetwork
            .JoinOrCreateRoom("romeo", roomOptions, TypedLobby.Default);
        playerLock[0] = false;
        playerLock[1] = false;
            _getPlayerNFT();
    }

    private void Update()
    {
        _waitPlayer();
        myHPText.text = myHP.ToString();
        enemyHPText.text = enemyHP.ToString();
    }

    private void _playerCardRandomPushtoArray()
    {
        for (int i = 0; i < 2; i++)
        {
            int[] temp = new int[41];

            //loop temp
            for (int j = 0; j < 41; j++)
            {
                //random temp
                int random = Random.Range(1, 7);
                temp[j] = random;
            }
            playerCard[i] = temp;
            print(playerCard[i]);
            // playerCard[i] =
        }
        Debug.Log (playerCard);
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
            _playerCardRandomPushtoArray();
            countMyDrawCard.text =
                playerCard[PhotonNetwork.LocalPlayer.ActorNumber - 1]
                    .Length
                    .ToString();
            // _getPlayerNFT();
        }
    }

    private async void _getPlayerNFT()
    {
        print("_getPlayerNFT + "+ PhotonNetwork.LocalPlayer.ActorNumber);
        GetMyNFT nft = new GetMyNFT();
        string myNFT = await nft.returnMyNft();
        List<string> converNft =
            myNFT
                .Replace("[", "")
                .Replace("]", "")
                .Replace("\"", "")
                .Split(char.Parse(","))
                .ToList(); //replace [] and split to array list
        string[] res =
            (from data in converNft where data != "0" select data)
                .ToList()
                .ToArray(); //filter zero
        for (int i = 0; i < res.Length; i++)
        {
            print(await nft.returnNftURI(res[i]));
        }

        
        // base.photonView
        //     .RPC("_syncNFT",
        //     RpcTarget.All,
        //     PhotonNetwork.LocalPlayer.ActorNumber,
        //     res);
    }

    [PunRPC]
    private void _syncNFT(int player, string[] res)
    {
        nftCard[player - 1] = res;
    }

    public void draw()
    {
        print("NFT CARD 1 LENGTH " + nftCard[0].Length);
        print("NFT CARD 2 LENGTH " + nftCard[1].Length);
        Debug.Log (_turn);
        if (_turn == PhotonNetwork.LocalPlayer.ActorNumber)
        {
            // Debug.Log(playerCard[PhotonNetwork.LocalPlayer.ActorNumber - 1][playerCard.Length - 1]);
            countMyDrawCard.text =
                playerCard[PhotonNetwork.LocalPlayer.ActorNumber - 1]
                    .Length
                    .ToString();

            // playerCard[PhotonNetwork.LocalPlayer.ActorNumber - 1]
            base.photonView
                .RPC("randomCard",
                RpcTarget.All,
                playerCard[PhotonNetwork.LocalPlayer.ActorNumber -
                1][playerCard[PhotonNetwork.LocalPlayer.ActorNumber - 1]
                    .Length -
                1]);
            RemoveAt(ref playerCard[PhotonNetwork.LocalPlayer.ActorNumber - 1],
            playerCard[PhotonNetwork.LocalPlayer.ActorNumber - 1].Length - 1);

            //Debug.Log("Player ID : " + PhotonNetwork.LocalPlayer.ActorNumber);
            base.photonView.RPC("_changeTurn", RpcTarget.All);
        }
    }

    public static void RemoveAt<T>(ref T[] arr, int index)
    {
        for (int a = index; a < arr.Length - 1; a++)
        {
            // moving elements downwards, to fill the gap at [index]
            arr[a] = arr[a + 1];
        }

        // finally, let's decrement Array's size by one
        Array.Resize(ref arr, arr.Length - 1);
    }

    public void lockDraw()
    {
        //Debug.Log("Locked : " + playerLock[0]);
        //Debug.Log("Locked : " + playerLock[1]);
        if (PhotonNetwork.LocalPlayer.ActorNumber == _turn)
        {
            base.photonView
                .RPC("_syncPlayerLock",
                RpcTarget.All,
                PhotonNetwork.LocalPlayer.ActorNumber);
            base.photonView.RPC("_changeTurn", RpcTarget.All);
        }
    }

    [PunRPC]
    private void _syncPlayerLock(int player)
    {
        playerLock[player - 1] = true;
    }

    private void _checkLock()
    {
        //Debug.Log("Player ID : " + playerID);
        //Debug.Log("Locked : " + playerLock);
        if (playerLock[PhotonNetwork.LocalPlayer.ActorNumber - 1] == true)
        {
            base.photonView.RPC("_changeTurn", RpcTarget.All);
        }
    }

    private void _changeTurnText()
    {
        Debug
            .Log("Player " +
            PhotonNetwork.LocalPlayer.ActorNumber +
            " Turn " +
            _turn);
        if (PhotonNetwork.LocalPlayer.ActorNumber == _turn)
        {
            turnText.text = "Your Turn";
            _checkLock();
        }
        else
        {
            turnText.text = "Turn Player " + _turn;
        }
        Debug.Log("108 line");
        Debug.Log(playerLock[0]);
        Debug.Log(playerLock[1]);

        // check if all players lock
        if (playerLock[0] == true && playerLock[1] == true)
        {
            // _playerAllLock();
            base.photonView.RPC("_playerAllLock", RpcTarget.All);
        }
    }

    [PunRPC]
    private void _playerAllLock()
    {
        Debug.Log("All Player is Locked");
        if (countEnemy > countMy)
        {
            myHP -= countEnemy - countMy;
        }
        else if (countMy > countEnemy)
        {
            enemyHP -= countMy - countEnemy;
        }

        // myHP = countEnemy;
        // enemyHP -= countMy;
        //reset count
        countMy = 0;
        countEnemy = 0;
        playerLock[0] = false;
        playerLock[1] = false;
        countMyText.text = countMy.ToString();
        countEnemyText.text = countEnemy.ToString();
    }

    [PunRPC]
    private void randomCard(int number)
    {
        if (_turn == PhotonNetwork.LocalPlayer.ActorNumber)
        {
            countMy += number;
        }
        else
        {
            countEnemy += number;
        }

        //Black Jack
        if (countMy == 12 || countEnemy == 12)
        {
            Debug.Log("Black jack");

            // for check who got black jack
            if (_turn == PhotonNetwork.LocalPlayer.ActorNumber)
            {
                myHP -= countEnemy;
            }
            else
            {
                enemyHP -= countMy;
            }

            //reset count
            countMy = 0;
            countEnemy = 0;
            playerLock[0] = false;
            playerLock[1] = false;
        }

        //Loser
        if (countMy > 12 || countEnemy > 12)
        {
            Debug.Log("Loser");

            // for check who got loser
            if (_turn == PhotonNetwork.LocalPlayer.ActorNumber)
            {
                myHP -= countEnemy;
            }
            else
            {
                enemyHP -= countMy;
            }

            //reset count
            countMy = 0;
            countEnemy = 0;
            playerLock[0] = false;
            playerLock[1] = false;
        }

        countMyText.text = countMy.ToString();
        countEnemyText.text = countEnemy.ToString();
    }

    [PunRPC]
    private void _changeTurn()
    {
        //Debug.Log("Change Turn");
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
