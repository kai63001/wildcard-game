using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Newtonsoft.Json;

public class getNFTMenu : MonoBehaviour
{
    private class NFTs
    {
        public string contract { get; set; }
        public string tokenId { get; set; }
        public string uri { get; set; }
        public string balance { get; set; }
    }

    async void Start()
    {
        string chain = "ethereum";
        string network = "ropsten"; // mainnet ropsten kovan rinkeby goerli
        string account = PlayerPrefs.GetString("Account");
        string contract = "0xCdA3f3a5c21925C370F0aD607456A5d0229F50f5";
        string response = await EVM.AllErc721(chain, network, account, contract);
        try
        {
            NFTs[] erc721s = JsonConvert.DeserializeObject<NFTs[]>(response);
            print("leng : "+ erc721s.Length);
            print(erc721s[0].uri);
        }
        catch
        {
           print("Error: " + response);
        }
    }

    // IEnumerator MakeRequest(string uri,System.Action<string[]> callback = null)
    // {
    //     UnityWebRequest request = UnityWebRequest.Get(uri);
    //     yield return request.SendWebRequest();

    //     if (request.isNetworkError || request.isHttpError)
    //     {
    //         Debug.Log(request.error);
    //     }
    //     else
    //     {
    //         Debug.Log("Received" + request.downloadHandler.text);
    //         var data =
    //             JsonConvert
    //                 .DeserializeObject<string[]>(request.downloadHandler.text);
    //         print("data 146:" + data);

    //         // waitText = GameObject.Find("WaitText").GetComponent<Text>();
    //         // waitText.text = data[0].ToString();
    //         callback(data);
    //     }
    // }
}
