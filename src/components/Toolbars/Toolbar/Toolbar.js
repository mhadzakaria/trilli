import React from 'react';
import { Link } from 'react-router-dom';

import Aux from '../../../hoc/Aux/Aux';
import './Toolbar.css';

const toolbar = (props) => {
  return (
    <Aux>
      <button className="Toolbar" onClick={props.clicked}>
        <Link to="/home"><i className="fa fa-home"> Home</i></Link>
      </button>
      <button className="Toolbar" onClick={props.clicked}>
        <Link to="/boards"><i className="fa fa-th-list"></i> Board</Link>
      </button>
    </Aux>
  )
}

export default toolbar;