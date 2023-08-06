import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useMobileMenu } from '../../../context/mobileMenuProvider';
import './directmessageitem.css'
import { FaTimes } from 'react-icons/fa'

function DirectMessageItem({directPartner}) {
  const history = useHistory();
  const team = useSelector(state => state.teams.singleTeam)
  const userImage = useSelector(state => state.users.users[directPartner.id])
  const { setMenu } = useMobileMenu();

  const handleDirectMessage = (teamId, partnerId) => {
    history.push(`/team/${teamId}/direct-messages/${partnerId}`)
    setMenu(false)
  }

  return (
    <div onClick={() => handleDirectMessage(team.id, directPartner?.id)} className='direct_message_item--wrapper'>
        <div className='direct_message_item--profile_image' style={{backgroundImage: `url(${userImage?.image})`}}>
          {directPartner?.image ? null : <span>{directPartner?.partner.charAt(0)}</span>}
        </div>
        <span className='direct_message_item--label'>{directPartner?.partner}</span>
    </div>
  )
}

export default DirectMessageItem
