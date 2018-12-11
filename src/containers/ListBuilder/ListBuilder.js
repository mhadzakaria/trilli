import React, { Component } from 'react';
import { connect } from 'react-redux';

import Body from '../../components/Body/Body';
import Modal from '../../components/Modal/Modal';
import Aux from '../../hoc/Aux/Aux';
import CardFull from '../../components/Body/Lists/Card/CardFull/CardFull';
import Spinner from '../../components/UI/Spinner/Spinner';

import Axios from '../../axios';

class CardCreator extends Component {

  state = {
    newCardName: [],
    lists: [],
    formNewList: false,
    modalCard: false,
    loading: false,
    activeCard: null,
    listTitle: null,
    membersList: false,
    lastId: null
  };

  componentDidMount() {
    this.loadingOpen();
    Axios.get('/lists')
      .then(response => {
        if (response.data.length !== 0){
          // INITIALIZE STATE
          const newCardsName = response.data.map(list => {
            return { listId: list.id, newName: '' }
          })
  
          this.setState({
            newCardName: [
              ...newCardsName
            ]
          })
          this.props.startList(response.data);

          // redirect to selected card
          const currentURL = new URL(window.location.href)
          const pathName = currentURL.pathname.split("/")
          
          if (pathName[2] === "card") {
            const cards = response.data.map(list => {
              return (
                list.cards.map(card => {
                  return ({list: list, card: card})
                })
              )
            })
  
            const aa = [].concat(...cards);
            const bb = aa.filter(cl => {
              return cl.card.id === parseInt(pathName[3])
            })
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
        };
        this.setState({ loading: false });
      })
      .catch(error => {
        this.setState({ loading: false });
        alert(error)
      })
    Axios.get('teams/')
      .then(response => {
        this.props.startTeam(response.data)
      })
  }

  // CRUD >>>>>>>>>>>
  addNewList = () => {
    if (this.state.listTitle !== null) {
      this.loadingOpen()

      const newList = {
        name: this.state.listTitle
      };
      Axios.post('/lists.json', newList)
        .then(response => {
          console.log(response)
          this.props.addList(response.data)
          this.setState({
            newCardName: [
              ...this.state.newCardName,
              { listId: response.data.id, newName: '' }
            ],
            formNewList: false,
            listTitle: null,
            loading: false,
          })
        })
        .catch(error => {
          this.setState({ loading: false });
          alert(error)
        })
    }
  };

  addNewCard = (event) => {
    this.loadingOpen();
    
    const id = parseInt(event.target.dataset.listsId);

    const listIndex = this.props.prLists.findIndex(l => {
      return l.id === id
    });
    const list = {
      ...this.props.prLists[listIndex]
    };
    
    const cardNameIndex = this.state.newCardName.findIndex(l => {
      return l.listId === id
    });
    const cardName = {
      ...this.state.newCardName[cardNameIndex]
    };

    if (cardName.newName){
      const params = {
        card: {
          title: cardName.newName,
          list_id: id
        }
      }
      Axios.post('/cards.json', params)
        .then(response => {
          if (list.cards) {
            list.cards = [
              ...list.cards,
              response.data
            ]
          } else {
            list.cards = [
              response.data
            ]
          }
      
          const newLists = [...this.props.prLists];
          newLists[listIndex] = list;
          this.props.updateList(newLists);
        })
        .catch(error => console.log(error))
    }
    this.setState({ loading: false })
  }

  deleteListHandler = (event) => {
    const id = event.target.dataset.listId;

    Axios.delete('lists/' + id)
      .then(response => {
        this.props.delList(parseInt(id))
      });
  }

  deleteCardHandler = (event) => {
    this.loadingOpen();
    
    const cardId = parseInt(event.target.dataset.cardId);
    const listId = parseInt(event.target.dataset.listId);

    const listIndex = this.props.prLists.findIndex(l => {
      return l.id === listId
    });
    const list = {
      ...this.props.prLists[listIndex]
    };
    Axios.delete('/cards/' + cardId)
      .then(response => {
        list.cards = list.cards.filter(card => card.id !== cardId)
        
        const newLists = [...this.props.prLists];
        newLists[listIndex] = list;
        this.props.updateList(newLists);        
      })
    this.setState({ loading: false, modalCard: false })
  }

  addTeamToCardHandler = (event) => {
    const teamId = parseInt(event.target.dataset.teamId);
    const team = this.props.prTeams.filter(team => team.id === teamId)
    if (team.length !== 0) {
      const listActive = this.state.activeCard
      const listIndex = this.props.prLists.findIndex(l => {
        return l.id === listActive.id
      });
      const list = this.props.prLists[listIndex]

      const cardActive = listActive.cards[0]
      const cardIndex = list.cards.findIndex(c => c.id === cardActive.id)
      const card = list.cards[cardIndex]
      if (card.teams.filter(team => team.id === teamId).length === 0) {
        Axios.get('cards/'+ cardActive.id +'/add_team/'+ teamId)
          .then(response => {
            const newCard = {
              ...card,
              teams: card.teams.concat(team[0])
            }

            const newCards = [...list.cards]
            newCards[cardIndex] = newCard

            const newList = {
              ...list,
              cards: newCards
            }

            const newLists = [...this.props.prLists];
            newLists[listIndex] = newList;
            this.setState({
              activeCard: {
                ...this.state.activeCard,
                cards: [newCard]
              }
            })
            this.props.updateList(newLists);

          })
      }
    }
  }

  remTeamToCardHandler = (event) => {
    const teamId = parseInt(event.target.dataset.teamId);
    const team = this.props.prTeams.filter(team => team.id === teamId)
    if (team.length !== 0) {
      const listActive = this.state.activeCard
      const listIndex = this.props.prLists.findIndex(l => {
        return l.id === listActive.id
      });
      const list = this.props.prLists[listIndex]

      const cardActive = listActive.cards[0]
      const cardIndex = list.cards.findIndex(c => c.id === cardActive.id)
      const card = list.cards[cardIndex]

      Axios.get('cards/'+ cardActive.id +'/rem_team/'+ teamId)
        .then(response => {
          const newCard = {
            ...card,
            teams: card.teams.filter(team => team.id !== teamId)
          }

          const newCards = [...list.cards]
          newCards[cardIndex] = newCard

          const newList = {
            ...list,
            cards: newCards
          }

          const newLists = [...this.props.prLists];
          newLists[listIndex] = newList;
          this.setState({
            activeCard: {
              ...this.state.activeCard,
              cards: [newCard]
            }
          })
          this.props.updateList(newLists);
        })
    }
  }

  moveCardHandler = (event) => {
    // let arrow = "left";
    // if (event.target.className.includes("right")) {
      //   arrow = "right"
      // };
    const arrow = event.target.dataset.arrow;

    const lists = [...this.props.prLists]
    const activeListIndex = lists.findIndex(list => this.state.activeCard.id === list.id)
    if (activeListIndex !== -1) {
      if ( (activeListIndex !== 0 && arrow === "left") || ( (lists.length - 1) !== activeListIndex && arrow === "right" ) ) {
        const addedListIndex = (arrow === "right") ? activeListIndex + 1 : activeListIndex - 1
        const addedList = lists[addedListIndex]
        const newAddedList = {
          ...addedList,
          cards: ([this.state.activeCard.cards[0], ...addedList.cards])
        }

        const minusList = lists[activeListIndex]
        const newMinusList = {
          ...minusList,
          cards: minusList.cards.filter(card => card.id !== this.state.activeCard.cards[0].id)
        }

        Axios.get('cards/'+ this.state.activeCard.cards[0].id +'/move_card/'+ addedList.id)
        .then(response => {
          const newPrLists = [...this.props.prLists];
          newPrLists[activeListIndex] = newMinusList;
          newPrLists[addedListIndex] = newAddedList;
          const newActiveCard = {...newAddedList}
          newActiveCard.cards = [this.state.activeCard.cards[0]]
          this.setState({
            activeCard: newActiveCard
          })

          this.props.startList(newPrLists);
        })
      }
    }
  }
  // CRUD <<<<<<<<<<<

  changeListTitle = (event) => {
    this.setState({
      listTitle: event.target.value
    })
  }

  changeCardName = (event) => {
    const id = parseInt(event.target.dataset.listsId);
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
    const listId = parseInt(event.target.dataset.listId);
    const cardId = parseInt(event.target.dataset.cardId);
    const listIndex = this.props.prLists.findIndex(l => {
      return l.id === listId
    });

    let list = {
      ...this.props.prLists[listIndex]
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

  showAvaiMembersHandler = () => {
    this.setState({
      membersList: !this.state.membersList
    })
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

    let modal = null;
    if (this.state.activeCard !== null) {
      modal = <Modal
                show={this.state.modalCard}
                closeModal={this.hideModalCard}
                list={this.state.activeCard}
                deleteCard={this.deleteCardHandler}
                avaiTeams={this.props.prTeams}
                addTeam={this.addTeamToCardHandler}
                remTeam={this.remTeamToCardHandler}
                showAvaiMembers={this.showAvaiMembersHandler}
                showMembers={this.state.membersList}
                moveCard={this.moveCardHandler}
              >
        {modalContent}
      </Modal>
    }
    return (
      <Aux>
        {loading}
        {modal}
        <Body
            lists={this.props.prLists}
            newCardName={this.changeCardName}
            addNewCard={this.addNewCard}
            newListForm={this.showFormList}
            closeFormList={this.hideFormList}
            added={this.state.formNewList}
            changeNameList={this.changeListTitle}
            createList={this.addNewList}
            teams={this.props.prTeams}
            showCard={this.chooseCard}
            deleteList={this.deleteListHandler}
        />
      </Aux>
    )
  };
};

const mapStateToProps = state => {
  return {
    prLists: state.list.lists,
    prTeams: state.team.teams,
    prTeamsA: state.team,
    prCards: state.card,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    startList: (lists) => dispatch({type: 'LISTS_START', lists: lists}),
    addList: (list) => dispatch({type: 'LISTS_ADD_LIST', list: list}),
    delList: (listId) => dispatch({type: 'LISTS_DEL_LIST', id: listId}),
    updateList: (lists) => dispatch({type: 'LISTS_UPD_LISTS', lists: lists}),
    startTeam: (teams) => dispatch({type: 'TEAMS_START', teams: teams})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardCreator);
