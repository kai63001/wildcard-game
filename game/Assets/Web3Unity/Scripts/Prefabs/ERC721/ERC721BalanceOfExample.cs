using System.Collections;
using System.Numerics;
using System.Collections.Generic;
using UnityEngine;

public class ERC721BalanceOfExample : MonoBehaviour
{
    async void Start()
    {
        string chain = "ethereum";
        string network = "rinkeby";
        string contract = "0x8991664653f0665Cfa12765Da720756235cc1cbB";
        string account = "0xF58F1e730fd6bDd0c239E1D83eaB9d87132eF723";

        int balance = await ERC721.BalanceOf(chain, network, contract, account);
        print(balance);
    }
}
