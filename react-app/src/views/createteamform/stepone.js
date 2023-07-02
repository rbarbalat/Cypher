import React from 'react'
import Input from '../../components/inputs/input'

function StepOne({handleStep, name, setName}) {

    return (
        <section className='create_form_step--container'>
            <span>Step 1 of 4</span>
            <h1>What's the name of your team or organization?</h1>
            <p>This will the name of your Cypher team -- choose something that your team will recognize.</p>
            <div className='create_form_step--input_container'>
                <Input
                    placeholder='Ex: Acme Marketing or Acme'
                    value={name}
                    setValue={(x) => setName(x.target.value)}
                    name='name'
                    error={undefined}
                    disabled={false}
                />
            </div>
            <div className='create_form_step--actions'>
                <button
                    type='button'
                    className='create_form_step--next'
                    onClick={(e) => handleStep(2, e)}
                    disabled={!name.length}>
                    Next
                </button>
            </div>
        </section>
    )
}

export default StepOne
