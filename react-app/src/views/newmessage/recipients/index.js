import React, { useState } from 'react'
import './recipients.css'
import RecipientItem from './recipientItem'
import RecipientListItem from './recipientlistitem'

const members = [
    {
        name: 'John Smith'
    },
    {
        name: 'Alice Wonderland'
    },
    {
        name: 'Philip Cartwright'
    }
]

function Recipients() {
    const [recipients, setRecipients ] = useState([])
    const [query, setQuery] = useState('')
    let filteredMembers = members.filter(member => !recipients.some(recipient => recipient.name === member.name));

    if (query) {
        filteredMembers = filteredMembers.filter(member => member.name.toLowerCase().includes(query.toLowerCase()));
    }

    const handleSelectRecipients = (recipient) => {
        const newState = [...recipients, recipient];
        setRecipients(newState)
    }

    const handleRemoveRecipients = (selectedRecipient) => {
        const newState = recipients.filter(recipient => recipient.name !== selectedRecipient.name);
        setRecipients(newState)
    }


    return (
        <div className='recipients--wrapper'>
            <div className='recipients--list'>
            <span>To:</span>
            {
                recipients.map(recipient => (
                    <RecipientItem
                        handleRemoveRecipients={handleRemoveRecipients}
                        data={recipient}
                    />
                ))
            }
            {
                recipients.length ?
                null :
                <input
                    className='recipients--input'
                    value={query}
                    onChange={(x) => setQuery(x.target.value)}
                />
            }


            </div>
            {
                query.length && filteredMembers.length ?
                <ul className='recipients--members_list'>
                {
                    filteredMembers.map(member => (
                        <RecipientListItem
                            data={member}
                            handleSelectRecipients={handleSelectRecipients}
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
