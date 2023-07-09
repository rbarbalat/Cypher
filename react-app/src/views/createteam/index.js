import React from 'react'
import { useHistory, Redirect, Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import { FaArrowRight, FaSearch } from 'react-icons/fa'
import logo from '../../assets/cypher-logo.svg'
import landing from '../../assets/create-landing.svg'
import './createteam.css';
import '../dashboard/dashboard.css';

function CreateTeam() {
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

    if (!sessionUser) return <Redirect to='/sign-in' />


    return (
        <main className='create_team--wrapper'>
            <div className='create_landing--wrapper'>
                <div onClick={(e) => handleLogout(e)} className='auth--logo'>
                    <img src={logo} className='auth--image'/>
                </div>
                <div className='create_landing--auth'>
                    <span className='create_landing--user'>Confirmed as <strong>{sessionUser.email}</strong></span>
                    <span onClick={(e) => handleLogout(e)} className='create_landing--link'>Change</span>
                </div>
            <div className='create_team--contents  create_landing--grid'>
                <div className='create_landing--text'>
                    <h1>Create a new Cypher Team</h1>
                    <p>Cypher gives your team a home — a place where they can talk and work together. To create a new team, click the button below.</p>
                    <Link className='create_landing--button' to="/create-team/new/1">Create a Team</Link>
                </div>
                <img src={landing} className='create_landing--image'/>
            </div>
            <div className='create_landing--or'>
                <span>or</span>
            </div>
            </div>
            <div className='create_team--contents'>
                <h3>Open Team</h3>
                <div className='dashboard--teams create_team--width'>
                    <header className='dashboard--teams_header'>
                        <p>Teams for <strong>{sessionUser?.email}</strong></p>
                    </header>
                    {normalizedTeams.map(team => (
                        <div key={team.id}  onClick={() => handleTeam(team.id)} className='dashboard--team'>
                            <div className='dashboard--team--info'>
                                <div className='dashboard--team--info_image'  style={{backgroundImage: `url(${team.image})`}}></div>
                                <div>
                                    <p>{team.name}</p>
                                    <div className='dashboard_team_members--wrapper'>
                                        <div className='dashboard_team_members--span'>
                                            {team.users.slice(0,5).map(member => (
                                                <div key={member.id} style={{backgroundImage: `url(${member.image})`}} className='dashboard_team_members--member'></div>
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
                <div className='dashboard--create create_landing--logout create_team--width'>
                    <div className='dashboard--create_flex'><FaSearch/><p>Not seeing your workspace?</p></div>
                    <button onClick={(e) => handleLogout(e)}>Try a Different Email</button>
                </div>
            </div>

        </main>
    )
}

export default CreateTeam
