import React from 'react'
import {useSelector} from "react-redux"
import { thunkDeleteUserFromChannel } from '../../store/channels'
import {useHistory} from "react-router-dom"
import {useDispatch} from "react-redux"
import { FaTrashAlt } from 'react-icons/fa'

function ChannelMemberItem({team, channel, member, handleSelectRecipients, isOwner, isAuthorizedByTeam}) {
    const user = useSelector(state => state.session.user)
    let displayDeleteButton = false;
    const dispatch = useDispatch();
    const history = useHistory();
    const channelOwner = channel.users.find(user => user.status === "owner")
    const teamOwner = team.users.find(user => user.status === "owner")
    let teamUsers = useSelector(state => state.teams.singleTeam.users)
    let userInTeam = teamUsers.find(user => user.id === member.id);

    let memberStatusInTeam = null;
    if (userInTeam && userInTeam.status) {
      memberStatusInTeam = userInTeam.status;
    }

    if(memberStatusInTeam == "member"){
        if(user.id == member.id)
        {
            //channel owners and team admins/owners can't delete themselves
            if(!isOwner && !isAuthorizedByTeam) displayDeleteButton = true;
        }
        else
        {
            //user is not the member, set button true if the member is not owner and member not authorized by team
            if(isOwner || isAuthorizedByTeam ) displayDeleteButton = true;
        }
    }

    const deleteMember = (event) => {
        event.stopPropagation();
        history.push(`/team/${team.id}`);
        dispatch(thunkDeleteUserFromChannel(channel.id, member.id));
    }

  return (
    <li onClick={handleSelectRecipients} className='recipient_list_item--wrapper'>
        <span className='recipient_list_item--span'>
            <div className='recipient_list_item--image' style={{backgroundImage: `url(${member?.image})`}}>
            { member?.image ? null : <span>{member?.username.charAt(0)}</span> }
            </div>
            <span className='recipient_list_item--name'>
                <span>{member.username}</span>
                { teamOwner?.id === member?.id ?
                    <span className='recipient_list_item--owner'>Team Owner</span> :
                null
                }
                { channelOwner?.id === member?.id ?
                    <span className='recipient_list_item--owner'>Channel Owner</span> :
                null
                }
            </span>
        </span>
        {
           isAuthorizedByTeam !== null && displayDeleteButton ?
            <button className='recipient_list_item--button' onClick={(event) => deleteMember(event)}>
                <FaTrashAlt />
                <span>Remove member</span>
            </button> :
            null
        }
    </li>
  )
}

export default ChannelMemberItem
