import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { thunkGetFeed } from '../../../store/feed';
import { FaLock, FaHashtag } from 'react-icons/fa'
import { useTeam } from '../../../context/teamProvider';
import './channelitem.css';

function ChannelItem({channel}) {
  const history = useHistory();
  const { teamId } = useTeam();
  const dispatch = useDispatch();

  const handlePopulateChannel = (id) => {
    const type = 'channel'
    dispatch(thunkGetFeed(type, id))
    .then(() => history.push(`/team/${teamId}/channels/${id}`))
  }

  return (
    <div onClick={() => handlePopulateChannel(channel.id) } className='channel_item--wrapper'>
        <div className='channel_item--icon_wrapper'>
            {
            channel.private ?
            <FaLock className='channel_item--icon' /> :
            <FaHashtag  className='channel_item--icon'/>
            }
        </div>
        <span className='channel_item--label'>{channel.name}</span>
    </div>
  )
}

export default ChannelItem
