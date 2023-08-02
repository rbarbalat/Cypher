import React, { useState, useEffect } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { thunkGetEveryTeam, thunkGetTeams, thunkJoinTeam } from '../../store/teams';
import { thunkclearThread } from '../../store/thread';
import { logout } from "../../store/session";
import { FaArrowRight, FaSearch } from 'react-icons/fa'
import DataLoading from '../../components/loading/DataLoading';
import logo from '../../assets/cypher-logo.svg'
import './dashboard.css';


function Dashboard() {
    const [ loading, setLoading ] = useState(true)
    const [ teamlist, setTeamList ] = useState(false);
    const [ teamQuery, setTeamQuery ] = useState('')
    const sessionUser = useSelector((state) => state.session.user);
    const userTeams = useSelector((state) => state.teams.allTeams)
    const everyTeam = useSelector(state => state.teams.everyTeam)
    const normalizedTeams = Object.values(userTeams)
    const normalizedEveryTeam = Object.values(everyTeam)
    const dispatch = useDispatch();
    const history = useHistory();

    const teamsNotJoined = normalizedEveryTeam.filter(team => !normalizedTeams.some(tm => tm.id === team.id));

    let filteredTeams = teamsNotJoined;
    if (teamQuery !== '') {
        filteredTeams = filteredTeams.filter(team => team.name.toLowerCase().includes(teamQuery.toLowerCase()))
    }

    const handleLogout = (e) => {
        e.preventDefault();
        history.push('/sign-in')
        dispatch(logout())
    };

    const handleGoToTeam = (id) => {
        history.push(`/team/${id}`)
    }

    const handleJoinTeam = (id) => {
        dispatch(thunkJoinTeam(id))
        .then(() => handleGoToTeam(id))
    }

    const handleCreateTeam = () => {
        history.push('/create-team')
    }

    useEffect(() => {
        dispatch(thunkGetTeams())
        .then(() => dispatch(thunkGetEveryTeam()))
        .then(() => dispatch(thunkclearThread()))
        .then(() => setLoading(false))
    }, [dispatch])

    if (!sessionUser) return <Redirect to='/sign-in' />

    if (loading ) return <DataLoading></DataLoading>

    return (
        <main className='dashboard--wrapper'>
            <div className='dashboard--contents'>
                <div className='dashboard--container'>
                    <div onClick={(e) => handleLogout(e)} className='auth--logo'>
                        <img src={logo} className='auth--image'/>
                    </div>
                    <div className='dashboard--intro'>
                        <h1>Welcome back. You smell wonderful.</h1>
                        <p>Choose a workspace below to get back to working with your team</p>
                    </div>
                    {
                        teamlist ?
                        <div className='dashboard--teams'>
                            <header className='dashboard--teams_header'>
                                <div className='dashboard--teams_input'>
                                    <FaSearch className='dashboard--teams_input_icon'/>
                                    <input placeholder="Search All Teams" className='dashboard--teams_input_input' value={teamQuery} onChange={(x) => setTeamQuery(x.target.value)}/>
                                </div>
                                <button className='light--button' onClick={() => setTeamList(false)}>My Teams</button>
                            </header>
                            <div className='dashboard--teams_scroller'>
                            {filteredTeams.length > 0 ? filteredTeams.map(team => (
                                <div key={team.id} onClick={() => handleJoinTeam(team.id)} className='dashboard--team'>
                                    <div className='dashboard--team--info'>
                                        <div className='dashboard--team--info_image' style={{backgroundImage: `url(${team.image})`}}></div>
                                        <div>
                                            <p>{team.name}</p>
                                            <div className='dashboard_team_members--wrapper'>
                                                <div className='dashboard_team_members--span'>
                                                    {team.users.slice(0,5).map(member => (
                                                        <div key={member.id} style={{backgroundImage: `url(${member.image})`}} className='dashboard_team_members--member'>
                                                            {member.image ? null : <span>{member?.username.charAt(0)}</span>}
                                                        </div>
                                                    ))}
                                                </div>
                                                <span className={`dashboard_team_members--count member-count-${team.users.slice(0,5).length}`}>{team.numMembers} members</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='dashboard--team--arrow'>
                                        <span className='open'>Join</span>
                                        <FaArrowRight/>
                                    </div>
                                </div>
                            ))
                            :
                             <div className='dashboard--team--none'>
                                <span>No Teams Available to Join</span>
                                <div className='dashboard--team-none-actions'>
                                    <button className='light--button' onClick={() => setTeamList(false)}>View My Teams</button>
                                    <button className='light--button' onClick={() => handleCreateTeam()}>Create A Team</button>
                                </div>
                            </div>
                            }
                            </div>
                        </div> :
                        <div className='dashboard--teams'>
                        <header className='dashboard--teams_header'>
                            <p>Teams for <strong>{sessionUser?.email}</strong></p>
                            <button className='light--button' onClick={() => setTeamList(true)}>Join a Team</button>
                        </header>
                        {normalizedTeams.map(team => (
                            <div key={team.id}  onClick={() => handleGoToTeam(team.id)} className='dashboard--team'>
                                <div className='dashboard--team--info'>
                                    <div className='dashboard--team--info_image' style={{backgroundImage: `url(${team.image})`}}></div>
                                    <div>
                                        <p>{team.name}</p>
                                        <div className='dashboard_team_members--wrapper'>
                                            <div className='dashboard_team_members--span'>
                                                {team.users.slice(0,5).map(member => (
                                                    <div key={member.id} style={{backgroundImage: `url(${member.image})`}} className='dashboard_team_members--member'>
                                                        {member.image ? null : <span>{member?.username.charAt(0)}</span>}
                                                    </div>
                                                ))}
                                            </div>
                                            <span className={`dashboard_team_members--count member-count-${team.users.slice(0,5).length}`}>{team.numMembers} members</span>
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
                    }

                    <div className='dashboard--create'>
                        <div>
                            <div></div>
                            <span>Want to use Cypher with a different team?</span>
                        </div>
                        <button onClick={() => handleCreateTeam()}>Create Another Team</button>
                    </div>
                    <div className='dashboard--logout'>
                        <p>Not seeing your workspace?</p>
                        <span className='link' onClick={(e) => handleLogout(e)}>Logout</span>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Dashboard
