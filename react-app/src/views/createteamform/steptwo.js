import React from 'react'
import Input from '../../components/inputs/input'

function StepTwo({handleStep, description, setDescription}) {

    return (
        <section className='create_form_step--container'>
            <span>Step 2 of 4</span>
            <h1>Describe what your team is working on now.</h1>
            <p>This could be anything: a project, campaign, event, or the deal you’re trying to close.</p>
            <div className='create_form_step--input_container'>
                <Input
                    placeholder='Ex: Q4 budget, autumn campaign'
                    value={description}
                    setValue={(x) => setDescription(x.target.value)}
                    name='description'
                    error={undefined}
                    disabled={false}
                />
            </div>
            <div className='create_form_step--actions'>
                <button onClick={() => handleStep(1)} type='button'  className='create_form_step--back'>
                    Back
                </button>
                <button
                    type='button'
                    className='create_form_step--next'
                    onClick={() => handleStep(3)}
                    disabled={!description.length}>
                    Next
                </button>
            </div>
        </section>
    )
}

export default StepTwo
