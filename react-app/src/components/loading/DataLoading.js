import React from 'react';
import './loading.css';
import logo from '../../assets/cypher-logo.svg';

function DataLoading({fixed}) {
  return (
    <div className={`data_loading-container ${fixed ? 'fixed-height' : ''}`}>
        <img className='loading-logo' src={logo} alt='bustl-loading'/>
    </div>
  )
}

export default DataLoading
