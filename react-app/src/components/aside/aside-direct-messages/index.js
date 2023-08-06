import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { FaCaretRight, FaCaretDown, FaPlus  } from 'react-icons/fa'
import DirectMessageItem from './directmessageitem'
import { useMobileMenu } from '../../../context/mobileMenuProvider'
import DirectMessageLabel from './directmessagelabel'
import { useSelector } from 'react-redux'

function AsideDirectMessages() {
    const [ expanded, setExpanded ] = useState(true)
    const team = useSelector(state => state.teams.singleTeam)
    const directPartners = useSelector(state => state.messages.partners);
    const normalizedDirectPartners = Object.values(directPartners)
    const history = useHistory();
    const { setMenu } = useMobileMenu();

    const handleNewMessage = (id) => {
        history.push(`/team/${id}/new-message`)
        setMenu(false)
    }

    return (
        <div className='aside_dropdown--wrapper'>
            <header className='aside_dropdown--header'>
                <div className='aside_dropdown--arrow_wrapper' onClick={() => setExpanded(!expanded)}>
                    {
                        expanded ?
                        <FaCaretDown className='aside_dropdown--arrow'/> :
                        <FaCaretRight className='aside_dropdown--arrow'/>
                    }
                </div>
                <DirectMessageLabel/>
            </header>
            {
            expanded ?
            <ul className='aside-dropdown--list'>
                {normalizedDirectPartners.map((directPartner) => {
                    return (
                       <li key={directPartner.id}>
                        <DirectMessageItem directPartner={directPartner}/>
                       </li>
                    )
                })}
                <li>
                    <div  onClick={() => handleNewMessage(team?.id)} className='aside_dropdown--add_wrapper'>
                        <div className='aside_dropdown--add_item'>
                            <FaPlus className='aside_dropdown--add_icon'/>
                        </div>
                        <span>Create Direct Message</span>
                    </div>
                </li>
            </ul>
            :
            null
            }
        </div>
    )
}

export default AsideDirectMessages
