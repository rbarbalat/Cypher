import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { thunkGetUserThread } from '../../store/thread'
import './teammembers.css'

function TeamMembers() {
    const team = useSelector(state => state.teams.singleTeam)
    const dispatch = useDispatch()

    const handleThread = (id) => {
        dispatch(thunkGetUserThread(id))
    }

    if (!team) return <div></div>

    return (
        <main className='views--wrapper'>
        <header className='views--header--wrapper'>
                <div className='views--header team_home--header'>
                    <span className='views--header_label'>All Members ({team.users.length})</span>
                    <span className='team--description'>{team.description}</span>
                </div>
        </header>
        <section className='team_members--contents'>
              <ul className='team_members--list'>
                {team.users.map(member => (
                    <li onClick={() => handleThread(member.id)} className='team_members--list_item'>
                        <div className='team_members--list_item--image' style={{backgroundImage: `url(${member?.image})`}}>
                            {member.image ? null : <span>{member.username.charAt(0)}</span>}
                        </div>
                        <div className='team_member'>
                            <span className='team_member--name'>{member?.username}</span>
                            {member?.status === 'owner' ? <span className='team_member--status'>Owner</span> : null }
                        </div>

                    </li>
                ))}
              </ul>
        </section>
    </main>
    )
}

export default TeamMembers
