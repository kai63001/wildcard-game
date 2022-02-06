using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using UnityEngine;

public class ForGame : MonoBehaviour
{
    public static void Shuffle<T> (this Random rng, T[] array)
    {
        int n = array.Length;
        while (n > 1) 
        {
            int k = rng.Next(n--);
            T temp = array[n];
            array[n] = array[k];
            array[k] = temp;
        }
    }
}
