import React from 'react'
import Input from '../../components/inputs/input'

function StepThree({handleStep, image, setImage}) {

    return (
        <section className='create_form_step--container'>
            <span>Step 3 of 4</span>
            <h1>What's your team logo or visual identity?</h1>
            <p>This is going to be used to so that members can easily recognise your team.</p>
            <div className='create_form_step--input_container'>
                <Input
                    placeholder='Ex: Enter a url ending in .jpg, .png, or .jpeg'
                    value={image}
                    setValue={(x) => setImage(x.target.value)}
                    name='image'
                    error={undefined}
                    disabled={false}
                />
            </div>
            <div className='create_form_step--actions'>
                <button onClick={(e) => handleStep(2, e)} type='button'  className='create_form_step--back'>
                    Back
                </button>
                <button
                    type='button'
                    className='create_form_step--next'
                    onClick={(e) => handleStep(4, e)}
                    disabled={!image.length}>
                    Next
                </button>
            </div>
        </section>
    )
}

export default StepThree
