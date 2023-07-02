import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearTeam } from '../../../store/teams';

const AsideTeamMenu = React.forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { team } = props;

    const handleTeamSignOut = () => {
        history.push('/dashboard')
        dispatch(clearTeam())
    }

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
        </div>
    )
})

export default AsideTeamMenu
