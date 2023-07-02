import React, { useState, useEffect } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { thunkGetTeams } from '../../store/teams';
import { logout } from "../../store/session";
import { FaArrowRight } from 'react-icons/fa'
import './dashboard.css';


function Dashboard() {
    const [ loading, setLoading ] = useState(true)
    const sessionUser = useSelector((state) => state.session.user);
    const userTeams = useSelector((state) => state.teams.allTeams)
    const normalizedTeams = Object.values(userTeams)
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = (e) => {
        e.preventDefault();
        history.push('/sign-in')
        dispatch(logout())
    };

    const handleTeam = (id) => {
        history.push(`/team/${id}`)
    }

    const handleCreateTeam = () => {
        history.push('/create-team')
    }

    useEffect(() => {
        dispatch(thunkGetTeams())
        .then(() => setLoading(false))
    }, [dispatch])

    if (!sessionUser) return <Redirect to='/sign-in' />

    if (loading) return <div>Loading...</div>

    return (
        <main className='dashboard--wrapper'>
            <div className='dashboard--contents'>
                <div className='dashboard--container'>
                    <div onClick={(e) => handleLogout(e)} className='auth--logo'>
                        <div className='auth--image'></div>
                        <p className='auth--text'>cypher</p>
                    </div>
                    <div className='dashboard--intro'>
                        <h1>Welcome back. You smell wonderful.</h1>
                        <p>Choose a workspace below to get back to working with your team</p>
                    </div>
                    <div className='dashboard--teams'>
                        <header className='dashboard--teams_header'>
                            <p>Teams for <strong>{sessionUser.email}</strong></p>
                        </header>
                        {normalizedTeams.map(team => (
                            <div key={team.id}  onClick={() => handleTeam(team.id)} className='dashboard--team'>
                                <div className='dashboard--team--info'>
                                    <div className='dashboard--team--info_image'></div>
                                    <div>
                                        <p>{team.name}</p>
                                        <div className='dashboard_team_members--wrapper'>
                                            <div className='dashboard_team_members--span'>
                                                {[1,2,3,4,5].map(member => (
                                                    <div key={member} className='dashboard_team_members--member'></div>
                                                ))}
                                            </div>
                                            <span className='dashboard_team_members--count'>{team.numMembers} members</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='dashboard--team--arrow'>
                                    <span className='open'>Open</span>
                                    <FaArrowRight/>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='dashboard--create'>
                        <div>
                            <div></div>
                            <span>Want to use Cypher with a different team?</span>
                        </div>
                        <button onClick={() => handleCreateTeam()}>Create Another Team</button>
                    </div>
                    <div className='dashboard--logout'>
                        <p>Not seeing your workspace?</p>
                        <span className='link' onClick={(e) => handleLogout(e)}>Try a different email</span>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Dashboard
