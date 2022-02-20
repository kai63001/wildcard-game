using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Health : MonoBehaviour
{
    private bool isDragging = false;
    private bool isOverDropZone = false;
    private GameObject DropZone;
    private Vector2 startPosition;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if(isDragging){
            transform.position = new Vector2(Input.mousePosition.x,Input.mousePosition.y);
        }
    }

    public void StartDrag() {
        startPosition = transform.position;
        isDragging = true;
    }

    public void EndDrag() {
        isDragging = false;
        if(isOverDropZone){
            transform.SetParent(DropZone.transform,false);
        }else{
            transform.position = startPosition;
        }
    }
}
