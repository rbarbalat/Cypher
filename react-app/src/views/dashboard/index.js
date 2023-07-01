import React from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import { FaArrowRight } from 'react-icons/fa'
import './dashboard.css';

const fakeTeams = [
    {
        name: "Fake Team 1",
        numMembers: 300
    },
    {
        name: "Fake Team 2",
        numMembers: 1300
    },
    {
        name: "Fake Team 3",
        numMembers: 3450
    },
]

function Dashboard() {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    console.log(sessionUser)

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout())
        .then(() => history.push('/sign-in'));
    };

    if (!sessionUser) return <Redirect to='/sign-in' />

    return (
        <main id='dashboard--wrapper'>
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
                            <p>Teams for {sessionUser.email}</p>
                        </header>
                        {fakeTeams.map(team => (
                            <div className='dashboard--team'>
                                <div className='dashboard--team--info'>
                                    <div className='dashboard--team--info_image'></div>
                                    <div>
                                        <p>{team.name}</p>
                                        <div className='dashboard_team_members--wrapper'>
                                            <div className='dashboard_team_members--span'>
                                                {[1,2,3,4,5].map(member => (
                                                    <div className='dashboard_team_members--member'></div>
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
                        <button>Create Another Team</button>
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
