import React, { Component } from 'react';

import Toolbars from '../../components/Toolbars/Toolbars';
import Body from '../../components/Body/Body';
import Modal from '../../components/Modal/Modal';
import Aux from '../../hoc/Aux/Aux';
import Layout from '../../components/Layout/Layout';
import CardFull from '../../components/Body/Lists/Card/CardFull/CardFull';
import Spinner from '../../components/UI/Spinner/Spinner';

import Axios from '../../axios';

class CardCreator extends Component {

  state = {
    teams: ['Ahmad', 'Zaka', 'Backend', 'Server'],
    listIdFirebase: [],
    newCardName: [],
    lists: [],
    formNewList: false,
    modalCard: false,
    loading: false,
    activeCard: null,
    listTitle: null,
    lastId: null
  };

  componentDidMount() {
    this.loadingOpen()
    Axios.get('/lists.json')
      .then(response => {
        if (response !==  null){
          const keys = Object.keys(response.data)
          const newLists = keys.map(key => {
            return response.data[key]
          })
  
          const newListsFiltered = newLists.filter(value => {
            return !value.deleted
          })
  
          const newIdFirebase = keys.map(key => {
            return { id: response.data[key].id, key: key }
          })
  
          const newCardsName = newListsFiltered.map(list => {
            return { listId: list.id, newName: '' }
          })
  
          this.setState({
            lists: [
              ...newListsFiltered
            ],
            listIdFirebase: [
              ...newIdFirebase
            ],
            lastId: newLists[newLists.length - 1].id,
            loading: false,
            newCardName: [
              ...newCardsName
            ]
          })

          // redirect to selected card
          const currentURL = new URL(window.location.href)
          const pathName = currentURL.pathname.split("/")
          if (pathName[1] === "card") {
            const cards = this.state.lists.map(list => {
              return (
                list.cards.map(card => {
                  return ({list: list, card: card})
                })
              )
            })
  
            const aa = [].concat(...cards);
            const bb = aa.filter(cl => {
              return cl.card.id === pathName[2]
            })
            console.log(bb)
            if (bb.length !== 0){
              const cc = {
                id: bb[0].list.id,
                name: bb[0].list.name,
                cards: [bb[0].card]
              }
            
              this.setState({
                activeCard: cc,
                modalCard: true
              })
            }
          }
        }
      })
  }

  // CRUD >>>>>>>>>>>
  addNewList = () => {
    if (this.state.listTitle !== null) {
      this.loadingOpen()

      const id = (parseInt(this.state.lastId) + 1).toString();
      const newList = {
        id: id,
        name: this.state.listTitle,
        cards: []
      }

      Axios.post('/lists.json', newList)
        .then(response => {
          this.setState({
            lists: [
              ...this.state.lists,
              newList
            ],
            newCardName: [
              ...this.state.newCardName,
              { listId: id, newName: '' }
            ],
            formNewList: false,
            listTitle: null,
            loading: false,
            lastId: id,
            listIdFirebase: [
              ...this.state.listIdFirebase,
              { id: id, key: response.data.name }
            ]
          })
        })
        .catch(error => console.log(error))
    }
  };

  addNewCard = (event) => {
    this.loadingOpen()
    const randomTeams = this.generateRandomTeams()
    const id = event.target.dataset.listsId;
    const firebaseId = this.getFirebaseId(id)

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

    if (list.cards) {
      list.cards = [
        ...list.cards,
        {
          id: Math.floor(Math.random() * 10000).toString(),
          title: cardName.newName,
          teams: teams
        }
      ]
    } else {
      list.cards = [
        {
          id: Math.floor(Math.random() * 10000).toString(),
          title: cardName.newName,
          teams: teams
        }
      ]
    }

    Axios.put('lists/' + firebaseId.key + '.json', list)
      .then(response => {
        const newLists = [...this.state.lists];
        newLists[listIndex] = list;
        if (cardName.newName !== '') { this.setState({ lists: newLists, loading: false }) }
      })
  }

  deleteListHandler = (event) => {
    const id = event.target.dataset.listId;
    const firebaseId = this.getFirebaseId(id);

    const listIndex = this.state.lists.findIndex(l => {
      return l.id === id
    });
    let list = {
      ...this.state.lists[listIndex]
    };
    list = {
      ...list,
      deleted: true
    }

    Axios.put('lists/' + firebaseId.key + '.json', list)
      .then(response => {
        console.log(response.data)

        const newLists = [
          ...this.state.lists
        ];

        newLists.splice(listIndex, 1);

        this.setState({
          lists: newLists
        });
      });
  }
  // CRUD <<<<<<<<<<<

  getFirebaseId = (id) => {
    const firebaseIdIndex = this.state.listIdFirebase.findIndex(f => {
      return f.id === id
    });

    const firebaseId = {
      ...this.state.listIdFirebase[firebaseIdIndex]
    };
    return firebaseId;
  }

  generateRandomTeams = () => {
    const teamsQty = Math.floor(Math.random() * 4) + 1;
    let newTeams = [];
    let i = 0;
    for (i = 0; i < teamsQty; i++) {
      let newTeam = Math.floor(Math.random() * teamsQty) + 1;
      newTeams = [
        ...newTeams,
        (newTeam - 1)
      ]
    };
    return newTeams;
  }

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
    this.setState({ newCardName: newName })
  };

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

    const cardIndex = list.cards.findIndex(c => {
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

  loadingOpen = () => {
    this.setState({ loading: true })
  }

  render() {
    let modalContent = null;
    if (this.state.modalCard) {
      modalContent = <CardFull cardWithList={this.state.activeCard} closeModal={this.hideModalCard} />
    };

    let loading = null;
    if (this.state.loading) {
      loading = <Spinner />
    };
    return (
      <Aux>
        <Layout>
          {loading}
          <Modal show={this.state.modalCard} closeModal={this.hideModalCard}>
            {modalContent}
          </Modal>
          <Toolbars />
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
            showCard={this.chooseCard}
            deleteList={this.deleteListHandler} />
        </Layout>
      </Aux>
    )
  };
};

export default CardCreator;