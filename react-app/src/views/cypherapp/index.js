import React, { useEffect, useState } from 'react';
import { Switch, Route, useParams, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetTeam } from '../../store/teams';
import Aside from '../../components/aside'
import Channel from '../channel'
import DirectMessage from '../directmessage'
import NewMessage from '../newmessage'
import Welcome from '../welcome';
import DataLoading from '../../components/loading/DataLoading';
import UserThread from '../../components/userthread'

function CypherApp() {
    const [ loading, setLoading ] = useState(true)
    const sessionUser = useSelector((state) => state.session.user);
    const thread = useSelector(state => state.thread.current)
    const team = useSelector(state => state.teams.singleTeam)
    const { teamId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetTeam(teamId))
        .then(() => setLoading(false))
    }, [dispatch])

    if (!sessionUser) return <Redirect to='/sign-in' />

    if (loading || !team) return <DataLoading></DataLoading>

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
                <Route path={`/team/${teamId}`}>
                    <Welcome/>
                </Route>
            </Switch>
            {
                thread.hasOwnProperty("username") ?
                <UserThread/> :
                null
            }
        </main>
        </>
    )
}

export default CypherApp
