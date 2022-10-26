import React, { useState, useEffect } from 'react'
import "./styles.css"
import { Chat2, Chat3 } from './value'
import {useParams} from "react-router-dom"
import axios from 'axios'
import Error from './error'
import Chat from './chat'
// import io from "socket.io-client"

export default function ChatRoom(){
    // const socket=io("http://localhost:8081")
    const [message, setMessage]=useState<Chat2[]>()
    var [arr, setarr]=useState<Chat3[] | undefined>()
    // const [renderedArray, setrenderedArray]=useState<Chat[]>()
    const [Errorr, setErrorr]=useState("")
    const [friendsName, setfriendsName]=useState("")
    const [friendsPic, setfriendsPic]=useState("")
    const [sender, setsender]=useState("")
    var arrr:Chat3[]|undefined=[]
    // console.log(useParams())
    var strParams :string|undefined=useParams().undefined
    var newStr:string|undefined=strParams?.substring(1, 37)
    var newStr2:string|undefined=strParams?.substring(38, strParams.length)
    var friendsName2:string|undefined=""

    // const socket=io("http://localhost:8081")
    var newArr:Chat2[]=[]
    // socket.emit("fetchMessages",{myId:newStr, friend:newStr2})

async function refresh(){
    // socket.on("recievedData", (val)=>{
    //             // console.log(val)
    //             setarr(val)
    // })
    await axios({
        method:"POST",
        url:"https://chat-5gm5.onrender.com/api/fetchMessages",
        // url:"http://localhost:8080/api/fetchMessages",
        data:{myId:newStr, friend:newStr2},
        withCredentials:true
    })
    .then((res)=> {
        if(!res.data)return
        setarr(res.data)
    })
}

useEffect(()=>{
    refresh()
   }, [arr])

    // useEffect(()=>{
    //   socket.on("recieveMessage", (iu)=>{
    //     // newArr=iu
    //     console.log(iu)
        // for(var i=0; i<iu.length; i+=1){
        //     const objj={
        //             messages:[iu[i].message],
        //             status:iu[i].myId===newStr?"reciever":"sender"
        //         }
        //         // newArr=[...newArr, objj]
        //         newArr.push(objj) 
        // }
        // console.log(newArr)
        // setarr(newArr)
        // newArr=iu
// })
//   },[socket])
//   useEffect(()=>{
    // socket.emit("fetchMessages",{myId:newStr, friend:newStr2})
//   },[])




    const findName=async()=>{
        const obj={id:newStr2, myId:newStr}
        await axios({
            method:"POST",
            url:"https://chat-5gm5.onrender.com/api/user",
            // url:"http://localhost:8080/api/user",
            data:obj,
            withCredentials:true
        })
        .then((res)=> {
            friendsName2=res.data.name
            setfriendsName(res.data.name);
            setfriendsPic(res.data.img)
        })
    }
     
    useEffect(()=>{
        findName()
        console.log(friendsPic)
    },[])
    const [Str, setStr]=useState("")
    const [form, setForm]=useState({
        name:"",
        id:newStr,
        recipientID:newStr2,
        message:"",
        // status:"sender",
      })
    const [num, setNum]=useState(0)
    var count=0

    const handleSendMessage=(event: React.ChangeEvent<HTMLInputElement>)=>{
        setStr(event.target.value)
        var stringg=event.target.value
        setForm((prev)=>({
            ...prev, name:friendsName,message:stringg}))
    }

    const postMessage=async()=>{
        count=num+1
        setNum(count)
        const requestObj={
            mainData:form,
            count:count
        }
        // console.log(count)
        await axios({
            method:"POST",
            url:"https://chat-5gm5.onrender.com/api/sendMessage",
            // url:"http://localhost:8080/api/sendMessage",
            data:requestObj,
            withCredentials:true
        })
        .then((res)=>{
            // console.log(res.data)
        })
    }
    const handleClick= async()=>{
        if(form.message==="")return
        else{
            var date= new Date()
            var h=date.getHours().toString()
            var m=date.getMinutes().toString()
            var s=date.getSeconds().toString()

            var time=h+":"+m+":"+s
            await axios({
                method:"POST",
                url:"https://chat-5gm5.onrender.com/api/sendMessage",
                // url:"http://localhost:8080/api/sendMessage",
                data:{...form, time:time},
                withCredentials:true
            })
            .then(()=>{
                setForm((prev)=>({
                    ...prev,message:""}))
            })
            .then((res)=>{
                refresh()
            })
            // socket.emit("sendMessage",{...form, time:time})
            // postMessage()
            // pushMessage(message[message?.length-1].message[0], sender)
            
        }
    }
//     useEffect(()=>{
//     arrr?.forEach((item, i)=>{
//         // console.log(item.message)
//         const objj={
//             messages:[item.message],
//             status:item.myId===newStr?"reciever":"sender"
//         }
//         if(!arr){
//             // console.log(objj)
//            return
            
//         }
//         else if(arr[arr.length-1].status==="reciever" && item.myId===newStr2){
//             arr[arr.length-1].messages.push(item.message)
//         }else if(arr[arr.length-1].status==="sender" && item.myId===newStr){
//             arr[arr.length-1].messages.push(item.message)
//         }
//         else{
//             arr.push(objj)
//         }
//     })
// })
// console.log(arr)
    // console.log(arrr)
    // const pushMessage=(message:string, status:string)=>{

    //     const objj={
    //         messages:[message],
    //         status:status
    //     }
    //     if(status===newStr){
    //         status="sender"
    //     }
    //     if(arr[arr.length-1].status==="reciever" && status==="reciever"){
    //         arr[arr.length-1].messages.push(message)
    //     }else if(arr[arr.length-1].status==="sender" && status==="sender"){
    //         arr[arr.length-1].messages.push(message)
    //     }
    //     else{
    //         arr.push(objj)
    //     }
    // }
    // console.log(arr)
    // console.log(newArr)


    return(
<div className='chatRoom'>
<div className='cont'>
<div className='header'>
    {/* <img style={{"background":"blue"}} src={`./upload/${friendsPic}`}></img> */}
    <img style={{"background":"black"}} src="/logo192.png"></img>
    {/* <div style={{"background":"blue", borderRadius:"50%", "padding":"10px", color:"white","margin":"4px", fontSize:"17px", "fontWeight":"bold"}}>{"user"}</div> */}
    <span className='name'>{friendsName}</span>
</div>
<div className='boxx'>
<div className='boxx2'>
<div className='messageSection'>
    {
     arr?.map((item, i)=>{
        return(
            <div className={item.myId===newStr? "reciever":"sender"} key={i}>
        <div className='inner'>
        {/* {item.myId===newStr? <img src="/upload/166660389446920220306_115729.jpg"></img>:<img src="/logo192.png"></img>} */}
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
}

{/* {arr===undefined? <Error arr={arr}/>:<Chat arr={arr} newStr={newStr} newStr2={newStr2}/>} */}


  


</div>
<div className='type'>
        <input type="text" placeholder="Type your message" value={form.message} onChange={handleSendMessage}></input>
        <button onClick={handleClick}>Send</button>
    </div>
</div>
</div>
</div>
</div>
    )
}


// var arr=[
//     {
//          messages:["Hi, bro",
//                    "But, how about your sister?",
//                    "hope she's ok now", 
//                    "Make the array of type JSX elements so the array stores the pure JSX Element and just plops it down with a .map inside"
//                   ],
//          status:"reciever"
//     },
//     {
//          messages:[
//             "fine thanks",
//             "I go come ya side tomorrow",
//             "lol",
//          ],
//          status:"sender"
//     },
//     {
//          messages:[
//             "Ok na, no wahala",
//             "any issues",
//          ],
//          status:"reciever"
//     },
//     {
//          messages:[
//             "nothing boss",
//             "I see what you did there man.",
//             // "No be everybody sabi code 😒🤷‍♀️",
//          ],
//          status:"sender"
//     },
//     {
//          messages:[
//             "Oops!!, sorry boss",
//             "na mistake",
//             "🤣🤦‍♂️👀😆🐒",
//          ],
//          status:"reciever"
//     },
// ]