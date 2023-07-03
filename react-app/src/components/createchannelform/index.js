import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkCreateChannel } from '../../store/channels'
import { FaTimes } from 'react-icons/fa'
import Input from '../inputs/input'
import TextArea from '../inputs/textarea'
import './createchannelform.css';

function CreateChannelForm({ setCreateChannel }) {
    const [ name, setName ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ isPrivate, setIsPrivate ] = useState(false);
    const [ errors, setErrors ] = useState({});
    const dispatch = useDispatch();
    const team = useSelector(state => state.teams.singleTeam)

    const handleCreateTeam = async () => {
        const newChannel = {name, description, private: isPrivate};
        const data = await dispatch(thunkCreateChannel(team.id, newChannel))
        if (data) {
            setErrors(data)
        }
        setCreateChannel(false)

    }

    return (
        <div className='create_channel--wrapper'>
            <div onClick={() => setCreateChannel(false)}
                className='channel_details--close_wrapper'>
                <FaTimes className='channel_details--close'/>
            </div>
            <div className='create_channel--contents'>
                <header className='create_channel--header'>
                    <h3>Create New Channel</h3>
                </header>
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
                        onClick={() =>  handleCreateTeam()}
                        disabled={!name.length || !description.length}
                        className='create_channel--button'>
                        Create Channel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateChannelForm
