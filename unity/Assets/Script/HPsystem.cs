using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Photon.Pun;
using Photon.Realtime;
using UnityEngine.UI;

public class HPsystem : MonoBehaviourPunCallbacks
{

    // HP
    public int myHP = 50;
    public int enemyHP = 50;

    // Text
    public Text myHPText;
    public Text enemyHPText;

    // Start is called before the first frame update
    void Start()
    {
        myHPText.text = myHP.ToString();
        enemyHPText.text = enemyHP.ToString();
    }

    // Update is called once per frame
    void Update()
    {
        myHPText.text = myHP.ToString();
        enemyHPText.text = enemyHP.ToString();
    }

    public void changeEnemyHP(int value,int playerID,int _turn)
    {
        base.photonView.RPC("_changeEnemy", RpcTarget.All, Random.Range(1, 7));
    }

    public void changeMyHP(int value)
    {
        myHP = value;
    }

    [PunRPC]
    private void _changeEnemy(int value)
    {
        enemyHP = value;
    }
}
