import React from 'react'
import { useSelector } from 'react-redux'
import './teamhome.css';

function TeamHome() {
  const team = useSelector(state => state.teams.singleTeam)
  return (
    <main className='views--wrapper'>
        <header className='views--header--wrapper'>
                <div className='views--header team_home--header'>
                    <span className='views--header_label'>Welcome to {team.name}</span>
                    <span className='team--description'>{team.description}</span>
                </div>

        </header>
        <section className='team_home--contents'>
              <div className='team_home--data'>
                  <div className='team_home--image' style={{backgroundImage: `url(${team?.image})`}}></div>
                  <h1 className='team_home--name'>{team?.name}</h1>
                  <p className='team_home--description'>{team?.description}</p>
                  <span className='team_home--member_count'>{team?.users.length} members</span>
              </div>
        </section>
    </main>
  )
}

export default TeamHome
