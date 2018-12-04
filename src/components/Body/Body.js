import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux'
import './Body.css'
import Lists from './Lists/Lists'

class Body extends Component {
  
  render () {
    const lists = this.props.lists.map(list => {
      return (
        <Lists key={list.id} id={list.id} title={list.name} cards={list.cards} newCardName={this.props.newCardName} addNewCard={this.props.addNewCard} />
      )
    });

    return (
      <Aux>
        <div className="Body">
          <div className="Body-Lists">
            { lists }
          </div>
        </div>
      </Aux>
    )
  }
}

export default Body;