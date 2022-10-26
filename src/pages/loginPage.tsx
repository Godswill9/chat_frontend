import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./styles.css"
// import {Cookie} from  "js-cookie"

export default function LoginPage() {
    const redirect=useNavigate()
    const [translate, setTranslate]=useState('')
    const [id, setId]=useState("")
    const [form, setForm]=useState({
      name:"",
      email:""
    })
    const handleForm=(event: React.ChangeEvent<HTMLInputElement>)=>{
      setForm((prev)=>({
        ...prev, [event.target.name]:event.target.value
      }))
    }

    const handleSubmit=()=>{
      if(form.email==="") console.log("empty")
      else{
        // console.log(form)
        sendData(form)
      }
    }
    const sendData=async(obj:Object)=>{
        var idd=""
        await axios({
          url:"http://localhost:8080/api/login",
          method:"POST",
          data:obj,
          withCredentials:true
        })
        .then((res)=> {
          console.log(res); 
          setId(res.data.id)
           idd=res.data.id
           if(idd===""||undefined){
            alert("user not found")
          }
          if(res.data==="user not found"){
            alert("user not found")
          }
        //   console.log(idd, id)
        //   redirect(`/sendMessage:${idd || id}`)
          // Cookie()
        })
        .then(()=>{
            redirect(idd===undefined||""?``:`/sendMessage:${idd}`)
        })
        
    }
  
    return (
      <div className="body">
          <div className='signInCont'>
              <div className='bigImg'>
                <div className='visitors'>Login to view your chats</div>
              </div>
              <div className="contHome">
              {/* <div className='inner'> */}
              <div className='LoginOne'>
                  {/* <div> New Player?</div> */}
                  <input type="text" placeholder='Enter your registered name' value={form.name} name="name" onChange={handleForm} required></input>
                  <input type="email" placeholder='Enter your registered email address' value={form.email} name="email" onChange={handleForm} required></input>
                  <button onClick={handleSubmit}>Next</button>
              </div>
              </div>
              <div className='loginLink'>New user?<Link to={`/`}>Register</Link> to start chatting</div>
          </div>
      </div>
    )
  }