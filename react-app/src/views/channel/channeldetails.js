import React, { useState } from 'react'
import { FaHashtag, FaLock, FaSearch, FaTimes, FaUserPlus } from 'react-icons/fa'
import RecipientListItem from '../newmessage/recipients/recipientlistitem';
import { deleteChannel, thunkDeleteUserFromChannel, thunkGetChannel } from '../../store/channels';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from "react-redux"
import {useHistory} from "react-router-dom"
import ChannelMemberItem from './channelmemberitem';
import { thunkGetUserThread } from '../../store/thread';

const ChannelDetails = React.forwardRef((props, ref) => {
    const { channel, team, setIsVisible } = props;
    const [ tab, setTab ] = useState('about');
    const [ memberQuery, setMemberQuery ] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()
    const users = channel.users
    const teamUsers = useSelector(state => state.teams.singleTeam.users)
    let filteredMembers = users;
    if (memberQuery) {
        filteredMembers = filteredMembers.filter(member => member.username.toLowerCase().includes(memberQuery.toLowerCase()));
    }
    const userIds = users.map(user => user.id)

    const notInChannelUsers = teamUsers.filter(tu => !userIds.includes(tu.id) )
    console.log(notInChannelUsers)

    const {channelId} = useParams()
    const handleDelete = () => {
        dispatch(deleteChannel(channelId))
        .then(() => history.push(`/team/${team.id}`))
    }
    const user = useSelector(state => state.session.user)
    const deleteMember = () => {
        console.log("inside deleteMember")
        history.push(`/team/${team.id}`)
        dispatch(thunkDeleteUserFromChannel(channelId, user.id))
    }
    const owner = channel.users.find(user => user.status === "owner")
    const isOwner = owner.id === user.id;
    console.log("isOwner    ", isOwner)

    const authorizedTeam = team.users.filter(user => user.status === "owner" || user.status == "admin" );
    let isAuthorizedByTeam = authorizedTeam.find(person => person.id == user.id)
    isAuthorizedByTeam ? isAuthorizedByTeam = true : isAuthorizedByTeam = false
    const onlyTeamAuthorized = isAuthorizedByTeam
    const isAuthorized = isOwner || isAuthorizedByTeam;
    console.log("auth from team", isAuthorizedByTeam)
    console.log(isAuthorized, "isAuthorized")

    const handleUserThread = (id) => {
        dispatch(thunkGetUserThread(id))
        setIsVisible(false)
    }

    const handleJoin = async (id, user_id) => {
        console.log(id, 'channelId', user_id, 'userId');
        const res = await fetch(`/api/channels/${id}/members/${user_id}`, {
            method: "POST"
        })
        if(res.ok){
            const romansThing = await res.json;
            console.log(romansThing);
            dispatch(thunkGetChannel(id));
        }
    }
    return (
        <div ref={ref} className='channel_details--wrapper'>
            <div onClick={() => setIsVisible(false)}
                className='channel_details--close_wrapper'>
                <FaTimes className='channel_details--close'/>
            </div>
            <header className='channel_details--header'>
                <span className='channel_details--title'>
                    {channel.private ?
                    <FaLock/>
                    :
                    <FaHashtag/>
                    }
                    {channel.name}
                </span>
                <div className='channel_details--tabs'>
                    <div
                    onClick={() => setTab('about')}
                    className={`channel_details--tab ${tab === 'about' ? 'active--tab' : ''}`}>
                            About
                        </div>
                    <div
                    onClick={() => setTab('members')}
                    className={`channel_details--tab ${tab === 'members' ? 'active--tab' : ''}`}>
                        Members (Num)
                    </div>
                    {
                      isAuthorized ?
                        <div
                            onClick={() => setTab('add member')}
                            className={`channel_details--tab ${tab === 'add member' ? 'active--tab' : ''}`}>
                                    Add Member
                        </div> :
                        null
                    }

                </div>
            </header>
            {
                tab === 'about' ?
                <div className='channel_details--contents about--section'>
                    <div className='channel_details--about_container'>
                        <div className='channel_details--about_item'>
                            <p>Description</p>
                            <p>{channel.description}</p>
                        </div>
                        <div className='channel_details--about_item'>
                            <p>Created by</p>
                            <p className='owner--name'>{owner.username}</p>
                        </div>
                        {
                            !isOwner ?
                        <div className='channel_details--about_item' onClick={deleteMember}>
                            <p className='leave'>Leave Channel</p>
                        </div>
                            :
                            null
                        }
                        {
                            isAuthorized ?
                        <div className='channel_details--about_item' onClick={handleDelete}>
                            <p className="leave">Delete Channel</p>
                        </div>
                            :
                            null
                        }
                    </div>
                </div> :
                tab === "members" ?
                <div className='channel_details--contents members--section'>
                    <div className='channel_details--member_search'>
                        <FaSearch  className='channel_details--member_icon'/>
                        <input
                            value={memberQuery}
                            onChange={(x) => setMemberQuery(x.target.value)}
                            className='channel_details--member_input'>
                        </input>
                    </div>
                    <ul className='channel_details--member_list'>
                        {
                            isAuthorized ?
                            <li className='recipient_list_item--wrapper' onClick={() => setTab("add member")}>
                                <div className='recipient_list_item--image'>
                                    <FaUserPlus className='add_icon'/>
                                </div>
                                <span className='recipient_list_item--name'>Add Member</span>
                            </li> :
                            null
                        }

                        { filteredMembers.length ?
                            filteredMembers.map(member => (
                                <ChannelMemberItem
                                    member={member}
                                    handleSelectRecipients={() => handleUserThread(member.id)}
                                    isOwner={isOwner}
                                    isAuthorizedByTeam={isAuthorizedByTeam}
                                    onlyTeamAuthorized={onlyTeamAuthorized}
                                    channel = {channel}
                                    team = {team}
                                />

                            ))
                        :
                        <li className='channel_details--no_members'>
                            <p>No matches for <strong>{memberQuery}</strong></p>
                        </li>
                        }
                    </ul>

                </div>
                :
                        <div>{
                            notInChannelUsers.length
                            ?
                            notInChannelUsers.map(ele => (
                                <div onClick={() => handleJoin(channelId, ele.id)}>{ele.username}</div>
                            )
                        )
                            :
                            null
                        }
                        </div>
                }
        </div>
    )
})

export default ChannelDetails
