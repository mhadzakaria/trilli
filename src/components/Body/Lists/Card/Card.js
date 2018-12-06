import React, { Component } from 'react';

import Aux from '../../../../hoc/Aux/Aux'
import './Card.css'
import Team from '../../Team/Team'

class Card extends Component {
  render() {
    let teams = null;
    if (this.props.teams.length !== 0) {
      teams = this.props.teams.map((team, index) => {
        return <Team key={index} name={team.name} />
      });
    }

    return (
      <Aux>
        <div className="Card" onClick={this.props.showCard} data-list-id={this.props.listId} data-card-id={this.props.id}>
          <div className="Card-title">
            <p>{this.props.title}</p>
          </div>
          <div className="Team-list">{teams}</div>
        </div>
      </Aux>
    )
  }
}

export default Card;