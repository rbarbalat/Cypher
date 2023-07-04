import React from 'react';
import logo from '../../assets/cypher-logo.svg';
import './loading.css';

function Loading() {
  return (
    <div className='loading-wrapper'>
      <img className='loading-logo' src={logo}/>
    </div>
  )
}

export default Loading
