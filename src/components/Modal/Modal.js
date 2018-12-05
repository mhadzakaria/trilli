import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Modal.css';
import Aux from '../../hoc/Aux/Aux';

class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  componentWillUpdate() {
    console.log('[Modal] WillUpdate');
  }

  render() {
    let members = null;
    if (this.props.avaiTeams !== undefined) {
      members = this.props.avaiTeams.map(team => {
        return (
          <li data-team-id={team.id}>{team.name}</li>
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
          <button onClick={this.props.deleteCard} data-list-id={this.props.list.id} data-card-id={this.props.list.cards[0].id} className="Button">
            Delete
          </button>
          <button onClick={this.props.showAvaiMembers} className="Button">
            Add Members
          </button>
          <ul>
            {members}
          </ul>
        </div>
      </Aux>
    )
  }
}

export default Modal;