import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkCreateChannel, thunkGetChannels, thunkGetChannelsByUser, thunkJoinChannel } from '../../store/channels'
import { FaTimes } from 'react-icons/fa'
import Input from '../inputs/input'
import TextArea from '../inputs/textarea'
import './createchannelform.css';
import DataLoading from '../../components/loading/DataLoading'
import { useHistory } from 'react-router-dom'
function CreateChannelForm({ setCreateChannel }) {
    const [ name, setName ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ isPrivate, setIsPrivate ] = useState(false);
    const [ errors, setErrors ] = useState({});
    const dispatch = useDispatch();
    const team = useSelector(state => state.teams.singleTeam)
    const [tab, setTab] = useState('create')
    const [query, setQuery] = useState('')

    const joinedChannels = useSelector(state => state.channels.allChannels)
    const normalizedJoinedChannels = Object.values(joinedChannels)
    const channels = useSelector(state => state.channels.everyChannel)

    const normalizedChannels = Object.values(channels)
    const channelNotJoined = normalizedChannels.filter(channel => !normalizedJoinedChannels.some(cm => cm.id === channel.id))
    // const teamsNotJoined = normalizedEveryTeam.filter(team => !normalizedTeams.some(tm => tm.id === team.id));


    const history = useHistory()
    const handleCreateChannel = async (e) => {

        e.preventDefault(); //add e parameter/argument
        const formData = new FormData()
        formData.append("name", name)
        formData.append("description", description)
        formData.append("private", isPrivate)
        const newChannel = formData;
        const data = await dispatch(thunkCreateChannel(team.id, newChannel))
        if (data.errors)
        {
            const keys = Object.keys(data.errors)
            const vals = Object.values(data.errors)
            const valErrors = {}
            //each val is an array of length 1
            for(let i = 0; i<keys.length; i++)
            {
                valErrors[keys[i]] = vals[i][0]
            }
            setErrors(valErrors)
            console.log("printing state variable errors object")
            console.log(errors)
            return;
        } else {
            setCreateChannel(false); //do we need this?
            history.push(`/team/${team.id}/channels/${data.id}`)
        }
    }

    let filteredChannels = channelNotJoined
    if (query.length > 0) {
        filteredChannels = filteredChannels.filter(channel => channel.name.toLowerCase().includes(query.toLowerCase()))
    }

    const handleJoin = (id) => {
        dispatch(thunkJoinChannel(id))
        .then(() => dispatch(thunkGetChannelsByUser))
        .then(() => history.push(`/team/${team.id}/channels/${id}`))
        setCreateChannel(false)
    }

    useEffect(() => {
        dispatch(thunkGetChannels(team.id))
    }, [])


    if (!channels) return <DataLoading></DataLoading>

    return (
        <div className='create_channel--wrapper'>
            <div onClick={() => setCreateChannel(false)}
                className='channel_details--close_wrapper'>
                <FaTimes className='channel_details--close'/>
            </div>
            <div className='create_channel--contents'>
                <header className='create_channel--header'>
                    {
                        tab === 'create' ?
                        <h3>Create New Channel</h3>
                        :
                        <h3>Join Channel</h3>
                    }
                    <p onClick={() => setTab('create')}>Create New Channel</p>
                    <p onClick={() => setTab('join')}>Join Channel</p>
                </header>
                { tab === 'create' ?
                <form onSubmit={e => handleCreateChannel(e)}>
                <div className='create_channel--form'>
                    <Input
                        placeholder='Enter a name for the channel'
                        value={name}
                        setValue={(x) => setName(x.target.value)}
                        name="name"
                        error={errors.name}
                        disabled={false}
                    />
                    <TextArea
                        placeholder='Enter a description for the channel'
                        value={description}
                        setValue={(x) => setDescription(x.target.value)}
                        name="name"
                        error={errors.description}
                        disabled={false}
                    />
                    <label htmlFor='private' className='form--label--wrapper'>
                        <input
                            id='private'
                            checked={isPrivate}
                            type='checkbox'
                            onChange={(x) => setIsPrivate(x.target.checked)}
                        />
                        <p className='form--label--label'>Is this a private channel?</p>
                    </label>
                    <button
                        disabled={!name.length || !description.length}
                        className='create_channel--button'>
                        Create Channel
                    </button>

                </div>
                </form> :
                <div>
                    <header>
                        <input value={query} onChange={(e)=>setQuery(e.target.value)}></input>
                    </header>
                    <ul>
                        {
                            filteredChannels.map(channel => {
                                return <li style={{color:"red"}} onClick={() => handleJoin(channel.id)}>{channel.name}</li>
                            })
                        }
                    </ul>
                </div>
                }
            </div>
        </div>
    )
}

export default CreateChannelForm
