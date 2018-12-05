import React, { Component } from 'react';

import './Header.css';
import Aux from '../../hoc/Aux/Aux';
import Team from '../Body/Team/Team';

class Header extends Component {
  render () {
    const teams = this.props.teams.map(team => {
      return <Team key={team.id} name={team.name} />
    })
    return (
      <Aux>
        <div className="Headers">
          <div className="Header">KALEM APP</div>
          <div className="Header">
            { teams }
          </div>
        </div>
      </Aux>
    )
    }
};

export default Header;