import React, { useEffect, useState } from 'react';
import { Switch, Route, useParams, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetTeam } from '../../store/teams';
import Aside from '../../components/aside'
import Channel from '../channel'
import DirectMessage from '../directmessage'
import NewMessage from '../newmessage'
import DataLoading from '../../components/loading/DataLoading';
import Navigation from '../../components/navigation';
import TeamHome from '../teamhome';
import Thread from '../../components/thread'

function CypherApp() {
    const [ loading, setLoading ] = useState(true)
    const sessionUser = useSelector((state) => state.session.user);
    const team = useSelector(state => state.teams.singleTeam);
    const thread = useSelector(state => state.thread.current)
    const { teamId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetTeam(teamId))
        .then(() => setLoading(false))
    }, [dispatch])

    if (!sessionUser) return <Redirect to='/sign-in' />

    //since team is a filled object or an empty object,
    //isn't !team always falsy, this is just if loading?
    if (loading || !team) return <DataLoading></DataLoading>

    return (
        <div className='cypher--wrapper'>
        <Navigation/>
        <main id='main--wrapper'>
            <Aside/>
            <Switch>
                <Route path={`/team/${teamId}/channels/:channelId`}>
                    <Channel/>
                </Route>
                <Route path={`/team/${teamId}/direct-messages/:userId`}>
                    <DirectMessage/>
                </Route>
                <Route path={`/team/${teamId}/new-message`}>
                    <NewMessage/>
                </Route>
                <Route path={`/team/${teamId}`}>
                    <TeamHome/>
                </Route>
            </Switch>
            {Object.keys(thread).length ?
            <Thread/> :
            null
            }
        </main>
        </div>
    )
}

export default CypherApp
