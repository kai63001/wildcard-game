using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ERC721URIExample : MonoBehaviour
{
    async void Start()
    {
        string chain = "ethereum";
        string network = "rinkeby";
        string contract = "0x8991664653f0665Cfa12765Da720756235cc1cbB";
        string tokenId = "4";

        string uri = await ERC721.URI(chain, network, contract, tokenId);
        print(uri);
    }
}
