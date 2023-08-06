import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetFeed } from '../../../store/feed';
import { useMobileMenu } from '../../../context/mobileMenuProvider'
import { FaLock, FaHashtag } from 'react-icons/fa';
import './channelitem.css';

function ChannelItem({channel}) {
  const history = useHistory();
  const team = useSelector(state => state.teams.singleTeam)
  const dispatch = useDispatch();
  const { setMenu } = useMobileMenu();

  const handlePopulateChannel = (id) => {
    const type = 'channel'
    dispatch(thunkGetFeed(type, id))
    .then(() => history.push(`/team/${team.id}/channels/${id}`))
    setMenu(false)
  }

  return (
    <div onClick={() => handlePopulateChannel(channel?.id) } className='channel_item--wrapper'>
        <div className='channel_item--icon_wrapper'>
            {
            channel?.private ?
            <FaLock className='channel_item--icon' /> :
            <FaHashtag  className='channel_item--icon'/>
            }
        </div>
        <span className='channel_item--label'>{channel?.name}</span>
    </div>
  )
}

export default ChannelItem
