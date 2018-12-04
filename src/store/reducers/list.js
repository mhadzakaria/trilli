const initialState = {
  lists: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'START':
      return {
        ...state,
        lists: action.lists
      };
    case 'ADD_LIST':
      return {
        ...state,
        lists: [
          ...state.lists,
          action.list
        ]
      };
    case 'DEL_LIST':
      return {
        ...state,
        lists: state.lists.filter(list => list.id !== action.id)
      };
    default:
      break;
  }
  return state;
};

export default reducer;