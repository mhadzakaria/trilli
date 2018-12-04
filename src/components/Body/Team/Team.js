import React from 'react';

import Aux from '../../../hoc/Aux/Aux'
import './Team.css'

const team = (props) => {
  return (
    <Aux>
      <div className="Team">{props.name[0]}</div>
    </Aux>
  )
}

export default team;