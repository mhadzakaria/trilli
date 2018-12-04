import React from 'react';

import Aux from '../../hoc/Aux/Aux';
import './Layout.css';

const layout = (props) => {
  return (
    <Aux>
      <div className="Layout">
        {props.children}
      </div>
    </Aux>
  )
}

export default layout;