import React from 'react'
import Input from '../../components/inputs/input'

function StepFour({name, handleStep}) {

    return (
        <section className='create_form_step--container'>
            <span>Step 4 of 4</span>
            <h1>Your Cypher team is ready to go ✨</h1>
            <p>Just one more step remains to utilize this product, as it is a clone and can be freely used. Simply complete the checkout process to begin solving problems aloud in real time using huddles, bringing your work to life with audio and video clips, and securely collaborating with external individuals through the Cypher App</p>

            <div className='create_form_step--actions'>
                <button onClick={(e) => handleStep(3, e)} type='button'  className='create_form_step--back'>
                    Back
                </button>
                <button type='submit' className='create_form_step--next'>
                    Finish
                </button>
            </div>
        </section>
    )
}

export default StepFour
