import React, { Component } from 'react';

import Toolbars from '../../components/Toolbars/Toolbars';
import Toolbar from '../../components/Toolbar/Toolbar';
import Body from '../../components/Body/Body';
import Modal from '../../components/Modal/Modal';
import Aux from '../../hoc/Aux/Aux';
import Layout from '../../components/Layout/Layout';
import CardFull from '../../components/Body/Lists/Card/CardFull/CardFull';

class CardCreator extends Component {

  state = {
    teams: ['Ahmad', 'Zaka', 'Backend', 'Server'],
    lists: [
      {
        id: "2",
        name: 'In-Progress',
        cards: [
          { 
            id: '2',
            title: 'Label',
            teams: [
              { name: 'Ahmad' },
              { name: 'Zaka' }
            ]
          },
          { 
            id: '3',
            title: 'Database',
            teams: [
              { name: 'Zaka' },
              { name: 'Backend' },
              { name: 'Server' }
            ]
          },
          { 
            id: '5',
            title: 'Database',
            teams: [
              { name: 'Zaka' },
              { name: 'Backend' },
              { name: 'Server' }
            ]
          },
          { 
            id: '4',
            title: 'Database',
            teams: [
              { name: 'Zaka' },
              { name: 'Backend' },
              { name: 'Server' }
            ]
          },
          { 
            id: '1',
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
      { listId: "2", newName: '' },
      { listId: "3", newName: '' }
    ],
    formNewList: false,
    activeCard: null,
    modalCard: false
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
          { listId: id.toString(), newName: '' }
        ],
        formNewList: false,
        listTitle: null
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
        id: Math.floor(Math.random() * 10000).toString(),
        title: cardName.newName,
        teams: teams
      }
    ]
    const newLists = [...this.state.lists];
    newLists[listIndex] = list;
    if ( cardName.newName !== '' ) {this.setState({lists: newLists})}
  }

  showFormList = () => {
    this.setState({
      formNewList: true
    })
  }

  hideFormList = () => {
    this.setState({
      formNewList: false
    })
  }
  
  hideModalCard = () => {
    this.setState({
      modalCard: false
    })
  }

  chooseCard = (event) => {
    const listId = event.target.dataset.listId;
    const cardId = event.target.dataset.cardId;
    const listIndex = this.state.lists.findIndex(l => {
      return l.id === listId
    });
    
    let list = {
      ...this.state.lists[listIndex]
    };
    
    const cardIndex = list.cards.findIndex(c =>{
      return c.id === cardId
    })
    
    const card = {
      ...list.cards[cardIndex]
    };

    list.cards = [
      card
    ]

    this.setState({
      activeCard: list,
      modalCard: true
    })

    return list
  }

  render () {
    let modalContent = null;
    if (this.state.modalCard) {
      modalContent = <CardFull cardWithList={this.state.activeCard} closeModal={this.hideModalCard} />
    }
    return (
      <Aux>
        <Layout>
          <Modal show={this.state.modalCard} closeModal={this.hideModalCard}>
            {modalContent}
          </Modal>
          <Toolbars>
            <Toolbar />
          </Toolbars>
          <Body 
            lists={this.state.lists}
            newCardName={this.changeCardName}
            addNewCard={this.addNewCard}
            newListForm={this.showFormList}
            closeFormList={this.hideFormList}
            added={this.state.formNewList} 
            changeNameList={this.changeListTitle}
            createList={this.addNewList}
            teams={this.state.teams} 
            showCard={this.chooseCard} />
        </Layout>
      </Aux>
    )
  };
};

export default CardCreator;