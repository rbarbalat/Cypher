import React, { useState, useEffect } from 'react'
import DataLoading from '../../../components/loading/DataLoading'
import './recipients.css'
import RecipientItem from './recipientItem'
import RecipientListItem from './recipientlistitem'
import { useSelector, useDispatch } from 'react-redux'
import { thunkGetAllMembers } from '../../../store/teams'


function Recipients({recipient, setRecipient}) {
    const team = useSelector(state => state.teams.singleTeam)
    const user = useSelector(state => state.session.user);
    const data = team.users
    const [query, setQuery] = useState('')
    const members = data.filter(member => member.id !== user.id)

    let filteredMembers = members
    if (query) {
        filteredMembers = filteredMembers.filter(member => member.username.toLowerCase().includes(query.toLowerCase()));
    }

    return (
        <div className='recipients--wrapper'>
            <div className='recipients--list'>
            <span>To:</span>
            { recipient ?
                <RecipientItem
                    handleRemoveRecipients={() => setRecipient(undefined)}
                    member={recipient}
                /> :
                null
            }

            {
                recipient ?
                null :
                <input
                    className='recipients--input'
                    value={query}
                    onChange={(x) => setQuery(x.target.value)}
                />
            }


            </div>
            {
                // !recipient && query.length && filteredMembers.length ?
                !recipient && filteredMembers.length ?
                <ul className='recipients--members_list'>
                {
                    filteredMembers.map(member => (
                        <RecipientListItem
                            data={member}
                            handleSelectRecipients={() => setRecipient(member)}
                        />
                    ))
                }
                </ul> :
                null
            }

        </div>
    )
}

export default Recipients
