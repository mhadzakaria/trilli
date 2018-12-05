import React from 'react';

import Aux from '../../hoc/Aux/Aux';
import Toolbars from '../Toolbars/Toolbars';
import './Layout.css';

const layout = (props) => {
  return (
    <Aux>
      <div className="Layout">
        <Toolbars />
        {props.children}
      </div>
    </Aux>
  )
}

export default layout;