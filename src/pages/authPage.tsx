import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./styles.css"
// import Cookie from "js-cookie"

export default function AuthPage() {
    const redirect=useNavigate()
    const [translate, setTranslate]=useState('')
    const [id, setId]=useState("")
    const [file, setFile]=useState<File|null>(null)
    const [form, setForm]=useState({
      name:"",
      email:"",
      img:""
    })
    const handleForm=(event: React.ChangeEvent<HTMLInputElement>)=>{
      setForm((prev)=>({
        ...prev, [event.target.name]:event.target.value
      }))
    }

    const handleImageUpload =async(evt: React.ChangeEvent<HTMLInputElement>) => {
      evt.preventDefault()
      if (evt.target.files != null) {
        setFile(evt.target.files[0]);
          evt.preventDefault()
          console.log(evt.target.files[0])
          const str=evt.target.files[0].name
          // setForm((prev)=>({
          //       ...prev, img:str,
          //   }))
      }
    };

  
    const handleTranslate=async()=>{
      if(form.name==="") setTranslate("")
      else{
        setTranslate("translateX(-103%)")
    }
  }
    const handleSubmit=async()=>{
      if(form.email==="") console.log("empty")
      else{
        // const formData=new FormData();
        // formData.append("file", file!)
        const obj={...form, img:form.img,}
        // console.log(formData)
        // console.log(file)
        sendData(obj)
         }
      }
    const sendData=async(obj:Object)=>{
      // const val={
      //   obj:obj,
      //   obj2:obj2
      // }
        await axios({
          url:"http://localhost:8080/api/newUser",
          method:"POST",
          data:obj,
          withCredentials:true
        })
        .then((res)=> {
            console.log(res.data); 
            if(res.data==="user exists"){
              alert("user exists")
            }
            setId(res.data.id)
            var idd=res.data.id
          //   console.log(idd, id)
          
            redirect(`/sendMessage:${idd || id}`)
            // Cookie()
          })
    }
  
    return (
      <div className="body">
          <div className='signInCont'>
              <div className='bigImg'>
                <div className='visitors'>Register to send messages</div>
              </div>
              {/* <div> New User?</div> */}
              <div className="contHome">
              {/* <div className='inner'> */}
              <div className='one' style={{"transform":translate}}>
                  <input type="text" placeholder='Enter your name to continue' value={form.name} name="name" onChange={handleForm} required></input>
                  {/* <label>Select a picture</label>
                  <input type="file" name='' onChange={handleImageUpload} ></input> */}
                  <button onClick={handleTranslate}>Next</button>
              </div>
              <div className='two' style={{"transform":translate}}>
                  {/* <div>Your email address?</div> */}
                  <input type="email" placeholder='Enter your email address' value={form.email} name="email" onChange={handleForm} required></input>
                  <button onClick={handleSubmit}>Start!</button>
              {/* </div> */}
              </div>
              </div>
              <div className='loginLink'><Link to={`/login`}>Login</Link> to continue chatting</div>
          </div>
      </div>
    )
  }