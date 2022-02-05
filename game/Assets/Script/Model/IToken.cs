using System.Collections;
using System.Collections.Generic;
using UnityEngine;


[System.Serializable]
public class Component
{
    public string internalType { get; set; }

    public string name { get; set; }

    public string type { get; set; }
}

[System.Serializable]
public class Output
{
    public string internalType { get; set; }

    public string name { get; set; }

    public string type { get; set; }

    public List<Component> components { get; set; }
}

[System.Serializable]
public class Abi
{
    public List<Input> inputs { get; set; }

    public string stateMutability { get; set; }

    public string type { get; set; }

    public bool? anonymous { get; set; }

    public string name { get; set; }

    public List<Output> outputs { get; set; }
}

[System.Serializable]
public class LinkReferences { }
[System.Serializable]
public class DeployedLinkReferences { }

[System.Serializable]
public class IToken
{
    public string _format { get; set; }

    public string contractName { get; set; }

    public string sourceName { get; set; }

    public List<Abi> abi { get; set; }

    public string bytecode { get; set; }

    public string deployedBytecode { get; set; }

    public LinkReferences linkReferences { get; set; }

    public DeployedLinkReferences deployedLinkReferences { get; set; }
}
