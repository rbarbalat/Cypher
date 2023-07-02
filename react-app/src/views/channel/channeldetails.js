import React, { useState } from 'react'
import { FaHashtag, FaLock, FaSearch, FaTimes, FaUserPlus } from 'react-icons/fa'
import RecipientListItem from '../newmessage/recipients/recipientlistitem';
const members = [
    {
        name: 'John Smith'
    },
    {
        name: 'Alice Wonderland'
    },
    {
        name: 'Philip Cartwright'
    },

]

const ChannelDetails = React.forwardRef((props, ref) => {
    const { data, setIsVisible } = props;
    const [ tab, setTab ] = useState('about');
    const [ memberQuery, setMemberQuery ] = useState('')
    let filteredMembers = members;
    if (memberQuery) {
        filteredMembers = filteredMembers.filter(member => member.name.toLowerCase().includes(memberQuery.toLowerCase()));
    }

    return (
        <div ref={ref} className='channel_details--wrapper'>
            <div onClick={() => setIsVisible(false)}
                className='channel_details--close_wrapper'>
                <FaTimes className='channel_details--close'/>
            </div>
            <header className='channel_details--header'>
                <span className='channel_details--title'>
                    { data.private ?
                    <FaLock/>
                    :
                    <FaHashtag/>
                    }
                    {data.name}
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
                </div>
            </header>
            {
                tab === 'about' ?
                <div className='channel_details--contents about--section'>
                    <div className='channel_details--about_container'>
                        <div className='channel_details--about_item'>
                            <span className='channel_details--about_item-link'>Edit</span>
                            <p>Description</p>
                            <p>{`Channel description`}</p>
                        </div>
                        <div className='channel_details--about_item'>
                            <p>Created by</p>
                            <p>{`Channel organizer`}</p>
                        </div>
                        <div className='channel_details--about_item'>
                            <p className='leave'>Leave Channel</p>
                        </div>
                    </div>
                    <span className='channel_details--channel_id'>Channel ID: {`channel Id`}</span>
                </div> :
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
                        <li className='recipient_list_item--wrapper'>
                            <div className='recipient_list_item--image'>
                                <FaUserPlus className='add_icon'/>
                            </div>
                            <span className='recipient_list_item--name'>Add Member</span>
                        </li>
                        { filteredMembers.length ?
                            filteredMembers.map(member => (
                                <RecipientListItem
                                    data={member}
                                    handleSelectRecipients={() => console.log(member)}
                                />
                            ))
                        :
                        <li className='channel_details--no_members'>
                            <p>No matches for <strong>{memberQuery}</strong></p>
                        </li>
                        }
                    </ul>


                </div>
            }
        </div>
    )
})

export default ChannelDetails
