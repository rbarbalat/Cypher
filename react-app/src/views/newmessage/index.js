import React from 'react'
import MessageTextArea from '../../components/MessageTextBox';
import Recipients from './recipients';
import '../views.css';
import './newmessage.css';

function NewMessage() {
    return (
        <main className='views--wrapper'>
            <header className='views--header--wrapper'>
                <div className='views--header'>
                    <span className='views--header_label'>New Message</span>
                </div>
                <Recipients/>
            </header>

            <section className='views--feed'>

            </section>
            <MessageTextArea
                value={'none'}
                setValue={(e) => console.log(e.target.value)}
                action={null}
            />
        </main>
  )
}

export default NewMessage
