import React, { useState } from 'react'
import { thunkGetUserThread } from '../../store/thread';
import { useDispatch } from "react-redux"

function ThreadUser({thread}) {
  const [image, setImage] = useState(undefined)
  const [imagePreview, setImagePreview ] = useState(undefined)
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch()

  const handleImage = (e) => {
    setImage(e.target.files[0])
    setImagePreview(URL.createObjectURL(e.target.files[0]))
  }

  const handleUpdateImage = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("image", image)
    const newImage = formData;
    //updates the image of the current_user
    const data = await fetch(`/api/users/image`, {
      method: 'POST',
      body: newImage
    })
    console.log("response")
    console.log(data)
    console.log(thread)
    if (data.errors) {
      const valErrors = {}
      valErrors.image = data.errors["image"]
      setErrors(valErrors)
    }
    await dispatch(thunkGetUserThread(thread.id))
  }

  return (
    <div className='user_thread--wrapper'>
      <div className='thread_user--image' style={imagePreview ? {backgroundImage: `url(${imagePreview})`} : {backgroundImage: `url(${thread.image})`}}>
        { thread.image ? null : <span>{thread.username.charAt(0)}</span> }
      </div>
      <form onSubmit={handleUpdateImage} encType="multipart/form-data">
        <input type="file" accept="image/*" onChange={(e) => handleImage(e)}/>
        <button>Submit</button>
      </form>
      <h2 className='user_thread--username'>{thread.username}</h2>
    </div>
  )
}

export default ThreadUser
