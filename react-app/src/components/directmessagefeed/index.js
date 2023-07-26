import React, { forwardRef, useEffect, useState } from "react";
import Message from "../message";
import TimeStamp from "../message/timestamp";
import { format, isSameDay, addDays, parseISO } from "date-fns";
import "./directmessagefeed.css";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { thunkGetUserThread } from "../../store/thread";
import { FaArrowDown } from "react-icons/fa";

const DirectMessageFeed = forwardRef(function DirectMessageFeed(props, ref) {
  const { messages, socket, partnerId } = props;
  const dispatch = useDispatch();

  const [dates, setDates] = useState([]);

  const handleUserThread = (id) => {
    dispatch(thunkGetUserThread(id));
  };

  const handleBottomScroll = () => {
    console.log(ref.current.scrollHeight)
    ref.current.scroll({
      top: ref.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const { pathname } = useLocation();
  const recipientId = pathname.split("/")[4];
  //if you send a first direct message to a new partner that is not in the store
  //and the message fails length validation, line 38 gives a typeerror
  //because the new partner isn't loaded into the store

  const partner = useSelector(
    (state) => state.messages.partners[recipientId].partner
  );

  const partnerImage = useSelector(state => state.users.users[recipientId])

  // for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
  //   dates.push(format(date, "P"));
  // }

  const areMessagesPresent = (messages, specificDate) => {
    // console.log("specificDate");
    // console.log(specificDate);
    return messages.some((message) => {
      return isSameDay(new Date(message.created_at), new Date(specificDate));
    });
  };

  // console.log("messsages above useEffect")
  // console.log(messages);

  useEffect(() => {
    console.log("line 57 in useEffect");
    console.log("pathname is ", pathname);
    const newDates = []
    messages.forEach(ele => {
      if(!newDates.includes(format(new Date(ele.created_at), "P")))
      {
          newDates.push(format(new Date(ele.created_at), "P"));
      }
    });
    setDates(newDates);
  }, [messages])

  // console.log("messages array")
  // console.log(messages)
  // console.log("dates array");
  // console.log(dates)
  useEffect(() => {
      if (ref.current) {
        ref.current.scroll({
          top: ref.current.scrollHeight,
          behavior: "smooth",
        })
      }
  }, [])

  // console.log('line 66')
  // console.log(messages)

  // console.log("dates array");
  // console.log(dates)

  return (
    <section ref={ref} id="message_feed--wrapper">
      <div className="message_feed--introduction">
        <div className="message_feed--introduction--recipient">
          <div className="message_feed--introduction--image" style={{backgroundImage: `url(${partnerImage?.image})`}}>
            {partnerImage ? null : <span>{partner.charAt(0)}</span>}
          </div>
          <div className="message_feed--introduction--information">
            <p
              onClick={() => handleUserThread(partnerId)}
              className="message_feed--user basic--link"
            >
              {partner}
            </p>
            <p>Status</p>
          </div>
        </div>
        <p className="message_feed--introduction--greeting">
          This conversation is just between{" "}
          <span className="message_feed--user">@{partner}</span> and you. Check
          out their profile to learn more about them.{" "}
          <span
            onClick={() => handleUserThread(partnerId)}
            className="basic--link"
          >
            View Profile
          </span>
        </p>
        <button className="view--bottom" onClick={handleBottomScroll}>
          <span>Most Recent</span>
          <FaArrowDown />
        </button>
      </div>
      {dates.sort((a,b) => {
        return new Date(a).getTime() - new Date(b).getTime();
      }).map((date) => {
        // console.log("date on line 116");
        // console.log(date);
        return (
          <>
            {messages.length && areMessagesPresent(messages, date) ? (
              <TimeStamp label={date}>
                {messages
                  .filter((message) =>
                    isSameDay(new Date(message.created_at), new Date(date))
                  )
                  .map((message) => {
                    // console.log("new Date ", new Date(date));
                    // console.log("new date created at ", new Date(message.created_at));
                    return (
                      <Message
                        type="direct"
                        message={message}
                        socket={socket}
                        partnerId={partnerId}
                      />
                    );
                  })}
              </TimeStamp>
            ) : null}
          </>
        );
      })}
    </section>
  );
});

export default DirectMessageFeed;
