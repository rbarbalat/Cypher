import React from 'react';
import { useState } from 'react';
import './inputs.css';
import { FaRegTimesCircle, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';


function Input({name, label, placeholder, iconRight, iconLeft, type, error, value, setValue, disabled}) {
  const [passwordHidden, setPasswordHidden] = useState(true);

  return (
    <label htmlFor={name} className={`input-wrapper ${label ? 'input-with-label' : 'input-without-label'}`}>
        {iconLeft}
        <input
          id={name}
          name={name}
          defaultValue={value}
          onChange={setValue}
          type={type === 'password' ? passwordHidden ? 'password' : 'text' : type}
          className={`input ${iconLeft ? 'pad-left' : ''}`}
          placeholder={placeholder}
          style={error ? {border: '1px solid #ff1313'} : null}
          disabled={disabled}
        />
        {label ? <span className='body input-label'>{label}</span> : null}
        {
          type === 'password' ?
          passwordHidden ?
          <FaRegEyeSlash onClick={disabled ? null : () => setPasswordHidden(false)} className='password-icon'/> :
          <FaRegEye onClick={disabled ? null : () => setPasswordHidden(true)} className='password-icon'/> :
          null
        }

        {error &&
          <div className='input-error'>
            <FaRegTimesCircle className='input-error__icon'/>
            <small className='input-error__label'>{error}</small>
          </div>
        }


        {iconRight}
    </label>
  )
}

export default Input
