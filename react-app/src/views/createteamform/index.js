import React, { useState } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { thunkCreateTeam } from '../../store/teams';
import StepOne from './stepone'
import StepTwo from './steptwo'
import StepThree from './stepthree'
import StepFour from './stepfour'
import './createteamform.css'

function CreateTeamForm() {
    const [ step, setStep ] = useState(1)
    const [ name, setName ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ image, setImage ] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const handleStep = (num, e) => {
        e.preventDefault();
        setStep(num)
        history.push(`/create-team/new/${num}`)
    }

    const handleCreateTeam = async (e) => {
        e.preventDefault();
        const newTeam = {name, description, image}
        const data = await dispatch(thunkCreateTeam(newTeam))
        if (data.error) {
            console.log(data.error)
        } else {
            history.push(`/teams/${data.id}`)
        }
    }

    return (
        <main id='create_team_form--wrapper'>
            <div className='create_team_form--navigation'>
            </div>
            <div className='create_team_form--main'>
                <div className='create_team_form--aside'>
                    <header className='create_team_form--header'>
                        <span>{name}</span>
                    </header>
                </div>
                <form onSubmit={handleCreateTeam} className='create_team_form--step'>
                    <Switch>
                        <Route exact path="/create-team/new/1" >
                            <StepOne handleStep={handleStep} name={name} setName={setName}/>
                        </Route>
                        <Route exact path="/create-team/new/2">
                            <StepTwo handleStep={handleStep} description={description} setDescription={setDescription}/>
                        </Route>
                        <Route exact path="/create-team/new/3">
                            <StepThree handleStep={handleStep} image={image} setImage={setImage} />
                        </Route>
                        <Route exact path="/create-team/new/4">
                            <StepFour handleStep={handleStep} name={name} />
                        </Route>
                    </Switch>
                </form>
            </div>
        </main>
    )
}

export default CreateTeamForm
