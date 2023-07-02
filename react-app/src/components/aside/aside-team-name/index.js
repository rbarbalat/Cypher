import React, { useState } from 'react'
import useOutsideClick from '../../../hooks/useOutsideClick';
import { FaChevronDown } from 'react-icons/fa'
import './asideteamname.css';
import AsideTeamMenu from './asidemenu';

function AsideTeamName({team}) {
    const { ref, isVisible, setIsVisible } = useOutsideClick();

    return (
        <div className='aside_team--wrapper'>
            <div className='aside_team--name' onClick={() => setIsVisible(true)}>
                <h1 className='aside_team--label'>{team.name}</h1>
                <FaChevronDown className='aside_team--icon'/>
            </div>
            {
                isVisible ?
                <AsideTeamMenu team={team} ref={ref}/>
                :
                null
            }
        </div>
    )
}

export default AsideTeamName
