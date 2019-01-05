import { LOAD_HIGHLIGHTS } from '../../constants';
import { HighlightsI, HighlightsMapping } from '../../types';

const initialState: HighlightsMapping = {};

export default function GameReducer(state: any = initialState, action: any) {
  switch (action.type) {
    case LOAD_HIGHLIGHTS:
      return loadHighlights(state, action.payload);
    default:
      return state;
  }
}

function loadHighlights(state: HighlightsMapping, payload: HighlightsMapping) {
  const playerId = payload;
  // TODO: transform the player id from '10155286331682924' to 'Playerid-10155286331682924'
  // so it will be easier to know what the id actually means.
  return {
    ...state,
    ...payload
  };
}
