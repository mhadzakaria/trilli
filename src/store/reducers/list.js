const initialState = {
  lists: []
};

const reducer = (state = initialState, action) => {
  // console.log(state, action)
  switch (action.type) {
    case 'LISTS_START':
      return {
        ...state,
        lists: action.lists
      };
    case 'LISTS_UPD_LISTS':
      return {
        ...state,
        lists: action.lists
      };
    case 'LISTS_ADD_LIST':
      return {
        ...state,
        lists: [
          ...state.lists,
          action.list
        ]
      };
    case 'LISTS_DEL_LIST':
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