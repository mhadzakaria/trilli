import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import './Body.css';
import Lists from './Lists/Lists';
import Header from './Header/Header'


class Body extends Component {
  render () {
    const lists = this.props.lists.map(list => {
      return (
        <Lists key={list.id} id={list.id} title={list.name} cards={list.cards} newCardName={this.props.newCardName} addNewCard={this.props.addNewCard} showCard={this.props.showCard} />
      )
    });

    let newList = <p onClick={this.props.newListForm}>+ Add New List</p>;
    if (this.props.added){
      newList = (
        <div>
          <input onChange={this.props.changeNameList} type="text" placeholder="List name..."/><br />
          <button onClick={this.props.createList}>Add</button>
          <button onClick={this.props.closeFormList}>Cancel</button>
        </div>
      )
    }

    return (
      <Aux>
        <div className="Body">
          <div className="Body-Wrapper">
            <Header teams={this.props.teams} />
            <div className="Body-Canvas">
              <div className="Body-Lists">
                { lists }
                <div className="Body-Add-List">
                  {newList}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Aux>
    )
  }
}

export default Body;