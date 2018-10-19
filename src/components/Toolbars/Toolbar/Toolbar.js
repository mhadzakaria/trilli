import React from 'react';

import Aux from '../../../hoc/Aux/Aux';
import './Toolbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const toolbar = (props) => {
  return (
    <Aux>
      <button className="Toolbar" onClick={props.clicked}>
        <FontAwesomeIcon icon="home" />
      </button>
      <button className="Toolbar" onClick={props.clicked}>
        <FontAwesomeIcon icon="chalkboard" /> Board
      </button>
    </Aux>
  )
}

export default toolbar;