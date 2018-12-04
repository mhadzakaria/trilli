import React from 'react';

import './Backdrop.css';

const backdrop = (props) => {
  return (
    <div className='Backdrop'>
      {props.children}
    </div>
  )
};

export default backdrop;