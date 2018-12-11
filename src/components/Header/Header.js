import React, { Component } from 'react';
import { ButtonToolbar, DropdownButton, Panel, MenuItem } from 'react-bootstrap';

import './Header.css';
import '../../App.css';
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
          <ButtonToolbar>
            <DropdownButton
              bsStyle='default'
              title={<p className="fa-p"><i className="fa fa-user-plus"></i> Invite</p>}
              className="dropdown-button"
              noCaret>
              <MenuItem header>
                Invite
              </MenuItem>
              <MenuItem divider></MenuItem>
              <MenuItem >
                <Panel>
                  <Panel.Heading>Panel heading without a title</Panel.Heading>
                  <Panel.Body>Panel content</Panel.Body>
                </Panel>
              </MenuItem>
            </DropdownButton>
          </ButtonToolbar>
        </div>
      </Aux>
    )
    }
};

export default Header;