import React from 'react';

import './Toolbars.css';
import Aux from '../../hoc/Aux/Aux';
import Toolbar from './Toolbar/Toolbar';

const toolbars = (props) => {
  return (
    <Aux>
      <div className="Toolbars">
        <Toolbar />
      </div>
    </Aux>
  )
};

export default toolbars;