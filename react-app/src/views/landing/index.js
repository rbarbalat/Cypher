import React from 'react'
import './landing.css';
import { useHistory } from 'react-router-dom';
import { FaPython, FaReact, FaCss3, FaAws, FaGithub, FaJsSquare,  } from 'react-icons/fa';
import logo from '../../assets/cypher-white.svg'

function Landing() {

    const history = useHistory();

    return (
        <main id='landing--wrapper'>
            <header className='landing_header--wrapper'>
                <div className='landing_header--contents'>
                    <div className='landing_header--logo'>
                        <img src={logo} className='landing_header--image' />
                        <span className='landing_header--text'>cypher</span>
                    </div>
                    <div className='landing_header--actions'>
                        <button onClick={() => history.push('/sign-in')} id='sign-in' className='btn'>Sign In</button>
                        <button onClick={() => history.push('/sign-up')} id='sign-up' className='btn'>Sign Up</button>
                    </div>
                </div>
            </header>
            <section className='landing_splash--wrapper'>
                <div className='landing_splash--contents'>
                    <div className='landing_splash--text'>
                        <h1>Made for people.<br/><span className='accent'>Built for productivity.</span></h1>
                        <p>Connect the right people, find anything you need and automate the rest. That’s work in Cypher, your productivity platform.</p>
                        <button onClick={() => history.push('/sign-up')} className='btn'>Sign Up</button>
                    </div>
                    <div className='landing_splash--image'></div>
                </div>
            </section>
            <section className='landing_technologies--wrapper'>
                <div className='landing_technologies--contents'>
                    <p>Technologies we trust to build this application</p>
                    <div className='landing_technologies--icons'>
                        <FaAws className='landing_technologies--icon'/>
                        <FaCss3 className='landing_technologies--icon'/>
                        <FaGithub className='landing_technologies--icon'/>
                        <FaJsSquare className='landing_technologies--icon'/>
                        <FaPython className='landing_technologies--icon'/>
                        <FaReact className='landing_technologies--icon'/>
                    </div>
                </div>
            </section>
            <section className='landing_outro--wrapper'>
                <div className='landing_outro--contents'>
                    <h2>See all you can accomplish with Cypher</h2>
                    <div className='landing_outro--actions'>
                        <button onClick={() => history.push('/sign-up')} id='outro-sign-up' className='btn'>Sign Up</button>
                        <button onClick={() => history.push('/sign-in')} id='outro-sign-in' className='btn'>Sign In</button>
                    </div>
                </div>
            </section>
            <footer className='landing_footer--wrapper'>
                <div className='landing_footer--contents'>

                </div>
            </footer>
        </main>
    )
}

export default Landing
