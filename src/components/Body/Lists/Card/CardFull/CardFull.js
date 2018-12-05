import React from 'react';
import { Link } from 'react-router-dom';

import Team from '../../../Team/Team'
import './CardFull.css'

const cardFull = (props) => {
  let list = props.cardWithList
  let card = list.cards[0]

  return (
    <div>
      <h2>{card.title}</h2>
      <Link to="/boards">
        <button className="Button-CloseModal" onClick={props.closeModal}>x</button>
      </Link>
      <p>in list {list.name}</p>
      <p>MEMBERS</p>
      <div className="Teams-List">
        {card.teams.map((team, index) => (
          <Team key={index} name={team.name} />
        ))}
      </div>
    </div>
  )
}

export default cardFull;