import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Modal.css';
import Aux from '../../hoc/Aux/Aux';

class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  componentWillUpdate() {
    // console.log('[Modal] WillUpdate');
  }

  render() {
    let members = null;
    if (this.props.avaiTeams !== undefined) {
      members = this.props.avaiTeams.map(team => {
        return (
          <li key={team.id}>
            {team.name} <button className="Button" data-team-id={team.id} onClick={this.props.addTeam}>Add</button> | <button className="Button" data-team-id={team.id} onClick={this.props.remTeam}> Delete </button>
          </li>
        )
      })
    }
    return (
      <Aux>
        <Link to="/boards">
          <div className="Modal-Background"
            style={{
              display: this.props.show ? 'block' : 'none',
              transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
              opacity: this.props.show ? '1' : '0'
            }}
            onClick={this.props.closeModal} />
        </Link>
        <div className="Modal"
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}>
          {this.props.children}
          <div className="Card-action">
            <button onClick={this.props.deleteCard} data-list-id={this.props.list.id} data-card-id={this.props.list.cards[0].id} className="Button">
              Delete
            </button>
            <button onClick={this.props.showAvaiMembers} className="Button">
              Add Members
            </button>
            <ul style={{display: this.props.showMembers ? 'block' : 'none'}}>
              {members}
            </ul>
            <span className="fa fa-arrow-circle-left fa-2x" onClick={this.props.moveCard} data-arrow="left" title="To left"></span>
            <span className="fa fa-arrow-circle-right fa-2x" onClick={this.props.moveCard} data-arrow="right" title="To right"></span>
          </div>
        </div>
      </Aux>
    )
  }
}

export default Modal;