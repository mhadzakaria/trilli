import React from 'react';

import './Spinner.css';
import Backdrop from '../Backdrop/Backdrop';

const spinner = () => (
  <Backdrop>
    <div className="Spinner">Loading...</div>
  </Backdrop>
);

export default spinner;