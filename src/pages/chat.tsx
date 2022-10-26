import React from 'react'
import { Chat3 } from './value';


type Props = {
    arr:Chat3[],
    newStr:string|undefined,
    newStr2:string|undefined
  };

export default function Chat({arr, newStr, newStr2}:Props) {
    console.log(arr)
  return (
    arr?.map((item, i)=>{
        return(
            <div className={item.myId===newStr? "reciever":"sender"} key={i}>
        <div className='inner'>
        {item.myId===newStr? <img src="/logo512.png"></img>:<img src="/logo192.png"></img>}
            <div className='message'>
              <div className='innerDiv'>
                {item.message.map((item:string, i:number)=>{
                    return(
                        <div key={i}><span>{item}</span></div>
                    )
                })}
             </div>  
            </div>
        </div>
    </div>
        )
    })
  )
}
