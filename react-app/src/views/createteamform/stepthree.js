import React from 'react'
import Input from '../../components/inputs/input'

function StepThree({handleStep, image, setImage}) {

    const isValidUrl = (url) => {
        const regex = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
      '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
        return !!regex.test(url);
    }

    return (
        <section className='create_form_step--container'>
            <span>Step 3 of 4</span>
            <h1>What's your team logo or visual identity?</h1>
            <p>This is going to be used to so that members can easily recognise your team.</p>
            <div className='create_form_step--input_container'>
                <Input
                    placeholder='Ex: Please enter a valid URL'
                    value={image}
                    setValue={(x) => setImage(x.target.value)}
                    name='image'
                    error={undefined}
                    disabled={false}
                />
            </div>
            <div className='create_form_step--actions'>
                <button onClick={() => handleStep(2)} type='button'  className='create_form_step--back'>
                    Back
                </button>
                <button
                    type='button'
                    className='create_form_step--next'
                    onClick={() => handleStep(4)}
                    disabled={!isValidUrl(image)}>
                    Next
                </button>
            </div>
        </section>
    )
}

export default StepThree
