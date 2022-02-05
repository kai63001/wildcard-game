using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class PlayerTest : MonoBehaviour
{
   public void OnPlayerOne()
    {
        // burner account for skipped sign in screen
        PlayerPrefs.SetString("Account", "0xF58F1e730fd6bDd0c239E1D83eaB9d87132eF723");
        // move to next scene
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex + 1);
    }

    public void OnPlayerTwo()
    {
        // burner account for skipped sign in screen
        PlayerPrefs.SetString("Account", "0xda08752d35C6bE17Cdd0f389a376DEFC71eEB2af");
        // move to next scene
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex + 1);
    }
}
