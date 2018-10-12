import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux'
import Card from './Card/Card'
import './Lists.css'


class Lists extends Component {
  render() {
    const cards = this.props.cards.map(card => {
      return (
        <Card key={card.id} id={card.id} title={card.title} teams={card.teams} showCard={this.props.showCard} listId={this.props.id} />
      )
    })
    return (
      <Aux>
        <div className="Lists">
          <div style={{position: 'relative'}}>
            <div className="btn-close-list" onClick={this.props.deleteList} data-list-id={this.props.id}>X</div>
            <h2>{this.props.title}</h2>
          </div>
          <div className="Lists-card">
            {cards}
          </div>
          <div className="Lists-new-card">
            <input onChange={this.props.newCardName} type="text" placeholder="Card name..." data-lists-id={this.props.id} />
            <button onClick={this.props.addNewCard} data-lists-id={this.props.id} >+ Add</button>
          </div>
        </div>
      </Aux>
    )
  }
}

export default Lists;