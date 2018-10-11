import React from 'react';

import './Toolbars.css';
import Aux from '../../hoc/Aux/Aux';

const toolbars = (props) => {
  return (
    <Aux>
      <div className="Toolbars">
        {props.children}
      </div>
    </Aux>
  )
};

export default toolbars;