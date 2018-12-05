import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import Aux from '../../../hoc/Aux/Aux';
import './Toolbar.css';

const toolbar = (props) => {
  return (
    <Aux>
      <button className="Toolbar" onClick={props.clicked}>
        <Link to="/home"><FontAwesomeIcon icon="home" /></Link>
      </button>
      <button className="Toolbar" onClick={props.clicked}>
        <Link to="/boards"><FontAwesomeIcon icon="chalkboard" /> Board</Link>
      </button>
    </Aux>
  )
}

export default toolbar;