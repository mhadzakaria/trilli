import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import ListBuilder from './containers/ListBuilder/ListBuilder';
// import CardManeger from './containers/CardManeger';
import Aux from './hoc/Aux/Aux';
import Layout from './components/Layout/Layout';
import Boards from './components/Boards/Boards';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Aux>
          <Layout>
            <Route path="/home" exact component={Boards} />
            <Route path="/boards" render={() => <ListBuilder/> } />
            {/* <Route path="/card" render={() => <CardManeger/> } /> */}
          </Layout>
        </Aux>
      </BrowserRouter>
    );
  }
}

export default App;
