import React, { Component } from 'react';
import { connect } from 'react-redux';

import Body from '../components/Body/Body';
import Modal from '../components/Modal/Modal';
import Aux from '../hoc/Aux/Aux';
import CardFull from '../components/Body/Lists/Card/CardFull/CardFull';
import Spinner from '../components/UI/Spinner/Spinner';

import Axios from '../axios';

class CardCreator extends Component {

  state = {
    modalCard: false,
    loading: false,
    activeCard: null,
  };

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
      modal = <Modal show={this.state.modalCard} closeModal={this.hideModalCard} list={this.state.activeCard} deleteCard={this.deleteCardHandler}>
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
    prTeams: state.team.teams
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
