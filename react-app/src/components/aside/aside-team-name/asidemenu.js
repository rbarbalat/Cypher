import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useMobileMenu } from '../../../context/mobileMenuProvider';
import { clearTeam, deleteTeam } from '../../../store/teams';
import { useParams } from 'react-router-dom';
import { FaArrowRightFromBracket, FaTrashCan } from 'react-icons/fa6'
import Modal from '../../modal';

const AsideTeamMenu = React.forwardRef((props, ref) => {
    const [ confirm, setConfirm ] = useState('')
    const dispatch = useDispatch();
    const history = useHistory();
    const { team } = props;
    const userId = useSelector(state => state.session.user.id)
    const status = useSelector(state => state.teams.singleTeam.users.find(user => user.id === userId).status)
    const { teamId } = useParams()
    const { setMenu } = useMobileMenu();

    const handleTeamSignOut = () => {
        history.push('/dashboard')
        dispatch(clearTeam())
        setMenu(false)
    }

    const handleTeamDelete = () => {
        dispatch(deleteTeam(teamId))
        history.push('/dashboard')
        setMenu(false)
    }

    const deleteTeamMembership = async () => {
        //fetch w/o thunk b/c redirected to dashboard where other get all teams thunk called anyway
        //and then if you go to diff pages corresponding thunks will be called
        await fetch(`/api/teams/${teamId}/member/${userId}`, {
            method: "DELETE"
        });
        history.push("/dashboard")
    }

    const isOwner = (status === "owner")
    return (
        <div ref={ref} className='aside_team--details'>
            {
                confirm === 'leave' ?
                <Modal>
                    <div className="aside_team--modal">
                        <p className="aside_team--modal--message"><strong>Are you sure you want to leave this team?</strong></p>
                        <div className="aside_team--modal--actions">
                            <button onClick={() => setConfirm('')}className="aside_team--modal--action modal--cancel">Stay on Team</button>
                            <button onClick={deleteTeamMembership} className="aside_team--modal--action  modal--delete">Leave Team</button>
                        </div>
                    </div>
                </Modal> :
                confirm === 'delete' ?
                <Modal>
                    <div className="aside_team--modal">
                        <p className="aside_team--modal--message"><strong>Are you sure you want to delete this team?</strong><br/>This can't be undone.</p>
                        <div className="aside_team--modal--actions">
                            <button onClick={() => setConfirm('')}className="aside_team--modal--action modal--cancel">Cancel Delete</button>
                            <button onClick={handleTeamDelete} className="aside_team--modal--action  modal--delete">Delete Team</button>
                        </div>
                    </div>
                </Modal> :
                null
            }
            <div className='aside_team--header'>
                <div className='aside_team--image' style={{backgroundImage: `url(${team?.image})`}}></div>
                <div className='aside_team--information'>
                    <p>{team?.name}</p>
                </div>
            </div>
            <div className='aside_team--contents'>
                <span onClick={() => handleTeamSignOut()} className='aside_team--links_section'>
                    <span>Sign out of {team?.name}</span>
                </span>
                {
                isOwner ?
                <span onClick={() => setConfirm('delete')} className='aside_team--links_section delete'>
                    <FaTrashCan className='option--icon'/>
                    <span>Delete Team</span>
                </span>
                :
                <span className='aside_team--links_section' onClick={() => setConfirm('leave')}>
                    <span>Leave the Team</span>
                    <FaArrowRightFromBracket className='option--icon'/>
                </span>
                }
            </div>
        </div>
    )
})

export default AsideTeamMenu
