import React, {useState,useEffect} from 'react'
import './styles.css'
import axios from "axios"
import People from './people';
import { Person } from './value';
import {useParams} from 'react-router-dom'
import io from "socket.io-client"

  const PRODUCTS: Person[] = []

 const SendMessage: React.FC=()=> {
    // const id=useParams()
    const [result, setResult] = useState<Person[]>()
    const fetchUsers=async()=>{
        await axios({
            method:"Get",
            url:"https://chat-5gm5.onrender.com/api/users",
            // url:"http://localhost:8080/api/users",
            withCredentials:true
         })
         .then((res)=>{
          //  console.log(res.data)
           var arr=res.data
           setResult(arr)
       })
      }
    useEffect(()=>{
       fetchUsers()
    },[])
var str :string|undefined=useParams().undefined
var newStr:string|undefined=str?.substring(1, str.length)


  return (
    <div className="sendMessage">
        <div className='cont'>
            <h1>Select a user to chat</h1>
            <div className='users'>
                <People result={result} myID={newStr}/>
            </div>
        </div>
    </div>
  )
}


export default SendMessage