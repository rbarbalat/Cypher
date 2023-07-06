import React from 'react'
import {useSelector} from "react-redux"
import { thunkDeleteUserFromChannel } from '../../store/channels'
import {useHistory} from "react-router-dom"
import {useDispatch} from "react-redux"

function ChannelMemberItem({team, channel, member, handleSelectRecipients, isOwner, isAuthorizedByTeam}) {
    console.log(member)
    const user = useSelector(state => state.session.user)
    let displayDeleteButton = false;
    const dispatch = useDispatch();
    const history = useHistory();
    let teamUsers = useSelector(state => state.teams.singleTeam.users)
    let memberStatusInTeam = teamUsers.find(user => user.id == member.id).status
    // if(user.id == member.id)
    // {
    //     //channel owners and team admins/owners can't delete themselves
    //     if(!isOwner && !isAuthorizedByTeam) displayDeleteButton = true;
    // }
    // else
    // {
    //     //user is not the member, set button true if the member is not owner and member not authorized by team
    //     let memberNotOwner =
    // }
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
        console.log("inside deleteMember");
        history.push(`/team/${team.id}`);
        dispatch(thunkDeleteUserFromChannel(channel.id, member.id));
    }

  return (
    <li onClick={handleSelectRecipients} className='recipient_list_item--wrapper'>
        <div className='recipient_list_item--image'>
           <span>{member.username.charAt(0)}</span>
        </div>
        <span className='recipient_list_item--name'>
            {member.username}
            <small style={{color: 'red'}}>
                Chan Status: {member.status}
            </small>
            <span> &bull; </span>
            <small style={{color: 'red'}}>
            Team Status: {memberStatusInTeam}
            </small>
        </span>
        {
            displayDeleteButton ? <button onClick={(event) => deleteMember(event)}>Delete</button> : null
        }
    </li>
  )
}

export default ChannelMemberItem
