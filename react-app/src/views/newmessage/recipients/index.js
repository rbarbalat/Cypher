import React, { useState, useEffect } from 'react'
import DataLoading from '../../../components/loading/DataLoading'
import './recipients.css'
import RecipientItem from './recipientItem'
import RecipientListItem from './recipientlistitem'
import { useSelector, useDispatch } from 'react-redux'
import { thunkGetAllMembers } from '../../../store/teams'


function Recipients({recipient, setRecipient}) {
    const [ loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const team = useSelector(state => state.teams.singleTeam)
    const data = useSelector(state => state.teams.allMembers);
    const [recipients, setRecipients] = useState([])
    const [query, setQuery] = useState('')

    let filteredMembers = recipients
    if (query) {
        filteredMembers = filteredMembers.filter(member => member.username.toLowerCase().includes(query.toLowerCase()));
    }

    console.log(recipients, filteredMembers)

    useEffect(() => {
        dispatch(thunkGetAllMembers(team.id))
        .then((data) => setRecipients([...Object.values(data)]))
        .then(() => setLoading(false))
    }, [dispatch])

    if (loading || !team || !data) return <DataLoading></DataLoading>

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
