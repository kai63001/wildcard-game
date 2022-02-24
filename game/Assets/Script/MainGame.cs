using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using Photon.Pun;
using Photon.Realtime;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.UI;

using Random = UnityEngine.Random;

public class MainGame : MonoBehaviourPunCallbacks
{
    public Text countMyText;

    public Text countEnemyText;

    public Text turnText;

    public Text waitText;

    public Text countMyDrawCard;

    public GameObject WaitScreen;

    public GameObject GameScreen;

    private int playerID = 1;

    public int _turn = 1;

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


    private bool[] playLoadedNFT = new bool[2]{false,false};

    private bool gameStart = false;

    //Card
    public int[][] playerCard = new int[2][];

    //NFT CARD
    public string[][] nftCard = new string[2][];

    //My Mana
    public int myMana = 20;

    private int enemyMana = 20;
    public Text myManaText;

    public Text enemyManaText;

    public GameObject[] nftId;
    public GameObject MyGridAreaCard;
    
    private bool nftLoading = true;

    void Start()
    {
        RoomOptions roomOptions = new RoomOptions();
        roomOptions.IsVisible = false;
        roomOptions.MaxPlayers = 2;
        PhotonNetwork
            .JoinOrCreateRoom("romeo", roomOptions, TypedLobby.Default);
        playerLock[0] = false;
        playerLock[1] = false;
        // _getPlayerNFT();
    }

    private void Update()
    {
        _waitPlayer();
        myHPText.text = myHP.ToString();
        enemyHPText.text = enemyHP.ToString();
        myManaText.text = myMana.ToString();
        enemyManaText.text = enemyMana.ToString();
        _waitNFT();
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
            _changeTurnText();
            playerID = PhotonNetwork.LocalPlayer.ActorNumber;
            _playerCardRandomPushtoArray();
            _generateMana();
            countMyDrawCard.text =
                playerCard[PhotonNetwork.LocalPlayer.ActorNumber - 1]
                    .Length
                    .ToString();
            waitText.text = "Loading NFT";
            gameStart = true;
            _getPlayerNFT();
        }
    }

    private void _waitNFT() {
        if(playLoadedNFT[0] && playLoadedNFT[1] && nftLoading){
            WaitScreen.SetActive(false);
            GameScreen.SetActive(true);
            nftLoading = false;
        }
    }

    private void _generateMana() {
        // for (int i = 0; i < 2; i++)
        // {
        //     mana[i] = 20;
        //     // print(mana[i]);
        // }
        // mana[0] = 25;
        // mana[1] = 20;
    }

    private void _getDataCard() {
        for(int i =0;i<nftCard[PhotonNetwork.LocalPlayer.ActorNumber - 1].Length;i++){
            print("NFT ID :" + int.Parse(nftCard[PhotonNetwork.LocalPlayer.ActorNumber - 1][i]));
            GameObject playerCardNFt = Instantiate(nftId[int.Parse(nftCard[PhotonNetwork.LocalPlayer.ActorNumber - 1][i]) - 1],new Vector3(0,0,0),Quaternion.identity);
            playerCardNFt.transform.SetParent(MyGridAreaCard.transform, false);
        }
    }

    private async void _getPlayerNFT()
    {
        print("_getPlayerNFT + " + PhotonNetwork.LocalPlayer.ActorNumber);
         StartCoroutine(MakeRequest(
            returnValue =>
            {
                print(returnValue);
                base.photonView
                    .RPC("_syncNFT",
                    RpcTarget.All,
                    PhotonNetwork.LocalPlayer.ActorNumber,
                    returnValue);
                _getDataCard();
            }));
    }

    IEnumerator MakeRequest(System.Action<string[]> callback = null)
    {
        UnityWebRequest request = UnityWebRequest.Get("http://localhost:3000/api/myNFTonlyId?address="+PlayerPrefs.GetString("Account"));
        yield return request.SendWebRequest();

        if (request.isNetworkError || request.isHttpError)
        {
            Debug.Log(request.error);
        }
        else
        {
            Debug.Log("Received" + request.downloadHandler.text);
            var data =
                JsonConvert
                    .DeserializeObject<string[]>(request.downloadHandler.text);
            print("data 146:" + data);

            // waitText = GameObject.Find("WaitText").GetComponent<Text>();
            // waitText.text = data[0].ToString();
            callback(data);
        }
    }

    [PunRPC]
    private void _syncNFT(int player, string[] res)
    {
        playLoadedNFT[player-1] = true;
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

    [PunRPC]
    private void _syncMana(int number)
    {
        if (_turn == PhotonNetwork.LocalPlayer.ActorNumber)
        {
            myMana -= number;
        }
        else
        {
            enemyMana -= number;
        }
    }
}
