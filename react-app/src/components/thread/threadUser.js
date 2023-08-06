import React, { useState } from 'react'
import { thunkGetUserThread } from '../../store/thread';
import { useDispatch } from "react-redux"
import { thunkGetUsers } from '../../store/users';
import { useSelector } from "react-redux"
import { FaCheck } from 'react-icons/fa';

function ThreadUser({thread}) {
  const [image, setImage] = useState(undefined)
  const [imagePreview, setImagePreview ] = useState(undefined)
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch()
  const auth = useSelector(state => state.session.user)
  const user = useSelector(state => state.users.users[thread.id])

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
    const res = await fetch(`/api/users/image`, {
      method: 'POST',
      body: newImage
    })
    if(res.ok)
    {
      const data = await res.json()
      //NEED TO DISPATCH OTHER THUNKS THAT
      //BECAUSE OTHER PARTS OF THE PAGE PULL IMAGE FROM DIFF PARTS OF THE STORE
      // await dispatch(thunkGetUserThread(thread.id))
      await dispatch(thunkGetUsers())
      setImage(undefined)
    }
    else{
      const data = await res.json()
      const valErrors = {"image": data.errors.image[0]}
      setErrors(valErrors)
    }

  }

  if(!user) return <div></div>

  return (
    <div className='user_thread--wrapper'>
      <div className='thread_user--image' style={imagePreview ? {backgroundImage: `url(${imagePreview})`} : {backgroundImage: `url(${thread?.image})`}}>
        { user?.image || imagePreview ? null : <span>{user?.username.charAt(0)}</span> }
      </div>
      {
        auth?.id === user?.id ?
        <form onSubmit={handleUpdateImage} encType="multipart/form-data">
        <div className='update_image--span'>
            <label className='update_image--button' htmlFor='user-image'>Change Image</label>
            { image ? <span>{image?.name}</span> : <span>No file chosen</span> }
            <input id='user-image' type="file" accept="image/*" onChange={(e) => handleImage(e)}/>
        </div>
        { image ?
          <button className='submit_image--button'>
            <span>Update</span>
            <FaCheck/>
          </button> :
          null
        }
        {errors.image && <p style={{"color": "red"}}>{errors.image}</p>}
        </form> :
        null
      }
    </div>
  )
}

export default ThreadUser
