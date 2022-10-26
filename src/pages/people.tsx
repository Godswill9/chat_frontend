import React, {useEffect} from 'react'
import './styles.css'
import { Person } from './value';
import  {useNavigate} from 'react-router-dom';
// import io from "socket.io-client"

type Props = {
    result:Person[] |  undefined,
    myID:string |  undefined
  };


 function People({result, myID}: Props){
    const navigate=useNavigate()
  //   const socket=io("http://localhost:8081")
  //   useEffect(()=>{
  //     // alert("rice")
  //     socket.on("connection", ()=>{
  //         alert(`you connected with id ${socket.id}`)
  //      })
  // },[])
  return (
    <>
    {result?.map((item, i)=>{
      {/* var namee=item.name.toString() */}
      if(item.id.toString()===myID){
          return(
            <div></div>
          )
      }
        return(
            <div className='indiv' key={i} onClick={()=>{
                if(item.id.toString()===myID){
                 alert("talk to your mind")
                }else{alert("preparing environment to discuss")
                navigate(`/chatRoom:${myID}~${item.id}`
                )
            }
            }}>
            <div className='one'>
              {/* <div style={{"background":"blue", borderRadius:"50%", "padding":"10px", color:"white","margin":"4px", fontSize:"17px", "fontWeight":"bold"}}>{"user"}</div> */}
                {/* <img src={`/upload/${item.img}`}></img> */}
                <img src="/logo512.png"></img>
                <div className='name'>{item.name}</div>
            </div>
            <div className='active'>Chat</div>
        </div>
        )
            })}
    </>
  )
}

export default People