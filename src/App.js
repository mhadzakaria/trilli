import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import CardCreator from './containers/CardCreator/CardCreator';

import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGhost, faHome, faChalkboard, faPlus} from '@fortawesome/free-solid-svg-icons'

library.add(faGhost, faHome, faChalkboard, faPlus)

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <CardCreator />
      </BrowserRouter>
    );
  }
}

export default App;
