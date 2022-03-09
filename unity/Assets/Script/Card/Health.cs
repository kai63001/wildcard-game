using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Photon.Pun;
using Photon.Realtime;

public class Health : MonoBehaviourPunCallbacks
{
    private bool isDragging = false;
    private bool isOverDropZone = false;
    private GameObject DropZone;
    private Vector2 startPosition;
    private MainGame gameStart;

    public int manaUse = 6;
    private bool letLock = false;

    // Start is called before the first frame update
    void Start()
    {
        gameStart = GameObject.Find("GameScript").GetComponent<MainGame>();
    }


    // Update is called once per frame
    void Update()
    {
        if(isDragging){
            transform.position = new Vector2(Input.mousePosition.x,Input.mousePosition.y);
        }
    }

    private void OnCollisionEnter2D(Collision2D collision){
        isOverDropZone = true;
        DropZone = collision.gameObject;
        print("OnCollisionEnter2D");
    }

    private void OnCollisionExit2D(Collision2D collision){
        isOverDropZone = false;
        DropZone = null;
        print("OnCollisionExit2D");
    }

    public void StartDrag() {
        if (gameStart._turn == PhotonNetwork.LocalPlayer.ActorNumber && letLock == false)
        {
            startPosition = transform.position;
            isDragging = true;
        }
    }

    public void EndDrag() {
        if (gameStart._turn == PhotonNetwork.LocalPlayer.ActorNumber && letLock == false)
        {
            isDragging = false;
            print(DropZone.name);
            if(isOverDropZone)
            {
                if (DropZone.name == "DropCardZone" && gameStart.myMana >= manaUse)
                {
                    letLock = true;
                    gameStart.photonView.RPC("_syncMana", RpcTarget.All, manaUse);
                    transform.SetParent(DropZone.transform, false);
                    gameStart.photonView.RPC("_syncHP", RpcTarget.All, 3);
                    Destroy(gameObject);
                }
                else
                {
                    transform.position = startPosition;
                }
            }else{
                transform.position = startPosition;
            }
        }
    }
}
