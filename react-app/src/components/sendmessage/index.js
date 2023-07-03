import React, { useState, useRef, useEffect } from 'react'
import {useDispatch} from "react-redux"
import MessageToolbar from './messagetoolbar';
import { FaPaperPlane } from 'react-icons/fa'
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import './sendmessage.css'
import { thunkCreateDirectMessage } from "../../store/messages"

function SendMessage({partnerId}) {
    const [ editorState, setEditorState ] = useState(() => EditorState.createEmpty())
    const dispatch = useDispatch()
    const editor = useRef(null);
    const [message, setMessage] = useState("")

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

    // useEffect(() => {
    //     focusEditor();
    // }, []);

    // const focusEditor = () => {
    //     editor.current.focus();
    // };

    // const handleKeyCommand = (command) => {
    //     const newState = RichUtils.handleKeyCommand(editorState, command);
    //     if (newState) {
    //         setEditorState(newState)
    //         return true
    //     }
    //     return false
    // }

    const handleContent = async () => {
        // const contentState = editorState.getCurrentContent();
        // const json = JSON.stringify(contentState.toJS(), null, 4)
        // console.log(json)
        // console.log(contentState.toJS())
        const text = {"message" : message }
        await dispatch(thunkCreateDirectMessage(partnerId, text))
    }


    return (
        <div className='send_message--wrapper'>
            {/* <MessageToolbar editorState={editorState} setEditorState={setEditorState}/> */}
            {/* <div className='send_message--messenger'>
                {!editorState.getCurrentContent().hasText() ? <p className='placeholder'>Message</p> : null }
                <Editor
                    ref={editor}
                    editorState={editorState}
                    onChange={(editorState) => {
                        setEditorState(editorState)
                    }}
                    handleKeyCommand={handleKeyCommand}
                    customStyleMap={styleMap}
                    blockStyleFn={myBlockStyleFn}
                />
            </div> */}
            <textarea value={message} onChange={(e) => setMessage(e.target.value)}>

            </textarea>
            <button onClick={handleContent}>
              SEND A MESSAGE
            </button>
            {/* <div className='send_message--send_wrapper'>
                <div onClick={() => handleContent()} className={`send_message--send ${editorState.getCurrentContent().hasText() ? 'active-send' : ''}`}>
                    <FaPaperPlane className='send_message--send_icon'/>
                </div>
            </div> */}
        </div>
    )
}

export default SendMessage
