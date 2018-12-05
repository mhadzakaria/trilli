const initialState = {
  teams: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TEAMS_START':
      return {
        ...state,
        teams: action.teams
      }
    default:
      break;
  }
  return state;
}

export default reducer;