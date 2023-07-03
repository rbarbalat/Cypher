import React, { useState, useRef, useEffect } from 'react'
import {useDispatch} from "react-redux"
import MessageToolbar from './messagetoolbar';
import { FaPaperPlane } from 'react-icons/fa'
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import './sendmessage.css'
import { thunkCreateDirectMessage, thunkGetDirectMessages } from "../../store/messages"
import { io } from "socket.io-client"
import { useSelector } from 'react-redux';
let socket;

function SendMessage({partnerId}) {
    const [ editorState, setEditorState ] = useState(() => EditorState.createEmpty())
    const dispatch = useDispatch()
    const editor = useRef(null);
    const [message, setMessage] = useState("")
    const user = useSelector(state => state.session.user)
    // const {socket}  = socket

    const styleMap = {
        CODE: {
          backgroundColor: "rgba(0, 0, 0, 0.05)",
          fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
          fontSize: 16,
          padding: 2,
        },
        HIGHLIGHT: {
          backgroundColor: "#F7A5F7",
        },
        UPPERCASE: {
          textTransform: "uppercase",
        },
        LOWERCASE: {
          textTransform: "lowercase",
        },
        CODEBLOCK: {
          fontFamily: '"fira-code", "monospace"',
          fontSize: "inherit",
          background: "#ffeff0",
          fontStyle: "italic",
          lineHeight: 1.5,
          padding: "0.3rem 0.5rem",
          borderRadius: " 0.2rem",
        },
        SUPERSCRIPT: {
          verticalAlign: "super",
          fontSize: "80%",
        },
        SUBSCRIPT: {
          verticalAlign: "sub",
          fontSize: "80%",
        },
    };

    const myBlockStyleFn = (contentBlock) => {
        const type = contentBlock.getType();
        switch (type) {
          case "blockQuote":
            return "superFancyBlockquote";
          case "leftAlign":
            return "leftAlign";
          case "rightAlign":
            return "rightAlign";
          case "centerAlign":
            return "centerAlign";
          case "justifyAlign":
            return "justifyAlign";
          default:
            break;
        }
    };


    const handleContent = async () => {
        const text = {"message" : message }
        await dispatch(thunkCreateDirectMessage(parseInt(partnerId), text))
    }


    return (
        <div className='send_message--wrapper'>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)}>

            </textarea>
            <button onClick={handleContent}>
              SEND A MESSAGE
            </button>

        </div>
    )
}

export default SendMessage
