import React from 'react'
import { FaBold, FaItalic, FaListOl, FaListUl, FaStrikethrough, FaQuoteRight, FaCode } from 'react-icons/fa';
import { RichUtils } from "draft-js";


function MessageToolbar({editorState, setEditorState}) {
    const tools = [
        {
            label: "bold",
            style: "BOLD",
            icon: <FaBold/>,
            method: "inline"
        },
        {
            label: "italic",
            style: "ITALIC",
            icon: <FaItalic/>,
            method: "inline"
        },
        {
            label: "strike-through",
            style: "STRIKETHROUGH",
            icon: <FaStrikethrough/>,
            method: "inline"
        },
        {
            break: true
        },
        {
            label: "Ordered-List",
            style: "ordered-list-item",
            icon: <FaListOl/>,
            method: "block",
        },
        {
            label: "Unordered-List",
            style: "unordered-list-item",
            icon: <FaListUl/>,
            method: "block",
        },
        {
            break: true
        },
        {
            label: "Blockquote",
            style: "blockQuote",
            icon: <FaQuoteRight/>,
            method: "block",
        },
        {
            break: true
        },
        {
            label: "Code Block",
            style: "CODEBLOCK",
            icon: <FaCode/>,
            method: "inline",
        }
    ]

    const applyStyle = (e, style, method) => {
        e.preventDefault();
        method === "block"
          ? setEditorState(RichUtils.toggleBlockType(editorState, style))
          : setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    };

    const isActive = (style, method) => {
        if (method === "block") {
          const selection = editorState.getSelection();
          const blockType = editorState
            .getCurrentContent()
            .getBlockForKey(selection.getStartKey())
            .getType();
          return blockType === style;
        } else {
          const currentStyle = editorState.getCurrentInlineStyle();
          return currentStyle.has(style);
        }
    };

    return (
        <div className="message_toolbar--wrapper">
        {tools.map((item, idx) => (
            item.break ?
            <div className='break'>|</div> :
            <button
                className='message_toolbar--icon'
                style={{
                    color: isActive(item.style, item.method)
                    ? "rgba(0, 0, 0, 1)"
                    : "rgba(0, 0, 0, 0.3)",
                }}
                key={`${item.label}-${idx}`}
                title={item.label}
                onClick={(e) => applyStyle(e, item.style, item.method)}
                onMouseDown={(e) => e.preventDefault()}
            >
            {item.icon}
            </button>
        ))}
        </div>
    )
}

export default MessageToolbar
