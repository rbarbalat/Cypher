import React from 'react'
import './inputs.css';
import { FaRegTimesCircle } from 'react-icons/fa';

function TextArea({name, label, placeholder, error, value, setValue, disabled}) {
  return (
    <label htmlFor={name} className={`input-wrapper ${label ? 'input-with-label' : ''}`}>
        <textarea
            id={name}
            name={name}
            defaultValue={value}
            onChange={setValue}
            className='textarea'
            placeholder={placeholder}
            style={error ? {border: '1px solid #ff1313'} : null}
            disabled={disabled}
        >
        </textarea>
        {label ? <span className='body input-label'>{label}</span> : null}
        {error &&
          <div className='input-error'>
            <FaRegTimesCircle className='input-error__icon'/>
            <small className='input-error__label'>{error}</small>
          </div>
        }
    </label>
  )
}

export default TextArea
