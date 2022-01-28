using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ERC721URIExample : MonoBehaviour
{
    async void Start()
    {
        string chain = "ethereum";
        string network = "ropsten";
        string contract = "0x3Cd7f39a7488a638738D9151a55694C48c0b3Fe1";
        string tokenId = "6";

        string uri = await ERC721.URI(chain, network, contract, tokenId);
        print(uri);
    }
}
