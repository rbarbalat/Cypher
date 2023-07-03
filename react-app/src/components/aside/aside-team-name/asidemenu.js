import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearTeam, deleteTeam } from '../../../store/teams';
import { useParams } from 'react-router-dom';

const AsideTeamMenu = React.forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { team } = props;
    const userId = useSelector(state => state.session.user.id)
    const status = useSelector(state => state.teams.singleTeam.users.find(user => user.id === userId).status)
    const { teamId } = useParams()

    const handleTeamSignOut = () => {
        history.push('/dashboard')
        dispatch(clearTeam())
    }

    const handleTeamDelete = () => {
        dispatch(deleteTeam(teamId))
        history.push('/dashboard')
    }

    const isOwner = (status === "owner")
    console.log(isOwner);
    return (
        <div ref={ref} className='aside_team--details'>
            <div className='aside_team--header'>
                <div className='aside_team--image'></div>
                <div className='aside_team--information'>
                    <p>{team.name}</p>
                </div>
            </div>
            <div onClick={() => handleTeamSignOut()} className='aside_team--links_section'>
                <p>Sign out of {team.name}</p>
            </div>
            {isOwner &&
            <div onClick={() => handleTeamDelete()} className='aside_team--links_section'>
                <p>Delete Team</p>
            </div>}
        </div>
    )
})

export default AsideTeamMenu
