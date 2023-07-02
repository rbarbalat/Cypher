import React from 'react';
import { useHistory } from 'react-router-dom';
import { FaLock, FaHashtag } from 'react-icons/fa'
import { useTeam } from '../../../context/teamProvider';
import './channelitem.css';

function ChannelItem({channel}) {
  const history = useHistory();
  const { teamId } = useTeam();

  return (
    <div onClick={() => history.push(`/team/${teamId}/channels/${channel.id}`)} className='channel_item--wrapper'>
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
