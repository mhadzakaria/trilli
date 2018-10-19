import React, { Component } from 'react';

import './Header.css';
import Aux from '../../hoc/Aux/Aux';
import Team from '../Body/Team/Team';

class Header extends Component {
  render () {
    const teams = this.props.teams.map((team, index) => {
      return <Team key={index} name={team} />
    })
    return (
      <Aux>
        <div className="Headers">
          <div className="Header">asasaas</div>
          <div className="Header">
            { teams }
          </div>
        </div>
      </Aux>
    )
    }
};

export default Header;