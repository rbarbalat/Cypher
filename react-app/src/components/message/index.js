import React from "react";
import "./message.css";
import useOutsideClick from "../../hooks/useOutsideClick";
import { FaCheck, FaChevronRight, FaEdit, FaTimes, FaTrashAlt } from "react-icons/fa";
import { format } from "date-fns";
import { thunkGetDirectMessages } from "../../store/messages";
import { useDispatch } from "react-redux";
import { useState } from "react"
import { useSelector } from "react-redux"
import Modal from "../modal";
import { thunkGetLiveChats } from "../../store/channels";
import { thunkGetUserThread } from "../../store/thread";

function Message({ message, setThread, socket, partnerId, channelId, isLiveChat }) {
  const dispatch = useDispatch();
  const [updating, setUpdating] = useState(false);
  const [update, setUpdate] = useState(message.message);
  const { ref, isVisible, setIsVisible } = useOutsideClick();
  const user = useSelector(state => state.session.user)

  const convertTime = () => {
    const date = new Date(message.created_at);
    return format(new Date(date), "p");
  };

  const handleUserThread = (id) => {
    dispatch(thunkGetUserThread(id))
  }

  console.log(message)

  function editDM(){
    if(isLiveChat)
    {
      socket.emit("update_live_chat", {
        id: parseInt(message.id),
        message: update,
        channel_id: parseInt(channelId)
      });
      dispatch(thunkGetLiveChats(parseInt(partnerId)));
    }
    else
    {
      socket.emit("update_chat", {
        id: parseInt(message.id),
        message: update,
        sender_id: parseInt(user.id),
        recipient_id: parseInt(partnerId)
      });
      dispatch(thunkGetDirectMessages(parseInt(partnerId)));
    }
    //message.message is the content of the paragraph below
    message.message = update
    setUpdating(false)
  }

  function deleteDM(){
    if(isLiveChat)
    {
      socket.emit("delete_live_chat", {
        id: parseInt(message.id),
        channel_id: parseInt(channelId)
      })
    }
    else
    {
      socket.emit("delete_chat", {
        id: parseInt(message.id),
        sender_id: parseInt(user.id),
        recipient_id: parseInt(partnerId)
      })
    }
    setIsVisible(false)
  }

  return (
    <>
    {
      isVisible ?
      <Modal>
        <div ref={ref} className="message--delete--modal">
          <p className="message--delete--modal--message"><strong>Are you sure you want to delete this message?</strong><br/>This can't be undone.</p>
          <div className="message--delete--modal--actions">
            <button onClick={() => setIsVisible(false) }className="message--delete--modal--action modal--cancel">Cancel Delete</button>
            <button onClick={deleteDM} className="message--delete--modal--action  modal--delete">Delete Message</button>
          </div>
        </div>
      </Modal> :
      null
    }
    <div className="message--wrapper">
      <div className="message--sender_image" style={user.id === message.sender_id ? {backgroundImage: `url(${user.image})`} : {backgroundImage: `url(${message.image})`}}></div>
      <div className="message--details_wrapper">
        <div className="message--name_time">
          <p onClick={() => handleUserThread(message.sender_id)} className="message--sender_name message_feed--user basic--link">
            {isLiveChat ? message.username : message.sender}
          </p>
          <span className="message--time">{convertTime()}</span>
        </div>
        <div className="message--message--wrapper">
          <div className="message--message--contents">
            {
            updating ?
            <div className="update_message--wrapper">
              <span style={update.length > 500 ? {color: 'red'} : null} className="message_textarea--count">{ update.length <=500 ? `${500 - update.length} characters left` : 'Character Limit Reached'}</span>
              <textarea className="message--update--input" type="text" value={update} onChange={(e) => setUpdate(e.target.value)}></textarea>
            </div>
               :
              <div className="message--contents">
                <p className="message--message">{message.message}</p>
              </div>
            }
            {
              updating ?
              <button disabled={!update.length || update.length > 500} className={`message--action--btn message--confirm ${update.length && update.length <= 500 ? 'active--confirm' : ''}`} onClick={editDM}>
                <>Confirm</>
                <FaCheck/>
              </button>
              :
              null
            }
          </div>
          { user.id === message.sender_id ?
          <div className={`message--actions ${updating ? 'show--actions' : ''}`}>
              <button className="message--action--btn message--edit" onClick={updating ? () => setUpdating(false) : () => setUpdating(true)}>
              {
              updating ?
              <>
              <FaTimes/>
              </> :
              <>
              <FaEdit/>
              </>
              }
              </button>
            <span>|</span>
            <button className="message--action--btn message--delete" onClick={() => setIsVisible(true)}>
              <>
              <FaTrashAlt/>
              </>
            </button>
          </div> :
          null}
        </div>


        {message.replies ? (
          <div
            onClick={() => setThread({ state: true })}
            className="message--replies"
          >
            <div className="message--replies--flex">
              {message.replies.slice(0, 2).map((replier) => (
                <div className="message--replier--image"></div>
              ))}
              <span className="message--replies--count">
                {message.replies.length} replies
              </span>
            </div>
            <FaChevronRight className="message--replies--icon" />
          </div>
        ) : null}
      </div>
    </div>
    </>
  );
}

export default Message;
