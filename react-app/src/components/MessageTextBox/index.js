import React from 'react'
import './messagetextbox.css'
import { FaPaperPlane } from 'react-icons/fa'
import { useState } from "react";

function MessageTextArea({setValue, value, action}) {
  return (
    <div className='message_textarea--wrapper'>
    <div className='message_textarea--container'>
        <textarea className='message_textarea--input' value={value} onChange={setValue}>
        </textarea>
        <div className='message_textarea--actions'>
            <button className={`message_textarea--button ${value.length && 'active-btn'}`} onClick={action}>
                <span>Send</span><FaPaperPlane/>
            </button>
        </div>
    </div>
    </div>
  )
}

export default MessageTextArea
