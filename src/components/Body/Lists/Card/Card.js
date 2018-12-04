import React, { Component } from 'react';

import Aux from '../../../../hoc/Aux/Aux'
import './Card.css'
import Team from '../../Team/Team'

class Card extends Component {
  render() {
    const teams = this.props.teams.map((team, index) => {
      return <Team key={index} name={team.name} />
      // return <div className="Team-list" >{team.name[0]}</div>
    });

    return (
      <Aux>
        <div className="Card" onClick={this.props.showCard} data-list-id={this.props.listId} data-card-id={this.props.id}>
          <p>{this.props.title}</p>
          <div className="Team-list">{teams}</div>
        </div>
      </Aux>
    )
  }
}

export default Card;