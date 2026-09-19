import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

function App() {

  const[file,setfiles]=useState()
  const[images,setimage]=useState()
  const [upload, setUpload] = useState(false)


  const handlechange=(e)=>{
    const formdata=new FormData()
    formdata.append('file',file)
    axios.post('http://localhost:5000/upload',formdata)
    .then(result=>{console.log(result)
      setUpload(!upload)
    })
    .catch(err=>console.log(err))
  }

  useEffect(()=>{
    axios.get("http://localhost:5000/getphoto")
    .then(result=>setimage(result.data[result.data.length-1].image))
    .catch(err=>console.log(err))
  },[upload])

  return (
    <div className='card shadow m-5 p-5'>
      <h1 className='text-center text-primary'>upload photo</h1>
      <input type='file' className=' mx-auto' onChange={(e)=>setfiles(e.target.files[0])}></input>
      <button className='btn btn-primary mx-auto' onClick={handlechange}>UPLOAD</button>
      <br></br><img className="rounded  mx-auto" width={400} height={450} src={"http://localhost:5000/images/"+images}></img>
    </div>
  )
}

export default App