import React, { Component } from 'react';
import('axios').Axios;
import Aux from '../../hoc/Aux/Aux';


class TeamCreator extends Component {
  state = {
    id: null,
    name: null,
    lastId: null
  }

  onChangeName = (event) => {
    const name = event.target.value
    this.setState({
      name: name,
      id: this.state.lastId + 1
    })
  }

  onClickAdd = () => {
    const data = {
      id: this.state.id,
      name: this.state.name
    }
    Axios.post('teams', data)
      .then(response => {
        
      })
  }

  render() {
    return (
      <Aux>
        <input type="text" onChange={this.onChangeName} />
        <button onClick={this.onClickAdd}>Add</button>
      </Aux>
    )
  }
}

export default TeamCreator;