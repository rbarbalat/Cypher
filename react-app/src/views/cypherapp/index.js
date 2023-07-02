import React, { useEffect, useState } from 'react';
import { Switch, Route, useParams, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetTeam } from '../../store/teams';
import Aside from '../../components/aside'
import Channel from '../channel'
import DirectMessage from '../directmessage'
import NewMessage from '../newmessage'
import Thread from '../../components/thread'
import { useTeam } from '../../context/teamProvider';

function CypherApp() {
    const [ loading, setLoading ] = useState(true)
    const sessionUser = useSelector((state) => state.session.user);
    const team = useSelector(state => state.teams.singleTeam)
    const { teamId } = useParams();
    const dispatch = useDispatch();
    const { setTeamId } = useTeam()

    useEffect(() => {
        dispatch(thunkGetTeam(teamId))
        .then(() => setTeamId(teamId))
        .then(() => setLoading(false))
    }, [dispatch])

    if (!sessionUser) return <Redirect to='/sign-in' />

    //since team is a filled object or an empty object,
    //isn't !team always falsy, this is just if loading?
    if (loading || !team) return <div>Loading...</div>

    return (
        <>
        {/* <nav>Navigation</nav> */}
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
            </Switch>
            {/* { thread.state ?
            <Thread close={() => setThread({state: false})}/> :
            null
            } */}
        </main>
        </>
    )
}

export default CypherApp
