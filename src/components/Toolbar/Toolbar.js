import React from 'react';

import Aux from '../../hoc/Aux/Aux';
import './Toolbar.css';

const toolbar = (props) => {
  return (
    <Aux>
      <button className="Toolbar" onClick={props.clicked}>
        +
      </button>
    </Aux>
  )
}

export default toolbar