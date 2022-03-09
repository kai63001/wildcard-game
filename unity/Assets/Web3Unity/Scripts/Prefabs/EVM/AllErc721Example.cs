using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Newtonsoft.Json;

public class AllErc721Example : MonoBehaviour
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
        string account = "0xF58F1e730fd6bDd0c239E1D83eaB9d87132eF723";
        string contract = "0xCdA3f3a5c21925C370F0aD607456A5d0229F50f5";
        string response = await EVM.AllErc721(chain, network, account, contract);
        try
        {
            NFTs[] erc721s = JsonConvert.DeserializeObject<NFTs[]>(response);
            print("leng : "+ erc721s.Length);
            print(erc721s[0].contract);
            print(erc721s[0].tokenId);
            print(erc721s[0].uri);
            print(erc721s[0].balance);
        }
        catch
        {
           print("Error: " + response);
        }
    }
}
