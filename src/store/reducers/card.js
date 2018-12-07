const initialState = {
  cards: [],
  activeCard: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHOOSE_CARD':
      console.log("sasasa")
      console.log(action.card)
      return {
        ...state,
        activeCard: action.card
      };
    default:
      break;
  }

  return state;
}

export default reducer;