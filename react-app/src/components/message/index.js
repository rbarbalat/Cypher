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

function Message({ message, setThread, socket, partnerId }) {
  const dispatch = useDispatch();
  const [updating, setUpdating] = useState(false);
  const [update, setUpdate] = useState(message.message);
  const { ref, isVisible, setIsVisible } = useOutsideClick();
  console.log(message)
  const convertTime = () => {
    const date = new Date(message.created_at);
    return format(new Date(date), "p");
  };

  function editDM(){
    console.log("the edited DM is  ---     ", update)
    console.log("the id of the edited DM is  ---  ", message.id)
    socket.emit("update_chat", { id: message.id, message: update });
    dispatch(thunkGetDirectMessages(parseInt(partnerId)));
    //message.message is the content of the paragraph below
    message.message = update
    setUpdating(false)
  }

  function deleteDM(){
    socket.emit("delete_chat", { "id": message.id})
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
      {/* <div onClick={() => setEdit()}>Changes text to message</div> */}

      <div className="message--sender_image"></div>
      <div className="message--details_wrapper">
        <div className="message--name_time">
          <p className="message--sender_name message_feed--user">
            {message.sender}
          </p>
          <span className="message--time">{convertTime()}</span>
        </div>
        <div className="message--message--wrapper">
          <div className="message--message--contents">
            {
            updating ?
              <textarea className="message--update--input" type="text" value={update} onChange={(e) => setUpdate(e.target.value)}></textarea> :
              <div>
                <p className="message--message">{message.message}</p>

              </div>
            }
            {
              updating ?
              <button disabled={!update.length} className={`message--action--btn message--confirm ${update.length ? 'active--confirm' : ''}`} onClick={editDM}>
                <>Confirm</>
                <FaCheck/>
              </button>
              :
              null
            }
          </div>
          <div className={`message--actions ${updating ? 'show--actions' : ''}`}>
            <button className="message--action--btn message--edit" onClick={updating ? () => setUpdating(false) : () => setUpdating(true)}>
              {
              updating ?
              <>
              {/* <span>Cancel</span> */}
              <FaTimes/>
              </> :
              <>
              {/* <span>Edit</span> */}
              <FaEdit/>
              </>
              }
            </button>
            <span>|</span>
            <button className="message--action--btn message--delete" onClick={() => setIsVisible(true)}>
              <>
              {/* <span>Delete</span> */}
              <FaTrashAlt/>
              </>
            </button>
          </div>
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
