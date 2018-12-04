import React, { Component } from 'react';

import Toolbars from '../../components/Toolbars/Toolbars';
import Body from '../../components/Body/Body'

class CardCreator extends Component {

  state = {
    teams: ['Ahmad', 'Zaka', 'Backend', 'Server'],
    lists: [
      {
        id: "2",
        name: 'In-Progress',
        cards: [
          { 
            id: 2,
            title: 'Label',
            teams: [
              { name: 'Ahmad' },
              { name: 'Zaka' }
            ]
          },
          { 
            id: 3,
            title: 'Database',
            teams: [
              { name: 'Zaka' },
              { name: 'Backend' },
              { name: 'Server' }
            ]
          },
          { 
            id: 5,
            title: 'Database',
            teams: [
              { name: 'Zaka' },
              { name: 'Backend' },
              { name: 'Server' }
            ]
          },
          { 
            id: 4,
            title: 'Database',
            teams: [
              { name: 'Zaka' },
              { name: 'Backend' },
              { name: 'Server' }
            ]
          },
          { 
            id: 1,
            title: 'Routing',
            teams: [
              { name: 'Backend' }
            ]
          }
        ]
      },
      {
        id: "3",
        name: 'Staging',
        cards: []
      }
    ],
    listTitle: null,
    newCardName: [
      { listId: "2", newName: null },
      { listId: "3", newName: null }
    ]
  };

  generateRandomTeams = () => {
    const teamsQty = Math.floor(Math.random() * 4) + 1;
    let newTeams = [];
    let i = 0;
    for (i = 0; i < teamsQty; i++){
      let newTeam = Math.floor(Math.random() * teamsQty) + 1;
      newTeams = [
        ...newTeams,
        (newTeam - 1)
      ]
    };
    return newTeams;
  }

  addNewList = () => {
    const id = Math.floor(Math.random() * 10000);
    if (this.state.listTitle !== null){
      this.setState({
        lists: [
          ...this.state.lists,
          {
            id: id.toString(),
            name: this.state.listTitle,
            cards: []
          }
        ],
        newCardName: [
          ...this.state.newCardName,
          { listId: id.toString(), newName: null }
        ]
      })
    }
  };

  changeListTitle = (event) => {
    this.setState({
      listTitle: event.target.value
    })
  }

  changeCardName = (event) => {
    const id = event.target.dataset.listsId;
    const cardNameIndex = this.state.newCardName.findIndex(l => {
      return l.listId === id
    });
    
    const cardName = {
      ...this.state.newCardName[cardNameIndex]
    };

    cardName.newName = event.target.value;
    const newName = [...this.state.newCardName];
    newName[cardNameIndex] = cardName;
    this.setState({newCardName: newName})
  };
  
  addNewCard = (event) => {
    const randomTeams = this.generateRandomTeams()
    const id = event.target.dataset.listsId;
    const listIndex = this.state.lists.findIndex(l => {
      return l.id === id
    });
    const list = {
      ...this.state.lists[listIndex]
    };

    const cardNameIndex = this.state.newCardName.findIndex(l => {
      return l.listId === id
    });
    const cardName = {
      ...this.state.newCardName[cardNameIndex]
    };

    const teams = randomTeams.map(rt => {
      return { name: this.state.teams[rt] }
    });
    list.cards = [
      ...list.cards,
      { 
        id: Math.floor(Math.random() * 10000),
        title: cardName.newName,
        teams: teams
      }
    ]
    const newLists = [...this.state.lists];
    newLists[listIndex] = list;
    if (cardName.newName !== null) {this.setState({lists: newLists})}
  }

  render () {
    return (
      <div>
        <Toolbars>
          <div>
            <input onChange={this.changeListTitle} type="text" placeholder="List name..."/>
            <button onClick={this.addNewList}>+ Add</button>
          </div>
        </Toolbars>
        <Body lists={this.state.lists} newCardName={this.changeCardName} addNewCard={this.addNewCard} />
      </div>
    )
  };
};

export default CardCreator;