import React from "react";
import "./message.css";
import { FaChevronRight } from "react-icons/fa";
import { format } from "date-fns";
import { thunkGetDirectMessages } from "../../store/messages";
import { useDispatch } from "react-redux";
import { useState } from "react"
import { useSelector } from "react-redux"

function Message({ message, setThread, socket, partnerId }) {
  const dispatch = useDispatch();
  const [update, setUpdate] = useState("")

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
    setUpdate("")
  }

  function deleteDM(){
    socket.emit("delete_chat", { "id": message.id})
  }

  return (
    <div className="message--wrapper">
      {/* <div onClick={() => setEdit()}>Changes text to message</div> */}
      <div>
        <input type="text" value={update} onChange={(e) => setUpdate(e.target.value)}></input>
        <button onClick={editDM}>Edit Message</button>
        <button onClick={deleteDM}>Delete Message</button>
      </div>
      <div className="message--sender_image"></div>
      <div className="message--details_wrapper">
        <div className="message--name_time">
          <p className="message--sender_name message_feed--user">
            {message.sender}
          </p>
          <span className="message--time">{convertTime()}</span>
        </div>
        <p className="message--message">{message.message}</p>
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
  );
}

export default Message;
