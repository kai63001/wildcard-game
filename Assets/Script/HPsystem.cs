using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;


public class HPsystem : MonoBehaviour
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
        
    }
}
